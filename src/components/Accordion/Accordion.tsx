import React, { createContext, useContext, useState } from 'react';
import { cn } from '../../utils/cn';

const AccordionContext = createContext<{
  activeValues: string[];
  toggleValue: (value: string) => void;
}>({ activeValues: [], toggleValue: () => {} });

export const Accordion = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { type?: 'single' | 'multiple'; defaultValue?: string | string[] }>(
  ({ className, type = 'single', defaultValue = [], ...props }, ref) => {
    const [activeValues, setActiveValues] = useState<string[]>(Array.isArray(defaultValue) ? defaultValue : (defaultValue ? [defaultValue] : []));

    const toggleValue = (val: string) => {
      if (type === 'single') {
        setActiveValues(prev => prev.includes(val) ? [] : [val]);
      } else {
        setActiveValues(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]);
      }
    };

    return (
      <AccordionContext.Provider value={{ activeValues, toggleValue }}>
        <div ref={ref} className={cn("w-full border-b border-[var(--patiya-color-border)]", className)} {...props} />
      </AccordionContext.Provider>
    );
  }
);
Accordion.displayName = "Accordion";

const AccordionItemContext = createContext<{ value: string }>({ value: '' });

export const AccordionItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { value: string }>(
  ({ className, value, ...props }, ref) => (
    <AccordionItemContext.Provider value={{ value }}>
      <div ref={ref} className={cn("border-t border-[var(--patiya-color-border)]", className)} {...props} />
    </AccordionItemContext.Provider>
  )
);
AccordionItem.displayName = "AccordionItem";

export const AccordionTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, children, ...props }, ref) => {
    const { activeValues, toggleValue } = useContext(AccordionContext);
    const { value } = useContext(AccordionItemContext);
    const isOpen = activeValues.includes(value);

    return (
      <button
        ref={ref}
        type="button"
        onClick={() => toggleValue(value)}
        className={cn(
          "flex flex-1 w-full items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
          className
        )}
        data-state={isOpen ? 'open' : 'closed'}
        {...props}
      >
        {children}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 transition-transform duration-200">
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </button>
    );
  }
);
AccordionTrigger.displayName = "AccordionTrigger";

export const AccordionContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const { activeValues } = useContext(AccordionContext);
    const { value } = useContext(AccordionItemContext);
    const isOpen = activeValues.includes(value);

    return (
      <div
        ref={ref}
        className="grid transition-all duration-300 ease-in-out"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
        data-state={isOpen ? 'open' : 'closed'}
        {...props}
      >
        <div className="overflow-hidden">
          <div className={cn("pb-4 pt-0 text-sm text-(--patiya-color-muted-foreground)", className)}>
            {children}
          </div>
        </div>
      </div>
    );
  }
);
AccordionContent.displayName = "AccordionContent";
