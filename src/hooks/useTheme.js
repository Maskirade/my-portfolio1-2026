import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { createThemeTransition } from '../lib/themeTransition.js';

const STORAGE_KEY = 'portfolio-theme';

function getStoredTheme() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === 'light' || stored === 'dark' ? stored : null;
  } catch {
    return null;
  }
}

function getInitialTheme() {
  if (typeof window === 'undefined') return 'dark';
  const stored = getStoredTheme();
  if (stored) return stored;
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  return prefersLight ? 'light' : 'dark';
}

export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);
  const requestedTheme = useRef(theme);
  const explicitPreference = useRef(Boolean(getStoredTheme()));
  const transition = useRef(null);

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('light', theme === 'light');
    if (explicitPreference.current) {
      try {
        window.localStorage.setItem(STORAGE_KEY, theme);
      } catch {
        // Theme switching still works when browser storage is unavailable.
      }
    }
  }, [theme]);

  useEffect(() => {
    const controller = createThemeTransition({
      applyTheme: (nextTheme) => flushSync(() => setTheme(nextTheme)),
    });
    transition.current = controller;
    return () => {
      transition.current = null;
      controller.dispose();
    };
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: light)');
    const handler = (e) => {
      if (!explicitPreference.current) {
        const nextTheme = e.matches ? 'light' : 'dark';
        requestedTheme.current = nextTheme;
        setTheme(nextTheme);
      }
    };
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);

  const toggleTheme = useCallback((anchor) => {
    const nextTheme = requestedTheme.current === 'dark' ? 'light' : 'dark';
    requestedTheme.current = nextTheme;
    explicitPreference.current = true;
    if (transition.current) transition.current.change(nextTheme, anchor);
    else setTheme(nextTheme);
  }, []);

  return { theme, toggleTheme };
}
