import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { hydrateCarnet } from '../lib/pdfImport';
import { saveCarnet, loadCarnet, clearCarnet, loadBrand, saveBrand } from '../lib/carnetStore';

const clone = (o) => (typeof structuredClone === 'function' ? structuredClone(o) : JSON.parse(JSON.stringify(o)));

const CarnetContext = createContext(null);
export const useCarnet = () => useContext(CarnetContext);

/* Source unique de vérité pour la branche Laugx : le carnet est ENTIÈREMENT
   piloté par le PDF importé. Aucune donnée perso ici. */
export const CarnetProvider = ({ children }) => {
  const [raw, setRaw] = useState(null);
  const [brand, setBrand] = useState(loadBrand());
  const [loading, setLoading] = useState(true);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    // Garde-fou : si le carnet stocké date d'une version antérieure (qui pouvait
    // contenir des images PDF corrompues noir/rose), on le purge pour forcer un
    // ré-import propre. On bumpe CARNET_VERSION à chaque changement de format.
    const CARNET_VERSION = '2';
    if (localStorage.getItem('laugx_carnet_version') !== CARNET_VERSION) {
      clearCarnet().catch(() => {}).finally(() => {
        localStorage.setItem('laugx_carnet_version', CARNET_VERSION);
        setLoading(false);
      });
      return;
    }
    loadCarnet()
      .then((stored) => { if (stored) setRaw(stored); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const data = useMemo(() => (raw ? hydrateCarnet(raw) : null), [raw]);

  // Remplace tout le carnet (après un import) + persiste.
  const importCarnet = async (newRaw) => {
    setRaw(newRaw);
    setDirty(false);
    await saveCarnet(newRaw);
  };

  // Édition en mémoire (sauvegarde explicite via saveNow).
  const updateRaw = (mutator) => {
    setRaw((prev) => {
      const next = clone(prev);
      mutator(next);
      return next;
    });
    setDirty(true);
  };

  const saveNow = async () => {
    if (raw) { await saveCarnet(raw); setDirty(false); }
  };

  const updateBrand = (patch) => {
    setBrand((prev) => {
      const next = { ...prev, ...patch };
      saveBrand(next);
      return next;
    });
  };

  const clearAll = async () => {
    await clearCarnet();
    setRaw(null);
    setDirty(false);
  };

  return (
    <CarnetContext.Provider
      value={{ raw, brand, data, loading, dirty, importCarnet, updateRaw, saveNow, updateBrand, clearAll }}
    >
      {children}
    </CarnetContext.Provider>
  );
};
