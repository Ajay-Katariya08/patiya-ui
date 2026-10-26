import React, { useState } from 'react';
import { cn } from '../../utils/cn';

export type QuantitySelectorProps = {
  value?: number;
  defaultValue?: number;
  onChange?: (val: number) => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  allowInput?: boolean;
  onRemove?: () => void;
  morphOnZero?: boolean;
  disabled?: boolean;
  className?: string;
};

export const QuantitySelector = React.forwardRef<HTMLDivElement, QuantitySelectorProps>(
  (
    {
      value,
      defaultValue = 1,
      onChange,
      min = 1,
      max = 99,
      size = 'md',
      allowInput = false,
      onRemove,
      morphOnZero = false,
      disabled = false,
      className,
      ...props
    },
    ref
  ) => {
    const isControlled = value !== undefined;
    const [internalVal, setInternalVal] = useState<number>(defaultValue);
    const count = isControlled ? value : internalVal;

    const update = (next: number) => {
      if (disabled) return;
      if (next < min) {
        if (onRemove) {
          onRemove();
          return;
        }
        next = min;
      }
      if (next > max) {
        next = max;
      }
      if (!isControlled) {
        setInternalVal(next);
      }
      onChange?.(next);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const parsed = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10);
      if (isNaN(parsed)) {
        if (!isControlled) setInternalVal(min);
        onChange?.(min);
      } else {
        update(parsed);
      }
    };

    const sizeClasses = {
      sm: {
        container: 'rounded-lg p-0.5 text-xs',
        btn: 'w-6 h-6 text-xs rounded',
        input: 'w-8 text-xs',
        text: 'w-8 text-xs',
      },
      md: {
        container: 'rounded-xl p-1 text-sm shadow-xs',
        btn: 'w-8 h-8 text-sm font-semibold rounded-lg',
        input: 'w-10 text-sm font-bold',
        text: 'w-10 text-sm font-bold',
      },
      lg: {
        container: 'rounded-full px-2 py-1 text-base shadow-xs',
        btn: 'w-9 h-9 text-base font-bold rounded-full bg-[var(--patiya-color-muted)] hover:bg-[var(--patiya-color-primary)] hover:text-[var(--patiya-color-primary-foreground)]',
        input: 'w-12 text-base font-extrabold',
        text: 'w-12 text-base font-extrabold',
      },
    };

    const currentSize = sizeClasses[size];

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] select-none',
          currentSize.container,
          disabled && 'opacity-50 pointer-events-none',
          className
        )}
        {...props}
      >
        <button
          type="button"
          onClick={() => update(count - 1)}
          disabled={disabled || (!onRemove && count <= min)}
          className={cn(
            'flex items-center justify-center transition-colors cursor-pointer text-[var(--patiya-color-foreground)] hover:bg-[var(--patiya-color-muted)] disabled:opacity-40 disabled:cursor-not-allowed',
            currentSize.btn
          )}
          aria-label="Decrease quantity"
        >
          {morphOnZero && count === min ? (
            <svg
              className="w-3.5 h-3.5 text-red-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            </svg>
          ) : (
            '−'
          )}
        </button>

        {allowInput ? (
          <input
            type="text"
            value={count}
            onChange={handleInputChange}
            disabled={disabled}
            className={cn(
              'text-center bg-transparent border-none outline-none text-[var(--patiya-color-foreground)]',
              currentSize.input
            )}
          />
        ) : (
          <span
            className={cn(
              'text-center font-bold text-[var(--patiya-color-foreground)]',
              currentSize.text
            )}
          >
            {count}
          </span>
        )}

        <button
          type="button"
          onClick={() => update(count + 1)}
          disabled={disabled || count >= max}
          className={cn(
            'flex items-center justify-center transition-colors cursor-pointer text-[var(--patiya-color-foreground)] hover:bg-[var(--patiya-color-muted)] disabled:opacity-40 disabled:cursor-not-allowed',
            currentSize.btn
          )}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
    );
  }
);
QuantitySelector.displayName = 'QuantitySelector';

export type QuantitySelectorInputProps = {
  defaultValue?: number;
  value?: number;
  min?: number;
  max?: number;
  onChange?: (val: number) => void;
  className?: string;
};

export const QuantitySelectorInput = ({
  defaultValue = 1,
  value,
  min = 1,
  max = 999,
  onChange,
  className,
}: QuantitySelectorInputProps) => {
  return (
    <QuantitySelector
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      size="md"
      allowInput
      onChange={onChange}
      className={className}
    />
  );
};

export type QuantitySelectorLimitsProps = {
  max: number;
  min?: number;
  defaultValue?: number;
  value?: number;
  onChange?: (val: number) => void;
  className?: string;
};

export const QuantitySelectorLimits = ({
  max,
  min = 1,
  defaultValue = 1,
  value,
  onChange,
  className,
}: QuantitySelectorLimitsProps) => {
  const [internal, setInternal] = useState(value !== undefined ? value : defaultValue);
  const current = value !== undefined ? value : internal;

  const handleChange = (v: number) => {
    setInternal(v);
    onChange?.(v);
  };

  return (
    <div className={cn('flex flex-col items-center gap-1.5', className)}>
      <QuantitySelector
        min={min}
        max={max}
        value={current}
        onChange={handleChange}
      />
      {current >= max && (
        <span className="text-[11px] font-medium text-amber-500">
          Maximum stock limit reached ({max})
        </span>
      )}
    </div>
  );
};

export type QuantitySelectorMorphProps = {
  initialCount?: number;
  onCountChange?: (count: number) => void;
  buttonText?: string;
  className?: string;
};

export const QuantitySelectorMorph = ({
  initialCount = 0,
  onCountChange,
  buttonText = 'Add to Cart',
  className,
}: QuantitySelectorMorphProps) => {
  const [count, setCount] = useState(initialCount);

  const handleInitial = () => {
    setCount(1);
    onCountChange?.(1);
  };

  const handleUpdate = (next: number) => {
    setCount(next);
    onCountChange?.(next);
  };

  if (count === 0) {
    return (
      <button
        type="button"
        onClick={handleInitial}
        className={cn(
          'px-4 py-2 rounded-xl bg-[var(--patiya-color-primary)] text-[var(--patiya-color-primary-foreground)] font-semibold text-xs transition-all hover:opacity-90 shadow-xs cursor-pointer',
          className
        )}
      >
        {buttonText}
      </button>
    );
  }

  return (
    <QuantitySelector
      value={count}
      min={1}
      morphOnZero
      onRemove={() => handleUpdate(0)}
      onChange={handleUpdate}
      className={className}
    />
  );
};

export type QuantitySelectorBulkProps = {
  increments?: number[];
  initialValue?: number;
  onChange?: (val: number) => void;
  className?: string;
};

export const QuantitySelectorBulk = ({
  increments = [5, 10, 25, 50],
  initialValue = 10,
  onChange,
  className,
}: QuantitySelectorBulkProps) => {
  const [qty, setQty] = useState(initialValue);

  const handleAdd = (delta: number) => {
    const next = qty + delta;
    setQty(next);
    onChange?.(next);
  };

  return (
    <div className={cn('space-y-3', className)}>
      <QuantitySelector value={qty} min={1} onChange={(v) => { setQty(v); onChange?.(v); }} />
      <div className="flex flex-wrap gap-1.5">
        {increments.map((inc) => (
          <button
            key={inc}
            type="button"
            onClick={() => handleAdd(inc)}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-[var(--patiya-color-muted)] hover:bg-[var(--patiya-color-primary)] hover:text-[var(--patiya-color-primary-foreground)] text-[var(--patiya-color-foreground)] transition-colors border border-[var(--patiya-color-border)] cursor-pointer"
          >
            +{inc}
          </button>
        ))}
      </div>
    </div>
  );
};

export type QuantitySelectorTrashProps = {
  defaultValue?: number;
  onRemove?: () => void;
  onChange?: (val: number) => void;
  className?: string;
};

export const QuantitySelectorTrash = ({
  defaultValue = 1,
  onRemove,
  onChange,
  className,
}: QuantitySelectorTrashProps) => {
  return (
    <QuantitySelector
      defaultValue={defaultValue}
      min={1}
      morphOnZero
      onRemove={onRemove}
      onChange={onChange}
      className={className}
    />
  );
};
