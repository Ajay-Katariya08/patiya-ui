import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface StatusDotProps extends React.HTMLAttributes<HTMLDivElement> {
  status?: 'online' | 'offline' | 'busy' | 'away' | 'primary' | 'secondary' | 'accent';
  ping?: boolean;
  size?: 'sm' | 'md' | 'lg';
  label?: React.ReactNode;
}

export const StatusDot = forwardRef<HTMLDivElement, StatusDotProps>(
  ({ status = 'online', ping = false, size = 'md', label, className, ...props }, ref) => {
    
    const sizeClasses = {
      sm: 'w-2 h-2',
      md: 'w-3 h-3',
      lg: 'w-4 h-4',
    };

    const statusClasses = {
      online: 'bg-[var(--patiya-color-success)]',
      offline: 'bg-[var(--patiya-color-muted)]',
      busy: 'bg-[var(--patiya-color-destructive)]',
      away: 'bg-[var(--patiya-color-warning)]',
      primary: 'bg-[var(--patiya-color-primary)]',
      secondary: 'bg-[var(--patiya-color-secondary)]',
      accent: 'bg-[var(--patiya-color-accent)]',
    };

    const dot = (
      <span className="relative flex items-center justify-center">
        {ping && (
          <span 
            className={cn(
              "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
              statusClasses[status]
            )} 
          />
        )}
        <span 
          className={cn(
            "relative inline-flex rounded-full",
            sizeClasses[size],
            statusClasses[status]
          )} 
        />
      </span>
    );

    if (label) {
      return (
        <div ref={ref} className={cn('flex items-center gap-2', className)} {...props}>
          {dot}
          <span className="text-sm font-medium text-[var(--patiya-color-foreground)]">{label}</span>
        </div>
      );
    }

    return (
      <div ref={ref} className={cn('inline-flex', className)} {...props}>
        {dot}
      </div>
    );
  }
);

StatusDot.displayName = 'StatusDot';
