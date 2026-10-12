import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { PatiyaColor, PatiyaVariant, PatiyaSize, PatiyaRadius } from '../../types/common';

export interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: PatiyaColor;
  variant?: PatiyaVariant;
  size?: PatiyaSize;
  radius?: PatiyaRadius;
  onClose?: () => void;
  disabled?: boolean;
}

export const Chip = forwardRef<HTMLDivElement, ChipProps>(
  ({
    color = 'primary',
    variant = 'soft',
    size = 'md',
    radius = 'full',
    onClose,
    disabled = false,
    className,
    children,
    ...props
  }, ref) => {
    
    const sizeClasses = {
      xs: 'h-5 px-1.5 text-[10px]',
      sm: 'h-6 px-2 text-xs',
      md: 'h-7 px-3 text-sm',
      lg: 'h-8 px-4 text-sm',
      xl: 'h-10 px-5 text-base',
    };

    const radiusClasses = {
      none: 'rounded-none',
      sm: 'rounded-[var(--patiya-radius-sm)]',
      md: 'rounded-[var(--patiya-radius-md)]',
      lg: 'rounded-[var(--patiya-radius-lg)]',
      full: 'rounded-full',
    };

    const getVariantClasses = () => {
      const solidColors = {
        primary: 'bg-[var(--patiya-color-primary)] text-[var(--patiya-color-primary-foreground)]',
        secondary: 'bg-[var(--patiya-color-secondary)] text-[var(--patiya-color-primary-foreground)]',
        accent: 'bg-[var(--patiya-color-accent)] text-[var(--patiya-color-primary-foreground)]',
        destructive: 'bg-[var(--patiya-color-destructive)] text-[var(--patiya-color-primary-foreground)]',
        success: 'bg-[var(--patiya-color-success)] text-[var(--patiya-color-primary-foreground)]',
        warning: 'bg-[var(--patiya-color-warning)] text-[var(--patiya-color-primary-foreground)]',
        info: 'bg-[var(--patiya-color-info)] text-[var(--patiya-color-primary-foreground)]',
        muted: 'bg-[var(--patiya-color-muted)] text-(--patiya-color-muted-foreground)',
      };

      const softColors = {
        primary: 'bg-[var(--patiya-color-primary)]/10 text-[var(--patiya-color-primary)] border border-transparent',
        secondary: 'bg-[var(--patiya-color-secondary)]/10 text-[var(--patiya-color-secondary)] border border-transparent',
        accent: 'bg-[var(--patiya-color-accent)]/10 text-[var(--patiya-color-accent)] border border-transparent',
        destructive: 'bg-[var(--patiya-color-destructive)]/10 text-[var(--patiya-color-destructive)] border border-transparent',
        success: 'bg-[var(--patiya-color-success)]/10 text-[var(--patiya-color-success)] border border-transparent',
        warning: 'bg-[var(--patiya-color-warning)]/10 text-[var(--patiya-color-warning)] border border-transparent',
        info: 'bg-[var(--patiya-color-info)]/10 text-[var(--patiya-color-info)] border border-transparent',
        muted: 'bg-[var(--patiya-color-muted)] text-(--patiya-color-muted-foreground) border border-transparent',
      };

      const outlineColors = {
        primary: 'border border-[var(--patiya-color-primary)] text-[var(--patiya-color-primary)]',
        secondary: 'border border-[var(--patiya-color-secondary)] text-[var(--patiya-color-secondary)]',
        accent: 'border border-[var(--patiya-color-accent)] text-[var(--patiya-color-accent)]',
        destructive: 'border border-[var(--patiya-color-destructive)] text-[var(--patiya-color-destructive)]',
        success: 'border border-[var(--patiya-color-success)] text-[var(--patiya-color-success)]',
        warning: 'border border-[var(--patiya-color-warning)] text-[var(--patiya-color-warning)]',
        info: 'border border-[var(--patiya-color-info)] text-[var(--patiya-color-info)]',
        muted: 'border border-[var(--patiya-color-border)] text-(--patiya-color-muted-foreground)',
      };

      switch (variant) {
        case 'solid': return solidColors[color];
        case 'soft': return softColors[color];
        case 'outline': return outlineColors[color];
        default: return softColors[color];
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--patiya-color-ring)] focus:ring-offset-2",
          disabled && "opacity-50 cursor-not-allowed",
          sizeClasses[size],
          radiusClasses[radius],
          getVariantClasses(),
          className
        )}
        {...props}
      >
        {children}
        {onClose && (
          <button
            type="button"
            onClick={(e) => {
              if (disabled) return;
              e.stopPropagation();
              onClose();
            }}
            disabled={disabled}
            className={cn(
              "ml-1 flex items-center justify-center rounded-full hover:bg-black/10 dark:hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--patiya-color-ring)]",
              size === 'xs' ? 'h-3 w-3' : size === 'sm' ? 'h-3.5 w-3.5' : size === 'md' ? 'h-4 w-4' : 'h-5 w-5'
            )}
            aria-label="Remove"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-2/3 h-2/3">
              <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
            </svg>
          </button>
        )}
      </div>
    );
  }
);

Chip.displayName = "Chip";
