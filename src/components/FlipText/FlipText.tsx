import React from 'react';
import { cn } from '../../utils/cn';

export interface FlipTextProps extends React.HTMLAttributes<HTMLDivElement> {
  word: string;
  delayMultiple?: number;
  duration?: number;
}

export const FlipText = React.forwardRef<HTMLDivElement, FlipTextProps>(
  ({ 
    word, 
    delayMultiple = 0.08, 
    duration = 0.5,
    className, 
    ...props 
  }, ref) => {
    
    return (
      <div 
        ref={ref} 
        className={cn("flex justify-center space-x-0.5", className)}
        {...props}
      >
        {word.split("").map((char, i) => (
          <span
            key={i}
            className="inline-block origin-bottom animate-in fade-in slide-in-from-bottom-1/2"
            style={{
              animationDuration: `${duration}s`,
              animationDelay: `${i * delayMultiple}s`,
              animationFillMode: 'both',
              backfaceVisibility: 'hidden',
              transformStyle: 'preserve-3d',
            }}
          >
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes flipIn {
                0% { transform: rotateX(-90deg); opacity: 0; }
                100% { transform: rotateX(0deg); opacity: 1; }
              }
            `}} />
            <span style={{ animation: `flipIn ${duration}s ease-out ${i * delayMultiple}s both` }}>
              {char === " " ? "\u00A0" : char}
            </span>
          </span>
        ))}
      </div>
    );
  }
);

FlipText.displayName = 'FlipText';
