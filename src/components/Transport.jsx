import React from 'react';
import { TrainFront, Train } from 'lucide-react';
import { transports } from '../data/transports';

const Transport = () => (
  <div className="space-y-6 animate-in fade-in duration-500">
    <div className="bg-slate-900 p-6 rounded-[2rem] border border-slate-800 shadow-xl">
      <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
        <TrainFront className="text-orange-400 w-6 h-6" />
        <div>
          <h3 className="font-black italic text-white text-lg">Logistique des Transports</h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Liaisons inter-villes & aéroports</p>
        </div>
      </div>

      <div className="space-y-4 relative before:absolute before:inset-0 before:ml-[28px] before:-translate-x-px before:w-0.5 before:bg-slate-800">
        {transports.map((route, i) => (
          <div key={i} className="relative flex items-center gap-4">
            <div className="w-14 h-14 rounded-full border-4 border-slate-900 bg-slate-800 flex flex-col items-center justify-center text-[10px] font-black text-slate-400 shrink-0 z-10">
              <Train
                size={16}
                className={route.cost.includes('105') ? 'text-emerald-400' : 'text-orange-400'}
              />
            </div>
            <div className="flex-1 bg-slate-950 p-4 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition-colors">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 gap-2">
                <h4 className="font-bold text-white text-sm">{route.from} ➔ {route.to}</h4>
                <span className={`text-xs font-black px-2 py-1 rounded-md w-fit ${
                  route.cost.includes('105') ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-300'
                }`}>
                  {route.cost}
                </span>
              </div>
              <p className="text-[11px] font-bold text-orange-400 mb-1">{route.type}</p>
              <p className="text-[11px] text-slate-400 leading-relaxed">{route.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Transport;
