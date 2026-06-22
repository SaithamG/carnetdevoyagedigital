import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';

import { CarnetProvider, useCarnet } from './context/CarnetContext';
import HeaderLaugx from './components/HeaderLaugx';
import ImportedCarnet from './components/ImportedCarnet';
import CarteImport from './components/CarteImport';
import ImportPdf from './components/ImportPdf';

// Appli Laugx : 100 % pilotée par le PDF importé. Aucune donnée perso.
const LaugxApp = () => {
  const { loading, raw, data, brand } = useCarnet();
  const [activeTab, setActiveTab] = useState('carnet');

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
        <div className="w-full">
          <ImportPdf />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-200 pb-16 selection:bg-blue-500/30">
      <HeaderLaugx brand={brand} title={data?.title} activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="max-w-5xl mx-auto p-4 md:p-6 mt-4">
        {activeTab === 'carnet' && <ImportedCarnet data={data} brand={brand} />}
        {activeTab === 'carte' && <CarteImport data={data} brand={brand} />}
        {activeTab === 'gerer' && <ImportPdf />}
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
