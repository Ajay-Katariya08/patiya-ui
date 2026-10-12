import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'outline' | 'filled' | 'soft';
  invalid?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      variant = 'outline',
      invalid = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      outline: 'bg-transparent border border-[var(--patiya-color-border)] focus:border-[var(--patiya-color-primary)] shadow-[var(--patiya-shadow-sm)]',
      filled: 'bg-[var(--patiya-color-muted)] border border-transparent focus:bg-transparent focus:border-[var(--patiya-color-primary)]',
      soft: 'bg-[var(--patiya-color-primary)]/5 border border-transparent focus:bg-transparent focus:border-[var(--patiya-color-primary)]',
    };

    return (
      <textarea
        ref={ref}
        disabled={disabled}
        className={cn(
          'flex min-h-[80px] w-full rounded-md px-4 py-2 text-base transition-all duration-200 outline-none resize-y',
          'text-[var(--patiya-color-foreground)] placeholder:text-(--patiya-color-muted-foreground)',
          'focus:ring-4 focus:ring-[var(--patiya-color-primary)]/10',
          'disabled:cursor-not-allowed disabled:opacity-50',
          variantClasses[variant],
          invalid && 'border-[var(--patiya-color-destructive)] focus:border-[var(--patiya-color-destructive)] focus:ring-[var(--patiya-color-destructive)]/10',
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
