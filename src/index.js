import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './style.css';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';

// Applique le thème et la taille de texte sauvegardés AVANT le premier rendu React
// (évite un flash et garde les side-effects hors du cycle de rendu)
const FONT_SIZES = { normal: '16px', large: '18px', xl: '20px' };
const _savedTheme = localStorage.getItem('cvd_theme') || 'dark';
const _savedSize  = localStorage.getItem('cvd_fontSize') || 'normal';
document.documentElement.setAttribute('data-theme', _savedTheme);
document.documentElement.style.fontSize = FONT_SIZES[_savedSize] || '16px';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);

// Pendant la phase de test Laugx : on DÉSACTIVE le service worker et on purge
// les caches existants, pour éviter que l'ancienne appli (compte à rebours, etc.)
// reste servie en cache. (On pourra réactiver la PWA pour le client plus tard.)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((regs) => regs.forEach((r) => r.unregister())).catch(() => {});
}
if (window.caches) {
  caches.keys().then((keys) => keys.forEach((k) => caches.delete(k))).catch(() => {});
}
