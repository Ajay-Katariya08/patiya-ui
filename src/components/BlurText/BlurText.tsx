import React, { useEffect, useState } from 'react';
import { cn } from '../../utils/cn';

export interface BlurTextProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  delay?: number;
  duration?: number;
}

export const BlurText = React.forwardRef<HTMLDivElement, BlurTextProps>(
  ({ 
    text, 
    delay = 0,
    duration = 1.5,
    className, 
    ...props 
  }, ref) => {
    
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => {
        setMounted(true);
      }, delay);
      return () => clearTimeout(timer);
    }, [delay]);

    return (
      <div 
        ref={ref}
        className={cn("inline-block", className)} 
        {...props}
      >
        <span
          className={cn(
            "inline-block transition-all ease-out",
            mounted ? "blur-0 opacity-100 scale-100" : "blur-xl opacity-0 scale-110"
          )}
          style={{ transitionDuration: `${duration}s` }}
        >
          {text}
        </span>
      </div>
    );
  }
);

BlurText.displayName = 'BlurText';
