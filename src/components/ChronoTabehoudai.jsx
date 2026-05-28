import React, { useState, useEffect, useRef } from 'react';
import { Timer, X, RotateCcw, Play, Pause, Utensils } from 'lucide-react';

const PRESETS = [
  { label: '60 min', value: 60 },
  { label: '75 min', value: 75 },
  { label: '90 min', value: 90 },
  { label: '2h', value: 120 },
];

const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const fmtCountdown = (secs) => {
  const m = Math.floor(secs / 60).toString().padStart(2, '0');
  const s = (secs % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
};

const getColor = (remaining, total) => {
  const pct = remaining / total;
  if (pct > 0.33) return '#22c55e';  // green-500
  if (pct > 0.11) return '#f59e0b';  // amber-500
  return '#ef4444';                   // red-500
};

const ChronoTabehoudai = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [durationMin, setDurationMin] = useState(90);
  const [remaining, setRemaining] = useState(90 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  // Sync remaining when duration changes (and not running)
  useEffect(() => {
    if (!isRunning) setRemaining(durationMin * 60);
  }, [durationMin, isRunning]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const reset = () => {
    setIsRunning(false);
    setRemaining(durationMin * 60);
  };

  const total = durationMin * 60;
  const progress = remaining / total;
  const strokeDashoffset = CIRCUMFERENCE * (1 - progress);
  const color = getColor(remaining, total);
  const isUrgent = remaining < 10 * 60;

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 left-4 md:left-8 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl border transition-all transform hover:scale-110 ${
          isRunning
            ? 'bg-emerald-600 border-emerald-500 animate-pulse'
            : 'bg-slate-800 border-slate-700 hover:bg-slate-700'
        }`}
        title="Chrono Tabehoudai"
      >
        <Utensils size={22} className={isRunning ? 'text-white' : 'text-slate-300'} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 left-4 md:left-8 z-50 w-72 bg-slate-900/95 backdrop-blur-md border border-slate-700 p-5 rounded-3xl shadow-2xl animate-in zoom-in-95">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 flex items-center gap-1">
            <Utensils size={11} /> Chrono Tabehoudai
          </p>
          <p className="text-[9px] text-slate-500 mt-0.5">Appuie pour marquer une étape ✓</p>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white transition-colors">
          <X size={16} />
        </button>
      </div>

      {/* Cercle SVG */}
      <div className="flex justify-center mb-4">
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 -rotate-90" viewBox="0 0 128 128">
            {/* Track */}
            <circle cx="64" cy="64" r={RADIUS} fill="none" stroke="#1e293b" strokeWidth="10" />
            {/* Progress */}
            <circle
              cx="64" cy="64" r={RADIUS}
              fill="none"
              stroke={color}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={strokeDashoffset}
              style={{ transition: 'stroke-dashoffset 0.9s linear, stroke 0.5s' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className={`text-2xl font-black font-mono ${isUrgent ? 'text-red-400' : 'text-white'} ${
                isUrgent && isRunning ? 'animate-pulse' : ''
              }`}
            >
              {fmtCountdown(remaining)}
            </span>
            <span className="text-[9px] text-slate-500 uppercase font-bold mt-0.5">
              {isRunning ? 'en cours' : remaining === total ? 'prêt' : 'en pause'}
            </span>
          </div>
        </div>
      </div>

      {/* Presets */}
      {!isRunning && remaining === total && (
        <div className="grid grid-cols-4 gap-1.5 mb-4">
          {PRESETS.map((p) => (
            <button
              key={p.value}
              onClick={() => setDurationMin(p.value)}
              className={`py-1.5 rounded-lg text-[10px] font-black transition-all border ${
                durationMin === p.value
                  ? 'bg-emerald-600/30 border-emerald-500 text-emerald-400'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      )}

      {/* Contrôles */}
      <div className="flex gap-2">
        <button
          onClick={() => setIsRunning((r) => !r)}
          className={`flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
            isRunning
              ? 'bg-amber-600 hover:bg-amber-500 text-white'
              : 'bg-emerald-600 hover:bg-emerald-500 text-white'
          }`}
        >
          {isRunning ? <><Pause size={14} /> Pause</> : <><Play size={14} /> {remaining < total ? 'Reprendre' : 'Démarrer'}</>}
        </button>
        <button
          onClick={reset}
          className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 border border-slate-700 transition-all"
        >
          <RotateCcw size={14} />
        </button>
      </div>
    </div>
  );
};

export default ChronoTabehoudai;
