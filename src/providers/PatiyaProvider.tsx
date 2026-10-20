"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { PatiyaResolvedTheme, PatiyaTheme, PatiyaThemeContextType } from '../types/common';
import { ToastProvider } from '../components/Toast/Toast';

const PatiyaThemeContext = createContext<PatiyaThemeContextType | undefined>(undefined);

export type PatiyaProviderProps = {
  children: React.ReactNode;
  defaultTheme?: PatiyaTheme;
  storageKey?: string;
};

export function PatiyaProvider({ 
  children, 
  defaultTheme = 'system',
  storageKey = 'patiya-theme'
}: PatiyaProviderProps) {
  const [theme, setTheme] = useState<PatiyaTheme>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = useState<PatiyaResolvedTheme>(() => {
    if (defaultTheme === 'dark' || defaultTheme === 'light') return defaultTheme;
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(storageKey) as PatiyaTheme | null;
    if (stored) {
      setTheme(stored);
    }
  }, [storageKey]);

  useEffect(() => {
    if (!mounted) return;
    
    localStorage.setItem(storageKey, theme);
    
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.removeAttribute('data-theme');

    const getSystemTheme = (): PatiyaResolvedTheme =>
      window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

    if (theme === 'system') {
      const systemTheme = getSystemTheme();
      setResolvedTheme(systemTheme);
      root.classList.add(systemTheme);
      root.setAttribute('data-theme', systemTheme);

      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleMediaChange = () => {
        const currentTheme = mediaQuery.matches ? 'dark' : 'light';
        setResolvedTheme(currentTheme);
        root.classList.remove('light', 'dark');
        root.removeAttribute('data-theme');
        root.classList.add(currentTheme);
        root.setAttribute('data-theme', currentTheme);
      };

      mediaQuery.addEventListener('change', handleMediaChange);
      return () => mediaQuery.removeEventListener('change', handleMediaChange);
    }

    setResolvedTheme(theme);
    root.classList.add(theme);
    root.setAttribute('data-theme', theme);
  }, [theme, mounted, storageKey]);

  return (
    <PatiyaThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      <ToastProvider>
        {children}
      </ToastProvider>
    </PatiyaThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(PatiyaThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a PatiyaProvider');
  }
  return context;
};
