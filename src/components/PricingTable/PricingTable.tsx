import React from 'react';
import { cn } from '../../utils/cn';
import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';

export type BillingInterval = 'monthly' | 'yearly';

export type BillingToggleProps = {
  interval: BillingInterval;
  onChange: (interval: BillingInterval) => void;
  yearlyDiscount?: string;
  className?: string;
};

export const BillingToggle = ({
  interval,
  onChange,
  yearlyDiscount = 'Save 20%',
  className,
}: BillingToggleProps) => {
  return (
    <div className={cn('inline-flex items-center gap-1 rounded-full border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)]/70 p-1 backdrop-blur-md', className)}>
      <button
        type="button"
        onClick={() => onChange('monthly')}
        className={cn(
          'rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer',
          interval === 'monthly'
            ? 'bg-[var(--patiya-color-primary)] text-white shadow-sm'
            : 'text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)]'
        )}
      >
        Monthly
      </button>
      <button
        type="button"
        onClick={() => onChange('yearly')}
        className={cn(
          'flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer',
          interval === 'yearly'
            ? 'bg-[var(--patiya-color-primary)] text-white shadow-sm'
            : 'text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)]'
        )}
      >
        <span>Yearly</span>
        {yearlyDiscount && (
          <span className={cn(
            'rounded-full px-1.5 py-0.5 text-[10px] font-bold tracking-tight',
            interval === 'yearly'
              ? 'bg-white/20 text-white'
              : 'bg-[var(--patiya-color-primary)]/15 text-[var(--patiya-color-primary)]'
          )}>
            {yearlyDiscount}
          </span>
        )}
      </button>
    </div>
  );
};

export type PricingFeature = {
  text: string;
  included?: boolean;
  tooltip?: string;
};

export type PricingCardProps = React.HTMLAttributes<HTMLDivElement> & {
  title: string;
  description?: string;
  price: string | number;
  period?: string;
  badge?: string;
  popular?: boolean;
  features?: (string | PricingFeature)[];
  buttonText?: string;
  buttonVariant?: 'solid' | 'outline' | 'soft';
  onAction?: () => void;
  glow?: boolean;
};

export const PricingCard = React.forwardRef<HTMLDivElement, PricingCardProps>(
  (
    {
      className,
      title,
      description,
      price,
      period = '/mo',
      badge,
      popular = false,
      features = [],
      buttonText = 'Get Started',
      buttonVariant = popular ? 'solid' : 'outline',
      onAction,
      glow = popular,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)]/80 p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 hover:shadow-2xl hover:shadow-black/5 dark:hover:shadow-black/40',
          popular && 'border-[var(--patiya-color-primary)]/60 bg-[var(--patiya-color-card)] shadow-lg shadow-[var(--patiya-color-primary)]/5',
          glow && 'before:pointer-events-none before:absolute before:-inset-px before:rounded-3xl before:bg-gradient-to-b before:from-[var(--patiya-color-primary)]/30 before:to-transparent before:opacity-100',
          className
        )}
        {...props}
      >
        {popular && (
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
            <Badge variant="solid" color="primary" size="sm" className="shadow-md font-semibold tracking-wide uppercase text-[10px] px-3">
              {badge || 'Most Popular'}
            </Badge>
          </div>
        )}

        <div className="relative z-10 flex flex-col gap-4">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-xl font-bold tracking-tight text-[var(--patiya-color-foreground)]">
              {title}
            </h3>
            {badge && !popular && (
              <Badge variant="outline" size="sm">{badge}</Badge>
            )}
          </div>

          {description && (
            <p className="text-xs sm:text-sm text-[var(--patiya-color-muted-foreground)] leading-relaxed min-h-[40px]">
              {description}
            </p>
          )}

          <div className="flex items-baseline gap-1 pt-2 pb-4 border-b border-[var(--patiya-color-border)]/60">
            <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--patiya-color-foreground)]">
              {typeof price === 'number' ? `$${price}` : price}
            </span>
            {period && (
              <span className="text-xs sm:text-sm font-medium text-[var(--patiya-color-muted-foreground)]">
                {period}
              </span>
            )}
          </div>

          {features.length > 0 && (
            <ul className="space-y-3 py-2">
              {features.map((feature, i) => {
                const isObj = typeof feature === 'object';
                const text = isObj ? feature.text : feature;
                const included = isObj ? feature.included !== false : true;

                return (
                  <li key={i} className="flex items-center gap-2.5 text-xs sm:text-sm">
                    {included ? (
                      <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[var(--patiya-color-primary)]/15 text-[var(--patiya-color-primary)]">
                        <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    ) : (
                      <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[var(--patiya-color-muted)]/50 text-[var(--patiya-color-muted-foreground)] opacity-50">
                        <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                    )}
                    <span className={cn(
                      'text-[var(--patiya-color-foreground)]',
                      !included && 'text-[var(--patiya-color-muted-foreground)]/60 line-through'
                    )}>
                      {text}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}

          {children}
        </div>

        <div className="relative z-10 pt-6">
          <Button
            variant={buttonVariant as any}
            color={popular ? 'primary' : 'secondary'}
            onClick={onAction}
            className="w-full h-11 rounded-xl text-sm font-semibold transition-all duration-200"
          >
            {buttonText}
          </Button>
        </div>
      </div>
    );
  }
);
PricingCard.displayName = 'PricingCard';

export type PricingTableProps = React.HTMLAttributes<HTMLDivElement> & {
  columns?: 2 | 3 | 4;
};

export const PricingTable = React.forwardRef<HTMLDivElement, PricingTableProps>(
  ({ className, columns = 3, children, ...props }, ref) => {
    const colClasses = {
      2: 'grid-cols-1 md:grid-cols-2 max-w-4xl',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl',
      4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'grid gap-6 w-full mx-auto items-stretch',
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
PricingTable.displayName = 'PricingTable';
