import React from 'react';
import { cn } from '../../utils/cn';
import { Box } from '../Layout/Box';
import { PatiyaColor } from '../../types/common';

export interface PromptSuggestionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  variant?: 'card' | 'chip';
  color?: PatiyaColor;
}

export const PromptSuggestion = React.forwardRef<HTMLButtonElement, PromptSuggestionProps>(
  ({ className, title, description, icon, variant = 'card', color = 'primary', ...props }, ref) => {
    
    if (variant === 'chip') {
      return (
        <button
          ref={ref}
          className={cn(
            "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all",
            "border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] hover:bg-[var(--patiya-color-muted)]/50",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--patiya-color-ring)]",
            className
          )}
          {...props}
        >
          {icon && <span className="text-[var(--patiya-color-muted-foreground)] flex-shrink-0">{icon}</span>}
          <span className="text-[var(--patiya-color-foreground)]">{title}</span>
        </button>
      );
    }

    return (
      <button
        ref={ref}
        className={cn(
          "flex flex-col text-left p-4 rounded-xl transition-all border border-[var(--patiya-color-border)]",
          "bg-[var(--patiya-color-background)] hover:border-[var(--patiya-color-primary)] hover:bg-[var(--patiya-color-muted)]/20",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--patiya-color-ring)]",
          className
        )}
        {...props}
      >
        <Box className="flex items-center gap-2 mb-1.5">
          {icon && (
            <span className={cn(
              "p-1.5 rounded-md flex-shrink-0",
              "bg-[var(--patiya-color-primary)]/10 text-[var(--patiya-color-primary)]"
            )}>
              {icon}
            </span>
          )}
          <span className="font-semibold text-sm text-[var(--patiya-color-foreground)] line-clamp-1">{title}</span>
        </Box>
        {description && (
          <span className="text-xs text-[var(--patiya-color-muted-foreground)] line-clamp-2 mt-0.5">
            {description}
          </span>
        )}
      </button>
    );
  }
);

PromptSuggestion.displayName = 'PromptSuggestion';
