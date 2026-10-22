'use client';

import React, { useState } from 'react';
import { cn } from '../../utils/cn';

export type TooltipItem = {
  id: number | string;
  name: string;
  designation?: string;
  image: string;
  badge?: string;
};

export type AnimatedTooltipProps = {
  items: TooltipItem[];
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  overlap?: boolean;
};

export const AnimatedTooltip = ({
  items,
  className,
  size = 'md',
  overlap = true,
}: AnimatedTooltipProps) => {
  const [hoveredId, setHoveredId] = useState<number | string | null>(null);
  const [xOffset, setXOffset] = useState(0);

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-11 h-11 text-sm',
    lg: 'w-14 h-14 text-base',
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const halfWidth = e.currentTarget.offsetWidth / 2;
    setXOffset(e.nativeEvent.offsetX - halfWidth);
  };

  return (
    <div className={cn('flex flex-row items-center justify-center py-4', className)}>
      {items.map((item) => {
        const isHovered = hoveredId === item.id;
        return (
          <div
            key={item.id}
            className={cn(
              'relative group cursor-pointer transition-all duration-200',
              overlap && '-mr-3.5 hover:mr-1'
            )}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => {
              setHoveredId(null);
              setXOffset(0);
            }}
            onMouseMove={handleMouseMove}
          >
            {isHovered && (
              <div
                style={{
                  transform: `translateX(${xOffset * 0.45}px) rotate(${xOffset * 0.08}deg)`,
                }}
                className="absolute -top-14 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center justify-center whitespace-nowrap pointer-events-none transition-transform duration-75 ease-out"
              >
                <div className="flex flex-col items-center justify-center rounded-xl bg-neutral-900/95 dark:bg-neutral-100/95 text-white dark:text-neutral-900 px-3.5 py-1.5 shadow-2xl backdrop-blur-md border border-white/10 dark:border-black/10">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold leading-tight">{item.name}</span>
                    {item.badge && (
                      <span className="rounded-full bg-[var(--patiya-color-primary)] px-1.5 py-0.2 text-[9px] font-semibold text-white">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  {item.designation && (
                    <span className="text-[10px] text-neutral-300 dark:text-neutral-600 font-medium leading-tight mt-0.5">
                      {item.designation}
                    </span>
                  )}
                </div>
                <div className="w-2.5 h-2.5 bg-neutral-900/95 dark:bg-neutral-100/95 rotate-45 -mt-1 border-r border-b border-white/10 dark:border-black/10" />
              </div>
            )}
            <img
              src={item.image}
              alt={item.name}
              className={cn(
                'object-cover rounded-full border-2 border-[var(--patiya-color-background)] shadow-md transition-all duration-300 group-hover:scale-125 group-hover:z-30 relative group-hover:border-[var(--patiya-color-primary)]',
                sizeClasses[size],
                isHovered ? 'z-30 shadow-xl' : 'z-10'
              )}
            />
          </div>
        );
      })}
    </div>
  );
};
