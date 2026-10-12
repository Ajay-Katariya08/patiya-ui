import React, { createContext, useContext, useState } from 'react';
import {
  useFloating, autoUpdate, offset, flip, shift, useClick, useDismiss, useRole,
  useInteractions, FloatingFocusManager, FloatingPortal, Placement, useTransitionStyles
} from '@floating-ui/react';
import { cn } from '../../utils/cn';

interface DropdownContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  refs: ReturnType<typeof useFloating>['refs'];
  context: ReturnType<typeof useFloating>['context'];
  x: number | null;
  y: number | null;
  strategy: React.CSSProperties['position'];
  getReferenceProps: (userProps?: React.HTMLProps<Element>) => Record<string, unknown>;
  getFloatingProps: (userProps?: React.HTMLProps<HTMLElement>) => Record<string, unknown>;
}

const DropdownContext = createContext<DropdownContextType | null>(null);

export function DropdownMenu({ children, placement = 'bottom-start' }: { children: React.ReactNode, placement?: Placement }) {
  const [open, setOpen] = useState(false);
  
  const { refs, x, y, strategy, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [offset(4), flip(), shift({ padding: 8 })],
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'menu' });
  
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);

  return (
    <DropdownContext.Provider value={{ open, setOpen, refs, context, x, y, strategy, getReferenceProps, getFloatingProps }}>
      {children}
    </DropdownContext.Provider>
  );
}

export const DropdownMenuTrigger = React.forwardRef<HTMLElement, React.HTMLProps<HTMLElement> & { asChild?: boolean }>(
  ({ children, asChild = false, ...props }, propRef) => {
    const context = useContext(DropdownContext);
    if (!context) throw new Error('Missing DropdownMenu');
    
    const childrenRef = (children as any).ref;
    const ref = React.useMemo(() => (node: any) => {
      context.refs.setReference(node);
      if (typeof propRef === 'function') propRef(node);
      else if (propRef) (propRef as any).current = node;
      if (typeof childrenRef === 'function') childrenRef(node);
      else if (childrenRef) childrenRef.current = node;
    }, [context.refs, propRef, childrenRef]);

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<any> & React.RefAttributes<any>, context.getReferenceProps({
        ref,
        ...props,
        ...(children as any).props,
        'data-state': context.open ? 'open' : 'closed',
      }) as any);
    }
    
    return (
      <button ref={ref as any} data-state={context.open ? 'open' : 'closed'} {...context.getReferenceProps(props)}>
        {children}
      </button>
    );
  }
);
DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';

export const DropdownMenuContent = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
  ({ style, className, children, ...props }, propRef) => {
    const context = useContext(DropdownContext);
    if (!context) throw new Error('Missing DropdownMenu');

    const { isMounted, styles } = useTransitionStyles(context.context, {
      duration: 150,
      initial: { opacity: 0, transform: 'scale(0.95)' },
    });

    const ref = React.useMemo(() => (node: any) => {
      context.refs.setFloating(node);
      if (typeof propRef === 'function') propRef(node);
      else if (propRef) (propRef as any).current = node;
    }, [context.refs, propRef]);

    if (!isMounted) return null;

    return (
      <FloatingPortal>
        <FloatingFocusManager context={context.context}>
          <div
            ref={ref}
            style={{ 
              position: context.strategy,
              top: context.y ?? 0,
              left: context.x ?? 0,
              width: 'max-content',
              ...styles, 
              ...style 
            }}
            className={cn(
              "z-50 min-w-[8rem] overflow-hidden rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] p-1.5 text-[var(--patiya-color-foreground)] shadow-lg outline-none",
              className
            )}
            {...context.getFloatingProps(props)}
          >
            {children}
          </div>
        </FloatingFocusManager>
      </FloatingPortal>
    );
  }
);
DropdownMenuContent.displayName = 'DropdownMenuContent';

export const DropdownMenuItem = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
  ({ className, onClick, ...props }, ref) => {
    const context = useContext(DropdownContext);
    return (
      <div
        ref={ref}
        role="menuitem"
        tabIndex={0}
        onClick={(e) => {
          onClick?.(e);
          context?.setOpen(false);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.(e as any);
            context?.setOpen(false);
          }
        }}
        className={cn(
          "relative flex cursor-pointer select-none items-center rounded-lg px-3 py-2 text-sm outline-none transition-colors hover:bg-[var(--patiya-color-muted)] focus:bg-[var(--patiya-color-muted)] data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          className
        )}
        {...props}
      />
    );
  }
);
DropdownMenuItem.displayName = 'DropdownMenuItem';
