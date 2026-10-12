import React, { useRef, useState, useEffect } from 'react';
import { cn } from '../../utils/cn';

export interface DockProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  magnification?: number;
  distance?: number;
  direction?: 'top' | 'bottom' | 'middle';
}

export const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  ({ className, children, magnification = 60, distance = 140, direction = 'bottom', ...props }, ref) => {
    const mouseX = useRef<number | null>(null);
    const [_, setRender] = useState(0); // to force re-renders on mouse move

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      mouseX.current = e.pageX;
      setRender(prev => prev + 1);
    };

    const handleMouseLeave = () => {
      mouseX.current = null;
      setRender(prev => prev + 1);
    };

    return (
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "flex gap-4 p-4 rounded-2xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-black/20 backdrop-blur-lg items-end",
          className
        )}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              // @ts-ignore
              mouseX,
              magnification,
              distance
            });
          }
          return child;
        })}
      </div>
    );
  }
);
Dock.displayName = 'Dock';

export interface DockItemProps extends React.HTMLAttributes<HTMLDivElement> {
  mouseX?: React.MutableRefObject<number | null>;
  magnification?: number;
  distance?: number;
  baseSize?: number;
}

export const DockItem = React.forwardRef<HTMLDivElement, DockItemProps>(
  ({ className, children, mouseX, magnification = 60, distance = 140, baseSize = 40, ...props }, ref) => {
    const itemRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(baseSize);

    useEffect(() => {
      if (!itemRef.current || !mouseX || mouseX.current === null) {
        setWidth(baseSize);
        return;
      }

      const rect = itemRef.current.getBoundingClientRect();
      const itemCenterX = rect.left + rect.width / 2;
      
      const dist = Math.abs(mouseX.current - itemCenterX);
      
      if (dist < distance) {
        // Linear scaling based on distance
        const scale = 1 - dist / distance;
        const newWidth = baseSize + (magnification - baseSize) * scale;
        setWidth(newWidth);
      } else {
        setWidth(baseSize);
      }
    }, [mouseX?.current, baseSize, magnification, distance]);

    return (
      <div
        ref={(node) => {
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
          // @ts-ignore
          itemRef.current = node;
        }}
        style={{ width: `${width}px`, height: `${width}px` }}
        className={cn(
          "flex items-center justify-center rounded-full bg-white dark:bg-black shadow-sm transition-all duration-150 ease-out",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
DockItem.displayName = 'DockItem';
