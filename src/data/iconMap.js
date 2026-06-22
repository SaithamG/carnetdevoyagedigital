import React from 'react';
import {
  PlaneTakeoff, Hotel, Utensils, Leaf, Gamepad2, Sun, Dumbbell, Flame,
  ShoppingBag, Camera, Train, Castle, Mountain, Waves, Sparkles, Moon,
  MapPin, Coffee, Ticket, Zap, Clock,
} from 'lucide-react';

/**
 * Carnet importé : les données viennent d'un PDF parsé par l'IA, donc elles ne
 * peuvent pas contenir de JSX. On stocke une CLÉ TEXTE (ex "utensils") et on la
 * résout ici en composant lucide au moment de l'affichage.
 *
 * IMPORTANT : on n'utilise QUE des icônes déjà présentes dans le projet
 * (cf. itineraryData.jsx) pour garantir qu'elles existent dans cette version
 * de lucide-react.
 */
const ICON_COMPONENTS = {
  plane: PlaneTakeoff,
  hotel: Hotel,
  food: Utensils,
  meat: Flame,
  nature: Leaf,
  temple: Castle,
  view: Sun,
  gym: Dumbbell,
  shopping: ShoppingBag,
  sightseeing: Camera,
  train: Train,
  mountain: Mountain,
  water: Waves,
  special: Sparkles,
  night: Moon,
  cafe: Coffee,
  attraction: Ticket,
  energy: Zap,
  time: Clock,
  place: MapPin,
};

/** Liste des clés autorisées, injectée dans le prompt Gemini. */
export const ICON_KEYS = Object.keys(ICON_COMPONENTS);

/** Mots-clés → clé d'icône, pour deviner quand l'IA ne fournit pas de clé valide. */
const KEYWORD_HINTS = [
  [/(aéroport|aeroport|avion|vol|atterriss|haneda|narita|airport|flight)/i, 'plane'],
  [/(hôtel|hotel|check-?in|ryokan|auberge|logement|hébergement|hebergement|inn)/i, 'hotel'],
  [/(ramen|sushi|resto|restaurant|repas|dîner|diner|déjeuner|dejeuner|izakaya|curry|manger|food|gastronom)/i, 'food'],
  [/(yakiniku|bbq|barbecue|viande|tabehoudai|grill)/i, 'meat'],
  [/(parc|park|jardin|sanctuaire|jingu|meiji|forêt|foret|nature|yoyogi)/i, 'nature'],
  [/(temple|senso-?ji|pagode|château|chateau|castle|shrine)/i, 'temple'],
  [/(sky|tour|tower|panorama|vue|observatoire|coucher de soleil|sunset|rooftop)/i, 'view'],
  [/(gym|muscu|sport|fitness|salle|entraîn|entrain)/i, 'gym'],
  [/(shopping|boutique|magasin|store|achat|mall|centre commercial|don ?quijote)/i, 'shopping'],
  [/(visite|balade|quartier|crossing|carrefour|découv|decouv|photo)/i, 'sightseeing'],
  [/(train|métro|metro|gare|station|shinkansen|jr|suica|transport)/i, 'train'],
  [/(montagne|fuji|mont|alpes|nagano|hakone)/i, 'mountain'],
  [/(mer|plage|océan|ocean|rivière|riviere|lac|onsen|bain)/i, 'water'],
  [/(café|cafe|coffee|salon de thé|the)/i, 'cafe'],
  [/(parc d'attraction|usj|disney|teamlab|musée|musee|zoo|aquarium|billet|ticket)/i, 'attraction'],
  [/(nuit|soir|bar|néon|neon|kabukicho|nightlife|izakaya)/i, 'night'],
];

/** Devine une clé d'icône à partir d'un texte libre (titre + description). */
export const guessIconKey = (text = '') => {
  for (const [regex, key] of KEYWORD_HINTS) {
    if (regex.test(text)) return key;
  }
  return 'place';
};

/**
 * Résout une clé (ou un texte de secours) en élément React lucide.
 * @param {string} key   clé renvoyée par l'IA
 * @param {object} opts  { size, className, fallbackText }
 */
export const resolveIcon = (key, { size = 20, className = '', fallbackText = '' } = {}) => {
  const safeKey = ICON_COMPONENTS[key] ? key : guessIconKey(fallbackText);
  const Comp = ICON_COMPONENTS[safeKey] || MapPin;
  return <Comp size={size} className={className} />;
};

export default ICON_COMPONENTS;
