import React, { useState, useEffect } from 'react';
import { CheckSquare, Check, Scale, Briefcase } from 'lucide-react';
import { checklistData } from '../data/checklistData';

const Checklist = () => {
  const [checkedItems, setCheckedItems] = useState(() => {
    const saved = localStorage.getItem('sauvegardeChecklist');
    return saved ? JSON.parse(saved) : {};
  });

  const [valiseWeights, setValiseWeights] = useState(() => {
    const saved = localStorage.getItem('japan_weights');
    return saved ? JSON.parse(saved) : { v1: 0, v2: 0 };
  });

  useEffect(() => {
    localStorage.setItem('sauvegardeChecklist', JSON.stringify(checkedItems));
  }, [checkedItems]);

  useEffect(() => {
    localStorage.setItem('japan_weights', JSON.stringify(valiseWeights));
  }, [valiseWeights]);

  const toggleCheck = (id) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const updateWeight = (valise, value) => {
    const w = parseFloat(value);
    setValiseWeights((prev) => ({ ...prev, [valise]: isNaN(w) ? 0 : w }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-slate-900 p-6 rounded-[2rem] border border-slate-800 shadow-xl relative overflow-hidden">
        <CheckSquare className="absolute -right-4 -top-4 w-32 h-32 text-emerald-800 opacity-20" />
        <div className="relative z-10">
          <h2 className="text-xl font-black italic text-white mb-2">Checklist Matérielle</h2>
          <p className="text-xs text-slate-400 max-w-lg leading-relaxed">
            L'équipement indispensable pour éviter tout blocage logistique au Japon.
          </p>
        </div>
      </div>

      {/* BALANCE VALISES */}
      <div className="bg-slate-900 p-6 rounded-[2rem] border border-slate-800 shadow-lg">
        <h3 className="font-black italic text-white text-base mb-4 flex items-center gap-2">
          <Scale className="text-amber-500" /> Balance Valises — Limite 2 x 23 kg
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { key: 'v1', label: 'Valise 1 (Mathias)', color: 'text-blue-400' },
            { key: 'v2', label: 'Valise 2 (Vérane)', color: 'text-pink-400' },
          ].map(({ key, label, color }) => {
            const weight = valiseWeights[key];
            const isOver = weight > 23;
            return (
              <div key={key} className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-xs font-bold text-slate-300 flex items-center gap-2`}>
                    <Briefcase size={14} className={color} /> {label}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => updateWeight(key, e.target.value)}
                      className="bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-sm text-right text-white font-black w-16"
                      step="0.1"
                      min="0"
                    />
                    <span className="text-xs text-slate-500 font-bold">kg</span>
                  </div>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden mt-3">
                  <div
                    className={`h-full transition-all duration-300 ${isOver ? 'bg-red-500' : 'bg-emerald-500'}`}
                    style={{ width: `${Math.min((weight / 23) * 100, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 mt-1.5 font-bold">
                  <span>Max 23 kg</span>
                  <span className={isOver ? 'text-red-400' : 'text-slate-400'}>
                    {isOver ? 'Surcharge !' : `${(23 - weight).toFixed(1)} kg restants`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CHECKLIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {checklistData.map((item) => (
          <div
            key={item.id}
            onClick={() => toggleCheck(item.id)}
            className={`p-5 rounded-2xl border flex gap-4 items-center cursor-pointer transition-all shadow-sm ${
              checkedItems[item.id]
                ? 'bg-emerald-950/20 border-emerald-900/50'
                : 'bg-slate-900 border-slate-700 hover:border-blue-500/50'
            }`}
          >
            <div
              className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 transition-colors ${
                checkedItems[item.id] ? 'bg-emerald-500 text-white' : 'bg-slate-800 border border-slate-600'
              }`}
            >
              {checkedItems[item.id] && <Check size={16} />}
            </div>
            <div>
              <p
                className={`text-sm font-bold ${
                  checkedItems[item.id] ? 'text-emerald-400 line-through opacity-70' : 'text-slate-200'
                }`}
              >
                {item.label}
              </p>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">{item.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Checklist;
