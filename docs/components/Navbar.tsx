"use client";
import Link from "next/link";
import { Box, IconButton, useTheme } from "patiya";
import { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
import { Logo } from "./Logo";
import { QuickSearchModal } from "./QuickSearchModal";
import { usePathname, useRouter } from "next/navigation";

export function Navbar() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const currentTheme =
    resolvedTheme ||
    (typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark")
      ? "dark"
      : theme === "system" && typeof window !== "undefined"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : theme);
  const isDark = currentTheme === "dark";

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
              onClick={() => setTheme(isDark ? "light" : "dark")}
              aria-label="Toggle theme"
              icon={
                isDark ? (
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
        <div className="fixed inset-0 top-16 z-40 bg-[var(--patiya-color-background)]/95 backdrop-blur-xl md:hidden overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--patiya-color-border)]/60 bg-[var(--patiya-color-background)]/80 shrink-0">
            <Link
              href="/docs"
              onClick={() => setIsOpen(false)}
              className="text-xs font-semibold text-[var(--patiya-color-foreground)] hover:text-[var(--patiya-color-primary)] transition-colors"
            >
              Documentation
            </Link>
            <Link
              href="https://github.com/Ajay-Katariya08/patiya-ui"
              target="_blank"
              className="text-xs text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] transition-colors"
            >
              GitHub ↗
            </Link>
          </div>
          <div className="flex-1 overflow-hidden min-h-0">
            <Sidebar isMobile onClose={() => setIsOpen(false)} />
          </div>
        </div>
      )}

      <QuickSearchModal open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </>
  );
}
