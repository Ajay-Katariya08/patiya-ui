import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'outline' | 'soft';
}

export const Kbd = forwardRef<HTMLElement, KbdProps>(
  ({ size = 'md', variant = 'soft', className, children, ...props }, ref) => {
    const sizeClasses = {
      sm: 'px-1 py-0.5 text-[10px]',
      md: 'px-1.5 py-0.5 text-xs',
      lg: 'px-2 py-1 text-sm',
    };
    
    const variantClasses = {
      solid: 'bg-[var(--patiya-color-muted-foreground)] text-[var(--patiya-color-background)] border-transparent',
      outline: 'bg-transparent border border-[var(--patiya-color-border)] text-[var(--patiya-color-foreground)]',
      soft: 'bg-[var(--patiya-color-muted)] border border-[var(--patiya-color-border)] text-[var(--patiya-color-foreground)]',
    };

    return (
      <kbd
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-mono font-medium rounded shadow-sm',
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {children}
      </kbd>
    );
  }
);

Kbd.displayName = 'Kbd';
