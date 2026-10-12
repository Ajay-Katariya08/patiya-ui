import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { Box } from '../Layout/Box';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  isLoaded?: boolean;
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, isLoaded = false, children, ...props }, ref) => {
    if (isLoaded) {
      return <>{children}</>;
    }

    return (
      <Box
        ref={ref}
        className={cn('animate-pulse bg-[var(--patiya-color-muted)] rounded-md', className)}
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';
