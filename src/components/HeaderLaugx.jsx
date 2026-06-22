import React, { useEffect, useState } from 'react';
import { BookOpen, MapPin, Wrench } from 'lucide-react';

const TABS = [
  { id: 'carnet', label: 'Carnet', icon: <BookOpen size={16} /> },
  { id: 'carte', label: 'Carte', icon: <MapPin size={16} /> },
  { id: 'gerer', label: 'Gérer', icon: <Wrench size={16} /> },
];

const computeLeft = (target) => {
  const diff = +new Date(target) - Date.now();
  if (!target || isNaN(diff) || diff <= 0) return null;
  return {
    jours: Math.floor(diff / 86400000),
    heures: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
  };
};

/* En-tête 100 % white-label : tout vient de la marque (brand) et du carnet
   importé. Aucune info perso. Le compte à rebours n'apparaît que si une date
   de voyage a été renseignée. */
const HeaderLaugx = ({ brand, title, activeTab, setActiveTab }) => {
  const accent = brand?.accent || '#c9683f';
  const [left, setLeft] = useState(() => computeLeft(brand?.tripStart));

  useEffect(() => {
    setLeft(computeLeft(brand?.tripStart));
    if (!brand?.tripStart) return undefined;
    const t = setInterval(() => setLeft(computeLeft(brand.tripStart)), 60000);
    return () => clearInterval(t);
  }, [brand?.tripStart]);

  return (
    <header className="bg-slate-900 border-b border-slate-800 p-6 sticky top-0 z-50 shadow-xl">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
          <div className="flex items-center gap-3">
            {brand?.logo ? (
              <img src={brand.logo} alt={brand.name} className="h-10 object-contain" />
            ) : (
              <span className="text-2xl font-black italic tracking-tight" style={{ color: accent }}>
                {brand?.name || 'Carnet'}
              </span>
            )}
            {title && <span className="hidden md:inline text-slate-500 font-bold">·</span>}
            {title && <span className="hidden md:inline text-white font-bold italic">{title}</span>}
          </div>

          {left && (
            <div className="flex items-center gap-3 px-4 py-2 bg-slate-950/80 border border-slate-800 rounded-xl w-fit">
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Départ dans</span>
              <div className="flex items-baseline gap-1 font-mono font-black">
                <span className="text-lg" style={{ color: accent }}>{left.jours}</span>
                <span className="text-[10px] text-slate-500">J</span>
                <span className="text-slate-300 ml-1">{left.heures}</span>
                <span className="text-[10px] text-slate-500">H</span>
                <span className="text-slate-300 ml-1">{left.minutes}</span>
                <span className="text-[10px] text-slate-500">M</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {TABS.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                  active ? 'text-white border-transparent' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
                style={active ? { backgroundColor: accent } : undefined}
              >
                {tab.icon} {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default HeaderLaugx;
