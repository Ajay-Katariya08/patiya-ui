"use client";

import React, { forwardRef, useState } from 'react';
import { cn } from '../../utils/cn';

export type BrowserMockupTab = {
  id: string;
  title: string;
  icon?: React.ReactNode;
};

export type BrowserMockupProps = {
  variant?: 'browser' | 'terminal' | 'window';
  url?: string;
  title?: string;
  tabs?: BrowserMockupTab[];
  activeTab?: string;
  defaultActiveTab?: string;
  onTabChange?: (tabId: string) => void;
  showControls?: boolean;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  copyable?: boolean;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const BrowserMockup = forwardRef<HTMLDivElement, BrowserMockupProps>(
  (
    {
      variant = 'browser',
      url = 'https://patiya-ui.vercel.app',
      title,
      tabs,
      activeTab: controlledActiveTab,
      defaultActiveTab,
      onTabChange,
      showControls = true,
      onClose,
      onMinimize,
      onMaximize,
      copyable = true,
      className,
      headerClassName,
      bodyClassName,
      children,
      ...props
    },
    ref
  ) => {
    const [copied, setCopied] = useState(false);
    const [internalTab, setInternalTab] = useState(
      defaultActiveTab || (tabs && tabs.length > 0 ? tabs[0].id : '')
    );

    const currentTab = controlledActiveTab !== undefined ? controlledActiveTab : internalTab;

    const handleTabClick = (id: string) => {
      if (controlledActiveTab === undefined) {
        setInternalTab(id);
      }
      onTabChange?.(id);
    };

    const handleCopy = () => {
      const textToCopy = variant === 'browser' ? url : title || '';
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    const renderControls = () => (
      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] hover:brightness-90 transition-all cursor-pointer flex items-center justify-center group"
        >
          <svg className="w-2 h-2 opacity-0 group-hover:opacity-100 text-black/60 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <button
          type="button"
          onClick={onMinimize}
          aria-label="Minimize"
          className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] hover:brightness-90 transition-all cursor-pointer flex items-center justify-center group"
        >
          <svg className="w-2 h-2 opacity-0 group-hover:opacity-100 text-black/60 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
        <button
          type="button"
          onClick={onMaximize}
          aria-label="Maximize"
          className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29] hover:brightness-90 transition-all cursor-pointer flex items-center justify-center group"
        >
          <svg className="w-2 h-2 opacity-0 group-hover:opacity-100 text-black/60 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="15 3 21 3 21 9" />
            <polyline points="9 21 3 21 3 15" />
            <line x1="21" y1="3" x2="14" y2="10" />
            <line x1="3" y1="21" x2="10" y2="14" />
          </svg>
        </button>
      </div>
    );

    return (
      <div
        ref={ref}
        className={cn(
          'w-full rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] shadow-lg overflow-hidden flex flex-col transition-all',
          className
        )}
        {...props}
      >
        <div
          className={cn(
            'px-4 py-3 border-b border-[var(--patiya-color-border)] bg-[var(--patiya-color-muted)]/40 flex items-center gap-3 select-none',
            headerClassName
          )}
        >
          {showControls && renderControls()}

          {tabs && tabs.length > 0 && (
            <div className="flex items-center gap-1 overflow-x-auto custom-scrollbar max-w-sm">
              {tabs.map((tab) => {
                const isActive = tab.id === currentTab;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => handleTabClick(tab.id)}
                    className={cn(
                      'px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all truncate cursor-pointer',
                      isActive
                        ? 'bg-[var(--patiya-color-background)] text-[var(--patiya-color-foreground)] shadow-xs border border-[var(--patiya-color-border)]/60'
                        : 'text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] hover:bg-[var(--patiya-color-muted)]/60'
                    )}
                  >
                    {tab.icon}
                    <span className="truncate">{tab.title}</span>
                  </button>
                );
              })}
            </div>
          )}

          {variant === 'browser' && !tabs && (
            <div className="flex items-center gap-1 text-[var(--patiya-color-muted-foreground)] shrink-0">
              <button
                type="button"
                aria-label="Back"
                className="p-1 rounded-md hover:bg-[var(--patiya-color-muted)] transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Forward"
                className="p-1 rounded-md hover:bg-[var(--patiya-color-muted)] transition-colors opacity-50"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}

          {variant === 'browser' && (
            <div className="flex-1 min-w-0 max-w-md mx-auto">
              <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-[var(--patiya-color-background)] border border-[var(--patiya-color-border)] text-xs text-[var(--patiya-color-foreground)] shadow-2xs">
                <svg className="w-3 h-3 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
                <span className="font-mono text-[11px] truncate select-all">{url}</span>
                {copyable && (
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="ml-auto p-0.5 text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] transition-colors"
                    title={copied ? 'Copied' : 'Copy URL'}
                  >
                    {copied ? (
                      <svg className="w-3 h-3 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                      </svg>
                    )}
                  </button>
                )}
              </div>
            </div>
          )}

          {variant === 'terminal' && (
            <div className="flex-1 flex items-center justify-between text-xs font-mono">
              <span className="text-[var(--patiya-color-muted-foreground)] truncate">{title || 'bash — 80×24'}</span>
              {copyable && (
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-[11px] text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] px-2 py-0.5 rounded hover:bg-[var(--patiya-color-muted)] transition-colors"
                >
                  {copied ? 'Copied' : 'Copy'}
                </button>
              )}
            </div>
          )}

          {variant === 'window' && (
            <div className="flex-1 text-center text-xs font-semibold text-[var(--patiya-color-foreground)] truncate">
              {title}
            </div>
          )}
        </div>

        <div className={cn('flex-1 overflow-auto bg-[var(--patiya-color-card)]', bodyClassName)}>
          {children}
        </div>
      </div>
    );
  }
);

BrowserMockup.displayName = 'BrowserMockup';
