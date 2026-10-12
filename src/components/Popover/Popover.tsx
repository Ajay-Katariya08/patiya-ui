import React, { useState, createContext, useContext } from 'react';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  FloatingFocusManager,
  FloatingPortal,
  Placement,
  useTransitionStyles
} from '@floating-ui/react';
import { cn } from '../../utils/cn';

interface PopoverContextType {
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

const PopoverContext = createContext<PopoverContextType | null>(null);

export interface PopoverProps {
  children: React.ReactNode;
  placement?: Placement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Popover({ children, placement = 'bottom', open: controlledOpen, onOpenChange }: PopoverProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = onOpenChange ?? setUncontrolledOpen;

  const { refs, x, y, strategy, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [offset(5), flip(), shift({ padding: 8 })],
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);

  return (
    <PopoverContext.Provider value={{ open, setOpen, refs, context, x, y, strategy, getReferenceProps, getFloatingProps }}>
      {children}
    </PopoverContext.Provider>
  );
}

export const PopoverTrigger = React.forwardRef<HTMLElement, React.HTMLProps<HTMLElement> & { asChild?: boolean }>(
  ({ children, asChild = false, ...props }, propRef) => {
    const context = useContext(PopoverContext);
    if (!context) throw new Error('PopoverTrigger must be inside Popover');
    
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
      <button
        ref={ref as any}
        data-state={context.open ? 'open' : 'closed'}
        {...context.getReferenceProps(props)}
      >
        {children}
      </button>
    );
  }
);
PopoverTrigger.displayName = 'PopoverTrigger';

export const PopoverContent = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
  ({ style, className, children, ...props }, propRef) => {
    const context = useContext(PopoverContext);
    if (!context) throw new Error('PopoverContent must be inside Popover');

    const { isMounted, styles } = useTransitionStyles(context.context, {
      duration: 200,
      initial: { opacity: 0, transform: 'scale(0.95) translateY(-5px)' },
    });

    const ref = React.useMemo(() => (node: any) => {
      context.refs.setFloating(node);
      if (typeof propRef === 'function') propRef(node);
      else if (propRef) (propRef as any).current = node;
    }, [context.refs, propRef]);

    if (!isMounted) return null;

    return (
      <FloatingPortal>
        <FloatingFocusManager context={context.context} modal={false}>
          <div
            ref={ref}
            style={{ 
              position: context.strategy,
              top: context.y ?? 0,
              left: context.x ?? 0,
              ...styles, 
              ...style 
            }}
            className={cn(
              "z-50 w-72 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] p-4 text-[var(--patiya-color-foreground)] shadow-xl outline-none",
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
PopoverContent.displayName = 'PopoverContent';
