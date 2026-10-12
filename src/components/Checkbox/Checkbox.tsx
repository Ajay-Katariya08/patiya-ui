import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { PatiyaSize } from '../../types/common';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  inputSize?: PatiyaSize;
  invalid?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
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
        type="checkbox"
        ref={ref}
        disabled={disabled}
        className={cn(
          'appearance-none shrink-0 border border-[var(--patiya-color-border)] rounded-[4px] bg-transparent',
          'checked:bg-[var(--patiya-color-primary)] checked:border-[var(--patiya-color-primary)]',
          'focus:outline-none focus:ring-4 focus:ring-[var(--patiya-color-primary)]/20',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'transition-all duration-200 cursor-pointer relative',
          'checked:after:content-[""] checked:after:absolute checked:after:w-[35%] checked:after:h-[60%] checked:after:border-white checked:after:border-b-2 checked:after:border-r-2 checked:after:rotate-45 checked:after:left-[32%] checked:after:top-[12%]',
          sizeClasses[inputSize],
          invalid && 'border-[var(--patiya-color-destructive)] checked:bg-[var(--patiya-color-destructive)] checked:border-[var(--patiya-color-destructive)] focus:ring-[var(--patiya-color-destructive)]/20',
          className
        )}
        {...props}
      />
    );
  }
);

Checkbox.displayName = 'Checkbox';
