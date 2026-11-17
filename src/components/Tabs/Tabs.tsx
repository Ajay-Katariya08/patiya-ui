"use client";
import React, { createContext, useContext, useState, useId } from "react";
import { cn } from "../../utils/cn";

type TabsContextValue = {
  activeTab: string;
  setActiveTab: (value: string) => void;
  rootId: string;
};

const TabsContext = createContext<TabsContextValue>({
  activeTab: "",
  setActiveTab: () => {},
  rootId: "",
});

type TabsProps = React.HTMLAttributes<HTMLDivElement> & {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
};

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      className,
      defaultValue = "",
      value,
      onValueChange,
      children,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const [internalValue, setInternalValue] = useState(defaultValue);
    const activeTab = value !== undefined ? value : internalValue;

    const setActiveTab = (newVal: string) => {
      if (value === undefined) setInternalValue(newVal);
      if (onValueChange) onValueChange(newVal);
    };

    return (
      <TabsContext.Provider
        value={{ activeTab, setActiveTab, rootId: generatedId }}
      >
        <div ref={ref} className={cn("flex flex-col", className)} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  },
);
Tabs.displayName = "Tabs";

type TabsListProps = React.HTMLAttributes<HTMLDivElement>;

export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, onKeyDown, ...props }, ref) => {
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (onKeyDown) onKeyDown(event);
      if (event.defaultPrevented) return;

      const tabs = Array.from(
        event.currentTarget.querySelectorAll<HTMLButtonElement>(
          'button[role="tab"]:not([disabled])',
        ),
      );
      const currentIndex = tabs.indexOf(document.activeElement as HTMLButtonElement);
      if (currentIndex === -1) return;

      let targetIndex = -1;
      if (event.key === "ArrowRight") {
        event.preventDefault();
        targetIndex = (currentIndex + 1) % tabs.length;
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        targetIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      } else if (event.key === "Home") {
        event.preventDefault();
        targetIndex = 0;
      } else if (event.key === "End") {
        event.preventDefault();
        targetIndex = tabs.length - 1;
      }

      if (targetIndex >= 0 && tabs[targetIndex]) {
        tabs[targetIndex].focus();
        tabs[targetIndex].click();
      }
    };

    return (
      <div
        ref={ref}
        role="tablist"
        aria-orientation="horizontal"
        onKeyDown={handleKeyDown}
        className={cn(
          "inline-flex h-10 items-center justify-center rounded-md bg-[var(--patiya-color-muted)] p-1 text-(--patiya-color-muted-foreground)",
          className,
        )}
        {...props}
      />
    );
  },
);
TabsList.displayName = "TabsList";

type TabsTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  value: string;
};

export const TabsTrigger = React.forwardRef<
  HTMLButtonElement,
  TabsTriggerProps
>(({ className, value, ...props }, ref) => {
  const { activeTab, setActiveTab, rootId } = useContext(TabsContext);
  const isActive = activeTab === value;
  const triggerId = `${rootId}-tab-${value}`;
  const panelId = `${rootId}-panel-${value}`;

  return (
    <button
      ref={ref}
      type="button"
      role="tab"
      id={triggerId}
      aria-controls={panelId}
      aria-selected={isActive}
      tabIndex={isActive ? 0 : -1}
      onClick={() => setActiveTab(value)}
      data-state={isActive ? "active" : "inactive"}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--patiya-color-ring)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        isActive
          ? "bg-[var(--patiya-color-background)] text-[var(--patiya-color-foreground)] shadow-sm"
          : "hover:text-[var(--patiya-color-foreground)]",
        className,
      )}
      {...props}
    />
  );
});
TabsTrigger.displayName = "TabsTrigger";

type TabsContentProps = React.HTMLAttributes<HTMLDivElement> & {
  value: string;
};

export const TabsContent = React.forwardRef<
  HTMLDivElement,
  TabsContentProps
>(({ className, value, children, ...props }, ref) => {
  const { activeTab, rootId } = useContext(TabsContext);
  const isActive = activeTab === value;
  const triggerId = `${rootId}-tab-${value}`;
  const panelId = `${rootId}-panel-${value}`;

  if (!isActive) return null;

  return (
    <div
      ref={ref}
      role="tabpanel"
      id={panelId}
      aria-labelledby={triggerId}
      tabIndex={0}
      className={cn(
        "mt-2 ring-offset-[var(--patiya-color-background)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--patiya-color-ring)] focus-visible:ring-offset-2",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
TabsContent.displayName = "TabsContent";
