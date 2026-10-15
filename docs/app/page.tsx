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
import { QuickSearchModal } from "../components/QuickSearchModal";
import { Logo } from "../components/Logo";
import { Footer } from "../components/Footer";

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

  const [isSearchOpen, setIsSearchOpen] = useState(false);
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
        <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <Logo className="w-7 h-7 transition-transform duration-300 group-hover:scale-105" />
            <span className="font-semibold text-base tracking-tight">
              Patiya UI
            </span>
            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded border border-[var(--patiya-color-border)] text-[var(--patiya-color-muted-foreground)] uppercase">
              v2.0
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[var(--patiya-color-muted-foreground)]">
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

          <div className="flex items-center gap-2.5">
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
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center w-full">
        <section className="w-full relative px-4 sm:px-6 md:px-8 pt-10 pb-12 md:pt-14 md:pb-16 overflow-hidden border-b border-[var(--patiya-color-border)]">
          <div className="absolute inset-0 z-0 bg-dot opacity-[0.12] dark:opacity-[0.25] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,black_30%,transparent_100%)]" />

          <div className="max-w-5xl mx-auto flex flex-col items-center text-center relative z-10 space-y-6">
            <Magnetic intensity={0.2} range={140}>
              <Link href="/docs">
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)]/70 backdrop-blur-md hover:border-[var(--patiya-color-primary)] transition-colors">
                  <StatusDot status="online" ping={true} size="sm" />
                  <span className="font-mono text-xs tracking-wide  text-[var(--patiya-color-foreground)]">
                    Patiya UI V2.0
                  </span>
                  <span className="text-xs text-[var(--patiya-color-muted-foreground)]">
                    80+ Animated Components
                  </span>
                  <svg
                    className="w-3.5 h-3.5 text-[var(--patiya-color-muted-foreground)]"
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

            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tighter leading-[1.05] max-w-4xl text-(--patiya-color-foreground)">
              Form follows feeling. <br />
              <span className="text-(--patiya-color-primary)">
                Engineered for speed.
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-(--patiya-color-muted-foreground) max-w-2xl font-normal leading-relaxed">
              Accessible React components designed for craft-minded developers.
              Hairline geometry, physics-driven animations, zero shadow soup,
              and native Tailwind CSS v4 support.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-md pt-2">
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

              <div className="w-full sm:w-auto flex items-center justify-between gap-3 h-12 px-3.5 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)]/60 font-mono text-xs">
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

            <div id="stage" className="w-full max-w-5xl mt-8 pt-2">
              <div className="relative rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)]/70 backdrop-blur-xl overflow-hidden text-left">
                <BorderBeam
                  size={280}
                  duration={14}
                  colorFrom="#3b82f6"
                  colorTo="#8b5cf6"
                />

                <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 border-b border-[var(--patiya-color-border)] bg-[var(--patiya-color-muted)]/20">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400/80 inline-block" />
                    <span className="ml-2 font-mono text-xs text-[var(--patiya-color-muted-foreground)] hidden sm:inline-block">
                      studio-workbench.tsx
                    </span>
                  </div>

                  <div className="flex items-center gap-1 p-1 rounded-lg border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)]/60">
                    {(
                      [
                        { id: "dock", label: "macOS Dock" },
                        { id: "card3d", label: "Spatial 3D" },
                        { id: "ai", label: "AI Chat" },
                        { id: "spotlight", label: "Spotlight" },
                      ] as const
                    ).map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() =>
                          startTransition(() => setActiveHeroTab(tab.id))
                        }
                        className={`px-3 py-1 text-xs rounded-md font-medium transition-colors cursor-pointer ${
                          activeHeroTab === tab.id
                            ? "bg-[var(--patiya-color-primary)] text-white"
                            : "text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)]"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-6 sm:p-10 min-h-[380px] flex items-center justify-center relative">
                  {activeHeroTab === "dock" && (
                    <div className="flex flex-col items-center gap-8 w-full max-w-lg">
                      <div className="text-center space-y-1">
                        <span className="font-mono text-xs text-[var(--patiya-color-primary)] uppercase tracking-wider">
                          Interactive Physics
                        </span>
                        <div className="text-lg font-semibold">
                          Magnification Dock
                        </div>
                        <p className="text-xs text-[var(--patiya-color-muted-foreground)]">
                          Move cursor across icons to test smooth proximity
                          scaling.
                        </p>
                      </div>

                      <div className="px-5 py-4 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)]/80 backdrop-blur-md">
                        <Dock magnification={64} distance={140}>
                          <DockItem className="bg-gradient-to-tr from-sky-500 to-blue-600 text-white border border-white/20">
                            ⚡
                          </DockItem>
                          <DockItem className="bg-gradient-to-tr from-emerald-500 to-teal-600 text-white border border-white/20">
                            🌿
                          </DockItem>
                          <DockItem className="bg-gradient-to-tr from-amber-500 to-orange-600 text-white border border-white/20">
                            ✨
                          </DockItem>
                          <DockItem className="bg-gradient-to-tr from-purple-500 to-pink-600 text-white border border-white/20">
                            🎨
                          </DockItem>
                          <DockItem className="bg-[var(--patiya-color-primary)] text-white border border-white/20">
                            P
                          </DockItem>
                        </Dock>
                      </div>
                    </div>
                  )}

                  {activeHeroTab === "card3d" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl items-center">
                      <div className="flex flex-col items-center text-center">
                        <span className="font-mono text-xs text-[var(--patiya-color-muted-foreground)] uppercase mb-3">
                          3D Tilt Physics
                        </span>
                        <TiltCard
                          className="w-full max-w-[280px] h-[170px]"
                          cardClassName="rounded-2xl border border-[var(--patiya-color-border)] p-5 flex flex-col justify-between bg-[var(--patiya-color-background)]"
                          tiltMaxAngleX={18}
                          tiltMaxAngleY={18}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-mono text-xs tracking-widest text-[var(--patiya-color-primary)] font-semibold">
                              PATIYA PASS
                            </span>
                            <StatusDot status="online" size="sm" />
                          </div>
                          <div className="space-y-1">
                            <div className="font-mono text-sm tracking-widest text-[var(--patiya-color-foreground)]">
                              •••• 4892
                            </div>
                            <div className="text-[10px] text-[var(--patiya-color-muted-foreground)] uppercase font-mono">
                              Studio Edition
                            </div>
                          </div>
                        </TiltCard>
                      </div>

                      <div className="flex flex-col items-center text-center">
                        <span className="font-mono text-xs text-[var(--patiya-color-muted-foreground)] uppercase mb-3">
                          Spatial Flip Card (Click to Flip)
                        </span>
                        <FlipCard
                          className="w-full max-w-[280px] h-[170px]"
                          front={
                            <div className="w-full h-full rounded-2xl border border-[var(--patiya-color-border)] p-5 flex flex-col justify-between bg-[var(--patiya-color-background)] text-left">
                              <Badge variant="outline" size="sm">
                                Standard
                              </Badge>
                              <div className="space-y-1">
                                <div className="font-semibold text-sm">
                                  Developer Key
                                </div>
                                <p className="text-[11px] text-[var(--patiya-color-muted-foreground)]">
                                  Click to reveal back
                                </p>
                              </div>
                            </div>
                          }
                          back={
                            <div className="w-full h-full rounded-2xl border border-transparent p-5 flex flex-col justify-between bg-gradient-to-tr from-blue-600 to-indigo-600 text-white text-left">
                              <Badge
                                variant="solid"
                                color="secondary"
                                size="sm"
                                className="bg-white/20 text-white"
                              >
                                Active
                              </Badge>
                              <div className="space-y-1">
                                <div className="font-semibold text-sm">
                                  Lifetime Pro
                                </div>
                                <p className="text-[11px] text-white/80">
                                  Full token access enabled
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
                      <div className="max-h-[220px] overflow-y-auto custom-scrollbar space-y-3 pr-1">
                        {chatMessages.map((msg) => (
                          <ChatBubble
                            key={msg.id}
                            variant={msg.sender}
                            className="p-3 text-xs"
                          >
                            {msg.text}
                          </ChatBubble>
                        ))}
                      </div>

                      <PromptInput
                        value={promptText}
                        onChange={(e) => setPromptText(e.target.value)}
                        onValueSubmit={handlePromptSubmit}
                        placeholder="Type prompt and press Enter..."
                        aria-label="Interactive AI chat prompt"
                        className="bg-[var(--patiya-color-background)] border-[var(--patiya-color-border)]"
                      />
                    </div>
                  )}

                  {activeHeroTab === "spotlight" && (
                    <div className="w-full max-w-md">
                      <SpotlightCard className="p-8 border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] rounded-2xl flex flex-col items-center text-center gap-5">
                        <Magnetic intensity={0.35} range={160}>
                          <div className="w-16 h-16 rounded-2xl border border-[var(--patiya-color-border)] bg-gradient-to-tr from-blue-500/20 to-purple-500/20 flex items-center justify-center text-[var(--patiya-color-primary)]">
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
                          <div className="text-lg font-semibold">
                            Cursor Tracking Spotlight
                          </div>
                          <p className="text-xs text-[var(--patiya-color-muted-foreground)] leading-relaxed">
                            Calculates radial lighting vectors strictly on
                            pointer events without causing layout repaints.
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
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[var(--patiya-color-border)]">
              <div className="py-5 flex flex-col items-center justify-center  md:text-left gap-1">
                <div className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-[var(--patiya-color-foreground)]">
                  80+
                </div>
                <div className="font-mono text-xs text-[var(--patiya-color-muted-foreground)] uppercase tracking-wider">
                  Ready Components
                </div>
              </div>
              <div className="py-5 flex flex-col items-center justify-center  md:text-left gap-1">
                <div className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-[var(--patiya-color-foreground)]">
                  60 FPS
                </div>
                <div className="font-mono text-xs text-[var(--patiya-color-muted-foreground)] uppercase tracking-wider">
                  Hardware Motion
                </div>
              </div>
              <div className="py-5 flex flex-col items-center justify-center  md:text-left gap-1">
                <div className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-[var(--patiya-color-foreground)]">
                  &lt;15 KB
                </div>
                <div className="font-mono text-xs text-[var(--patiya-color-muted-foreground)] uppercase tracking-wider">
                  Gzip Footprint
                </div>
              </div>
              <div className="py-5 flex flex-col items-center justify-center  md:text-left gap-1">
                <div className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-[var(--patiya-color-foreground)]">
                  Zero
                </div>
                <div className="font-mono text-xs text-(--patiya-color-muted-foreground) uppercase tracking-wider">
                  CSS Runtime Overhead
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="showcase"
          className="w-full py-12 sm:py-16 px-4 sm:px-6 md:px-8 border-b border-[var(--patiya-color-border)]"
        >
          <div className="max-w-6xl mx-auto space-y-10">
            <div className="reveal-item space-y-3 max-w-2xl">
              <div className="font-mono text-xs tracking-widest text-[var(--patiya-color-primary)] uppercase">
                01 / Interactive Suite
              </div>
              <h2 className="text-3xl sm:text-5xl font-semibold tracking-tighter">
                Crafted with physics. Built for performance.
              </h2>
              <p className="text-sm sm:text-base text-[var(--patiya-color-muted-foreground)] leading-relaxed">
                Every component is crafted around Emil Kowalski design
                engineering principles: spatial consistency,
                hardware-accelerated transforms, and hairline contrast instead
                of blurry shadow soup.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="reveal-item md:col-span-2 rounded-2xl border border-[var(--patiya-color-border)] p-8 bg-[var(--patiya-color-card)]/50 backdrop-blur-md flex flex-col justify-between min-h-[360px] relative overflow-hidden group">
                <div className="space-y-2 relative z-10 max-w-md">
                  <span className="font-mono text-xs text-[var(--patiya-color-muted-foreground)] uppercase">
                    Cursor-Aware Physics
                  </span>
                  <h3 className="text-2xl font-semibold">
                    Spotlight Tracking Card
                  </h3>
                  <p className="text-sm text-[var(--patiya-color-muted-foreground)]">
                    Calculates light vector coordinates continuously without
                    causing document reflow or frame drops.
                  </p>
                </div>

                <div className="my-8 flex items-center justify-center relative z-10">
                  <SpotlightCard className="w-full max-w-md p-6 border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[var(--patiya-color-primary)]/10 border border-[var(--patiya-color-primary)]/20 flex items-center justify-center text-[var(--patiya-color-primary)]">
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
                      <div>
                        <div className="text-sm font-semibold">
                          Live Proximity
                        </div>
                        <div className="text-xs text-[var(--patiya-color-muted-foreground)]">
                          Hover around this card
                        </div>
                      </div>
                    </div>
                    <Badge variant="soft" color="primary" size="sm">
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

              <div className="reveal-item md:col-span-1 rounded-2xl border border-[var(--patiya-color-border)] p-8 bg-[var(--patiya-color-card)]/50 backdrop-blur-md flex flex-col justify-between min-h-[360px]">
                <div className="space-y-2">
                  <span className="font-mono text-xs text-[var(--patiya-color-muted-foreground)] uppercase">
                    Micro-Interactions
                  </span>
                  <h3 className="text-2xl font-semibold">Border Beam</h3>
                  <p className="text-sm text-[var(--patiya-color-muted-foreground)]">
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

              <div className="reveal-item md:col-span-1 rounded-2xl border border-[var(--patiya-color-border)] p-8 bg-[var(--patiya-color-card)]/50 backdrop-blur-md flex flex-col justify-between min-h-[360px]">
                <div className="space-y-2">
                  <span className="font-mono text-xs text-[var(--patiya-color-muted-foreground)] uppercase">
                    Direction Sensing
                  </span>
                  <h3 className="text-2xl font-semibold">Direction Hover</h3>
                  <p className="text-sm text-[var(--patiya-color-muted-foreground)]">
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

              <div className="reveal-item md:col-span-2 rounded-2xl border border-[var(--patiya-color-border)] p-8 bg-[var(--patiya-color-card)]/50 backdrop-blur-md flex flex-col justify-between min-h-[360px]">
                <div className="space-y-2 max-w-md">
                  <span className="font-mono text-xs text-[var(--patiya-color-muted-foreground)] uppercase">
                    AI Interface Primitives
                  </span>
                  <h3 className="text-2xl font-semibold">
                    Conversational Stack
                  </h3>
                  <p className="text-sm text-[var(--patiya-color-muted-foreground)]">
                    Production-grade PromptInput, ChatBubble, and Typing
                    indicators for AI-native software.
                  </p>
                </div>

                <div className="my-6 space-y-3">
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
          id="matrix"
          className="w-full py-12 sm:py-16 px-4 sm:px-6 md:px-8 border-b border-[var(--patiya-color-border)]"
        >
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="reveal-item flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-3 max-w-xl">
                <div className="font-mono text-xs tracking-widest text-[var(--patiya-color-primary)] uppercase">
                  02 / Component Playground
                </div>
                <h2 className="text-3xl sm:text-5xl font-semibold tracking-tighter">
                  Inspect the source. Copy in one click.
                </h2>
                <p className="text-sm sm:text-base text-[var(--patiya-color-muted-foreground)]">
                  Test interactive elements in isolation and copy clean React
                  TypeScript implementation code.
                </p>
              </div>

              <div className="flex flex-wrap gap-1 p-1 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)]/60">
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
                    className={`px-3.5 py-1.5 text-xs rounded-lg font-medium transition-colors cursor-pointer ${
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

            <div className="reveal-item grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)]/40 p-8 flex flex-col justify-center items-center min-h-[340px]">
                {activeCategory === "buttons" && (
                  <div className="flex flex-wrap items-center justify-center gap-4">
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
                  <div className="flex flex-wrap items-center justify-center gap-5">
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

              <div className="rounded-2xl border border-[var(--patiya-color-border)] bg-[#0d1117] text-[#c9d1d9] overflow-hidden flex flex-col">
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
                <div className="p-5 font-mono text-xs overflow-x-auto custom-scrollbar flex-1">
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
          className="w-full py-12 sm:py-16 px-4 sm:px-6 md:px-8 border-b border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)]/20"
        >
          <div className="max-w-6xl mx-auto space-y-10">
            <div className="reveal-item space-y-3 max-w-xl">
              <div className="font-mono text-xs tracking-widest text-[var(--patiya-color-primary)] uppercase">
                03 / Craft Philosophy
              </div>
              <h2 className="text-3xl sm:text-5xl font-semibold tracking-tighter">
                Why Patiya UI feels right.
              </h2>
              <p className="text-sm sm:text-base text-[var(--patiya-color-muted-foreground)]">
                Software is judged by intangible polish. Invisible correctness
                compounds into an experience users love without having to think
                twice.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="reveal-item rounded-2xl border border-[var(--patiya-color-border)] p-8 bg-[var(--patiya-color-background)] space-y-4">
                <div className="w-10 h-10 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-muted)]/30 flex items-center justify-center font-mono text-sm">
                  01
                </div>
                <h3 className="text-xl font-semibold">Hairline Depth</h3>
                <p className="text-sm text-[var(--patiya-color-muted-foreground)] leading-relaxed">
                  Blurry drop shadows make interfaces feel heavy and indistinct.
                  We achieve visual hierarchy using 1px geometric borders,
                  luminance contrast, and frosted layers.
                </p>
              </div>

              <div className="reveal-item rounded-2xl border border-[var(--patiya-color-border)] p-8 bg-[var(--patiya-color-background)] space-y-4">
                <div className="w-10 h-10 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-muted)]/30 flex items-center justify-center font-mono text-sm">
                  02
                </div>
                <h3 className="text-xl font-semibold">Hardware Acceleration</h3>
                <p className="text-sm text-[var(--patiya-color-muted-foreground)] leading-relaxed">
                  Animations are strictly confined to GPU-composited transform
                  and opacity. No animating layout properties like height or
                  padding that cause frame stutter.
                </p>
              </div>

              <div className="reveal-item rounded-2xl border border-[var(--patiya-color-border)] p-8 bg-[var(--patiya-color-background)] space-y-4">
                <div className="w-10 h-10 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-muted)]/30 flex items-center justify-center font-mono text-sm">
                  03
                </div>
                <h3 className="text-xl font-semibold">Tailwind v4 Native</h3>
                <p className="text-sm text-[var(--patiya-color-muted-foreground)] leading-relaxed">
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
          className="w-full py-12 sm:py-16 px-4 sm:px-6 md:px-8 border-b border-[var(--patiya-color-border)]"
        >
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="reveal-item space-y-3 text-center sm:text-left">
              <div className="font-mono text-xs tracking-widest text-[var(--patiya-color-primary)] uppercase">
                04 / Frequent Inquiries
              </div>
              <h2 className="text-3xl sm:text-5xl font-semibold tracking-tighter">
                Frequently asked questions.
              </h2>
            </div>

            <div className="reveal-item rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)]/40 p-6 sm:p-8">
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

        <section className="w-full py-12 sm:py-16 px-4 sm:px-6 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="reveal-item relative rounded-3xl border border-[var(--patiya-color-border)] p-8 sm:p-12 bg-[var(--patiya-color-card)]/80 backdrop-blur-xl overflow-hidden text-center space-y-6">
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
                <h2 className="text-3xl sm:text-5xl font-semibold tracking-tighter">
                  Elevate your interface today.
                </h2>
                <p className="text-sm sm:text-base text-[var(--patiya-color-muted-foreground)]">
                  Join developers building next-generation web applications with
                  precision components and physics motion.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 relative z-10 pt-2">
                <div className="flex items-center gap-3 h-12 px-4 rounded-xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)] font-mono text-xs">
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

                <Link href="/docs">
                  <ShimmerButton
                    background="var(--patiya-color-primary)"
                    shimmerColor="#ffffff"
                    borderRadius="12px"
                    className="h-12 px-8 text-sm font-medium"
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
