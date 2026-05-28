import React, { useState } from 'react';
import { Sparkles, Loader2, Send, MessageSquare, AlertCircle } from 'lucide-react';
import { itineraryData } from '../data/itineraryData';

const fetchWithRetry = async (url, options, retries = 5, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMessage = errorData?.error?.message || (await response.text());
        throw new Error(`Erreur HTTP: ${response.status} - ${errorMessage}`);
      }
      return await response.json();
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise((res) => setTimeout(res, delay));
      delay *= 2;
    }
  }
};

const CoachIA = ({ activeRegion }) => {
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState(null);

  const askGemini = async (customQuery = null) => {
    const queryToUse = customQuery || aiQuery;
    if (!queryToUse.trim() || isAiLoading) return;

    setIsAiLoading(true);
    setAiError(null);
    setAiResponse('');

    const apiKey = process.env.REACT_APP_JAPON_GEMINI_KEY;
    const currentDays = itineraryData[activeRegion]?.days || [];
    const sanitizedContext = currentDays.map((day) => ({
      date: day.date,
      title: day.title,
      simplissime: day.simplissime,
      steps: day.steps.map((step) => ({ time: step.time, title: step.title, desc: step.desc })),
    }));

    const systemInstruction = `Tu es un guide local au Japon, expert, amical et très direct.
Tu t'adresses à Mathias, un grand sportif (Volley) qui a très faim (Niveau 0 en cuisine, il adore la viande et les formules à volonté 'Tabehoudai').
Utilise ce programme pour contextualiser tes réponses : ${JSON.stringify(sanitizedContext)}.
Ne mentionne pas le JSON. Réponds en français de manière hyper concise et pertinente. Formate le texte avec des astérisques pour le gras.`;

    const payload = {
      contents: [{ parts: [{ text: queryToUse }] }],
      systemInstruction: { parts: [{ text: systemInstruction }] },
    };

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
      const data = await fetchWithRetry(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      setAiResponse(text || "Je n'ai pas pu générer de réponse.");
    } catch {
      setAiError("L'IA est actuellement indisponible ou non configurée dans cet environnement.");
    } finally {
      setIsAiLoading(false);
      if (!customQuery) setAiQuery('');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-slate-900 p-6 rounded-[2rem] border border-slate-800">
        <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
          <Sparkles className="text-emerald-400 w-6 h-6" />
          <div>
            <h3 className="font-black italic text-white text-lg">Assistant IA</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Alimenté par Gemini API</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 mb-4 relative z-10">
            <button
              onClick={() => setAiQuery('Quelles sont les meilleures adresses de viande à volonté (Tabehoudai) près de ces étapes ?')}
              className="bg-slate-950 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300 py-2 px-3 rounded-lg transition-colors flex items-center gap-1"
            >
              🥩 Adresses Protéines
            </button>
            <button
              onClick={() => setAiQuery('Génère-moi 3 phrases de survie en japonais très simples, avec la prononciation.')}
              className="bg-slate-950 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300 py-2 px-3 rounded-lg transition-colors flex items-center gap-1"
            >
              🗣️ Phrases de survie
            </button>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') askGemini(); }}
              placeholder="Pose ta question ici..."
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

          {aiError && (
            <div className="mt-4 p-4 bg-red-950/30 border border-red-900/50 rounded-xl flex items-start gap-3 text-red-400 text-sm">
              <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
              <p>{aiError}</p>
            </div>
          )}

          {aiResponse && !aiError && (
            <div className="mt-6 p-5 bg-slate-950/50 rounded-2xl border border-blue-900/30 relative overflow-hidden">
              <MessageSquare className="absolute -top-2 -right-2 text-blue-900/20" size={80} />
              <div
                className="text-sm text-slate-200 leading-relaxed relative z-10 space-y-4 whitespace-pre-wrap"
                dangerouslySetInnerHTML={{
                  __html: aiResponse.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>'),
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoachIA;
