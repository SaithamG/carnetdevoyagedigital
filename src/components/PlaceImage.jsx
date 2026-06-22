import React, { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';

// Cache mémoire des recherches Wikipédia (évite de refaire les requêtes).
const wikiCache = {};

// Récupère une vraie photo du lieu via Wikipédia (gratuit, sans clé, CORS ok).
const fetchWikiImage = async (query) => {
  if (!query) return null;
  if (query in wikiCache) return wikiCache[query];
  const tryLang = async (lang) => {
    const url =
      `https://${lang}.wikipedia.org/w/api.php?action=query&generator=search` +
      `&gsrsearch=${encodeURIComponent(query)}&gsrlimit=1&prop=pageimages&piprop=thumbnail` +
      `&pithumbsize=700&format=json&origin=*`;
    const res = await fetch(url);
    const json = await res.json();
    const pages = json?.query?.pages || {};
    const first = Object.values(pages)[0];
    return first?.thumbnail?.source || null;
  };
  try {
    const img = (await tryLang('en')) || (await tryLang('fr'));
    wikiCache[query] = img;
    return img;
  } catch {
    wikiCache[query] = null;
    return null;
  }
};

// Affiche la photo d'un lieu. Cascade : `src` (photo du PDF) → photo Wikipédia
// (via `query`/`title`) → dégradé propre avec le nom. Jamais d'image cassée.
const PlaceImage = ({ src, title, query, className = '' }) => {
  const [resolved, setResolved] = useState(src || null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    setFailed(false);
    if (src) { setResolved(src); return undefined; }
    const q = query || title;
    setResolved(null);
    fetchWikiImage(q).then((url) => { if (alive) setResolved(url); });
    return () => { alive = false; };
  }, [src, query, title]);

  if (!resolved || failed) {
    return (
      <div className={`flex flex-col items-center justify-center gap-1.5 bg-gradient-to-br from-slate-800 via-slate-850 to-slate-900 ${className}`}>
        <MapPin size={22} className="text-slate-600" />
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 text-center leading-tight line-clamp-2">
          {title}
        </span>
      </div>
    );
  }

  return <img src={resolved} alt={title} loading="lazy" onError={() => setFailed(true)} className={className} />;
};

export default PlaceImage;
