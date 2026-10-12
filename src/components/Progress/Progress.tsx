import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { Box } from '../Layout/Box';
import { PatiyaSize, PatiyaColor } from '../../types/common';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  progressSize?: PatiyaSize;
  color?: PatiyaColor;
  isIndeterminate?: boolean;
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, max = 100, progressSize = 'md', color = 'primary', isIndeterminate = false, ...props }, ref) => {
    
    const sizeClasses: Record<PatiyaSize, string> = {
      xs: 'h-1',
      sm: 'h-2',
      md: 'h-3',
      lg: 'h-4',
      xl: 'h-6',
    };

    const progressStyle = {
      '--progress-color': `var(--patiya-color-${color})`,
    } as React.CSSProperties;

    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    return (
      <Box
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={isIndeterminate ? undefined : value}
        style={progressStyle}
        className={cn(
          'relative w-full overflow-hidden rounded-full bg-[var(--patiya-color-muted)]',
          sizeClasses[progressSize],
          className
        )}
        {...props}
      >
        <Box
          className={cn(
            'h-full bg-[var(--progress-color)] transition-all duration-300 ease-in-out rounded-full',
            isIndeterminate ? 'w-1/2 animate-[pulse_1.5s_ease-in-out_infinite]' : ''
          )}
          style={isIndeterminate ? {} : { width: `${percentage}%` }}
        />
      </Box>
    );
  }
);

Progress.displayName = 'Progress';
