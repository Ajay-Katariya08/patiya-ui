import React, { useState, useEffect, useCallback } from 'react';
import { cn } from '../../utils/cn';

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  images: { src: string; alt?: string }[];
  autoPlay?: boolean;
  interval?: number;
  showArrows?: boolean;
  showDots?: boolean;
}

export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  ({ 
    images, 
    autoPlay = true, 
    interval = 5000, 
    showArrows = true,
    showDots = true,
    className, 
    ...props 
  }, ref) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = useCallback(() => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, [images.length]);

    const prevSlide = useCallback(() => {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    }, [images.length]);

    const goToSlide = (index: number) => {
      setCurrentIndex(index);
    };

    useEffect(() => {
      if (!autoPlay) return;
      const timer = setInterval(nextSlide, interval);
      return () => clearInterval(timer);
    }, [autoPlay, interval, nextSlide]);

    if (!images || images.length === 0) return null;

    return (
      <div 
        ref={ref} 
        className={cn('relative w-full overflow-hidden rounded-2xl group', className)} 
        {...props}
      >
        <div 
          className="flex transition-transform duration-500 ease-in-out h-full w-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((img, index) => (
            <div key={index} className="w-full h-full flex-shrink-0 relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={img.src} 
                alt={img.alt || `Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {showArrows && (
          <>
            <button 
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 text-white backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/50"
              aria-label="Previous slide"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 text-white backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/50"
              aria-label="Next slide"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {showDots && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all duration-300 shadow-sm",
                  currentIndex === index ? "bg-white w-6" : "bg-white/50 hover:bg-white/80"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);

Carousel.displayName = 'Carousel';
