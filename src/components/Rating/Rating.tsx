import React, { forwardRef, useState } from 'react';
import { cn } from '../../utils/cn';

export interface RatingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: number;
  defaultValue?: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  color?: string; // Optional custom color
  readOnly?: boolean;
  onChange?: (value: number) => void;
  icon?: React.ReactNode;
  activeIcon?: React.ReactNode;
}

const DefaultStar = ({ active, sizeCls, color }: { active: boolean; sizeCls: string; color?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill={active ? (color || 'currentColor') : 'none'} 
    stroke={active ? (color || 'currentColor') : 'currentColor'} 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={cn(sizeCls, active ? 'text-yellow-400' : 'text-[var(--patiya-color-muted)]')}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export const Rating = forwardRef<HTMLDivElement, RatingProps>(
  ({ 
    value, 
    defaultValue = 0, 
    max = 5, 
    size = 'md', 
    color,
    readOnly = false, 
    onChange, 
    icon, 
    activeIcon, 
    className, 
    ...props 
  }, ref) => {
    const [hoverValue, setHoverValue] = useState<number | null>(null);
    const [internalValue, setInternalValue] = useState<number>(defaultValue);

    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;

    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-6 h-6',
      lg: 'w-8 h-8',
    };

    const handleMouseEnter = (index: number) => {
      if (!readOnly) setHoverValue(index);
    };

    const handleMouseLeave = () => {
      if (!readOnly) setHoverValue(null);
    };

    const handleClick = (index: number) => {
      if (!readOnly) {
        if (!isControlled) setInternalValue(index);
        onChange?.(index);
      }
    };

    return (
      <div 
        ref={ref} 
        className={cn('flex items-center gap-1', !readOnly && 'cursor-pointer', className)} 
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {Array.from({ length: max }).map((_, i) => {
          const itemValue = i + 1;
          const isActive = hoverValue !== null ? itemValue <= hoverValue : itemValue <= currentValue;
          
          return (
            <div
              key={i}
              className={cn("transition-transform", !readOnly && "hover:scale-110 active:scale-95")}
              onMouseEnter={() => handleMouseEnter(itemValue)}
              onClick={() => handleClick(itemValue)}
            >
              {isActive 
                ? (activeIcon || icon || <DefaultStar active={true} sizeCls={sizeClasses[size]} color={color} />) 
                : (icon || <DefaultStar active={false} sizeCls={sizeClasses[size]} color={color} />)}
            </div>
          );
        })}
      </div>
    );
  }
);

Rating.displayName = 'Rating';
