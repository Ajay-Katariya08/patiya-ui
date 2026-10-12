import React from 'react';
import { cn } from '../../utils/cn';

export interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
}

export const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      shimmerColor = '#ffffff',
      shimmerSize = '0.05em',
      shimmerDuration = '3s',
      borderRadius = '100px',
      background = 'var(--patiya-color-primary)',
      className,
      children,
      style,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        style={
          {
            '--shimmer-color': shimmerColor,
            '--shimmer-size': shimmerSize,
            '--shimmer-duration': shimmerDuration,
            '--border-radius': borderRadius,
            '--bg': background,
            borderRadius: borderRadius,
            ...style,
          } as React.CSSProperties
        }
        className={cn(
          "group relative flex cursor-pointer overflow-hidden whitespace-nowrap px-6 py-3 text-white transition-all duration-300",
          "active:scale-95 disabled:pointer-events-none disabled:opacity-50",
          className,
        )}
        {...props}
      >
        <div 
          className="absolute inset-0 -z-20 w-full h-full bg-[var(--bg)]"
          style={{ borderRadius: 'var(--border-radius)' }} 
        />
        
        {/* Shimmer effect via conic-gradient spinning */}
        <div 
          className="absolute inset-0 -z-10 w-full h-full animate-[spin_var(--shimmer-duration)_linear_infinite]"
        >
          <div 
            className="absolute -inset-[100%] top-1/2 left-1/2 h-[200%] w-[200%] -translate-x-1/2 -translate-y-1/2"
            style={{
              background: `conic-gradient(from 0deg, transparent 0 340deg, var(--shimmer-color) 360deg)`,
            }}
          />
        </div>

        {/* Inner background block to hide the center of the conic gradient, leaving only the border */}
        <div 
          className="absolute inset-[var(--shimmer-size)] -z-10 bg-[var(--bg)] transition-colors duration-300"
          style={{ borderRadius: 'calc(var(--border-radius) - var(--shimmer-size))' }} 
        />

        <div className="relative z-10 font-medium">
          {children}
        </div>
      </button>
    );
  },
);

ShimmerButton.displayName = 'ShimmerButton';
