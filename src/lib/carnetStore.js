/* Stockage local du carnet importé.
 * - Le carnet brut (avec photos en base64) part dans IndexedDB : volumineux,
 *   localStorage (~5 Mo) ne tiendrait pas.
 * - La config de marque (légère) reste dans localStorage.
 */

const DB_NAME = 'laugx_carnet';
const STORE = 'carnets';
const CURRENT_KEY = 'current';

const openDB = () =>
  new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });

const tx = async (mode, fn) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const t = db.transaction(STORE, mode);
    const store = t.objectStore(STORE);
    const request = fn(store);
    t.oncomplete = () => resolve(request?.result);
    t.onerror = () => reject(t.error);
  });
};

/** Sauvegarde le carnet brut (JSON sérialisable, photos incluses). */
export const saveCarnet = (raw) => tx('readwrite', (s) => s.put(raw, CURRENT_KEY));

/** Charge le carnet brut, ou null. */
export const loadCarnet = () => tx('readonly', (s) => s.get(CURRENT_KEY));

/** Supprime le carnet courant. */
export const clearCarnet = () => tx('readwrite', (s) => s.delete(CURRENT_KEY));

/* --------------------------- Marque (white-label) --------------------------- */

const BRAND_KEY = 'laugx_brand';

export const DEFAULT_BRAND = {
  name: 'Laugx Japon',
  tagline: 'Votre carnet de voyage à Tokyo',
  accent: '#c9683f',
  instagram: 'https://instagram.com/laugueux_11',
  website: '',
  ctaLabel: 'Réserver une expérience sur-mesure',
  ctaUrl: '',
  logo: null, // data URL (petit logo)
};

export const loadBrand = () => {
  try {
    return { ...DEFAULT_BRAND, ...JSON.parse(localStorage.getItem(BRAND_KEY) || '{}') };
  } catch {
    return { ...DEFAULT_BRAND };
  }
};

export const saveBrand = (brand) => {
  try {
    localStorage.setItem(BRAND_KEY, JSON.stringify(brand));
  } catch { /* quota : le logo est peut-être trop gros */ }
};
