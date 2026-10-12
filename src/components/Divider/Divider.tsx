import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'solid' | 'dashed' | 'dotted';
  label?: React.ReactNode;
  labelPosition?: 'start' | 'center' | 'end';
}

export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  ({ orientation = 'horizontal', variant = 'solid', label, labelPosition = 'center', className, ...props }, ref) => {
    const isHorizontal = orientation === 'horizontal';
    
    const variantClasses = {
      solid: 'border-solid',
      dashed: 'border-dashed',
      dotted: 'border-dotted',
    };

    if (!label) {
      return (
        <div
          ref={ref}
          role="separator"
          aria-orientation={orientation}
          className={cn(
            'shrink-0 border-[var(--patiya-color-border)]',
            isHorizontal ? 'w-full border-t' : 'h-full border-l min-h-[1em]',
            variantClasses[variant],
            className
          )}
          {...props}
        />
      );
    }

    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation={orientation}
        className={cn(
          'flex items-center',
          isHorizontal ? 'w-full flex-row' : 'h-full min-h-[5em] flex-col',
          className
        )}
        {...props}
      >
        <div className={cn(
          'border-[var(--patiya-color-border)] flex-grow',
          isHorizontal ? 'border-t' : 'border-l',
          variantClasses[variant],
          labelPosition === 'start' ? 'flex-grow-0 basis-8' : ''
        )} />
        <div className={cn(
          'text-[var(--patiya-color-muted-foreground)] text-xs font-medium',
          isHorizontal ? 'px-3' : 'py-3'
        )}>
          {label}
        </div>
        <div className={cn(
          'border-[var(--patiya-color-border)] flex-grow',
          isHorizontal ? 'border-t' : 'border-l',
          variantClasses[variant],
          labelPosition === 'end' ? 'flex-grow-0 basis-8' : ''
        )} />
      </div>
    );
  }
);

Divider.displayName = 'Divider';
