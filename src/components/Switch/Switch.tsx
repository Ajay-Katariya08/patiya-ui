import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { PatiyaSize, PatiyaColor } from '../../types/common';

export type SwitchVariant = 'solid' | 'outline' | 'soft';

export type SwitchProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  size?: PatiyaSize;
  inputSize?: PatiyaSize;
  color?: PatiyaColor;
  variant?: SwitchVariant;
};

const sizeClasses: Record<PatiyaSize, string> = {
  xs: 'w-7 h-4 after:w-3 after:h-3',
  sm: 'w-8 h-4 after:w-3 after:h-3',
  md: 'w-11 h-6 after:w-5 after:h-5',
  lg: 'w-14 h-7 after:w-6 after:h-6',
  xl: 'w-16 h-8 after:w-7 after:h-7',
};

const solidColorClasses: Record<PatiyaColor, string> = {
  primary: 'peer-checked:bg-[var(--patiya-color-primary)] peer-focus:ring-[var(--patiya-color-primary)]/20',
  secondary: 'peer-checked:bg-[var(--patiya-color-secondary)] peer-focus:ring-[var(--patiya-color-secondary)]/20',
  accent: 'peer-checked:bg-[var(--patiya-color-accent)] peer-focus:ring-[var(--patiya-color-accent)]/20',
  destructive: 'peer-checked:bg-[var(--patiya-color-destructive)] peer-focus:ring-[var(--patiya-color-destructive)]/20',
  success: 'peer-checked:bg-[var(--patiya-color-success)] peer-focus:ring-[var(--patiya-color-success)]/20',
  warning: 'peer-checked:bg-[var(--patiya-color-warning)] peer-focus:ring-[var(--patiya-color-warning)]/20',
  info: 'peer-checked:bg-[var(--patiya-color-info)] peer-focus:ring-[var(--patiya-color-info)]/20',
  muted: 'peer-checked:bg-[var(--patiya-color-muted-foreground)] peer-focus:ring-[var(--patiya-color-muted)]/20',
};

const softColorClasses: Record<PatiyaColor, string> = {
  primary: 'peer-checked:bg-[var(--patiya-color-primary)]/25 peer-checked:after:bg-[var(--patiya-color-primary)] peer-focus:ring-[var(--patiya-color-primary)]/20',
  secondary: 'peer-checked:bg-[var(--patiya-color-secondary)]/25 peer-checked:after:bg-[var(--patiya-color-secondary)] peer-focus:ring-[var(--patiya-color-secondary)]/20',
  accent: 'peer-checked:bg-[var(--patiya-color-accent)]/25 peer-checked:after:bg-[var(--patiya-color-accent)] peer-focus:ring-[var(--patiya-color-accent)]/20',
  destructive: 'peer-checked:bg-[var(--patiya-color-destructive)]/25 peer-checked:after:bg-[var(--patiya-color-destructive)] peer-focus:ring-[var(--patiya-color-destructive)]/20',
  success: 'peer-checked:bg-[var(--patiya-color-success)]/25 peer-checked:after:bg-[var(--patiya-color-success)] peer-focus:ring-[var(--patiya-color-success)]/20',
  warning: 'peer-checked:bg-[var(--patiya-color-warning)]/25 peer-checked:after:bg-[var(--patiya-color-warning)] peer-focus:ring-[var(--patiya-color-warning)]/20',
  info: 'peer-checked:bg-[var(--patiya-color-info)]/25 peer-checked:after:bg-[var(--patiya-color-info)] peer-focus:ring-[var(--patiya-color-info)]/20',
  muted: 'peer-checked:bg-[var(--patiya-color-muted)] peer-checked:after:bg-[var(--patiya-color-muted-foreground)] peer-focus:ring-[var(--patiya-color-muted)]/20',
};

const outlineColorClasses: Record<PatiyaColor, string> = {
  primary: 'border border-[var(--patiya-color-border)] peer-checked:border-[var(--patiya-color-primary)] peer-checked:bg-[var(--patiya-color-primary)] peer-focus:ring-[var(--patiya-color-primary)]/20',
  secondary: 'border border-[var(--patiya-color-border)] peer-checked:border-[var(--patiya-color-secondary)] peer-checked:bg-[var(--patiya-color-secondary)] peer-focus:ring-[var(--patiya-color-secondary)]/20',
  accent: 'border border-[var(--patiya-color-border)] peer-checked:border-[var(--patiya-color-accent)] peer-checked:bg-[var(--patiya-color-accent)] peer-focus:ring-[var(--patiya-color-accent)]/20',
  destructive: 'border border-[var(--patiya-color-border)] peer-checked:border-[var(--patiya-color-destructive)] peer-checked:bg-[var(--patiya-color-destructive)] peer-focus:ring-[var(--patiya-color-destructive)]/20',
  success: 'border border-[var(--patiya-color-border)] peer-checked:border-[var(--patiya-color-success)] peer-checked:bg-[var(--patiya-color-success)] peer-focus:ring-[var(--patiya-color-success)]/20',
  warning: 'border border-[var(--patiya-color-border)] peer-checked:border-[var(--patiya-color-warning)] peer-checked:bg-[var(--patiya-color-warning)] peer-focus:ring-[var(--patiya-color-warning)]/20',
  info: 'border border-[var(--patiya-color-border)] peer-checked:border-[var(--patiya-color-info)] peer-checked:bg-[var(--patiya-color-info)] peer-focus:ring-[var(--patiya-color-info)]/20',
  muted: 'border border-[var(--patiya-color-border)] peer-checked:border-[var(--patiya-color-muted-foreground)] peer-checked:bg-[var(--patiya-color-muted-foreground)] peer-focus:ring-[var(--patiya-color-muted)]/20',
};

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      className,
      size,
      inputSize,
      color = 'primary',
      variant = 'solid',
      disabled,
      checked,
      ...props
    },
    ref
  ) => {
    const s = size || inputSize || 'md';
    const colorClass =
      variant === 'soft'
        ? softColorClasses[color]
        : variant === 'outline'
        ? outlineColorClasses[color]
        : solidColorClasses[color];

    return (
      <label
        className={cn(
          'relative inline-flex items-center cursor-pointer select-none',
          disabled && 'cursor-not-allowed opacity-50',
          className
        )}
      >
        <input
          type="checkbox"
          className="sr-only peer"
          ref={ref}
          disabled={disabled}
          checked={checked}
          {...props}
        />
        <div
          className={cn(
            "bg-[var(--patiya-color-muted)] peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:transition-all",
            sizeClasses[s],
            colorClass
          )}
        />
      </label>
    );
  }
);

Switch.displayName = 'Switch';

