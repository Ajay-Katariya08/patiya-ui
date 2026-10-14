"use client";
import React, { forwardRef, useState } from 'react';
import { cn } from '../../utils/cn';

export type SourceCitationProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  index?: number | string;
  title: string;
  url: string;
  snippet?: string;
  favicon?: string | React.ReactNode;
  domain?: string;
  variant?: 'badge' | 'chip' | 'card';
};

export const SourceCitation = forwardRef<HTMLAnchorElement, SourceCitationProps>(
  (
    {
      className,
      index,
      title,
      url,
      snippet,
      favicon,
      domain,
      variant = 'badge',
      ...props
    },
    ref
  ) => {
    const [hovered, setHovered] = useState(false);

    const resolvedDomain =
      domain ||
      (() => {
        try {
          return new URL(url).hostname.replace('www.', '');
        } catch {
          return '';
        }
      })();

    if (variant === 'badge') {
      return (
        <span className="relative inline-block align-baseline mx-0.5">
          <a
            ref={ref}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={cn(
              'inline-flex items-center justify-center min-w-4 h-4 px-1 rounded-md text-[10px] font-mono font-semibold transition-all',
              'bg-[var(--patiya-color-muted)] text-[var(--patiya-color-muted-foreground)] hover:bg-[var(--patiya-color-primary)] hover:text-[var(--patiya-color-primary-foreground)]',
              'border border-[var(--patiya-color-border)] hover:border-[var(--patiya-color-primary)]',
              className
            )}
            {...props}
          >
            {index ?? '•'}
          </a>

          {hovered && (
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-64 p-3 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] text-[var(--patiya-color-foreground)] shadow-lg animate-in fade-in-0 zoom-in-95 pointer-events-none block text-left">
              <span className="flex items-center gap-1.5 mb-1 text-[11px] text-[var(--patiya-color-muted-foreground)]">
                {favicon && typeof favicon === 'string' ? (
                  <img src={favicon} alt="" className="w-3.5 h-3.5 rounded-xs" />
                ) : (
                  favicon
                )}
                <span className="truncate font-medium">{resolvedDomain}</span>
              </span>
              <span className="font-semibold text-xs leading-snug line-clamp-1 block text-[var(--patiya-color-foreground)]">
                {title}
              </span>
              {snippet && (
                <span className="text-[11px] text-[var(--patiya-color-muted-foreground)] mt-1 line-clamp-2 leading-relaxed block font-normal">
                  {snippet}
                </span>
              )}
            </span>
          )}
        </span>
      );
    }

    if (variant === 'chip') {
      return (
        <a
          ref={ref}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium transition-all',
            'border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] hover:bg-[var(--patiya-color-muted)]/50',
            'text-[var(--patiya-color-foreground)] hover:border-[var(--patiya-color-primary)]/50 shadow-2xs',
            className
          )}
          {...props}
        >
          {index !== undefined && (
            <span className="w-4 h-4 rounded-full bg-[var(--patiya-color-muted)] flex items-center justify-center text-[10px] font-mono font-bold text-[var(--patiya-color-muted-foreground)]">
              {index}
            </span>
          )}
          {favicon && typeof favicon === 'string' ? (
            <img src={favicon} alt="" className="w-3.5 h-3.5 rounded-xs shrink-0" />
          ) : (
            favicon
          )}
          <span className="truncate max-w-[140px]">{title}</span>
          <svg className="w-3 h-3 text-[var(--patiya-color-muted-foreground)] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </a>
      );
    }

    return (
      <a
        ref={ref}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'group flex flex-col p-3 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] transition-all',
          'hover:border-[var(--patiya-color-primary)] hover:shadow-xs text-left',
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-1.5 text-xs text-[var(--patiya-color-muted-foreground)] truncate">
            {favicon && typeof favicon === 'string' ? (
              <img src={favicon} alt="" className="w-3.5 h-3.5 rounded-xs shrink-0" />
            ) : (
              favicon
            )}
            <span className="font-medium truncate">{resolvedDomain}</span>
          </div>
          {index !== undefined && (
            <span className="w-4 h-4 rounded-md bg-[var(--patiya-color-muted)] flex items-center justify-center text-[10px] font-mono font-bold text-[var(--patiya-color-muted-foreground)] shrink-0">
              {index}
            </span>
          )}
        </div>
        <p className="font-semibold text-xs line-clamp-1 text-[var(--patiya-color-foreground)] group-hover:text-[var(--patiya-color-primary)] transition-colors">
          {title}
        </p>
        {snippet && (
          <p className="text-[11px] text-[var(--patiya-color-muted-foreground)] mt-1 line-clamp-2 leading-relaxed">
            {snippet}
          </p>
        )}
      </a>
    );
  }
);
SourceCitation.displayName = 'SourceCitation';

export type SourceCitationListProps = React.HTMLAttributes<HTMLDivElement> & {
  layout?: 'row' | 'grid';
};

export const SourceCitationList = forwardRef<HTMLDivElement, SourceCitationListProps>(
  ({ className, layout = 'row', ...props }, ref) => {
    const layoutStyles = {
      row: 'flex flex-wrap items-center gap-2',
      grid: 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3',
    };

    return (
      <div
        ref={ref}
        className={cn('w-full my-2', layoutStyles[layout], className)}
        {...props}
      />
    );
  }
);
SourceCitationList.displayName = 'SourceCitationList';
