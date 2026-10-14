"use client";
import React, { forwardRef, useState } from 'react';
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
  FloatingPortal,
} from '@floating-ui/react';
import { cn } from '../../utils/cn';

export type AIModel = {
  id: string;
  name: string;
  provider?: string;
  description?: string;
  badge?: string;
  icon?: React.ReactNode;
  speed?: 'fast' | 'balanced' | 'deep';
  contextLength?: string;
  disabled?: boolean;
};

export type ModelSelectorProps = {
  models: AIModel[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (modelId: string) => void;
  size?: 'sm' | 'md';
  variant?: 'button' | 'compact' | 'ghost';
  className?: string;
};

export const ModelSelector = forwardRef<HTMLDivElement, ModelSelectorProps>(
  (
    {
      models = [],
      value: controlledValue,
      defaultValue,
      onValueChange,
      size = 'md',
      variant = 'button',
      className,
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState<string>(
      defaultValue || models[0]?.id || ''
    );
    const [isOpen, setIsOpen] = useState(false);

    const activeId = controlledValue !== undefined ? controlledValue : internalValue;
    const selectedModel = models.find((m) => m.id === activeId) || models[0];

    const { refs, floatingStyles, context } = useFloating({
      open: isOpen,
      onOpenChange: setIsOpen,
      placement: 'bottom-start',
      whileElementsMounted: autoUpdate,
      middleware: [offset(6), flip(), shift({ padding: 12 })],
    });

    const click = useClick(context);
    const dismiss = useDismiss(context);
    const role = useRole(context);
    const { getReferenceProps, getFloatingProps } = useInteractions([
      click,
      dismiss,
      role,
    ]);

    const handleSelect = (model: AIModel) => {
      if (model.disabled) return;
      if (controlledValue === undefined) {
        setInternalValue(model.id);
      }
      onValueChange?.(model.id);
      setIsOpen(false);
    };

    const variantStyles = {
      button:
        'border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] hover:bg-[var(--patiya-color-muted)]/50 shadow-2xs',
      compact:
        'border border-transparent bg-[var(--patiya-color-muted)]/50 hover:bg-[var(--patiya-color-muted)]',
      ghost:
        'border-0 bg-transparent hover:bg-[var(--patiya-color-muted)]/40',
    };

    const sizeStyles = {
      sm: 'h-8 px-2.5 text-xs gap-1.5',
      md: 'h-9 px-3 text-sm gap-2',
    };

    return (
      <div ref={ref} className={cn('relative inline-block text-left', className)}>
        <button
          ref={refs.setReference}
          type="button"
          {...getReferenceProps()}
          className={cn(
            'inline-flex items-center justify-between rounded-xl font-medium transition-all select-none',
            'text-[var(--patiya-color-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--patiya-color-ring)]',
            variantStyles[variant],
            sizeStyles[size]
          )}
        >
          <span className="flex items-center gap-2 truncate">
            {selectedModel?.icon && (
              <span className="shrink-0 text-current">{selectedModel.icon}</span>
            )}
            <span className="truncate font-semibold">{selectedModel?.name}</span>
            {selectedModel?.badge && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium bg-[var(--patiya-color-primary)]/10 text-[var(--patiya-color-primary)] shrink-0">
                {selectedModel.badge}
              </span>
            )}
          </span>
          <svg
            className={cn(
              'w-3.5 h-3.5 text-[var(--patiya-color-muted-foreground)] transition-transform duration-200 shrink-0 ml-1',
              isOpen && 'rotate-180'
            )}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {isOpen && (
          <FloatingPortal>
            <div
              ref={refs.setFloating}
              style={{
                ...floatingStyles,
                zIndex: 99999,
              }}
              {...getFloatingProps()}
              className="w-72 sm:w-80 p-1.5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] shadow-2xl animate-in fade-in-0 zoom-in-95"
            >
              <div className="px-2 py-1.5 text-xs font-semibold text-[var(--patiya-color-muted-foreground)] uppercase tracking-wider">
                Select Model
              </div>
              <div className="space-y-1 max-h-72 overflow-y-auto custom-scrollbar">
                {models.map((model) => {
                  const isSelected = model.id === activeId;
                  return (
                    <button
                      key={model.id}
                      type="button"
                      disabled={model.disabled}
                      onClick={() => handleSelect(model)}
                      className={cn(
                        'w-full flex items-start gap-2.5 p-2 rounded-xl text-left transition-colors',
                        model.disabled && 'opacity-40 cursor-not-allowed',
                        isSelected
                          ? 'bg-[var(--patiya-color-primary)]/10 text-[var(--patiya-color-foreground)]'
                          : 'hover:bg-[var(--patiya-color-muted)]/60 text-[var(--patiya-color-foreground)]'
                      )}
                    >
                      {model.icon && (
                        <span className="mt-0.5 shrink-0 text-[var(--patiya-color-muted-foreground)]">
                          {model.icon}
                        </span>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-xs truncate">{model.name}</span>
                          {model.badge && (
                            <span className="text-[9px] px-1 py-0.2 rounded font-medium bg-[var(--patiya-color-primary)]/10 text-[var(--patiya-color-primary)] shrink-0">
                              {model.badge}
                            </span>
                          )}
                          {model.contextLength && (
                            <span className="text-[9px] font-mono text-[var(--patiya-color-muted-foreground)] ml-auto shrink-0">
                              {model.contextLength}
                            </span>
                          )}
                        </div>
                        {model.description && (
                          <p className="text-[11px] text-[var(--patiya-color-muted-foreground)] line-clamp-1 mt-0.5">
                            {model.description}
                          </p>
                        )}
                      </div>
                      {isSelected && (
                        <svg
                          className="w-4 h-4 text-[var(--patiya-color-primary)] shrink-0 self-center"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </FloatingPortal>
        )}
      </div>
    );
  }
);
ModelSelector.displayName = 'ModelSelector';
