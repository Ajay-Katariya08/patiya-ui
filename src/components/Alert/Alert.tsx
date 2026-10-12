import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { Box } from '../Layout/Box';
import { PatiyaColor } from '../../types/common';

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  color?: PatiyaColor;
  variant?: 'solid' | 'soft' | 'outline';
  icon?: React.ReactNode;
  title?: React.ReactNode;
  onClose?: () => void;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, color = 'info', variant = 'soft', icon, title, children, onClose, ...props }, ref) => {
    
    // We use CSS variables so Tailwind v4 can dynamically apply the theme colors
    const alertStyle = {
      '--alert-color': `var(--patiya-color-${color})`,
      '--alert-fg': ['warning', 'info', 'muted'].includes(color) ? 'var(--patiya-color-foreground)' : 'var(--patiya-color-primary-foreground)',
    } as React.CSSProperties;

    const dynamicVariantClasses = {
      solid: 'bg-[var(--alert-color)] text-[var(--alert-fg)] border-transparent',
      soft: 'bg-[var(--alert-color)]/10 text-[var(--alert-color)] border-[var(--alert-color)]/20 border',
      outline: 'bg-transparent border-[var(--alert-color)] text-[var(--alert-color)] border',
    };

    return (
      <Box
        ref={ref}
        style={alertStyle}
        className={cn(
          'relative flex w-full flex-col gap-2 rounded-lg p-4 text-sm shadow-sm',
          dynamicVariantClasses[variant],
          className
        )}
        role="alert"
        {...props}
      >
        <Box className="flex items-start gap-3 w-full">
          {icon && <span className="shrink-0 mt-0.5">{icon}</span>}
          <Box className="flex-1 w-full">
            {title && <h5 className="mb-1 font-medium leading-none tracking-tight">{title}</h5>}
            <Box className="text-sm opacity-90 leading-relaxed">
              {children}
            </Box>
          </Box>
          {onClose && (
            <button
              onClick={onClose}
              className="shrink-0 rounded-md p-1 opacity-70 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-[var(--alert-color)] focus:ring-offset-2"
              aria-label="Close alert"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </Box>
      </Box>
    );
  }
);

Alert.displayName = 'Alert';
