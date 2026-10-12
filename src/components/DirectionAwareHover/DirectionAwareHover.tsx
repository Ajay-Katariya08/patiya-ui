import React, { useRef, useState } from 'react';
import { cn } from '../../utils/cn';

export interface DirectionAwareHoverProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  children: React.ReactNode;
  overlayClassName?: string;
  imageClassName?: string;
}

export const DirectionAwareHover = React.forwardRef<HTMLDivElement, DirectionAwareHoverProps>(
  ({ className, imageUrl, children, overlayClassName, imageClassName, ...props }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [direction, setDirection] = useState<'top' | 'right' | 'bottom' | 'left'>('left');
    const [isHovered, setIsHovered] = useState(false);

    const getDirection = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return 'left';
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Calculate angle and convert to 4 directions (0: top, 1: right, 2: bottom, 3: left)
      const angle = Math.atan2(y, x);
      let directionIndex = Math.round((angle * 180 / Math.PI + 180) / 90 + 3) % 4;

      const directions: ('top' | 'right' | 'bottom' | 'left')[] = ['top', 'right', 'bottom', 'left'];
      return directions[directionIndex];
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      setDirection(getDirection(e));
      setIsHovered(true);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      setDirection(getDirection(e));
      setIsHovered(false);
    };

    // Calculate exit translation
    const getExitTransform = () => {
      switch (direction) {
        case 'top': return 'translateY(-100%)';
        case 'bottom': return 'translateY(100%)';
        case 'left': return 'translateX(-100%)';
        case 'right': return 'translateX(100%)';
        default: return 'translateX(-100%)';
      }
    };

    return (
      <div
        ref={(node) => {
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
          // @ts-ignore
          containerRef.current = node;
        }}
        className={cn(
          "relative overflow-hidden rounded-2xl w-full h-full cursor-pointer group isolate [mask-image:radial-gradient(white,black)]",
          className
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <div className="absolute inset-0 z-0 transition-transform duration-500 ease-out group-hover:scale-110">
          <img
            src={imageUrl}
            alt="Background"
            className={cn("w-full h-full object-cover", imageClassName)}
          />
        </div>

        <div
          className={cn(
            "absolute inset-0 z-10 bg-black/60 backdrop-blur-sm flex flex-col justify-end p-6 transition-all duration-300 ease-out",
            overlayClassName
          )}
          style={{
            transform: isHovered ? 'translate(0, 0)' : getExitTransform(),
            opacity: isHovered ? 1 : 0.5
          }}
        >
          <div
            className="transition-opacity duration-300 ease-out delay-100"
            style={{ opacity: isHovered ? 1 : 0 }}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
);

DirectionAwareHover.displayName = 'DirectionAwareHover';
