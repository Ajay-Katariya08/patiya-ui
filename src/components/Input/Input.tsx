import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { PatiyaSize } from '../../types/common';
import { Box } from '../Layout/Box';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  inputSize?: PatiyaSize;
  variant?: 'outline' | 'filled' | 'soft';
  invalid?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      inputSize = 'md',
      variant = 'outline',
      invalid = false,
      leftIcon,
      rightIcon,
      disabled,
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

    const inputClassName = cn(
      'flex w-full rounded-md transition-all duration-200 outline-none',
      'text-[var(--patiya-color-foreground)] placeholder:text-(--patiya-color-muted-foreground)',
      'focus:ring-4 focus:ring-[var(--patiya-color-primary)]/10',
      'disabled:cursor-not-allowed disabled:opacity-50',
      sizeClasses[inputSize],
      variantClasses[variant],
      invalid && 'border-[var(--patiya-color-destructive)] focus:border-[var(--patiya-color-destructive)] focus:ring-[var(--patiya-color-destructive)]/10',
      leftIcon && 'pl-10',
      rightIcon && 'pr-10',
      !leftIcon && !rightIcon && className // only apply className directly to input if no wrapper
    );

    if (leftIcon || rightIcon) {
      return (
        <Box className={cn('relative flex items-center w-full', className)}>
          {leftIcon && (
            <span className="absolute left-3 flex items-center justify-center text-(--patiya-color-muted-foreground) pointer-events-none">
              {leftIcon}
            </span>
          )}
          <input ref={ref} disabled={disabled} className={cn(inputClassName, 'w-full')} {...props} />
          {rightIcon && (
            <span className="absolute right-3 flex items-center justify-center text-(--patiya-color-muted-foreground) pointer-events-none">
              {rightIcon}
            </span>
          )}
        </Box>
      );
    }

    return <input ref={ref} disabled={disabled} className={inputClassName} {...props} />;
  }
);

Input.displayName = 'Input';
