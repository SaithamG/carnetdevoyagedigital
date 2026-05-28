import React from 'react';
import { Bell, CalendarPlus, ExternalLink, CheckCircle2 } from 'lucide-react';
import { reminders } from '../data/reminders';
import { runbook } from '../data/runbook';
import { COLOR_CLASSES } from '../data/colorMap';

const Runbook = () => (
  <div className="space-y-8 animate-in fade-in duration-500">
    <div className="bg-slate-900 p-6 rounded-[2rem] border border-slate-800 shadow-xl relative overflow-hidden mb-6">
      <Bell className="absolute -right-4 -top-4 w-32 h-32 text-slate-800 opacity-20" />
      <div className="relative z-10">
        <h2 className="text-xl font-black italic text-white mb-2">Calendrier des Réservations</h2>
        <p className="text-xs text-slate-400 max-w-lg leading-relaxed">
          Le Japon demande une rigueur d'ingénieur. Les places partent souvent le jour même de l'ouverture des ventes.
          Ajoute ces événements à ton Google Agenda pour être notifié.
        </p>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {reminders.map((r) => (
        <div
          key={r.id}
          className={`bg-slate-900 p-5 rounded-[2rem] border ${COLOR_CLASSES[r.color].border30} transition-colors flex flex-col justify-between shadow-lg ${COLOR_CLASSES[r.color].hoverBorder50}`}
        >
          <div>
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-black text-white text-base">{r.title}</h3>
              <span className={`${COLOR_CLASSES[r.color].bg20} ${COLOR_CLASSES[r.color].text400} text-[9px] font-black px-2 py-1 rounded uppercase text-center`}>
                {r.targetDate}
              </span>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 mb-3">
              <p className="text-xs font-bold text-slate-200">{r.reminderDate}</p>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed mb-6">{r.desc}</p>
          </div>

          <a
            href={r.url}
            target="_blank"
            rel="noreferrer"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
          >
            <CalendarPlus size={16} /> Ajouter à Google Agenda <ExternalLink size={14} className="opacity-70" />
          </a>
        </div>
      ))}
    </div>

    <div className="pt-6 border-t border-slate-800 mt-8">
      <h3 className="font-black italic text-white text-lg mb-4">Statut Matériel</h3>
      <div className="space-y-3">
        {runbook.map((step) => (
          <div
            key={step.id}
            className={`p-5 rounded-2xl border flex gap-4 items-start ${
              step.status === 'done'
                ? 'bg-emerald-950/20 border-emerald-900/50'
                : step.status === 'active'
                ? 'bg-blue-900/20 border-blue-800'
                : 'bg-slate-900 border-slate-700'
            }`}
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
              step.status === 'done'
                ? 'bg-emerald-500/20 text-emerald-400'
                : step.status === 'active'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                : 'bg-slate-800 text-slate-500'
            }`}>
              {step.status === 'done' ? <CheckCircle2 size={14} /> : step.id}
            </div>
            <div>
              <p className={`text-sm font-bold ${
                step.status === 'done' ? 'text-emerald-400' : step.status === 'active' ? 'text-blue-400' : 'text-slate-300'
              }`}>
                {step.title}
              </p>
              <p className="text-[11px] mt-1 text-slate-400 leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Runbook;
