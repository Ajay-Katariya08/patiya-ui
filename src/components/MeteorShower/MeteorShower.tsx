import React, { useEffect, useState } from 'react';
import { cn } from '../../utils/cn';

export interface MeteorShowerProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: number;
}

export const MeteorShower = React.forwardRef<HTMLDivElement, MeteorShowerProps>(
  ({ count = 20, className, ...props }, ref) => {
    const [meteors, setMeteors] = useState<Array<{ id: number; top: string; left: string; animationDelay: string; animationDuration: string }>>([]);

    useEffect(() => {
      const generatedMeteors = Array.from({ length: count }).map((_, idx) => ({
        id: idx,
        top: Math.floor(Math.random() * 100) + '%',
        left: Math.floor(Math.random() * 100) + '%',
        animationDelay: Math.random() * (0.8 - 0.2) + 0.2 + 's',
        animationDuration: Math.floor(Math.random() * (10 - 2) + 2) + 's',
      }));
      setMeteors(generatedMeteors);
    }, [count]);

    return (
      <div 
        ref={ref}
        className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}
        {...props}
      >
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes meteor {
            0% { transform: rotate(215deg) translateX(0); opacity: 1; }
            70% { opacity: 1; }
            100% { transform: rotate(215deg) translateX(-500px); opacity: 0; }
          }
        `}} />
        {meteors.map((meteor) => (
          <span
            key={meteor.id}
            className="absolute h-0.5 w-0.5 rounded-full bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg] animate-meteor"
            style={{
              top: meteor.top,
              left: meteor.left,
              animationDelay: meteor.animationDelay,
              animationDuration: meteor.animationDuration,
              animation: `meteor linear infinite`,
            }}
          >
            {/* Meteor Tail */}
            <div className="pointer-events-none absolute top-1/2 -z-10 h-[1px] w-[50px] -translate-y-1/2 bg-gradient-to-r from-slate-500 to-transparent" />
          </span>
        ))}
      </div>
    );
  }
);

MeteorShower.displayName = 'MeteorShower';
