import React, { useState, useEffect } from 'react';
import { cn } from '../../utils/cn';
import { createPortal } from 'react-dom';

export interface VideoModalProps extends React.HTMLAttributes<HTMLDivElement> {
  videoSrc: string;
  thumbnailUrl: string;
  title?: string;
  playIcon?: React.ReactNode;
}

export const VideoModal = React.forwardRef<HTMLDivElement, VideoModalProps>(
  ({ 
    videoSrc, 
    thumbnailUrl, 
    title = 'Play Video',
    playIcon,
    className, 
    ...props 
  }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
      return () => {
        document.body.style.overflow = 'unset';
      };
    }, [isOpen]);

    const defaultPlayIcon = (
      <svg className="w-10 h-10 ml-1 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z" />
      </svg>
    );

    return (
      <>
        <div 
          ref={ref}
          className={cn(
            'relative overflow-hidden rounded-2xl cursor-pointer group aspect-video bg-muted',
            className
          )}
          onClick={() => setIsOpen(true)}
          {...props}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={thumbnailUrl} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-white/30 border border-white/30">
              {playIcon || defaultPlayIcon}
            </div>
          </div>
        </div>

        {mounted && isOpen && createPortal(
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
            <div 
              className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity" 
              onClick={() => setIsOpen(false)}
            />
            
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/20 animate-in fade-in zoom-in-95 duration-300">
              <iframe
                src={videoSrc.includes('?') ? `${videoSrc}&autoplay=1` : `${videoSrc}?autoplay=1`}
                className="w-full h-full border-0"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                title={title}
              />
            </div>
          </div>,
          document.body
        )}
      </>
    );
  }
);

VideoModal.displayName = 'VideoModal';
