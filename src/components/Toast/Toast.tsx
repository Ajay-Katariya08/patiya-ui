"use client";
import React, { createContext, useContext, useState, useCallback } from 'react';
import { cn } from '../../utils/cn';
import { Box } from '../Layout/Box';

interface ToastOptions {
  id: string;
  title?: string;
  description?: string;
  type?: 'default' | 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

interface ToastContextType {
  toast: (options: Omit<ToastOptions, 'id'>) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastOptions[]>([]);

  const toast = useCallback((options: Omit<ToastOptions, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, ...options }]);

    if (options.duration !== Infinity) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, options.duration || 5000);
    }
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      <Box className="fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px] gap-2 pointer-events-none">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onDismiss={() => dismiss(t.id)} />
        ))}
      </Box>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
}

function ToastItem({ toast, onDismiss }: { toast: ToastOptions; onDismiss: () => void }) {
  const typeClasses = {
    default: 'bg-[var(--patiya-color-background)] border-[var(--patiya-color-border)] text-[var(--patiya-color-foreground)]',
    success: 'bg-[var(--patiya-color-success)] text-[var(--patiya-color-primary-foreground)] border-transparent',
    error: 'bg-[var(--patiya-color-destructive)] text-[var(--patiya-color-primary-foreground)] border-transparent',
    warning: 'bg-[var(--patiya-color-warning)] text-zinc-900 border-transparent',
    info: 'bg-[var(--patiya-color-info)] text-[var(--patiya-color-primary-foreground)] border-transparent',
  };

  return (
    <Box className={cn(
      "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-xl border p-5 shadow-lg transition-all animate-[pulse_0.2s_ease-out]",
      typeClasses[toast.type || 'default']
    )}>
      <Box className="flex w-full flex-col gap-1">
        {toast.title && <Box className="text-sm font-semibold leading-none tracking-tight">{toast.title}</Box>}
        {toast.description && <Box className="text-sm opacity-90 leading-relaxed mt-1">{toast.description}</Box>}
      </Box>
      <button 
        onClick={onDismiss} 
        className="absolute right-2 top-2 rounded-md p-1.5 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/10 focus:opacity-100"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
    </Box>
  );
}
