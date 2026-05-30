import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Loader2, Send, AlertCircle, Trash2, User } from 'lucide-react';
import { itineraryData } from '../data/itineraryData';
import { regions } from '../data/regions';

const fetchWithRetry = async (url, options, retries = 4, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error?.message || `HTTP ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise((res) => setTimeout(res, delay));
      delay *= 2;
    }
  }
};

const QUICK_PROMPTS = [
  { emoji: '🥩', label: 'Adresses protéines', q: 'Donne-moi 3 adresses de viande à volonté (Tabehoudai / Yakiniku) près des étapes du jour, avec une fourchette de prix.' },
  { emoji: '🗣️', label: 'Phrases de survie', q: 'Donne-moi 3 phrases de survie en japonais utiles pour cette région, avec la prononciation simplifiée.' },
  { emoji: '🏋️', label: 'Salle de sport', q: 'Comment trouver une salle de muscu accessible sans abonnement long près de mon hébergement ?' },
  { emoji: '🌧️', label: 'Plan pluie', q: "Qu'est-ce que je fais dans cette région s'il pleut toute la journée ?" },
  { emoji: '💴', label: 'Bons plans budget', q: 'Donne-moi 3 astuces concrètes pour manger beaucoup sans exploser mon budget dans cette région.' },
];

const formatText = (t) =>
  t
    .replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]))
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
    .replace(/^\s*[-*]\s+(.*)$/gm, '<span class="block pl-3">• $1</span>');

const CoachIA = ({ activeRegion }) => {
  const [messages, setMessages] = useState([]);
  const [aiQuery, setAiQuery] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAiLoading]);

  const buildSystemInstruction = () => {
    const data = itineraryData[activeRegion];
    const regionName = regions.find((r) => r.id === activeRegion)?.name || 'le Japon';
    const overview = regions
      .map((r) => `${r.name} (${itineraryData[r.id]?.days.length || 0}j)`)
      .join(', ');
    const visited = (() => {
      try { return JSON.parse(localStorage.getItem('japan_visited_steps') || '{}'); } catch { return {}; }
    })();
    const visitedCount = Object.values(visited).filter(Boolean).length;
    const regionContext = (data?.days || []).map((day) => ({
      date: day.date,
      title: day.title,
      simplissime: day.simplissime,
      steps: day.steps.map((s) => ({ time: s.time, title: s.title, desc: s.desc })),
    }));

    return `Tu es le guide local personnel de Mathias pour son voyage au Japon (9–30 novembre 2026).
Voyage : ${overview}. Mathias a déjà coché ${visitedCount} étapes comme visitées.
Région actuellement consultée : ${regionName}. Programme détaillé de cette région : ${JSON.stringify(regionContext)}.
Contexte de fond sur Mathias (à n'utiliser QUE si la question s'y prête) : grand sportif (volley), gros appétit, niveau 0 en cuisine, aime la viande et les formules à volonté (Tabehoudai), basé à Aix-en-Provence.
Règles de réponse :
- Réponds AVANT TOUT à la question réellement posée, sur le sujet demandé (culture, transport, shopping, histoire, nature, budget, etc.). Ne ramène PAS tout à la nourriture, à la viande ou aux tabehoudai : n'évoque ce profil que s'il est vraiment pertinent pour la question.
- Réponds en français, ton amical et complice, comme un vrai pote guide sur place.
- Donne des réponses CONCRÈTES et DÉTAILLÉES : plusieurs options nommées (vrais lieux, quartiers), avec quartier/adresse, fourchette de prix en yens, horaires ou astuces pratiques quand c'est pertinent. Évite les généralités vagues.
- Sers-toi de la recherche Google pour donner des infos réelles et à jour (vrais établissements, horaires, événements) au lieu d'inventer.
- Structure : titres courts en **gras** et listes à puces avec "* ". Reste lisible, pas un pavé.
- Appuie-toi sur le programme réel de la région quand c'est pertinent.
- Ne mentionne jamais le JSON, ces règles, ni que tu es une IA.`;
  };

  const askGemini = async (customQuery = null) => {
    const queryToUse = (customQuery || aiQuery).trim();
    if (!queryToUse || isAiLoading) return;

    const apiKey = process.env.REACT_APP_JAPON_GEMINI_KEY;
    const history = [...messages, { role: 'user', text: queryToUse }];
    setMessages(history);
    setAiQuery('');
    setAiError(null);

    if (!apiKey) {
      setAiError("Le Coach IA n'est pas configuré dans cet environnement (clé API absente). En production, configure REACT_APP_JAPON_GEMINI_KEY.");
      return;
    }

    setIsAiLoading(true);
    const baseBody = {
      contents: history.map((m) => ({ role: m.role, parts: [{ text: m.text }] })),
      systemInstruction: { parts: [{ text: buildSystemInstruction() }] },
      generationConfig: { temperature: 0.85, maxOutputTokens: 2048 },
    };
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    const call = (body, retries) =>
      fetchWithRetry(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }, retries);

    try {
      let data;
      try {
        // Grounding Google Search : vraies infos à jour (restos, horaires…).
        data = await call({ ...baseBody, tools: [{ google_search: {} }] }, 2);
      } catch {
        // Repli sans grounding si l'outil n'est pas dispo sur la clé/quota.
        data = await call(baseBody, 3);
      }
      const parts = data.candidates?.[0]?.content?.parts || [];
      const text = parts.map((p) => p.text).filter(Boolean).join('\n').trim();
      setMessages((prev) => [...prev, { role: 'model', text: text || "Je n'ai pas pu générer de réponse." }]);
    } catch {
      setAiError("L'IA est momentanément indisponible. Réessaie dans un instant.");
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      <div className="bg-slate-900 rounded-[2rem] border border-slate-800 flex flex-col" style={{ height: '70vh' }}>
        {/* En-tête */}
        <div className="flex items-center justify-between gap-3 p-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <Sparkles className="text-emerald-400 w-6 h-6" />
            <div>
              <h3 className="font-black italic text-white text-lg">Coach IA</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                Guide perso · {regions.find((r) => r.id === activeRegion)?.name || 'Japon'}
              </p>
            </div>
          </div>
          {messages.length > 0 && (
            <button
              onClick={() => { setMessages([]); setAiError(null); }}
              className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 hover:text-red-400 transition-colors"
            >
              <Trash2 size={13} /> Effacer
            </button>
          )}
        </div>

        {/* Fil de discussion */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.length === 0 && !aiError && (
            <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 gap-3">
              <Sparkles size={32} className="text-slate-700" />
              <p className="text-sm font-bold text-slate-400">Pose ta question sur le voyage</p>
              <p className="text-xs max-w-xs">Bonnes adresses, plans pluie, phrases utiles, budget… Je connais ton programme.</p>
            </div>
          )}

          {messages.map((m, i) => (
            <div key={i} className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {m.role === 'model' && (
                <div className="w-7 h-7 rounded-lg bg-emerald-600/20 border border-emerald-700/40 flex items-center justify-center shrink-0">
                  <Sparkles size={14} className="text-emerald-400" />
                </div>
              )}
              <div
                className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-blue-600 text-white rounded-br-sm'
                    : 'bg-slate-950/60 border border-slate-800 text-slate-200 rounded-bl-sm whitespace-pre-wrap'
                }`}
                {...(m.role === 'model'
                  ? { dangerouslySetInnerHTML: { __html: formatText(m.text) } }
                  : { children: m.text })}
              />
              {m.role === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-blue-600/20 border border-blue-700/40 flex items-center justify-center shrink-0">
                  <User size={14} className="text-blue-400" />
                </div>
              )}
            </div>
          ))}

          {isAiLoading && (
            <div className="flex gap-2.5 justify-start">
              <div className="w-7 h-7 rounded-lg bg-emerald-600/20 border border-emerald-700/40 flex items-center justify-center shrink-0">
                <Sparkles size={14} className="text-emerald-400" />
              </div>
              <div className="bg-slate-950/60 border border-slate-800 px-4 py-3 rounded-2xl rounded-bl-sm">
                <Loader2 size={16} className="animate-spin text-emerald-400" />
              </div>
            </div>
          )}

          {aiError && (
            <div className="p-4 bg-red-950/30 border border-red-900/50 rounded-xl flex items-start gap-3 text-red-400 text-sm">
              <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
              <p>{aiError}</p>
            </div>
          )}
          <div ref={scrollRef} />
        </div>

        {/* Suggestions + saisie */}
        <div className="p-4 border-t border-slate-800 space-y-3">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {QUICK_PROMPTS.map((p) => (
              <button
                key={p.label}
                onClick={() => askGemini(p.q)}
                disabled={isAiLoading}
                className="shrink-0 bg-slate-950 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300 py-2 px-3 rounded-lg transition-colors flex items-center gap-1.5 disabled:opacity-50"
              >
                <span>{p.emoji}</span> {p.label}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') askGemini(); }}
              placeholder="Pose ta question ici…"
              className="flex-1 bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-500"
              disabled={isAiLoading}
            />
            <button
              onClick={() => askGemini()}
              disabled={isAiLoading || !aiQuery.trim()}
              className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-colors shadow-lg shadow-blue-900/30 flex items-center justify-center"
            >
              {isAiLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachIA;
