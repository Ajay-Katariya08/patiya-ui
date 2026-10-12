import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { ButtonProps, Button } from './Button';

export type IconButtonProps = Omit<ButtonProps, 'leftIcon' | 'rightIcon'> & {
  icon: React.ReactNode;
  'aria-label': string; // Required for accessibility
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, size = 'md', className, ...props }, ref) => {
    
    const sizeClasses = {
      xs: 'w-7 h-7 p-0',
      sm: 'w-8 h-8 p-0',
      md: 'w-10 h-10 p-0',
      lg: 'w-12 h-12 p-0',
      xl: 'w-14 h-14 p-0',
    };

    return (
      <Button
        ref={ref}
        size={size}
        className={cn(sizeClasses[size], className)}
        {...props}
      >
        {icon}
      </Button>
    );
  }
);

IconButton.displayName = 'IconButton';
