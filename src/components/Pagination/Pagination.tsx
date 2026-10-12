import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export const Pagination = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <nav ref={ref} role="navigation" aria-label="pagination" className={cn("mx-auto flex w-full justify-center", className)} {...props} />
  )
);
Pagination.displayName = "Pagination";

export const PaginationContent = forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn("flex flex-row items-center gap-1", className)} {...props} />
  )
);
PaginationContent.displayName = "PaginationContent";

export const PaginationItem = forwardRef<HTMLLIElement, React.LiHTMLAttributes<HTMLLIElement>>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn("", className)} {...props} />
  )
);
PaginationItem.displayName = "PaginationItem";

export const PaginationLink = forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement> & { isActive?: boolean }>(
  ({ className, isActive, ...props }, ref) => (
    <a
      ref={ref}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--patiya-color-ring)] h-9 w-9",
        isActive ? "bg-[var(--patiya-color-primary)] text-[var(--patiya-color-primary-foreground)] shadow" : "hover:bg-[var(--patiya-color-muted)] hover:text-[var(--patiya-color-foreground)] text-(--patiya-color-muted-foreground)",
        className
      )}
      {...props}
    />
  )
);
PaginationLink.displayName = "PaginationLink";

export const PaginationPrevious = forwardRef<HTMLAnchorElement, React.ComponentProps<typeof PaginationLink>>(
  ({ className, ...props }, ref) => (
    <PaginationLink ref={ref} aria-label="Go to previous page" className={cn("gap-1 pl-2.5 w-auto pr-4", className)} {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="m15 18-6-6 6-6"/></svg>
      <span>Previous</span>
    </PaginationLink>
  )
);
PaginationPrevious.displayName = "PaginationPrevious";

export const PaginationNext = forwardRef<HTMLAnchorElement, React.ComponentProps<typeof PaginationLink>>(
  ({ className, ...props }, ref) => (
    <PaginationLink ref={ref} aria-label="Go to next page" className={cn("gap-1 pr-2.5 w-auto pl-4", className)} {...props}>
      <span>Next</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="m9 18 6-6-6-6"/></svg>
    </PaginationLink>
  )
);
PaginationNext.displayName = "PaginationNext";

export const PaginationEllipsis = forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span ref={ref} aria-hidden className={cn("flex h-9 w-9 items-center justify-center text-(--patiya-color-muted-foreground)", className)} {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
      <span className="sr-only">More pages</span>
    </span>
  )
);
PaginationEllipsis.displayName = "PaginationEllipsis";
