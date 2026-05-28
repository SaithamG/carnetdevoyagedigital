import React from 'react';
import {
  Globe, CheckCircle2, Check,
  Map, Wallet, Calendar, TrainFront, Calculator,
  CheckSquare, Languages, ListChecks, Sparkles, Receipt, ShieldAlert, Navigation,
} from 'lucide-react';

const EXCHANGE_RATE = 185;
const TOTAL_BUDGET_YEN = 1296 * EXCHANGE_RATE;

const TRIP_START = new Date(2026, 10, 9);
const TRIP_END   = new Date(2026, 10, 30);

const isTripActive = () => {
  const today = new Date();
  return today >= TRIP_START && today <= TRIP_END;
};

const TABS = [
  { id: 'voyage', icon: <Navigation size={16} />, label: 'Mode Voyage', special: true },
  { id: 'overview', icon: <Map size={16} />, label: "Vue d'ensemble" },
  { id: 'finance', icon: <Wallet size={16} />, label: 'Finance & Budget' },
  { id: 'expenses', icon: <Receipt size={16} />, label: 'Suivi Dépenses' },
  { id: 'roadbook', icon: <Calendar size={16} />, label: 'Itinéraire complet' },
  { id: 'transport', icon: <TrainFront size={16} />, label: 'Trajets & Transports' },
  { id: 'conversion', icon: <Calculator size={16} />, label: 'Convertisseur' },
  { id: 'checklist', icon: <CheckSquare size={16} />, label: 'Logistique & Valise' },
  { id: 'lexique', icon: <Languages size={16} />, label: 'Lexique Survie' },
  { id: 'runbook', icon: <ListChecks size={16} />, label: 'Rappels & Résas' },
  { id: 'urgences', icon: <ShieldAlert size={16} />, label: 'Urgences 🚨' },
  { id: 'ai', icon: <Sparkles size={16} />, label: 'Coach IA' },
];

const Header = ({ activeTab, setActiveTab, timeLeft }) => {
  const expenses = JSON.parse(localStorage.getItem('japan_expenses') || '[]');
  const totalSpentYen = expenses.reduce((acc, curr) => acc + curr.amountYen, 0);

  return (
  <header className="bg-slate-900 border-b border-slate-800 p-6 sticky top-0 z-50 shadow-xl relative overflow-hidden">
    <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
    <div className="max-w-5xl mx-auto relative z-10">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-4">

        <div className="flex flex-col">
          <h1 className="text-2xl font-black italic tracking-tighter flex items-center gap-2 text-white">
            <Globe className="text-blue-500" /> CARNET DE VOYAGE DIGITAL
          </h1>

          <div className="mt-4 flex items-center gap-4 px-4 py-2 bg-slate-900/80 border border-slate-800 rounded-xl w-fit shadow-lg backdrop-blur-sm">
            <div className="flex flex-col">
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">COMPTE À REBOURS</span>
              <span className="text-[11px] font-bold text-blue-500 uppercase tracking-wider mt-0.5">JAPON 2026</span>
            </div>
            <div className="w-px h-6 bg-slate-800" />
            <div className="flex items-center gap-2 font-mono text-sm font-black tracking-tight">
              <div className="flex items-baseline gap-0.5">
                <span className="text-blue-400 text-base">{timeLeft.jours}</span>
                <span className="text-[10px] font-mono font-black text-slate-500 ml-0.5">J</span>
              </div>
              <span className="text-slate-700 font-sans mx-0.5">|</span>
              <div className="flex items-baseline gap-0.5">
                <span className="text-slate-200">{timeLeft.heures}</span>
                <span className="text-[10px] font-mono font-black text-slate-500 ml-0.5">H</span>
              </div>
              <span className="text-slate-800">:</span>
              <div className="flex items-baseline gap-0.5">
                <span className="text-slate-200">{timeLeft.minutes}</span>
                <span className="text-[10px] font-mono font-black text-slate-500 ml-0.5">M</span>
              </div>
              <span className="text-slate-800">:</span>
              <div className="flex items-baseline gap-0.5">
                <span className="text-red-400 animate-pulse">{timeLeft.secondes}</span>
                <span className="text-[10px] font-mono font-black text-red-500/70 ml-0.5">S</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row md:flex-col gap-2 shrink-0 mt-2 md:mt-0">
          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl h-fit">
            <CheckCircle2 size={16} className="text-emerald-500" />
            <div>
              <p className="text-[10px] font-black text-emerald-500 uppercase">Vol Garanti</p>
              <p className="text-xs font-bold text-emerald-100 flex items-center gap-1">
                3/4 Payé <Check size={14} />
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-xl h-fit">
            <Receipt size={16} className="text-blue-400" />
            <div>
              <p className="text-[10px] font-black text-blue-400 uppercase">Dépenses</p>
              <p className="text-xs font-bold text-blue-100">
                {totalSpentYen.toLocaleString('fr-FR')}¥ / {TOTAL_BUDGET_YEN.toLocaleString('fr-FR')}¥
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 pt-2">
        {TABS.map((tab) => {
          const active = activeTab === tab.id;
          const tripLive = tab.special && isTripActive();
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap relative ${
                active
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40 border border-blue-500'
                  : tab.special
                  ? 'bg-emerald-900/30 border border-emerald-700/50 text-emerald-400 hover:bg-emerald-900/50'
                  : 'bg-slate-900 border border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              {tab.icon} {tab.label}
              {tripLive && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse border border-slate-900" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  </header>
  );
};

export default Header;
