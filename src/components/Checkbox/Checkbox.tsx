import React, { forwardRef, useEffect, useRef } from 'react';
import { cn } from '../../utils/cn';
import { PatiyaSize, PatiyaColor, PatiyaRadius } from '../../types/common';

export type CheckboxVariant = 'solid' | 'outline' | 'soft';

export type CheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  size?: PatiyaSize;
  inputSize?: PatiyaSize;
  color?: PatiyaColor;
  variant?: CheckboxVariant;
  radius?: PatiyaRadius;
  invalid?: boolean;
  indeterminate?: boolean;
};

const sizeClasses: Record<PatiyaSize, string> = {
  xs: 'w-3.5 h-3.5',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-7 h-7',
};

const radiusClasses: Record<PatiyaRadius, string> = {
  none: 'rounded-none',
  sm: 'rounded-xs',
  md: 'rounded-[4px]',
  lg: 'rounded-md',
  full: 'rounded-full',
};

const solidColorClasses: Record<PatiyaColor, string> = {
  primary: 'checked:bg-[var(--patiya-color-primary)] checked:border-[var(--patiya-color-primary)] indeterminate:bg-[var(--patiya-color-primary)] indeterminate:border-[var(--patiya-color-primary)] focus:ring-[var(--patiya-color-primary)]/20',
  secondary: 'checked:bg-[var(--patiya-color-secondary)] checked:border-[var(--patiya-color-secondary)] indeterminate:bg-[var(--patiya-color-secondary)] indeterminate:border-[var(--patiya-color-secondary)] focus:ring-[var(--patiya-color-secondary)]/20',
  accent: 'checked:bg-[var(--patiya-color-accent)] checked:border-[var(--patiya-color-accent)] indeterminate:bg-[var(--patiya-color-accent)] indeterminate:border-[var(--patiya-color-accent)] focus:ring-[var(--patiya-color-accent)]/20',
  destructive: 'checked:bg-[var(--patiya-color-destructive)] checked:border-[var(--patiya-color-destructive)] indeterminate:bg-[var(--patiya-color-destructive)] indeterminate:border-[var(--patiya-color-destructive)] focus:ring-[var(--patiya-color-destructive)]/20',
  success: 'checked:bg-[var(--patiya-color-success)] checked:border-[var(--patiya-color-success)] indeterminate:bg-[var(--patiya-color-success)] indeterminate:border-[var(--patiya-color-success)] focus:ring-[var(--patiya-color-success)]/20',
  warning: 'checked:bg-[var(--patiya-color-warning)] checked:border-[var(--patiya-color-warning)] indeterminate:bg-[var(--patiya-color-warning)] indeterminate:border-[var(--patiya-color-warning)] focus:ring-[var(--patiya-color-warning)]/20',
  info: 'checked:bg-[var(--patiya-color-info)] checked:border-[var(--patiya-color-info)] indeterminate:bg-[var(--patiya-color-info)] indeterminate:border-[var(--patiya-color-info)] focus:ring-[var(--patiya-color-info)]/20',
  muted: 'checked:bg-[var(--patiya-color-muted-foreground)] checked:border-[var(--patiya-color-muted-foreground)] indeterminate:bg-[var(--patiya-color-muted-foreground)] indeterminate:border-[var(--patiya-color-muted-foreground)] focus:ring-[var(--patiya-color-muted)]/20',
};

const softColorClasses: Record<PatiyaColor, string> = {
  primary: 'checked:bg-[var(--patiya-color-primary)]/20 checked:border-[var(--patiya-color-primary)]/40 checked:after:border-[var(--patiya-color-primary)] indeterminate:bg-[var(--patiya-color-primary)]/20 indeterminate:border-[var(--patiya-color-primary)]/40 indeterminate:after:bg-[var(--patiya-color-primary)] focus:ring-[var(--patiya-color-primary)]/20',
  secondary: 'checked:bg-[var(--patiya-color-secondary)]/20 checked:border-[var(--patiya-color-secondary)]/40 checked:after:border-[var(--patiya-color-secondary)] indeterminate:bg-[var(--patiya-color-secondary)]/20 indeterminate:border-[var(--patiya-color-secondary)]/40 indeterminate:after:bg-[var(--patiya-color-secondary)] focus:ring-[var(--patiya-color-secondary)]/20',
  accent: 'checked:bg-[var(--patiya-color-accent)]/20 checked:border-[var(--patiya-color-accent)]/40 checked:after:border-[var(--patiya-color-accent)] indeterminate:bg-[var(--patiya-color-accent)]/20 indeterminate:border-[var(--patiya-color-accent)]/40 indeterminate:after:bg-[var(--patiya-color-accent)] focus:ring-[var(--patiya-color-accent)]/20',
  destructive: 'checked:bg-[var(--patiya-color-destructive)]/20 checked:border-[var(--patiya-color-destructive)]/40 checked:after:border-[var(--patiya-color-destructive)] indeterminate:bg-[var(--patiya-color-destructive)]/20 indeterminate:border-[var(--patiya-color-destructive)]/40 indeterminate:after:bg-[var(--patiya-color-destructive)] focus:ring-[var(--patiya-color-destructive)]/20',
  success: 'checked:bg-[var(--patiya-color-success)]/20 checked:border-[var(--patiya-color-success)]/40 checked:after:border-[var(--patiya-color-success)] indeterminate:bg-[var(--patiya-color-success)]/20 indeterminate:border-[var(--patiya-color-success)]/40 indeterminate:after:bg-[var(--patiya-color-success)] focus:ring-[var(--patiya-color-success)]/20',
  warning: 'checked:bg-[var(--patiya-color-warning)]/20 checked:border-[var(--patiya-color-warning)]/40 checked:after:border-[var(--patiya-color-warning)] indeterminate:bg-[var(--patiya-color-warning)]/20 indeterminate:border-[var(--patiya-color-warning)]/40 indeterminate:after:bg-[var(--patiya-color-warning)] focus:ring-[var(--patiya-color-warning)]/20',
  info: 'checked:bg-[var(--patiya-color-info)]/20 checked:border-[var(--patiya-color-info)]/40 checked:after:border-[var(--patiya-color-info)] indeterminate:bg-[var(--patiya-color-info)]/20 indeterminate:border-[var(--patiya-color-info)]/40 indeterminate:after:bg-[var(--patiya-color-info)] focus:ring-[var(--patiya-color-info)]/20',
  muted: 'checked:bg-[var(--patiya-color-muted)] checked:border-[var(--patiya-color-muted-foreground)]/40 checked:after:border-[var(--patiya-color-muted-foreground)] indeterminate:bg-[var(--patiya-color-muted)] indeterminate:border-[var(--patiya-color-muted-foreground)]/40 indeterminate:after:bg-[var(--patiya-color-muted-foreground)] focus:ring-[var(--patiya-color-muted)]/20',
};

const outlineColorClasses: Record<PatiyaColor, string> = {
  primary: 'border-2 checked:border-[var(--patiya-color-primary)] checked:bg-transparent checked:after:border-[var(--patiya-color-primary)] indeterminate:border-[var(--patiya-color-primary)] indeterminate:bg-transparent indeterminate:after:bg-[var(--patiya-color-primary)] focus:ring-[var(--patiya-color-primary)]/20',
  secondary: 'border-2 checked:border-[var(--patiya-color-secondary)] checked:bg-transparent checked:after:border-[var(--patiya-color-secondary)] indeterminate:border-[var(--patiya-color-secondary)] indeterminate:bg-transparent indeterminate:after:bg-[var(--patiya-color-secondary)] focus:ring-[var(--patiya-color-secondary)]/20',
  accent: 'border-2 checked:border-[var(--patiya-color-accent)] checked:bg-transparent checked:after:border-[var(--patiya-color-accent)] indeterminate:border-[var(--patiya-color-accent)] indeterminate:bg-transparent indeterminate:after:bg-[var(--patiya-color-accent)] focus:ring-[var(--patiya-color-accent)]/20',
  destructive: 'border-2 checked:border-[var(--patiya-color-destructive)] checked:bg-transparent checked:after:border-[var(--patiya-color-destructive)] indeterminate:border-[var(--patiya-color-destructive)] indeterminate:bg-transparent indeterminate:after:bg-[var(--patiya-color-destructive)] focus:ring-[var(--patiya-color-destructive)]/20',
  success: 'border-2 checked:border-[var(--patiya-color-success)] checked:bg-transparent checked:after:border-[var(--patiya-color-success)] indeterminate:border-[var(--patiya-color-success)] indeterminate:bg-transparent indeterminate:after:bg-[var(--patiya-color-success)] focus:ring-[var(--patiya-color-success)]/20',
  warning: 'border-2 checked:border-[var(--patiya-color-warning)] checked:bg-transparent checked:after:border-[var(--patiya-color-warning)] indeterminate:border-[var(--patiya-color-warning)] indeterminate:bg-transparent indeterminate:after:bg-[var(--patiya-color-warning)] focus:ring-[var(--patiya-color-warning)]/20',
  info: 'border-2 checked:border-[var(--patiya-color-info)] checked:bg-transparent checked:after:border-[var(--patiya-color-info)] indeterminate:border-[var(--patiya-color-info)] indeterminate:bg-transparent indeterminate:after:bg-[var(--patiya-color-info)] focus:ring-[var(--patiya-color-info)]/20',
  muted: 'border-2 checked:border-[var(--patiya-color-muted-foreground)] checked:bg-transparent checked:after:border-[var(--patiya-color-muted-foreground)] indeterminate:border-[var(--patiya-color-muted-foreground)] indeterminate:bg-transparent indeterminate:after:bg-[var(--patiya-color-muted-foreground)] focus:ring-[var(--patiya-color-muted)]/20',
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      size,
      inputSize,
      color = 'primary',
      variant = 'solid',
      radius = 'md',
      invalid = false,
      indeterminate = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const innerRef = useRef<HTMLInputElement>(null);
    const s = size || inputSize || 'md';

    useEffect(() => {
      const target = (ref && typeof ref !== 'function' ? ref.current : innerRef.current) || innerRef.current;
      if (target) {
        target.indeterminate = indeterminate;
      }
    }, [indeterminate, ref]);

    const colorClass =
      variant === 'soft'
        ? softColorClasses[color]
        : variant === 'outline'
        ? outlineColorClasses[color]
        : solidColorClasses[color];

    return (
      <input
        type="checkbox"
        ref={(el) => {
          (innerRef as any).current = el;
          if (typeof ref === 'function') ref(el);
          else if (ref) (ref as any).current = el;
        }}
        disabled={disabled}
        className={cn(
          'appearance-none shrink-0 border border-[var(--patiya-color-border)] bg-transparent',
          'focus:outline-none focus:ring-4',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'transition-all duration-200 cursor-pointer relative',
          'checked:after:content-[""] checked:after:absolute checked:after:w-[35%] checked:after:h-[60%] checked:after:border-white checked:after:border-b-2 checked:after:border-r-2 checked:after:rotate-45 checked:after:left-[32%] checked:after:top-[12%]',
          'indeterminate:after:content-[""] indeterminate:after:absolute indeterminate:after:w-[60%] indeterminate:after:h-[2px] indeterminate:after:bg-white indeterminate:after:left-[20%] indeterminate:after:top-1/2 indeterminate:after:-translate-y-1/2',
          sizeClasses[s],
          radiusClasses[radius],
          colorClass,
          invalid &&
            'border-[var(--patiya-color-destructive)] checked:bg-[var(--patiya-color-destructive)] checked:border-[var(--patiya-color-destructive)] focus:ring-[var(--patiya-color-destructive)]/20',
          className
        )}
        {...props}
      />
    );
  }
);

Checkbox.displayName = 'Checkbox';

