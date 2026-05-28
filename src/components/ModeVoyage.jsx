import React, { useState, useEffect } from 'react';
import {
  Navigation, Clock, MapPin, CheckCircle2, ChevronRight,
  Zap, Rocket, Trophy, CalendarCheck, Bell, Sun, Moon,
} from 'lucide-react';
import { itineraryData } from '../data/itineraryData';
import { regions } from '../data/regions';
import { reminders } from '../data/reminders';

// ─── Utils ────────────────────────────────────────────────────────────────────

const TRIP_START = new Date(2026, 10, 9);  // 9 Nov 2026
const TRIP_END   = new Date(2026, 10, 30); // 30 Nov 2026

// "Lun 9 Nov" → Date(2026-11-09)
const parseDayDate = (dateStr) => {
  const match = dateStr.match(/(\d+)/);
  if (!match) return null;
  return new Date(2026, 10, parseInt(match[0]));
};

// "09h00" → minutes depuis minuit
const parseStepMinutes = (timeStr) => {
  const m = timeStr.match(/(\d+)h(\d+)/);
  if (!m) return 0;
  return parseInt(m[1]) * 60 + parseInt(m[2]);
};

const FRENCH_MONTHS = {
  Janvier: 0, Février: 1, Mars: 2, Avril: 3, Mai: 4, Juin: 5,
  Juillet: 6, Août: 7, Septembre: 8, Octobre: 9, Novembre: 10, Décembre: 11,
};

const parseReminderDate = (str) => {
  const m = str.match(/(\d+)\s+(\w+)\s+(\d{4})/);
  if (!m) return null;
  const month = FRENCH_MONTHS[m[2]];
  if (month === undefined) return null;
  return new Date(parseInt(m[3]), month, parseInt(m[1]));
};

// Heure Japon (UTC+9)
const getJapanNow = () =>
  new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }));

// Heure France
const getFranceNow = () =>
  new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Paris' }));

const fmtTime = (d) =>
  d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

// Flatten tous les jours avec leur région
const ALL_DAYS = Object.entries(itineraryData).flatMap(([regionId, region]) =>
  region.days.map((day) => ({
    ...day,
    regionId,
    regionName: regions.find((r) => r.id === regionId)?.name || regionId,
    regionChapter: region.chapter,
  }))
);

// ─── Sous-composants ──────────────────────────────────────────────────────────

const DualClock = ({ now }) => {
  const jp = getJapanNow();
  const fr = getFranceNow();
  return (
    <div className="flex gap-3">
      <div className="flex-1 bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
        <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest mb-1 flex items-center justify-center gap-1">
          <Sun size={10} /> Paris
        </p>
        <p className="font-mono text-sm font-black text-slate-300">{fmtTime(fr)}</p>
      </div>
      <div className="flex-1 bg-blue-950/40 p-3 rounded-2xl border border-blue-800/50 text-center">
        <p className="text-[9px] font-black uppercase text-blue-400 tracking-widest mb-1 flex items-center justify-center gap-1">
          <Sun size={10} /> Tokyo
        </p>
        <p className="font-mono text-sm font-black text-blue-300">{fmtTime(jp)}</p>
      </div>
    </div>
  );
};

// ─── VUE PRE-TRIP ──────────────────────────────────────────────────────────────
const PreTripView = ({ daysLeft, now }) => {
  const nextReminder = reminders
    .map((r) => ({ ...r, date: parseReminderDate(r.reminderDate) }))
    .filter((r) => r.date && r.date >= new Date())
    .sort((a, b) => a.date - b.date)[0];

  const firstDay = ALL_DAYS[0];
  const firstStep = firstDay?.steps[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Hero countdown */}
      <div className="bg-gradient-to-br from-slate-900 to-blue-950/30 p-8 rounded-[2rem] border border-blue-900/40 shadow-2xl relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08),transparent)] pointer-events-none" />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-3">Départ dans</p>
        <p className="text-8xl font-black italic text-white leading-none">{daysLeft}</p>
        <p className="text-lg font-black text-blue-300 mt-1">JOURS</p>
        <p className="text-xs text-slate-400 mt-3">9 Novembre 2026 — Haneda, Tokyo</p>
      </div>

      {/* Dual clock */}
      <DualClock now={now} />

      {/* Prochaine alerte */}
      {nextReminder && (
        <div className="bg-slate-900 p-5 rounded-[2rem] border border-slate-800">
          <p className="text-[10px] font-black uppercase tracking-widest text-amber-400 mb-3 flex items-center gap-2">
            <Bell size={12} /> Prochaine réservation à faire
          </p>
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <p className="text-sm font-black text-white mb-1">{nextReminder.title}</p>
            <p className="text-[10px] text-amber-400 font-bold mb-2">{nextReminder.reminderDate}</p>
            <p className="text-xs text-slate-400 leading-relaxed">{nextReminder.desc}</p>
          </div>
        </div>
      )}

      {/* Aperçu J1 */}
      {firstDay && (
        <div className="bg-slate-900 p-5 rounded-[2rem] border border-slate-800">
          <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-3 flex items-center gap-2">
            <Rocket size={12} /> Aperçu — Jour 1
          </p>
          <p className="text-base font-black text-white mb-1">{firstDay.date} — {firstDay.title}</p>
          <p className="text-xs text-slate-400 italic mb-4">{firstDay.simplissime}</p>
          <div className="space-y-2">
            {firstDay.steps.slice(0, 3).map((step, i) => (
              <div key={i} className="flex items-center gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] font-black text-slate-500 w-10 shrink-0">{step.time}</span>
                <span className="text-xs font-bold text-slate-200">{step.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ─── VUE ACTIVE TRIP ───────────────────────────────────────────────────────────
const ActiveTripView = ({ todayEntry, now }) => {
  const jp = getJapanNow();
  const currentMinutes = jp.getHours() * 60 + jp.getMinutes();

  // Visited steps
  const [visited, setVisited] = useState(() => {
    const saved = localStorage.getItem('japan_visited_steps');
    return saved ? JSON.parse(saved) : {};
  });

  const stepKey = (step) => `${todayEntry.date}_${step.time}`;

  const toggleVisited = (step) => {
    const key = stepKey(step);
    const next = { ...visited, [key]: !visited[key] };
    setVisited(next);
    localStorage.setItem('japan_visited_steps', JSON.stringify(next));
  };

  // Étape courante = dernière dont l'heure est passée
  let currentIdx = -1;
  todayEntry.steps.forEach((step, i) => {
    if (parseStepMinutes(step.time) <= currentMinutes) currentIdx = i;
  });

  const nextIdx = currentIdx + 1 < todayEntry.steps.length ? currentIdx + 1 : -1;
  const nextStep = nextIdx >= 0 ? todayEntry.steps[nextIdx] : null;

  // Countdown vers la prochaine étape
  let countdownLabel = '';
  if (nextStep) {
    const diffMin = parseStepMinutes(nextStep.time) - currentMinutes;
    const h = Math.floor(diffMin / 60);
    const m = diffMin % 60;
    countdownLabel = h > 0 ? `dans ${h}h${m.toString().padStart(2, '0')}` : `dans ${m} min`;
  }

  const visitedCount = todayEntry.steps.filter((s) => visited[stepKey(s)]).length;
  const totalSteps = todayEntry.steps.length;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header du jour */}
      <div className="bg-gradient-to-br from-slate-900 to-blue-950/20 p-6 rounded-[2rem] border border-blue-900/40 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-1 flex items-center gap-1">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" /> MODE VOYAGE ACTIF
          </p>
          <h2 className="text-xl font-black italic text-white">{todayEntry.date}</h2>
          <p className="text-sm font-bold text-blue-300">{todayEntry.title}</p>
          <p className="text-[10px] text-slate-500 mt-1">{todayEntry.regionName} — {todayEntry.regionChapter?.split(':')[0]}</p>
        </div>
        <div className="text-right">
          <p className="text-[9px] text-slate-500 uppercase font-black mb-1">Tokyo</p>
          <p className="font-mono text-lg font-black text-blue-300">
            {jp.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
          </p>
          <p className="text-[10px] text-slate-500 mt-1">{visitedCount}/{totalSteps} étapes</p>
        </div>
      </div>

      {/* Barre de progression du jour */}
      <div className="bg-slate-900 px-6 py-4 rounded-2xl border border-slate-800">
        <div className="flex justify-between text-[10px] text-slate-400 mb-2 font-bold uppercase">
          <span>Progression du jour</span>
          <span>{Math.round((visitedCount / totalSteps) * 100)}%</span>
        </div>
        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
          <div
            className="bg-emerald-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${(visitedCount / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Étape actuelle */}
      {currentIdx >= 0 && (
        <div className="bg-blue-950/30 border border-blue-500/40 p-6 rounded-[2rem] shadow-xl shadow-blue-900/20">
          <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-3 flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" /> Maintenant
          </p>
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-blue-900/40 rounded-2xl flex items-center justify-center shrink-0 border border-blue-700/50 text-blue-400">
              {todayEntry.steps[currentIdx].icon}
            </div>
            <div>
              <p className="text-lg font-black text-white">{todayEntry.steps[currentIdx].title}</p>
              <p className="text-xs text-blue-200/70 mt-1 leading-relaxed">{todayEntry.steps[currentIdx].desc}</p>
            </div>
          </div>
        </div>
      )}

      {/* Prochaine étape */}
      {nextStep && (
        <div className="bg-amber-950/20 border border-amber-700/40 p-5 rounded-[2rem]">
          <p className="text-[10px] font-black uppercase tracking-widest text-amber-400 mb-3 flex items-center gap-2">
            <ChevronRight size={12} /> Ensuite — <span className="text-amber-300">{countdownLabel}</span>
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-900/30 rounded-xl flex items-center justify-center shrink-0 border border-amber-700/30 text-amber-400">
              {nextStep.icon}
            </div>
            <div>
              <p className="text-sm font-black text-white">{nextStep.title}</p>
              <p className="text-[11px] text-amber-200/60 mt-0.5">{nextStep.time}</p>
            </div>
          </div>
        </div>
      )}

      {/* Timeline complète du jour */}
      <div className="bg-slate-900 p-6 rounded-[2rem] border border-slate-800">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Timeline du jour</p>
        <div className="space-y-3">
          {todayEntry.steps.map((step, i) => {
            const isPast = i < currentIdx;
            const isCurrent = i === currentIdx;
            const isVisited = visited[stepKey(step)];

            return (
              <div
                key={i}
                onClick={() => toggleVisited(step)}
                className={`flex items-center gap-3 p-3 rounded-2xl border cursor-pointer transition-all ${
                  isVisited
                    ? 'bg-emerald-950/20 border-emerald-900/40'
                    : isCurrent
                    ? 'bg-blue-950/30 border-blue-700/40'
                    : isPast
                    ? 'bg-slate-950/50 border-slate-800 opacity-50'
                    : 'bg-slate-950 border-slate-800'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border text-xs ${
                  isVisited ? 'bg-emerald-500 border-emerald-400 text-white' :
                  isCurrent ? 'bg-blue-600 border-blue-500 text-white' :
                  'bg-slate-800 border-slate-700 text-slate-400'
                }`}>
                  {isVisited ? <CheckCircle2 size={14} /> : step.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-bold truncate ${
                    isVisited ? 'text-emerald-400 line-through opacity-70' :
                    isCurrent ? 'text-blue-300' : 'text-slate-300'
                  }`}>
                    {step.title}
                  </p>
                </div>
                <span className={`text-[10px] font-black shrink-0 ${
                  isCurrent ? 'text-blue-400' : 'text-slate-600'
                }`}>{step.time}</span>
              </div>
            );
          })}
        </div>
        <p className="text-[9px] text-slate-600 text-center mt-3">Appuie sur une étape pour la marquer comme faite</p>
      </div>

      {/* Hack simplissime du jour */}
      {todayEntry.simplissime && (
        <div className="bg-emerald-950/20 border border-emerald-900/30 p-5 rounded-[2rem] flex items-start gap-3">
          <Zap size={16} className="text-emerald-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-[10px] font-black uppercase text-emerald-500 tracking-widest mb-1">Hack du jour</p>
            <p className="text-xs text-slate-300 italic leading-relaxed">{todayEntry.simplissime}</p>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── VUE POST-TRIP ─────────────────────────────────────────────────────────────
const PostTripView = () => {
  const visited = JSON.parse(localStorage.getItem('japan_visited_steps') || '{}');
  const expenses = JSON.parse(localStorage.getItem('japan_expenses') || '[]');
  const notes = JSON.parse(localStorage.getItem('japan_dailynotes') || '{}');

  const visitedCount = Object.values(visited).filter(Boolean).length;
  const totalSteps = ALL_DAYS.reduce((acc, d) => acc + d.steps.length, 0);
  const notesCount = Object.values(notes).filter((n) => n?.trim()).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 text-center">
      <div className="bg-gradient-to-br from-slate-900 to-emerald-950/20 p-10 rounded-[2rem] border border-emerald-900/40">
        <Trophy className="w-16 h-16 text-amber-400 mx-auto mb-4" />
        <h2 className="text-3xl font-black italic text-white mb-2">Mission Accomplie</h2>
        <p className="text-sm text-slate-400">30 novembre 2026 — Tu es rentré avec ton épargne intacte</p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 text-center">
          <p className="text-2xl font-black text-blue-400">{visitedCount}</p>
          <p className="text-[10px] text-slate-500 uppercase font-bold mt-1">étapes faites<br/>sur {totalSteps}</p>
        </div>
        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 text-center">
          <p className="text-2xl font-black text-emerald-400">{expenses.length}</p>
          <p className="text-[10px] text-slate-500 uppercase font-bold mt-1">dépenses<br/>enregistrées</p>
        </div>
        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 text-center">
          <p className="text-2xl font-black text-amber-400">{notesCount}</p>
          <p className="text-[10px] text-slate-500 uppercase font-bold mt-1">jours<br/>journalisés</p>
        </div>
      </div>
    </div>
  );
};

// ─── COMPOSANT PRINCIPAL ───────────────────────────────────────────────────────
const ModeVoyage = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const isBeforeTrip = today < TRIP_START;
  const isAfterTrip = today > TRIP_END;

  if (isBeforeTrip) {
    const daysLeft = Math.ceil((TRIP_START - today) / (1000 * 60 * 60 * 24));
    return <PreTripView daysLeft={daysLeft} now={now} />;
  }

  if (isAfterTrip) return <PostTripView />;

  const jp = getJapanNow();
  const jpToday = new Date(jp.getFullYear(), jp.getMonth(), jp.getDate());

  const todayEntry = ALL_DAYS.find((day) => {
    const d = parseDayDate(day.date);
    return d && d.toDateString() === jpToday.toDateString();
  });

  if (!todayEntry) {
    return (
      <div className="text-center text-slate-400 py-20">
        <Navigation className="w-12 h-12 mx-auto mb-4 opacity-30" />
        <p className="text-sm">Pas d'itinéraire pour aujourd'hui.</p>
      </div>
    );
  }

  return <ActiveTripView todayEntry={todayEntry} now={now} />;
};

export default ModeVoyage;
