import React from 'react';
import {
  useFloating,
  useDismiss,
  useRole,
  useInteractions,
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useTransitionStatus
} from '@floating-ui/react';
import { cn } from '../../utils/cn';
import { Box } from '../Layout/Box';

export interface DrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  side?: 'right' | 'left' | 'top' | 'bottom';
}

export function Drawer({ open, onOpenChange, children, side = 'right' }: DrawerProps) {
  const { refs, context } = useFloating({
    open,
    onOpenChange,
  });

  const dismiss = useDismiss(context, { outsidePressEvent: 'mousedown' });
  const role = useRole(context);

  const { getFloatingProps } = useInteractions([dismiss, role]);

  const { isMounted, status } = useTransitionStatus(context, { duration: 300 });

  const sideClasses = {
    right: 'inset-y-0 right-0 h-full w-3/4 max-w-sm border-l sm:max-w-sm',
    left: 'inset-y-0 left-0 h-full w-3/4 max-w-sm border-r sm:max-w-sm',
    top: 'inset-x-0 top-0 w-full border-b',
    bottom: 'inset-x-0 bottom-0 w-full border-t',
  };

  const getClosedTransform = (side: string) => {
    switch (side) {
      case 'right': return 'translate-x-full';
      case 'left': return '-translate-x-full';
      case 'top': return '-translate-y-full';
      case 'bottom': return 'translate-y-full';
      default: return 'translate-x-full';
    }
  };

  return (
    <>
      {isMounted && (
        <FloatingPortal>
          <FloatingOverlay
            className={cn(
              "z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-in-out",
              status === 'open' ? 'opacity-100' : 'opacity-0'
            )}
            lockScroll
          >
            <FloatingFocusManager context={context}>
              <Box
                ref={refs.setFloating}
                {...getFloatingProps()}
                className={cn(
                  "fixed z-50 bg-[var(--patiya-color-background)] p-6 shadow-2xl border-[var(--patiya-color-border)] outline-none flex flex-col overflow-y-auto transition-transform duration-300 ease-in-out",
                  sideClasses[side],
                  status === 'open' ? 'translate-x-0 translate-y-0' : getClosedTransform(side)
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
