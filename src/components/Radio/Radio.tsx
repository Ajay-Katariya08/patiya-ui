import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { PatiyaSize } from '../../types/common';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  inputSize?: PatiyaSize;
  invalid?: boolean;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, inputSize = 'md', invalid = false, disabled, ...props }, ref) => {
    const sizeClasses: Record<PatiyaSize, string> = {
      xs: 'w-3 h-3',
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
      xl: 'w-8 h-8',
    };

    return (
      <input
        type="radio"
        ref={ref}
        disabled={disabled}
        className={cn(
          'appearance-none shrink-0 border border-[var(--patiya-color-border)] rounded-full bg-transparent',
          'checked:border-[var(--patiya-color-primary)]',
          'focus:outline-none focus:ring-4 focus:ring-[var(--patiya-color-primary)]/20',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'transition-all duration-200 cursor-pointer relative flex items-center justify-center',
          'checked:after:content-[""] checked:after:w-1/2 checked:after:h-1/2 checked:after:rounded-full checked:after:bg-[var(--patiya-color-primary)]',
          sizeClasses[inputSize],
          invalid && 'border-[var(--patiya-color-destructive)] checked:border-[var(--patiya-color-destructive)] checked:after:bg-[var(--patiya-color-destructive)] focus:ring-[var(--patiya-color-destructive)]/20',
          className
        )}
        {...props}
      />
    );
  }
);

Radio.displayName = 'Radio';
