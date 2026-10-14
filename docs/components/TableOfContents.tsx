"use client";

import React, { useEffect, useState } from "react";
import { Box, cn } from "patiya";
import { usePathname } from "next/navigation";

type TocItem = {
  id: string;
  title: string;
};

type TableOfContentsProps = {
  items?: TocItem[];
};

export function TableOfContents({
  items: initialItems = [],
}: TableOfContentsProps) {
  const pathname = usePathname();
  const [activeId, setActiveId] = useState<string>("");
  const [items, setItems] = useState<TocItem[]>(initialItems);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) {
        const current = (window.pageYOffset / total) * 100;
        setScrollProgress(Math.min(100, Math.max(0, current)));
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  useEffect(() => {
    if (initialItems.length === 0) {
      const timeout = setTimeout(() => {
        const headings = Array.from(
          document.querySelectorAll("h2[id], h3[id]"),
        );
        const generatedItems = headings.map((h) => ({
          id: h.id,
          title: h.textContent?.trim() || "",
        }));
        setItems(generatedItems);
        if (!activeId && generatedItems.length > 0) {
          const hash = window.location.hash.replace("#", "");
          setActiveId(
            hash && generatedItems.some((i) => i.id === hash)
              ? hash
              : generatedItems[0].id,
          );
        }
      }, 120);
      return () => clearTimeout(timeout);
    } else {
      setItems(initialItems);
      if (!activeId && initialItems.length > 0) {
        const hash = window.location.hash.replace("#", "");
        setActiveId(
          hash && initialItems.some((i) => i.id === hash)
            ? hash
            : initialItems[0].id,
        );
      }
    }
  }, [initialItems, pathname]);

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0% -60% 0%" },
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      items.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [items]);

  if (items.length === 0) return null;

  return (
    <Box className="w-full px-5 py-6">
      <Box className="relative">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--patiya-color-muted-foreground)]">
            <svg
              className="w-3.5 h-3.5 text-[var(--patiya-color-primary)]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
              />
            </svg>
            <span>On this page</span>
          </div>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--patiya-color-muted)]/60 text-[var(--patiya-color-muted-foreground)] font-medium">
            {Math.round(scrollProgress)}%
          </span>
        </div>

        <div className="w-full h-[2px] bg-[var(--patiya-color-border)]/60 rounded-full mb-5 overflow-hidden">
          <div
            className="h-full bg-[var(--patiya-color-primary)] transition-all duration-200 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        <div className="relative pl-3 border-l border-[var(--patiya-color-border)]/70">
          <ul className="space-y-1 text-sm relative">
            {items.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id} className="relative">
                  {isActive && (
                    <span
                      className="absolute -left-[14px] top-1/2 -translate-y-1/2 w-[3px] h-4 rounded-full bg-[var(--patiya-color-primary)] transition-all duration-300"
                      style={{ boxShadow: "none" }}
                    />
                  )}
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById(item.id);
                      if (el) {
                        window.scrollTo({
                          top: el.offsetTop - 90,
                          behavior: "smooth",
                        });
                      }
                      window.history.pushState(null, "", `#${item.id}`);
                      setActiveId(item.id);
                    }}
                    className={cn(
                      "group flex items-center px-2.5 py-1.5 rounded-lg text-xs transition-all duration-200 select-none",
                      isActive
                        ? "bg-[var(--patiya-color-primary)]/10 text-[var(--patiya-color-primary)] font-medium"
                        : "text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] hover:bg-[var(--patiya-color-muted)]/30 font-normal",
                    )}
                    style={{ boxShadow: "none" }}
                  >
                    <span className="truncate">{item.title}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="pt-6 mt-6 border-t border-[var(--patiya-color-border)]/60 space-y-1">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] hover:bg-[var(--patiya-color-muted)]/30 rounded-lg transition-colors duration-150"
            style={{ boxShadow: "none" }}
          >
            <svg
              className="w-3.5 h-3.5 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
            <span>Scroll to top</span>
          </button>
          <button
            type="button"
            onClick={() => {
              if (typeof window !== "undefined") {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }
            }}
            className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] hover:bg-[var(--patiya-color-muted)]/30 rounded-lg transition-colors duration-150"
            style={{ boxShadow: "none" }}
          >
            {copied ? (
              <>
                <svg
                  className="w-3.5 h-3.5 text-emerald-500 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-emerald-500 font-medium">
                  Link copied!
                </span>
              </>
            ) : (
              <>
                <svg
                  className="w-3.5 h-3.5 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
                <span>Copy page link</span>
              </>
            )}
          </button>
        </div>
      </Box>
    </Box>
  );
}
