import React, { useState } from 'react';
import { Calculator, Minimize2 } from 'lucide-react';
import { EXCHANGE_RATE } from '../data/constants';

const ConverterWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [quickYen, setQuickYen] = useState('3500');

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-4 md:right-8 z-50 w-14 h-14 bg-blue-600 hover:bg-blue-500 text-white rounded-full flex items-center justify-center shadow-2xl border border-blue-500 transition-all transform hover:scale-110"
        title="Convertisseur ¥ → €"
      >
        <Calculator size={24} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-4 md:right-8 z-50 w-64 bg-slate-900/95 backdrop-blur-md border border-slate-700 p-4 rounded-3xl shadow-2xl animate-in zoom-in-95">
      <button
        onClick={() => setIsOpen(false)}
        className="absolute top-3 right-3 text-slate-500 hover:text-white transition-colors"
      >
        <Minimize2 size={16} />
      </button>

      <div className="flex justify-between items-center mb-3 pr-6">
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
