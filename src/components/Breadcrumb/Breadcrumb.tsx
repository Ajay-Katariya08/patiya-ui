import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export const Breadcrumb = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <nav ref={ref} aria-label="breadcrumb" className={cn("flex", className)} {...props} />
  )
);
Breadcrumb.displayName = "Breadcrumb";

export const BreadcrumbList = forwardRef<HTMLOListElement, React.OlHTMLAttributes<HTMLOListElement>>(
  ({ className, ...props }, ref) => (
    <ol ref={ref} className={cn("flex flex-wrap items-center gap-1.5 break-words text-sm text-(--patiya-color-muted-foreground) sm:gap-2.5", className)} {...props} />
  )
);
BreadcrumbList.displayName = "BreadcrumbList";

export const BreadcrumbItem = forwardRef<HTMLLIElement, React.LiHTMLAttributes<HTMLLIElement>>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn("inline-flex items-center gap-1.5", className)} {...props} />
  )
);
BreadcrumbItem.displayName = "BreadcrumbItem";

export const BreadcrumbLink = forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(
  ({ className, ...props }, ref) => (
    <a ref={ref} className={cn("transition-colors hover:text-[var(--patiya-color-foreground)]", className)} {...props} />
  )
);
BreadcrumbLink.displayName = "BreadcrumbLink";

export const BreadcrumbPage = forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span ref={ref} role="link" aria-disabled="true" aria-current="page" className={cn("font-normal text-[var(--patiya-color-foreground)]", className)} {...props} />
  )
);
BreadcrumbPage.displayName = "BreadcrumbPage";

export const BreadcrumbSeparator = forwardRef<HTMLLIElement, React.LiHTMLAttributes<HTMLLIElement>>(
  ({ className, children, ...props }, ref) => (
    <li ref={ref} role="presentation" aria-hidden="true" className={cn("[&>svg]:w-3.5 [&>svg]:h-3.5", className)} {...props}>
      {children ?? (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
      )}
    </li>
  )
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";
