import React, { createContext, useContext, useEffect, useState } from 'react';
import { PatiyaThemeContextType } from '../types/common';
import { ToastProvider } from '../components/Toast/Toast';

const PatiyaThemeContext = createContext<PatiyaThemeContextType | undefined>(undefined);

export interface PatiyaProviderProps {
  children: React.ReactNode;
  defaultTheme?: 'light' | 'dark' | 'system';
  storageKey?: string;
}

export function PatiyaProvider({ 
  children, 
  defaultTheme = 'system',
  storageKey = 'patiya-theme'
}: PatiyaProviderProps) {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(storageKey) as 'light' | 'dark' | 'system' | null;
    if (stored) {
      setTheme(stored);
    }
  }, [storageKey]);

  // Apply theme to document and save to localStorage
  useEffect(() => {
    if (!mounted) return;
    
    localStorage.setItem(storageKey, theme);
    
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.removeAttribute('data-theme');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
      root.setAttribute('data-theme', systemTheme);
      return;
    }

    root.classList.add(theme);
    root.setAttribute('data-theme', theme);
  }, [theme, mounted, storageKey]);

  return (
    <PatiyaThemeContext.Provider value={{ theme, setTheme }}>
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
