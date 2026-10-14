"use client";

import React, { forwardRef, useEffect, useState } from 'react';
import { cn } from '../../utils/cn';

export type ScrollProgressProps = {
  variant?: 'bar' | 'circle';
  containerRef?: React.RefObject<HTMLElement | null>;
  color?: string;
  height?: number | string;
  position?: 'top' | 'bottom';
  showPercentage?: boolean;
  className?: string;
  smooth?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
} & React.HTMLAttributes<HTMLDivElement>;

export const ScrollProgress = forwardRef<HTMLDivElement, ScrollProgressProps>(
  (
    {
      variant = 'bar',
      containerRef,
      color,
      height = 3,
      position = 'top',
      showPercentage = true,
      className,
      smooth = true,
      onClick,
      ...props
    },
    ref
  ) => {
    const [progress, setProgress] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
      const target = containerRef?.current;

      const handleScroll = () => {
        let currentProgress = 0;
        if (target) {
          const { scrollTop, scrollHeight, clientHeight } = target;
          const total = scrollHeight - clientHeight;
          currentProgress = total > 0 ? (scrollTop / total) * 100 : 0;
        } else {
          const { pageYOffset } = window;
          const { scrollHeight, clientHeight } = document.documentElement;
          const total = scrollHeight - clientHeight;
          currentProgress = total > 0 ? (pageYOffset / total) * 100 : 0;
        }
        setProgress(Math.min(100, Math.max(0, currentProgress)));
      };

      if (target) {
        target.addEventListener('scroll', handleScroll, { passive: true });
      } else {
        window.addEventListener('scroll', handleScroll, { passive: true });
      }

      handleScroll();

      return () => {
        if (target) {
          target.removeEventListener('scroll', handleScroll);
        } else {
          window.removeEventListener('scroll', handleScroll);
        }
      };
    }, [containerRef]);

    const scrollToTop = () => {
      if (containerRef?.current) {
        containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    const primaryColor = color || 'var(--patiya-color-primary)';

    if (variant === 'circle') {
      const radius = 22;
      const circumference = 2 * Math.PI * radius;
      const strokeDashoffset = circumference - (progress / 100) * circumference;

      return (
        <div
          ref={ref}
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          onClick={(e) => {
            scrollToTop();
            onClick?.(e);
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={cn(
            'group relative inline-flex items-center justify-center w-12 h-12 rounded-full cursor-pointer select-none bg-[var(--patiya-color-card)]/90 backdrop-blur-md border border-[var(--patiya-color-border)] shadow-md hover:shadow-lg hover:border-[var(--patiya-color-primary)]/40 transition-all duration-300',
            className
          )}
          {...props}
        >
          <svg className="w-full h-full -rotate-90 p-1" viewBox="0 0 52 52">
            <circle
              cx="26"
              cy="26"
              r={radius}
              fill="none"
              stroke="var(--patiya-color-muted)"
              strokeWidth="3.5"
            />
            <circle
              cx="26"
              cy="26"
              r={radius}
              fill="none"
              stroke={primaryColor}
              strokeWidth="3.5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className={smooth ? 'transition-[stroke-dashoffset] duration-150 ease-out' : ''}
            />
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">
            {isHovered ? (
              <svg
                className="w-4 h-4 text-[var(--patiya-color-primary)] animate-bounce"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            ) : showPercentage ? (
              <span className="text-[10px] font-bold font-mono text-[var(--patiya-color-foreground)]">
                {Math.round(progress)}%
              </span>
            ) : (
              <svg
                className="w-3.5 h-3.5 text-[var(--patiya-color-muted-foreground)] group-hover:text-[var(--patiya-color-primary)] transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            )}
          </div>
        </div>
      );
    }

    const isFixed = !containerRef;
    const positionClass = isFixed
      ? position === 'top'
        ? 'fixed top-0 left-0 right-0 z-50'
        : 'fixed bottom-0 left-0 right-0 z-50'
      : position === 'top'
      ? 'absolute top-0 left-0 right-0 z-20'
      : 'absolute bottom-0 left-0 right-0 z-20';

    const barHeight = typeof height === 'number' ? `${height}px` : height;

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        className={cn(positionClass, 'w-full bg-transparent overflow-hidden pointer-events-none', className)}
        style={{ height: barHeight }}
        {...props}
      >
        <div
          className={cn(
            'h-full relative origin-left',
            smooth ? 'transition-all duration-150 ease-out' : ''
          )}
          style={{
            width: `${progress}%`,
            background: color || 'linear-gradient(to right, var(--patiya-color-primary), var(--patiya-color-accent, var(--patiya-color-primary)))',
          }}
        >
          <div
            className="absolute top-0 right-0 bottom-0 w-8 shadow-[0_0_10px_2px] opacity-75"
            style={{
              color: primaryColor,
              boxShadow: `0 0 12px 2px ${primaryColor}`,
            }}
          />
        </div>
      </div>
    );
  }
);

ScrollProgress.displayName = 'ScrollProgress';
