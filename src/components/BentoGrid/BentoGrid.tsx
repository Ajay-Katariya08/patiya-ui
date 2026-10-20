import React from 'react';
import { cn } from '../../utils/cn';

export type BentoGridProps = React.HTMLAttributes<HTMLDivElement> & {
  columns?: 2 | 3 | 4;
};

export const BentoGrid = React.forwardRef<HTMLDivElement, BentoGridProps>(
  ({ className, columns = 3, children, ...props }, ref) => {
    const colClasses = {
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'grid auto-rows-[22rem] gap-4 w-full',
          colClasses[columns],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
BentoGrid.displayName = 'BentoGrid';

export type BentoGridItemProps = React.HTMLAttributes<HTMLDivElement> & {
  title?: React.ReactNode;
  description?: React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  glow?: boolean;
};

export const BentoGridItem = React.forwardRef<HTMLDivElement, BentoGridItemProps>(
  (
    {
      className,
      title,
      description,
      header,
      icon,
      badge,
      glow = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)]/70 p-6 backdrop-blur-md transition-all duration-300 hover:border-[var(--patiya-color-primary)]/40 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/40',
          glow && 'before:absolute before:-inset-px before:rounded-2xl before:bg-gradient-to-r before:from-[var(--patiya-color-primary)]/20 before:to-transparent before:opacity-0 before:transition-opacity before:duration-300 group-hover:before:opacity-100',
          className
        )}
        {...props}
      >
        {header && (
          <div className="relative z-10 w-full flex-1 min-h-[140px] overflow-hidden rounded-xl border border-[var(--patiya-color-border)]/50 bg-[var(--patiya-color-background)]/50 transition-transform duration-300 group-hover:scale-[1.01]">
            {header}
          </div>
        )}
        <div className="relative z-10 flex flex-col gap-2 pt-4">
          <div className="flex items-center justify-between gap-2">
            {icon && (
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] text-[var(--patiya-color-foreground)] transition-transform duration-300 group-hover:scale-110">
                {icon}
              </div>
            )}
            {badge && <div>{badge}</div>}
          </div>
          {title && (
            <div className="text-lg font-semibold tracking-tight text-[var(--patiya-color-foreground)] transition-colors duration-200 group-hover:text-[var(--patiya-color-primary)]">
              {title}
            </div>
          )}
          {description && (
            <div className="text-xs sm:text-sm font-normal leading-relaxed text-[var(--patiya-color-muted-foreground)]">
              {description}
            </div>
          )}
          {children}
        </div>
      </div>
    );
  }
);
BentoGridItem.displayName = 'BentoGridItem';
