import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { PatiyaSize, PatiyaVariant, PatiyaColor, PatiyaRadius } from '../../types/common';
import { Spinner } from '../Spinner/Spinner';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: PatiyaVariant;
  color?: PatiyaColor;
  size?: PatiyaSize;
  radius?: PatiyaRadius;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'solid', 
    color = 'primary', 
    size = 'md', 
    radius = 'md',
    loading = false,
    leftIcon,
    rightIcon,
    fullWidth = false,
    disabled = false,
    className, 
    children, 
    ...props 
  }, ref) => {
    
    const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--patiya-color-ring)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-[var(--patiya-color-background)]';
    
    const sizeClasses = {
      xs: 'h-7 px-2 text-xs',
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 text-sm',
      lg: 'h-12 px-6 text-base',
      xl: 'h-14 px-8 text-lg',
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
        primary: 'bg-[var(--patiya-color-primary)] text-[var(--patiya-color-primary-foreground)] hover:bg-[var(--patiya-color-primary-hover)] active:bg-[var(--patiya-color-primary-active)]',
        secondary: 'bg-[var(--patiya-color-secondary)] text-[var(--patiya-color-primary-foreground)] hover:opacity-90',
        accent: 'bg-[var(--patiya-color-accent)] text-[var(--patiya-color-primary-foreground)] hover:opacity-90',
        destructive: 'bg-[var(--patiya-color-destructive)] text-[var(--patiya-color-primary-foreground)] hover:opacity-90',
        success: 'bg-[var(--patiya-color-success)] text-[var(--patiya-color-primary-foreground)] hover:opacity-90',
        warning: 'bg-[var(--patiya-color-warning)] text-[var(--patiya-color-primary-foreground)] hover:opacity-90',
        info: 'bg-[var(--patiya-color-info)] text-[var(--patiya-color-primary-foreground)] hover:opacity-90',
        muted: 'bg-[var(--patiya-color-muted)] text-(--patiya-color-muted-foreground) hover:opacity-90',
      };

      const outlineColors = {
        primary: 'border border-[var(--patiya-color-primary)] text-[var(--patiya-color-primary)] hover:bg-[var(--patiya-color-primary)]/10',
        secondary: 'border border-[var(--patiya-color-secondary)] text-[var(--patiya-color-secondary)] hover:bg-[var(--patiya-color-secondary)]/10',
        accent: 'border border-[var(--patiya-color-accent)] text-[var(--patiya-color-accent)] hover:bg-[var(--patiya-color-accent)]/10',
        destructive: 'border border-[var(--patiya-color-destructive)] text-[var(--patiya-color-destructive)] hover:bg-[var(--patiya-color-destructive)]/10',
        success: 'border border-[var(--patiya-color-success)] text-[var(--patiya-color-success)] hover:bg-[var(--patiya-color-success)]/10',
        warning: 'border border-[var(--patiya-color-warning)] text-[var(--patiya-color-warning)] hover:bg-[var(--patiya-color-warning)]/10',
        info: 'border border-[var(--patiya-color-info)] text-[var(--patiya-color-info)] hover:bg-[var(--patiya-color-info)]/10',
        muted: 'border border-[var(--patiya-color-muted-foreground)] text-(--patiya-color-muted-foreground) hover:bg-[var(--patiya-color-muted)]/10',
      };

      const softColors = {
        primary: 'bg-[var(--patiya-color-primary)]/10 text-[var(--patiya-color-primary)] hover:bg-[var(--patiya-color-primary)]/20',
        secondary: 'bg-[var(--patiya-color-secondary)]/10 text-[var(--patiya-color-secondary)] hover:bg-[var(--patiya-color-secondary)]/20',
        accent: 'bg-[var(--patiya-color-accent)]/10 text-[var(--patiya-color-accent)] hover:bg-[var(--patiya-color-accent)]/20',
        destructive: 'bg-[var(--patiya-color-destructive)]/10 text-[var(--patiya-color-destructive)] hover:bg-[var(--patiya-color-destructive)]/20',
        success: 'bg-[var(--patiya-color-success)]/10 text-[var(--patiya-color-success)] hover:bg-[var(--patiya-color-success)]/20',
        warning: 'bg-[var(--patiya-color-warning)]/10 text-[var(--patiya-color-warning)] hover:bg-[var(--patiya-color-warning)]/20',
        info: 'bg-[var(--patiya-color-info)]/10 text-[var(--patiya-color-info)] hover:bg-[var(--patiya-color-info)]/20',
        muted: 'bg-[var(--patiya-color-muted)] text-(--patiya-color-muted-foreground) hover:bg-[var(--patiya-color-muted)]/80',
      };

      const ghostColors = {
        primary: 'hover:bg-[var(--patiya-color-primary)]/10 text-[var(--patiya-color-primary)]',
        secondary: 'hover:bg-[var(--patiya-color-secondary)]/10 text-[var(--patiya-color-secondary)]',
        accent: 'hover:bg-[var(--patiya-color-accent)]/10 text-[var(--patiya-color-accent)]',
        destructive: 'hover:bg-[var(--patiya-color-destructive)]/10 text-[var(--patiya-color-destructive)]',
        success: 'hover:bg-[var(--patiya-color-success)]/10 text-[var(--patiya-color-success)]',
        warning: 'hover:bg-[var(--patiya-color-warning)]/10 text-[var(--patiya-color-warning)]',
        info: 'hover:bg-[var(--patiya-color-info)]/10 text-[var(--patiya-color-info)]',
        muted: 'hover:bg-[var(--patiya-color-muted)]/50 text-(--patiya-color-muted-foreground)',
      };

      const linkColors = {
        primary: 'text-[var(--patiya-color-primary)] underline-offset-4 hover:underline',
        secondary: 'text-[var(--patiya-color-secondary)] underline-offset-4 hover:underline',
        accent: 'text-[var(--patiya-color-accent)] underline-offset-4 hover:underline',
        destructive: 'text-[var(--patiya-color-destructive)] underline-offset-4 hover:underline',
        success: 'text-[var(--patiya-color-success)] underline-offset-4 hover:underline',
        warning: 'text-[var(--patiya-color-warning)] underline-offset-4 hover:underline',
        info: 'text-[var(--patiya-color-info)] underline-offset-4 hover:underline',
        muted: 'text-(--patiya-color-muted-foreground) underline-offset-4 hover:underline',
      };

      switch (variant) {
        case 'solid': return solidColors[color];
        case 'outline': return outlineColors[color];
        case 'soft': return softColors[color];
        case 'ghost': return ghostColors[color];
        case 'link': return linkColors[color];
        default: return '';
      }
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          sizeClasses[size],
          radiusClasses[radius],
          getVariantClasses(),
          fullWidth && 'w-full',
          className
        )}
        disabled={disabled || loading}
        aria-disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading && <Spinner size={size === 'xs' || size === 'sm' ? 'xs' : 'sm'} className="mr-2" color="current" />}
        {!loading && leftIcon && <span className="mr-2 inline-flex">{leftIcon}</span>}
        {children}
        {!loading && rightIcon && <span className="ml-2 inline-flex">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
