import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { PatiyaSize } from '../../types/common';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  inputSize?: PatiyaSize;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, inputSize = 'md', disabled, checked, ...props }, ref) => {
    const sizeClasses: Record<PatiyaSize, string> = {
      xs: 'w-7 h-4 after:w-3 after:h-3',
      sm: 'w-8 h-4 after:w-3 after:h-3',
      md: 'w-11 h-6 after:w-5 after:h-5',
      lg: 'w-14 h-7 after:w-6 after:h-6',
      xl: 'w-16 h-8 after:w-7 after:h-7',
    };

    return (
      <label className={cn('relative inline-flex items-center cursor-pointer', disabled && 'cursor-not-allowed opacity-50', className)}>
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
            "bg-[var(--patiya-color-muted)] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[var(--patiya-color-primary)]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:transition-all peer-checked:bg-[var(--patiya-color-primary)]",
            sizeClasses[inputSize]
          )}
        ></div>
      </label>
    );
  }
);

Switch.displayName = 'Switch';
