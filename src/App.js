import React, { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';

import Header from './components/Header';
import Overview from './components/Overview';
import Finance from './components/Finance';
import SuiviDepenses from './components/SuiviDepenses';
import Itinerary from './components/Itinerary';
import Carte from './components/Carte';
import Transport from './components/Transport';
import Converter from './components/Converter';
import ConverterWidget from './components/ConverterWidget';
import Checklist from './components/Checklist';
import Lexique from './components/Lexique';
import Runbook from './components/Runbook';
import Urgences from './components/Urgences';
import ModeVoyage from './components/ModeVoyage';
import ChronoTabehoudai from './components/ChronoTabehoudai';
import CoachIA from './components/CoachIA';

const calculerTempsRestant = () => {
  const difference = +new Date('2026-11-08T00:00:00') - +new Date();
  if (difference <= 0) return { jours: 0, heures: 0, minutes: 0, secondes: 0 };
  return {
    jours: Math.floor(difference / (1000 * 60 * 60 * 24)),
    heures: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    secondes: Math.floor((difference / 1000) % 60),
  };
};

const TAB_COMPONENTS = {
  voyage: ModeVoyage,
  overview: Overview,
  finance: Finance,
  expenses: SuiviDepenses,
  carte: Carte,
  transport: Transport,
  conversion: Converter,
  checklist: Checklist,
  lexique: Lexique,
  runbook: Runbook,
  urgences: Urgences,
};

const App = () => {
  const [activeTab, setActiveTab] = useState('finance');
  const [activeRegion, setActiveRegion] = useState('tokyo1');
  const [timeLeft, setTimeLeft] = useState(calculerTempsRestant());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculerTempsRestant()), 1000);
    return () => clearInterval(timer);
  }, []);

  const renderTab = () => {
    if (activeTab === 'roadbook') {
      return <Itinerary activeRegion={activeRegion} setActiveRegion={setActiveRegion} />;
    }
    if (activeTab === 'ai') {
      return <CoachIA activeRegion={activeRegion} />;
    }
    const TabComponent = TAB_COMPONENTS[activeTab];
    return TabComponent ? <TabComponent /> : null;
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-200 pb-24 selection:bg-blue-500/30">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} timeLeft={timeLeft} />

      <main className="max-w-5xl mx-auto p-4 md:p-6 mt-4">
        {renderTab()}
      </main>

      <ConverterWidget />
      <ChronoTabehoudai />

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl bg-slate-900 text-white p-4 rounded-3xl shadow-2xl flex justify-between items-center border border-slate-800 hidden md:flex">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-600 rounded-lg">
            <Globe size={16} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase opacity-60 leading-none mb-1">Carnet de Voyage Digital</p>
            <p className="text-xs font-bold leading-none italic underline">Release Candidate V_FINAL</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
