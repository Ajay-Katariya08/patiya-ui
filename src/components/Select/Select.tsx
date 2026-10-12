import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { PatiyaSize } from '../../types/common';
import { Box } from '../Layout/Box';

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  inputSize?: PatiyaSize;
  variant?: 'outline' | 'filled' | 'soft';
  invalid?: boolean;
  leftIcon?: React.ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      inputSize = 'md',
      variant = 'outline',
      invalid = false,
      leftIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const sizeClasses: Record<PatiyaSize, string> = {
      xs: 'h-7 text-xs px-2',
      sm: 'h-8 text-sm px-3',
      md: 'h-10 text-base px-4',
      lg: 'h-12 text-lg px-4',
      xl: 'h-14 text-xl px-5',
    };

    const variantClasses = {
      outline: 'bg-transparent border border-[var(--patiya-color-border)] focus:border-[var(--patiya-color-primary)] shadow-[var(--patiya-shadow-sm)]',
      filled: 'bg-[var(--patiya-color-muted)] border border-transparent focus:bg-transparent focus:border-[var(--patiya-color-primary)]',
      soft: 'bg-[var(--patiya-color-primary)]/5 border border-transparent focus:bg-transparent focus:border-[var(--patiya-color-primary)]',
    };

    const selectClassName = cn(
      'appearance-none flex w-full rounded-md transition-all duration-200 outline-none cursor-pointer',
      'text-[var(--patiya-color-foreground)]',
      'focus:ring-4 focus:ring-[var(--patiya-color-primary)]/10',
      'disabled:cursor-not-allowed disabled:opacity-50',
      sizeClasses[inputSize],
      variantClasses[variant],
      invalid && 'border-[var(--patiya-color-destructive)] focus:border-[var(--patiya-color-destructive)] focus:ring-[var(--patiya-color-destructive)]/10',
      leftIcon ? 'pl-10 pr-10' : 'pr-10',
      className
    );

    const ChevronIcon = () => (
      <svg className="w-4 h-4 text-(--patiya-color-muted-foreground) pointer-events-none absolute right-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    );

    return (
      <Box className={cn('relative flex items-center w-full', className)}>
        {leftIcon && (
          <span className="absolute left-3 flex items-center justify-center text-(--patiya-color-muted-foreground) pointer-events-none">
            {leftIcon}
          </span>
        )}
        <select ref={ref} disabled={disabled} className={selectClassName} {...props}>
          {children}
        </select>
        <ChevronIcon />
      </Box>
    );
  }
);

Select.displayName = 'Select';
