import React from 'react';
import { Wallet, Plane, MapPin } from 'lucide-react';
import { budgetData, totalAvantDepart, totalSurPlace, totalBudget } from '../data/budgetData';
import { COLOR_CLASSES } from '../data/colorMap';

const BudgetPoche = ({ title, subtitle, icon, accent, items, total }) => (
  <div className="bg-slate-900 p-6 rounded-[2rem] border border-slate-800">
    <div className="flex justify-between items-start mb-6">
      <div>
        <h3 className="font-black italic text-white flex items-center gap-2 mb-1">{icon} {title}</h3>
        <p className="text-[10px] text-slate-400 uppercase font-bold">{subtitle}</p>
      </div>
      <div className="text-right">
        <p className="text-[10px] text-slate-400 uppercase font-bold">Total</p>
        <p className={`text-lg font-black italic ${accent}`}>{total} €</p>
      </div>
    </div>

    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-800">
          <div>
            <p className="text-xs font-bold text-slate-300 flex items-center gap-2">
              <span className={COLOR_CLASSES[item.color].text500}>{item.icon}</span>
              {item.label}
            </p>
            <p className="text-[10px] text-slate-500 mt-1">{item.desc}</p>
          </div>
          <p className="text-sm font-black text-white">{item.cost} €</p>
        </div>
      ))}
    </div>
  </div>
);

const Finance = () => {
  const avantItems = budgetData.filter((i) => i.type === 'avant');
  const placeItems = budgetData.filter((i) => i.type === 'place');
  const hasAvant = avantItems.length > 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-6 rounded-[2rem] border border-slate-800 shadow-xl text-center relative overflow-hidden">
        <div className="relative z-10 flex flex-col justify-center items-center">
          <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-1">
            Budget sur place {hasAvant ? '— estimé' : ''}
          </p>
          <p className="text-5xl font-black italic text-white">{hasAvant ? totalBudget : totalSurPlace} €</p>
          <p className="text-xs text-slate-400 mt-3 font-medium max-w-lg">
            Budget pour 2 voyageurs sur 14 jours, prévu en cash (yens) : repas, loisirs et souvenirs. Le vol et les
            hébergements ne sont pas inclus ici.
          </p>
        </div>
      </div>

      <div className={`grid grid-cols-1 gap-6 ${hasAvant ? 'md:grid-cols-2' : ''}`}>
        {hasAvant && (
          <BudgetPoche
            title="Avant le départ"
            subtitle="Vol, hébergement, transports"
            icon={<Plane className="text-blue-400" />}
            accent="text-blue-400"
            items={avantItems}
            total={totalAvantDepart}
          />
        )}
        <BudgetPoche
          title="Sur place"
          subtitle="~50€/jour + loisirs & souvenirs"
          icon={<MapPin className="text-emerald-400" />}
          accent="text-emerald-400"
          items={placeItems}
          total={totalSurPlace}
        />
      </div>

      <div className="bg-slate-900 p-5 rounded-[2rem] border border-slate-800 flex items-center gap-4">
        <div className="w-11 h-11 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
          <Wallet size={20} />
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          Astuce : le suivi des dépenses réelles sur place (en yens) se fait dans l'onglet
          <span className="font-bold text-slate-200"> Suivi Dépenses</span>, catégorie par catégorie.
        </p>
      </div>
    </div>
  );
};

export default Finance;
