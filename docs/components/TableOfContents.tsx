"use client";

import React, { useEffect, useState, useRef } from "react";
import { Box, cn } from "patiya";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

type TocItem = {
  id: string;
  title: string;
};

type TableOfContentsProps = {
  items?: TocItem[];
};

export function TableOfContents({ items: initialItems }: TableOfContentsProps) {
  const pathname = usePathname();
  const [activeId, setActiveId] = useState<string>("");
  const [items, setItems] = useState<TocItem[]>(initialItems || []);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const isClickScrollingRef = useRef(false);
  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const cancelClickScroll = () => {
      if (isClickScrollingRef.current) {
        isClickScrollingRef.current = false;
        if (clickTimeoutRef.current) {
          clearTimeout(clickTimeoutRef.current);
          clickTimeoutRef.current = null;
        }
      }
    };

    window.addEventListener("wheel", cancelClickScroll, { passive: true });
    window.addEventListener("touchmove", cancelClickScroll, { passive: true });
    window.addEventListener("scrollend", cancelClickScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", cancelClickScroll);
      window.removeEventListener("touchmove", cancelClickScroll);
      window.removeEventListener("scrollend", cancelClickScroll);
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) {
        const current = (scrollY / total) * 100;
        setScrollProgress(Math.min(100, Math.max(0, current)));
      } else {
        setScrollProgress(0);
      }
    };

    setScrollProgress(0);
    setActiveId("");
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    const timer = setTimeout(handleScroll, 60);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  useEffect(() => {
    if (!initialItems || initialItems.length === 0) {
      const updateHeadings = () => {
        const headings = Array.from(
          document.querySelectorAll("h2[id], h3[id]"),
        );
        const generatedItems = headings.map((h) => ({
          id: h.id,
          title: h.textContent?.trim() || "",
        }));

        setItems((prev) => {
          if (
            prev.length === generatedItems.length &&
            prev.every((item, idx) => item.id === generatedItems[idx]?.id)
          ) {
            return prev;
          }
          return generatedItems;
        });

        if (generatedItems.length > 0) {
          const hash = window.location.hash.replace("#", "");
          setActiveId((prev) => {
            if (hash && generatedItems.some((i) => i.id === hash)) return hash;
            if (prev && generatedItems.some((i) => i.id === prev)) return prev;
            return generatedItems[0].id;
          });
        }
      };

      updateHeadings();
      const timer = setTimeout(updateHeadings, 60);
      return () => clearTimeout(timer);
    } else {
      setItems((prev) => {
        if (
          prev.length === initialItems.length &&
          prev.every((item, idx) => item.id === initialItems[idx]?.id)
        ) {
          return prev;
        }
        return initialItems;
      });
      const hash = window.location.hash.replace("#", "");
      setActiveId((prev) => {
        if (hash && initialItems.some((i) => i.id === hash)) return hash;
        if (prev && initialItems.some((i) => i.id === prev)) return prev;
        return initialItems[0].id;
      });
    }
  }, [initialItems, pathname]);

  useEffect(() => {
    if (items.length === 0) return;

    const findActiveHeading = () => {
      if (isClickScrollingRef.current) return;

      const headingElements = items
        .map((item) => {
          const el = document.getElementById(item.id);
          return el
            ? { id: item.id, top: el.getBoundingClientRect().top }
            : null;
        })
        .filter(Boolean) as { id: string; top: number }[];

      if (headingElements.length === 0) return;

      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0 && scrollY >= total - 30) {
        setActiveId(headingElements[headingElements.length - 1].id);
        return;
      }

      const passed = headingElements.filter((h) => h.top <= 140);
      if (passed.length > 0) {
        setActiveId(passed[passed.length - 1].id);
      } else {
        setActiveId(headingElements[0].id);
      }
    };

    window.addEventListener("scroll", findActiveHeading, { passive: true });
    findActiveHeading();

    return () => window.removeEventListener("scroll", findActiveHeading);
  }, [items]);

  if (items.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="w-full px-5 py-6 select-none"
    >
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
          <motion.div
            className="h-full bg-[var(--patiya-color-primary)]"
            animate={{ width: `${scrollProgress}%` }}
            transition={{ ease: "easeOut", duration: 0.1 }}
          />
        </div>

        <div className="relative pl-3 border-l border-[var(--patiya-color-border)]/70">
          <ul className="space-y-1 text-sm relative">
            {items.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id} className="relative">
                  {isActive && (
                    <motion.span
                      layoutId="toc-indicator"
                      className="absolute -left-[14px] top-1/2 -translate-y-1/2 w-[2.5px] h-4 rounded-full bg-[var(--patiya-color-primary)]"
                      transition={{
                        type: "spring",
                        stiffness: 1250,
                        damping: 38,
                      }}
                    />
                  )}
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      isClickScrollingRef.current = true;
                      setActiveId(item.id);

                      if (clickTimeoutRef.current) {
                        clearTimeout(clickTimeoutRef.current);
                      }
                      clickTimeoutRef.current = setTimeout(() => {
                        isClickScrollingRef.current = false;
                      }, 750);

                      const el = document.getElementById(item.id);
                      if (el) {
                        const targetY =
                          window.scrollY + el.getBoundingClientRect().top - 80;
                        window.scrollTo({
                          top: targetY,
                          behavior: "smooth",
                        });
                      }
                      window.history.pushState(null, "", `#${item.id}`);
                    }}
                    className={cn(
                      "group flex items-center px-2.5 py-1.5 rounded-lg text-xs transition-colors duration-100 select-none",
                      isActive
                        ? "bg-[var(--patiya-color-primary)]/10 text-[var(--patiya-color-primary)] font-medium"
                        : "text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] hover:bg-[var(--patiya-color-muted)]/30 font-normal",
                    )}
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
            className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] hover:bg-[var(--patiya-color-muted)]/30 rounded-lg transition-colors duration-150 cursor-pointer"
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
            className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] hover:bg-[var(--patiya-color-muted)]/30 rounded-lg transition-colors duration-150 cursor-pointer"
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
    </motion.div>
  );
}
