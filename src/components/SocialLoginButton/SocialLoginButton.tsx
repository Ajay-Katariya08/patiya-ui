import React from 'react';
import { cn } from '../../utils/cn';
import { Button, ButtonProps } from '../Button/Button';

export type SocialProvider = 'google' | 'apple' | 'github' | 'facebook' | 'twitter' | 'microsoft';

export interface SocialLoginButtonProps extends Omit<ButtonProps, 'children'> {
  /** The social provider to use for the icon and brand color */
  provider: SocialProvider;
  /** Custom text to display (defaults to "Continue with [Provider]") */
  text?: string;
  /** Whether to show only the icon */
  iconOnly?: boolean;
}

const providerConfig: Record<SocialProvider, { name: string; icon: React.ReactNode; color?: string; bg?: string; text?: string; hover?: string }> = {
  google: {
    name: 'Google',
    bg: 'bg-white',
    text: 'text-gray-700',
    hover: 'hover:bg-gray-50',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    )
  },
  apple: {
    name: 'Apple',
    bg: 'bg-black dark:bg-white',
    text: 'text-white dark:text-black',
    hover: 'hover:bg-gray-900 dark:hover:bg-gray-100',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.126 3.802 3.06 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.688.806-1.364 2.26-1.182 3.637 1.35.104 2.623-.61 3.468-1.625z"/>
      </svg>
    )
  },
  github: {
    name: 'GitHub',
    bg: 'bg-[#24292F] dark:bg-white',
    text: 'text-white dark:text-[#24292F]',
    hover: 'hover:bg-[#24292F]/90 dark:hover:bg-gray-100',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
      </svg>
    )
  },
  facebook: {
    name: 'Facebook',
    bg: 'bg-[#1877F2]',
    text: 'text-white',
    hover: 'hover:bg-[#1877F2]/90',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    )
  },
  twitter: {
    name: 'Twitter (X)',
    bg: 'bg-black',
    text: 'text-white',
    hover: 'hover:bg-gray-900',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    )
  },
  microsoft: {
    name: 'Microsoft',
    bg: 'bg-white',
    text: 'text-gray-700',
    hover: 'hover:bg-gray-50',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fill="#f35325" d="M1 1h10.5v10.5H1z"/>
        <path fill="#81bc06" d="M12.5 1H23v10.5H12.5z"/>
        <path fill="#05a6f0" d="M1 12.5h10.5V23H1z"/>
        <path fill="#ffba08" d="M12.5 12.5H23V23H12.5z"/>
      </svg>
    )
  },
};

export const SocialLoginButton = React.forwardRef<HTMLButtonElement, SocialLoginButtonProps>(
  (
    {
      provider,
      text,
      iconOnly = false,
      className,
      variant = 'outline',
      ...props
    },
    ref
  ) => {
    const config = providerConfig[provider];
    
    // We apply custom brand colors only if variant is not ghost or solid (which uses theme colors)
    // Actually, solid variant for social buttons usually uses brand colors.
    // Let's implement brand colors when variant is 'solid', otherwise fallback to default button styles
    
    let buttonClassName = '';
    if (variant === 'solid') {
      buttonClassName = cn(
        config.bg,
        config.text,
        config.hover,
        'border border-transparent'
      );
      if (provider === 'google' || provider === 'microsoft') {
        buttonClassName = cn(buttonClassName, 'border-gray-200 dark:border-gray-300 dark:bg-white dark:hover:bg-gray-100');
      }
    }

    return (
      <Button
        ref={ref}
        variant={variant === 'solid' ? 'outline' : variant} // Override underlying variant to outline if solid, then apply custom brand classes
        className={cn(
          'w-full flex items-center justify-center gap-3',
          iconOnly ? 'w-10 h-10 p-0 aspect-square' : '',
          variant === 'solid' ? buttonClassName : '',
          className
        )}
        {...props}
      >
        {config.icon}
        {!iconOnly && <span>{text || `Continue with ${config.name}`}</span>}
      </Button>
    );
  }
);

SocialLoginButton.displayName = 'SocialLoginButton';
