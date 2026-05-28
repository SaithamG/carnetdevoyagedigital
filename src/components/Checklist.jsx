import React, { useState, useEffect } from 'react';
import { CheckSquare, Check } from 'lucide-react';
import { checklistData } from '../data/checklistData';

const Checklist = () => {
  const [checkedItems, setCheckedItems] = useState(() => {
    const saved = localStorage.getItem('sauvegardeChecklist');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('sauvegardeChecklist', JSON.stringify(checkedItems));
  }, [checkedItems]);

  const toggleCheck = (id) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-slate-900 p-6 rounded-[2rem] border border-slate-800 shadow-xl relative overflow-hidden mb-6">
        <CheckSquare className="absolute -right-4 -top-4 w-32 h-32 text-emerald-800 opacity-20" />
        <div className="relative z-10">
          <h2 className="text-xl font-black italic text-white mb-2">Checklist Matérielle</h2>
          <p className="text-xs text-slate-400 max-w-lg leading-relaxed">
            L'équipement indispensable pour éviter tout blocage logistique au Japon.
          </p>
        </div>
      </div>

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
            <div className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 transition-colors ${
              checkedItems[item.id] ? 'bg-emerald-500 text-white' : 'bg-slate-800 border border-slate-600'
            }`}>
              {checkedItems[item.id] && <Check size={16} />}
            </div>
            <div>
              <p className={`text-sm font-bold ${
                checkedItems[item.id] ? 'text-emerald-400 line-through opacity-70' : 'text-slate-200'
              }`}>
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
