"use client";
import React, { createContext, useContext, useState } from 'react';
import { cn } from '../../utils/cn';

const NavbarContext = createContext<{
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isMenuOpen: false,
  setIsMenuOpen: () => {},
});

export const Navbar = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, children, ...props }, ref) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
      <NavbarContext.Provider value={{ isMenuOpen, setIsMenuOpen }}>
        <nav
          ref={ref}
          className={cn(
            "sticky top-0 z-50 w-full border-b border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)]/80 backdrop-blur-md shadow-sm transition-colors duration-300",
            className
          )}
          {...props}
        >
          {children}
        </nav>
      </NavbarContext.Provider>
    );
  }
);
Navbar.displayName = "Navbar";

export const NavbarContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex h-16 items-center px-4 md:px-6 w-full max-w-7xl mx-auto", className)} {...props} />
  )
);
NavbarContainer.displayName = "NavbarContainer";

export const NavbarBrand = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center gap-2 mr-6 font-bold text-lg tracking-tight", className)} {...props} />
  )
);
NavbarBrand.displayName = "NavbarBrand";

export const NavbarContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("hidden md:flex items-center gap-8 text-sm font-medium flex-1", className)} {...props} />
  )
);
NavbarContent.displayName = "NavbarContent";

export const NavbarItem = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement> & { isActive?: boolean }>(
  ({ className, isActive, ...props }, ref) => (
    <a
      ref={ref}
      className={cn(
        "transition-colors hover:text-[var(--patiya-color-foreground)]",
        isActive ? "text-[var(--patiya-color-foreground)] font-semibold" : "text-(--patiya-color-muted-foreground)",
        className
      )}
      {...props}
    />
  )
);
NavbarItem.displayName = "NavbarItem";

export const NavbarActions = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center justify-end gap-3 ml-auto shrink-0", className)} {...props} />
  )
);
NavbarActions.displayName = "NavbarActions";

export const NavbarMenuToggle = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => {
    const { isMenuOpen, setIsMenuOpen } = useContext(NavbarContext);
    return (
      <button
        ref={ref}
        type="button"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={cn(
          "flex md:hidden items-center justify-center p-2 -mr-2 rounded-md text-(--patiya-color-muted-foreground) hover:bg-[var(--patiya-color-muted)] hover:text-[var(--patiya-color-foreground)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--patiya-color-ring)] ml-3",
          className
        )}
        {...props}
      >
        <span className="sr-only">Toggle menu</span>
        {isMenuOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        )}
      </button>
    );
  }
);
NavbarMenuToggle.displayName = "NavbarMenuToggle";

export const NavbarMenu = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const { isMenuOpen } = useContext(NavbarContext);
    return (
      <div
        ref={ref}
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-[var(--patiya-color-background)]",
          isMenuOpen ? "border-t border-[var(--patiya-color-border)]" : "",
          className
        )}
        style={{
          maxHeight: isMenuOpen ? '1000px' : '0px',
          opacity: isMenuOpen ? 1 : 0
        }}
        {...props}
      >
        <div className="flex flex-col p-4 gap-2">
          {children}
        </div>
      </div>
    );
  }
);
NavbarMenu.displayName = "NavbarMenu";

export const NavbarMenuItem = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement> & { isActive?: boolean }>(
  ({ className, isActive, ...props }, ref) => (
    <a
      ref={ref}
      className={cn(
        "px-4 py-2 text-base font-medium rounded-md transition-colors w-full",
        isActive 
          ? "bg-[var(--patiya-color-primary)]/10 text-[var(--patiya-color-primary)]" 
          : "text-(--patiya-color-muted-foreground) hover:bg-[var(--patiya-color-muted)] hover:text-[var(--patiya-color-foreground)]",
        className
      )}
      {...props}
    />
  )
);
NavbarMenuItem.displayName = "NavbarMenuItem";
