import React, { useEffect, useState } from 'react';
import { FileDown, Share2, BookHeart, Images, CheckCircle2, Loader2 } from 'lucide-react';
import { itineraryData } from '../data/itineraryData';
import { regions } from '../data/regions';
import { imageForMapUrl } from '../data/itineraryGeo';
import { getAllPhotos } from '../utils/photoStore';

const esc = (s) =>
  String(s || '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const blobToDataURL = (blob) =>
  new Promise((res) => {
    const r = new FileReader();
    r.onload = () => res(r.result);
    r.onerror = () => res(null);
    r.readAsDataURL(blob);
  });

const readJSON = (key, def) => {
  try { return JSON.parse(localStorage.getItem(key) || def); } catch { return JSON.parse(def); }
};

const ExportCarnet = () => {
  const [photoCount, setPhotoCount] = useState(0);
  const [building, setBuilding] = useState(false);

  const visited = readJSON('japan_visited_steps', '{}');
  const visitedCount = Object.values(visited).filter(Boolean).length;
  let totalSteps = 0;
  regions.forEach((r) => itineraryData[r.id]?.days.forEach((d) => (totalSteps += d.steps.length)));

  useEffect(() => {
    getAllPhotos().then((p) => setPhotoCount(p.length)).catch(() => {});
  }, []);

  const buildHtml = async () => {
    // Photos perso (IndexedDB) -> dataURL, regroupées par étape.
    const all = await getAllPhotos();
    const byStep = {};
    for (const p of all) {
      const url = await blobToDataURL(p.blob);
      if (!url) continue;
      (byStep[p.stepKey] = byStep[p.stepKey] || []).push(url);
    }
    const dayNotes = readJSON('japan_dailynotes', '{}');

    let body = '';
    regions.forEach((region) => {
      const data = itineraryData[region.id];
      if (!data) return;
      body += `<h2 class="region">${esc(data.chapter || region.name)}</h2>`;
      data.days.forEach((day) => {
        body += `<div class="day"><div class="day-head"><span class="date">${esc(day.date)}</span><span class="day-title">${esc(day.title)}</span></div>`;
        if (dayNotes[day.date]) body += `<p class="daynote">📔 ${esc(dayNotes[day.date])}</p>`;
        day.steps.forEach((step) => {
          const key = `${day.date}_${step.time}`;
          const done = visited[key];
          const note = localStorage.getItem(`japan_step_note_${key}`);
          const mine = byStep[key] || [];
          body += `<div class="step">
            <div class="step-top"><span class="time">${esc(step.time)}</span><span class="title">${esc(step.title)}${done ? ' <span class="done">✓ visité</span>' : ''}</span></div>
            ${step.mapUrl ? `<img class="placeimg" src="${imageForMapUrl(step.mapUrl)}" alt="">` : ''}
            <p class="desc">${esc(step.desc)}</p>
            ${note ? `<p class="mynote">📝 ${esc(note)}</p>` : ''}
            ${mine.length ? `<div class="gallery">${mine.map((u) => `<img src="${u}" alt="">`).join('')}</div>` : ''}
          </div>`;
        });
        body += `</div>`;
      });
    });

    return `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Mon Carnet de Voyage — Japon 2026</title>
<style>
  *{box-sizing:border-box} body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#0f172a;margin:0;padding:32px;max-width:900px;margin:0 auto}
  .cover{text-align:center;padding:40px 0 28px;border-bottom:3px solid #2563eb;margin-bottom:24px}
  .cover h1{font-size:30px;font-style:italic;letter-spacing:-1px;margin:0 0 8px}
  .cover p{color:#475569;margin:4px 0;font-size:13px}
  .region{font-size:13px;text-transform:uppercase;letter-spacing:2px;color:#2563eb;border-bottom:1px solid #e2e8f0;padding-bottom:6px;margin:28px 0 14px}
  .day{margin-bottom:18px}
  .day-head{display:flex;align-items:center;gap:10px;margin-bottom:8px}
  .date{background:#2563eb;color:#fff;font-size:11px;font-weight:800;padding:4px 10px;border-radius:6px;letter-spacing:1px}
  .day-title{font-weight:800;font-style:italic;font-size:17px}
  .daynote{background:#eff6ff;border-left:3px solid #60a5fa;padding:8px 12px;border-radius:6px;font-size:12px;font-style:italic;color:#1e3a8a}
  .step{padding:10px 0 10px 14px;border-left:2px solid #e2e8f0;margin-left:6px;page-break-inside:avoid}
  .step-top{display:flex;align-items:baseline;gap:10px}
  .time{font-size:11px;font-weight:700;color:#64748b;font-family:monospace}
  .title{font-weight:700;font-size:14px}
  .done{color:#059669;font-size:11px;font-weight:700}
  .placeimg{width:100%;max-height:200px;object-fit:cover;border-radius:10px;margin:8px 0}
  .desc{font-size:12px;color:#475569;line-height:1.5;margin:4px 0}
  .mynote{background:#fdf2f8;border-left:3px solid #ec4899;padding:8px 12px;border-radius:6px;font-size:12px;color:#831843;margin:6px 0}
  .gallery{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:8px}
  .gallery img{width:100%;aspect-ratio:1;object-fit:cover;border-radius:8px}
  @media print{body{padding:0 12px}.region{break-after:avoid}}
</style></head><body>
  <div class="cover"><h1>🗾 Mon Carnet de Voyage</h1><p><strong>Japon 2026</strong> · 9 → 30 novembre</p><p>${visitedCount} étapes vécues · ${all.length} photos souvenirs</p></div>
  ${body}
  <p style="text-align:center;color:#94a3b8;font-size:11px;margin-top:32px">Carnet de Voyage Digital</p>
</body></html>`;
  };

  const handlePrint = async () => {
    setBuilding(true);
    try {
      const html = await buildHtml();
      const w = window.open('', '_blank');
      if (!w) {
        alert('Autorise les fenêtres pop-up pour générer le carnet.');
        return;
      }
      w.document.write(html);
      w.document.close();
      // Laisse les images (place + dataURL) se charger avant l'impression.
      w.onload = () => setTimeout(() => w.print(), 400);
    } finally {
      setBuilding(false);
    }
  };

  const handleShare = async () => {
    const text = `Mon carnet de voyage au Japon 🗾 — ${visitedCount}/${totalSteps} étapes, ${photoCount} photos souvenirs !`;
    const shareData = { title: 'Mon Carnet de Voyage — Japon 2026', text, url: window.location.href };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${text}\n${window.location.href}`);
        alert('Lien et résumé copiés dans le presse-papier !');
      }
    } catch {
      /* partage annulé par l'utilisateur */
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-gradient-to-br from-pink-950/30 to-slate-900 border border-pink-900/40 p-6 rounded-[2rem] flex items-start gap-4">
        <BookHeart className="text-pink-400 w-8 h-8 flex-shrink-0 mt-0.5" />
        <div>
          <h2 className="text-lg font-black text-white italic mb-1">Mon Carnet Souvenir</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Exporte tout ton voyage — itinéraire, photos des lieux, tes propres photos et tes notes — en un
            document PDF à garder ou à partager.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: <CheckCircle2 size={18} className="text-emerald-400" />, val: `${visitedCount}/${totalSteps}`, lbl: 'Étapes vécues' },
          { icon: <Images size={18} className="text-pink-400" />, val: photoCount, lbl: 'Photos perso' },
          { icon: <BookHeart size={18} className="text-blue-400" />, val: regions.length, lbl: 'Régions' },
        ].map((s, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-center">
            <div className="flex justify-center mb-2">{s.icon}</div>
            <p className="text-xl font-black text-white">{s.val}</p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mt-1">{s.lbl}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <button
          onClick={handlePrint}
          disabled={building}
          className="flex items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-colors shadow-lg shadow-blue-900/40 disabled:opacity-60"
        >
          {building ? <Loader2 size={18} className="animate-spin" /> : <FileDown size={18} />}
          {building ? 'Génération…' : 'Générer le PDF'}
        </button>
        <button
          onClick={handleShare}
          className="flex items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm transition-colors border border-slate-700"
        >
          <Share2 size={18} /> Partager mon voyage
        </button>
      </div>

      <p className="text-[11px] text-slate-500 italic px-1">
        Le PDF se génère via la fenêtre d'impression de ton navigateur (choisis « Enregistrer au format PDF »).
        Tes photos perso sont intégrées directement dans le document.
      </p>
    </div>
  );
};

export default ExportCarnet;
