import React, { useState, useRef } from 'react';
import {
  UploadCloud, Loader2, AlertCircle, Pencil, Save, Trash2, ArrowUp, ArrowDown,
  ImagePlus, X, FileText, RefreshCw, CheckCircle2,
} from 'lucide-react';
import { extractPdfText, parsePdfToCarnet } from '../lib/pdfImport';
import { fileToScaledDataUrl } from '../lib/imageUtil';
import { useCarnet } from '../context/CarnetContext';
import PlaceImage from './PlaceImage';

const FIELD_CLS =
  'mt-1.5 w-full bg-slate-950 border border-slate-700/70 rounded-lg px-3 py-2.5 text-sm text-white ' +
  'placeholder:text-slate-600 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors';

const Field = ({ label, value, onChange, textarea, placeholder, type = 'text' }) => (
  <label className="block">
    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">{label}</span>
    {textarea ? (
      <textarea
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ colorScheme: 'dark' }}
        className={`${FIELD_CLS} min-h-[70px] resize-y`}
      />
    ) : (
      <input
        type={type}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ colorScheme: 'dark' }}
        className={FIELD_CLS}
      />
    )}
  </label>
);

const ImportPdf = () => {
  const { raw, brand, dirty, importCarnet, updateRaw, saveNow, updateBrand, clearAll } = useCarnet();
  const [status, setStatus] = useState('idle'); // idle | working
  const [progress, setProgress] = useState('');
  const [error, setError] = useState(null);
  const [apiKey, setApiKey] = useState('');
  const [savedFlash, setSavedFlash] = useState(false);
  const fileRef = useRef(null);

  const persist = async () => {
    await saveNow();
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 1500);
  };

  const runImport = async (file) => {
    if (!file) return;
    setStatus('working');
    setError(null);
    try {
      setProgress('Lecture du texte du PDF…');
      const text = await extractPdfText(file);

      setProgress("Analyse du contenu par l'IA…");
      const key = process.env.REACT_APP_JAPON_GEMINI_KEY || apiKey;
      const parsed = await parsePdfToCarnet(text, key);

      await importCarnet(parsed);
      setStatus('idle');
    } catch (e) {
      setError(e.message || "Échec de l'import.");
      setStatus('idle');
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file?.type === 'application/pdf') runImport(file);
    else setError('Merci de déposer un fichier PDF.');
  };

  const replaceImage = async (file, apply) => {
    if (!file) return;
    const dataUrl = await fileToScaledDataUrl(file);
    updateRaw(apply(dataUrl));
  };

  /* ----------------------------- ÉCRAN UPLOAD ----------------------------- */
  if (!raw) {
    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-500">
        <div className="text-center">
          <h2 className="text-2xl font-black italic text-white">Importer un carnet depuis un PDF</h2>
          <p className="text-sm text-slate-400 mt-2">
            Déposez votre eBook / itinéraire PDF : l'IA en génère automatiquement un carnet de voyage
            (étapes, photos, adresses, conseils) que vous pourrez ensuite modifier librement.
          </p>
        </div>

        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
          onClick={() => fileRef.current?.click()}
          className="border-2 border-dashed border-slate-700 rounded-[2rem] p-12 text-center cursor-pointer hover:border-blue-500 hover:bg-slate-900/40 transition-colors"
        >
          {status === 'working' ? (
            <div className="flex flex-col items-center gap-3 text-slate-300">
              <Loader2 size={36} className="animate-spin text-blue-400" />
              <p className="font-bold text-sm">{progress}</p>
              <p className="text-xs text-slate-500">Cela peut prendre un moment sur un gros PDF…</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 text-slate-400">
              <UploadCloud size={40} className="text-slate-500" />
              <p className="font-bold text-slate-200">Glissez votre PDF ici</p>
              <p className="text-xs">ou cliquez pour choisir un fichier</p>
            </div>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={(e) => runImport(e.target.files?.[0])}
          />
        </div>

        {!process.env.REACT_APP_JAPON_GEMINI_KEY && (
          <div className="bg-amber-950/30 border border-amber-900/50 rounded-xl p-4 text-amber-300 text-xs space-y-2">
            <p className="flex items-center gap-2 font-bold"><AlertCircle size={14} /> Clé IA non configurée dans cet environnement</p>
            <p>En production la clé est automatique. Pour tester en local, collez une clé Gemini :</p>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Clé API Gemini (test local)"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200"
            />
          </div>
        )}

        {error && (
          <div className="bg-red-950/30 border border-red-900/50 rounded-xl p-4 flex items-start gap-3 text-red-400 text-sm">
            <AlertCircle size={18} className="shrink-0 mt-0.5" /> <p>{error}</p>
          </div>
        )}
      </div>
    );
  }

  /* ------------------------- BARRE D'OUTILS + VUES ------------------------- */
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 border border-slate-800 rounded-2xl p-3">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Pencil size={15} className="text-blue-400" />
          <span>Modifie le carnet ici. L'aperçu se voit dans les onglets <b className="text-slate-200">Itinéraire</b> et <b className="text-slate-200">Carte</b>.</span>
        </div>
        <div className="flex gap-2 items-center">
          {savedFlash && <span className="text-emerald-400 text-xs font-bold flex items-center gap-1"><CheckCircle2 size={14} /> Enregistré</span>}
          <button
            onClick={persist}
            disabled={!dirty}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white disabled:opacity-40"
          >
            <Save size={15} /> Enregistrer
          </button>
          <button onClick={clearAll} className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold bg-slate-950 text-slate-400 hover:text-red-400">
            <RefreshCw size={14} /> Nouveau PDF
          </button>
        </div>
      </div>

      <Editor raw={raw} brand={brand} update={updateRaw} updateBrand={updateBrand} replaceImage={replaceImage} />
    </div>
  );
};

/* ------------------------------- ÉDITEUR -------------------------------- */
// Aperçu de la photo réelle (uploadée OU auto Wikipédia via le titre) + actions.
const PhotoEditor = ({ image, title, onReplace, onRemove }) => (
  <div className="relative w-full h-36 rounded-xl overflow-hidden border border-slate-800">
    <PlaceImage src={image} title={title} query={title} className="w-full h-full object-cover" />
    {!image && (
      <span className="absolute bottom-2 left-2 text-[10px] font-bold bg-black/60 text-white px-2 py-0.5 rounded-md">
        Photo auto
      </span>
    )}
    <div className="absolute top-2 right-2 flex gap-1.5">
      <label className="cursor-pointer bg-slate-900/90 text-white px-2 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 border border-slate-700 hover:bg-slate-800">
        <ImagePlus size={12} /> Changer
        <input type="file" accept="image/*" className="hidden" onChange={(e) => onReplace(e.target.files?.[0])} />
      </label>
      {image && (
        <button onClick={onRemove} className="bg-red-600/90 text-white px-2 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1">
          <X size={12} /> Retirer
        </button>
      )}
    </div>
  </div>
);

const Editor = ({ raw, brand, update, updateBrand, replaceImage }) => {
  const logoInput = useRef(null);
  return (
    // --accent pilote le focus des champs ; color-scheme dark évite le gris
    // clair des champs natifs.
    <div className="space-y-8" style={{ colorScheme: 'dark', '--accent': brand.accent }}>

      {/* MARQUE */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
        <h3 className="font-black italic" style={{ color: brand.accent }}>Identité de l'agence</h3>
        <div className="grid md:grid-cols-2 gap-3">
          <Field label="Nom de l'agence" value={brand.name} onChange={(v) => updateBrand({ name: v })} />
          <Field label="Accroche" value={brand.tagline} onChange={(v) => updateBrand({ tagline: v })} />
          <Field label="Instagram (URL)" value={brand.instagram} onChange={(v) => updateBrand({ instagram: v })} />
          <Field label="Site web (URL)" value={brand.website} onChange={(v) => updateBrand({ website: v })} />
          <Field label="Bouton d'action (texte)" value={brand.ctaLabel} onChange={(v) => updateBrand({ ctaLabel: v })} />
          <Field label="Bouton d'action (URL)" value={brand.ctaUrl} onChange={(v) => updateBrand({ ctaUrl: v })} />
          <Field label="Date de départ (compte à rebours)" type="date" value={brand.tripStart} onChange={(v) => updateBrand({ tripStart: v })} />
          <label className="block">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">Couleur d'accent</span>
            <div className="mt-1 flex items-center gap-2">
              <input type="color" value={brand.accent} onChange={(e) => updateBrand({ accent: e.target.value })} className="w-10 h-9 rounded bg-slate-950 border border-slate-800" />
              <span className="text-sm text-slate-300">{brand.accent}</span>
            </div>
          </label>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">Logo</span>
            <div className="mt-1 flex items-center gap-3">
              {brand.logo && <img src={brand.logo} alt="logo" className="h-9 object-contain" />}
              <button onClick={() => logoInput.current?.click()} className="text-xs font-bold bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-300 hover:text-white flex items-center gap-1">
                <ImagePlus size={13} /> {brand.logo ? 'Changer' : 'Ajouter'}
              </button>
              {brand.logo && <button onClick={() => updateBrand({ logo: null })} className="text-xs text-red-400">Retirer</button>}
              <input
                ref={logoInput}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={async (e) => {
                  const f = e.target.files?.[0];
                  if (f) updateBrand({ logo: await fileToScaledDataUrl(f, 256) });
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* MÉTA CARNET */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
        <h3 className="font-black italic" style={{ color: brand.accent }}>Le carnet</h3>
        <Field label="Titre" value={raw.title} onChange={(v) => update((r) => { r.title = v; })} />
        <Field label="Introduction" textarea value={raw.intro} onChange={(v) => update((r) => { r.intro = v; })} />
        <Field label="Mot de fin" textarea value={raw.outro} onChange={(v) => update((r) => { r.outro = v; })} />
      </section>

      {/* ITINÉRAIRES */}
      {(raw.regions || []).map((region, rIdx) => (
        <section key={rIdx} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <h3 className="font-black italic" style={{ color: brand.accent }}>Itinéraire {rIdx + 1}</h3>
          <Field label="Nom de l'itinéraire" value={region.name} onChange={(v) => update((r) => { r.regions[rIdx].name = v; })} />
          <Field label="Description" textarea value={region.desc} onChange={(v) => update((r) => { r.regions[rIdx].desc = v; })} />

          {(region.days || []).map((day, dIdx) => (
            <div key={dIdx} className="border border-slate-800 rounded-xl p-4 space-y-4 bg-slate-950/40">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Date / jour" value={day.date} onChange={(v) => update((r) => { r.regions[rIdx].days[dIdx].date = v; })} />
                <Field label="Titre du jour" value={day.title} onChange={(v) => update((r) => { r.regions[rIdx].days[dIdx].title = v; })} />
              </div>

              {(day.steps || []).map((step, sIdx) => (
                <div key={sIdx} className="border border-slate-800 rounded-lg p-3 space-y-3 bg-slate-900">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">Étape {sIdx + 1}</span>
                    <div className="flex gap-1">
                      <button disabled={sIdx === 0} onClick={() => update((r) => { const a = r.regions[rIdx].days[dIdx].steps; [a[sIdx - 1], a[sIdx]] = [a[sIdx], a[sIdx - 1]]; })} className="p-1 text-slate-400 hover:text-white disabled:opacity-30"><ArrowUp size={14} /></button>
                      <button disabled={sIdx === day.steps.length - 1} onClick={() => update((r) => { const a = r.regions[rIdx].days[dIdx].steps; [a[sIdx + 1], a[sIdx]] = [a[sIdx], a[sIdx + 1]]; })} className="p-1 text-slate-400 hover:text-white disabled:opacity-30"><ArrowDown size={14} /></button>
                      <button onClick={() => update((r) => { r.regions[rIdx].days[dIdx].steps.splice(sIdx, 1); })} className="p-1 text-slate-400 hover:text-red-400"><Trash2 size={14} /></button>
                    </div>
                  </div>
                  <div className="grid grid-cols-[80px_1fr] gap-3">
                    <Field label="Heure" value={step.time} onChange={(v) => update((r) => { r.regions[rIdx].days[dIdx].steps[sIdx].time = v; })} />
                    <Field label="Lieu" value={step.title} onChange={(v) => update((r) => { r.regions[rIdx].days[dIdx].steps[sIdx].title = v; })} />
                  </div>
                  <Field label="Description" textarea value={step.desc} onChange={(v) => update((r) => { r.regions[rIdx].days[dIdx].steps[sIdx].desc = v; })} />
                  <PhotoEditor
                    image={step.image}
                    title={step.title}
                    onReplace={(f) => replaceImage(f, (url) => (r) => { r.regions[rIdx].days[dIdx].steps[sIdx].image = url; })}
                    onRemove={() => update((r) => { r.regions[rIdx].days[dIdx].steps[sIdx].image = null; })}
                  />
                </div>
              ))}
            </div>
          ))}
        </section>
      ))}

      {/* ADRESSES */}
      {(raw.addresses || []).length > 0 && (
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <h3 className="font-black italic" style={{ color: brand.accent }}>Bonnes adresses</h3>
          {raw.addresses.map((a, i) => (
            <div key={i} className="border border-slate-800 rounded-lg p-3 space-y-3 bg-slate-950/40">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">Adresse {i + 1}</span>
                <button onClick={() => update((r) => { r.addresses.splice(i, 1); })} className="p-1 text-slate-400 hover:text-red-400"><Trash2 size={14} /></button>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                <Field label="Nom" value={a.name} onChange={(v) => update((r) => { r.addresses[i].name = v; })} />
                <Field label="Catégorie" value={a.category} onChange={(v) => update((r) => { r.addresses[i].category = v; })} />
              </div>
              <Field label="Description" textarea value={a.desc} onChange={(v) => update((r) => { r.addresses[i].desc = v; })} />
              <PhotoEditor
                image={a.image}
                title={a.name}
                onReplace={(f) => replaceImage(f, (url) => (r) => { r.addresses[i].image = url; })}
                onRemove={() => update((r) => { r.addresses[i].image = null; })}
              />
            </div>
          ))}
        </section>
      )}

      {/* CONSEILS */}
      {(raw.conseils || []).length > 0 && (
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
          <h3 className="font-black italic flex items-center gap-2" style={{ color: brand.accent }}><FileText size={16} /> Conseils</h3>
          {raw.conseils.map((c, i) => (
            <div key={i} className="flex gap-2 items-start">
              <textarea
                value={c}
                onChange={(e) => update((r) => { r.conseils[i] = e.target.value; })}
                style={{ colorScheme: 'dark' }}
                className="flex-1 bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 focus:bg-slate-800 min-h-[44px] resize-y transition-colors"
              />
              <button onClick={() => update((r) => { r.conseils.splice(i, 1); })} className="p-2 text-slate-400 hover:text-red-400"><Trash2 size={14} /></button>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default ImportPdf;
