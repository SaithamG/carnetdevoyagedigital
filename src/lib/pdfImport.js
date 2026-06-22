import { ICON_KEYS, resolveIcon, guessIconKey } from '../data/iconMap';

/* ------------------------------------------------------------------ *
 * 1) EXTRACTION DU TEXTE PDF — côté navigateur, sans serveur.        *
 *    pdfjs-dist est chargé à la demande (import dynamique) pour ne   *
 *    pas alourdir le bundle initial.                                 *
 * ------------------------------------------------------------------ */
let _pdfjs = null;
const getPdfjs = async () => {
  if (!_pdfjs) {
    _pdfjs = await import('pdfjs-dist');
    // Worker servi via CDN, calé sur la version installée (évite la config
    // de bundling du worker propre à Create React App).
    _pdfjs.GlobalWorkerOptions.workerSrc =
      `https://unpkg.com/pdfjs-dist@${_pdfjs.version}/build/pdf.worker.min.mjs`;
  }
  return _pdfjs;
};

/** Lit un File PDF et renvoie son texte brut, page par page. */
export const extractPdfText = async (file, onProgress) => {
  const pdfjs = await getPdfjs();
  const buffer = await file.arrayBuffer();
  const pdf = await pdfjs.getDocument({ data: buffer }).promise;
  const pages = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    pages.push(content.items.map((it) => it.str).join(' '));
    onProgress?.(i, pdf.numPages);
  }
  return pages.join('\n\n').replace(/[ \t]+/g, ' ').trim();
};

/* ------------------------------------------------------------------ *
 * 1bis) EXTRACTION DES IMAGES — récupère les photos embarquées du    *
 *       PDF, réduites en vignettes JPEG, avec page + position pour    *
 *       pouvoir les associer aux étapes (par ordre de lecture).      *
 * ------------------------------------------------------------------ */

/** Multiplie deux matrices PDF [a,b,c,d,e,f] (m1 appliqué après m2). */
const matMul = (m1, m2) => [
  m1[0] * m2[0] + m1[2] * m2[1],
  m1[1] * m2[0] + m1[3] * m2[1],
  m1[0] * m2[2] + m1[2] * m2[3],
  m1[1] * m2[2] + m1[3] * m2[3],
  m1[0] * m2[4] + m1[2] * m2[5] + m1[4],
  m1[1] * m2[4] + m1[3] * m2[5] + m1[5],
];

/** Détecte une image vide / noire / uniforme (masque, extraction ratée). */
const isLowContent = (ctx, w, h) => {
  try {
    const { data } = ctx.getImageData(0, 0, w, h);
    const total = w * h;
    const step = Math.max(1, Math.floor(total / 2000)); // ~2000 pixels échantillonnés
    let sum = 0;
    let sumSq = 0;
    let n = 0;
    for (let p = 0; p < total; p += step) {
      const i = p * 4;
      const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      sum += lum;
      sumSq += lum * lum;
      n++;
    }
    const mean = sum / n;
    const variance = sumSq / n - mean * mean;
    // Quasi noir, ou quasi uniforme (bloc d'une seule couleur) → on rejette.
    return mean < 18 || variance < 25;
  } catch {
    return false;
  }
};

/** Convertit un objet image pdfjs (bitmap ou data brut) en data URL JPEG réduite. */
const imgToDataUrl = (img, maxDim) => {
  if (!img) return null;
  const { width, height, bitmap, data, kind } = img;
  if (!width || !height) return null;
  const scale = Math.min(1, maxDim / Math.max(width, height));
  const w = Math.max(1, Math.round(width * scale));
  const h = Math.max(1, Math.round(height * scale));
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  // Fond blanc AVANT de dessiner : sinon les zones transparentes deviennent
  // NOIRES à l'export JPEG (cause des "images noires").
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, w, h);

  if (bitmap) {
    ctx.drawImage(bitmap, 0, 0, w, h);
  } else if (data) {
    const full = document.createElement('canvas');
    full.width = width;
    full.height = height;
    const fctx = full.getContext('2d');
    const imageData = fctx.createImageData(width, height);
    if (kind === 3 || data.length === width * height * 4) {
      imageData.data.set(data);
    } else if (kind === 2 || data.length === width * height * 3) {
      for (let i = 0, j = 0; i < data.length; i += 3, j += 4) {
        imageData.data[j] = data[i];
        imageData.data[j + 1] = data[i + 1];
        imageData.data[j + 2] = data[i + 2];
        imageData.data[j + 3] = 255;
      }
    } else {
      return null; // format non géré (masque 1bpp, etc.)
    }
    fctx.putImageData(imageData, 0, 0);
    ctx.drawImage(full, 0, 0, w, h);
  } else {
    return null;
  }

  if (isLowContent(ctx, w, h)) return null; // écarte les blocs noirs/vides
  return canvas.toDataURL('image/jpeg', 0.85);
};

/** Récupère l'objet image pdfjs (peut être asynchrone selon le décodage). */
const getImageObj = (page, name) =>
  new Promise((resolve) => {
    try {
      const cached = page.objs.has?.(name) ? page.objs.get(name) : null;
      if (cached) return resolve(cached);
    } catch { /* pas encore prêt */ }
    try {
      page.objs.get(name, resolve);
    } catch {
      resolve(null);
    }
  });

/**
 * Extrait les images significatives du PDF.
 * @returns {Promise<Array<{id,page,y,dataUrl}>>} triées en ordre de lecture.
 */
export const extractPdfImages = async (file, { maxDim = 900, minDim = 120, onProgress } = {}) => {
  const pdfjs = await getPdfjs();
  const OPS = pdfjs.OPS;
  const buffer = await file.arrayBuffer();
  const pdf = await pdfjs.getDocument({ data: buffer }).promise;
  const out = [];

  for (let p = 1; p <= pdf.numPages; p++) {
    const page = await pdf.getPage(p);
    const viewport = page.getViewport({ scale: 1 });
    const ops = await page.getOperatorList();

    let ctm = [1, 0, 0, 1, 0, 0];
    const stack = [];

    for (let i = 0; i < ops.fnArray.length; i++) {
      const fn = ops.fnArray[i];
      const args = ops.argsArray[i];
      if (fn === OPS.save) stack.push(ctm.slice());
      else if (fn === OPS.restore) ctm = stack.pop() || ctm;
      else if (fn === OPS.transform) ctm = matMul(ctm, args);
      else if (fn === OPS.paintImageXObject || fn === OPS.paintJpegXObject) {
        const name = args[0];
        const img = await getImageObj(page, name);
        if (!img || !img.width || !img.height) continue;
        // Filtre le décoratif : trop petit, ou bandeau très étiré.
        const ratio = img.width / img.height;
        if (Math.min(img.width, img.height) < minDim) continue;
        if (ratio > 6 || ratio < 1 / 6) continue;
        const dataUrl = imgToDataUrl(img, maxDim);
        if (!dataUrl) continue;
        // y en coordonnées écran (haut = 0) pour trier de haut en bas.
        const yScreen = viewport.height - (ctm[5] + ctm[3] / 2);
        out.push({ id: `${p}-${i}`, page: p, y: yScreen, dataUrl });
      }
    }
    onProgress?.(p, pdf.numPages);
  }

  // Ordre de lecture : page croissante, puis de haut en bas.
  out.sort((a, b) => a.page - b.page || a.y - b.y);
  return out;
};

/* ------------------------------------------------------------------ *
 * 1ter) POSITIONS DU TEXTE — pour savoir OÙ est écrit chaque nom de  *
 *       lieu (page + y), et ainsi coller la bonne photo à côté.      *
 * ------------------------------------------------------------------ */
export const extractPdfTextItems = async (file) => {
  const pdfjs = await getPdfjs();
  const buffer = await file.arrayBuffer();
  const pdf = await pdfjs.getDocument({ data: buffer }).promise;
  const items = [];
  for (let p = 1; p <= pdf.numPages; p++) {
    const page = await pdf.getPage(p);
    const viewport = page.getViewport({ scale: 1 });
    const content = await page.getTextContent();
    for (const it of content.items) {
      if (!it.str || !it.str.trim()) continue;
      // transform = [a,b,c,d,e,f] ; (e,f) = position, y vers le haut en PDF.
      items.push({ page: p, y: viewport.height - it.transform[5], str: it.str });
    }
  }
  return items;
};

const norm = (s = '') =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();

/** Retrouve la position (page, y) où un titre de lieu est écrit dans le PDF. */
const findTitlePosition = (title, items) => {
  const nt = norm(title);
  if (!nt) return null;
  const tokens = nt.split(' ').filter((w) => w.length >= 3);
  let best = null;
  let bestScore = 0;
  for (const it of items) {
    const ns = norm(it.str);
    if (!ns) continue;
    let score = tokens.reduce((acc, tok) => acc + (ns.includes(tok) ? 1 : 0), 0);
    if (ns === nt) score += 5; // correspondance exacte = titre isolé
    if (score > bestScore) { bestScore = score; best = it; }
  }
  return bestScore > 0 ? best : null;
};

/**
 * Associe intelligemment les images extraites aux étapes/adresses du carnet
 * brut : photo la PLUS PROCHE du nom du lieu sur la même page, puis repli en
 * ordre de lecture pour les lieux dont le nom n'a pas été localisé.
 * Mute et renvoie le carnet brut, chaque step/address gagnant un champ `image`.
 */
export const attachImagesToCarnet = (raw, images, textItems) => {
  if (!raw || !images?.length) return raw;
  const used = new Set();

  const nearestOnPage = (pos) => {
    if (!pos) return null;
    let best = null;
    let bestD = Infinity;
    for (const img of images) {
      if (used.has(img.id) || img.page !== pos.page) continue;
      const d = Math.abs(img.y - pos.y);
      if (d < bestD) { bestD = d; best = img; }
    }
    if (best) { used.add(best.id); return best.dataUrl; }
    return null;
  };

  // Cibles dans l'ordre du document (steps puis adresses).
  const targets = [];
  (raw.regions || []).forEach((r) =>
    (r.days || []).forEach((d) => (d.steps || []).forEach((s) => targets.push({ obj: s, label: s.title }))));
  (raw.addresses || []).forEach((a) => targets.push({ obj: a, label: a.name }));

  // 1) Passe spatiale : chaque lieu prend la photo voisine de son nom.
  for (const t of targets) {
    t.obj.image = nearestOnPage(findTitlePosition(t.label, textItems));
  }
  // 2) Repli ordre de lecture pour les lieux encore sans photo.
  const leftovers = images.filter((img) => !used.has(img.id));
  let li = 0;
  for (const t of targets) {
    if (!t.obj.image && li < leftovers.length) {
      t.obj.image = leftovers[li++].dataUrl;
    }
  }
  return raw;
};

/* ------------------------------------------------------------------ *
 * 2) PARSING IA — texte libre → JSON structuré conforme à l'appli.   *
 *    Schéma volontairement TOLÉRANT : toutes les sections sont       *
 *    optionnelles, car les PDF fournis seront de natures variées.    *
 * ------------------------------------------------------------------ */
const CARNET_SCHEMA = {
  type: 'OBJECT',
  properties: {
    title: { type: 'STRING' },
    author: { type: 'STRING' },
    intro: { type: 'STRING' },
    regions: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          name: { type: 'STRING' },
          desc: { type: 'STRING' },
          days: {
            type: 'ARRAY',
            items: {
              type: 'OBJECT',
              properties: {
                date: { type: 'STRING' },
                title: { type: 'STRING' },
                steps: {
                  type: 'ARRAY',
                  items: {
                    type: 'OBJECT',
                    properties: {
                      time: { type: 'STRING' },
                      title: { type: 'STRING' },
                      desc: { type: 'STRING' },
                      icon: { type: 'STRING' },
                    },
                    required: ['title'],
                  },
                },
              },
              required: ['title', 'steps'],
            },
          },
        },
        required: ['name', 'days'],
      },
    },
    addresses: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          name: { type: 'STRING' },
          category: { type: 'STRING' },
          desc: { type: 'STRING' },
          icon: { type: 'STRING' },
        },
        required: ['name'],
      },
    },
    lexique: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          jp: { type: 'STRING' },
          fr: { type: 'STRING' },
          prononciation: { type: 'STRING' },
        },
        required: ['fr'],
      },
    },
    conseils: { type: 'ARRAY', items: { type: 'STRING' } },
    outro: { type: 'STRING' },
  },
  required: ['title', 'regions'],
};

const buildParsePrompt = (rawText) => `Tu es un moteur d'extraction. On te donne le TEXTE BRUT d'un document de voyage (PDF d'agence, eBook, fiche itinéraire…). Sa mise en page est inconnue et variera d'un document à l'autre.

Ta mission : structurer ce contenu dans le schéma JSON imposé, SANS rien inventer.

Règles :
- N'invente AUCUNE information absente du document (pas d'horaires, de prix ni de lieux fictifs). Si une donnée manque, omets le champ.
- Chaque itinéraire/circuit du document devient un élément de "regions" (name = nom du circuit). Si le document n'a pas de jours datés, mets tout dans UN seul "day" (title = nom du circuit, date omise).
- Chaque lieu/étape devient un "step" : "time" = la plage horaire si présente (ex "9:00 - 10:00"), "title" = le nom du lieu, "desc" = sa description.
- "icon" : choisis la clé la PLUS pertinente STRICTEMENT dans cette liste : ${ICON_KEYS.join(', ')}. En cas de doute, "place".
- "addresses" : les bonnes adresses / recommandations (restaurants, cafés, boutiques) listées hors itinéraire.
- "lexique" : vocabulaire/phrases avec traduction et prononciation si fournies.
- "conseils" : les astuces / conseils pratiques, un par entrée.
- Conserve la langue d'origine du document pour les descriptions.

TEXTE BRUT DU DOCUMENT :
"""
${rawText.slice(0, 30000)}
"""`;

const fetchWithRetry = async (url, options, retries = 3, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error?.message || `HTTP ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise((res) => setTimeout(res, delay));
      delay *= 2;
    }
  }
};

/**
 * Envoie le texte extrait à Gemini et renvoie l'objet carnet structuré (brut,
 * icônes encore sous forme de clés texte — voir hydrateCarnet pour l'affichage).
 */
export const parsePdfToCarnet = async (rawText, apiKey) => {
  if (!apiKey) {
    throw new Error("Clé API Gemini absente (REACT_APP_JAPON_GEMINI_KEY). Le parsing IA n'est disponible qu'en environnement configuré.");
  }
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  const body = {
    contents: [{ role: 'user', parts: [{ text: buildParsePrompt(rawText) }] }],
    generationConfig: {
      temperature: 0.2,
      maxOutputTokens: 8192,
      responseMimeType: 'application/json',
      responseSchema: CARNET_SCHEMA,
    },
  };
  const data = await fetchWithRetry(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const text = data.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') || '';
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error("La réponse de l'IA n'est pas un JSON valide. Réessaie avec ce document.");
  }
  return parsed;
};

/* ------------------------------------------------------------------ *
 * 3) HYDRATATION — JSON sérialisable → objets prêts pour le rendu.   *
 *    On reproduit la forme de itineraryData (clés région, days[],    *
 *    steps[] avec icône JSX et mapUrl auto).                         *
 * ------------------------------------------------------------------ */
const slugify = (s = '') =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'circuit';

const mapsUrl = (name) => `https://maps.google.com/?q=${encodeURIComponent(name)}`;

/** Transforme le carnet brut (clés icônes) en structures prêtes à afficher. */
export const hydrateCarnet = (raw) => {
  if (!raw) return null;
  const regionsMeta = [];
  const itineraryData = {};

  (raw.regions || []).forEach((region, idx) => {
    const id = `${slugify(region.name)}-${idx}`;
    regionsMeta.push({
      id,
      name: region.name,
      icon: resolveIcon(guessIconKey(region.name), { size: 16, fallbackText: region.name }),
    });
    itineraryData[id] = {
      chapter: region.name,
      desc: region.desc || '',
      days: (region.days || []).map((day) => ({
        date: day.date || '',
        title: day.title || region.name,
        simplissime: '',
        steps: (day.steps || []).map((step) => ({
          time: step.time || '',
          title: step.title || '',
          desc: step.desc || '',
          icon: resolveIcon(step.icon, { size: 20, fallbackText: `${step.title} ${step.desc}` }),
          image: step.image || null,
          mapUrl: step.title ? mapsUrl(step.title) : null,
          isOutdoor: false,
        })),
      })),
    };
  });

  const addresses = (raw.addresses || []).map((a) => ({
    ...a,
    icon: resolveIcon(a.icon, { size: 20, fallbackText: `${a.name} ${a.category} ${a.desc}` }),
    mapUrl: a.name ? mapsUrl(a.name) : null,
  }));

  return {
    title: raw.title || 'Carnet importé',
    author: raw.author || '',
    intro: raw.intro || '',
    outro: raw.outro || '',
    regionsMeta,
    itineraryData,
    addresses,
    lexique: raw.lexique || [],
    conseils: raw.conseils || [],
  };
};

/* La persistance (carnet + images lourdes) est gérée par lib/carnetStore.js
   via IndexedDB — localStorage ne tiendrait pas les photos en base64. */
