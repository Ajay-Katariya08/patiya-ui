import React, { useRef, useState, useCallback } from 'react';
import { cn } from '../../utils/cn';

export type HoloFoil = 'rainbow' | 'cosmic' | 'gold' | 'neon' | 'silver';

export type HoloCardProps = React.HTMLAttributes<HTMLDivElement> & {
  foil?: HoloFoil;
  glare?: boolean;
  glareOpacity?: number;
  maxTilt?: number;
  perspective?: number;
  sparkles?: boolean;
};

export const HoloCard = React.forwardRef<HTMLDivElement, HoloCardProps>(
  (
    {
      className,
      foil = 'rainbow',
      glare = true,
      glareOpacity = 0.5,
      maxTilt = 18,
      perspective = 1000,
      sparkles = true,
      children,
      onMouseMove,
      onMouseLeave,
      ...props
    },
    forwardedRef
  ) => {
    const internalRef = useRef<HTMLDivElement>(null);
    const cardRef = (forwardedRef as React.RefObject<HTMLDivElement>) || internalRef;

    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
    const [foilAngle, setFoilAngle] = useState(135);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const clientX = e.clientX - rect.left;
        const clientY = e.clientY - rect.top;

        const xPct = (clientX / rect.width) * 100;
        const yPct = (clientY / rect.height) * 100;

        const tiltX = ((yPct - 50) / 50) * -maxTilt;
        const tiltY = ((xPct - 50) / 50) * maxTilt;

        const rad = Math.atan2(yPct - 50, xPct - 50);
        const deg = (rad * 180) / Math.PI + 90;

        setTilt({ x: tiltX, y: tiltY });
        setGlarePos({ x: xPct, y: yPct, opacity: glareOpacity });
        setFoilAngle(deg);
        setIsHovered(true);

        onMouseMove?.(e);
      },
      [cardRef, glareOpacity, maxTilt, onMouseMove]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        setTilt({ x: 0, y: 0 });
        setGlarePos((prev) => ({ ...prev, opacity: 0 }));
        setIsHovered(false);
        onMouseLeave?.(e);
      },
      [onMouseLeave]
    );

    const foilGradients: Record<HoloFoil, string> = {
      rainbow:
        'linear-gradient(var(--foil-angle, 135deg), rgba(255,0,128,0.3) 0%, rgba(255,165,0,0.3) 20%, rgba(255,255,0,0.3) 40%, rgba(0,255,128,0.3) 60%, rgba(0,191,255,0.3) 80%, rgba(138,43,226,0.3) 100%)',
      cosmic:
        'linear-gradient(var(--foil-angle, 135deg), rgba(168,85,247,0.35) 0%, rgba(59,130,246,0.35) 35%, rgba(236,72,153,0.35) 70%, rgba(99,102,241,0.35) 100%)',
      gold:
        'linear-gradient(var(--foil-angle, 135deg), rgba(245,158,11,0.4) 0%, rgba(253,230,138,0.5) 30%, rgba(217,119,6,0.4) 60%, rgba(251,191,36,0.5) 100%)',
      neon:
        'linear-gradient(var(--foil-angle, 135deg), rgba(6,182,212,0.4) 0%, rgba(16,185,129,0.35) 33%, rgba(236,72,153,0.4) 66%, rgba(139,92,246,0.4) 100%)',
      silver:
        'linear-gradient(var(--foil-angle, 135deg), rgba(255,255,255,0.45) 0%, rgba(203,213,225,0.2) 25%, rgba(255,255,255,0.5) 50%, rgba(148,163,184,0.2) 75%, rgba(255,255,255,0.45) 100%)',
    };

    return (
      <div
        style={{ perspective: `${perspective}px` }}
        className="relative flex justify-center w-full"
      >
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={
            {
              '--foil-angle': `${foilAngle}deg`,
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transformStyle: 'preserve-3d',
              transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
            } as React.CSSProperties
          }
          className={cn(
            'group relative overflow-hidden mx-auto rounded-2xl border border-[var(--patiya-color-border)]/80 bg-[var(--patiya-color-card)]/90 backdrop-blur-xl shadow-xl transition-shadow duration-300 hover:shadow-2xl hover:border-[var(--patiya-color-primary)]/40',
            className
          )}
          {...props}
        >
          <div
            aria-hidden="true"
            style={{
              background: foilGradients[foil],
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.4s ease',
              mixBlendMode: 'color-dodge',
            }}
            className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
          />

          {glare && (
            <div
              aria-hidden="true"
              style={{
                background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.65) 0%, rgba(255, 255, 255, 0) 65%)`,
                opacity: glarePos.opacity,
                transition: isHovered ? 'opacity 0.15s ease' : 'opacity 0.4s ease',
                mixBlendMode: 'overlay',
              }}
              className="pointer-events-none absolute inset-0 z-20"
            />
          )}

          {sparkles && isHovered && (
            <div
              aria-hidden="true"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.8) 1px, transparent 1px), radial-gradient(circle at 80% 40%, rgba(255,255,255,0.7) 1.5px, transparent 1.5px), radial-gradient(circle at 40% 80%, rgba(255,255,255,0.8) 1px, transparent 1px), radial-gradient(circle at 70% 85%, rgba(255,255,255,0.6) 1.5px, transparent 1.5px)',
                backgroundSize: '80px 80px',
              }}
              className="pointer-events-none absolute inset-0 z-15 opacity-40 animate-pulse"
            />
          )}

          <div
            style={{ transform: 'translateZ(26px)', transformStyle: 'preserve-3d' }}
            className="relative z-30 h-full w-full"
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
);

HoloCard.displayName = 'HoloCard';
