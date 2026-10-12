import React, { useState, useEffect } from 'react';
import { cn } from '../../utils/cn';

export interface TypewriterTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  speed?: number;
  delay?: number;
  cursor?: boolean;
  onComplete?: () => void;
  as?: React.ElementType;
}

export const TypewriterText = React.forwardRef<HTMLElement, TypewriterTextProps>(
  ({ className, text, speed = 30, delay = 0, cursor = true, onComplete, as: Component = 'span', ...props }, ref) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isComplete, setIsComplete] = useState(false);
    const [isStarted, setIsStarted] = useState(false);

    useEffect(() => {
      // Reset state if text changes
      setDisplayedText('');
      setIsComplete(false);
      setIsStarted(false);

      const startTimeout = setTimeout(() => {
        setIsStarted(true);
      }, delay);

      return () => clearTimeout(startTimeout);
    }, [text, delay]);

    useEffect(() => {
      if (!isStarted) return;

      let currentIndex = 0;
      let interval: ReturnType<typeof setInterval>;

      const typeNextChar = () => {
        if (currentIndex < text.length) {
          setDisplayedText((prev) => prev + text.charAt(currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
          setIsComplete(true);
          onComplete?.();
        }
      };

      interval = setInterval(typeNextChar, speed);

      return () => clearInterval(interval);
    }, [isStarted, text, speed, onComplete]);

    return (
      <Component ref={ref} className={cn("inline-block", className)} {...props}>
        {displayedText}
        {cursor && (!isComplete || isStarted) && (
          <span 
            className={cn(
              "inline-block w-1.5 h-[1em] ml-0.5 align-middle bg-[var(--patiya-color-primary)]",
              isComplete ? "animate-pulse opacity-0 duration-1000" : "animate-pulse opacity-100"
            )}
          />
        )}
      </Component>
    );
  }
);

TypewriterText.displayName = 'TypewriterText';
