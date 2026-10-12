import React from 'react';
import { cn } from '../../utils/cn';

export interface SpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
  fill?: string;
}

export const Spotlight = React.forwardRef<HTMLDivElement, SpotlightProps>(
  ({ className, fill = 'white', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("pointer-events-none absolute h-[138%] w-[138%] lg:w-[84%] opacity-0 animate-spotlight", className)}
        {...props}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 3787 2842"
          fill="none"
          className="h-full w-full"
        >
          <g filter="url(#filter)">
            <ellipse
              cx="1924.71"
              cy="273.501"
              rx="1924.71"
              ry="273.501"
              transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
              fill={fill}
              fillOpacity="0.21"
            ></ellipse>
          </g>
          <defs>
            <filter
              id="filter"
              x="0.860352"
              y="0.838989"
              width="3785.16"
              height="2840.26"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              ></feBlend>
              <feGaussianBlur
                stdDeviation="151"
                result="effect1_foregroundBlur_1065_8"
              ></feGaussianBlur>
            </filter>
          </defs>
        </svg>
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes spotlight {
            0% { opacity: 0; transform: translate(-72%, -62%) scale(0.5); }
            100% { opacity: 1; transform: translate(-50%, -40%) scale(1); }
          }
          .animate-spotlight {
            animation: spotlight 2s ease .75s 1 forwards;
          }
        `}} />
      </div>
    );
  }
);

Spotlight.displayName = 'Spotlight';
