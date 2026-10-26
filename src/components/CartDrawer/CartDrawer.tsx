import React, { useState } from 'react';
import { cn } from '../../utils/cn';
import { Drawer, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from '../Drawer/Drawer';
import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';

export type CartItem = {
  id: string | number;
  name: string;
  price: number;
  qty: number;
  color?: string;
  image?: React.ReactNode;
};

export type CartDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items?: CartItem[];
  title?: string;
  description?: string;
  badge?: string;
  onUpdateQty?: (id: string | number, delta: number) => void;
  onRemoveItem?: (id: string | number) => void;
  onCheckout?: () => void;
  checkoutText?: string;
  side?: 'right' | 'left' | 'top' | 'bottom';
  className?: string;
};

export const CartDrawer = ({
  open,
  onOpenChange,
  items = [],
  title = 'Shopping Cart',
  description,
  badge = 'Free Shipping',
  onUpdateQty,
  onRemoveItem,
  onCheckout,
  checkoutText,
  side = 'right',
  className,
}: CartDrawerProps) => {
  const [internalItems, setInternalItems] = useState<CartItem[]>(items);

  const activeItems = onUpdateQty ? items : internalItems;

  const handleUpdate = (id: string | number, delta: number) => {
    if (onUpdateQty) {
      onUpdateQty(id, delta);
    } else {
      setInternalItems((prev) =>
        prev
          .map((item) => (item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item))
      );
    }
  };

  const handleRemove = (id: string | number) => {
    if (onRemoveItem) {
      onRemoveItem(id);
    } else {
      setInternalItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const totalQty = activeItems.reduce((acc, curr) => acc + curr.qty, 0);
  const subtotal = activeItems.reduce((acc, curr) => acc + curr.price * curr.qty, 0);

  return (
    <Drawer open={open} onOpenChange={onOpenChange} side={side} className={className}>
      <DrawerHeader>
        <div className="flex items-center justify-between w-full">
          <div>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>
              {description || `${totalQty} item${totalQty === 1 ? '' : 's'} selected`}
            </DrawerDescription>
          </div>
          {badge && (
            <Badge variant="soft" color="success" size="sm">
              {badge}
            </Badge>
          )}
        </div>
      </DrawerHeader>

      <div className="p-6 space-y-4 flex-1 overflow-y-auto">
        {activeItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-3.5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] gap-3 shadow-xs"
          >
            <div className="w-12 h-12 rounded-xl bg-[var(--patiya-color-muted)] border border-[var(--patiya-color-border)] flex items-center justify-center shrink-0">
              {item.image || (
                <svg
                  className="w-6 h-6 text-[var(--patiya-color-muted-foreground)]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-[var(--patiya-color-foreground)] truncate">
                {item.name}
              </h4>
              <p className="text-xs text-[var(--patiya-color-muted-foreground)]">
                {item.color ? `${item.color} • ` : ''}${item.price} each
              </p>
            </div>
            <div className="flex items-center gap-1 border border-[var(--patiya-color-border)] bg-[var(--patiya-color-muted)]/50 rounded-lg p-0.5">
              <button
                type="button"
                onClick={() => handleUpdate(item.id, -1)}
                className="w-6 h-6 flex items-center justify-center text-xs hover:bg-[var(--patiya-color-card)] text-[var(--patiya-color-foreground)] rounded transition-colors cursor-pointer"
              >
                −
              </button>
              <span className="w-6 text-center text-xs font-semibold text-[var(--patiya-color-foreground)]">
                {item.qty}
              </span>
              <button
                type="button"
                onClick={() => handleUpdate(item.id, 1)}
                className="w-6 h-6 flex items-center justify-center text-xs hover:bg-[var(--patiya-color-card)] text-[var(--patiya-color-foreground)] rounded transition-colors cursor-pointer"
              >
                +
              </button>
            </div>
            <button
              type="button"
              onClick={() => handleRemove(item.id)}
              className="text-red-500 hover:text-red-700 p-1 text-xs cursor-pointer"
              aria-label="Remove item"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <DrawerFooter>
        <div className="w-full space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--patiya-color-muted-foreground)]">
              Subtotal
            </span>
            <span className="font-bold text-base text-[var(--patiya-color-foreground)]">
              ${subtotal}
            </span>
          </div>
          <Button
            fullWidth
            variant="solid"
            color="primary"
            onClick={onCheckout}
          >
            {checkoutText || `Proceed to Checkout ($${subtotal})`}
          </Button>
        </div>
      </DrawerFooter>
    </Drawer>
  );
};

export type CartDrawerShippingMeterProps = {
  threshold?: number;
  currentTotal?: number;
  className?: string;
};

export const CartDrawerShippingMeter = ({
  threshold = 100,
  currentTotal = 0,
  className,
}: CartDrawerShippingMeterProps) => {
  const progress = Math.min(100, Math.round((currentTotal / threshold) * 100));
  const diff = Math.max(0, threshold - currentTotal);

  return (
    <div className={cn('p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-2', className)}>
      <div className="flex justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400">
        <span>
          {diff === 0 ? 'Free Shipping Unlocked!' : `Add $${diff} for Free Express Shipping`}
        </span>
        <span>{progress}%</span>
      </div>
      <div className="w-full h-2 rounded-full bg-emerald-500/20 overflow-hidden">
        <div
          className="h-full bg-emerald-500 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export type CartDrawerPromoProps = {
  subtotal: number;
  defaultCoupon?: string;
  onApplyCoupon?: (code: string) => void;
  className?: string;
};

export const CartDrawerPromo = ({
  subtotal,
  defaultCoupon = 'PATIYA15',
  onApplyCoupon,
  className,
}: CartDrawerPromoProps) => {
  const [code, setCode] = useState(defaultCoupon);
  const [applied, setApplied] = useState(false);

  const handleApply = () => {
    if (code.trim()) {
      setApplied(true);
      onApplyCoupon?.(code);
    }
  };

  const discount = applied ? Math.round(subtotal * 0.15) : 0;
  const finalTotal = subtotal - discount;

  return (
    <div className={cn('space-y-4 p-4 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)]', className)}>
      <div className="flex gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="Enter voucher code"
          className="flex-1 px-3 py-2 text-xs uppercase font-mono rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] text-[var(--patiya-color-foreground)] outline-none focus:border-[var(--patiya-color-primary)]"
        />
        <Button size="sm" variant="solid" color="primary" onClick={handleApply}>
          Apply
        </Button>
      </div>
      {applied && (
        <div className="flex items-center justify-between text-xs text-emerald-600 dark:text-emerald-400 font-medium">
          <span>Coupon {code} applied (-15%)</span>
          <span>-${discount}</span>
        </div>
      )}
      <div className="flex items-center justify-between text-sm font-bold text-[var(--patiya-color-foreground)] pt-2 border-t border-[var(--patiya-color-border)]">
        <span>Order Total</span>
        <span>${finalTotal}</span>
      </div>
    </div>
  );
};

export type CartUpsellItem = {
  id?: string | number;
  name: string;
  price: number;
};

export type CartDrawerUpsellProps = {
  recommendations: CartUpsellItem[];
  onAddUpsell?: (item: CartUpsellItem) => void;
  className?: string;
};

export const CartDrawerUpsell = ({
  recommendations,
  onAddUpsell,
  className,
}: CartDrawerUpsellProps) => {
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const handleToggle = (item: CartUpsellItem, idx: number) => {
    const key = String(item.id || idx);
    setAddedIds((prev) => ({ ...prev, [key]: !prev[key] }));
    onAddUpsell?.(item);
  };

  return (
    <div className={cn('space-y-3', className)}>
      <h5 className="text-xs font-bold uppercase tracking-wider text-[var(--patiya-color-muted-foreground)]">
        Recommended Add-ons
      </h5>
      {recommendations.map((item, idx) => {
        const key = String(item.id || idx);
        const isAdded = !!addedIds[key];
        return (
          <div
            key={key}
            className="flex items-center justify-between p-3 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)]"
          >
            <div>
              <span className="text-sm font-medium text-[var(--patiya-color-foreground)] block">
                {item.name}
              </span>
              <span className="text-xs text-[var(--patiya-color-muted-foreground)]">
                ${item.price}
              </span>
            </div>
            <Button
              size="xs"
              variant={isAdded ? 'soft' : 'outline'}
              color={isAdded ? 'success' : 'primary'}
              onClick={() => handleToggle(item, idx)}
            >
              {isAdded ? 'Added ✓' : '+ Add'}
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export type CartDrawerEmptyProps = {
  title?: string;
  description?: string;
  categories?: string[];
  buttonText?: string;
  onAction?: () => void;
  className?: string;
};

export const CartDrawerEmpty = ({
  title = 'Your cart is empty',
  description = "Looks like you haven't added anything to your cart yet. Explore our curated catalog.",
  categories = ['Headphones', 'Keyboards', 'Smartwatches'],
  buttonText = 'Start Shopping',
  onAction,
  className,
}: CartDrawerEmptyProps) => {
  return (
    <div className={cn('p-8 text-center flex flex-col items-center justify-center space-y-4 my-auto', className)}>
      <div className="w-16 h-16 rounded-full bg-[var(--patiya-color-muted)] border border-[var(--patiya-color-border)] flex items-center justify-center text-2xl">
        🛍️
      </div>
      <div>
        <h4 className="font-semibold text-base text-[var(--patiya-color-foreground)]">
          {title}
        </h4>
        <p className="text-xs text-[var(--patiya-color-muted-foreground)] max-w-xs mt-1">
          {description}
        </p>
      </div>
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-1.5 justify-center pt-2">
          {categories.map((cat, idx) => (
            <Badge key={cat} variant="soft" color={idx === 0 ? 'primary' : 'muted'}>
              {cat}
            </Badge>
          ))}
        </div>
      )}
      <Button variant="solid" color="primary" onClick={onAction}>
        {buttonText}
      </Button>
    </div>
  );
};

export type CartDrawerExpressProps = {
  enableApplePay?: boolean;
  enablePayPal?: boolean;
  onApplePay?: () => void;
  onPayPal?: () => void;
  className?: string;
};

export const CartDrawerExpress = ({
  enableApplePay = true,
  enablePayPal = true,
  onApplePay,
  onPayPal,
  className,
}: CartDrawerExpressProps) => {
  return (
    <div className={cn('space-y-2', className)}>
      {enableApplePay && (
        <button
          type="button"
          onClick={onApplePay}
          className="w-full py-2.5 rounded-xl bg-black text-white dark:bg-white dark:text-black font-semibold text-xs flex items-center justify-center gap-2 hover:opacity-90 transition-opacity border border-[var(--patiya-color-border)] cursor-pointer"
        >
          <span>Pay</span> Express Checkout
        </button>
      )}
      {enablePayPal && (
        <button
          type="button"
          onClick={onPayPal}
          className="w-full py-2.5 rounded-xl bg-[#0070ba] text-white font-semibold text-xs flex items-center justify-center gap-2 hover:opacity-90 transition-opacity cursor-pointer"
        >
          PayPal Checkout
        </button>
      )}
    </div>
  );
};
