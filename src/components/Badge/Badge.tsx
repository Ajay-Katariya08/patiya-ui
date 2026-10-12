import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { PatiyaVariant, PatiyaColor, PatiyaRadius } from '../../types/common';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: PatiyaVariant;
  color?: PatiyaColor;
  size?: 'sm' | 'md' | 'lg';
  radius?: PatiyaRadius;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ 
    variant = 'soft', 
    color = 'primary', 
    size = 'md', 
    radius = 'full',
    className, 
    children, 
    ...props 
  }, ref) => {
    
    const baseClasses = 'inline-flex items-center justify-center font-medium';
    
    const sizeClasses = {
      sm: 'text-xs px-1.5 py-0.5',
      md: 'text-xs px-2.5 py-0.5',
      lg: 'text-sm px-3 py-1',
    };
    
    const radiusClasses = {
      none: 'rounded-none',
      sm: 'rounded-[var(--patiya-radius-sm)]',
      md: 'rounded-[var(--patiya-radius-md)]',
      lg: 'rounded-[var(--patiya-radius-lg)]',
      full: 'rounded-full',
    };
    
    const getVariantClasses = () => {
      const solidColors = {
        primary: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-primary-foreground',
        accent: 'bg-accent text-primary-foreground',
        destructive: 'bg-destructive text-primary-foreground',
        success: 'bg-success text-primary-foreground',
        warning: 'bg-warning text-primary-foreground',
        info: 'bg-info text-primary-foreground',
        muted: 'bg-muted text-muted-foreground',
      };
      const outlineColors = {
        primary: 'bg-transparent border border-primary text-primary',
        secondary: 'bg-transparent border border-secondary text-secondary',
        accent: 'bg-transparent border border-accent text-accent',
        destructive: 'bg-transparent border border-destructive text-destructive',
        success: 'bg-transparent border border-success text-success',
        warning: 'bg-transparent border border-warning text-warning',
        info: 'bg-transparent border border-info text-info',
        muted: 'bg-transparent border border-muted-foreground text-muted-foreground',
      };
      const softColors = {
        primary: 'bg-primary/10 text-primary',
        secondary: 'bg-secondary/10 text-secondary',
        accent: 'bg-accent/10 text-accent',
        destructive: 'bg-destructive/10 text-destructive',
        success: 'bg-success/10 text-success',
        warning: 'bg-warning/10 text-warning',
        info: 'bg-info/10 text-info',
        muted: 'bg-muted text-muted-foreground',
      };
      const ghostColors = {
        primary: 'bg-transparent text-primary',
        secondary: 'bg-transparent text-secondary',
        accent: 'bg-transparent text-accent',
        destructive: 'bg-transparent text-destructive',
        success: 'bg-transparent text-success',
        warning: 'bg-transparent text-warning',
        info: 'bg-transparent text-info',
        muted: 'bg-transparent text-muted-foreground',
      };

      switch (variant) {
        case 'solid': return solidColors[color as keyof typeof solidColors] || '';
        case 'outline': return outlineColors[color as keyof typeof outlineColors] || '';
        case 'soft': return softColors[color as keyof typeof softColors] || '';
        case 'ghost': return ghostColors[color as keyof typeof ghostColors] || '';
        default: return '';
      }
    };

    return (
      <span
        ref={ref}
        className={cn(
          baseClasses,
          sizeClasses[size],
          radiusClasses[radius],
          getVariantClasses(),
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
