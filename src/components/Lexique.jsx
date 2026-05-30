import React, { useEffect, useState } from 'react';
import { Languages, MessageSquare, AlertCircle, Volume2 } from 'lucide-react';
import { lexiqueData } from '../data/lexiqueData';

const Lexique = () => {
  const [supported, setSupported] = useState(true);
  const [speaking, setSpeaking] = useState(null);

  useEffect(() => {
    setSupported(typeof window !== 'undefined' && 'speechSynthesis' in window);
    // Précharge la liste des voix (certains navigateurs la chargent en différé).
    if ('speechSynthesis' in window) window.speechSynthesis.getVoices();
  }, []);

  const speak = (text, id) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'ja-JP';
    u.rate = 0.85;
    const jaVoice = window.speechSynthesis.getVoices().find((v) => v.lang?.startsWith('ja'));
    if (jaVoice) u.voice = jaVoice;
    u.onend = () => setSpeaking(null);
    u.onerror = () => setSpeaking(null);
    setSpeaking(id);
    window.speechSynthesis.speak(u);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-slate-900 p-6 rounded-[2rem] border border-slate-800 shadow-xl relative overflow-hidden">
        <Languages className="absolute -right-4 -top-4 w-32 h-32 text-blue-800 opacity-20" />
        <div className="relative z-10">
          <h2 className="text-xl font-black italic text-white mb-2">Lexique de Survie Hors-Ligne</h2>
          <p className="text-xs text-slate-400 max-w-lg leading-relaxed">
            Si tu perds le réseau dans les sous-sols d'Osaka ou les restaurants blindés, ces phrases magiques te
            sauveront la vie. Lis la phonétique tel que c'est écrit, ou appuie sur 🔊 pour l'écouter.
          </p>
        </div>
      </div>

      {lexiqueData.map((group) => (
        <div key={group.category}>
          <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-400 mb-2 px-1 flex items-center gap-2">
            <span className="text-base">{group.emoji}</span> {group.category}
          </h3>
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-lg">
            <div className="grid grid-cols-1 divide-y divide-slate-800">
              {group.items.map((item, idx) => {
                const id = `${group.category}-${idx}`;
                return (
                  <div key={id} className="p-4 md:p-5 hover:bg-slate-800/50 transition-colors flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-black text-white mb-1 flex items-center gap-2">
                        <MessageSquare size={14} className="text-blue-500 shrink-0" /> {item.fr}
                      </p>
                      <p className="text-base md:text-lg font-bold text-emerald-400 italic">« {item.romaji} »</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="hidden sm:block text-xl md:text-2xl text-slate-500 font-medium tracking-widest text-right max-w-[40vw] md:max-w-none">
                        {item.jp}
                      </span>
                      {supported && (
                        <button
                          onClick={() => speak(item.jp, id)}
                          title="Écouter la prononciation"
                          className={`p-2.5 rounded-xl border transition-colors shrink-0 ${
                            speaking === id
                              ? 'bg-blue-600 border-blue-500 text-white animate-pulse'
                              : 'bg-slate-800 border-slate-700 text-blue-400 hover:bg-blue-600 hover:text-white'
                          }`}
                        >
                          <Volume2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ))}

      <div className="p-4 bg-blue-900/20 border border-blue-800/50 rounded-xl flex gap-3 items-start">
        <AlertCircle className="text-blue-400 w-5 h-5 flex-shrink-0" />
        <p className="text-[11px] text-blue-200 leading-relaxed">
          <strong>Hack Prononciation :</strong> Le "u" à la fin de "desu" ou "masu" est presque muet. Dis "dess" et
          "mass". Le "e" se prononce "é". "Tabehoudai" = "Tabé-ho-daï".
          {!supported && ' (L\'audio n\'est pas dispo sur ce navigateur.)'}
        </p>
      </div>
    </div>
  );
};

export default Lexique;
