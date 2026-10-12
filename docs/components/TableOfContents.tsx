"use client";

import React, { useEffect, useState } from "react";
import { Box } from "patiya";

import { usePathname } from "next/navigation";

interface TocItem {
  id: string;
  title: string;
}

export function TableOfContents({ items: initialItems = [] }: { items?: TocItem[] }) {
  const pathname = usePathname();
  const [activeId, setActiveId] = useState<string>("");
  const [items, setItems] = useState<TocItem[]>(initialItems);

  useEffect(() => {
    // If no items were passed in, try to auto-generate them by scanning the page for h2 elements with ids
    if (initialItems.length === 0) {
      // Small timeout to allow page rendering to complete
      const timeout = setTimeout(() => {
        const headings = Array.from(document.querySelectorAll("h2[id], h3[id]"));
        const generatedItems = headings.map((h) => ({
          id: h.id,
          title: h.textContent || "",
        }));
        setItems(generatedItems);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      setItems(initialItems);
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
      { rootMargin: "-100px 0% -60% 0%" }
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
    <Box className="w-full pl-8 py-8 pr-4">
      <Box className="relative">
        <h4 className="text-xs font-bold tracking-wider uppercase text-[var(--patiya-color-muted-foreground)] mb-6 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
          On this page
        </h4>
        
        <ul className="space-y-3 text-sm relative pb-8">
          {items.map((item) => (
            <li key={item.id} className="relative">
              {activeId === item.id && (
                <div className="absolute -left-[33px] top-1/2 -translate-y-1/2 w-[3px] h-[16px] bg-[var(--patiya-color-primary)] rounded-full shadow-[0_0_8px_var(--patiya-color-primary)] transition-all duration-300 z-10" />
              )}
              <a
                href={`#${item.id}`}
                className={`block py-0.5 transition-all duration-200 ${
                  activeId === item.id
                    ? "text-[var(--patiya-color-primary)] font-semibold translate-x-1"
                    : "text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] hover:translate-x-1"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(item.id);
                  if (el) {
                    window.scrollTo({
                      top: el.offsetTop - 100,
                      behavior: "smooth",
                    });
                  }
                  window.history.pushState(null, "", `#${item.id}`);
                }}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </Box>
    </Box>
  );
}
