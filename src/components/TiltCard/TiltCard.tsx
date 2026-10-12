import React, { useRef, useState, useCallback } from 'react';
import { cn } from '../../utils/cn';

export interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum rotation angle in degrees */
  tiltMaxAngleX?: number;
  tiltMaxAngleY?: number;
  /** Perspective in pixels */
  perspective?: number;
  /** Glare effect opacity (0 to 1) */
  glareOpacity?: number;
  /** Disable tilt effect */
  disabled?: boolean;
  /** Class name for the inner card element */
  cardClassName?: string;
}

export const TiltCard = React.forwardRef<HTMLDivElement, TiltCardProps>(
  (
    {
      className,
      children,
      tiltMaxAngleX = 20,
      tiltMaxAngleY = 20,
      perspective = 1000,
      glareOpacity = 0.5,
      disabled = false,
      cardClassName,
      style,
      ...props
    },
    ref
  ) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
    const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (disabled || !cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Calculate rotation (center is 0,0)
        const rotateY = ((mouseX / width) * 2 - 1) * tiltMaxAngleY;
        const rotateX = ((mouseY / height) * -2 + 1) * tiltMaxAngleX;

        // Calculate glare position
        const glareX = (mouseX / width) * 100;
        const glareY = (mouseY / height) * 100;

        setTilt({ rotateX, rotateY });
        setGlare({ x: glareX, y: glareY, opacity: glareOpacity });
      },
      [disabled, tiltMaxAngleX, tiltMaxAngleY, glareOpacity]
    );

    const handleMouseEnter = useCallback(() => {
      if (disabled) return;
      setIsHovered(true);
    }, [disabled]);

    const handleMouseLeave = useCallback(() => {
      if (disabled) return;
      setIsHovered(false);
      setTilt({ rotateX: 0, rotateY: 0 });
      setGlare((prev) => ({ ...prev, opacity: 0 }));
    }, [disabled]);

    const transitionStyle = isHovered
      ? 'transform 0.1s cubic-bezier(0.03, 0.98, 0.52, 0.99)'
      : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.5s ease';

    return (
      <div
        ref={(node) => {
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
          // @ts-ignore
          cardRef.current = node;
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn("relative group", className)}
        style={{
          perspective: `${perspective}px`,
          ...style,
        }}
        {...props}
      >
        <div
          className={cn(
            "relative h-full w-full rounded-xl overflow-hidden bg-[var(--patiya-color-card)] border border-[var(--patiya-color-border)] shadow-sm will-change-transform",
            "transition-transform duration-200", // fallback if JS is disabled
            cardClassName
          )}
          style={{
            transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
            transformStyle: 'preserve-3d',
            transition: transitionStyle,
          }}
        >
          {/* Glare effect layer */}
          <div
            className="absolute inset-0 pointer-events-none mix-blend-overlay z-50 rounded-xl"
            style={{
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}) 0%, rgba(255,255,255,0) 80%)`,
              transition: isHovered ? 'none' : 'opacity 0.5s ease',
            }}
          />
          
          {/* Content */}
          <div
            className="relative h-full w-full z-10"
            style={{ transform: 'translateZ(30px)' }} // 3D popup effect for content
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
);

TiltCard.displayName = 'TiltCard';
