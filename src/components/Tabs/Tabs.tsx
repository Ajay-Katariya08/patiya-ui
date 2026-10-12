import React, { createContext, useContext, useState } from 'react';
import { cn } from '../../utils/cn';

const TabsContext = createContext<{ activeTab: string; setActiveTab: (value: string) => void }>({ activeTab: '', setActiveTab: () => {} });

export const Tabs = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { defaultValue: string; value?: string; onValueChange?: (value: string) => void }>(
  ({ className, defaultValue, value, onValueChange, children, ...props }, ref) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const activeTab = value !== undefined ? value : internalValue;
    
    const setActiveTab = (newVal: string) => {
      if (value === undefined) setInternalValue(newVal);
      if (onValueChange) onValueChange(newVal);
    };

    return (
      <TabsContext.Provider value={{ activeTab, setActiveTab }}>
        <div ref={ref} className={cn("flex flex-col", className)} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);
Tabs.displayName = "Tabs";

export const TabsList = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div 
      ref={ref} 
      className={cn("inline-flex h-10 items-center justify-center rounded-md bg-[var(--patiya-color-muted)] p-1 text-(--patiya-color-muted-foreground)", className)} 
      {...props} 
    />
  )
);
TabsList.displayName = "TabsList";

export const TabsTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { value: string }>(
  ({ className, value, ...props }, ref) => {
    const { activeTab, setActiveTab } = useContext(TabsContext);
    const isActive = activeTab === value;

    return (
      <button
        ref={ref}
        type="button"
        onClick={() => setActiveTab(value)}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--patiya-color-ring)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          isActive ? "bg-[var(--patiya-color-background)] text-[var(--patiya-color-foreground)] shadow-sm" : "hover:text-[var(--patiya-color-foreground)]",
          className
        )}
        {...props}
      />
    );
  }
);
TabsTrigger.displayName = "TabsTrigger";

export const TabsContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { value: string }>(
  ({ className, value, children, ...props }, ref) => {
    const { activeTab } = useContext(TabsContext);
    if (activeTab !== value) return null;

    return (
      <div
        ref={ref}
        className={cn("mt-2 ring-offset-[var(--patiya-color-background)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--patiya-color-ring)] focus-visible:ring-offset-2", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TabsContent.displayName = "TabsContent";
