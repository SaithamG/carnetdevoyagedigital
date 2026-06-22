import React, { useState, useEffect } from 'react';
import { BookOpen, CheckCircle2, MapPinned, Check } from 'lucide-react';
import { useCarnet } from '../context/CarnetContext';
import PlaceImage from './PlaceImage';
import StepJournal from './StepJournal';

// Itinéraire piloté par le carnet importé : mêmes écrans que d'habitude, mais
// les données viennent du PDF (via le contexte) et non plus d'un fichier en dur.
const Itinerary = ({ activeRegion, setActiveRegion }) => {
  const { data } = useCarnet();
  const itineraryData = data?.itineraryData || {};
  const regions = data?.regionsMeta || [];

  const [dailyNotes, setDailyNotes] = useState(() => {
    const saved = localStorage.getItem('japan_dailynotes');
    return saved ? JSON.parse(saved) : {};
  });

  const [visitedSteps, setVisitedSteps] = useState(() => {
    const saved = localStorage.getItem('japan_visited_steps');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('japan_dailynotes', JSON.stringify(dailyNotes));
  }, [dailyNotes]);

  useEffect(() => {
    localStorage.setItem('japan_visited_steps', JSON.stringify(visitedSteps));
  }, [visitedSteps]);

  const handleNoteChange = (date, text) => setDailyNotes((prev) => ({ ...prev, [date]: text }));
  const toggleVisited = (dayDate, stepTime) => {
    const key = `${dayDate}_${stepTime}`;
    setVisitedSteps((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const current = itineraryData[activeRegion] || itineraryData[regions[0]?.id];

  if (!regions.length || !current) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-12 text-center text-slate-400">
        <BookOpen size={36} className="mx-auto text-slate-600 mb-3" />
        <p className="font-bold text-slate-300">Aucun itinéraire pour l'instant</p>
        <p className="text-sm mt-1">Importez un PDF pour générer l'itinéraire.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* SÉLECTEUR D'ITINÉRAIRES — circuits au choix */}
      {regions.length > 1 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-3">
            {regions.length} itinéraires au choix — sélectionnez-en un
          </p>
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {regions.map((region, i) => (
              <button
                key={region.id}
                onClick={() => setActiveRegion(region.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                  activeRegion === region.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40 border-blue-500'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <span className={`flex items-center justify-center w-5 h-5 rounded-full text-[10px] ${activeRegion === region.id ? 'bg-white/20' : 'bg-slate-800'}`}>{i + 1}</span>
                {region.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* INTRO CHAPITRE */}
      {current.desc && (
        <div className="bg-blue-950/20 border border-blue-900/50 p-6 rounded-[2rem] flex items-start gap-4">
          <BookOpen className="text-blue-400 w-8 h-8 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-[12px] font-black text-blue-400 uppercase tracking-widest mb-2">{current.chapter}</p>
            <p className="text-sm text-blue-100/80 leading-relaxed italic border-l-2 border-blue-500/50 pl-4">
              "{current.desc}"
            </p>
          </div>
        </div>
      )}

      {/* JOURS */}
      <div className="space-y-12">
        {current.days.map((day, idx) => (
          <div
            key={idx}
            className="bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-xl overflow-hidden relative group hover:border-slate-700 transition-colors"
          >
            <div className="bg-slate-800/80 p-5 border-b border-slate-700/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {day.date && (
                  <span className="bg-blue-600 text-white text-[11px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest shadow-md">
                    {day.date}
                  </span>
                )}
                <h3 className="font-black text-white italic text-xl">{day.title}</h3>
              </div>
              {(() => {
                const done = day.steps.filter((s) => visitedSteps[`${day.date}_${s.time}`]).length;
                return done > 0 ? (
                  <span className="text-[10px] font-black text-emerald-400 bg-emerald-950/30 border border-emerald-900/40 px-2 py-1 rounded-lg shrink-0">
                    {done}/{day.steps.length} faites
                  </span>
                ) : null;
              })()}
            </div>

            <div className="p-6 md:p-8">
              <div className="relative pl-8 space-y-8 before:absolute before:inset-0 before:left-[15px] before:w-0.5 before:bg-slate-800">
                {day.steps.map((step, sIdx) => (
                  <div key={sIdx} className="relative">
                    <div className="absolute -left-[37px] w-5 h-5 rounded-full border-[5px] border-slate-900 bg-blue-500 mt-1 z-10 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />

                    <div className="flex flex-col md:flex-row gap-4 items-start">
                      {step.time && (
                        <div className="pt-1 shrink-0 w-20">
                          <span className="text-[11px] font-black text-slate-400 bg-slate-950 px-3 py-1.5 rounded-md border border-slate-800 shadow-inner inline-block w-full text-center">
                            {step.time}
                          </span>
                        </div>
                      )}

                      <div
                        onClick={() => toggleVisited(day.date, step.time)}
                        className={`flex-1 p-5 rounded-3xl border flex flex-col gap-4 transition-all w-full relative cursor-pointer ${
                          visitedSteps[`${day.date}_${step.time}`]
                            ? 'border-emerald-900/50 bg-emerald-950/10'
                            : 'border-slate-800/80 bg-slate-950/80 hover:border-slate-700'
                        }`}
                      >
                        {step.mapUrl && (
                          <a
                            href={step.mapUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="absolute top-4 right-4 bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white p-2 rounded-xl transition-colors border border-blue-500/30 flex items-center gap-1 text-[10px] font-bold"
                          >
                            <MapPinned size={14} /> G-Maps
                          </a>
                        )}

                        {visitedSteps[`${day.date}_${step.time}`] && (
                          <div className="absolute top-4 left-4 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                            <Check size={11} className="text-white" />
                          </div>
                        )}

                        <PlaceImage
                          src={step.image}
                          title={step.title}
                          query={step.title}
                          className={`w-full h-44 object-cover rounded-2xl border ${
                            visitedSteps[`${day.date}_${step.time}`] ? 'border-emerald-900/40 opacity-80' : 'border-slate-800'
                          }`}
                        />

                        <div className="flex gap-4 items-start">
                          <div
                            className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl flex-shrink-0 border shadow-sm ${
                              visitedSteps[`${day.date}_${step.time}`]
                                ? 'bg-emerald-950/30 border-emerald-800/50 text-emerald-400'
                                : 'bg-slate-900 border-slate-800 text-blue-400'
                            }`}
                          >
                            {step.icon}
                          </div>
                          <div className="flex-1 pr-12">
                            <h4
                              className={`text-base font-bold mb-2 flex items-center gap-2 ${
                                visitedSteps[`${day.date}_${step.time}`] ? 'text-emerald-400/70 line-through' : 'text-slate-100'
                              }`}
                            >
                              {step.title}
                            </h4>
                            <p className="text-[13px] text-slate-400 leading-relaxed font-medium">{step.desc}</p>
                            <StepJournal stepKey={`${day.date}_${step.time}`} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* JOURNAL DE BORD */}
              <div className="mt-6 pt-6 border-t border-slate-800">
                <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800/80">
                  <h4 className="text-xs font-black text-blue-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <BookOpen size={14} /> Journal de bord ({day.date})
                  </h4>
                  <textarea
                    value={dailyNotes[day.date] || ''}
                    onChange={(e) => handleNoteChange(day.date, e.target.value)}
                    placeholder="Notes, souvenirs, dépenses du jour…"
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-600 min-h-[80px] resize-y"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Itinerary;
