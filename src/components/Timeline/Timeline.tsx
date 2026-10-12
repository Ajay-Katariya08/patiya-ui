import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export const Timeline = forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn("m-0 p-0 list-none", className)} {...props} />
  )
);
Timeline.displayName = "Timeline";

export const TimelineItem = forwardRef<HTMLLIElement, React.HTMLAttributes<HTMLLIElement>>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn("relative pb-8 [&:last-child]:pb-0", className)} {...props} />
  )
);
TimelineItem.displayName = "TimelineItem";

export const TimelineSeparator = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("absolute left-0 flex flex-col items-center top-0 bottom-0", className)} {...props} />
  )
);
TimelineSeparator.displayName = "TimelineSeparator";

export const TimelineConnector = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("w-px bg-[var(--patiya-color-border)] grow", className)} {...props} />
  )
);
TimelineConnector.displayName = "TimelineConnector";

export const TimelineDot = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { color?: string, variant?: 'solid' | 'outline' }>(
  ({ className, color = 'primary', variant = 'outline', ...props }, ref) => {
    
    const colors: Record<string, string> = {
      primary: variant === 'outline' ? 'border-[var(--patiya-color-primary)] bg-[var(--patiya-color-background)]' : 'border-[var(--patiya-color-primary)] bg-[var(--patiya-color-primary)]',
      secondary: variant === 'outline' ? 'border-[var(--patiya-color-secondary)] bg-[var(--patiya-color-background)]' : 'border-[var(--patiya-color-secondary)] bg-[var(--patiya-color-secondary)]',
      accent: variant === 'outline' ? 'border-[var(--patiya-color-accent)] bg-[var(--patiya-color-background)]' : 'border-[var(--patiya-color-accent)] bg-[var(--patiya-color-accent)]',
      muted: variant === 'outline' ? 'border-[var(--patiya-color-muted-foreground)] bg-[var(--patiya-color-background)]' : 'border-[var(--patiya-color-muted-foreground)] bg-[var(--patiya-color-muted-foreground)]',
    };

    return (
      <div 
        ref={ref} 
        className={cn(
          "w-3.5 h-3.5 rounded-full border-2 mt-1.5 shrink-0 shadow-sm",
          colors[color] || colors.primary,
          className
        )} 
        {...props} 
      />
    );
  }
);
TimelineDot.displayName = "TimelineDot";

export const TimelineContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("ml-8", className)} {...props} />
  )
);
TimelineContent.displayName = "TimelineContent";
