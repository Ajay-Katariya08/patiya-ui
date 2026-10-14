"use client";
import React, { forwardRef, createContext, useContext } from 'react';
import { cn } from '../../utils/cn';

type StatContextType = {
  size?: 'sm' | 'md' | 'lg';
};

const StatContext = createContext<StatContextType>({ size: 'md' });

export type StatProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: 'default' | 'card' | 'bordered';
  size?: 'sm' | 'md' | 'lg';
};

export const Stat = forwardRef<HTMLDivElement, StatProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    const variantStyles = {
      default: 'p-1',
      card: 'rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] p-5 text-[var(--patiya-color-foreground)] shadow-xs transition-shadow hover:shadow-sm',
      bordered: 'rounded-2xl border border-[var(--patiya-color-border)] p-5 bg-transparent',
    };

    return (
      <StatContext.Provider value={{ size }}>
        <div
          ref={ref}
          className={cn('flex flex-col space-y-1.5', variantStyles[variant], className)}
          {...props}
        >
          {children}
        </div>
      </StatContext.Provider>
    );
  }
);
Stat.displayName = 'Stat';

export type StatLabelProps = React.HTMLAttributes<HTMLDivElement> & {
  icon?: React.ReactNode;
};

export const StatLabel = forwardRef<HTMLDivElement, StatLabelProps>(
  ({ className, icon, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-[var(--patiya-color-muted-foreground)]',
        className
      )}
      {...props}
    >
      {icon && <span className="shrink-0 text-current">{icon}</span>}
      <span>{children}</span>
    </div>
  )
);
StatLabel.displayName = 'StatLabel';

export type StatValueProps = React.HTMLAttributes<HTMLDivElement> & {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
};

export const StatValue = forwardRef<HTMLDivElement, StatValueProps>(
  ({ className, prefix, suffix, children, ...props }, ref) => {
    const { size } = useContext(StatContext);

    const sizeStyles = {
      sm: 'text-2xl font-bold tracking-tight',
      md: 'text-3xl font-bold tracking-tight',
      lg: 'text-4xl font-extrabold tracking-tight',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-baseline gap-1 font-sans text-[var(--patiya-color-foreground)]',
          sizeStyles[size || 'md'],
          className
        )}
        {...props}
      >
        {prefix && <span className="text-sm font-semibold opacity-70">{prefix}</span>}
        <span>{children}</span>
        {suffix && <span className="text-sm font-semibold opacity-70">{suffix}</span>}
      </div>
    );
  }
);
StatValue.displayName = 'StatValue';

export type StatTrendProps = React.HTMLAttributes<HTMLSpanElement> & {
  direction?: 'up' | 'down' | 'neutral';
  variant?: 'badge' | 'text';
};

export const StatTrend = forwardRef<HTMLSpanElement, StatTrendProps>(
  ({ className, direction = 'neutral', variant = 'badge', children, ...props }, ref) => {
    const isBadge = variant === 'badge';

    const directionConfig = {
      up: {
        badge: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
        text: 'text-emerald-600 dark:text-emerald-400',
        icon: (
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        ),
      },
      down: {
        badge: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20',
        text: 'text-rose-600 dark:text-rose-400',
        icon: (
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        ),
      },
      neutral: {
        badge: 'bg-[var(--patiya-color-muted)] text-[var(--patiya-color-muted-foreground)] border border-[var(--patiya-color-border)]',
        text: 'text-[var(--patiya-color-muted-foreground)]',
        icon: (
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        ),
      },
    };

    const config = directionConfig[direction];

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1 font-semibold text-xs',
          isBadge ? cn('px-2 py-0.5 rounded-full', config.badge) : config.text,
          className
        )}
        {...props}
      >
        {config.icon}
        {children}
      </span>
    );
  }
);
StatTrend.displayName = 'StatTrend';

export type StatHelpTextProps = React.HTMLAttributes<HTMLParagraphElement>;

export const StatHelpText = forwardRef<HTMLParagraphElement, StatHelpTextProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-xs text-[var(--patiya-color-muted-foreground)] flex items-center gap-1.5 mt-0.5', className)}
      {...props}
    />
  )
);
StatHelpText.displayName = 'StatHelpText';

export type StatGroupProps = React.HTMLAttributes<HTMLDivElement> & {
  columns?: 1 | 2 | 3 | 4;
};

export const StatGroup = forwardRef<HTMLDivElement, StatGroupProps>(
  ({ className, columns = 3, ...props }, ref) => {
    const colStyles = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    };

    return (
      <div
        ref={ref}
        className={cn('grid gap-4 sm:gap-6 w-full', colStyles[columns], className)}
        {...props}
      />
    );
  }
);
StatGroup.displayName = 'StatGroup';
