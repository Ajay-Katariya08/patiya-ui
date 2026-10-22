import React from 'react';
import { cn } from '../../utils/cn';
import { Badge } from '../Badge/Badge';

export type UsageMeterProps = React.HTMLAttributes<HTMLDivElement> & {
  label: string;
  used: number;
  limit: number;
  unit?: string;
  warningThreshold?: number;
  dangerThreshold?: number;
  showPercent?: boolean;
  action?: React.ReactNode;
};

export const UsageMeter = React.forwardRef<HTMLDivElement, UsageMeterProps>(
  (
    {
      className,
      label,
      used,
      limit,
      unit = '',
      warningThreshold = 75,
      dangerThreshold = 90,
      showPercent = true,
      action,
      ...props
    },
    ref
  ) => {
    const percent = Math.min(100, Math.max(0, Math.round((used / limit) * 100)));
    const isDanger = percent >= dangerThreshold;
    const isWarning = percent >= warningThreshold && !isDanger;

    const barColor = isDanger
      ? 'bg-[var(--patiya-color-destructive,#ef4444)]'
      : isWarning
      ? 'bg-[var(--patiya-color-warning,#f59e0b)]'
      : 'bg-[var(--patiya-color-primary)]';

    const badgeVariant = isDanger
      ? 'soft'
      : isWarning
      ? 'outline'
      : 'soft';

    const badgeColor = isDanger ? 'destructive' : isWarning ? 'warning' : 'primary';

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col gap-3 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)]/70 p-5 backdrop-blur-md transition-all duration-200',
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-[var(--patiya-color-foreground)]">
              {label}
            </span>
            {isDanger && (
              <Badge size="sm" variant={badgeVariant as any} color={badgeColor as any}>
                Limit Reached
              </Badge>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>

        <div className="relative h-2 w-full overflow-hidden rounded-full bg-[var(--patiya-color-muted)]/50">
          <div
            className={cn('h-full transition-all duration-500 rounded-full', barColor)}
            style={{ width: `${percent}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-xs text-[var(--patiya-color-muted-foreground)]">
          <span>
            <strong className="text-[var(--patiya-color-foreground)] font-semibold">
              {used.toLocaleString()}
            </strong>{' '}
            / {limit.toLocaleString()} {unit}
          </span>
          {showPercent && (
            <span className="font-mono font-medium">
              {percent}% used
            </span>
          )}
        </div>
      </div>
    );
  }
);
UsageMeter.displayName = 'UsageMeter';
