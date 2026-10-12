import React from 'react';
import { Box } from '../Layout/Box';
import { cn } from '../../utils/cn';
import { PatiyaColor } from '../../types/common';

export interface TypingIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'dots' | 'pulse' | 'wave';
  size?: 'sm' | 'md' | 'lg';
  color?: PatiyaColor | string;
}

export const TypingIndicator = React.forwardRef<HTMLDivElement, TypingIndicatorProps>(
  ({ className, variant = 'dots', size = 'md', color = 'primary', ...props }, ref) => {
    const sizeClasses = {
      sm: 'w-1.5 h-1.5',
      md: 'w-2 h-2',
      lg: 'w-2.5 h-2.5',
    };
    const s = sizeClasses[size];

    const semanticColors: Record<string, string> = {
      primary: 'var(--patiya-color-primary)',
      secondary: 'var(--patiya-color-secondary)',
      accent: 'var(--patiya-color-accent)',
      destructive: 'var(--patiya-color-destructive)',
      success: 'var(--patiya-color-success)',
      warning: 'var(--patiya-color-warning)',
      info: 'var(--patiya-color-info)',
      muted: 'var(--patiya-color-muted-foreground)',
    };

    const finalColor = (color && color in semanticColors) ? semanticColors[color] : color;

    return (
      <Box 
        ref={ref} 
        className={cn("flex items-center gap-1.5 py-1 px-1", className)} 
        style={finalColor ? { color: finalColor, ...props.style } : props.style}
        {...props}
      >
        {variant === 'dots' && (
          <>
            <span className={cn("rounded-full bg-current opacity-60 animate-[bounce_1.4s_infinite_0ms]", s)} />
            <span className={cn("rounded-full bg-current opacity-60 animate-[bounce_1.4s_infinite_200ms]", s)} />
            <span className={cn("rounded-full bg-current opacity-60 animate-[bounce_1.4s_infinite_400ms]", s)} />
          </>
        )}
        {variant === 'pulse' && (
          <>
            <span className={cn("rounded-full bg-current opacity-70 animate-pulse", s)} />
            <span className={cn("rounded-full bg-current opacity-70 animate-pulse delay-150", s)} />
            <span className={cn("rounded-full bg-current opacity-70 animate-pulse delay-300", s)} />
          </>
        )}
        {variant === 'wave' && (
          <Box className="flex items-end gap-1 h-4">
            <span className={cn("w-1 bg-current rounded-sm animate-[pulse_1s_infinite_0ms] h-full", size === 'sm' ? 'w-0.5' : '')} />
            <span className={cn("w-1 bg-current rounded-sm animate-[pulse_1s_infinite_200ms] h-2/3", size === 'sm' ? 'w-0.5' : '')} />
            <span className={cn("w-1 bg-current rounded-sm animate-[pulse_1s_infinite_400ms] h-full", size === 'sm' ? 'w-0.5' : '')} />
          </Box>
        )}
      </Box>
    );
  }
);
TypingIndicator.displayName = 'TypingIndicator';
