import React, { useState } from 'react';
import { cn } from '../../utils/cn';
import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';

export type CheckoutItem = {
  id: string | number;
  title: string;
  price: number;
  quantity: number;
  image?: string;
  variant?: string;
};

export type ShippingTier = {
  id: string;
  label: string;
  price: number;
  eta: string;
};

export type CheckoutSummaryProps = React.HTMLAttributes<HTMLDivElement> & {
  items?: CheckoutItem[];
  subtotal?: number;
  discount?: number;
  shippingTiers?: ShippingTier[];
  selectedShippingId?: string;
  onShippingChange?: (id: string) => void;
  taxRate?: number;
  promoCode?: string;
  onApplyPromo?: (code: string) => void;
  onRemovePromo?: () => void;
  isPromoApplied?: boolean;
  onCheckout?: () => void;
  checkoutButtonText?: string;
  showApplePay?: boolean;
  showGuarantees?: boolean;
};

const defaultItems: CheckoutItem[] = [
  {
    id: '1',
    title: 'Studio Monitor Pro Headphones',
    price: 249.0,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=120&q=80',
    variant: 'Matte Onyx / 32 Ohm',
  },
  {
    id: '2',
    title: 'Braided Audio Cable & 6.3mm Adapter',
    price: 39.0,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=120&q=80',
    variant: '1.8m Silver-Plated',
  },
];

const defaultShippingTiers: ShippingTier[] = [
  { id: 'standard', label: 'Standard Delivery', price: 0, eta: '3-5 business days' },
  { id: 'express', label: 'Express Air', price: 12.0, eta: '1-2 business days' },
  { id: 'priority', label: 'Next-Day Priority', price: 24.0, eta: 'Delivered Tomorrow' },
];

export const CheckoutSummary = React.forwardRef<HTMLDivElement, CheckoutSummaryProps>(
  (
    {
      items = defaultItems,
      subtotal: explicitSubtotal,
      discount = 25.0,
      shippingTiers = defaultShippingTiers,
      selectedShippingId: controlledShippingId,
      onShippingChange,
      taxRate = 0.0825,
      promoCode: initialPromo = 'SAVE25',
      onApplyPromo,
      onRemovePromo,
      isPromoApplied: explicitPromoApplied,
      onCheckout,
      checkoutButtonText = 'Proceed to Checkout',
      showApplePay = true,
      showGuarantees = true,
      className,
      ...props
    },
    ref
  ) => {
    const [selectedShipping, setSelectedShipping] = useState(
      controlledShippingId || shippingTiers[0]?.id || 'standard'
    );
    const [promoInput, setPromoInput] = useState('');
    const [hasPromo, setHasPromo] = useState(explicitPromoApplied ?? true);
    const [appliedCode, setAppliedCode] = useState(initialPromo);
    const [itemsExpanded, setItemsExpanded] = useState(false);

    const activeShipping =
      shippingTiers.find((t) => t.id === (controlledShippingId || selectedShipping)) ||
      shippingTiers[0];

    const currentSubtotal =
      explicitSubtotal ??
      items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const shippingCost = activeShipping ? activeShipping.price : 0;
    const currentDiscount = hasPromo ? discount : 0;
    const taxableAmount = Math.max(0, currentSubtotal - currentDiscount);
    const estimatedTax = taxableAmount * taxRate;
    const finalTotal = Math.max(0, taxableAmount + shippingCost + estimatedTax);

    const handleApply = (e: React.FormEvent) => {
      e.preventDefault();
      if (!promoInput.trim()) return;
      setHasPromo(true);
      setAppliedCode(promoInput.trim().toUpperCase());
      onApplyPromo?.(promoInput.trim().toUpperCase());
      setPromoInput('');
    };

    const handleRemove = () => {
      setHasPromo(false);
      onRemovePromo?.();
    };

    const handleShippingSelect = (id: string) => {
      setSelectedShipping(id);
      onShippingChange?.(id);
    };

    return (
      <div
        ref={ref}
        className={cn(
          'w-full max-w-md mx-auto rounded-3xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] p-6 shadow-xs space-y-5',
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between pb-3 border-b border-[var(--patiya-color-border)]">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-base text-[var(--patiya-color-foreground)]">
              Order Summary
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-[var(--patiya-color-muted)] text-[var(--patiya-color-muted-foreground)]">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setItemsExpanded(!itemsExpanded)}
            className="text-xs font-semibold text-[var(--patiya-color-primary)] hover:underline cursor-pointer flex items-center gap-1"
          >
            <span>{itemsExpanded ? 'Hide items' : 'View items'}</span>
            <svg
              className={cn('w-3.5 h-3.5 transition-transform duration-200', itemsExpanded && 'rotate-180')}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>

        {itemsExpanded && (
          <div className="space-y-3 pb-3 border-b border-[var(--patiya-color-border)] animate-in fade-in duration-200">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 rounded-xl object-cover border border-[var(--patiya-color-border)] bg-[var(--patiya-color-muted)] shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <h5 className="text-xs font-semibold text-[var(--patiya-color-foreground)] truncate">
                    {item.title}
                  </h5>
                  {item.variant && (
                    <p className="text-[11px] text-[var(--patiya-color-muted-foreground)] truncate">
                      {item.variant}
                    </p>
                  )}
                  <span className="text-[11px] font-mono text-[var(--patiya-color-muted-foreground)]">
                    Qty: {item.quantity}
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-[var(--patiya-color-foreground)] shrink-0">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--patiya-color-muted-foreground)] block">
            Shipping Method
          </span>
          <div className="grid grid-cols-1 gap-2">
            {shippingTiers.map((tier) => {
              const active = tier.id === (controlledShippingId || selectedShipping);
              return (
                <div
                  key={tier.id}
                  onClick={() => handleShippingSelect(tier.id)}
                  className={cn(
                    'p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between',
                    active
                      ? 'border-[var(--patiya-color-primary)] bg-[var(--patiya-color-primary)]/5 shadow-2xs ring-1 ring-[var(--patiya-color-primary)]/30'
                      : 'border-[var(--patiya-color-border)] bg-[var(--patiya-color-muted)]/40 hover:bg-[var(--patiya-color-muted)]'
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={cn(
                        'w-4 h-4 rounded-full border flex items-center justify-center transition-all',
                        active
                          ? 'border-[var(--patiya-color-primary)] bg-[var(--patiya-color-primary)] text-white'
                          : 'border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)]'
                      )}
                    >
                      {active && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-[var(--patiya-color-foreground)]">
                          {tier.label}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-[var(--patiya-color-muted-foreground)] block">
                        {tier.eta}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-[var(--patiya-color-foreground)]">
                    {tier.price === 0 ? 'FREE' : `$${tier.price.toFixed(2)}`}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pt-1">
          {hasPromo ? (
            <div className="flex items-center justify-between p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                  <line x1="7" y1="7" x2="7.01" y2="7" />
                </svg>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-300">
                      {appliedCode}
                    </span>
                    <Badge variant="soft" color="success" size="sm">
                      Saved ${discount.toFixed(2)}
                    </Badge>
                  </div>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block">
                    Special promotional discount applied
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleRemove}
                className="text-xs text-[var(--patiya-color-muted-foreground)] hover:text-red-500 transition-colors p-1 cursor-pointer"
                aria-label="Remove promo code"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          ) : (
            <form onSubmit={handleApply} className="flex gap-2">
              <input
                type="text"
                placeholder="Enter promo or gift code"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-muted)] text-xs font-mono outline-none text-[var(--patiya-color-foreground)] placeholder:text-[var(--patiya-color-muted-foreground)] focus:border-[var(--patiya-color-primary)] focus:ring-1 focus:ring-[var(--patiya-color-primary)] transition-all"
              />
              <Button type="submit" size="sm" variant="outline" disabled={!promoInput.trim()}>
                Apply
              </Button>
            </form>
          )}
        </div>

        <div className="space-y-2 pt-2 border-t border-[var(--patiya-color-border)] text-xs">
          <div className="flex items-center justify-between text-[var(--patiya-color-muted-foreground)]">
            <span>Subtotal</span>
            <span className="font-mono text-[var(--patiya-color-foreground)]">
              ${currentSubtotal.toFixed(2)}
            </span>
          </div>

          {hasPromo && (
            <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
              <span className="flex items-center gap-1">
                <span>Discount ({appliedCode})</span>
              </span>
              <span className="font-mono">-${discount.toFixed(2)}</span>
            </div>
          )}

          <div className="flex items-center justify-between text-[var(--patiya-color-muted-foreground)]">
            <span>Shipping</span>
            <span className="font-mono text-[var(--patiya-color-foreground)]">
              {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
            </span>
          </div>

          <div className="flex items-center justify-between text-[var(--patiya-color-muted-foreground)]">
            <span className="flex items-center gap-1">
              <span>Estimated Tax</span>
              <span className="text-[10px] opacity-75">({(taxRate * 100).toFixed(2)}%)</span>
            </span>
            <span className="font-mono text-[var(--patiya-color-foreground)]">
              ${estimatedTax.toFixed(2)}
            </span>
          </div>

          <div className="flex items-baseline justify-between pt-3 border-t border-[var(--patiya-color-border)] text-base font-bold text-[var(--patiya-color-foreground)]">
            <div>
              <span>Total</span>
              <span className="text-[10px] font-normal text-[var(--patiya-color-muted-foreground)] block">
                Includes all taxes & delivery fees
              </span>
            </div>
            <span className="font-mono text-xl tracking-tight text-[var(--patiya-color-primary)]">
              ${finalTotal.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="space-y-2 pt-1">
          <Button fullWidth size="lg" variant="solid" color="primary" onClick={onCheckout}>
            {checkoutButtonText}
          </Button>

          {showApplePay && (
            <button
              type="button"
              onClick={onCheckout}
              className="w-full h-11 rounded-2xl bg-black text-white hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs border border-neutral-700"
            >
              <span className="text-xs font-semibold tracking-wide flex items-center gap-1.5">
                <span>Pay with</span>
                <svg className="h-4.5 w-auto fill-current" viewBox="0 0 170 170">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.58-7.7-11.66-13.98-5.99-9.24-10.77-19.78-14.34-31.62-3.57-11.84-5.36-23.01-5.36-33.51 0-14.99 3.82-27.67 11.45-38.03 7.63-10.37 17.37-15.65 29.23-15.86 4.89 0 10.23 1.25 16.03 3.76 5.8 2.51 9.77 3.82 11.91 3.93 1.94 0 6.09-1.39 12.44-4.17 6.35-2.78 11.83-4.04 16.44-3.76 13.91.87 24.64 5.92 32.18 15.15-12.18 7.39-18.15 17.51-17.93 30.34.22 10.1 4.13 18.63 11.75 25.59 7.62 6.96 16.71 10.83 27.27 11.62-2.18 6.52-4.9 13.06-8.17 19.63zM119.22 31.84c0-7.72 2.76-14.94 8.28-21.67 5.53-6.73 12.39-10.17 20.6-10.17.22 1.09.33 2.18.33 3.27 0 7.5-2.88 14.77-8.62 21.82-5.75 7.06-12.72 10.74-20.91 11.06-.21-1.3-.32-2.39-.32-3.27z" />
                </svg>
                <span className="font-bold text-sm">Pay</span>
              </span>
            </button>
          )}
        </div>

        {showGuarantees && (
          <div className="pt-2 border-t border-[var(--patiya-color-border)]/60 grid grid-cols-3 gap-2 text-center">
            <div className="space-y-0.5">
              <svg className="w-3.5 h-3.5 mx-auto text-[var(--patiya-color-muted-foreground)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span className="text-[10px] text-[var(--patiya-color-muted-foreground)] block">
                256-Bit SSL
              </span>
            </div>
            <div className="space-y-0.5">
              <svg className="w-3.5 h-3.5 mx-auto text-[var(--patiya-color-muted-foreground)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
              </svg>
              <span className="text-[10px] text-[var(--patiya-color-muted-foreground)] block">
                30-Day Returns
              </span>
            </div>
            <div className="space-y-0.5">
              <svg className="w-3.5 h-3.5 mx-auto text-[var(--patiya-color-muted-foreground)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 14 14" />
              </svg>
              <span className="text-[10px] text-[var(--patiya-color-muted-foreground)] block">
                Fast Delivery
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }
);
CheckoutSummary.displayName = 'CheckoutSummary';

export type CheckoutSummaryPromoProps = React.HTMLAttributes<HTMLDivElement> & {
  appliedCode?: string;
  discountAmount?: number;
  onApply?: (code: string) => void;
  onRemove?: () => void;
};

export const CheckoutSummaryPromo = React.forwardRef<HTMLDivElement, CheckoutSummaryPromoProps>(
  (
    {
      appliedCode = 'SUMMER30',
      discountAmount = 35.0,
      onApply,
      onRemove,
      className,
      ...props
    },
    ref
  ) => {
    const [code, setCode] = useState('');
    const [applied, setApplied] = useState(Boolean(appliedCode));

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!code.trim()) return;
      setApplied(true);
      onApply?.(code.trim().toUpperCase());
    };

    return (
      <div
        ref={ref}
        className={cn(
          'w-full max-w-sm mx-auto rounded-3xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] p-5 shadow-xs space-y-3',
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--patiya-color-muted-foreground)]">
            Promo & Gift Voucher
          </span>
          <span className="text-[11px] font-semibold text-[var(--patiya-color-primary)]">
            One per order
          </span>
        </div>

        {applied ? (
          <div className="flex items-center justify-between p-3 rounded-2xl bg-[var(--patiya-color-muted)] border border-[var(--patiya-color-border)]">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-[var(--patiya-color-foreground)] block">
                  {appliedCode}
                </span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                  -${discountAmount.toFixed(2)} applied to checkout
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setApplied(false);
                onRemove?.();
              }}
              className="text-xs text-[var(--patiya-color-muted-foreground)] hover:text-red-500 font-semibold transition-colors cursor-pointer"
            >
              Remove
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. FLASH50"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-muted)] text-xs font-mono outline-none text-[var(--patiya-color-foreground)] placeholder:text-[var(--patiya-color-muted-foreground)] focus:border-[var(--patiya-color-primary)] transition-all"
            />
            <Button size="sm" variant="solid" color="primary" type="submit" disabled={!code.trim()}>
              Apply
            </Button>
          </form>
        )}
      </div>
    );
  }
);
CheckoutSummaryPromo.displayName = 'CheckoutSummaryPromo';

export type CheckoutSummaryInstallmentsProps = React.HTMLAttributes<HTMLDivElement> & {
  orderTotal?: number;
  installmentsCount?: number;
  provider?: 'klarna' | 'afterpay' | 'affirm';
  onLearnMore?: () => void;
};

export const CheckoutSummaryInstallments = React.forwardRef<HTMLDivElement, CheckoutSummaryInstallmentsProps>(
  (
    {
      orderTotal = 240.0,
      installmentsCount = 4,
      provider = 'klarna',
      onLearnMore,
      className,
      ...props
    },
    ref
  ) => {
    const installmentAmount = orderTotal / installmentsCount;

    return (
      <div
        ref={ref}
        className={cn(
          'w-full max-w-sm mx-auto rounded-3xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] p-5 shadow-xs space-y-4',
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--patiya-color-muted-foreground)]">
            Flexible Financing
          </span>
          <Badge variant="soft" color="primary" size="sm">
            0% APR
          </Badge>
        </div>

        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-2xl font-black text-[var(--patiya-color-foreground)] font-mono">
              ${installmentAmount.toFixed(2)}
            </span>
            <span className="text-xs text-[var(--patiya-color-muted-foreground)] ml-1">
              / payment
            </span>
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--patiya-color-primary)]">
            {provider}
          </span>
        </div>

        <div className="grid grid-cols-4 gap-1.5 pt-1">
          {Array.from({ length: installmentsCount }).map((_, i) => (
            <div
              key={i}
              className={cn(
                'p-2 rounded-xl text-center border',
                i === 0
                  ? 'bg-[var(--patiya-color-primary)]/10 border-[var(--patiya-color-primary)] text-[var(--patiya-color-primary)]'
                  : 'bg-[var(--patiya-color-muted)]/50 border-[var(--patiya-color-border)] text-[var(--patiya-color-muted-foreground)]'
              )}
            >
              <span className="text-[10px] font-mono block font-bold">
                {i === 0 ? 'Today' : `Week ${i * 2}`}
              </span>
              <span className="text-[11px] font-mono font-bold block mt-0.5">
                ${installmentAmount.toFixed(0)}
              </span>
            </div>
          ))}
        </div>

        <p className="text-[11px] text-[var(--patiya-color-muted-foreground)] leading-relaxed">
          4 interest-free bi-weekly payments of ${installmentAmount.toFixed(2)}. No hidden fees or impact on credit score.{' '}
          <button
            type="button"
            onClick={onLearnMore}
            className="text-[var(--patiya-color-primary)] font-semibold underline cursor-pointer"
          >
            Learn more
          </button>
        </p>
      </div>
    );
  }
);
CheckoutSummaryInstallments.displayName = 'CheckoutSummaryInstallments';

export type CheckoutSummaryStickyProps = React.HTMLAttributes<HTMLDivElement> & {
  subtotal?: number;
  freeShippingThreshold?: number;
  onCheckout?: () => void;
};

export const CheckoutSummarySticky = React.forwardRef<HTMLDivElement, CheckoutSummaryStickyProps>(
  (
    {
      subtotal = 85.0,
      freeShippingThreshold = 100.0,
      onCheckout,
      className,
      ...props
    },
    ref
  ) => {
    const diff = Math.max(0, freeShippingThreshold - subtotal);
    const progress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

    return (
      <div
        ref={ref}
        className={cn(
          'w-full max-w-lg mx-auto rounded-3xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)]/95 backdrop-blur-md p-4 shadow-md space-y-3',
          className
        )}
        {...props}
      >
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-[var(--patiya-color-foreground)] flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-[var(--patiya-color-primary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
                <path d="M15 18H9" />
                <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
                <circle cx="17" cy="18.5" r="2.5" />
                <circle cx="7" cy="18.5" r="2.5" />
              </svg>
              <span>{diff === 0 ? 'Unlocked Free Express Delivery!' : `Add $${diff.toFixed(2)} for Free Shipping`}</span>
            </span>
            <span className="font-mono text-[var(--patiya-color-muted-foreground)]">
              {progress.toFixed(0)}%
            </span>
          </div>
          <div className="h-1.5 w-full bg-[var(--patiya-color-muted)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--patiya-color-primary)] transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div>
            <span className="text-[11px] font-mono text-[var(--patiya-color-muted-foreground)] block">
              Cart Subtotal
            </span>
            <span className="text-xl font-bold font-mono text-[var(--patiya-color-foreground)]">
              ${subtotal.toFixed(2)}
            </span>
          </div>
          <Button size="md" variant="solid" color="primary" onClick={onCheckout} className="gap-2">
            <span>Checkout</span>
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Button>
        </div>
      </div>
    );
  }
);
CheckoutSummarySticky.displayName = 'CheckoutSummarySticky';

export type CheckoutSummaryReceiptProps = React.HTMLAttributes<HTMLDivElement> & {
  orderId?: string;
  orderDate?: string;
  items?: CheckoutItem[];
  subtotal?: number;
  discount?: number;
  shipping?: number;
  tax?: number;
  total?: number;
  paymentMethod?: string;
  onDownloadInvoice?: () => void;
};

export const CheckoutSummaryReceipt = React.forwardRef<HTMLDivElement, CheckoutSummaryReceiptProps>(
  (
    {
      orderId = 'ORD-2026-9941',
      orderDate = 'Oct 26, 2026',
      items = defaultItems,
      subtotal = 288.0,
      discount = 25.0,
      shipping = 0.0,
      tax = 21.7,
      total = 284.7,
      paymentMethod = 'Apple Pay (•••• 4920)',
      onDownloadInvoice,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'w-full max-w-md mx-auto rounded-3xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] p-6 shadow-xs space-y-5',
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between pb-3 border-b border-[var(--patiya-color-border)]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[var(--patiya-color-foreground)]">
                {orderId}
              </span>
              <Badge variant="soft" color="success" size="sm">
                Paid
              </Badge>
            </div>
            <span className="text-[11px] font-mono text-[var(--patiya-color-muted-foreground)] block mt-0.5">
              {orderDate}
            </span>
          </div>
          <Button size="sm" variant="outline" onClick={onDownloadInvoice} className="gap-1.5">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>Invoice</span>
          </Button>
        </div>

        <div className="space-y-2.5">
          {items.map((it) => (
            <div key={it.id} className="flex items-center justify-between text-xs">
              <div className="min-w-0 pr-2">
                <span className="font-semibold text-[var(--patiya-color-foreground)] block truncate">
                  {it.title}
                </span>
                <span className="text-[11px] text-[var(--patiya-color-muted-foreground)] font-mono">
                  Qty: {it.quantity}
                </span>
              </div>
              <span className="font-mono font-bold text-[var(--patiya-color-foreground)] shrink-0">
                ${(it.price * it.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <div className="space-y-2 pt-3 border-t border-[var(--patiya-color-border)] text-xs">
          <div className="flex items-center justify-between text-[var(--patiya-color-muted-foreground)]">
            <span>Subtotal</span>
            <span className="font-mono text-[var(--patiya-color-foreground)]">${subtotal.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
              <span>Promo Savings</span>
              <span className="font-mono">-${discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex items-center justify-between text-[var(--patiya-color-muted-foreground)]">
            <span>Shipping</span>
            <span className="font-mono text-[var(--patiya-color-foreground)]">
              {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
            </span>
          </div>
          <div className="flex items-center justify-between text-[var(--patiya-color-muted-foreground)]">
            <span>Tax</span>
            <span className="font-mono text-[var(--patiya-color-foreground)]">${tax.toFixed(2)}</span>
          </div>
          <div className="flex items-baseline justify-between pt-2 border-t border-[var(--patiya-color-border)] text-base font-bold text-[var(--patiya-color-foreground)]">
            <span>Total Paid</span>
            <span className="font-mono text-lg text-[var(--patiya-color-primary)]">${total.toFixed(2)}</span>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-[var(--patiya-color-muted)]/60 border border-[var(--patiya-color-border)]/60 flex items-center justify-between text-xs">
          <span className="text-[var(--patiya-color-muted-foreground)]">Charged to</span>
          <span className="font-mono font-semibold text-[var(--patiya-color-foreground)]">
            {paymentMethod}
          </span>
        </div>
      </div>
    );
  }
);
CheckoutSummaryReceipt.displayName = 'CheckoutSummaryReceipt';
