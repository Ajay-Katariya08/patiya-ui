import React from 'react';
import { cn } from '../../utils/cn';
import { Box } from '../Layout/Box';
import { Avatar } from '../Avatar/Avatar';
import { Badge } from '../Badge/Badge';

export interface UserButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** User's name */
  name: string;
  /** User's email */
  email?: string;
  /** URL for the avatar image */
  avatarUrl?: string;
  /** Initials for fallback if no avatar image */
  initials?: string;
  /** User role (e.g., "Admin", "Pro") */
  role?: string;
  /** Whether the button should be collapsed to just show the avatar */
  collapsed?: boolean;
}

export const UserButton = React.forwardRef<HTMLButtonElement, UserButtonProps>(
  (
    {
      name,
      email,
      avatarUrl,
      initials,
      role,
      collapsed = false,
      className,
      ...props
    },
    ref
  ) => {
    // Generate initials from name if not provided
    const getInitials = () => {
      if (initials) return initials;
      return name
        .split(' ')
        .map(n => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
    };

    return (
      <button
        ref={ref}
        className={cn(
          'flex items-center gap-3 rounded-lg text-left transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--patiya-color-primary)]/20',
          collapsed ? 'p-1 hover:bg-[var(--patiya-color-muted)]' : 'p-2 hover:bg-[var(--patiya-color-muted)] w-full',
          className
        )}
        {...props}
      >
        <Avatar
          src={avatarUrl}
          initials={getInitials()}
          size={collapsed ? 'md' : 'sm'}
          className={cn(
            'shrink-0',
            !avatarUrl ? 'bg-[var(--patiya-color-primary)] text-[var(--patiya-color-primary-foreground)]' : ''
          )}
        />
        
        {!collapsed && (
          <Box className="flex flex-col flex-1 min-w-0 overflow-hidden">
            <Box className="flex items-center justify-between gap-2">
              <span className="text-sm font-medium text-[var(--patiya-color-foreground)] truncate">
                {name}
              </span>
              {role && (
                <Badge variant="soft" color="primary" size="sm" className="px-1.5 py-0 text-[10px] uppercase">
                  {role}
                </Badge>
              )}
            </Box>
            {email && (
              <span className="text-xs text-[var(--patiya-color-muted-foreground)] truncate">
                {email}
              </span>
            )}
          </Box>
        )}
        
        {!collapsed && (
          <svg className="w-4 h-4 text-[var(--patiya-color-muted-foreground)] shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 6 9 12 15 18"/>
          </svg>
        )}
      </button>
    );
  }
);

UserButton.displayName = 'UserButton';
