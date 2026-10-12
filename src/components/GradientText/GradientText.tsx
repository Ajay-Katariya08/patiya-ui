import React from 'react';
import { cn } from '../../utils/cn';

export interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
}

export const GradientText = React.forwardRef<HTMLSpanElement, GradientTextProps>(
  ({ 
    children, 
    colors = ['#ffaa40', '#9c40ff', '#ffaa40'], 
    animationSpeed = 8,
    showBorder = false,
    className, 
    ...props 
  }, ref) => {
    
    const gradientStyle = {
      backgroundImage: `linear-gradient(to right, ${colors.join(', ')})`,
      backgroundSize: '200% auto',
      animation: `gradientText ${animationSpeed}s linear infinite`,
    };

    return (
      <div 
        className={cn(
          "relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-2xl bg-white/5 px-4 py-1.5 text-sm font-medium backdrop-blur-sm transition-shadow duration-500 hover:shadow-[0_0_2rem_-0.5rem_#fff8]",
          showBorder ? "border border-white/10" : "",
          className
        )}
      >
        <span 
          ref={ref}
          className="inline-block bg-clip-text text-transparent"
          style={gradientStyle}
          {...props}
        >
          {children}
        </span>
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes gradientText {
            0% { background-position: 0% center; }
            100% { background-position: -200% center; }
          }
        `}} />
      </div>
    );
  }
);

GradientText.displayName = 'GradientText';
