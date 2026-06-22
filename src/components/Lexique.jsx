import React, { useEffect, useState } from 'react';
import { Languages, MessageSquare, AlertCircle, Volume2 } from 'lucide-react';
import { useCarnet } from '../context/CarnetContext';

// Lexique alimenté par le PDF importé (mots/phrases extraits du document).
const Lexique = () => {
  const { data } = useCarnet();
  const lexique = data?.lexique || [];
  const [supported, setSupported] = useState(true);
  const [speaking, setSpeaking] = useState(null);

  useEffect(() => {
    setSupported(typeof window !== 'undefined' && 'speechSynthesis' in window);
    if ('speechSynthesis' in window) window.speechSynthesis.getVoices();
  }, []);

  const speak = (text, id) => {
    if (!('speechSynthesis' in window) || !text) return;
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
          <h2 className="text-xl font-black italic text-white mb-2">Lexique de survie</h2>
          <p className="text-xs text-slate-400 max-w-lg leading-relaxed">
            Les mots et phrases utiles de votre carnet. Lisez la prononciation telle qu'elle est écrite, ou appuyez sur 🔊.
          </p>
        </div>
      </div>

      {lexique.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 text-center text-slate-400">
          <p className="font-bold text-slate-300">Aucun lexique dans ce carnet</p>
          <p className="text-sm mt-1">Si le PDF contient du vocabulaire, il apparaîtra ici après l'import.</p>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-lg">
          <div className="grid grid-cols-1 divide-y divide-slate-800">
            {lexique.map((item, idx) => {
              const id = `lex-${idx}`;
              return (
                <div key={id} className="p-4 md:p-5 hover:bg-slate-800/50 transition-colors flex items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-black text-white mb-1 flex items-center gap-2">
                      <MessageSquare size={14} className="text-blue-500 shrink-0" /> {item.fr}
                    </p>
                    {item.prononciation && (
                      <p className="text-base md:text-lg font-bold text-emerald-400 italic">« {item.prononciation} »</p>
                    )}
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    {item.jp && (
                      <span className="hidden sm:block text-xl md:text-2xl text-slate-500 font-medium tracking-widest text-right">
                        {item.jp}
                      </span>
                    )}
                    {supported && (item.jp || item.fr) && (
                      <button
                        onClick={() => speak(item.jp || item.fr, id)}
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
      )}

      <div className="p-4 bg-blue-900/20 border border-blue-800/50 rounded-xl flex gap-3 items-start">
        <AlertCircle className="text-blue-400 w-5 h-5 flex-shrink-0" />
        <p className="text-[11px] text-blue-200 leading-relaxed">
          <strong>Astuce :</strong> au Japon, le "u" final de "desu"/"masu" est presque muet (dites "dess", "mass"), et le "e" se prononce "é".
          {!supported && " (L'audio n'est pas dispo sur ce navigateur.)"}
        </p>
      </div>
    </div>
  );
};

export default Lexique;
