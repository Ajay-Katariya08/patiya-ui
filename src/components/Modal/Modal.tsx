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

export type ModalSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  size?: ModalSize;
}

const sizeClasses: Record<ModalSize, string> = {
  xs: 'max-w-xs',
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  xxl: 'max-w-2xl',
};

export function Modal({ open, onOpenChange, children, size = 'md' }: ModalProps) {
  const { refs, context } = useFloating({
    open,
    onOpenChange,
  });

  const dismiss = useDismiss(context, { outsidePressEvent: 'mousedown' });
  const role = useRole(context);

  const { getFloatingProps } = useInteractions([dismiss, role]);

  const { isMounted, status } = useTransitionStatus(context, { duration: 250 });

  return (
    <>
      {isMounted && (
        <FloatingPortal>
          <FloatingOverlay
            className={cn(
              "z-50 grid place-items-center bg-black/60 backdrop-blur-sm p-4 transition-all duration-300 ease-out",
              status === 'open' ? 'opacity-100' : 'opacity-0'
            )}
            lockScroll
          >
            <FloatingFocusManager context={context}>
              <Box
                ref={refs.setFloating}
                {...getFloatingProps()}
                className={cn(
                  "bg-[var(--patiya-color-background)] border border-[var(--patiya-color-border)] rounded-2xl shadow-xl w-full p-6 outline-none transition-all duration-300 ease-out",
                  sizeClasses[size],
                  status === 'open' ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
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

export function ModalHeader({ children, className }: { children: React.ReactNode, className?: string }) {
  return <div className={cn("flex flex-col space-y-2 mb-6 text-center sm:text-left", className)}>{children}</div>;
}

export function ModalTitle({ children, className }: { children: React.ReactNode, className?: string }) {
  return <h2 className={cn("text-xl font-semibold leading-none tracking-tight", className)}>{children}</h2>;
}

export function ModalDescription({ children, className }: { children: React.ReactNode, className?: string }) {
  return <p className={cn("text-sm text-(--patiya-color-muted-foreground) leading-relaxed", className)}>{children}</p>;
}

export function ModalFooter({ children, className }: { children: React.ReactNode, className?: string }) {
  return <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3 mt-8", className)}>{children}</div>;
}
