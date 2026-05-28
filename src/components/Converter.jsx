import React, { useState } from 'react';
import { Calculator, ArrowRightLeft } from 'lucide-react';
import { EXCHANGE_RATE } from '../data/constants';

const Converter = () => {
  const [convAmount, setConvAmount] = useState('1000');
  const [isJpyToEur, setIsJpyToEur] = useState(true);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-slate-900 p-6 md:p-8 rounded-[2rem] border border-slate-800 shadow-xl max-w-lg mx-auto">
        <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
          <Calculator className="text-blue-400 w-6 h-6" />
          <div>
            <h3 className="font-black italic text-white text-lg">Convertisseur Rapide</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              Taux estimé : 1€ = {EXCHANGE_RATE}¥
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="w-full bg-slate-950 p-4 rounded-2xl border border-slate-800 flex justify-between items-center">
            <span className="text-xl font-black text-slate-400">{isJpyToEur ? '¥ (JPY)' : '€ (EUR)'}</span>
            <input
              type="number"
              value={convAmount}
              onChange={(e) => setConvAmount(e.target.value)}
              className="bg-transparent text-right text-3xl font-black text-white outline-none w-1/2"
            />
          </div>

          <button
            onClick={() => setIsJpyToEur(!isJpyToEur)}
            className="bg-slate-800 p-3 rounded-full hover:bg-blue-600 transition-colors border border-slate-700 hover:border-blue-500 text-white shadow-lg"
          >
            <ArrowRightLeft size={20} />
          </button>

          <div className="w-full bg-blue-900/20 p-4 rounded-2xl border border-blue-900/50 flex justify-between items-center">
            <span className="text-xl font-black text-blue-400">{isJpyToEur ? '€ (EUR)' : '¥ (JPY)'}</span>
            <span className="text-3xl font-black text-white">
              {isJpyToEur
                ? (parseFloat(convAmount || 0) / EXCHANGE_RATE).toFixed(2)
                : (parseFloat(convAmount || 0) * EXCHANGE_RATE).toFixed(0)}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-6">
          {[1000, 5000, 10000].map((val) => (
            <button
              key={val}
              onClick={() => { setConvAmount(val.toString()); setIsJpyToEur(true); }}
              className="bg-slate-800 hover:bg-slate-700 py-2 rounded-xl text-xs font-bold text-slate-300 transition-colors border border-slate-700"
            >
              {val} ¥
            </button>
          ))}
        </div>

        <div className="mt-4 text-center">
          <p className="text-[10px] text-slate-400">
            Transactions sécurisées sans frais via <strong>Revolut</strong>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Converter;
