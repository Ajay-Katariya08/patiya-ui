import React from 'react';
import { cn } from '../../utils/cn';
import { Badge, BadgeProps } from '../Badge/Badge';

export type SecurityLevel = 'verified' | 'unverified' | 'protected' | 'risky';

export interface SecurityBadgeProps extends Omit<BadgeProps, 'color' | 'children'> {
  /** The security level to indicate */
  level: SecurityLevel;
  /** Custom label to override the default text */
  label?: string;
  /** Whether to show only the icon */
  iconOnly?: boolean;
}

const levelConfig: Record<SecurityLevel, { color: BadgeProps['color']; icon: React.ReactNode; label: string }> = {
  verified: {
    color: 'success',
    label: 'Verified',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    )
  },
  unverified: {
    color: 'warning',
    label: 'Unverified',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    )
  },
  protected: {
    color: 'primary',
    label: 'Protected',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    )
  },
  risky: {
    color: 'destructive',
    label: 'Risky',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    )
  }
};

export const SecurityBadge = React.forwardRef<HTMLDivElement, SecurityBadgeProps>(
  (
    {
      level,
      label,
      iconOnly = false,
      className,
      variant = 'soft',
      ...props
    },
    ref
  ) => {
    const config = levelConfig[level];

    return (
      <Badge
        ref={ref}
        color={config.color}
        variant={variant}
        className={cn(
          'flex items-center gap-1.5 font-medium',
          iconOnly ? 'p-1.5 rounded-full aspect-square justify-center' : '',
          className
        )}
        {...props}
      >
        <span className="shrink-0">{config.icon}</span>
        {!iconOnly && <span>{label || config.label}</span>}
      </Badge>
    );
  }
);

SecurityBadge.displayName = 'SecurityBadge';
