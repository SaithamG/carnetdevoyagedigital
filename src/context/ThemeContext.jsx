import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const FONT_SIZES = { normal: '16px', large: '18px', xl: '20px' };

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => localStorage.getItem('cvd_theme') || 'dark');
  const [fontSize, setFontSize] = useState(() => localStorage.getItem('cvd_fontSize') || 'normal');

  useEffect(() => {
    localStorage.setItem('cvd_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('cvd_fontSize', fontSize);
    document.documentElement.style.fontSize = FONT_SIZES[fontSize] || '16px';
  }, [fontSize]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, fontSize, setFontSize }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
