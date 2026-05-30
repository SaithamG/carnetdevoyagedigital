import React, { useEffect, useRef, useState } from 'react';
import { Camera, Trash2, BookHeart, Loader2 } from 'lucide-react';
import { addPhotos, getPhotos, deletePhoto } from '../utils/photoStore';

const noteKey = (stepKey) => `japan_step_note_${stepKey}`;

// Carnet souvenir d'une étape : photos perso (IndexedDB) + note.
const StepJournal = ({ stepKey }) => {
  const [open, setOpen] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState(() => localStorage.getItem(noteKey(stepKey)) || '');
  const fileRef = useRef(null);

  const load = async () => {
    const recs = await getPhotos(stepKey);
    setPhotos(recs.sort((a, b) => a.ts - b.ts));
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [stepKey]);

  // Object URLs dérivés des blobs, révoqués proprement à chaque changement.
  const [urls, setUrls] = useState([]);
  useEffect(() => {
    const made = photos.map((p) => ({ id: p.id, url: URL.createObjectURL(p.blob) }));
    setUrls(made);
    return () => made.forEach((m) => URL.revokeObjectURL(m.url));
  }, [photos]);

  const handleFiles = async (e) => {
    const files = e.target.files;
    if (!files?.length) return;
    setBusy(true);
    try {
      await addPhotos(stepKey, files);
      await load();
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const handleDelete = async (id) => {
    await deletePhoto(id);
    await load();
  };

  const handleNote = (val) => {
    setNote(val);
    if (val) localStorage.setItem(noteKey(stepKey), val);
    else localStorage.removeItem(noteKey(stepKey));
  };

  const count = photos.length;
  const hasContent = count > 0 || note.trim().length > 0;

  return (
    <div className="mt-3" onClick={(e) => e.stopPropagation()}>
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-2 text-[11px] font-bold px-3 py-1.5 rounded-lg border transition-colors ${
          hasContent
            ? 'bg-pink-950/30 border-pink-800/50 text-pink-300 hover:bg-pink-900/40'
            : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
        }`}
      >
        <BookHeart size={13} />
        Mon souvenir{count > 0 ? ` · ${count} photo${count > 1 ? 's' : ''}` : ''}
      </button>

      {open && (
        <div className="mt-3 p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3 animate-in fade-in zoom-in-95">
          {urls.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {urls.map((u) => (
                <div key={u.id} className="relative group/photo aspect-square">
                  <img src={u.url} alt="Souvenir" className="w-full h-full object-cover rounded-xl border border-slate-800" />
                  <button
                    onClick={() => handleDelete(u.id)}
                    className="absolute top-1 right-1 bg-red-600/90 hover:bg-red-500 text-white p-1.5 rounded-lg opacity-0 group-hover/photo:opacity-100 transition-opacity"
                    title="Supprimer"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            capture="environment"
            multiple
            onChange={handleFiles}
            className="hidden"
          />
          <button
            onClick={() => fileRef.current?.click()}
            disabled={busy}
            className="w-full flex items-center justify-center gap-2 text-xs font-bold px-3 py-2.5 rounded-xl bg-pink-600/20 hover:bg-pink-600 text-pink-300 hover:text-white border border-pink-500/30 transition-colors disabled:opacity-60"
          >
            {busy ? <Loader2 size={14} className="animate-spin" /> : <Camera size={14} />}
            {busy ? 'Ajout…' : 'Ajouter mes photos'}
          </button>

          <textarea
            value={note}
            onChange={(e) => handleNote(e.target.value)}
            placeholder="Mon souvenir, mon avis, une adresse à retenir…"
            className="w-full bg-slate-900/60 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 focus:outline-none focus:border-pink-500/60 transition-colors placeholder:text-slate-600 min-h-[60px] resize-y"
          />
        </div>
      )}
    </div>
  );
};

export default StepJournal;
