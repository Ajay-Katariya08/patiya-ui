import React, { useState, useRef, useCallback, useEffect } from 'react';
import { cn } from '../../utils/cn';

export interface CompareSliderProps extends React.HTMLAttributes<HTMLDivElement> {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  initialPosition?: number; // 0 to 100
}

export const CompareSlider = React.forwardRef<HTMLDivElement, CompareSliderProps>(
  (
    {
      className,
      beforeImage,
      afterImage,
      beforeLabel = 'Before',
      afterLabel = 'After',
      initialPosition = 50,
      ...props
    },
    ref
  ) => {
    const [position, setPosition] = useState(initialPosition);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = useCallback(
      (clientX: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
        setPosition(percentage);
      },
      []
    );

    const onMouseMove = useCallback(
      (e: MouseEvent) => {
        if (!isDragging) return;
        handleMove(e.clientX);
      },
      [isDragging, handleMove]
    );

    const onTouchMove = useCallback(
      (e: TouchEvent) => {
        if (!isDragging) return;
        handleMove(e.touches[0].clientX);
      },
      [isDragging, handleMove]
    );

    const onMouseUp = useCallback(() => {
      setIsDragging(false);
    }, []);

    useEffect(() => {
      if (isDragging) {
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
        window.addEventListener('touchmove', onTouchMove, { passive: false });
        window.addEventListener('touchend', onMouseUp);
      } else {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
        window.removeEventListener('touchmove', onTouchMove);
        window.removeEventListener('touchend', onMouseUp);
      }
      return () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
        window.removeEventListener('touchmove', onTouchMove);
        window.removeEventListener('touchend', onMouseUp);
      };
    }, [isDragging, onMouseMove, onMouseUp, onTouchMove]);

    return (
      <div
        ref={(node) => {
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
          // @ts-ignore
          containerRef.current = node;
        }}
        className={cn(
          "relative w-full overflow-hidden rounded-2xl select-none aspect-video bg-gray-100",
          className
        )}
        onMouseDown={(e) => {
          setIsDragging(true);
          handleMove(e.clientX);
        }}
        onTouchStart={(e) => {
          setIsDragging(true);
          handleMove(e.touches[0].clientX);
        }}
        {...props}
      >
        {/* Background / Before Image */}
        <div className="absolute inset-0">
          <img
            src={beforeImage}
            alt="Before"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            draggable={false}
          />
          {beforeLabel && (
            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm tracking-wide z-10 pointer-events-none">
              {beforeLabel}
            </div>
          )}
        </div>

        {/* Foreground / After Image */}
        <div
          className="absolute inset-0 z-10"
          style={{ clipPath: `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)` }}
        >
          <img
            src={afterImage}
            alt="After"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            draggable={false}
          />
        </div>
        
        {afterLabel && (
            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm tracking-wide z-10 pointer-events-none">
              {afterLabel}
            </div>
        )}

        {/* Slider Handle */}
        <div
          className="absolute inset-y-0 z-20 flex items-center justify-center w-1 cursor-ew-resize bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] touch-none hover:bg-blue-200 transition-colors"
          style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
        >
          <div className="absolute flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg border border-gray-200 text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
              <polyline points="9 18 15 12 9 6" className="rotate-180" style={{ transformOrigin: 'center' }} />
            </svg>
          </div>
        </div>
      </div>
    );
  }
);

CompareSlider.displayName = 'CompareSlider';
