import React, { useEffect, useState } from 'react';
import { cn } from '../../utils/cn';

export interface SparklesProps extends React.HTMLAttributes<HTMLDivElement> {
  particleCount?: number;
  particleColor?: string;
  speed?: 'slow' | 'medium' | 'fast';
}

export const Sparkles = React.forwardRef<HTMLDivElement, SparklesProps>(
  ({ 
    className, 
    particleCount = 50, 
    particleColor = '#FFF',
    speed = 'medium',
    ...props 
  }, ref) => {
    const [particles, setParticles] = useState<Array<{ id: number; left: string; top: string; size: number; delay: string; duration: string }>>([]);

    useEffect(() => {
      const generated = Array.from({ length: particleCount }).map((_, i) => {
        const size = Math.random() * 2 + 1;
        const left = Math.random() * 100 + '%';
        const top = Math.random() * 100 + '%';
        const delay = Math.random() * 5 + 's';
        
        let durationMin = 2;
        let durationMax = 4;
        if (speed === 'slow') { durationMin = 4; durationMax = 8; }
        if (speed === 'fast') { durationMin = 1; durationMax = 2; }
        
        const duration = Math.random() * (durationMax - durationMin) + durationMin + 's';

        return { id: i, left, top, size, delay, duration };
      });
      setParticles(generated);
    }, [particleCount, speed]);

    return (
      <div 
        ref={ref}
        className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
        {...props}
      >
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes sparkleFloat {
            0% { transform: translateY(0px) scale(0); opacity: 0; }
            50% { transform: translateY(-20px) scale(1); opacity: 1; }
            100% { transform: translateY(-40px) scale(0); opacity: 0; }
          }
        `}} />
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full"
            style={{
              backgroundColor: particleColor,
              width: p.size + 'px',
              height: p.size + 'px',
              left: p.left,
              top: p.top,
              animation: `sparkleFloat ${p.duration} linear infinite`,
              animationDelay: p.delay,
              boxShadow: `0 0 ${p.size * 2}px ${particleColor}`
            }}
          />
        ))}
      </div>
    );
  }
);

Sparkles.displayName = 'Sparkles';
