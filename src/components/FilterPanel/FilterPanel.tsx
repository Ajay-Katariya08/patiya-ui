import React, { useState } from "react";
import { cn } from "../../utils/cn";
import { Badge } from "../Badge/Badge";
import { Rating } from "../Rating/Rating";

export type FilterCategory = {
  id: string;
  label: string;
  count?: number;
};

export type FilterColor = {
  id: string;
  label: string;
  value: string;
};

export type FilterPanelProps = React.HTMLAttributes<HTMLDivElement> & {
  categories?: FilterCategory[];
  selectedCategories?: string[];
  onCategoryToggle?: (id: string) => void;
  minPrice?: number;
  maxPrice?: number;
  priceRange?: [number, number];
  onPriceChange?: (range: [number, number]) => void;
  colors?: FilterColor[];
  selectedColors?: string[];
  onColorToggle?: (id: string) => void;
  sizes?: string[];
  selectedSizes?: string[];
  onSizeToggle?: (size: string) => void;
  inStockOnly?: boolean;
  onInStockChange?: (val: boolean) => void;
  selectedRating?: number;
  onRatingChange?: (rating: number) => void;
  onResetAll?: () => void;
  activeCount?: number;
};

const defaultCategories: FilterCategory[] = [
  { id: "headphones", label: "Over-Ear Headphones", count: 42 },
  { id: "earbuds", label: "Wireless Earbuds", count: 28 },
  { id: "speakers", label: "Portable Speakers", count: 19 },
  { id: "accessories", label: "Cables & DACS", count: 14 },
];

const defaultColors: FilterColor[] = [
  { id: "black", label: "Matte Black", value: "#18181b" },
  { id: "white", label: "Arctic White", value: "#f4f4f5" },
  { id: "indigo", label: "Deep Indigo", value: "#4f46e5" },
  { id: "emerald", label: "Forest Green", value: "#059669" },
  { id: "amber", label: "Warm Amber", value: "#d97706" },
];

const defaultSizes = ["XS", "S", "M", "L", "XL"];

export const FilterPanel = React.forwardRef<HTMLDivElement, FilterPanelProps>(
  (
    {
      categories = defaultCategories,
      selectedCategories = ["headphones"],
      onCategoryToggle,
      minPrice = 0,
      maxPrice = 500,
      priceRange = [50, 350],
      onPriceChange,
      colors = defaultColors,
      selectedColors = ["black"],
      onColorToggle,
      sizes = defaultSizes,
      selectedSizes = ["M"],
      onSizeToggle,
      inStockOnly = true,
      onInStockChange,
      selectedRating = 4,
      onRatingChange,
      onResetAll,
      activeCount = 3,
      className,
      ...props
    },
    ref,
  ) => {
    const [currRange, setCurrRange] = useState<[number, number]>(priceRange);
    const [inStock, setInStock] = useState(inStockOnly);

    const handlePrice = (val: number, isMin: boolean) => {
      const next: [number, number] = isMin
        ? [Math.min(val, currRange[1]), currRange[1]]
        : [currRange[0], Math.max(val, currRange[0])];
      setCurrRange(next);
      onPriceChange?.(next);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-xs mx-auto rounded-3xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] p-5 shadow-xs space-y-6",
          className,
        )}
        {...props}
      >
        <div className="flex items-center justify-between pb-3 border-b border-[var(--patiya-color-border)]">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-base text-[var(--patiya-color-foreground)]">
              Filters
            </h3>
            {activeCount > 0 && (
              <Badge variant="solid" color="primary" size="sm">
                {activeCount}
              </Badge>
            )}
          </div>
          {onResetAll && (
            <button
              type="button"
              onClick={onResetAll}
              className="text-xs font-semibold text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] transition-colors cursor-pointer"
            >
              Reset all
            </button>
          )}
        </div>

        <div className="space-y-3">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--patiya-color-muted-foreground)] block">
            Category
          </span>
          <div className="space-y-1.5">
            {categories.map((cat) => {
              const checked = selectedCategories.includes(cat.id);
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onCategoryToggle?.(cat.id)}
                  className={cn(
                    "w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs transition-colors cursor-pointer text-left",
                    checked
                      ? "bg-[var(--patiya-color-primary)]/10 text-[var(--patiya-color-primary)] font-semibold"
                      : "text-[var(--patiya-color-foreground)] hover:bg-[var(--patiya-color-muted)]",
                  )}
                >
                  <span>{cat.label}</span>
                  {cat.count !== undefined && (
                    <span className="font-mono text-[11px] opacity-70">
                      ({cat.count})
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-3 pt-2 border-t border-[var(--patiya-color-border)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--patiya-color-muted-foreground)]">
              Price Range
            </span>
            <span className="text-xs font-mono font-bold text-[var(--patiya-color-foreground)]">
              ${currRange[0]} - ${currRange[1]}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center border border-[var(--patiya-color-border)] rounded-xl px-2.5 py-1 bg-[var(--patiya-color-muted)]/50">
              <span className="text-xs text-[var(--patiya-color-muted-foreground)] mr-1">
                $
              </span>
              <input
                type="number"
                min={minPrice}
                max={currRange[1]}
                value={currRange[0]}
                onChange={(e) => handlePrice(Number(e.target.value), true)}
                className="w-full bg-transparent text-xs font-mono font-semibold outline-none text-[var(--patiya-color-foreground)]"
              />
            </div>
            <div className="flex items-center border border-[var(--patiya-color-border)] rounded-xl px-2.5 py-1 bg-[var(--patiya-color-muted)]/50">
              <span className="text-xs text-[var(--patiya-color-muted-foreground)] mr-1">
                $
              </span>
              <input
                type="number"
                min={currRange[0]}
                max={maxPrice}
                value={currRange[1]}
                onChange={(e) => handlePrice(Number(e.target.value), false)}
                className="w-full bg-transparent text-xs font-mono font-semibold outline-none text-[var(--patiya-color-foreground)]"
              />
            </div>
          </div>
        </div>

        <div className="space-y-3 pt-2 border-t border-[var(--patiya-color-border)]">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--patiya-color-muted-foreground)] block">
            Color Finish
          </span>
          <div className="flex flex-wrap gap-2">
            {colors.map((c) => {
              const active = selectedColors.includes(c.id);
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => onColorToggle?.(c.id)}
                  className={cn(
                    "w-7 h-7 rounded-full border flex items-center justify-center transition-all cursor-pointer relative shadow-2xs",
                    active
                      ? "ring-2 ring-[var(--patiya-color-primary)] ring-offset-2 scale-110"
                      : "opacity-80 hover:opacity-100 hover:scale-105",
                  )}
                  style={{ backgroundColor: c.value }}
                  aria-label={c.label}
                >
                  {active && (
                    <svg
                      className={cn(
                        "w-2.5 h-2.5",
                        c.id === "white" ? "text-black" : "text-white",
                      )}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {sizes.length > 0 && (
          <div className="space-y-3 pt-2 border-t border-[var(--patiya-color-border)]">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--patiya-color-muted-foreground)] block">
              Size
            </span>
            <div className="grid grid-cols-5 gap-1.5">
              {sizes.map((s) => {
                const active = selectedSizes.includes(s);
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => onSizeToggle?.(s)}
                    className={cn(
                      "py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer text-center",
                      active
                        ? "border-[var(--patiya-color-primary)] bg-[var(--patiya-color-primary)] text-white"
                        : "border-[var(--patiya-color-border)] bg-[var(--patiya-color-muted)]/40 text-[var(--patiya-color-foreground)] hover:bg-[var(--patiya-color-muted)]",
                    )}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="space-y-3 pt-2 border-t border-[var(--patiya-color-border)]">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--patiya-color-muted-foreground)] block">
            Customer Rating
          </span>
          <div className="space-y-1">
            {[4, 3, 2].map((r) => {
              const active = selectedRating === r;
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => onRatingChange?.(r)}
                  className={cn(
                    "w-full flex items-center justify-between px-2.5 py-1 rounded-xl text-xs transition-colors cursor-pointer",
                    active
                      ? "bg-[var(--patiya-color-primary)]/10 text-[var(--patiya-color-primary)] font-semibold"
                      : "hover:bg-[var(--patiya-color-muted)] text-[var(--patiya-color-foreground)]",
                  )}
                >
                  <div className="flex items-center gap-1.5">
                    <Rating value={r} max={5} size="sm" readOnly />
                    <span>& up</span>
                  </div>
                  {active && <span>✓</span>}
                </button>
              );
            })}
          </div>
        </div>

        <div className="pt-2 border-t border-[var(--patiya-color-border)] flex items-center justify-between">
          <span className="text-xs font-medium text-[var(--patiya-color-foreground)]">
            In Stock Only
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={inStock}
            onClick={() => {
              const next = !inStock;
              setInStock(next);
              onInStockChange?.(next);
            }}
            className={cn(
              "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
              inStock
                ? "bg-[var(--patiya-color-primary)]"
                : "bg-[var(--patiya-color-border)]",
            )}
          >
            <span
              className={cn(
                "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out",
                inStock ? "translate-x-4" : "translate-x-0",
              )}
            />
          </button>
        </div>
      </div>
    );
  },
);
FilterPanel.displayName = "FilterPanel";

export type FilterPanelHorizontalProps =
  React.HTMLAttributes<HTMLDivElement> & {
    filters?: { id: string; label: string; activeCount?: number }[];
    onFilterClick?: (id: string) => void;
    onClearAll?: () => void;
  };

export const FilterPanelHorizontal = React.forwardRef<
  HTMLDivElement,
  FilterPanelHorizontalProps
>(
  (
    {
      filters = [
        { id: "price", label: "Price: $50-$350", activeCount: 1 },
        { id: "brand", label: "Brand (2)", activeCount: 2 },
        { id: "color", label: "Color: Black" },
        { id: "rating", label: "★ 4.0+" },
        { id: "stock", label: "In Stock" },
      ],
      onFilterClick,
      onClearAll,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-3xl mx-auto flex flex-wrap items-center gap-2 p-3 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] shadow-xs",
          className,
        )}
        {...props}
      >
        <span className="text-xs font-bold text-[var(--patiya-color-foreground)] mr-1">
          Filter by:
        </span>
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => onFilterClick?.(f.id)}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all cursor-pointer",
              f.activeCount
                ? "border-[var(--patiya-color-primary)] bg-[var(--patiya-color-primary)]/10 text-[var(--patiya-color-primary)] font-semibold"
                : "border-[var(--patiya-color-border)] bg-[var(--patiya-color-muted)]/50 text-[var(--patiya-color-foreground)] hover:bg-[var(--patiya-color-muted)]",
            )}
          >
            <span>{f.label}</span>
            <svg
              className="w-3 h-3 opacity-60"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        ))}
        {onClearAll && (
          <button
            type="button"
            onClick={onClearAll}
            className="text-xs font-semibold text-[var(--patiya-color-muted-foreground)] hover:text-red-500 transition-colors ml-auto cursor-pointer"
          >
            Clear all
          </button>
        )}
      </div>
    );
  },
);
FilterPanelHorizontal.displayName = "FilterPanelHorizontal";

export type FilterTag = {
  id: string;
  label: string;
  value: string;
};

export type FilterPanelTagsProps = React.HTMLAttributes<HTMLDivElement> & {
  tags?: FilterTag[];
  onRemoveTag?: (id: string) => void;
  onClearAll?: () => void;
  resultCount?: number;
};

export const FilterPanelTags = React.forwardRef<
  HTMLDivElement,
  FilterPanelTagsProps
>(
  (
    {
      tags = [
        { id: "1", label: "Category", value: "Over-Ear" },
        { id: "2", label: "Price", value: "Under $300" },
        { id: "3", label: "Color", value: "Onyx Black" },
        { id: "4", label: "Rating", value: "4+ Stars" },
      ],
      onRemoveTag,
      onClearAll,
      resultCount = 38,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-2xl mx-auto flex flex-wrap items-center gap-2 py-2 text-xs",
          className,
        )}
        {...props}
      >
        <span className="font-semibold text-[var(--patiya-color-muted-foreground)]">
          {resultCount} Results:
        </span>
        {tags.map((tag) => (
          <span
            key={tag.id}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[var(--patiya-color-muted)] text-[var(--patiya-color-foreground)] border border-[var(--patiya-color-border)] font-medium"
          >
            <span className="opacity-60">{tag.label}:</span>
            <span className="font-semibold">{tag.value}</span>
            <button
              type="button"
              onClick={() => onRemoveTag?.(tag.id)}
              className="hover:text-red-500 transition-colors cursor-pointer ml-0.5"
              aria-label={`Remove ${tag.value}`}
            >
              ×
            </button>
          </span>
        ))}
        {tags.length > 0 && onClearAll && (
          <button
            type="button"
            onClick={onClearAll}
            className="text-xs font-semibold text-[var(--patiya-color-primary)] hover:underline cursor-pointer ml-1"
          >
            Clear all
          </button>
        )}
      </div>
    );
  },
);
FilterPanelTags.displayName = "FilterPanelTags";

export type FilterPanelSortProps = React.HTMLAttributes<HTMLDivElement> & {
  sortBy?: string;
  onSortChange?: (sort: string) => void;
  viewMode?: "grid" | "list";
  onViewModeChange?: (mode: "grid" | "list") => void;
  totalProducts?: number;
};

export const FilterPanelSort = React.forwardRef<
  HTMLDivElement,
  FilterPanelSortProps
>(
  (
    {
      sortBy = "featured",
      onSortChange,
      viewMode = "grid",
      onViewModeChange,
      totalProducts = 124,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-3xl mx-auto flex items-center justify-between p-3 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] shadow-xs",
          className,
        )}
        {...props}
      >
        <span className="text-xs text-[var(--patiya-color-muted-foreground)] font-medium">
          Showing{" "}
          <span className="font-bold text-[var(--patiya-color-foreground)]">
            {totalProducts}
          </span>{" "}
          items
        </span>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-[var(--patiya-color-muted-foreground)]">
              Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => onSortChange?.(e.target.value)}
              className="bg-[var(--patiya-color-muted)] text-[var(--patiya-color-foreground)] border border-[var(--patiya-color-border)] rounded-lg px-2.5 py-1 text-xs font-semibold outline-none cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>

          <div className="flex items-center border border-[var(--patiya-color-border)] rounded-lg p-0.5 bg-[var(--patiya-color-muted)]">
            <button
              type="button"
              onClick={() => onViewModeChange?.("grid")}
              className={cn(
                "p-1.5 rounded-md transition-all cursor-pointer",
                viewMode === "grid"
                  ? "bg-[var(--patiya-color-card)] text-[var(--patiya-color-foreground)] shadow-2xs"
                  : "text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)]",
              )}
              aria-label="Grid view"
            >
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange?.("list")}
              className={cn(
                "p-1.5 rounded-md transition-all cursor-pointer",
                viewMode === "list"
                  ? "bg-[var(--patiya-color-card)] text-[var(--patiya-color-foreground)] shadow-2xs"
                  : "text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)]",
              )}
              aria-label="List view"
            >
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  },
);
FilterPanelSort.displayName = "FilterPanelSort";
