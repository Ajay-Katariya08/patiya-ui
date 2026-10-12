import React, { useRef, useState } from 'react';
import { cn } from '../../utils/cn';

export type SpotlightColorType = 'primary' | 'secondary' | 'accent' | 'destructive' | 'success' | 'warning' | 'info' | 'spotlight' | (string & {});

export interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  spotlightColor?: SpotlightColorType;
  spotlightSize?: number;
}

const colorMap: Record<string, string> = {
  primary: 'color-mix(in srgb, var(--patiya-color-primary) 15%, transparent)',
  secondary: 'color-mix(in srgb, var(--patiya-color-secondary) 15%, transparent)',
  accent: 'color-mix(in srgb, var(--patiya-color-accent) 15%, transparent)',
  destructive: 'color-mix(in srgb, var(--patiya-color-destructive) 15%, transparent)',
  success: 'color-mix(in srgb, var(--patiya-color-success) 15%, transparent)',
  warning: 'color-mix(in srgb, var(--patiya-color-warning) 15%, transparent)',
  info: 'color-mix(in srgb, var(--patiya-color-info) 15%, transparent)',
  spotlight: 'var(--patiya-spotlight-color)',
};

export const SpotlightCard = React.forwardRef<HTMLDivElement, SpotlightCardProps>(
  ({ className, children, spotlightColor = 'spotlight', spotlightSize = 250, ...props }, ref) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!divRef.current || isFocused) return;
      const rect = divRef.current.getBoundingClientRect();
      setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleFocus = () => {
      setIsFocused(true);
      setOpacity(1);
    };

    const handleBlur = () => {
      setIsFocused(false);
      setOpacity(0);
    };

    const handleMouseEnter = () => {
      setOpacity(1);
    };

    const handleMouseLeave = () => {
      setOpacity(0);
    };

    const computedColor = colorMap[spotlightColor as string] || spotlightColor;

    return (
      <div
        ref={(node) => {
          // merge refs
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
          // @ts-ignore
          divRef.current = node;
        }}
        onMouseMove={handleMouseMove}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "relative overflow-hidden rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] transition-colors p-6 shadow-sm",
          className
        )}
        {...props}
      >
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 ease-in-out"
          style={{
            opacity,
            background: `radial-gradient(${spotlightSize}px circle at ${position.x}px ${position.y}px, ${computedColor}, transparent 100%)`,
          }}
        />
        <div className="relative z-10 h-full w-full">{children}</div>
      </div>
    );
  }
);

SpotlightCard.displayName = 'SpotlightCard';
