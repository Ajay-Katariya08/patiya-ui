import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export const Stepper = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-row items-center w-full", className)} {...props} />
  )
);
Stepper.displayName = "Stepper";

export const Step = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { active?: boolean; completed?: boolean }>(
  ({ className, active, completed, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center group relative", className)} data-active={active} data-completed={completed} {...props} />
  )
);
Step.displayName = "Step";

export const StepIndicator = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { active?: boolean; completed?: boolean }>(
  ({ className, active, completed, ...props }, ref) => (
    <div ref={ref} className={cn(
      "flex items-center justify-center shrink-0 w-8 h-8 rounded-full border-2 font-medium text-sm transition-colors",
      active ? 'border-[var(--patiya-color-primary)] text-[var(--patiya-color-primary)] shadow-sm' : 
      completed ? 'border-[var(--patiya-color-primary)] bg-[var(--patiya-color-primary)] text-[var(--patiya-color-primary-foreground)]' :
      'border-[var(--patiya-color-border)] text-(--patiya-color-muted-foreground)',
      className)} {...props} />
  )
);
StepIndicator.displayName = "StepIndicator";

export const StepTitle = forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span ref={ref} className={cn("ml-3 text-sm font-semibold whitespace-nowrap", className)} {...props} />
  )
);
StepTitle.displayName = "StepTitle";

export const StepDescription = forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span ref={ref} className={cn("ml-3 text-xs text-(--patiya-color-muted-foreground) whitespace-nowrap", className)} {...props} />
  )
);
StepDescription.displayName = "StepDescription";

export const StepSeparator = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex-1 h-[2px] bg-[var(--patiya-color-border)] mx-4 transition-colors group-data-[completed=true]:bg-[var(--patiya-color-primary)] rounded-full", className)} {...props} />
  )
);
StepSeparator.displayName = "StepSeparator";
