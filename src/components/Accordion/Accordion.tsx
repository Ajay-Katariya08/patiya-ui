"use client";
import React, { createContext, useContext, useState, useId } from "react";
import { cn } from "../../utils/cn";

type AccordionType = "single" | "multiple";

type AccordionContextValue = {
  activeValues: string[];
  toggleValue: (value: string) => void;
  rootId: string;
};

const AccordionContext = createContext<AccordionContextValue>({
  activeValues: [],
  toggleValue: () => {},
  rootId: "",
});

type AccordionProps = React.HTMLAttributes<HTMLDivElement> & {
  type?: AccordionType;
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
};

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      className,
      type = "single",
      defaultValue = [],
      value,
      onValueChange,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const [internalValues, setInternalValues] = useState<string[]>(
      Array.isArray(defaultValue)
        ? defaultValue
        : defaultValue
          ? [defaultValue]
          : [],
    );

    const activeValues = value !== undefined
      ? Array.isArray(value)
        ? value
        : [value]
      : internalValues;

    const toggleValue = (val: string) => {
      let nextValues: string[];
      if (type === "single") {
        nextValues = activeValues.includes(val) ? [] : [val];
      } else {
        nextValues = activeValues.includes(val)
          ? activeValues.filter((v) => v !== val)
          : [...activeValues, val];
      }

      if (value === undefined) {
        setInternalValues(nextValues);
      }
      if (onValueChange) {
        onValueChange(type === "single" ? (nextValues[0] ?? "") : nextValues);
      }
    };

    return (
      <AccordionContext.Provider
        value={{ activeValues, toggleValue, rootId: generatedId }}
      >
        <div
          ref={ref}
          data-patiya-accordion-root=""
          className={cn(
            "w-full border-b border-(--patiya-color-border)",
            className,
          )}
          {...props}
        />
      </AccordionContext.Provider>
    );
  },
);
Accordion.displayName = "Accordion";

type AccordionItemContextValue = {
  value: string;
  triggerId: string;
  contentId: string;
};

const AccordionItemContext = createContext<AccordionItemContextValue>({
  value: "",
  triggerId: "",
  contentId: "",
});

type AccordionItemProps = React.HTMLAttributes<HTMLDivElement> & {
  value: string;
};

export const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, value, ...props }, ref) => {
    const { rootId } = useContext(AccordionContext);
    const triggerId = `${rootId}-trigger-${value}`;
    const contentId = `${rootId}-content-${value}`;

    return (
      <AccordionItemContext.Provider value={{ value, triggerId, contentId }}>
        <div
          ref={ref}
          className={cn("border-t border-(--patiya-color-border)", className)}
          {...props}
        />
      </AccordionItemContext.Provider>
    );
  },
);
AccordionItem.displayName = "AccordionItem";

type AccordionTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  AccordionTriggerProps
>(({ className, children, onKeyDown, ...props }, ref) => {
  const { activeValues, toggleValue } = useContext(AccordionContext);
  const { value, triggerId, contentId } = useContext(AccordionItemContext);
  const isOpen = activeValues.includes(value);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (onKeyDown) onKeyDown(event);
    if (event.defaultPrevented) return;

    const root = event.currentTarget.closest<HTMLElement>(
      "[data-patiya-accordion-root]",
    );
    if (!root) return;

    const triggers = Array.from(
      root.querySelectorAll<HTMLButtonElement>(
        "button[data-patiya-accordion-trigger]:not([disabled])",
      ),
    );
    const currentIndex = triggers.indexOf(event.currentTarget);
    if (currentIndex === -1) return;

    let targetIndex = -1;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      targetIndex = (currentIndex + 1) % triggers.length;
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      targetIndex = (currentIndex - 1 + triggers.length) % triggers.length;
    } else if (event.key === "Home") {
      event.preventDefault();
      targetIndex = 0;
    } else if (event.key === "End") {
      event.preventDefault();
      targetIndex = triggers.length - 1;
    }

    if (targetIndex >= 0 && triggers[targetIndex]) {
      triggers[targetIndex].focus();
    }
  };

  return (
    <button
      ref={ref}
      type="button"
      id={triggerId}
      aria-controls={contentId}
      aria-expanded={isOpen}
      data-patiya-accordion-trigger=""
      onClick={() => toggleValue(value)}
      onKeyDown={handleKeyDown}
      className={cn(
        "flex flex-1 w-full items-center justify-between py-4 font-medium transition-all hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--patiya-color-ring)] focus-visible:ring-offset-2 [&[data-state=open]>svg]:rotate-180",
        className,
      )}
      data-state={isOpen ? "open" : "closed"}
      {...props}
    >
      {children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="h-4 w-4 shrink-0 transition-transform duration-200"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>
  );
});
AccordionTrigger.displayName = "AccordionTrigger";

type AccordionContentProps = React.HTMLAttributes<HTMLDivElement>;

export const AccordionContent = React.forwardRef<
  HTMLDivElement,
  AccordionContentProps
>(({ className, children, ...props }, ref) => {
  const { activeValues } = useContext(AccordionContext);
  const { value, triggerId, contentId } = useContext(AccordionItemContext);
  const isOpen = activeValues.includes(value);

  return (
    <div
      ref={ref}
      id={contentId}
      role="region"
      aria-labelledby={triggerId}
      aria-hidden={!isOpen}
      className="grid transition-all duration-300 ease-in-out"
      style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      data-state={isOpen ? "open" : "closed"}
      {...props}
    >
      <div className="overflow-hidden">
        <div
          className={cn(
            "pb-4 pt-0 text-sm text-(--patiya-color-muted-foreground)",
            className,
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
});
AccordionContent.displayName = "AccordionContent";
