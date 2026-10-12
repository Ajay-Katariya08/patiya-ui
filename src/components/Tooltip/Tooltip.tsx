import React, { useState } from 'react';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
  Placement,
  useTransitionStyles
} from '@floating-ui/react';
import { cn } from '../../utils/cn';

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  placement?: Placement;
  className?: string;
  delay?: number;
}

export function Tooltip({ children, content, placement = 'top', className, delay = 0 }: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, x, y, strategy, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(8),
      flip({
        fallbackAxisSideDirection: 'start',
      }),
      shift(),
    ],
  });

  const hover = useHover(context, { move: false, delay: { open: delay, close: 0 } });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  const { isMounted, styles } = useTransitionStyles(context, {
    duration: 150,
    initial: { opacity: 0, transform: 'scale(0.95)' },
  });

  return (
    <>
      {React.cloneElement(children as React.ReactElement<any> & React.RefAttributes<any>, {
        ref: refs.setReference,
        ...getReferenceProps(),
      })}
      {isMounted && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={{ 
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
              width: 'max-content',
              ...styles 
            }}
            {...getFloatingProps()}
            className={cn(
              'z-50 px-3 py-1.5 text-xs font-medium rounded-md shadow-md',
              'bg-[var(--patiya-color-foreground)] text-[var(--patiya-color-background)]',
              className
            )}
          >
            {content}
          </div>
        </FloatingPortal>
      )}
    </>
  );
}
