import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

import { CarnetProvider, useCarnet } from './context/CarnetContext';
import HeaderLaugx from './components/HeaderLaugx';
import Itinerary from './components/Itinerary';
import CarteImport from './components/CarteImport';
import Lexique from './components/Lexique';
import Checklist from './components/Checklist';
import Converter from './components/Converter';
import Urgences from './components/Urgences';
import ImportPdf from './components/ImportPdf';

// Appli white-label : mêmes écrans que d'habitude, mais les données viennent
// du PDF importé (via le contexte). Aucune donnée perso de Mathias.
const LaugxApp = () => {
  const { loading, raw, data, brand } = useCarnet();
  const [activeTab, setActiveTab] = useState('roadbook');
  const [activeRegion, setActiveRegion] = useState(null);

  // Cale la région active sur la 1re région du carnet importé.
  useEffect(() => {
    const ids = data?.regionsMeta?.map((r) => r.id) || [];
    if (ids.length && !ids.includes(activeRegion)) setActiveRegion(ids[0]);
  }, [data, activeRegion]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  // Pas encore de carnet importé → écran d'import en plein écran.
  if (!raw) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-200 p-4 md:p-8 flex items-center">
        <div className="w-full"><ImportPdf /></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-200 pb-16 selection:bg-blue-500/30">
      <HeaderLaugx brand={brand} title={data?.title} activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="max-w-5xl mx-auto p-4 md:p-6 mt-4">
        {activeTab === 'roadbook' && <Itinerary activeRegion={activeRegion} setActiveRegion={setActiveRegion} />}
        {activeTab === 'carte' && <CarteImport data={data} brand={brand} />}
        {activeTab === 'lexique' && <Lexique />}
        {activeTab === 'checklist' && <Checklist />}
        {activeTab === 'conversion' && <Converter />}
        {activeTab === 'urgences' && <Urgences />}
        {activeTab === 'import' && <ImportPdf />}
      </main>
    </div>
  );
};

const App = () => (
  <CarnetProvider>
    <LaugxApp />
  </CarnetProvider>
);

export default App;
