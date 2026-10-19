"use client";

import {
  Button,
  Box,
  Badge,
  IconButton,
  useTheme,
  ShimmerButton,
  Magnetic,
  SpotlightCard,
  TiltCard,
  FlipCard,
  Dock,
  DockItem,
  BorderBeam,
  StatusDot,
  CopyButton,
  Kbd,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  PromptInput,
  ChatBubble,
  DirectionAwareHover,
} from "patiya";
import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { Logo } from "../components/Logo";
import { Footer } from "../components/Footer";

const QuickSearchModal = dynamic(
  () =>
    import("../components/QuickSearchModal").then(
      (mod) => mod.QuickSearchModal,
    ),
  { ssr: false },
);

const BackgroundCubesGrid = dynamic(
  () =>
    import("../components/ui/background-cubes-grid").then(
      (mod) => mod.BackgroundCubesGrid,
    ),
  { ssr: false },
);

type HeroTab = "dock" | "card3d" | "ai" | "spotlight";

type PlaygroundCategory = "buttons" | "status" | "ai" | "cards";

type ChatMessage = {
  id: string;
  sender: "user" | "assistant";
  text: string;
};

function useScrollObserver() {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal-item");
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <IconButton
      variant="ghost"
      color="secondary"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className="rounded-full w-9 h-9 border border-[var(--patiya-color-border)] text-[var(--patiya-color-foreground)] hover:bg-[var(--patiya-color-muted)]/40 transition-colors"
      icon={
        theme === "dark" ? (
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.8}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        ) : (
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.8}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        )
      }
    />
  );
}

export default function Home() {
  useScrollObserver();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeHeroTab, setActiveHeroTab] = useState<HeroTab>("dock");
  const [activeCategory, setActiveCategory] =
    useState<PlaygroundCategory>("buttons");
  const [, startTransition] = useTransition();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "assistant",
      text: "Hello. I am Patiya AI assistant. Ask me to generate a component or refine your interface design.",
    },
  ]);
  const [promptText, setPromptText] = useState("");

  const handlePromptSubmit = (val: string) => {
    if (!val.trim()) return;
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: val,
    };
    const reply: ChatMessage = {
      id: (Date.now() + 1).toString(),
      sender: "assistant",
      text: `Generated responsive ${val.trim().toLowerCase()} preview with 60fps interaction and zero layout shifts.`,
    };
    setChatMessages((prev) => [...prev, newMsg, reply]);
    setPromptText("");
  };

  const playgroundSnippets: Record<
    PlaygroundCategory,
    { title: string; code: string }
  > = {
    buttons: {
      title: "Interactive Buttons",
      code: `import { ShimmerButton, Magnetic, Button } from "patiya";

export function ActionGroup() {
  return (
    <div className="flex items-center gap-3">
      <Magnetic intensity={0.3}>
        <ShimmerButton background="#09090b" shimmerColor="#ffffff">
          Deploy Project
        </ShimmerButton>
      </Magnetic>
      <Button variant="outline">Browse Docs</Button>
    </div>
  );
}`,
    },
    status: {
      title: "Badges & Status Dots",
      code: `import { StatusDot, Badge, Kbd } from "patiya";

export function SystemStatus() {
  return (
    <div className="flex items-center gap-4">
      <StatusDot status="online" ping={true} label="Systems Operational" />
      <Badge variant="soft" color="primary">v2.0.1</Badge>
      <Kbd size="sm">⌘K</Kbd>
    </div>
  );
}`,
    },
    ai: {
      title: "AI Chat & Prompt",
      code: `import { PromptInput, ChatBubble } from "patiya";

export function AIChat() {
  return (
    <div className="space-y-4">
      <ChatBubble variant="assistant">How can I assist your UI workflow?</ChatBubble>
      <PromptInput placeholder="Ask anything..." onValueSubmit={console.log} />
    </div>
  );
}`,
    },
    cards: {
      title: "Spatial Cards",
      code: `import { TiltCard, SpotlightCard } from "patiya";

export function FeatureCard() {
  return (
    <SpotlightCard className="p-6 border border-[var(--patiya-color-border)]">
      <TiltCard tiltMaxAngleX={15} tiltMaxAngleY={15}>
        <h3>Interactive 3D Physics</h3>
      </TiltCard>
    </SpotlightCard>
  );
}`,
    },
  };

  return (
    <Box className="flex flex-col min-h-screen bg-[var(--patiya-color-background)] text-[var(--patiya-color-foreground)] selection:bg-[var(--patiya-color-primary)] selection:text-white">
      <header className="sticky top-0 z-50 w-full border-b border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)]/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <Logo className="w-7 h-7 transition-transform duration-300 group-hover:scale-105" />
            <span className="font-semibold text-base tracking-tight">
              Patiya UI
            </span>
            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded border border-[var(--patiya-color-border)] text-[var(--patiya-color-muted-foreground)] uppercase">
              v2.0
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-sm font-medium text-[var(--patiya-color-muted-foreground)]">
            <Link
              href="#stage"
              className="hover:text-[var(--patiya-color-foreground)] transition-colors"
            >
              Workbench
            </Link>
            <Link
              href="#showcase"
              className="hover:text-[var(--patiya-color-foreground)] transition-colors"
            >
              Showcase
            </Link>
            <Link
              href="#blocks"
              className="hover:text-[var(--patiya-color-foreground)] transition-colors inline-flex items-center gap-1.5"
            >
              <span>Blocks</span>
              <span className="text-[11px] font-bold tracking-wider  px-1.5 py-0.2 rounded-md  text-[var(--patiya-color-primary)] border border-[var(--patiya-color-primary)]/20">
                New
              </span>
            </Link>
            <Link
              href="#matrix"
              className="hover:text-[var(--patiya-color-foreground)] transition-colors"
            >
              Playground
            </Link>
            <Link
              href="#principles"
              className="hover:text-[var(--patiya-color-foreground)] transition-colors"
            >
              Principles
            </Link>
            <Link
              href="#faq"
              className="hover:text-[var(--patiya-color-foreground)] transition-colors"
            >
              FAQ
            </Link>
            <Link
              href="/docs"
              className="hover:text-[var(--patiya-color-foreground)] transition-colors"
            >
              Docs
            </Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 h-9 px-3 rounded-lg border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)]/50 text-xs text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] transition-colors cursor-pointer"
            >
              <span>Quick Search</span>
              <Kbd size="sm">⌘K</Kbd>
            </button>

            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="sm:hidden inline-flex items-center justify-center w-9 h-9 rounded-full border border-[var(--patiya-color-border)] text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] transition-colors cursor-pointer"
              aria-label="Search documentation"
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
            </button>

            <Link
              href="https://github.com/ajay-katariya08/patiya-ui"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-[var(--patiya-color-border)] text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] transition-colors"
              aria-label="GitHub Repository"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
            </Link>

            <ThemeToggle />

            <Link href="/docs" className="hidden sm:inline-block">
              <Button
                size="sm"
                color="primary"
                className="h-9 px-4 rounded-lg font-medium"
              >
                Get Started
              </Button>
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden inline-flex items-center justify-center w-9 h-9 rounded-full border border-[var(--patiya-color-border)] text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
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
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 top-16 bg-black/40 backdrop-blur-xs z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="absolute top-full left-0 w-full border-b border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)]/95 backdrop-blur-xl px-4 py-4 space-y-1 z-50 lg:hidden max-h-[calc(100vh-4rem)] overflow-y-auto">
              <Link
                href="#stage"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-medium text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] hover:bg-[var(--patiya-color-muted)]/30 transition-colors"
              >
                Workbench
              </Link>
              <Link
                href="#showcase"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-medium text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] hover:bg-[var(--patiya-color-muted)]/30 transition-colors"
              >
                Showcase
              </Link>
              <Link
                href="#blocks"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] hover:bg-[var(--patiya-color-muted)]/30 transition-colors"
              >
                <span>Blocks</span>
                <span className="text-[9px] font-bold tracking-wider uppercase px-1.5 py-0.2 rounded-md bg-[var(--patiya-color-primary)]/15 text-[var(--patiya-color-primary)] border border-[var(--patiya-color-primary)]/20">
                  50+ Blocks
                </span>
              </Link>
              <Link
                href="#matrix"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-medium text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] hover:bg-[var(--patiya-color-muted)]/30 transition-colors"
              >
                Playground
              </Link>
              <Link
                href="#principles"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-medium text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] hover:bg-[var(--patiya-color-muted)]/30 transition-colors"
              >
                Principles
              </Link>
              <Link
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-medium text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)] hover:bg-[var(--patiya-color-muted)]/30 transition-colors"
              >
                FAQ
              </Link>
              <Link
                href="/docs"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-medium text-[var(--patiya-color-primary)] hover:bg-[var(--patiya-color-muted)]/30 transition-colors"
              >
                Documentation →
              </Link>
            </div>
          </>
        )}
      </header>

      <main className="flex-1 flex flex-col items-center w-full">
        <section className="w-full relative px-4 sm:px-6 lg:px-8 pt-10 pb-12 sm:pt-14 sm:pb-16 md:pt-18 md:pb-20 overflow-hidden border-b border-[var(--patiya-color-border)]">
          <BackgroundCubesGrid
            className="z-0 pointer-events-none"
            topColor={isDark ? "#09090b" : "#fafaf9"}
            leftColor={isDark ? "#141416" : "#e7e5e4"}
            rightColor={isDark ? "#1f1f23" : "#d6d3d1"}
            glowColor={isDark ? "#3b82f6" : "#a8a29e"}
          />

          <div className="max-w-5xl mx-auto flex flex-col items-center text-center relative z-10 space-y-6">
            <Magnetic intensity={0.2} range={140}>
              <Link href="/docs">
                <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-3.5 py-1.5 rounded-full border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)]/70 backdrop-blur-md hover:border-[var(--patiya-color-primary)] transition-colors max-w-full">
                  <StatusDot status="online" ping={true} size="sm" />
                  <span className="font-mono text-xs tracking-wide text-[var(--patiya-color-foreground)] whitespace-nowrap">
                    Patiya UI v2.0
                  </span>
                  <span className="hidden sm:inline text-xs text-[var(--patiya-color-muted-foreground)] whitespace-nowrap">
                    80+ Components • 50+ Motion Blocks
                  </span>
                  <span className="sm:hidden text-xs text-[var(--patiya-color-muted-foreground)] whitespace-nowrap">
                    50+ Motion Blocks
                  </span>
                  <svg
                    className="w-3.5 h-3.5 text-[var(--patiya-color-muted-foreground)] shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            </Magnetic>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tighter leading-[1.08] max-w-4xl text-[var(--patiya-color-foreground)]">
              Form follows feeling. <br />
              <span className="text-[var(--patiya-color-primary)]">
                Engineered for speed.
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-[var(--patiya-color-muted-foreground)] max-w-2xl font-normal leading-relaxed">
              Accessible React components and production-ready Motion.dev blocks
              designed for craft-minded developers. Hairline geometry,
              physics-driven animations, zero shadow soup, and native Tailwind
              CSS v4 support.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 w-full max-w-2xl pt-2">
              <Link href="/docs" className="w-full sm:w-auto">
                <ShimmerButton
                  background="var(--patiya-color-primary)"
                  shimmerColor="#ffffff"
                  borderRadius="10px"
                  className="w-full sm:w-auto h-12 px-7 text-sm font-medium justify-center"
                >
                  Start Building
                </ShimmerButton>
              </Link>

              <Link href="/docs/blocks" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto h-12 px-6 rounded-xl text-sm font-medium border-[var(--patiya-color-border)] !text-[var(--patiya-color-foreground)] hover:bg-[var(--patiya-color-card)]"
                >
                  Explore Blocks
                </Button>
              </Link>

              <div className="w-full sm:w-auto flex items-center justify-between sm:justify-center gap-3 h-12 px-3.5 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)]/60 font-mono text-xs">
                <span className="text-[var(--patiya-color-muted-foreground)]">
                  $
                </span>
                <span className="text-[var(--patiya-color-foreground)] font-medium">
                  bun add patiya
                </span>
                <CopyButton
                  value="bun add patiya"
                  size="sm"
                  variant="ghost"
                  className="h-7 px-2"
                  aria-label="Copy installation command"
                />
              </div>
            </div>

            <div id="stage" className="w-full max-w-5xl mt-8 sm:mt-12 pt-2">
              <div className="relative rounded-3xl border border-[var(--patiya-color-border)]/80 bg-[var(--patiya-color-card)]/65 dark:bg-[var(--patiya-color-card)]/40 backdrop-blur-3xl shadow-3xl shadow-black/[0.04] dark:shadow-black/60 overflow-hidden text-left transition-all duration-300">
                <BorderBeam
                  size={320}
                  duration={12}
                  colorFrom="var(--patiya-color-primary)"
                  colorTo="#a855f7"
                />

                <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-b border-[var(--patiya-color-border)]/70 bg-[var(--patiya-color-background)]/50 backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--patiya-color-muted)]/50 border border-[var(--patiya-color-border)]/60 text-xs font-mono text-[var(--patiya-color-foreground)] select-none">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[var(--patiya-color-muted-foreground)]">
                        Sandbox
                      </span>
                      <span className="text-[var(--patiya-color-border)]">
                        /
                      </span>
                      <span className="font-medium text-[var(--patiya-color-primary)]">
                        60fps Physics
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 p-1 rounded-xl border border-[var(--patiya-color-border)]/80 bg-[var(--patiya-color-card)]/90 backdrop-blur-lg overflow-x-auto max-w-full">
                    {(
                      [
                        { id: "dock", label: "Proximity Dock" },
                        { id: "card3d", label: "Spatial 3D" },
                        { id: "ai", label: "Neural AI" },
                        { id: "spotlight", label: "Spotlight" },
                      ] as const
                    ).map((tab) => {
                      const isActive = activeHeroTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() =>
                            startTransition(() => setActiveHeroTab(tab.id))
                          }
                          className={`relative px-3 sm:px-3.5 py-1.5 text-xs rounded-lg font-medium transition-colors cursor-pointer shrink-0 whitespace-nowrap flex items-center gap-1.5 select-none ${
                            isActive
                              ? "text-[var(--patiya-color-foreground)] font-semibold"
                              : "text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)]"
                          }`}
                        >
                          {isActive && (
                            <motion.div
                              layoutId="hero-active-tab-indicator"
                              className="absolute inset-0 rounded-lg bg-[var(--patiya-color-background)] border border-[var(--patiya-color-border)] shadow-xs"
                              transition={{
                                type: "spring",
                                stiffness: 450,
                                damping: 32,
                              }}
                            />
                          )}

                          <span className="relative z-10">{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="p-6 sm:p-10 lg:p-12 min-h-[380px] sm:min-h-[420px] flex items-center justify-center relative">
                  {activeHeroTab === "dock" && (
                    <div className="flex flex-col items-center justify-center gap-7 w-full max-w-md text-center">
                      <div className="space-y-2">
                        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold text-[var(--patiya-color-primary)]  tracking-wider px-3 py-1 rounded-full bg-[var(--patiya-color-primary)]/10 border border-[var(--patiya-color-primary)]/20">
                          Interactive Spring Geometry
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--patiya-color-foreground)]">
                          Magnification Dock
                        </h3>
                        <p className="text-xs sm:text-sm text-[var(--patiya-color-muted-foreground)] max-w-xs mx-auto leading-relaxed">
                          Fluid spring physics with continuous proximity scaling
                          and responsive layout morphing.
                        </p>
                      </div>

                      <div className="p-2 sm:p-2.5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)]/90 backdrop-blur-2xl shadow-xs shadow-black/5 dark:shadow-black/40 inline-flex items-center">
                        <Dock magnification={64} distance={140}>
                          <DockItem className="bg-gradient-to-tr from-sky-500 to-blue-600 text-white shadow-xs border border-white/20 hover:scale-105 transition-transform">
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                              />
                            </svg>
                          </DockItem>
                          <DockItem className="bg-gradient-to-tr from-emerald-500 to-teal-600 text-white shadow-xs border border-white/20 hover:scale-105 transition-transform">
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                              />
                            </svg>
                          </DockItem>
                          <DockItem className="bg-gradient-to-tr from-amber-500 to-orange-600 text-white shadow-xs border border-white/20 hover:scale-105 transition-transform">
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 3.5z"
                              />
                            </svg>
                          </DockItem>
                          <DockItem className="bg-gradient-to-tr from-purple-500 to-pink-600 text-white shadow-xs border border-white/20 hover:scale-105 transition-transform">
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                              />
                            </svg>
                          </DockItem>
                          <DockItem className="bg-[var(--patiya-color-primary)] text-white shadow-xs border border-white/25 hover:scale-105 transition-transform">
                            <svg
                              className="w-5 h-5 text-white"
                              viewBox="0 0 32 32"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M11 9H17.5C20.5376 9 23 11.4624 23 14.5C23 17.5376 20.5376 20 17.5 20H15V25H11V9ZM16.5 12C17.8807 12 19 13.1193 19 14.5C19 15.8807 17.8807 17 16.5 17C15.1193 17 14 15.8807 14 14.5C14 13.1193 15.1193 12 16.5 12Z"
                              />
                            </svg>
                          </DockItem>
                        </Dock>
                      </div>

                      <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[var(--patiya-color-muted-foreground)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--patiya-color-primary)]" />
                        Move cursor across dock to trigger proximity magnify
                      </div>
                    </div>
                  )}

                  {activeHeroTab === "card3d" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 w-full max-w-2xl items-center justify-items-center">
                      <div className="flex flex-col items-center text-center w-full">
                        <span className="font-mono text-xs text-[var(--patiya-color-muted-foreground)] uppercase mb-3 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          Gyro Tilt Physics
                        </span>
                        <TiltCard
                          className="w-full max-w-[290px] h-[178px]"
                          cardClassName="rounded-2xl border border-[var(--patiya-color-border)] p-5 flex flex-col justify-between bg-[var(--patiya-color-card)]/90 backdrop-blur-xl shadow-lg shadow-black/5"
                          tiltMaxAngleX={16}
                          tiltMaxAngleY={16}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-mono text-xs tracking-widest text-[var(--patiya-color-primary)] font-bold">
                              PATIYA ULTIMATE
                            </span>
                            <StatusDot status="online" size="sm" />
                          </div>
                          <div className="space-y-1 text-left">
                            <div className="font-mono text-sm tracking-widest text-[var(--patiya-color-foreground)] font-semibold">
                              •••• 8824 0912
                            </div>
                            <div className="text-[10px] text-[var(--patiya-color-muted-foreground)] uppercase font-mono flex items-center justify-between">
                              <span>Hardware Accelerated</span>
                              <span>EXP 12/29</span>
                            </div>
                          </div>
                        </TiltCard>
                      </div>

                      <div className="flex flex-col items-center text-center w-full">
                        <span className="font-mono text-xs text-[var(--patiya-color-muted-foreground)] uppercase mb-3 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                          Spatial Flip (Click to Flip)
                        </span>
                        <FlipCard
                          className="w-full max-w-[290px] h-[178px]"
                          front={
                            <div className="w-full h-full rounded-2xl border border-[var(--patiya-color-border)] p-5 flex flex-col justify-between bg-[var(--patiya-color-card)]/90 backdrop-blur-xl shadow-lg shadow-black/5 text-left">
                              <div className="flex items-center justify-between">
                                <Badge variant="outline" size="sm">
                                  Standard Pass
                                </Badge>
                                <span className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">
                                  Front
                                </span>
                              </div>
                              <div className="space-y-1">
                                <div className="font-semibold text-sm text-[var(--patiya-color-foreground)]">
                                  Developer Access Key
                                </div>
                                <p className="text-[11px] text-[var(--patiya-color-muted-foreground)]">
                                  Click surface to inspect rear cryptographic
                                  hash
                                </p>
                              </div>
                            </div>
                          }
                          back={
                            <div className="w-full h-full rounded-2xl border border-white/20 p-5 flex flex-col justify-between bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white text-left shadow-xl">
                              <div className="flex items-center justify-between">
                                <Badge
                                  variant="solid"
                                  color="secondary"
                                  size="sm"
                                  className="bg-white/20 text-white border border-white/30"
                                >
                                  Verified Active
                                </Badge>
                                <span className="text-[10px] font-mono text-white/70">
                                  Back
                                </span>
                              </div>
                              <div className="space-y-1">
                                <div className="font-semibold text-sm text-white">
                                  Lifetime Studio Pro
                                </div>
                                <p className="text-[11px] text-white/80 font-mono">
                                  sha256:9f83...bc41
                                </p>
                              </div>
                            </div>
                          }
                        />
                      </div>
                    </div>
                  )}

                  {activeHeroTab === "ai" && (
                    <div className="w-full max-w-xl flex flex-col gap-4">
                      <div className="max-h-[230px] overflow-y-auto custom-scrollbar space-y-3 pr-1">
                        {chatMessages.map((msg) => (
                          <ChatBubble
                            key={msg.id}
                            variant={msg.sender}
                            className="p-3 text-xs leading-relaxed"
                          >
                            {msg.text}
                          </ChatBubble>
                        ))}
                      </div>

                      <PromptInput
                        value={promptText}
                        onChange={(e) => setPromptText(e.target.value)}
                        onValueSubmit={handlePromptSubmit}
                        placeholder="Ask AI to design or refine a component..."
                        aria-label="Interactive AI chat prompt"
                        className="bg-[var(--patiya-color-card)] border-[var(--patiya-color-border)] shadow-sm"
                      />
                    </div>
                  )}

                  {activeHeroTab === "spotlight" && (
                    <div className="w-full max-w-md mx-auto">
                      <SpotlightCard className="p-6 sm:p-8 border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)]/90 backdrop-blur-xl rounded-2xl flex flex-col items-center text-center gap-5 shadow-xl shadow-black/5">
                        <Magnetic intensity={0.35} range={160}>
                          <div className="w-16 h-16 rounded-2xl border border-[var(--patiya-color-border)] bg-gradient-to-tr from-blue-500/15 to-purple-500/15 flex items-center justify-center text-[var(--patiya-color-primary)] shadow-sm">
                            <svg
                              className="w-7 h-7"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.8}
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                              />
                            </svg>
                          </div>
                        </Magnetic>
                        <div className="space-y-2">
                          <div className="text-lg font-bold text-[var(--patiya-color-foreground)]">
                            Cursor Tracking Spotlight
                          </div>
                          <p className="text-xs text-[var(--patiya-color-muted-foreground)] leading-relaxed max-w-xs mx-auto">
                            Continuous radial lighting vectors calculated via
                            pointer physics with zero layout thrash.
                          </p>
                        </div>
                      </SpotlightCard>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full border-b border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)]/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4">
              <div className="py-5 sm:py-6 px-3 flex flex-col items-center justify-center text-center gap-1 border-r border-b md:border-b-0 border-[var(--patiya-color-border)]">
                <div className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-[var(--patiya-color-foreground)]">
                  80+
                </div>
                <div className="font-mono text-[11px] sm:text-xs text-[var(--patiya-color-muted-foreground)] uppercase tracking-wider">
                  UI Components
                </div>
              </div>
              <div className="py-5 sm:py-6 px-3 flex flex-col items-center justify-center text-center gap-1 border-b md:border-b-0 md:border-r border-[var(--patiya-color-border)]">
                <div className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-[var(--patiya-color-primary)]">
                  50+
                </div>
                <div className="font-mono text-[11px] sm:text-xs text-[var(--patiya-color-muted-foreground)] uppercase tracking-wider">
                  Motion Blocks
                </div>
              </div>
              <div className="py-5 sm:py-6 px-3 flex flex-col items-center justify-center text-center gap-1 border-r md:border-r border-[var(--patiya-color-border)]">
                <div className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-[var(--patiya-color-foreground)]">
                  120 FPS
                </div>
                <div className="font-mono text-[11px] sm:text-xs text-[var(--patiya-color-muted-foreground)] uppercase tracking-wider">
                  Spring Physics
                </div>
              </div>
              <div className="py-5 sm:py-6 px-3 flex flex-col items-center justify-center text-center gap-1">
                <div className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-[var(--patiya-color-foreground)]">
                  Zero
                </div>
                <div className="font-mono text-[11px] sm:text-xs text-[var(--patiya-color-muted-foreground)] uppercase tracking-wider">
                  Drop Shadows
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="showcase"
          className="w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 border-b border-[var(--patiya-color-border)]"
        >
          <div className="max-w-6xl mx-auto space-y-10">
            <div className="reveal-item space-y-3 max-w-2xl">
              <div className="font-mono text-xs tracking-widest text-[var(--patiya-color-primary)] uppercase">
                01 / Interactive Suite
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter">
                Crafted with physics. Built for performance.
              </h2>
              <p className="text-sm sm:text-base text-[var(--patiya-color-muted-foreground)] leading-relaxed">
                Every component is crafted around Emil Kowalski design
                engineering principles: spatial consistency,
                hardware-accelerated transforms, and hairline contrast instead
                of blurry shadow soup.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="reveal-item col-span-1 md:col-span-1 lg:col-span-2 rounded-2xl border border-[var(--patiya-color-border)] p-6 sm:p-7 lg:p-8 bg-[var(--patiya-color-card)]/50 backdrop-blur-md flex flex-col justify-between min-h-[340px] lg:min-h-[360px] relative overflow-hidden group">
                <div className="space-y-2 relative z-10 max-w-md">
                  <span className="font-mono text-xs text-[var(--patiya-color-muted-foreground)] uppercase">
                    Cursor-Aware Physics
                  </span>
                  <h3 className="text-xl sm:text-2xl font-semibold">
                    Spotlight Tracking Card
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--patiya-color-muted-foreground)]">
                    Calculates light vector coordinates continuously without
                    causing document reflow or frame drops.
                  </p>
                </div>

                <div className="my-6 sm:my-8 flex items-center justify-center relative z-10 w-full">
                  <SpotlightCard className="w-full max-w-md p-5 sm:p-6 border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] rounded-xl flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[var(--patiya-color-primary)]/10 border border-[var(--patiya-color-primary)]/20 flex items-center justify-center text-[var(--patiya-color-primary)] shrink-0">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.8}
                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                          />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold truncate">
                          Live Proximity
                        </div>
                        <div className="text-xs text-[var(--patiya-color-muted-foreground)] truncate">
                          Hover around this card
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant="soft"
                      color="primary"
                      size="sm"
                      className="shrink-0"
                    >
                      Active
                    </Badge>
                  </SpotlightCard>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-[var(--patiya-color-muted-foreground)] relative z-10">
                  <span>60 FPS</span>
                  <span>•</span>
                  <span>Zero Layout Shifts</span>
                </div>
              </div>

              <div className="reveal-item col-span-1 md:col-span-1 lg:col-span-1 rounded-2xl border border-[var(--patiya-color-border)] p-6 sm:p-7 lg:p-8 bg-[var(--patiya-color-card)]/50 backdrop-blur-md flex flex-col justify-between min-h-[340px] lg:min-h-[360px]">
                <div className="space-y-2">
                  <span className="font-mono text-xs text-[var(--patiya-color-muted-foreground)] uppercase">
                    Micro-Interactions
                  </span>
                  <h3 className="text-xl sm:text-2xl font-semibold">
                    Border Beam
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--patiya-color-muted-foreground)]">
                    Continuous neon laser contours traveling along CSS border
                    geometries.
                  </p>
                </div>

                <div className="my-6 relative rounded-xl border border-[var(--patiya-color-border)] p-6 bg-[var(--patiya-color-background)] overflow-hidden">
                  <BorderBeam
                    size={180}
                    duration={8}
                    colorFrom="#06b6d4"
                    colorTo="#8b5cf6"
                  />
                  <div className="flex flex-col gap-2 relative z-10">
                    <div className="font-mono text-xs font-medium">
                      Laser Raycast
                    </div>
                    <div className="text-[11px] text-[var(--patiya-color-muted-foreground)]">
                      Pure CSS keyframe loop
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="font-mono text-xs text-[var(--patiya-color-muted-foreground)]">
                    Duration: 8s
                  </span>
                  <StatusDot status="online" size="sm" />
                </div>
              </div>

              <div className="reveal-item col-span-1 md:col-span-1 lg:col-span-1 rounded-2xl border border-[var(--patiya-color-border)] p-6 sm:p-7 lg:p-8 bg-[var(--patiya-color-card)]/50 backdrop-blur-md flex flex-col justify-between min-h-[340px] lg:min-h-[360px]">
                <div className="space-y-2">
                  <span className="font-mono text-xs text-[var(--patiya-color-muted-foreground)] uppercase">
                    Direction Sensing
                  </span>
                  <h3 className="text-xl sm:text-2xl font-semibold">
                    Direction Hover
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--patiya-color-muted-foreground)]">
                    Calculates entrance angle from top, bottom, left, or right
                    coordinates.
                  </p>
                </div>

                <div className="my-6 h-40 rounded-xl overflow-hidden border border-[var(--patiya-color-border)]">
                  <DirectionAwareHover
                    className="w-full h-full"
                    imageUrl="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop"
                  >
                    <div className="space-y-1">
                      <div className="font-semibold text-sm text-white">
                        Dynamic Vector
                      </div>
                      <div className="text-xs text-white/80">
                        Enter from any edge
                      </div>
                    </div>
                  </DirectionAwareHover>
                </div>

                <div className="font-mono text-xs text-[var(--patiya-color-muted-foreground)]">
                  Natural Arc Easing
                </div>
              </div>

              <div className="reveal-item col-span-1 md:col-span-1 lg:col-span-2 rounded-2xl border border-[var(--patiya-color-border)] p-6 sm:p-7 lg:p-8 bg-[var(--patiya-color-card)]/50 backdrop-blur-md flex flex-col justify-between min-h-[340px] lg:min-h-[360px]">
                <div className="space-y-2 max-w-md">
                  <span className="font-mono text-xs text-[var(--patiya-color-muted-foreground)] uppercase">
                    AI Interface Primitives
                  </span>
                  <h3 className="text-xl sm:text-2xl font-semibold">
                    Conversational Stack
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--patiya-color-muted-foreground)]">
                    Production-grade PromptInput, ChatBubble, and Typing
                    indicators for AI-native software.
                  </p>
                </div>

                <div className="my-6 space-y-3 w-full">
                  <ChatBubble
                    variant="assistant"
                    className="p-3 text-xs bg-[var(--patiya-color-background)] border border-[var(--patiya-color-border)]"
                  >
                    Ready to stream tokens at 120 words per minute.
                  </ChatBubble>
                  <PromptInput
                    placeholder="Ask assistant to generate UI tokens..."
                    aria-label="Assistant UI prompt"
                    className="bg-[var(--patiya-color-background)] border-[var(--patiya-color-border)]"
                  />
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-[var(--patiya-color-muted-foreground)]">
                  <span>Auto-resizing Rows</span>
                  <span>•</span>
                  <span>Keyboard Enter Handler</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="blocks"
          className="w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 border-b border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)]/20"
        >
          <div className="max-w-6xl mx-auto space-y-10">
            <div className="reveal-item flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs tracking-widest text-[var(--patiya-color-primary)] uppercase">
                    02 / Motion Blocks
                  </span>
                  <span className="text-[9px] font-bold tracking-wider uppercase px-1.5 py-0.2 rounded-md  text-[var(--patiya-color-primary)] border border-[var(--patiya-color-primary)]/20">
                    motion.dev
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter">
                  Modular, animated component blocks.
                </h2>
                <p className="text-sm sm:text-base text-[var(--patiya-color-muted-foreground)] leading-relaxed">
                  Self-contained interactive UI blocks built with Motion.dev
                  spring physics. Hairline borders, zero drop shadows, and
                  copy-paste ready for your Next.js and React apps.
                </p>
              </div>

              <Link href="/docs/blocks" className="shrink-0">
                <Button
                  color="primary"
                  variant="outline"
                  className="h-10 px-5 rounded-xl text-xs font-semibold border-[var(--patiya-color-border)] hover:bg-[var(--patiya-color-card)] flex items-center gap-2"
                >
                  <span>Browse All 50+ Blocks</span>
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  title: "Smart Workspaces",
                  count: "9 blocks",
                  description:
                    "AI prompt switchers, dynamic payment vaults, presence bars, command palettes, and asset staging trays.",
                  slug: "prompt-model-switcher",
                  badge: "Workspaces",
                },
                {
                  title: "Spatial Dynamic Hubs",
                  count: "6 blocks",
                  description:
                    "Morphing dynamic island hubs, holographic 3D tilt cards, magnetic fluid metaballs, and decryptors.",
                  slug: "dynamic-island-hub",
                  badge: "Spatial",
                },
                {
                  title: "Tactile Surfaces",
                  count: "7 blocks",
                  description:
                    "Fluid equalizer scrubbers, tactile rotary dials, spatial coordinate pads, and interactive gesture decks.",
                  slug: "fluid-equalizer-scrubber",
                  badge: "Tactile",
                },
                {
                  title: "Interactive Studios",
                  count: "5 blocks",
                  description:
                    "Bezier curve surfaces, palette & gradient tuners, layer hierarchy trees, and studio track arrangers.",
                  slug: "bezier-curve-surface",
                  badge: "Studio",
                },
                {
                  title: "Toolbars & Docks",
                  count: "4 blocks",
                  description:
                    "Floating action bars, command palettes, and canvas tool docks with spring magnification and layoutId pills.",
                  slug: "action-dock",
                  badge: "Toolbars",
                },
                {
                  title: "Metrics & Telemetry",
                  count: "3 blocks",
                  description:
                    "Real-time telemetry charts, live frequency bars, and animated spark KPI cards.",
                  slug: "telemetry-live-stream",
                  badge: "Telemetry",
                },
              ].map((item) => (
                <Link
                  key={item.title}
                  href={`/docs/blocks/${item.slug}`}
                  className="reveal-item p-5 sm:p-6 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)]/50 hover:bg-[var(--patiya-color-card)] hover:border-[var(--patiya-color-primary)]/40 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--patiya-color-primary)] font-bold">
                        {item.badge}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] text-[var(--patiya-color-muted-foreground)]">
                        {item.count}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-[var(--patiya-color-foreground)] group-hover:text-[var(--patiya-color-primary)] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[var(--patiya-color-muted-foreground)] leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-6 flex items-center gap-1.5 text-xs font-semibold text-[var(--patiya-color-primary)]">
                    <span>View component</span>
                    <svg
                      className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section
          id="matrix"
          className="w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 border-b border-[var(--patiya-color-border)]"
        >
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="reveal-item flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div className="space-y-3 max-w-xl">
                <div className="font-mono text-xs tracking-widest text-[var(--patiya-color-primary)] uppercase">
                  03 / Component Playground
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter">
                  Inspect the source. Copy in one click.
                </h2>
                <p className="text-sm sm:text-base text-[var(--patiya-color-muted-foreground)]">
                  Test interactive elements in isolation and copy clean React
                  TypeScript implementation code.
                </p>
              </div>

              <div className="flex flex-wrap gap-1 p-1 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)]/60 max-w-full overflow-x-auto">
                {(
                  [
                    { id: "buttons", label: "Buttons" },
                    { id: "status", label: "Status & Badges" },
                    { id: "ai", label: "AI Interfaces" },
                    { id: "cards", label: "Spatial Cards" },
                  ] as const
                ).map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() =>
                      startTransition(() => setActiveCategory(cat.id))
                    }
                    className={`px-3 sm:px-3.5 py-1.5 text-xs rounded-lg font-medium transition-colors cursor-pointer shrink-0 ${
                      activeCategory === cat.id
                        ? "bg-[var(--patiya-color-primary)] text-white"
                        : "text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)]"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="reveal-item grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
              <div className="rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)]/40 p-6 sm:p-8 flex flex-col justify-center items-center min-h-[320px] sm:min-h-[360px]">
                {activeCategory === "buttons" && (
                  <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                    <Magnetic intensity={0.3}>
                      <ShimmerButton
                        background="var(--patiya-color-primary)"
                        className="h-11 px-6 text-sm"
                      >
                        Shimmer Button
                      </ShimmerButton>
                    </Magnetic>
                    <Button
                      variant="outline"
                      className="h-11 px-5 rounded-xl border border-[var(--patiya-color-border)]"
                    >
                      Outline Button
                    </Button>
                    <CopyButton
                      value="bun add patiya"
                      size="md"
                      className="h-11 px-4 rounded-xl border border-[var(--patiya-color-border)]"
                    >
                      Copy Command
                    </CopyButton>
                  </div>
                )}

                {activeCategory === "status" && (
                  <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
                    <StatusDot status="online" ping={true} label="Connected" />
                    <StatusDot status="busy" label="Rendering" />
                    <Badge variant="soft" color="primary">
                      Primary Soft
                    </Badge>
                    <Badge variant="outline" color="secondary">
                      Outline
                    </Badge>
                    <Kbd size="md">⌘K</Kbd>
                  </div>
                )}

                {activeCategory === "ai" && (
                  <div className="w-full max-w-md space-y-3">
                    <ChatBubble
                      variant="assistant"
                      className="text-xs p-3 bg-[var(--patiya-color-background)] border border-[var(--patiya-color-border)]"
                    >
                      Component synthesized without runtime styles.
                    </ChatBubble>
                    <PromptInput
                      placeholder="Type query..."
                      aria-label="Query input"
                      className="bg-[var(--patiya-color-background)] border-[var(--patiya-color-border)]"
                    />
                  </div>
                )}

                {activeCategory === "cards" && (
                  <TiltCard
                    className="w-full max-w-[280px] h-[160px]"
                    cardClassName="rounded-xl border border-[var(--patiya-color-border)] p-5 flex flex-col justify-between bg-[var(--patiya-color-background)]"
                  >
                    <div className="font-mono text-xs text-[var(--patiya-color-primary)] font-semibold">
                      PHYSICS TILT
                    </div>
                    <div className="text-xs text-[var(--patiya-color-muted-foreground)]">
                      Interactive specular glare
                    </div>
                  </TiltCard>
                )}
              </div>

              <div className="rounded-2xl border border-[var(--patiya-color-border)] bg-[#0d1117] text-[#c9d1d9] overflow-hidden flex flex-col min-h-[320px] sm:min-h-[360px]">
                <div className="flex items-center justify-between px-4 py-3 border-b border-[#30363d] bg-[#161b22]">
                  <span className="font-mono text-xs text-[#8b949e]">
                    {playgroundSnippets[activeCategory].title}
                  </span>
                  <CopyButton
                    value={playgroundSnippets[activeCategory].code}
                    size="sm"
                    variant="ghost"
                    className="text-[#8b949e] hover:text-white"
                    aria-label="Copy code snippet"
                  />
                </div>
                <div className="p-4 sm:p-5 font-mono text-xs overflow-x-auto custom-scrollbar flex-1 flex flex-col justify-center">
                  <pre className="m-0 p-0 leading-relaxed text-[#58a6ff]">
                    <code>{playgroundSnippets[activeCategory].code}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="principles"
          className="w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 border-b border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)]/20"
        >
          <div className="max-w-6xl mx-auto space-y-10">
            <div className="reveal-item space-y-3 max-w-xl">
              <div className="font-mono text-xs tracking-widest text-[var(--patiya-color-primary)] uppercase">
                04 / Craft Philosophy
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter">
                Why Patiya UI feels right.
              </h2>
              <p className="text-sm sm:text-base text-[var(--patiya-color-muted-foreground)]">
                Software is judged by intangible polish. Invisible correctness
                compounds into an experience users love without having to think
                twice.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
              <div className="reveal-item rounded-2xl border border-[var(--patiya-color-border)] p-6 lg:p-8 bg-[var(--patiya-color-background)] space-y-4">
                <div className="w-10 h-10 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-muted)]/30 flex items-center justify-center font-mono text-sm">
                  01
                </div>
                <h3 className="text-lg sm:text-xl font-semibold">
                  Hairline Depth
                </h3>
                <p className="text-xs sm:text-sm text-[var(--patiya-color-muted-foreground)] leading-relaxed">
                  Blurry drop shadows make interfaces feel heavy and indistinct.
                  We achieve visual hierarchy using 1px geometric borders,
                  luminance contrast, and frosted layers.
                </p>
              </div>

              <div className="reveal-item rounded-2xl border border-[var(--patiya-color-border)] p-6 lg:p-8 bg-[var(--patiya-color-background)] space-y-4">
                <div className="w-10 h-10 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-muted)]/30 flex items-center justify-center font-mono text-sm">
                  02
                </div>
                <h3 className="text-lg sm:text-xl font-semibold">
                  Hardware Acceleration
                </h3>
                <p className="text-xs sm:text-sm text-[var(--patiya-color-muted-foreground)] leading-relaxed">
                  Animations are strictly confined to GPU-composited transform
                  and opacity. No animating layout properties like height or
                  padding that cause frame stutter.
                </p>
              </div>

              <div className="reveal-item rounded-2xl border border-[var(--patiya-color-border)] p-6 lg:p-8 bg-[var(--patiya-color-background)] space-y-4">
                <div className="w-10 h-10 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-muted)]/30 flex items-center justify-center font-mono text-sm">
                  03
                </div>
                <h3 className="text-lg sm:text-xl font-semibold">
                  Tailwind v4 Native
                </h3>
                <p className="text-xs sm:text-sm text-[var(--patiya-color-muted-foreground)] leading-relaxed">
                  Written for the latest CSS specifications using native CSS
                  variables. Zero runtime JavaScript injecting styles into head
                  tags, instant build performance.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="faq"
          className="w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 border-b border-[var(--patiya-color-border)]"
        >
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="reveal-item space-y-3 text-center sm:text-left">
              <div className="font-mono text-xs tracking-widest text-[var(--patiya-color-primary)] uppercase">
                05 / Frequent Inquiries
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter">
                Frequently asked questions.
              </h2>
            </div>

            <div className="reveal-item rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)]/40 p-5 sm:p-7 lg:p-8">
              <Accordion type="single" defaultValue="item-1">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-base font-semibold hover:no-underline">
                    How is Patiya UI different from typical UI kits?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-[var(--patiya-color-muted-foreground)] leading-relaxed pt-2">
                    Most component libraries rely on heavy drop shadows and
                    generic animations. Patiya UI is built around design
                    engineering standards: crisp hairline borders, physics-based
                    springs, and zero CSS runtime overhead.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-blocks">
                  <AccordionTrigger className="text-base font-semibold hover:no-underline">
                    What are Motion Blocks?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-[var(--patiya-color-muted-foreground)] leading-relaxed pt-2">
                    Motion Blocks are self-contained, pre-animated component
                    blocks powered by Motion.dev (
                    <code className="text-xs font-mono px-1 py-0.5 rounded bg-[var(--patiya-color-muted)]">
                      motion/react
                    </code>
                    ). They include floating docks, real-time telemetry cards,
                    interactive alert capsules, steppers, and filters ready to
                    copy and paste.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-base font-semibold hover:no-underline">
                    Does Patiya UI work with Bun and React 19?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-[var(--patiya-color-muted-foreground)] leading-relaxed pt-2">
                    Yes. Patiya UI is packaged as native ESM and CJS modules
                    fully tested on Bun, Node.js, Next.js App Router, and React
                    19 without hydration mismatches.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-base font-semibold hover:no-underline">
                    Is Tailwind CSS v4 supported?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-[var(--patiya-color-muted-foreground)] leading-relaxed pt-2">
                    Yes. Patiya UI is built on Tailwind CSS v4 architecture and
                    exposes native CSS custom properties for effortless theme
                    swapping and design token adjustments.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-base font-semibold hover:no-underline">
                    Can I copy individual components without installing the full
                    package?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-[var(--patiya-color-muted-foreground)] leading-relaxed pt-2">
                    Yes. All components are self-contained and copy-paste ready
                    from our documentation pages, with clear TypeScript types
                    and minimal dependencies.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        <section className="w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="reveal-item relative rounded-3xl border border-[var(--patiya-color-border)] p-6 sm:p-10 md:p-12 bg-[var(--patiya-color-card)]/80 backdrop-blur-xl overflow-hidden text-center space-y-6">
              <BorderBeam
                size={320}
                duration={12}
                colorFrom="#3b82f6"
                colorTo="#a855f7"
              />

              <div className="space-y-4 max-w-xl mx-auto relative z-10">
                <div className="font-mono text-xs tracking-widest text-[var(--patiya-color-primary)] uppercase">
                  Ready to Ship
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter">
                  Elevate your interface today.
                </h2>
                <p className="text-sm sm:text-base text-[var(--patiya-color-muted-foreground)]">
                  Join developers building next-generation web applications with
                  precision components and physics motion.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 relative z-10 pt-2">
                <div className="w-full sm:w-auto flex items-center justify-between sm:justify-center gap-3 h-12 px-4 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] font-mono text-xs">
                  <span className="text-[var(--patiya-color-muted-foreground)]">
                    $
                  </span>
                  <span className="font-medium">bun add patiya</span>
                  <CopyButton
                    value="bun add patiya"
                    size="sm"
                    variant="ghost"
                    className="h-7 px-2"
                    aria-label="Copy installation command"
                  />
                </div>

                <Link href="/docs" className="w-full sm:w-auto">
                  <ShimmerButton
                    background="var(--patiya-color-primary)"
                    shimmerColor="#ffffff"
                    borderRadius="12px"
                    className="w-full sm:w-auto h-12 px-8 text-sm font-medium justify-center"
                  >
                    Explore Documentation
                  </ShimmerButton>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <QuickSearchModal open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </Box>
  );
}
