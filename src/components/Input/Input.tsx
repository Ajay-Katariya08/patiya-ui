import React, { forwardRef, useState, useRef, useImperativeHandle } from 'react';
import { cn } from '../../utils/cn';
import { PatiyaSize } from '../../types/common';
import { Box } from '../Layout/Box';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  inputSize?: PatiyaSize;
  variant?: 'outline' | 'filled' | 'soft';
  invalid?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  showPasswordToggle?: boolean;
  eyeIcon?: React.ReactNode;
  eyeOffIcon?: React.ReactNode;
  clearable?: boolean;
  onClear?: () => void;
};

const DefaultEyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const DefaultEyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" x2="22" y1="2" y2="22" />
  </svg>
);

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
      type = 'text',
      showPasswordToggle = false,
      eyeIcon,
      eyeOffIcon,
      clearable = false,
      onClear,
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref
  ) => {
    const internalInputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => internalInputRef.current as HTMLInputElement);

    const [showPassword, setShowPassword] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue ?? '');

    const isControlled = value !== undefined;
    const currentVal = isControlled ? value : internalValue;
    const hasValue = currentVal !== undefined && currentVal !== null && currentVal !== '';

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    const handleClear = () => {
      if (!isControlled) {
        setInternalValue('');
      }
      if (internalInputRef.current) {
        internalInputRef.current.value = '';
        const syntheticEvent = new Event('input', { bubbles: true });
        internalInputRef.current.dispatchEvent(syntheticEvent);
        internalInputRef.current.focus();
      }
      onClear?.();
    };

    const isPassword = type === 'password';
    const computedType = isPassword && showPassword ? 'text' : type;

    let computedRightIcon = rightIcon;
    if (!computedRightIcon) {
      if (isPassword && showPasswordToggle) {
        computedRightIcon = (
          <button
            type="button"
            disabled={disabled}
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="cursor-pointer text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] transition-colors"
          >
            {showPassword ? (eyeOffIcon || <DefaultEyeOffIcon />) : (eyeIcon || <DefaultEyeIcon />)}
          </button>
        );
      } else if (clearable && hasValue) {
        computedRightIcon = (
          <button
            type="button"
            disabled={disabled}
            onClick={handleClear}
            aria-label="Clear input"
            className="cursor-pointer text-xs px-1 text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] transition-colors"
          >
            ✕
          </button>
        );
      }
    }

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
      computedRightIcon && 'pr-10',
      !leftIcon && !computedRightIcon && className
    );

    if (leftIcon || computedRightIcon) {
      return (
        <Box className={cn('relative flex items-center w-full', className)}>
          {leftIcon && (
            <span className="absolute left-3 flex items-center justify-center text-(--patiya-color-muted-foreground) pointer-events-none">
              {leftIcon}
            </span>
          )}
          <input
            ref={internalInputRef}
            type={computedType}
            disabled={disabled}
            value={value}
            defaultValue={defaultValue}
            onChange={handleInputChange}
            className={cn(inputClassName, 'w-full')}
            {...props}
          />
          {computedRightIcon && (
            <span className="absolute right-3 flex items-center justify-center text-(--patiya-color-muted-foreground)">
              {computedRightIcon}
            </span>
          )}
        </Box>
      );
    }

    return (
      <input
        ref={internalInputRef}
        type={computedType}
        disabled={disabled}
        value={value}
        defaultValue={defaultValue}
        onChange={handleInputChange}
        className={inputClassName}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
