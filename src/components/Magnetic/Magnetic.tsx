import React, { useRef, useState } from 'react';
import { cn } from '../../utils/cn';

export interface MagneticProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  intensity?: number;
  range?: number;
}

export const Magnetic = React.forwardRef<HTMLDivElement, MagneticProps>(
  ({ children, className, intensity = 0.5, range = 100, ...props }, ref) => {
    const defaultRef = useRef<HTMLDivElement>(null);
    const containerRef = (ref as React.RefObject<HTMLDivElement>) || defaultRef;
    
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      
      if (distance < range) {
        setPosition({
          x: distanceX * intensity,
          y: distanceY * intensity
        });
      } else {
        setPosition({ x: 0, y: 0 });
      }
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    return (
      <div
        ref={containerRef}
        className={cn("relative inline-block cursor-pointer", className)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <div
          className="transition-transform duration-300 ease-out"
          style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
        >
          {children}
        </div>
      </div>
    );
  }
);

Magnetic.displayName = 'Magnetic';
