import React, { useState, useEffect } from 'react';
import { cn } from '../../utils/cn';
import { Box } from '../Layout/Box';
import { Input, InputProps } from '../Input/Input';

export interface PasswordStrengthProps extends Omit<InputProps, 'type'> {
  /** The minimum required score (0-4) */
  minScore?: number;
  /** Whether to show the visual strength meter */
  showMeter?: boolean;
  /** Whether to show the password requirements list */
  showRequirements?: boolean;
  /** Custom label for the strength meter */
  strengthLabel?: string;
}

export const PasswordStrength = React.forwardRef<HTMLInputElement, PasswordStrengthProps>(
  (
    {
      minScore = 3,
      showMeter = true,
      showRequirements = true,
      strengthLabel = 'Password strength',
      className,
      onChange,
      ...props
    },
    ref
  ) => {
    const [password, setPassword] = useState(props.value?.toString() || props.defaultValue?.toString() || '');
    const [score, setScore] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    const requirements = [
      { id: 'length', text: 'At least 8 characters', regex: /.{8,}/ },
      { id: 'uppercase', text: 'Contains uppercase letter', regex: /[A-Z]/ },
      { id: 'lowercase', text: 'Contains lowercase letter', regex: /[a-z]/ },
      { id: 'number', text: 'Contains a number', regex: /[0-9]/ },
      { id: 'special', text: 'Contains a special character', regex: /[^A-Za-z0-9]/ },
    ];

    useEffect(() => {
      let currentScore = 0;
      let reqMet = 0;
      
      requirements.forEach(req => {
        if (req.regex.test(password)) {
          reqMet++;
        }
      });

      if (password.length === 0) currentScore = 0;
      else if (reqMet <= 2) currentScore = 1; // Weak
      else if (reqMet === 3) currentScore = 2; // Fair
      else if (reqMet === 4) currentScore = 3; // Good
      else if (reqMet >= 5) currentScore = 4; // Strong

      setScore(currentScore);
    }, [password]);

    const getScoreColor = () => {
      if (score === 0) return 'bg-[var(--patiya-color-muted)]';
      if (score === 1) return 'bg-[var(--patiya-color-destructive)]';
      if (score === 2) return 'bg-orange-500';
      if (score === 3) return 'bg-yellow-500';
      if (score === 4) return 'bg-[var(--patiya-color-success)]';
      return 'bg-[var(--patiya-color-muted)]';
    };

    const getScoreLabel = () => {
      if (score === 0) return 'Empty';
      if (score === 1) return 'Weak';
      if (score === 2) return 'Fair';
      if (score === 3) return 'Good';
      if (score === 4) return 'Strong';
      return '';
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      onChange?.(e);
    };

    return (
      <Box className={cn('flex flex-col gap-2 w-full', className)}>
        <Box className="relative w-full">
          <Input
            ref={ref}
            type={isVisible ? 'text' : 'password'}
            value={password}
            onChange={handleChange}
            {...props}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] transition-colors"
            onClick={() => setIsVisible(!isVisible)}
          >
            {isVisible ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            )}
          </button>
        </Box>

        {showMeter && (
          <Box className="flex flex-col gap-1.5 mt-1">
            <Box className="flex justify-between items-center text-xs">
              <span className="text-[var(--patiya-color-muted-foreground)]">{strengthLabel}</span>
              <span className={cn('font-medium', password.length === 0 ? 'text-[var(--patiya-color-muted-foreground)]' : '')}>
                {getScoreLabel()}
              </span>
            </Box>
            <Box className="flex gap-1 h-1.5 w-full rounded-full overflow-hidden">
              <div className={cn('flex-1 rounded-full transition-colors duration-300', score >= 1 ? getScoreColor() : 'bg-[var(--patiya-color-muted)]')} />
              <div className={cn('flex-1 rounded-full transition-colors duration-300', score >= 2 ? getScoreColor() : 'bg-[var(--patiya-color-muted)]')} />
              <div className={cn('flex-1 rounded-full transition-colors duration-300', score >= 3 ? getScoreColor() : 'bg-[var(--patiya-color-muted)]')} />
              <div className={cn('flex-1 rounded-full transition-colors duration-300', score >= 4 ? getScoreColor() : 'bg-[var(--patiya-color-muted)]')} />
            </Box>
          </Box>
        )}

        {showRequirements && (
          <Box className="mt-2 space-y-1.5">
            {requirements.map((req) => {
              const isMet = req.regex.test(password);
              return (
                <Box key={req.id} className="flex items-center gap-2 text-xs">
                  {isMet ? (
                    <svg className="w-3.5 h-3.5 text-[var(--patiya-color-success)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  ) : (
                    <svg className="w-3.5 h-3.5 text-[var(--patiya-color-muted-foreground)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/></svg>
                  )}
                  <span className={cn(isMet ? 'text-[var(--patiya-color-foreground)]' : 'text-[var(--patiya-color-muted-foreground)]')}>
                    {req.text}
                  </span>
                </Box>
              );
            })}
          </Box>
        )}
      </Box>
    );
  }
);

PasswordStrength.displayName = 'PasswordStrength';
