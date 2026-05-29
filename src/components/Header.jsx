import React, { useState, useEffect } from 'react';
import {
  Globe, CheckCircle2, Check,
  Map, Wallet, Calendar, TrainFront, Calculator,
  CheckSquare, Languages, ListChecks, Sparkles, Receipt, ShieldAlert, Navigation, MapPin,
} from 'lucide-react';

const EXCHANGE_RATE = 185;
const TOTAL_BUDGET_YEN = 1296 * EXCHANGE_RATE;

const TRIP_START = new Date(2026, 10, 9);
const TRIP_END   = new Date(2026, 10, 30);

const isTripActive = () => {
  const today = new Date();
  return today >= TRIP_START && today <= TRIP_END;
};

const TAB_META = {
  voyage:     { icon: <Navigation size={16} />,  label: 'Mode Voyage' },
  overview:   { icon: <Map size={16} />,         label: "Vue d'ensemble" },
  finance:    { icon: <Wallet size={16} />,      label: 'Finance & Budget' },
  checklist:  { icon: <CheckSquare size={16} />, label: 'Logistique & Valise' },
  runbook:    { icon: <ListChecks size={16} />,  label: 'Rappels & Résas' },
  roadbook:   { icon: <Calendar size={16} />,    label: 'Itinéraire' },
  carte:      { icon: <MapPin size={16} />,      label: 'Carte' },
  transport:  { icon: <TrainFront size={16} />,  label: 'Trajets & Transports' },
  expenses:   { icon: <Receipt size={16} />,     label: 'Suivi Dépenses' },
  conversion: { icon: <Calculator size={16} />,  label: 'Convertisseur' },
  lexique:    { icon: <Languages size={16} />,   label: 'Lexique Survie' },
  ai:         { icon: <Sparkles size={16} />,    label: 'Coach IA' },
  urgences:   { icon: <ShieldAlert size={16} />, label: 'Urgences 🚨' },
};

const NAV_GROUPS = [
  { id: 'prepare',  label: 'Préparer',  tabs: ['overview', 'finance', 'checklist', 'runbook'] },
  { id: 'surplace', label: 'Sur place', tabs: ['roadbook', 'transport'] },
  { id: 'outils',   label: 'Outils',    tabs: ['expenses', 'conversion', 'lexique', 'ai'] },
];

const groupOfTab = (tabId) => NAV_GROUPS.find((g) => g.tabs.includes(tabId))?.id;

const Header = ({ activeTab, setActiveTab, timeLeft }) => {
  const expenses = JSON.parse(localStorage.getItem('japan_expenses') || '[]');
  const totalSpentYen = expenses.reduce((acc, curr) => acc + curr.amountYen, 0);

  const [openGroup, setOpenGroup] = useState(() => groupOfTab(activeTab) || 'prepare');

  useEffect(() => {
    const g = groupOfTab(activeTab);
    if (g) setOpenGroup(g);
  }, [activeTab]);

  const tripLive = isTripActive();
  const activeGroupTabs = NAV_GROUPS.find((g) => g.id === openGroup)?.tabs || [];

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

      {/* NAV NIVEAU 1 : raccourcis + groupes */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 pt-2 items-center">
        <button
          onClick={() => setActiveTab('voyage')}
          className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'voyage'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40 border border-emerald-500'
              : 'bg-emerald-900/30 border border-emerald-700/50 text-emerald-400 hover:bg-emerald-900/50'
          }`}
        >
          {TAB_META.voyage.icon} {TAB_META.voyage.label}
          {tripLive && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse border border-slate-900" />
          )}
        </button>

        <div className="w-px h-7 bg-slate-800 shrink-0" />

        {NAV_GROUPS.map((group) => {
          const isOpen = openGroup === group.id;
          const hasActive = group.tabs.includes(activeTab);
          return (
            <button
              key={group.id}
              onClick={() => setOpenGroup(group.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                isOpen
                  ? 'bg-slate-800 border-slate-600 text-white'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              {group.label}
              {hasActive && <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
            </button>
          );
        })}

        <div className="w-px h-7 bg-slate-800 shrink-0" />

        <button
          onClick={() => setActiveTab('urgences')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
            activeTab === 'urgences'
              ? 'bg-red-600 text-white shadow-lg shadow-red-900/40 border-red-500'
              : 'bg-red-950/30 border-red-900/50 text-red-400 hover:bg-red-900/40'
          }`}
        >
          {TAB_META.urgences.icon} {TAB_META.urgences.label}
        </button>
      </div>

      {/* NAV NIVEAU 2 : sous-onglets du groupe ouvert */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 pt-2 mt-1 border-t border-slate-800/60">
        {activeGroupTabs.map((tabId) => {
          const active = activeTab === tabId;
          return (
            <button
              key={tabId}
              onClick={() => setActiveTab(tabId)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                active
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40 border-blue-500'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              {TAB_META[tabId].icon} {TAB_META[tabId].label}
            </button>
          );
        })}
      </div>
    </div>
  </header>
  );
};

export default Header;
