import React from 'react';
import { cn } from '../../utils/cn';

export interface BorderBeamProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
}

export const BorderBeam = React.forwardRef<HTMLDivElement, BorderBeamProps>(
  ({ 
    className, 
    size = 200, 
    duration = 15,
    delay = 0,
    colorFrom = '#0ea5e9', // sky-500
    colorTo = '#8b5cf6', // violet-500
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent]", className)}
        style={{
          "--border-width": "2",
          "--size": size,
          "--duration": duration,
          "--delay": delay,
          "--color-from": colorFrom,
          "--color-to": colorTo,
        } as React.CSSProperties}
        {...props}
      >
        <div 
          className="absolute inset-0 rounded-[inherit] [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]"
        >
          <div 
            className="absolute aspect-square bg-gradient-to-l from-[var(--color-from)] via-[var(--color-to)] to-transparent"
            style={{
              width: "var(--size)",
              offsetPath: "rect(0 auto auto 0 round var(--size))",
              animation: "borderBeam calc(var(--duration)*1s) linear calc(var(--delay)*1s) infinite",
            }}
          />
        </div>
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes borderBeam {
            0% { offset-distance: 0%; }
            100% { offset-distance: 100%; }
          }
        `}} />
      </div>
    );
  }
);

BorderBeam.displayName = 'BorderBeam';
