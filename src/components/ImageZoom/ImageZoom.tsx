import React, { useState, useEffect } from 'react';
import { cn } from '../../utils/cn';
import { createPortal } from 'react-dom';

export interface ImageZoomProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  zoomSrc?: string;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export const ImageZoom = React.forwardRef<HTMLImageElement, ImageZoomProps>(
  ({ src, zoomSrc, alt, className, isOpen, onOpenChange, onNext, onPrev, ...props }, ref) => {
    const [internalIsZoomed, setInternalIsZoomed] = useState(false);
    const [mounted, setMounted] = useState(false);

    const isZoomed = isOpen !== undefined ? isOpen : internalIsZoomed;

    const handleZoomChange = (newZoom: boolean) => {
      setInternalIsZoomed(newZoom);
      onOpenChange?.(newZoom);
    };

    useEffect(() => {
      setMounted(true);
      
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') handleZoomChange(false);
        if (e.key === 'ArrowRight' && onNext) onNext();
        if (e.key === 'ArrowLeft' && onPrev) onPrev();
      };

      if (isZoomed) {
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeyDown);
      } else {
        document.body.style.overflow = 'unset';
      }

      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, [isZoomed, onNext, onPrev]);

    return (
      <>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={ref}
          src={src}
          alt={alt}
          className={cn(
            'cursor-zoom-in transition-all duration-300 hover:opacity-90',
            className
          )}
          onClick={() => handleZoomChange(true)}
          {...props}
        />

        {mounted && isZoomed && createPortal(
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm cursor-zoom-out animate-in fade-in duration-300"
            onClick={() => handleZoomChange(false)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={zoomSrc || src}
              alt={alt}
              className="max-w-[90vw] max-h-[90vh] object-contain shadow-2xl animate-in zoom-in-95 duration-300 cursor-default"
              onClick={(e) => e.stopPropagation()}
            />
            
            <button
              onClick={(e) => { e.stopPropagation(); handleZoomChange(false); }}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors cursor-pointer"
              aria-label="Close zoom"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {onPrev && (
              <button
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors cursor-pointer"
                aria-label="Previous image"
              >
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {onNext && (
              <button
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors cursor-pointer"
                aria-label="Next image"
              >
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>,
          document.body
        )}
      </>
    );
  }
);

ImageZoom.displayName = 'ImageZoom';
