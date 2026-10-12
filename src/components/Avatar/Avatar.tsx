import React, { useState } from 'react';
import { cn } from '../../utils/cn';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  initials?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'square';
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt = 'Avatar', initials, size = 'md', shape = 'circle', className, ...props }, ref) => {
    const [error, setError] = useState(false);

    const sizeClasses = {
      sm: 'w-8 h-8 text-xs',
      md: 'w-10 h-10 text-sm',
      lg: 'w-12 h-12 text-base',
      xl: 'w-16 h-16 text-xl',
    };

    const shapeClasses = {
      circle: 'rounded-full',
      square: 'rounded-xl',
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center overflow-hidden bg-[var(--patiya-color-muted)] text-(--patiya-color-muted-foreground) border border-[var(--patiya-color-border)] select-none",
          sizeClasses[size],
          shapeClasses[shape],
          className
        )}
        {...props}
      >
        {src && !error ? (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
            onError={() => setError(true)}
          />
        ) : (
          <span className="font-medium uppercase">{initials || alt.charAt(0)}</span>
        )}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";
