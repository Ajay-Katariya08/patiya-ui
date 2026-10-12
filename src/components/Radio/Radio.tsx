import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { PatiyaSize, PatiyaColor } from '../../types/common';

export type RadioVariant = 'solid' | 'outline' | 'soft';

export type RadioProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  size?: PatiyaSize;
  inputSize?: PatiyaSize;
  color?: PatiyaColor;
  variant?: RadioVariant;
  invalid?: boolean;
};

const sizeClasses: Record<PatiyaSize, string> = {
  xs: 'w-3.5 h-3.5',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-7 h-7',
};

const solidColorClasses: Record<PatiyaColor, string> = {
  primary: 'checked:bg-[var(--patiya-color-primary)] checked:border-[var(--patiya-color-primary)] checked:after:bg-white focus:ring-[var(--patiya-color-primary)]/20',
  secondary: 'checked:bg-[var(--patiya-color-secondary)] checked:border-[var(--patiya-color-secondary)] checked:after:bg-white focus:ring-[var(--patiya-color-secondary)]/20',
  accent: 'checked:bg-[var(--patiya-color-accent)] checked:border-[var(--patiya-color-accent)] checked:after:bg-white focus:ring-[var(--patiya-color-accent)]/20',
  destructive: 'checked:bg-[var(--patiya-color-destructive)] checked:border-[var(--patiya-color-destructive)] checked:after:bg-white focus:ring-[var(--patiya-color-destructive)]/20',
  success: 'checked:bg-[var(--patiya-color-success)] checked:border-[var(--patiya-color-success)] checked:after:bg-white focus:ring-[var(--patiya-color-success)]/20',
  warning: 'checked:bg-[var(--patiya-color-warning)] checked:border-[var(--patiya-color-warning)] checked:after:bg-white focus:ring-[var(--patiya-color-warning)]/20',
  info: 'checked:bg-[var(--patiya-color-info)] checked:border-[var(--patiya-color-info)] checked:after:bg-white focus:ring-[var(--patiya-color-info)]/20',
  muted: 'checked:bg-[var(--patiya-color-muted-foreground)] checked:border-[var(--patiya-color-muted-foreground)] checked:after:bg-white focus:ring-[var(--patiya-color-muted)]/20',
};

const softColorClasses: Record<PatiyaColor, string> = {
  primary: 'checked:bg-[var(--patiya-color-primary)]/20 checked:border-[var(--patiya-color-primary)]/40 checked:after:bg-[var(--patiya-color-primary)] focus:ring-[var(--patiya-color-primary)]/20',
  secondary: 'checked:bg-[var(--patiya-color-secondary)]/20 checked:border-[var(--patiya-color-secondary)]/40 checked:after:bg-[var(--patiya-color-secondary)] focus:ring-[var(--patiya-color-secondary)]/20',
  accent: 'checked:bg-[var(--patiya-color-accent)]/20 checked:border-[var(--patiya-color-accent)]/40 checked:after:bg-[var(--patiya-color-accent)] focus:ring-[var(--patiya-color-accent)]/20',
  destructive: 'checked:bg-[var(--patiya-color-destructive)]/20 checked:border-[var(--patiya-color-destructive)]/40 checked:after:bg-[var(--patiya-color-destructive)] focus:ring-[var(--patiya-color-destructive)]/20',
  success: 'checked:bg-[var(--patiya-color-success)]/20 checked:border-[var(--patiya-color-success)]/40 checked:after:bg-[var(--patiya-color-success)] focus:ring-[var(--patiya-color-success)]/20',
  warning: 'checked:bg-[var(--patiya-color-warning)]/20 checked:border-[var(--patiya-color-warning)]/40 checked:after:bg-[var(--patiya-color-warning)] focus:ring-[var(--patiya-color-warning)]/20',
  info: 'checked:bg-[var(--patiya-color-info)]/20 checked:border-[var(--patiya-color-info)]/40 checked:after:bg-[var(--patiya-color-info)] focus:ring-[var(--patiya-color-info)]/20',
  muted: 'checked:bg-[var(--patiya-color-muted)] checked:border-[var(--patiya-color-muted-foreground)]/40 checked:after:bg-[var(--patiya-color-muted-foreground)] focus:ring-[var(--patiya-color-muted)]/20',
};

const outlineColorClasses: Record<PatiyaColor, string> = {
  primary: 'border-2 checked:border-[var(--patiya-color-primary)] checked:bg-transparent checked:after:bg-[var(--patiya-color-primary)] focus:ring-[var(--patiya-color-primary)]/20',
  secondary: 'border-2 checked:border-[var(--patiya-color-secondary)] checked:bg-transparent checked:after:bg-[var(--patiya-color-secondary)] focus:ring-[var(--patiya-color-secondary)]/20',
  accent: 'border-2 checked:border-[var(--patiya-color-accent)] checked:bg-transparent checked:after:bg-[var(--patiya-color-accent)] focus:ring-[var(--patiya-color-accent)]/20',
  destructive: 'border-2 checked:border-[var(--patiya-color-destructive)] checked:bg-transparent checked:after:bg-[var(--patiya-color-destructive)] focus:ring-[var(--patiya-color-destructive)]/20',
  success: 'border-2 checked:border-[var(--patiya-color-success)] checked:bg-transparent checked:after:bg-[var(--patiya-color-success)] focus:ring-[var(--patiya-color-success)]/20',
  warning: 'border-2 checked:border-[var(--patiya-color-warning)] checked:bg-transparent checked:after:bg-[var(--patiya-color-warning)] focus:ring-[var(--patiya-color-warning)]/20',
  info: 'border-2 checked:border-[var(--patiya-color-info)] checked:bg-transparent checked:after:bg-[var(--patiya-color-info)] focus:ring-[var(--patiya-color-info)]/20',
  muted: 'border-2 checked:border-[var(--patiya-color-muted-foreground)] checked:bg-transparent checked:after:bg-[var(--patiya-color-muted-foreground)] focus:ring-[var(--patiya-color-muted)]/20',
};

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      className,
      size,
      inputSize,
      color = 'primary',
      variant = 'solid',
      invalid = false,
      disabled,
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
      <input
        type="radio"
        ref={ref}
        disabled={disabled}
        className={cn(
          'appearance-none shrink-0 border border-[var(--patiya-color-border)] rounded-full bg-transparent',
          'focus:outline-none focus:ring-4',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'transition-all duration-200 cursor-pointer relative flex items-center justify-center',
          'checked:after:content-[""] checked:after:w-1/2 checked:after:h-1/2 checked:after:rounded-full',
          sizeClasses[s],
          colorClass,
          invalid &&
            'border-[var(--patiya-color-destructive)] checked:border-[var(--patiya-color-destructive)] checked:bg-[var(--patiya-color-destructive)] checked:after:bg-white focus:ring-[var(--patiya-color-destructive)]/20',
          className
        )}
        {...props}
      />
    );
  }
);

Radio.displayName = 'Radio';
