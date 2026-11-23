"use client";
import React, { createContext, useContext, useRef, useState, useCallback, useEffect } from 'react';
import { cn } from '../../utils/cn';

export type DockDirection = 'top' | 'bottom' | 'middle';

export type DockProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  magnification?: number;
  distance?: number;
  direction?: DockDirection;
  baseSize?: number;
};

type DockContextValue = {
  mouseX: number | null;
  magnification: number;
  distance: number;
  baseSize: number;
};

const DockContext = createContext<DockContextValue>({
  mouseX: null,
  magnification: 64,
  distance: 140,
  baseSize: 40,
});

export const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      children,
      magnification = 64,
      distance = 140,
      direction = 'bottom',
      baseSize = 40,
      ...props
    },
    ref
  ) => {
    const [mouseX, setMouseX] = useState<number | null>(null);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      setMouseX(e.clientX);
    }, []);

    const handleMouseLeave = useCallback(() => {
      setMouseX(null);
    }, []);

    const directionClasses: Record<DockDirection, string> = {
      top: 'items-start',
      middle: 'items-center',
      bottom: 'items-end',
    };

    return (
      <DockContext.Provider value={{ mouseX, magnification, distance, baseSize }}>
        <div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn(
            'inline-flex gap-3 p-3 rounded-2xl bg-black/5 dark:bg-neutral-900/80 border border-black/10 dark:border-white/15 shadow-xl backdrop-blur-2xl transition-all',
            directionClasses[direction],
            className
          )}
          {...props}
        >
          {children}
        </div>
      </DockContext.Provider>
    );
  }
);
Dock.displayName = 'Dock';

export type DockItemProps = React.HTMLAttributes<HTMLDivElement> & {
  magnification?: number;
  distance?: number;
  baseSize?: number;
  label?: string;
  active?: boolean;
};

export const DockItem = React.forwardRef<HTMLDivElement, DockItemProps>(
  (
    {
      className,
      children,
      magnification: propMag,
      distance: propDist,
      baseSize: propBase,
      label,
      active = false,
      ...props
    },
    ref
  ) => {
    const context = useContext(DockContext);
    const itemRef = useRef<HTMLDivElement>(null);

    const base = propBase ?? context.baseSize ?? 40;
    const mag = propMag ?? context.magnification ?? 64;
    const dist = propDist ?? context.distance ?? 140;
    const mouseX = context.mouseX;

    const [size, setSize] = useState(base);

    useEffect(() => {
      if (!itemRef.current || mouseX === null) {
        setSize(base);
        return;
      }

      const rect = itemRef.current.getBoundingClientRect();
      const itemCenterX = rect.left + rect.width / 2;
      const d = Math.abs(mouseX - itemCenterX);

      if (d < dist) {
        const factor = Math.cos((d / dist) * (Math.PI / 2));
        const newSize = base + (mag - base) * factor;
        setSize(Math.round(newSize * 10) / 10);
      } else {
        setSize(base);
      }
    }, [mouseX, base, mag, dist]);

    return (
      <div className="relative group inline-flex flex-col items-center">
        {label && (
          <div className="absolute -top-8 px-2 py-0.5 rounded-md text-[11px] font-medium bg-[var(--patiya-color-foreground)] text-[var(--patiya-color-background)] shadow-md pointer-events-none transition-all duration-150 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 whitespace-nowrap z-30">
            {label}
          </div>
        )}
        <div
          ref={(node) => {
            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
            (itemRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          }}
          style={{ width: `${size}px`, height: `${size}px` }}
          className={cn(
            'flex items-center justify-center rounded-2xl bg-white dark:bg-neutral-800 text-[var(--patiya-color-foreground)] border border-black/10 dark:border-white/15 shadow-sm hover:shadow-md hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-all duration-75 ease-out cursor-pointer select-none active:scale-95',
            className
          )}
          {...props}
        >
          {children}
        </div>
        {active && (
          <span className="w-1 h-1 rounded-full bg-[var(--patiya-color-primary)] mt-1 absolute -bottom-2" />
        )}
      </div>
    );
  }
);
DockItem.displayName = 'DockItem';
