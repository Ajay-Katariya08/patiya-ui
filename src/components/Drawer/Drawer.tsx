import React from 'react';
import {
  useFloating,
  useDismiss,
  useRole,
  useInteractions,
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useTransitionStyles
} from '@floating-ui/react';
import { cn } from '../../utils/cn';
import { Box } from '../Layout/Box';

export type DrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  side?: 'right' | 'left' | 'top' | 'bottom';
  position?: 'right' | 'left' | 'top' | 'bottom';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full' | string;
  className?: string;
  overlayClassName?: string;
};

export function Drawer({
  open,
  onOpenChange,
  children,
  side,
  position,
  size,
  className,
  overlayClassName,
}: DrawerProps) {
  const actualSide = side || position || 'right';
  const { refs, context } = useFloating({
    open,
    onOpenChange,
  });

  const dismiss = useDismiss(context, { outsidePressEvent: 'mousedown' });
  const role = useRole(context);

  const { getFloatingProps } = useInteractions([dismiss, role]);

  const getSlideTransform = (s: string) => {
    switch (s) {
      case 'right': return 'translate3d(100%, 0, 0)';
      case 'left': return 'translate3d(-100%, 0, 0)';
      case 'top': return 'translate3d(0, -100%, 0)';
      case 'bottom': return 'translate3d(0, 100%, 0)';
      default: return 'translate3d(100%, 0, 0)';
    }
  };

  const { isMounted, styles: panelStyles } = useTransitionStyles(context, {
    duration: 320,
    initial: {
      transform: getSlideTransform(actualSide),
    },
    open: {
      transform: 'translate3d(0, 0, 0)',
    },
    close: {
      transform: getSlideTransform(actualSide),
    },
    common: {
      transitionProperty: 'transform',
      transitionTimingFunction: 'cubic-bezier(0.32, 0.72, 0, 1)',
    },
  });

  const { styles: overlayStyles } = useTransitionStyles(context, {
    duration: 320,
    initial: { opacity: 0 },
    open: { opacity: 1 },
    close: { opacity: 0 },
    common: {
      transitionProperty: 'opacity',
      transitionTimingFunction: 'ease-out',
    },
  });

  const sideClasses = {
    right: 'inset-y-0 right-0 h-full w-full max-w-sm border-l sm:max-w-md',
    left: 'inset-y-0 left-0 h-full w-full max-w-sm border-r sm:max-w-md',
    top: 'inset-x-0 top-0 w-full max-h-[85vh] border-b shadow-2xl',
    bottom: 'inset-x-0 bottom-0 w-full max-h-[85vh] border-t rounded-t-2xl shadow-2xl',
  };

  const sizeClasses: Record<string, string> = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full',
  };

  return (
    <>
      {isMounted && (
        <FloatingPortal>
          <FloatingOverlay
            style={{ ...overlayStyles, overflow: 'hidden' }}
            className={cn(
              "z-50 bg-black/60 backdrop-blur-sm overflow-hidden",
              overlayClassName
            )}
            lockScroll
          >
            <FloatingFocusManager context={context} initialFocus={-1}>
              <Box
                ref={refs.setFloating}
                {...getFloatingProps()}
                tabIndex={-1}
                style={{ ...panelStyles, willChange: 'transform' }}
                className={cn(
                  "absolute z-50 bg-[var(--patiya-color-background)] p-6 shadow-2xl border-[var(--patiya-color-border)] outline-none flex flex-col overflow-y-auto transform-gpu",
                  sideClasses[actualSide],
                  size && sizeClasses[size],
                  className
                )}
              >
                {children}
              </Box>
            </FloatingFocusManager>
          </FloatingOverlay>
        </FloatingPortal>
      )}
    </>
  );
}

export { ModalHeader as DrawerHeader, ModalTitle as DrawerTitle, ModalDescription as DrawerDescription, ModalFooter as DrawerFooter } from '../Modal/Modal';
