"use client";
import React, { forwardRef, createContext, useContext, useState } from 'react';
import { cn } from '../../utils/cn';

type DataListContextType = {
  orientation: 'horizontal' | 'vertical';
  size: 'sm' | 'md' | 'lg';
  variant: 'plain' | 'striped' | 'divided' | 'bordered';
};

const DataListContext = createContext<DataListContextType>({
  orientation: 'horizontal',
  size: 'md',
  variant: 'plain',
});

export type DataListProps = React.HTMLAttributes<HTMLDListElement> & {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'plain' | 'striped' | 'divided' | 'bordered';
  size?: 'sm' | 'md' | 'lg';
};

export const DataList = forwardRef<HTMLDListElement, DataListProps>(
  (
    {
      className,
      orientation = 'horizontal',
      variant = 'plain',
      size = 'md',
      children,
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      plain: 'space-y-3',
      divided: 'divide-y divide-[var(--patiya-color-border)]',
      striped: 'rounded-xl overflow-hidden [&>*:nth-child(even)]:bg-[var(--patiya-color-muted)]/40',
      bordered: 'rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] divide-y divide-[var(--patiya-color-border)] overflow-hidden shadow-xs',
    };

    return (
      <DataListContext.Provider value={{ orientation, size, variant }}>
        <dl
          ref={ref}
          className={cn('w-full text-sm', variantStyles[variant], className)}
          {...props}
        >
          {children}
        </dl>
      </DataListContext.Provider>
    );
  }
);
DataList.displayName = 'DataList';

export type DataListItemProps = React.HTMLAttributes<HTMLDivElement> & {
  align?: 'start' | 'center' | 'baseline';
};

export const DataListItem = forwardRef<HTMLDivElement, DataListItemProps>(
  ({ className, align = 'center', children, ...props }, ref) => {
    const { orientation, size, variant } = useContext(DataListContext);

    const paddingStyles = {
      sm: variant === 'plain' ? 'py-1' : 'py-2 px-3',
      md: variant === 'plain' ? 'py-1.5' : 'py-3 px-4',
      lg: variant === 'plain' ? 'py-2.5' : 'py-4 px-5',
    };

    const alignStyles = {
      start: 'items-start',
      center: 'items-center',
      baseline: 'items-baseline',
    };

    const layoutStyles =
      orientation === 'horizontal'
        ? cn('grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4', alignStyles[align])
        : 'flex flex-col gap-1';

    return (
      <div
        ref={ref}
        className={cn('transition-colors', paddingStyles[size], layoutStyles, className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
DataListItem.displayName = 'DataListItem';

export type DataListLabelProps = React.HTMLAttributes<HTMLElement> & {
  icon?: React.ReactNode;
};

export const DataListLabel = forwardRef<HTMLElement, DataListLabelProps>(
  ({ className, icon, children, ...props }, ref) => {
    const { size } = useContext(DataListContext);

    const sizeStyles = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    };

    return (
      <dt
        ref={ref}
        className={cn(
          'flex items-center gap-1.5 font-medium text-[var(--patiya-color-muted-foreground)]',
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {icon && <span className="shrink-0 opacity-80">{icon}</span>}
        <span>{children}</span>
      </dt>
    );
  }
);
DataListLabel.displayName = 'DataListLabel';

export type DataListValueProps = React.HTMLAttributes<HTMLElement> & {
  copyable?: boolean;
  copyText?: string;
};

export const DataListValue = forwardRef<HTMLElement, DataListValueProps>(
  ({ className, copyable, copyText, children, ...props }, ref) => {
    const { size, orientation } = useContext(DataListContext);
    const [copied, setCopied] = useState(false);

    const sizeStyles = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    };

    const handleCopy = () => {
      const text = copyText || (typeof children === 'string' ? children : '');
      if (text && navigator?.clipboard) {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    };

    return (
      <dd
        ref={ref}
        className={cn(
          'flex items-center gap-2 font-medium text-[var(--patiya-color-foreground)] break-words',
          orientation === 'horizontal' && 'sm:col-span-2',
          sizeStyles[size],
          className
        )}
        {...props}
      >
        <span className="flex-1">{children}</span>
        {copyable && (
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center justify-center p-1 rounded-md text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] hover:bg-[var(--patiya-color-muted)] transition-colors"
            title="Copy value"
          >
            {copied ? (
              <svg className="w-3.5 h-3.5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            )}
          </button>
        )}
      </dd>
    );
  }
);
DataListValue.displayName = 'DataListValue';
