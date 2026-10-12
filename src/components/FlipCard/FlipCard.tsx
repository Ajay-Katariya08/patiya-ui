import React, { useState } from 'react';
import { cn } from '../../utils/cn';

export interface FlipCardProps extends React.HTMLAttributes<HTMLDivElement> {
  front: React.ReactNode;
  back: React.ReactNode;
  direction?: 'horizontal' | 'vertical';
}

export const FlipCard = React.forwardRef<HTMLDivElement, FlipCardProps>(
  ({ className, front, back, direction = 'horizontal', ...props }, ref) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const transformString = 
      direction === 'horizontal' 
        ? (isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)') 
        : (isFlipped ? 'rotateX(180deg)' : 'rotateX(0deg)');

    return (
      <div
        ref={ref}
        className={cn("relative group cursor-pointer", className)}
        style={{ perspective: '1000px' }}
        onClick={() => setIsFlipped(!isFlipped)}
        {...props}
      >
        <div
          className="w-full h-full transition-transform duration-500"
          style={{ transformStyle: 'preserve-3d', transform: transformString }}
        >
          {/* Front Face */}
          <div
            className="absolute inset-0 w-full h-full backface-hidden"
            style={{ backfaceVisibility: 'hidden' }}
          >
            {front}
          </div>

          {/* Back Face */}
          <div
            className="absolute inset-0 w-full h-full"
            style={{ 
              backfaceVisibility: 'hidden',
              transform: direction === 'horizontal' ? 'rotateY(180deg)' : 'rotateX(180deg)'
            }}
          >
            {back}
          </div>
        </div>
      </div>
    );
  }
);

FlipCard.displayName = 'FlipCard';
