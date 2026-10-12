import React from 'react';
import { cn } from '../../utils/cn';

export interface CollapseProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * If true, the content is expanded and visible.
   */
  isOpen: boolean;
  /**
   * The content to render inside the collapse container.
   */
  children: React.ReactNode;
  /**
   * Callback fired when the expand/collapse animation finishes.
   */
  onAnimationEnd?: () => void;
}

export const Collapse = React.forwardRef<HTMLDivElement, CollapseProps>(
  ({ isOpen, children, className, onAnimationEnd, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'grid transition-[grid-template-rows] duration-300 ease-in-out',
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
          className
        )}
        onTransitionEnd={(e) => {
          if (e.propertyName === 'grid-template-rows' && onAnimationEnd) {
            onAnimationEnd();
          }
        }}
        {...props}
      >
        <div className="overflow-hidden">
          {children}
        </div>
      </div>
    );
  }
);

Collapse.displayName = 'Collapse';
