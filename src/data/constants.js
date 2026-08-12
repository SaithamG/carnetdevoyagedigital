export const EXCHANGE_RATE = 185;
export const salaireNov = 1786;
export const chargesFrance = 540;

// ── Trésorerie ───────────────────────────────────────────────────────────────
// Ancre RÉELLE relevée sur le compte épargne, pas une projection.
export const soldeReel = 1957;
export const soldeReelDate = '17 juillet 2026';

// Marge au retour, en fourchette. La variable qui décide, c'est la CAF :
//  · prudent  = épargne capée à 500 €/mois (août→oct), CAF toujours bloquée
//  · godMode  = 750 €/mois, si le déblocage CAF arrive comme espéré
// La prime d'activité n'est comptée dans AUCUN des deux : c'est du pur bonus.
export const surplusPrudent = 1539;
export const surplusGodMode = 2289;

// ── Dates du voyage — SOURCE DE VÉRITÉ UNIQUE ────────────────────────────────
// Enchaînement réel : TGV Aix→Paris le 7, nuit à Villepinte (EasyHotel CDG),
// décollage CDG le 8 à 12h25, atterrissage Haneda le 9 à 16h20 (escale Pékin).
// Retour : décollage Haneda le 30 à 08h30 (CA876), atterrissage CDG le 30 à
// 17h45 — TERMINAL 1, Air China n'opère qu'au T1 à CDG. Nuit près de CDG,
// puis OUIGO du 1er déc, 11h00 CDG2 TGV → Aix 14h10.
// Ne pas redéclarer ces dates ailleurs : le compte à rebours a déjà affiché
// deux valeurs différentes (113 vs 116) parce qu'elles vivaient en 3 endroits.
export const TGV_ALLER = new Date(2026, 10, 7);            // 7 nov — départ Aix
export const FLIGHT_OUT = new Date(2026, 10, 8, 12, 25);   // 8 nov 12h25 — décollage CDG
export const TRIP_START = new Date(2026, 10, 9);           // 9 nov — 1er jour d'itinéraire
export const TRIP_END = new Date(2026, 10, 30);            // 30 nov — décollage Haneda 08h30
