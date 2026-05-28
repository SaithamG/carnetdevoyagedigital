import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { EXCHANGE_RATE } from '../data/constants';

const ConverterWidget = () => {
  const [quickYen, setQuickYen] = useState('3500');

  return (
    <div className="fixed bottom-6 right-4 md:right-8 bg-slate-900/90 backdrop-blur-md border border-slate-700 p-4 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] z-50 w-56 transform transition-transform hover:scale-105 hidden md:block">
      <div className="flex justify-between items-center mb-3">
        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 flex items-center gap-1">
          <Calculator size={12} /> Convertisseur
        </span>
        <span className="text-[8px] text-slate-500">1€ = {EXCHANGE_RATE}¥</span>
      </div>
      <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800 mb-2">
        <span className="text-sm font-black text-slate-500">¥</span>
        <input
          type="number"
          value={quickYen}
          onChange={(e) => setQuickYen(e.target.value)}
          className="bg-transparent text-white font-bold w-full outline-none text-right text-lg"
        />
      </div>
      <div className="text-right">
        <span className="text-2xl font-black text-emerald-400">
          {(parseFloat(quickYen || '0') / EXCHANGE_RATE).toFixed(2)} €
        </span>
      </div>
    </div>
  );
};

export default ConverterWidget;
