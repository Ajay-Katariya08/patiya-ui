import React from 'react';
import { cn } from '../../utils/cn';

export interface AuroraBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = React.forwardRef<HTMLDivElement, AuroraBackgroundProps>(
  ({ className, children, showRadialGradient = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative flex flex-col h-[100vh] items-center justify-center bg-zinc-50 dark:bg-zinc-900 text-slate-950 transition-bg",
          className
        )}
        {...props}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={cn(
              "absolute -inset-[10px] opacity-50",
              showRadialGradient &&
                "[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]",
              "pointer-events-none"
            )}
          >
            <div className="absolute inset-0 z-0 flex items-center justify-center bg-[var(--patiya-color-background)]">
              {/* Aurora Base Layer */}
              <div 
                className="absolute inset-0 bg-[length:300%_300%] bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 dark:from-blue-900 dark:via-indigo-900 dark:to-purple-900 mix-blend-multiply dark:mix-blend-color-dodge opacity-60 filter blur-[60px]"
                style={{
                  animation: 'aurora 15s ease infinite alternate'
                }}
              />
              {/* Aurora Highlights */}
              <div 
                className="absolute inset-0 bg-[length:300%_300%] bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-300 dark:from-cyan-900 dark:via-sky-900 dark:to-indigo-900 mix-blend-multiply dark:mix-blend-color-dodge opacity-40 filter blur-[90px]"
                style={{
                  animation: 'aurora 20s ease infinite alternate-reverse'
                }}
              />
            </div>
          </div>
        </div>
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes aurora {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}} />
        <div className="relative z-10 w-full">
          {children}
        </div>
      </div>
    );
  }
);

AuroraBackground.displayName = 'AuroraBackground';
