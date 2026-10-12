"use client";
import { useState } from 'react';
import { Box } from 'patiya';

export function CodeTabs({ tabs }: { tabs: { name: string, code: string }[] }) {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(tabs[active].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box className="rounded-xl overflow-hidden border border-[var(--patiya-color-border)] bg-[#0d1117] text-[#c9d1d9] shadow-lg relative group">
      <Box className="flex border-b border-[#30363d] bg-[#161b22] justify-between items-center pr-4">
        <Box className="flex">
          {tabs.map((tab, i) => (
            <button
              key={tab.name}
              onClick={() => { setActive(i); setCopied(false); }}
              className={`px-5 py-2.5 text-sm font-medium transition-colors border-b-2 ${active === i ? 'text-white border-blue-500' : 'text-[#8b949e] hover:text-[#c9d1d9] border-transparent'}`}
            >
              {tab.name}
            </button>
          ))}
        </Box>
        <button 
          onClick={handleCopy}
          className="text-[#8b949e] hover:text-white transition-colors"
          title="Copy code"
        >
          {copied ? (
            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          )}
        </button>
      </Box>
      <Box className="p-5 overflow-x-auto text-sm font-mono leading-relaxed relative">
        <pre className="m-0 bg-transparent p-0">
          <code>{tabs[active].code}</code>
        </pre>
      </Box>
    </Box>
  );
}
