"use client";
import Link from "next/link";
import {
  Box,
  Button,
  IconButton,
  useTheme,
} from "patiya";
import { useEffect, useState, useRef, useMemo } from "react";
import { docsNav, renderSectionIcon } from "./Sidebar";
import { Logo } from "./Logo";
import { QuickSearchModal } from "./QuickSearchModal";
import { usePathname, useRouter } from "next/navigation";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileFilter, setMobileFilter] = useState("");
  const [mobileCollapsed, setMobileCollapsed] = useState<Record<string, boolean>>({});
  const mobileActiveRef = useRef<HTMLAnchorElement>(null);
  const mobileMenuContainerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        if (mobileActiveRef.current && mobileMenuContainerRef.current) {
          const container = mobileMenuContainerRef.current;
          const el = mobileActiveRef.current;
          const containerRect = container.getBoundingClientRect();
          const elRect = el.getBoundingClientRect();
          const target =
            elRect.top -
            containerRect.top +
            container.scrollTop -
            container.clientHeight / 2 +
            elRect.height / 2;
          container.scrollTo({ top: Math.max(0, target), behavior: "smooth" });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen, pathname]);

  const toggleMobileSection = (title: string) => {
    setMobileCollapsed((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const filteredMobileNav = useMemo(() => {
    if (!mobileFilter.trim()) return docsNav;
    const q = mobileFilter.toLowerCase().trim();
    return docsNav
      .map((section) => ({
        ...section,
        items: section.items.filter((item) =>
          item.title.toLowerCase().includes(q),
        ),
      }))
      .filter((section) => section.items.length > 0);
  }, [mobileFilter]);

  return (
    <>
      <Box className="h-16 border-b border-[var(--patiya-color-border)] sticky top-0 bg-[var(--patiya-color-background)]/80 backdrop-blur-md z-50 flex items-center px-6 md:px-12 justify-between">
        <Link
          href="/"
          className="font-bold text-xl tracking-tight flex items-center gap-2"
        >
          <Logo className="w-7 h-7" />
          Patiya UI
        </Link>
        <Box className="flex items-center gap-4 md:gap-6">
          <Box className="hidden md:flex items-center gap-6">
            <Link
              href="/docs"
              className="text-sm font-medium text-(--patiya-color-muted-foreground) hover:text-[var(--patiya-color-foreground)] transition-colors"
            >
              Documentation
            </Link>
            <Link
              href="https://github.com/Ajay-Katariya08/patiya-ui"
              target="_blank"
              className="text-sm font-medium text-(--patiya-color-muted-foreground) hover:text-[var(--patiya-color-foreground)] transition-colors"
            >
              GitHub
            </Link>
          </Box>
          <button
            onClick={() => setIsSearchOpen(true)}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 text-sm text-(--patiya-color-muted-foreground) bg-[var(--patiya-color-muted)]/50 hover:bg-[var(--patiya-color-muted)] border border-[var(--patiya-color-border)] rounded-md transition-colors"
          >
            <svg
              className="w-4 h-4"
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
            Search...
            <kbd className="ml-2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] px-1.5 font-mono text-[10px] font-medium text-(--patiya-color-muted-foreground) opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>
          <button
            onClick={() => setIsSearchOpen(true)}
            className="md:hidden p-2 text-[var(--patiya-color-foreground)]"
            aria-label="Search"
          >
            <svg
              className="w-5 h-5"
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
          </button>
          {mounted && (
            <IconButton
              variant="ghost"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              icon={
                theme === "dark" ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                )
              }
            />
          )}
          <button
            className="md:hidden p-2 -mr-2 text-[var(--patiya-color-foreground)]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </Box>
      </Box>

      {isOpen && (
        <div
          ref={mobileMenuContainerRef}
          className="fixed inset-0 top-16 z-40 bg-[var(--patiya-color-background)]/95 backdrop-blur-xl overflow-y-auto p-4 sm:p-6 md:hidden custom-scrollbar"
        >
          <Box className="space-y-6 pb-16">
            <Box className="flex flex-col space-y-2 pb-4 border-b border-[var(--patiya-color-border)]">
              <div className="flex items-center justify-between">
                <Link
                  href="/docs"
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-semibold text-[var(--patiya-color-foreground)] hover:text-[var(--patiya-color-primary)] transition-colors py-1"
                >
                  Documentation
                </Link>
                <Link
                  href="https://github.com/Ajay-Katariya08/patiya-ui"
                  target="_blank"
                  className="text-xs text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] transition-colors py-1"
                >
                  GitHub ↗
                </Link>
              </div>
              <div className="relative pt-2">
                <svg
                  className="absolute left-3 top-[17px] w-3.5 h-3.5 text-[var(--patiya-color-muted-foreground)] pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle cx="11" cy="11" r="8" strokeWidth="2" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2" />
                </svg>
                <input
                  type="text"
                  value={mobileFilter}
                  onChange={(e) => setMobileFilter(e.target.value)}
                  placeholder="Quick search..."
                  className="w-full pl-8 pr-7 py-1.5 text-xs rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)]/80 text-[var(--patiya-color-foreground)] placeholder:text-[var(--patiya-color-muted-foreground)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--patiya-color-primary)]/20 focus:border-[var(--patiya-color-primary)] transition-all shadow-xs"
                />
                {mobileFilter && (
                  <button
                    onClick={() => setMobileFilter("")}
                    className="absolute right-2.5 top-[16px] text-xs text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] p-0.5"
                    aria-label="Clear filter"
                  >
                    ✕
                  </button>
                )}
              </div>
            </Box>

            <Box className="space-y-4">
              {filteredMobileNav.map((section) => {
                const hasActive = section.items.some(
                  (item) => pathname === item.href
                );
                const isClosed =
                  !mobileFilter && !!mobileCollapsed[section.title];

                return (
                  <Box key={section.title} className="group/section">
                    <button
                      type="button"
                      onClick={() => toggleMobileSection(section.title)}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider rounded-lg transition-all duration-200 cursor-pointer ${
                        hasActive
                          ? "bg-[var(--patiya-color-primary)]/8 text-[var(--patiya-color-primary)]"
                          : "text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] hover:bg-[var(--patiya-color-muted)]/50"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className={`transition-colors duration-200 ${
                            hasActive
                              ? "text-[var(--patiya-color-primary)]"
                              : "text-[var(--patiya-color-muted-foreground)]"
                          }`}
                        >
                          {renderSectionIcon(section.title)}
                        </span>
                        <span className="truncate">{section.title}</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span
                          className={`text-[10px] font-normal px-1.5 py-0.2 rounded-md transition-colors ${
                            hasActive
                              ? "bg-[var(--patiya-color-primary)]/20 text-[var(--patiya-color-primary)] font-medium"
                              : "bg-[var(--patiya-color-muted)] text-[var(--patiya-color-muted-foreground)]"
                          }`}
                        >
                          {section.items.length}
                        </span>
                        <svg
                          className={`w-3 h-3 transition-transform duration-250 ease-out ${
                            isClosed
                              ? "-rotate-90 opacity-60"
                              : "rotate-0"
                          } ${
                            hasActive
                              ? "text-[var(--patiya-color-primary)]"
                              : "text-[var(--patiya-color-muted-foreground)]"
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <polyline
                            points="6 9 12 15 18 9"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </button>

                    <div
                      className={`grid transition-[grid-template-rows,opacity] duration-250 ease-out ${
                        isClosed
                          ? "grid-rows-[0fr] opacity-0 pointer-events-none"
                          : "grid-rows-[1fr] opacity-100"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="relative ml-4 pl-3.5 border-l border-[var(--patiya-color-border)]/60 my-1 flex flex-col space-y-0.5">
                          {section.items.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                              <Link
                                key={item.href}
                                href={item.href}
                                ref={isActive ? mobileActiveRef : null}
                                onClick={() => setIsOpen(false)}
                                className={`group relative flex items-center justify-between px-2.5 py-1.5 text-xs rounded-lg font-medium transition-all duration-150 select-none ${
                                  isActive
                                    ? "bg-[var(--patiya-color-primary)]/10 text-[var(--patiya-color-primary)] font-semibold border border-[var(--patiya-color-primary)]/20"
                                    : "text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] hover:bg-[var(--patiya-color-muted)]/60"
                                }`}
                              >
                                {isActive && (
                                  <span
                                    aria-hidden="true"
                                    className="absolute -left-[15px] top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[var(--patiya-color-primary)] ring-[2.5px] ring-[var(--patiya-color-background)] shadow-[0_0_8px_var(--patiya-color-primary)] z-10"
                                  />
                                )}
                                <span className="truncate">{item.title}</span>
                                {item.badge && (
                                  <span className="shrink-0 text-[9px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded-md bg-[var(--patiya-color-primary)]/15 text-[var(--patiya-color-primary)] border border-[var(--patiya-color-primary)]/20 shadow-xs">
                                    {item.badge}
                                  </span>
                                )}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </Box>
                );
              })}

              {filteredMobileNav.length === 0 && (
                <Box className="py-8 text-center text-xs text-[var(--patiya-color-muted-foreground)] space-y-1">
                  <p>No components found.</p>
                  <button
                    onClick={() => setMobileFilter("")}
                    className="text-[var(--patiya-color-primary)] hover:underline font-medium cursor-pointer"
                  >
                    Clear filter
                  </button>
                </Box>
              )}
            </Box>
          </Box>
        </div>
      )}

      <QuickSearchModal open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </>
  );
}
