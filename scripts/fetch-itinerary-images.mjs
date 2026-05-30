// Source les photos des lieux de l'itinéraire et les télécharge en local dans
// public/images/itinerary/<slug>.jpg (offline-first, licence Wikimedia).
//
// Deux stratégies, AUCUN fallback thématique générique (cause des doublons) :
//   1. EXACT   : lieux notables -> image de l'article Wikipédia exact.
//   2. GEO     : lieux de quartier (restos, salles, hôtels) -> photo Wikimedia
//                Commons géolocalisée la plus proche des coordonnées du lieu.
// Si rien de fiable n'est trouvé : pas de fichier. L'UI affiche alors un
// placeholder propre (dégradé + icône + nom), jamais une photo fausse.
//
// Coordonnées lues depuis src/data/itineraryGeo.js (source de vérité unique).
// Usage : node scripts/fetch-itinerary-images.mjs
import { writeFile, mkdir, access, readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'public', 'images', 'itinerary');
const GEO_FILE = join(__dirname, '..', 'src', 'data', 'itineraryGeo.js');
const UA = 'CarnetVoyageDigital/1.0 (https://github.com/SaithamG/carnetdevoyagedigital; hamelmathias@gmail.com)';
const WIDTH = 900;

const slug = (mapUrl) => {
  const q = (mapUrl.split('q=')[1] || '').replace(/\+/g, ' ');
  return decodeURIComponent(q)
    .toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
};

// Override manuel : fichier Wikimedia Commons précis épinglé sur un lieu
// (priorité maximale). Pour les cas où l'article/geosearch ne donne pas la
// bonne image mais qu'un fichier libre exact existe. Valeur = titre "File:...".
const DIRECT = {
  'https://maps.google.com/?q=teamLab+Borderless+Azabudai+Hills': 'File:TeamLab Borderless Azabudai Hills.jpg',
};

// Article Wikipédia exact pour les lieux notables (temples, châteaux, gares,
// quartiers, attractions). Tout mapUrl absent d'ici passe en stratégie GEO.
const EXACT = {
  'https://maps.google.com/?q=Tokyo+Haneda+Airport': 'Haneda Airport',
  'https://maps.google.com/?q=Toyoko+Inn+Shinjuku+Kabukicho': 'Kabukichō',
  'https://maps.google.com/?q=Godzilla+Head+Shinjuku': 'Shinjuku Toho Building',
  'https://maps.google.com/?q=Meiji+Jingu': 'Meiji Shrine',
  'https://maps.google.com/?q=Shibuya+Crossing': 'Shibuya Crossing',
  'https://maps.google.com/?q=Shibuya+Sky': 'Shibuya Scramble Square',
  'https://maps.google.com/?q=Tokyo+Metropolitan+Gymnasium': 'Tokyo Metropolitan Gymnasium',
  'https://maps.google.com/?q=Shinjuku+Station': 'Shinjuku Station',
  'https://maps.google.com/?q=Toshogu+Shrine+Nikko': 'Nikkō Tōshō-gū',
  'https://maps.google.com/?q=Kegon+Falls': 'Kegon Falls',
  'https://maps.google.com/?q=Omoide+Yokocho': 'Omoide Yokocho',
  'https://maps.google.com/?q=Owakudani': 'Ōwakudani',
  'https://maps.google.com/?q=Lake+Ashi': 'Lake Ashi',
  'https://maps.google.com/?q=Senso-ji': 'Sensō-ji',
  'https://maps.google.com/?q=Tokyo+Metropolitan+Government+Building': 'Tokyo Metropolitan Government Building',

  'https://maps.google.com/?q=Tokyo+Station': 'Tokyo Station',
  'https://maps.google.com/?q=Kyoto+Station': 'Kyoto Station',
  'https://maps.google.com/?q=Fushimi+Inari+Taisha': 'Fushimi Inari-taisha',
  'https://maps.google.com/?q=Arashiyama+Bamboo+Grove': 'Arashiyama',
  'https://maps.google.com/?q=Kinkaku-ji': 'Kinkaku-ji',
  'https://maps.google.com/?q=Pontocho+Alley': 'Pontocho',
  'https://maps.google.com/?q=Kiyomizu-dera': 'Kiyomizu-dera',
  'https://maps.google.com/?q=Nishiki+Market': 'Nishiki Market',
  'https://maps.google.com/?q=Yasaka+Shrine': 'Yasaka Shrine',
  'https://maps.google.com/?q=Ginkaku-ji': 'Ginkaku-ji',
  'https://maps.google.com/?q=Nanzen-ji': 'Nanzen-ji',
  'https://maps.google.com/?q=Eikando+Zenrinji+Temple': 'Eikan-dō Zenrin-ji',

  'https://maps.google.com/?q=Amerikamura': 'Amerikamura',
  'https://maps.google.com/?q=Dotonbori': 'Dōtonbori',
  'https://maps.google.com/?q=Denden+Town': 'Den Den Town',
  'https://maps.google.com/?q=Namba+Yasaka+Shrine': 'Namba Yasaka Shrine',
  'https://maps.google.com/?q=Umeda+Sky+Building': 'Umeda Sky Building',
  'https://maps.google.com/?q=Osaka+Castle': 'Osaka Castle',
  'https://maps.google.com/?q=Shinsekai': 'Shinsekai',
  'https://maps.google.com/?q=Kofukuji': 'Kōfuku-ji',
  'https://maps.google.com/?q=Nara+Park': 'Nara Park',
  'https://maps.google.com/?q=Kasuga+Taisha': 'Kasuga-taisha',
  'https://maps.google.com/?q=Himeji+Castle': 'Himeji Castle',
  'https://maps.google.com/?q=Mount+Rokko+Cable+Car': 'Mount Rokkō',
  'https://maps.google.com/?q=Universal+Studios+Japan': 'Universal Studios Japan',

  'https://maps.google.com/?q=Shin-Osaka+Station': 'Shin-Ōsaka Station',
  'https://maps.google.com/?q=Hiroshima+Castle': 'Hiroshima Castle',
  'https://maps.google.com/?q=Hiroshima+Peace+Memorial+Museum': 'Hiroshima Peace Memorial Museum',
  'https://maps.google.com/?q=Shukkei-en': 'Shukkei-en',
  'https://maps.google.com/?q=Itsukushima+Floating+Torii+Gate': 'Itsukushima Shrine',
  'https://maps.google.com/?q=Mount+Misen': 'Mount Misen',

  'https://maps.google.com/?q=Hiroshima+Station': 'Hiroshima Station',
  'https://maps.google.com/?q=Unicorn+Gundam+Statue': 'DiverCity Tokyo Plaza',
  'https://maps.google.com/?q=Tokyo+Joypolis': 'Tokyo Joypolis',
  'https://maps.google.com/?q=Ueno+Station': 'Ueno Station',
  'https://maps.google.com/?q=Tsurugaoka+Hachimangu': 'Tsurugaoka Hachimangū',
  'https://maps.google.com/?q=Hokokuji+Temple': 'Hōkoku-ji',
  'https://maps.google.com/?q=Kotoku-in': 'Kōtoku-in',
  'https://maps.google.com/?q=Enoshima+Island': 'Enoshima',
  'https://maps.google.com/?q=Ameyoko': 'Ameyoko',
  'https://maps.google.com/?q=Yanaka+Ginza': 'Yanaka, Tokyo',
  'https://maps.google.com/?q=Akihabara': 'Akihabara',
  'https://maps.google.com/?q=Keisei-Ueno+Station': 'Keisei Ueno Station',
};

const headers = { 'User-Agent': UA, Accept: 'application/json' };

// Lit les coordonnées [lat, lon] par mapUrl directement dans itineraryGeo.js.
async function loadGeo() {
  const txt = await readFile(GEO_FILE, 'utf8');
  const re = /['"](https:\/\/maps[^'"]+)['"]\s*:\s*\{\s*coords:\s*\[\s*(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)\s*\]/g;
  const out = [];
  let m;
  while ((m = re.exec(txt)) !== null) {
    out.push({ mapUrl: m[1], coords: [parseFloat(m[2]), parseFloat(m[3])] });
  }
  return out;
}

// Normalise une source upload.wikimedia vers Special:FilePath (largeur servie
// à la volée — les URLs upload arbitraires renvoient 400 si non pré-générées).
function toFilePath(src) {
  let fname;
  if (src.includes('/thumb/')) {
    const parts = src.split('/');
    fname = parts[parts.length - 2];
  } else {
    fname = src.split('/').pop();
  }
  const host = src.includes('/wikipedia/commons/')
    ? 'https://commons.wikimedia.org'
    : 'https://en.wikipedia.org';
  return `${host}/wiki/Special:FilePath/${fname}?width=${WIDTH}`;
}

// EXACT : image principale de l'article Wikipédia.
async function imageExact(title) {
  const r = await fetch(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`,
    { headers }
  );
  if (!r.ok) return null;
  const j = await r.json();
  const src = j?.originalimage?.source || j?.thumbnail?.source;
  return src ? toFilePath(src) : null;
}

const BAD = /(map|plan|diagram|logo|icon|flag|seal|crest|emblem|locator|svg|sign|poster|chart|graph|panorama_label)/i;

// GEO : photo Commons géolocalisée la plus proche des coordonnées, filtrée
// (jpeg paysage, pas de carte/logo/diagramme).
async function imageGeo([lat, lon]) {
  const url =
    `https://commons.wikimedia.org/w/api.php?action=query&format=json&origin=*` +
    `&generator=geosearch&ggscoord=${lat}%7C${lon}&ggsradius=600&ggslimit=30&ggsnamespace=6` +
    `&prop=imageinfo&iiprop=url%7Cmime%7Csize`;
  const r = await fetch(url, { headers });
  if (!r.ok) return null;
  const j = await r.json();
  const pages = Object.values(j?.query?.pages || {});
  const candidates = pages
    .map((p) => ({ title: p.title, info: p.imageinfo?.[0] }))
    .filter((c) => c.info && c.info.mime === 'image/jpeg')
    .filter((c) => c.info.width >= 700 && c.info.width >= c.info.height) // paysage HD
    .filter((c) => !BAD.test(c.title));
  if (!candidates.length) return null;
  // geosearch trie déjà par distance croissante ; on prend le premier valide.
  return toFilePath(candidates[0].info.url);
}

async function download(url, dest) {
  const r = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!r.ok) return false;
  if (!(r.headers.get('content-type') || '').startsWith('image/')) return false;
  const buf = Buffer.from(await r.arrayBuffer());
  if (buf.length < 3000) return false;
  await writeFile(dest, buf);
  return true;
}

async function run() {
  await mkdir(OUT, { recursive: true });
  const places = await loadGeo();
  let exact = 0, geo = 0, none = 0;
  const noneList = [];

  for (const { mapUrl, coords } of places) {
    const name = slug(mapUrl);
    const dest = join(OUT, `${name}.jpg`);

    if (await access(dest).then(() => true, () => false)) {
      console.log(`· ${name} (déjà présent)`);
      continue;
    }

    const title = EXACT[mapUrl];
    const direct = DIRECT[mapUrl];
    let url = null;
    let strat = '';

    if (direct) {
      const fname = direct.replace(/^File:/, '').replace(/ /g, '_');
      url = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fname)}?width=${WIDTH}`;
      strat = 'direct';
    }
    if (!url && title) {
      url = await imageExact(title).catch(() => null);
      strat = 'exact';
    }
    if (!url) {
      url = await imageGeo(coords).catch(() => null);
      strat = 'geo';
    }

    let saved = false;
    if (url) {
      saved = await download(url, dest).catch(() => false);
      if (!saved) {
        await new Promise((res) => setTimeout(res, 800));
        saved = await download(url, dest).catch(() => false);
      }
    }

    if (saved) {
      if (strat === 'direct') { exact++; console.log(`★ ${name}  (direct: ${direct})`); }
      else if (strat === 'exact') { exact++; console.log(`✓ ${name}  (${title})`); }
      else { geo++; console.log(`~ ${name}  (geo ${coords.join(',')})`); }
    } else {
      none++; noneList.push(name); console.log(`✗ ${name}  -> placeholder`);
    }
    await new Promise((res) => setTimeout(res, 300));
  }

  console.log(`\nExact: ${exact}  |  Géo: ${geo}  |  Placeholder: ${none}`);
  if (noneList.length) console.log('Placeholders:', noneList.join(', '));
}

run();
