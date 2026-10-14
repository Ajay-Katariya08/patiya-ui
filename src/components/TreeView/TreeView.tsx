"use client";
import React, { forwardRef, createContext, useContext, useState } from 'react';
import { cn } from '../../utils/cn';

type TreeContextType = {
  expandedKeys: Set<string>;
  toggleExpanded: (key: string) => void;
  selectedKey?: string;
  selectKey: (key: string) => void;
  showGuides: boolean;
};

const TreeContext = createContext<TreeContextType>({
  expandedKeys: new Set(),
  toggleExpanded: () => {},
  selectedKey: undefined,
  selectKey: () => {},
  showGuides: true,
});

export type TreeViewProps = React.HTMLAttributes<HTMLDivElement> & {
  defaultExpandedKeys?: string[];
  selectedKey?: string;
  onSelect?: (key: string) => void;
  showGuides?: boolean;
};

export const TreeView = forwardRef<HTMLDivElement, TreeViewProps>(
  (
    {
      className,
      defaultExpandedKeys = [],
      selectedKey: controlledSelectedKey,
      onSelect,
      showGuides = true,
      children,
      ...props
    },
    ref
  ) => {
    const [expandedKeys, setExpandedKeys] = useState<Set<string>>(
      new Set(defaultExpandedKeys)
    );
    const [internalSelectedKey, setInternalSelectedKey] = useState<string | undefined>(
      undefined
    );

    const selectedKey = controlledSelectedKey !== undefined ? controlledSelectedKey : internalSelectedKey;

    const toggleExpanded = (key: string) => {
      setExpandedKeys((prev) => {
        const next = new Set(prev);
        if (next.has(key)) {
          next.delete(key);
        } else {
          next.add(key);
        }
        return next;
      });
    };

    const selectKey = (key: string) => {
      if (controlledSelectedKey === undefined) {
        setInternalSelectedKey(key);
      }
      onSelect?.(key);
    };

    return (
      <TreeContext.Provider
        value={{
          expandedKeys,
          toggleExpanded,
          selectedKey,
          selectKey,
          showGuides,
        }}
      >
        <div
          ref={ref}
          role="tree"
          className={cn('w-full text-sm font-sans select-none space-y-0.5', className)}
          {...props}
        >
          {children}
        </div>
      </TreeContext.Provider>
    );
  }
);
TreeView.displayName = 'TreeView';

export type TreeItemProps = React.HTMLAttributes<HTMLDivElement> & {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  children?: React.ReactNode;
  defaultExpanded?: boolean;
  disabled?: boolean;
};

export const TreeItem = forwardRef<HTMLDivElement, TreeItemProps>(
  (
    {
      className,
      id,
      label,
      icon,
      badge,
      children,
      defaultExpanded = false,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const { expandedKeys, toggleExpanded, selectedKey, selectKey, showGuides } = useContext(TreeContext);

    const hasChildren = Boolean(children);
    const isExpanded = expandedKeys.has(id);
    const isSelected = selectedKey === id;

    const handleToggle = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (disabled) return;
      if (hasChildren) {
        toggleExpanded(id);
      }
      selectKey(id);
    };

    return (
      <div
        ref={ref}
        role="treeitem"
        aria-expanded={hasChildren ? isExpanded : undefined}
        aria-selected={isSelected}
        className={cn('relative', className)}
        {...props}
      >
        <div
          onClick={handleToggle}
          className={cn(
            'group flex items-center gap-2 px-2.5 py-1.5 rounded-lg cursor-pointer text-sm transition-colors',
            disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
            isSelected
              ? 'bg-[var(--patiya-color-primary)]/10 text-[var(--patiya-color-primary)] font-semibold'
              : 'text-[var(--patiya-color-foreground)] hover:bg-[var(--patiya-color-muted)]/60'
          )}
        >
          {hasChildren ? (
            <button
              type="button"
              tabIndex={-1}
              onClick={(e) => {
                e.stopPropagation();
                if (!disabled) toggleExpanded(id);
              }}
              className="w-4 h-4 flex items-center justify-center shrink-0 text-[var(--patiya-color-muted-foreground)] group-hover:text-[var(--patiya-color-foreground)] transition-colors"
            >
              <svg
                className={cn(
                  'w-3.5 h-3.5 transition-transform duration-300 ease-in-out',
                  isExpanded ? 'rotate-90' : 'rotate-0'
                )}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          ) : (
            <span className="w-4 h-4 shrink-0" />
          )}

          {icon && (
            <span
              className={cn(
                'shrink-0 text-[var(--patiya-color-muted-foreground)] transition-colors',
                isSelected && 'text-[var(--patiya-color-primary)]'
              )}
            >
              {icon}
            </span>
          )}

          <span className="truncate flex-1">{label}</span>

          {badge && <span className="ml-auto shrink-0">{badge}</span>}
        </div>

        {hasChildren && (
          <div
            className={cn(
              'grid transition-all duration-300 ease-in-out',
              isExpanded
                ? 'grid-rows-[1fr] opacity-100'
                : 'grid-rows-[0fr] opacity-0 pointer-events-none'
            )}
          >
            <div
              className={cn(
                'overflow-hidden transition-all duration-300 pl-6 ml-4 mt-0.5 space-y-0.5',
                showGuides && 'border-l border-[var(--patiya-color-border)]'
              )}
            >
              {children}
            </div>
          </div>
        )}
      </div>
    );
  }
);
TreeItem.displayName = 'TreeItem';
