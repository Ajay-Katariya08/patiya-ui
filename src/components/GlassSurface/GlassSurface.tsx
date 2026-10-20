import React from 'react';
import { cn } from '../../utils/cn';

export type GlassSurfaceProps = React.HTMLAttributes<HTMLDivElement> & {
  blur?: 'sm' | 'md' | 'lg' | 'xl';
  intensity?: 'subtle' | 'medium' | 'strong';
  borderGlow?: boolean;
};

export const GlassSurface = React.forwardRef<HTMLDivElement, GlassSurfaceProps>(
  (
    {
      className,
      blur = 'md',
      intensity = 'medium',
      borderGlow = true,
      children,
      ...props
    },
    ref
  ) => {
    const blurMap = {
      sm: 'backdrop-blur-sm',
      md: 'backdrop-blur-md',
      lg: 'backdrop-blur-lg',
      xl: 'backdrop-blur-xl',
    };

    const intensityMap = {
      subtle: 'bg-[var(--patiya-color-background)]/40 dark:bg-[var(--patiya-color-background)]/30',
      medium: 'bg-[var(--patiya-color-card)]/60 dark:bg-[var(--patiya-color-card)]/40',
      strong: 'bg-[var(--patiya-color-card)]/85 dark:bg-[var(--patiya-color-card)]/70',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'relative overflow-hidden rounded-2xl border border-[var(--patiya-color-border)]/80 shadow-2xl transition-all duration-300',
          blurMap[blur],
          intensityMap[intensity],
          borderGlow &&
            'before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-[var(--patiya-color-primary)]/40 before:to-transparent',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
GlassSurface.displayName = 'GlassSurface';
