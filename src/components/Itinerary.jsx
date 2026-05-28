import React, { useState, useEffect } from 'react';
import { CloudRain, Umbrella, BookOpen, CheckCircle2, MapPinned, AlertCircle } from 'lucide-react';
import { itineraryData } from '../data/itineraryData';
import { regions } from '../data/regions';
import { planBData } from '../data/planBData';

const Itinerary = ({ activeRegion, setActiveRegion }) => {
  const [isRaining, setIsRaining] = useState(false);

  const [dailyNotes, setDailyNotes] = useState(() => {
    const saved = localStorage.getItem('japan_dailynotes');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('japan_dailynotes', JSON.stringify(dailyNotes));
  }, [dailyNotes]);

  const handleNoteChange = (date, text) => {
    setDailyNotes((prev) => ({ ...prev, [date]: text }));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* BOUTON METEO */}
      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CloudRain className="text-blue-400 w-6 h-6" />
          <div>
            <h3 className="font-bold text-white text-sm">Bouton Panique Météo</h3>
            <p className="text-[10px] text-slate-400">Masque les activités en extérieur s'il pleut.</p>
          </div>
        </div>
        <button
          onClick={() => setIsRaining(!isRaining)}
          className={`px-4 py-2 rounded-xl flex items-center gap-2 font-bold text-xs transition-colors shadow-lg ${
            isRaining ? 'bg-red-600 hover:bg-red-500 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white'
          }`}
        >
          <Umbrella size={16} /> {isRaining ? 'Désactiver Plan B' : 'Activer Plan B (Pluie)'}
        </button>
      </div>

      {isRaining && (
        <div className="bg-blue-900/40 border border-blue-500/50 p-5 rounded-[2rem] flex items-start gap-4 animate-in zoom-in-95">
          <AlertCircle className="text-blue-400 w-6 h-6 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-black text-blue-400 uppercase tracking-widest mb-1">
              Alerte Météo — {regions.find((r) => r.id === activeRegion)?.name}
            </p>
            <p className="text-sm text-blue-200/80 leading-relaxed italic">{planBData[activeRegion]}</p>
          </div>
        </div>
      )}

      {/* NAVIGATION RÉGIONS */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 pt-2">
        {regions.map((region) => (
          <button
            key={region.id}
            onClick={() => setActiveRegion(region.id)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
              activeRegion === region.id
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40 border-blue-500'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            {region.icon} {region.name}
          </button>
        ))}
      </div>

      {/* INTRO CHAPITRE */}
      <div className="bg-blue-950/20 border border-blue-900/50 p-6 rounded-[2rem] flex items-start gap-4">
        <BookOpen className="text-blue-400 w-8 h-8 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-[12px] font-black text-blue-400 uppercase tracking-widest mb-2">
            {itineraryData[activeRegion].chapter}
          </p>
          <p className="text-sm text-blue-100/80 leading-relaxed italic border-l-2 border-blue-500/50 pl-4">
            "{itineraryData[activeRegion].desc}"
          </p>
        </div>
      </div>

      {/* JOURS */}
      <div className="space-y-12">
        {itineraryData[activeRegion].days.map((day, idx) => {
          const visibleSteps = day.steps.filter((step) => !(isRaining && step.isOutdoor));
          if (visibleSteps.length === 0) return null;

          return (
            <div
              key={idx}
              className="bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-xl overflow-hidden relative group hover:border-slate-700 transition-colors"
            >
              <div className="bg-slate-800/80 p-5 border-b border-slate-700/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="bg-blue-600 text-white text-[11px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest shadow-md">
                    {day.date}
                  </span>
                  <h3 className="font-black text-white italic text-xl">{day.title}</h3>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <div className="relative pl-8 space-y-8 before:absolute before:inset-0 before:left-[15px] before:w-0.5 before:bg-slate-800">
                  {visibleSteps.map((step, sIdx) => (
                    <div key={sIdx} className="relative">
                      <div className="absolute -left-[37px] w-5 h-5 rounded-full border-[5px] border-slate-900 bg-blue-500 mt-1 z-10 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />

                      <div className="flex flex-col md:flex-row gap-4 items-start">
                        <div className="pt-1 shrink-0 w-20">
                          <span className="text-[11px] font-black text-slate-400 bg-slate-950 px-3 py-1.5 rounded-md border border-slate-800 shadow-inner inline-block w-full text-center">
                            {step.time}
                          </span>
                        </div>

                        <div className="flex-1 p-5 rounded-3xl border border-slate-800/80 bg-slate-950/80 flex flex-col md:flex-row gap-5 items-start transition-colors w-full relative">
                          {step.mapUrl && (
                            <a
                              href={step.mapUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="absolute top-4 right-4 bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white p-2 rounded-xl transition-colors border border-blue-500/30 flex items-center gap-1 text-[10px] font-bold"
                            >
                              <MapPinned size={14} /> G-Maps
                            </a>
                          )}

                          <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-xl flex-shrink-0 border border-slate-800 shadow-sm text-blue-400">
                            {step.icon}
                          </div>
                          <div className="flex-1 pr-12">
                            <h4 className="text-base font-bold text-slate-100 mb-2 flex items-center gap-2">
                              {step.title}
                              {step.isOutdoor && (
                                <CloudRain size={12} className="text-slate-500" title="Activité en extérieur" />
                              )}
                            </h4>
                            <p className="text-[13px] text-slate-400 leading-relaxed font-medium">{step.desc}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {day.simplissime && (
                  <div className="mt-8 p-4 rounded-2xl bg-emerald-950/20 border border-emerald-900/30 flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] font-black uppercase text-emerald-600 mb-1 tracking-widest">Le Hack Simplissime</p>
                      <p className="text-xs text-slate-400 font-medium italic">{day.simplissime}</p>
                    </div>
                  </div>
                )}

                {/* JOURNAL DE BORD */}
                <div className="mt-6 pt-6 border-t border-slate-800">
                  <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800/80">
                    <h4 className="text-xs font-black text-blue-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <BookOpen size={14} /> Journal de bord ({day.date})
                    </h4>
                    <textarea
                      value={dailyNotes[day.date] || ''}
                      onChange={(e) => handleNoteChange(day.date, e.target.value)}
                      placeholder="Note ici tes adresses préférées, souvenirs du jour ou dépenses en yens..."
                      className="w-full bg-slate-900/50 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-600 min-h-[80px] resize-y"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Itinerary;
