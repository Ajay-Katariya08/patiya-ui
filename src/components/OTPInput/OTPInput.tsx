import React, { useState, useRef, useEffect, KeyboardEvent, ClipboardEvent } from 'react';
import { cn } from '../../utils/cn';
import { Box } from '../Layout/Box';
import { PatiyaSize } from '../../types/common';

export interface OTPInputProps {
  /** Number of digits/inputs */
  length?: number;
  /** Value of the OTP */
  value?: string;
  /** Callback on change */
  onChange?: (value: string) => void;
  /** Callback when all inputs are filled */
  onComplete?: (value: string) => void;
  /** Whether to mask the input like a password */
  mask?: boolean;
  /** Whether to show an error state */
  error?: boolean;
  /** Only allow numeric input */
  numericOnly?: boolean;
  /** Input size */
  size?: PatiyaSize;
  /** Optional separator placed in the middle (e.g. after 3rd digit for 6 digits) */
  separator?: React.ReactNode;
  /** Custom class name */
  className?: string;
  /** Custom class for individual input boxes */
  inputClassName?: string;
  /** Disable the input */
  disabled?: boolean;
}

export const OTPInput = React.forwardRef<HTMLDivElement, OTPInputProps>(
  (
    {
      length = 6,
      value = '',
      onChange,
      onComplete,
      mask = false,
      error = false,
      numericOnly = true,
      size = 'md',
      separator,
      className,
      inputClassName,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
      if (value !== undefined) {
        const valueArray = value.split('').slice(0, length);
        const newOtp = Array(length).fill('');
        valueArray.forEach((char, index) => {
          newOtp[index] = char;
        });
        setOtp(newOtp);
      }
    }, [value, length]);

    const focusInput = (index: number) => {
      if (index >= 0 && index < length) {
        inputRefs.current[index]?.focus();
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      const val = e.target.value;
      if (numericOnly && val && !/^\d+$/.test(val)) return;
      
      // Get only the last character in case they type multiple fast
      const char = val.slice(-1);
      
      const newOtp = [...otp];
      newOtp[index] = char;
      setOtp(newOtp);
      onChange?.(newOtp.join(''));

      if (char) {
        focusInput(index + 1);
        if (newOtp.every((digit) => digit !== '') && onComplete) {
          onComplete(newOtp.join(''));
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
      if (e.key === 'Backspace') {
        e.preventDefault();
        const newOtp = [...otp];
        if (otp[index]) {
          newOtp[index] = '';
          setOtp(newOtp);
          onChange?.(newOtp.join(''));
        } else {
          // If empty, move to previous and clear it
          if (index > 0) {
            newOtp[index - 1] = '';
            setOtp(newOtp);
            onChange?.(newOtp.join(''));
            focusInput(index - 1);
          }
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        focusInput(index - 1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        focusInput(index + 1);
      }
    };

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pasteData = e.clipboardData.getData('text/plain').trim();
      if (!pasteData) return;
      if (numericOnly && !/^\d+$/.test(pasteData)) return;

      const pasteChars = pasteData.split('').slice(0, length);
      const newOtp = [...otp];
      
      pasteChars.forEach((char, i) => {
        if (i < length) newOtp[i] = char;
      });
      
      setOtp(newOtp);
      onChange?.(newOtp.join(''));
      
      if (newOtp.every((digit) => digit !== '') && onComplete) {
        onComplete(newOtp.join(''));
      }
      
      focusInput(Math.min(pasteChars.length, length - 1));
    };

    const sizeClasses: Record<PatiyaSize, string> = {
      xs: 'w-6 h-6 text-xs',
      sm: 'w-8 h-8 text-sm',
      md: 'w-10 h-12 text-base',
      lg: 'w-14 h-16 text-xl',
      xl: 'w-16 h-20 text-2xl',
    };

    return (
      <Box 
        ref={ref} 
        className={cn('flex items-center gap-2', className)}
        {...props}
      >
        {otp.map((digit, index) => (
          <React.Fragment key={index}>
            <input
              ref={(el) => { inputRefs.current[index] = el; }}
              type={mask ? 'password' : 'text'}
              inputMode={numericOnly ? 'numeric' : 'text'}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              disabled={disabled}
              className={cn(
                'text-center font-semibold rounded-md border transition-all duration-200 outline-none',
                'bg-[var(--patiya-color-background)] text-[var(--patiya-color-foreground)]',
                sizeClasses[size],
                error 
                  ? 'border-[var(--patiya-color-destructive)] focus:ring-2 focus:ring-[var(--patiya-color-destructive)]/20' 
                  : 'border-[var(--patiya-color-border)] focus:border-[var(--patiya-color-primary)] focus:ring-2 focus:ring-[var(--patiya-color-primary)]/20',
                disabled && 'opacity-50 cursor-not-allowed',
                inputClassName
              )}
              autoComplete="one-time-code"
            />
            {separator && index === Math.floor(length / 2) - 1 && (
              <span className="text-[var(--patiya-color-muted-foreground)] px-1 font-medium">
                {separator}
              </span>
            )}
          </React.Fragment>
        ))}
      </Box>
    );
  }
);

OTPInput.displayName = 'OTPInput';
