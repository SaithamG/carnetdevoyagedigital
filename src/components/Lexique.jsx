import React from 'react';
import { Languages, MessageSquare, AlertCircle } from 'lucide-react';
import { lexiqueData } from '../data/lexiqueData';

const Lexique = () => (
  <div className="space-y-6 animate-in fade-in duration-500">
    <div className="bg-slate-900 p-6 rounded-[2rem] border border-slate-800 shadow-xl relative overflow-hidden mb-6">
      <Languages className="absolute -right-4 -top-4 w-32 h-32 text-blue-800 opacity-20" />
      <div className="relative z-10">
        <h2 className="text-xl font-black italic text-white mb-2">Lexique de Survie Hors-Ligne</h2>
        <p className="text-xs text-slate-400 max-w-lg leading-relaxed">
          Si tu perds le réseau dans les sous-sols d'Osaka ou les restaurants blindés, ces phrases magiques te sauveront la vie.
          Lis la colonne "Phonétique" tel que c'est écrit.
        </p>
      </div>
    </div>

    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-lg">
      <div className="grid grid-cols-1 divide-y divide-slate-800">
        {lexiqueData.map((item, idx) => (
          <div key={idx} className="p-5 hover:bg-slate-800/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <p className="text-sm font-black text-white mb-1 flex items-center gap-2">
                <MessageSquare size={14} className="text-blue-500" /> {item.fr}
              </p>
              <p className="text-lg font-bold text-emerald-400 italic">« {item.romaji} »</p>
            </div>
            <div className="md:text-right flex-shrink-0">
              <span className="text-2xl text-slate-500 font-medium tracking-widest">{item.jp}</span>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="p-4 bg-blue-900/20 border border-blue-800/50 rounded-xl flex gap-3 items-start">
      <AlertCircle className="text-blue-400 w-5 h-5 flex-shrink-0" />
      <p className="text-[11px] text-blue-200 leading-relaxed">
        <strong>Hack Prononciation :</strong> Le "u" à la fin de "desu" ou "masu" est presque muet. Dis "dess" et "mass".
        Le "e" se prononce "é". "Tabehoudai" = "Tabé-ho-daï".
      </p>
    </div>
  </div>
);

export default Lexique;
