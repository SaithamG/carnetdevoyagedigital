// Stockage des photos perso du carnet en IndexedDB (les blobs sont trop gros
// pour localStorage). Une photo = un enregistrement { id, stepKey, blob, ts }.
// stepKey = `${day.date}_${step.time}` (même clé que les étapes visitées).

const DB_NAME = 'japan_journal';
const STORE = 'photos';
const MAX_DIM = 1600; // redimensionne les photos de téléphone avant stockage
const QUALITY = 0.82;

let dbPromise = null;

const openDB = () => {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        const os = db.createObjectStore(STORE, { keyPath: 'id', autoIncrement: true });
        os.createIndex('stepKey', 'stepKey', { unique: false });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
  return dbPromise;
};

const tx = async (mode, fn) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const t = db.transaction(STORE, mode);
    const store = t.objectStore(STORE);
    const out = fn(store);
    t.oncomplete = () => resolve(out.result !== undefined ? out.result : out);
    t.onerror = () => reject(t.error);
  });
};

// Compresse/redimensionne une image vers un blob JPEG raisonnable.
const compress = (file) =>
  new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const scale = Math.min(1, MAX_DIM / Math.max(img.width, img.height));
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      canvas.toBlob((blob) => resolve(blob || file), 'image/jpeg', QUALITY);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(file); // si décodage impossible, on stocke l'original
    };
    img.src = url;
  });

export const addPhotos = async (stepKey, fileList) => {
  const files = Array.from(fileList).filter((f) => f.type.startsWith('image/'));
  const records = [];
  for (const file of files) {
    const blob = await compress(file);
    const id = await tx('readwrite', (store) =>
      store.add({ stepKey, blob, ts: Date.now() })
    );
    records.push({ id, stepKey, blob, ts: Date.now() });
  }
  return records;
};

export const getPhotos = (stepKey) =>
  tx('readonly', (store) => store.index('stepKey').getAll(stepKey));

export const deletePhoto = (id) => tx('readwrite', (store) => store.delete(id));

export const countAllPhotos = () => tx('readonly', (store) => store.count());

export const getAllPhotos = () => tx('readonly', (store) => store.getAll());
