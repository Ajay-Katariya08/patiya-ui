"use client";

import React, { useState } from 'react';
import { CodeTabs } from './CodeTabs';

export function ExampleCard({ children, code, className }: { children: React.ReactNode, code: string, className?: string }) {
  const [showCode, setShowCode] = useState(false);
  return (
    <div className="border border-[var(--patiya-color-border)] rounded-xl bg-[var(--patiya-color-background)] overflow-hidden flex flex-col mt-4">
      <div className={`p-8 flex-1 relative ${className || ''}`}>
        {children}
      </div>
      <div className="border-t border-[var(--patiya-color-border)] bg-[var(--patiya-color-muted)]/10 px-4 py-3 flex items-center justify-start">
        <button 
          onClick={() => setShowCode(!showCode)}
          className="text-xs font-medium text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] transition-colors flex items-center gap-1.5"
        >
          <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${showCode ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          {showCode ? 'Hide code' : 'Show code'}
        </button>
      </div>
      <div 
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${showCode ? 'grid-rows-[1fr] border-t border-[var(--patiya-color-border)]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden bg-[#0d1117] [&>div]:border-0 [&>div]:rounded-none [&>div]:shadow-none">
          <CodeTabs tabs={[{ name: 'tsx', code }]} />
        </div>
      </div>
    </div>
  );
}
