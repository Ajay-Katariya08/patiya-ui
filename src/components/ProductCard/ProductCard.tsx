import React, { useState } from 'react';
import { cn } from '../../utils/cn';
import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';
import { Rating } from '../Rating/Rating';

export type ProductColorOption = {
  id: string;
  label: string;
  bg: string;
};

export type ProductCardProps = React.HTMLAttributes<HTMLDivElement> & {
  title: string;
  description?: string;
  price: number | string;
  originalPrice?: number | string;
  rating?: number;
  reviewCount?: number | string;
  badge?: string;
  stockBadge?: string;
  verifiedText?: string;
  colors?: ProductColorOption[];
  image?: React.ReactNode;
  onAddToCart?: () => void;
  addedText?: string;
  buttonText?: string;
};

export const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  (
    {
      title,
      description,
      price,
      originalPrice,
      rating = 5,
      reviewCount,
      badge,
      stockBadge,
      verifiedText,
      colors = [],
      image,
      onAddToCart,
      addedText = 'Added to Cart ✓',
      buttonText = 'Add to Cart',
      className,
      ...props
    },
    ref
  ) => {
    const [selectedColor, setSelectedColor] = useState<string>(colors[0]?.id || '');
    const [added, setAdded] = useState(false);

    const handleAdd = () => {
      setAdded(true);
      onAddToCart?.();
      setTimeout(() => setAdded(false), 1600);
    };

    return (
      <div
        ref={ref}
        className={cn(
          'w-full max-w-sm mx-auto group rounded-3xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] p-4 shadow-sm hover:shadow-xl transition-all duration-300',
          className
        )}
        {...props}
      >
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-[var(--patiya-color-muted)] border border-[var(--patiya-color-border)]/60 flex items-center justify-center">
          {badge && (
            <span className="absolute top-3 left-3 z-10">
              <Badge variant="solid" color="primary" size="sm">
                {badge}
              </Badge>
            </span>
          )}
          {stockBadge && (
            <span className="absolute top-3 right-3 z-10">
              <Badge variant="soft" color="muted" size="sm">
                {stockBadge}
              </Badge>
            </span>
          )}
          <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-violet-500/20 to-sky-500/20 blur-2xl transition-transform duration-500 group-hover:scale-125" />
          {image ? (
            <div className="relative z-10 flex items-center justify-center p-6">
              {image}
            </div>
          ) : (
            <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center">
              <svg
                className="w-24 h-24 text-[var(--patiya-color-foreground)] transition-transform duration-500 group-hover:scale-105"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
              </svg>
            </div>
          )}
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Rating value={rating} max={5} size="sm" readOnly />
              {reviewCount !== undefined && (
                <span className="text-xs font-medium text-[var(--patiya-color-muted-foreground)]">
                  ({reviewCount})
                </span>
              )}
            </div>
            {verifiedText && (
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                {verifiedText}
              </span>
            )}
          </div>

          <div>
            <h3 className="font-semibold text-base text-[var(--patiya-color-foreground)] tracking-tight">
              {title}
            </h3>
            {description && (
              <p className="text-xs text-[var(--patiya-color-muted-foreground)] line-clamp-1 mt-0.5">
                {description}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-[var(--patiya-color-foreground)]">
                {typeof price === 'number' ? `$${price}` : price}
              </span>
              {originalPrice !== undefined && (
                <span className="text-xs line-through text-[var(--patiya-color-muted-foreground)]">
                  {typeof originalPrice === 'number' ? `$${originalPrice}` : originalPrice}
                </span>
              )}
            </div>
            {colors.length > 0 && (
              <div className="flex items-center gap-1.5">
                {colors.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedColor(c.id)}
                    className={cn(
                      'w-5 h-5 rounded-full border transition-all cursor-pointer',
                      selectedColor === c.id
                        ? 'ring-2 ring-[var(--patiya-color-primary)] ring-offset-2 scale-110'
                        : 'opacity-80 hover:opacity-100'
                    )}
                    style={{ backgroundColor: c.bg }}
                    aria-label={c.label}
                  />
                ))}
              </div>
            )}
          </div>

          <Button
            fullWidth
            variant={added ? 'soft' : 'solid'}
            color={added ? 'success' : 'primary'}
            size="md"
            onClick={handleAdd}
            className="transition-all"
          >
            {added ? addedText : buttonText}
          </Button>
        </div>
      </div>
    );
  }
);
ProductCard.displayName = 'ProductCard';

export type ProductCardMinimalProps = React.HTMLAttributes<HTMLDivElement> & {
  category?: string;
  title: string;
  price: number | string;
  sizes?: string[];
  image?: React.ReactNode;
  initialLiked?: boolean;
  onLikeChange?: (liked: boolean) => void;
  onSelectSize?: (size: string) => void;
};

export const ProductCardMinimal = React.forwardRef<HTMLDivElement, ProductCardMinimalProps>(
  (
    {
      category,
      title,
      price,
      sizes = [],
      image,
      initialLiked = false,
      onLikeChange,
      onSelectSize,
      className,
      ...props
    },
    ref
  ) => {
    const [liked, setLiked] = useState(initialLiked);
    const [activeSize, setActiveSize] = useState<string>(sizes[0] || '');

    const handleToggleLike = () => {
      const next = !liked;
      setLiked(next);
      onLikeChange?.(next);
    };

    const handleSize = (s: string) => {
      setActiveSize(s);
      onSelectSize?.(s);
    };

    return (
      <div
        ref={ref}
        className={cn(
          'w-full max-w-xs mx-auto rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] overflow-hidden group shadow-xs',
          className
        )}
        {...props}
      >
        <div className="relative aspect-[4/5] bg-[var(--patiya-color-muted)] border-b border-[var(--patiya-color-border)] flex items-center justify-center p-6">
          <button
            type="button"
            onClick={handleToggleLike}
            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-[var(--patiya-color-card)]/90 backdrop-blur-sm border border-[var(--patiya-color-border)] flex items-center justify-center shadow-xs hover:scale-110 transition-transform cursor-pointer"
            aria-label="Wishlist"
          >
            <svg
              className={cn(
                'w-4 h-4 transition-colors',
                liked ? 'fill-red-500 text-red-500' : 'text-[var(--patiya-color-muted-foreground)]'
              )}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </button>
          <div className="w-28 h-28 rounded-2xl bg-[var(--patiya-color-card)] border border-[var(--patiya-color-border)] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            {image || (
              <svg
                className="w-14 h-14 text-[var(--patiya-color-muted-foreground)]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            )}
          </div>
        </div>
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            {category && (
              <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--patiya-color-muted-foreground)]">
                {category}
              </span>
            )}
            <span className="text-sm font-bold text-[var(--patiya-color-foreground)]">
              {typeof price === 'number' ? `$${price}` : price}
            </span>
          </div>
          <h4 className="text-sm font-semibold text-[var(--patiya-color-foreground)] truncate">
            {title}
          </h4>
          {sizes.length > 0 && (
            <div className="flex items-center gap-1.5 pt-1">
              {sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => handleSize(s)}
                  className={cn(
                    'flex-1 py-1 text-xs font-medium rounded-lg border transition-colors cursor-pointer',
                    activeSize === s
                      ? 'border-[var(--patiya-color-primary)] bg-[var(--patiya-color-primary)] text-[var(--patiya-color-primary-foreground)] font-bold'
                      : 'border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] text-[var(--patiya-color-muted-foreground)] hover:bg-[var(--patiya-color-muted)] hover:text-[var(--patiya-color-foreground)]'
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
);
ProductCardMinimal.displayName = 'ProductCardMinimal';

export type ProductCardHorizontalProps = React.HTMLAttributes<HTMLDivElement> & {
  title: string;
  subtitle?: string;
  price: number | string;
  badge?: string;
  initialQty?: number;
  onQtyChange?: (qty: number) => void;
  onAddToCart?: () => void;
  buttonText?: string;
  image?: React.ReactNode;
};

export const ProductCardHorizontal = React.forwardRef<HTMLDivElement, ProductCardHorizontalProps>(
  (
    {
      title,
      subtitle,
      price,
      badge,
      initialQty = 1,
      onQtyChange,
      onAddToCart,
      buttonText = 'Move to Cart',
      image,
      className,
      ...props
    },
    ref
  ) => {
    const [qty, setQty] = useState(initialQty);

    const handleQty = (next: number) => {
      const clamped = Math.max(1, next);
      setQty(clamped);
      onQtyChange?.(clamped);
    };

    return (
      <div
        ref={ref}
        className={cn(
          'w-full max-w-lg mx-auto flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] shadow-xs',
          className
        )}
        {...props}
      >
        <div className="w-24 h-24 rounded-xl bg-[var(--patiya-color-muted)] border border-[var(--patiya-color-border)] flex items-center justify-center shrink-0">
          {image || (
            <svg
              className="w-12 h-12 text-[var(--patiya-color-muted-foreground)]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          )}
        </div>
        <div className="flex-1 min-w-0 space-y-1 w-full text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-between">
            {badge && (
              <Badge variant="soft" color="primary" size="sm">
                {badge}
              </Badge>
            )}
            <span className="text-base font-bold text-[var(--patiya-color-foreground)]">
              {typeof price === 'number' ? `$${price}` : price}
            </span>
          </div>
          <h4 className="font-semibold text-sm text-[var(--patiya-color-foreground)] truncate">
            {title}
          </h4>
          {subtitle && (
            <p className="text-xs text-[var(--patiya-color-muted-foreground)]">
              {subtitle}
            </p>
          )}
          <div className="flex items-center justify-center sm:justify-between pt-2 gap-3">
            <div className="inline-flex items-center border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] rounded-md text-xs">
              <button
                type="button"
                onClick={() => handleQty(qty - 1)}
                className="px-2 py-0.5 hover:bg-[var(--patiya-color-muted)] text-[var(--patiya-color-foreground)] cursor-pointer"
              >
                −
              </button>
              <span className="px-2 font-bold text-[var(--patiya-color-foreground)]">
                {qty}
              </span>
              <button
                type="button"
                onClick={() => handleQty(qty + 1)}
                className="px-2 py-0.5 hover:bg-[var(--patiya-color-muted)] text-[var(--patiya-color-foreground)] cursor-pointer"
              >
                +
              </button>
            </div>
            <Button size="sm" variant="solid" color="primary" onClick={onAddToCart}>
              {buttonText}
            </Button>
          </div>
        </div>
      </div>
    );
  }
);
ProductCardHorizontal.displayName = 'ProductCardHorizontal';

export type ProductCardFlashSaleProps = React.HTMLAttributes<HTMLDivElement> & {
  title: string;
  dealPrice: number | string;
  originalPrice: number | string;
  claimedPercent?: number;
  remainingText?: string;
  endsIn?: string;
  image?: React.ReactNode;
  onClaim?: () => void;
  buttonText?: string;
};

export const ProductCardFlashSale = React.forwardRef<HTMLDivElement, ProductCardFlashSaleProps>(
  (
    {
      title,
      dealPrice,
      originalPrice,
      claimedPercent = 80,
      remainingText,
      endsIn = '04 : 18 : 39',
      image,
      onClaim,
      buttonText = 'Claim Flash Deal',
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'w-full max-w-sm mx-auto rounded-3xl border border-red-500/20 bg-gradient-to-b from-red-500/[0.03] to-[var(--patiya-color-card)] p-4 relative overflow-hidden shadow-xs',
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between pb-3 border-b border-[var(--patiya-color-border)]">
          <div className="flex items-center gap-1.5 text-xs font-bold text-red-500">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span>FLASH SALE</span>
          </div>
          {endsIn && (
            <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20">
              {endsIn}
            </span>
          )}
        </div>
        <div className="py-6 flex items-center justify-center">
          <div className="w-28 h-28 rounded-2xl bg-[var(--patiya-color-muted)] border border-[var(--patiya-color-border)] flex items-center justify-center">
            {image || (
              <svg
                className="w-14 h-14 text-[var(--patiya-color-foreground)]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                <line x1="12" y1="18" x2="12.01" y2="18" />
              </svg>
            )}
          </div>
        </div>
        <div className="space-y-3">
          <h4 className="font-bold text-base text-[var(--patiya-color-foreground)]">
            {title}
          </h4>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-red-500">
              {typeof dealPrice === 'number' ? `$${dealPrice}` : dealPrice}
            </span>
            <span className="text-xs line-through text-[var(--patiya-color-muted-foreground)]">
              {typeof originalPrice === 'number' ? `$${originalPrice}` : originalPrice}
            </span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] text-[var(--patiya-color-muted-foreground)]">
              <span>Claimed: {claimedPercent}%</span>
              {remainingText && <span>{remainingText}</span>}
            </div>
            <div className="w-full h-1.5 rounded-full bg-[var(--patiya-color-muted)] border border-[var(--patiya-color-border)]/50 overflow-hidden">
              <div
                className="h-full bg-red-500 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, Math.max(0, claimedPercent))}%` }}
              />
            </div>
          </div>
          <Button
            fullWidth
            variant="solid"
            color="destructive"
            size="md"
            onClick={onClaim}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    );
  }
);
ProductCardFlashSale.displayName = 'ProductCardFlashSale';

export type ProductCardDigitalProps = React.HTMLAttributes<HTMLDivElement> & {
  title: string;
  description?: string;
  price: number | string;
  badge?: string;
  version?: string;
  license?: string;
  tags?: string[];
  onAction?: () => void;
  buttonText?: string;
};

export const ProductCardDigital = React.forwardRef<HTMLDivElement, ProductCardDigitalProps>(
  (
    {
      title,
      description,
      price,
      badge = 'Instant Delivery',
      version,
      license = 'Lifetime License',
      tags = [],
      onAction,
      buttonText = 'Get Access',
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'w-full max-w-sm mx-auto rounded-3xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] p-5 space-y-4 shadow-xs',
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between">
          {badge && (
            <Badge variant="soft" color="success" size="sm">
              {badge}
            </Badge>
          )}
          {version && (
            <span className="text-xs font-mono text-[var(--patiya-color-muted-foreground)]">
              {version}
            </span>
          )}
        </div>
        <div className="space-y-1">
          <h3 className="font-bold text-lg text-[var(--patiya-color-foreground)]">
            {title}
          </h3>
          {description && (
            <p className="text-xs text-[var(--patiya-color-muted-foreground)]">
              {description}
            </p>
          )}
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-2 py-0.5 rounded-md bg-[var(--patiya-color-muted)] text-[var(--patiya-color-foreground)] border border-[var(--patiya-color-border)] font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="pt-2 flex items-center justify-between border-t border-[var(--patiya-color-border)]">
          <div>
            {license && (
              <span className="text-xs text-[var(--patiya-color-muted-foreground)] block">
                {license}
              </span>
            )}
            <span className="text-xl font-bold text-[var(--patiya-color-foreground)]">
              {typeof price === 'number' ? `$${price}` : price}
            </span>
          </div>
          <Button variant="solid" color="primary" onClick={onAction}>
            {buttonText}
          </Button>
        </div>
      </div>
    );
  }
);
ProductCardDigital.displayName = 'ProductCardDigital';

export type ProductCardBundleProps = React.HTMLAttributes<HTMLDivElement> & {
  title: string;
  badge?: string;
  savingsText?: string;
  basePrice: number | string;
  bundlePrice: number | string;
  standardLabel?: string;
  bundleLabel?: string;
  onTierChange?: (tier: 'standard' | 'bundle') => void;
  onAction?: (tier: 'standard' | 'bundle') => void;
  buttonText?: string;
};

export const ProductCardBundle = React.forwardRef<HTMLDivElement, ProductCardBundleProps>(
  (
    {
      title,
      badge = 'Hardware Bundle',
      savingsText = 'Save 20%',
      basePrice,
      bundlePrice,
      standardLabel = 'Standard',
      bundleLabel = 'Bundle Kit',
      onTierChange,
      onAction,
      buttonText = 'Choose Option',
      className,
      ...props
    },
    ref
  ) => {
    const [activeTier, setActiveTier] = useState<'standard' | 'bundle'>('bundle');

    const handleTier = (tier: 'standard' | 'bundle') => {
      setActiveTier(tier);
      onTierChange?.(tier);
    };

    const currentPrice = activeTier === 'bundle' ? bundlePrice : basePrice;

    return (
      <div
        ref={ref}
        className={cn(
          'w-full max-w-sm mx-auto rounded-3xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] p-5 space-y-4 shadow-xs',
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between">
          {badge && (
            <Badge variant="solid" color="primary" size="sm">
              {badge}
            </Badge>
          )}
          {savingsText && (
            <span className="text-xs font-semibold text-emerald-500">
              {savingsText}
            </span>
          )}
        </div>
        <h3 className="font-bold text-base text-[var(--patiya-color-foreground)]">
          {title}
        </h3>
        <div className="grid grid-cols-2 gap-1 p-1 bg-[var(--patiya-color-muted)] rounded-xl text-xs font-semibold border border-[var(--patiya-color-border)]">
          <button
            type="button"
            onClick={() => handleTier('standard')}
            className={cn(
              'py-2 px-3 rounded-lg transition-all cursor-pointer',
              activeTier === 'standard'
                ? 'bg-[var(--patiya-color-card)] text-[var(--patiya-color-foreground)] shadow-xs font-bold border border-[var(--patiya-color-border)]'
                : 'text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)]'
            )}
          >
            {standardLabel}
          </button>
          <button
            type="button"
            onClick={() => handleTier('bundle')}
            className={cn(
              'py-2 px-3 rounded-lg transition-all cursor-pointer',
              activeTier === 'bundle'
                ? 'bg-[var(--patiya-color-card)] text-[var(--patiya-color-foreground)] shadow-xs font-bold border border-[var(--patiya-color-border)]'
                : 'text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)]'
            )}
          >
            {bundleLabel}
          </button>
        </div>
        <div className="pt-2 flex items-center justify-between border-t border-[var(--patiya-color-border)]">
          <div>
            <span className="text-xs text-[var(--patiya-color-muted-foreground)] block capitalize">
              {activeTier} Pricing
            </span>
            <span className="text-xl font-bold text-[var(--patiya-color-foreground)]">
              {typeof currentPrice === 'number' ? `$${currentPrice}` : currentPrice}
            </span>
          </div>
          <Button variant="solid" color="primary" onClick={() => onAction?.(activeTier)}>
            {buttonText}
          </Button>
        </div>
      </div>
    );
  }
);
ProductCardBundle.displayName = 'ProductCardBundle';
