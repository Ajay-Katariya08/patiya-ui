import React, { useState, useEffect } from 'react';
import { cn } from '../../utils/cn';

export interface TypingTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  speed?: number;
  cursor?: string;
  cursorClassName?: string;
  delay?: number;
  loop?: boolean;
}

export const TypingText = React.forwardRef<HTMLSpanElement, TypingTextProps>(
  ({ 
    text, 
    speed = 50, 
    cursor = '|', 
    cursorClassName,
    delay = 0,
    loop = false,
    className, 
    ...props 
  }, ref) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isComplete, setIsComplete] = useState(false);
    
    useEffect(() => {
      let timeout: ReturnType<typeof setTimeout>;
      let currentIndex = 0;
      let isCancelled = false;
      
      const typeNextChar = () => {
        if (isCancelled) return;
        
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
          timeout = setTimeout(typeNextChar, speed + (Math.random() * 30));
        } else {
          setIsComplete(true);
          if (loop) {
            timeout = setTimeout(() => {
              if (!isCancelled) {
                setDisplayedText('');
                setIsComplete(false);
                currentIndex = 0;
                typeNextChar();
              }
            }, 2000);
          }
        }
      };

      if (delay > 0) {
        timeout = setTimeout(typeNextChar, delay);
      } else {
        typeNextChar();
      }

      return () => {
        isCancelled = true;
        clearTimeout(timeout);
      };
    }, [text, speed, delay, loop]);

    return (
      <span ref={ref} className={cn("inline-block", className)} {...props}>
        {displayedText}
        <span 
          className={cn(
            "inline-block ml-[2px] transition-opacity duration-100", 
            isComplete && !loop ? "opacity-0" : "animate-pulse",
            cursorClassName
          )}
        >
          {cursor}
        </span>
      </span>
    );
  }
);

TypingText.displayName = 'TypingText';
