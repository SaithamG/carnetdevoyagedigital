import React, { useState, useRef, useEffect } from 'react';
import { Settings, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const SettingsPanel = () => {
  const { theme, setTheme, fontSize, setFontSize } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="relative shrink-0" ref={ref}>
      <button
        onClick={() => setOpen((p) => !p)}
        title="Paramètres d'affichage"
        className={`flex items-center justify-center w-9 h-9 rounded-xl text-xs font-bold transition-all border ${
          open
            ? 'bg-slate-700 border-slate-500 text-white'
            : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
        }`}
      >
        <Settings size={15} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-60 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl z-[200] p-4 space-y-4">

          {/* Thème */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Thème</p>
            <div className="flex gap-2">
              <button
                onClick={() => setTheme('dark')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                  theme === 'dark'
                    ? 'bg-slate-700 border-slate-500 text-white'
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Moon size={13} /> Sombre
              </button>
              <button
                onClick={() => setTheme('light')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                  theme === 'light'
                    ? 'bg-amber-500 border-amber-400 text-white'
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sun size={13} /> Clair
              </button>
            </div>
          </div>

          {/* Taille du texte */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Taille du texte</p>
            <div className="flex gap-2">
              {[
                { key: 'normal', label: 'A', desc: 'Normal' },
                { key: 'large',  label: 'A', desc: 'Grand'  },
                { key: 'xl',     label: 'A', desc: 'Très grand' },
              ].map(({ key, label, desc }, i) => (
                <button
                  key={key}
                  onClick={() => setFontSize(key)}
                  style={{ fontSize: `${12 + i * 3}px` }}
                  className={`flex-1 flex flex-col items-center py-2 rounded-xl font-black transition-all border ${
                    fontSize === key
                      ? 'bg-blue-600 border-blue-500 text-white'
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {label}
                  <span className="text-[9px] font-bold opacity-70 mt-0.5">{desc}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPanel;
