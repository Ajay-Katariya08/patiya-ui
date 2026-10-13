"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Kbd, Badge, StatusDot } from "patiya";
import { docsNav, NavItem } from "./Sidebar";

export type QuickSearchModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type FlatSearchItem = NavItem & {
  category: string;
};

export function QuickSearchModal({ open, onOpenChange }: QuickSearchModalProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const allItems: FlatSearchItem[] = useMemo(() => {
    return docsNav.flatMap((section) =>
      section.items.map((item) => ({
        ...item,
        category: section.title,
      }))
    );
  }, []);

  const categories = useMemo(() => {
    return ["All", ...Array.from(new Set(docsNav.map((s) => s.title)))];
  }, []);

  const filteredItems = useMemo(() => {
    const q = query.toLowerCase().trim();
    return allItems.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.href.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [allItems, query, selectedCategory]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query, selectedCategory]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedCategory("All");
      setSelectedIndex(0);
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "";
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const itemEl = listRef.current?.querySelector(`[data-index="${selectedIndex}"]`);
    itemEl?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex, open]);

  const handleSelect = (href: string) => {
    onOpenChange(false);
    router.push(href);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onOpenChange(false);
      return;
    }

    if (filteredItems.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const current = filteredItems[selectedIndex];
      if (current) {
        handleSelect(current.href);
      }
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/65 backdrop-blur-md animate-[fadeIn_0.15s_ease-out]"
      onClick={() => onOpenChange(false)}
    >
      <div
        className="w-full max-w-2xl rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] overflow-hidden flex flex-col shadow-none outline-none animate-[scaleIn_0.15s_ease-out]"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)]/40">
          <svg
            className="w-4 h-4 text-[var(--patiya-color-primary)] shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documentation, components, effects..."
            aria-label="Search documentation, components, effects"
            className="flex-1 bg-transparent text-sm sm:text-base outline-none text-[var(--patiya-color-foreground)] placeholder:text-[var(--patiya-color-muted-foreground)] font-medium"
          />

          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              aria-label="Clear search query"
              className="text-xs text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] px-1.5 py-0.5 rounded cursor-pointer"
            >
              Clear
            </button>
          )}

          <Kbd size="sm" className="hidden sm:inline-flex text-[10px]">
            ESC
          </Kbd>
        </div>

        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-[var(--patiya-color-border)] bg-[var(--patiya-color-muted)]/15 overflow-x-auto custom-scrollbar">
          {categories.slice(0, 8).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[var(--patiya-color-primary)] text-white"
                  : "text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] hover:bg-[var(--patiya-color-muted)]/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div
          ref={listRef}
          className="max-h-[360px] overflow-y-auto custom-scrollbar p-2 space-y-1"
        >
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <div className="w-10 h-10 mx-auto rounded-full border border-[var(--patiya-color-border)] flex items-center justify-center text-[var(--patiya-color-muted-foreground)]">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-[var(--patiya-color-foreground)]">
                No components found for &quot;{query}&quot;
              </p>
              <p className="text-xs text-[var(--patiya-color-muted-foreground)]">
                Try searching for button, modal, dock, tilt, or spotlight.
              </p>
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.href}
                  data-index={idx}
                  onClick={() => handleSelect(item.href)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-sm cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-[var(--patiya-color-muted)]/50 text-[var(--patiya-color-foreground)] border border-[var(--patiya-color-border)]"
                      : "text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] hover:bg-[var(--patiya-color-muted)]/20 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "border-[var(--patiya-color-primary)]/40 bg-[var(--patiya-color-primary)]/10 text-[var(--patiya-color-primary)]"
                          : "border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] text-[var(--patiya-color-muted-foreground)]"
                      }`}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-medium text-sm text-[var(--patiya-color-foreground)] truncate">
                        {item.title}
                      </span>
                      <span className="font-mono text-[10px] text-[var(--patiya-color-muted-foreground)] truncate">
                        {item.href}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-mono text-[10px] px-1.5 py-0.5 rounded border border-[var(--patiya-color-border)] text-[var(--patiya-color-muted-foreground)]">
                      {item.category}
                    </span>

                    {item.badge && (
                      <Badge variant="soft" color="primary" size="sm">
                        {item.badge}
                      </Badge>
                    )}

                    {isSelected && (
                      <span className="hidden sm:inline-flex font-mono text-[10px] px-1.5 py-0.5 rounded bg-[var(--patiya-color-primary)] text-white font-medium">
                        ↵
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="border-t border-[var(--patiya-color-border)] bg-[var(--patiya-color-muted)]/20 px-4 py-2.5 flex items-center justify-between text-xs text-[var(--patiya-color-muted-foreground)] font-mono">
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            <span className="inline-flex items-center gap-1">
              <Kbd size="sm">↑</Kbd>
              <Kbd size="sm">↓</Kbd>
              <span className="text-[11px] ml-0.5">Navigate</span>
            </span>

            <span className="inline-flex items-center gap-1">
              <Kbd size="sm">↵</Kbd>
              <span className="text-[11px] ml-0.5">Select</span>
            </span>

            <span className="inline-flex items-center gap-1">
              <Kbd size="sm">ESC</Kbd>
              <span className="text-[11px] ml-0.5">Close</span>
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-[11px]">
            <StatusDot status="online" size="sm" />
            <span>{filteredItems.length} components</span>
          </div>
        </div>
      </div>
    </div>
  );
}
