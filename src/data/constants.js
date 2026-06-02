export const EXCHANGE_RATE = 185;

// Voyage d'Alban : 17 → 30 octobre 2026 (mois index 9 = octobre).
export const TRIP_MONTH = 9;
export const TRIP_YEAR = 2026;
export const TRIP_START = new Date(TRIP_YEAR, TRIP_MONTH, 17);
export const TRIP_END = new Date(TRIP_YEAR, TRIP_MONTH, 30);

// Cible du compte à rebours : arrivée au Kansai (KIX) le 17/10 à 9h40.
export const COUNTDOWN_TARGET = '2026-10-17T09:40:00';
