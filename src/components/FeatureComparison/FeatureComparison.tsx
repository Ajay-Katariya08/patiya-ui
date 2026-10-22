import React from 'react';
import { cn } from '../../utils/cn';

export type FeatureComparisonPlan = {
  id: string;
  name: string;
  badge?: string;
  highlighted?: boolean;
};

export type FeatureComparisonItem = {
  category?: string;
  name: string;
  description?: string;
  values: Record<string, boolean | string | number>;
};

export type FeatureComparisonProps = React.HTMLAttributes<HTMLDivElement> & {
  plans: FeatureComparisonPlan[];
  features: FeatureComparisonItem[];
};

export const FeatureComparison = React.forwardRef<HTMLDivElement, FeatureComparisonProps>(
  ({ className, plans, features, ...props }, ref) => {
    let currentCategory = '';

    return (
      <div
        ref={ref}
        className={cn(
          'w-full overflow-x-auto rounded-3xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)]/80 backdrop-blur-md shadow-sm',
          className
        )}
        {...props}
      >
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)]/50">
              <th className="p-4 sm:p-5 font-semibold text-[var(--patiya-color-foreground)] w-2/5">
                Features
              </th>
              {plans.map((plan) => (
                <th
                  key={plan.id}
                  className={cn(
                    'p-4 sm:p-5 text-center font-bold text-[var(--patiya-color-foreground)]',
                    plan.highlighted && 'bg-[var(--patiya-color-primary)]/10 text-[var(--patiya-color-primary)]'
                  )}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span>{plan.name}</span>
                    {plan.badge && (
                      <span className="text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-[var(--patiya-color-primary)] text-white">
                        {plan.badge}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((item, idx) => {
              const showCatHeader = item.category && item.category !== currentCategory;
              if (showCatHeader) currentCategory = item.category!;

              return (
                <React.Fragment key={idx}>
                  {showCatHeader && (
                    <tr className="border-b border-[var(--patiya-color-border)] bg-[var(--patiya-color-muted)]/20">
                      <td
                        colSpan={plans.length + 1}
                        className="px-4 sm:px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-[var(--patiya-color-primary)]"
                      >
                        {item.category}
                      </td>
                    </tr>
                  )}
                  <tr className="border-b border-[var(--patiya-color-border)]/50 transition-colors hover:bg-[var(--patiya-color-card)]">
                    <td className="p-4 sm:p-5">
                      <div className="font-medium text-[var(--patiya-color-foreground)]">
                        {item.name}
                      </div>
                      {item.description && (
                        <div className="text-xs text-[var(--patiya-color-muted-foreground)] mt-0.5">
                          {item.description}
                        </div>
                      )}
                    </td>
                    {plans.map((plan) => {
                      const val = item.values[plan.id];
                      return (
                        <td
                          key={plan.id}
                          className={cn(
                            'p-4 sm:p-5 text-center',
                            plan.highlighted && 'bg-[var(--patiya-color-primary)]/5 font-semibold'
                          )}
                        >
                          {typeof val === 'boolean' ? (
                            val ? (
                              <div className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[var(--patiya-color-primary)]/15 text-[var(--patiya-color-primary)]">
                                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                            ) : (
                              <span className="text-[var(--patiya-color-muted-foreground)]/40 font-mono text-xs">
                                —
                              </span>
                            )
                          ) : (
                            <span className="font-mono text-xs text-[var(--patiya-color-foreground)]">
                              {val}
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
);
FeatureComparison.displayName = 'FeatureComparison';
