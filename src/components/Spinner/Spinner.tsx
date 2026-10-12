import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { PatiyaSize, PatiyaColor } from '../../types/common';

export interface SpinnerProps extends React.SVGProps<SVGSVGElement> {
  size?: PatiyaSize;
  color?: PatiyaColor | 'current';
  label?: string;
}

export const Spinner = forwardRef<SVGSVGElement, SpinnerProps>(
  ({ size = 'md', color = 'primary', label = 'Loading...', className, ...props }, ref) => {
    
    const sizeClasses = {
      xs: 'w-3 h-3',
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
      xl: 'w-8 h-8',
    };

    const colorClasses = {
      primary: 'text-[var(--patiya-color-primary)]',
      secondary: 'text-[var(--patiya-color-secondary)]',
      accent: 'text-[var(--patiya-color-accent)]',
      destructive: 'text-[var(--patiya-color-destructive)]',
      success: 'text-[var(--patiya-color-success)]',
      warning: 'text-[var(--patiya-color-warning)]',
      info: 'text-[var(--patiya-color-info)]',
      muted: 'text-(--patiya-color-muted-foreground)',
      current: 'text-current',
    };

    return (
      <svg
        ref={ref}
        className={cn(
          'animate-spin',
          sizeClasses[size],
          colorClasses[color as keyof typeof colorClasses],
          className
        )}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-label={label}
        {...props}
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );
  }
);

Spinner.displayName = 'Spinner';
