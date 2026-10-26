import React, { useState, useRef, useCallback } from "react";
import { cn } from "../../utils/cn";
import { Badge } from "../Badge/Badge";

export type ProductGalleryImage = {
  id: string | number;
  src: string;
  alt?: string;
  thumbnail?: string;
  title?: string;
};

export type ProductGalleryProps = React.HTMLAttributes<HTMLDivElement> & {
  images: ProductGalleryImage[];
  thumbnailPosition?: "left" | "bottom" | "right";
  aspectRatio?: "square" | "video" | "portrait";
  enableZoom?: boolean;
  showBadges?: boolean;
  badgeText?: string;
  showLightbox?: boolean;
  initialIndex?: number;
  onImageChange?: (index: number) => void;
};

export const ProductGallery = React.forwardRef<
  HTMLDivElement,
  ProductGalleryProps
>(
  (
    {
      images = [],
      thumbnailPosition = "left",
      aspectRatio = "square",
      enableZoom = true,
      showBadges = true,
      badgeText = "NEW ARRIVAL",
      showLightbox = true,
      initialIndex = 0,
      onImageChange,
      className,
      ...props
    },
    ref,
  ) => {
    const [activeIndex, setActiveIndex] = useState(initialIndex);
    const [isZoomed, setIsZoomed] = useState(false);
    const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const mainImageRef = useRef<HTMLDivElement>(null);

    const activeImage = images[activeIndex] || images[0];

    const handleSelect = (idx: number) => {
      setActiveIndex(idx);
      onImageChange?.(idx);
    };

    const handleMouseMove = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!enableZoom || !mainImageRef.current) return;
        const rect = mainImageRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setZoomPos({
          x: Math.max(0, Math.min(100, x)),
          y: Math.max(0, Math.min(100, y)),
        });
      },
      [enableZoom],
    );

    const aspectClasses = {
      square: "aspect-square",
      video: "aspect-video",
      portrait: "aspect-[3/4]",
    };

    const isVertical =
      thumbnailPosition === "left" || thumbnailPosition === "right";

    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-4xl mx-auto flex gap-4 select-none",
          isVertical ? "flex-col md:flex-row" : "flex-col",
          thumbnailPosition === "right" && "md:flex-row-reverse",
          className,
        )}
        {...props}
      >
        {images.length > 1 && (
          <div
            className={cn(
              "flex gap-2.5 overflow-auto custom-scrollbar shrink-0",
              isVertical ? "md:flex-col md:w-20" : "flex-row",
            )}
          >
            {images.map((img, idx) => {
              const selected = idx === activeIndex;
              return (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => handleSelect(idx)}
                  className={cn(
                    "relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border transition-all duration-200 shrink-0 cursor-pointer bg-[var(--patiya-color-muted)]",
                    selected
                      ? "border-[var(--patiya-color-primary)] ring-2 ring-[var(--patiya-color-primary)]/30 scale-95 shadow-md"
                      : "border-[var(--patiya-color-border)] opacity-70 hover:opacity-100 hover:scale-[1.02]",
                  )}
                  aria-label={`Thumbnail ${idx + 1}`}
                >
                  <img
                    src={img.thumbnail || img.src}
                    alt={img.alt || `Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {selected && (
                    <span className="absolute inset-0 bg-[var(--patiya-color-primary)]/10" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        <div className="relative flex-1 min-w-0">
          <div
            ref={mainImageRef}
            onMouseEnter={() => enableZoom && setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
            onClick={() => showLightbox && setLightboxOpen(true)}
            className={cn(
              "relative w-full overflow-hidden rounded-3xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] shadow-xs transition-shadow duration-300",
              aspectClasses[aspectRatio],
              showLightbox && "cursor-zoom-in",
            )}
          >
            {activeImage && (
              <img
                src={activeImage.src}
                alt={activeImage.alt || "Product main"}
                style={{
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                  transform: isZoomed ? "scale(2)" : "scale(1)",
                }}
                className="w-full h-full object-cover transition-transform duration-150 ease-out"
              />
            )}

            {showBadges && badgeText && (
              <div className="absolute top-4 left-4 z-10 pointer-events-none">
                <Badge variant="solid" color="primary" size="sm">
                  {badgeText}
                </Badge>
              </div>
            )}

            <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-black/60 text-white backdrop-blur-md">
                {activeIndex + 1} / {images.length}
              </span>
            </div>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(
                      (activeIndex - 1 + images.length) % images.length,
                    );
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[var(--patiya-color-card)]/90 backdrop-blur-md border border-[var(--patiya-color-border)] text-[var(--patiya-color-foreground)] flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all cursor-pointer"
                  aria-label="Previous image"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect((activeIndex + 1) % images.length);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[var(--patiya-color-card)]/90 backdrop-blur-md border border-[var(--patiya-color-border)] text-[var(--patiya-color-foreground)] flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all cursor-pointer"
                  aria-label="Next image"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>

        {lightboxOpen && activeImage && (
          <div
            onClick={() => setLightboxOpen(false)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          >
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close lightbox"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <img
              src={activeImage.src}
              alt={activeImage.alt || "Full preview"}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl"
            />
          </div>
        )}
      </div>
    );
  },
);
ProductGallery.displayName = "ProductGallery";

export type ProductGalleryCarouselProps =
  React.HTMLAttributes<HTMLDivElement> & {
    images: ProductGalleryImage[];
    autoSlide?: boolean;
    interval?: number;
  };

export const ProductGalleryCarousel = React.forwardRef<
  HTMLDivElement,
  ProductGalleryCarouselProps
>(
  (
    { images = [], autoSlide = false, interval = 4000, className, ...props },
    ref,
  ) => {
    const [index, setIndex] = useState(0);

    const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
    const next = () => setIndex((i) => (i + 1) % images.length);

    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-lg mx-auto rounded-3xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] overflow-hidden shadow-xs relative group",
          className,
        )}
        {...props}
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--patiya-color-muted)]">
          {images.map((img, i) => (
            <div
              key={img.id}
              className={cn(
                "absolute inset-0 transition-opacity duration-500 ease-in-out",
                i === index
                  ? "opacity-100 z-10"
                  : "opacity-0 z-0 pointer-events-none",
              )}
            >
              <img
                src={img.src}
                alt={img.alt || `Slide ${i}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}

          <button
            type="button"
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-sm border border-[var(--patiya-color-border)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-sm hover:scale-105"
            aria-label="Previous"
          >
            <svg
              className="w-4 h-4 text-[var(--patiya-color-foreground)]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-sm border border-[var(--patiya-color-border)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-sm hover:scale-105"
            aria-label="Next"
          >
            <svg
              className="w-4 h-4 text-[var(--patiya-color-foreground)]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        <div className="p-3 bg-[var(--patiya-color-card)] flex items-center justify-between border-t border-[var(--patiya-color-border)]">
          <div className="flex items-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all cursor-pointer",
                  i === index
                    ? "w-6 bg-[var(--patiya-color-primary)]"
                    : "w-1.5 bg-[var(--patiya-color-border)] hover:bg-[var(--patiya-color-muted-foreground)]",
                )}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <span className="text-xs font-mono font-medium text-[var(--patiya-color-muted-foreground)]">
            {index + 1} of {images.length}
          </span>
        </div>
      </div>
    );
  },
);
ProductGalleryCarousel.displayName = "ProductGalleryCarousel";

export type ProductGalleryGridProps = React.HTMLAttributes<HTMLDivElement> & {
  images: ProductGalleryImage[];
  onSelect?: (image: ProductGalleryImage) => void;
};

export const ProductGalleryGrid = React.forwardRef<
  HTMLDivElement,
  ProductGalleryGridProps
>(({ images = [], onSelect, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "w-full max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3.5",
        className,
      )}
      {...props}
    >
      {images.map((img, i) => (
        <div
          key={img.id}
          onClick={() => onSelect?.(img)}
          className={cn(
            "group relative overflow-hidden rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-muted)] transition-all duration-300 hover:shadow-lg cursor-pointer",
            i === 0 ? "sm:col-span-2 aspect-[16/9]" : "aspect-square",
          )}
        >
          <img
            src={img.src}
            alt={img.alt || `Grid lookbook ${i + 1}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {img.title && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span className="text-sm font-semibold text-white drop-shadow-md">
                {img.title}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
});
ProductGalleryGrid.displayName = "ProductGalleryGrid";

export type ProductGalleryMinimalProps =
  React.HTMLAttributes<HTMLDivElement> & {
    src: string;
    alt?: string;
    badge?: string;
    colors?: { id: string; bg: string; label: string }[];
    onColorChange?: (colorId: string) => void;
  };

export const ProductGalleryMinimal = React.forwardRef<
  HTMLDivElement,
  ProductGalleryMinimalProps
>(
  (
    {
      src,
      alt = "Product view",
      badge,
      colors = [],
      onColorChange,
      className,
      ...props
    },
    ref,
  ) => {
    const [activeColor, setActiveColor] = useState(colors[0]?.id || "");

    const handleColor = (id: string) => {
      setActiveColor(id);
      onColorChange?.(id);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-sm mx-auto rounded-3xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] p-4 shadow-xs space-y-3",
          className,
        )}
        {...props}
      >
        <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[var(--patiya-color-muted)] border border-[var(--patiya-color-border)]/60 flex items-center justify-center group">
          {badge && (
            <span className="absolute top-3 left-3 z-10">
              <Badge variant="soft" color="primary" size="sm">
                {badge}
              </Badge>
            </span>
          )}
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        {colors.length > 0 && (
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-medium text-[var(--patiya-color-muted-foreground)]">
              Color finish:
            </span>
            <div className="flex items-center gap-1.5">
              {colors.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => handleColor(c.id)}
                  className={cn(
                    "w-5 h-5 rounded-full border transition-all cursor-pointer",
                    activeColor === c.id
                      ? "ring-2 ring-[var(--patiya-color-primary)] ring-offset-2 scale-110"
                      : "opacity-70 hover:opacity-100",
                  )}
                  style={{ backgroundColor: c.bg }}
                  aria-label={c.label}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },
);
ProductGalleryMinimal.displayName = "ProductGalleryMinimal";
