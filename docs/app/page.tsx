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
  DirectionAwareHover,
} from "patiya";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "../components/Logo";
import { Footer } from "../components/Footer";

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
  );
}

export default function Home() {
  return (
    <Box className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-[var(--patiya-color-border)] bg-[var(--patiya-color-background)]/80 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="w-8 h-8" />
            <span className="font-bold text-lg hidden sm:inline-block">
              Patiya UI
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/docs"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Documentation
            </Link>
            <Link
              href="https://github.com/ajay-katariya08/patiya-ui"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-muted-foreground hover:text-foreground hidden sm:block"
            >
              GitHub
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center px-4 sm:px-6 md:px-8 py-16 md:py-32 gap-20 relative overflow-hidden">
        {/* Background Grids & Blobs */}
        <div className="absolute inset-0 z-[-1] bg-dot [mask-image:linear-gradient(to_bottom,white_20%,transparent_80%)] opacity-[0.1] dark:opacity-[0.3]" />

        {/* Hero Section */}
        <Box className="text-center space-y-8 max-w-4xl flex flex-col items-center relative z-10 w-full">
          <Magnetic intensity={0.2} range={200}>
            <Link href="/docs">
              <Badge
                variant="soft"
                color="primary"
                className="text-sm px-4 py-1.5 rounded-full shadow-sm cursor-pointer hover:bg-primary/20 transition-colors"
              >
                ✨ Introducing Interactive Components
              </Badge>
            </Link>
          </Magnetic>

          <h1 className="text-5xl sm:text-6xl md:text-8xl font-medium tracking-tighter px-4 leading-[1.1]">
            Premium UI <br />{" "}
            <span className="bg-clip-text text-blue-500">Made Simple.</span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-(--patiya-color-muted-foreground) max-w-2xl px-4 font-medium">
            A beautiful, fully interactive, and highly customizable React
            component library designed to make your web apps stand out.
          </p>

          <Box className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-md sm:max-w-none pt-4">
            <Link href="/docs" className="w-full sm:w-auto">
              <ShimmerButton
                background="var(--patiya-color-primary)"
                shimmerColor="#ffffff"
                className="w-full sm:w-auto text-lg h-14 px-10 shadow-xl shadow-primary/20 hover:-translate-y-1 transition-transform"
              >
                Start Building
              </ShimmerButton>
            </Link>
            <Link href="/docs" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-lg h-14 px-10 rounded-full border-2 hover:bg-(--patiya-color-primary) hover:text-white cursor-pointer"
              >
                View Components
              </Button>
            </Link>
          </Box>
        </Box>

        {/* Interactive Showcase Section */}
        <Box className="w-full max-w-6xl mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {/* Card 1: Spotlight */}
          <SpotlightCard className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col items-center justify-center p-8 bg-[var(--patiya-color-card)]/40 backdrop-blur-md border border-[var(--patiya-color-border)] shadow-lg min-h-[350px]">
            <h3 className="text-2xl font-bold mb-4">Spotlight Hover</h3>
            <p className="text-center text-[var(--patiya-color-muted-foreground)] mb-6">
              Cursor-aware gradient tracking effects for modern cards.
            </p>
            <Magnetic intensity={0.4}>
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-purple-500 shadow-xl animate-pulse" />
            </Magnetic>
          </SpotlightCard>

          {/* Card 2: Direction Aware Hover */}
          <div className="col-span-1 lg:col-span-2 min-h-[350px] rounded-3xl border border-[var(--patiya-color-border)] p-2 bg-[var(--patiya-color-card)]/40 backdrop-blur-md shadow-lg">
            <DirectionAwareHover
              className="w-full h-full rounded-2xl"
              imageUrl="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop"
            >
              <h3 className="text-3xl font-bold text-white mb-2">
                Direction Aware
              </h3>
              <p className="text-gray-200 text-lg">
                Hover from any direction to see the magic.
              </p>
            </DirectionAwareHover>
          </div>

          {/* Card 3: Flip Card */}
          <div className="col-span-1 min-h-[350px] rounded-3xl border border-[var(--patiya-color-border)] p-6 bg-[var(--patiya-color-card)]/40 backdrop-blur-md shadow-lg flex flex-col items-center justify-center">
            <h3 className="text-2xl font-bold mb-6">3D Flip Cards</h3>
            <FlipCard
              className="w-full max-w-[280px] h-[360px]"
              direction="horizontal"
              front={
                <div className="w-full h-full bg-[var(--patiya-color-card)] rounded-[1.5rem] shadow-lg flex flex-col items-center justify-center border border-[var(--patiya-color-border)] p-6 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--patiya-color-primary)]/10 rounded-full blur-3xl transition-transform duration-500 group-hover:scale-150" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl" />

                  <div className="w-16 h-16 rounded-full bg-[var(--patiya-color-primary)]/10 flex items-center justify-center mb-6 text-[var(--patiya-color-primary)] ring-1 ring-[var(--patiya-color-primary)]/20 shadow-inner">
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--patiya-color-foreground)]">
                    Premium Pass
                  </h3>
                  <p className="text-sm text-[var(--patiya-color-muted-foreground)] mt-2 font-medium tracking-wide">
                    Click to Reveal
                  </p>
                </div>
              }
              back={
                <div className="w-full h-full bg-gradient-to-br from-[var(--patiya-color-primary)] via-[var(--patiya-color-primary)] to-purple-600 rounded-[1.5rem] shadow-xl flex flex-col p-8 text-[var(--patiya-color-primary-foreground)] relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
                  <div className="relative z-10 flex justify-between items-center mb-6 pb-4 border-b border-white/20">
                    <span className="font-bold tracking-widest text-lg">
                      VIP
                    </span>
                    <span className="font-mono text-xs font-bold bg-white/20 text-white px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-md shadow-sm">
                      LIFETIME
                    </span>
                  </div>
                  <div className="relative z-10 mt-auto space-y-4">
                    <div className="space-y-1">
                      <h4 className="font-bold text-2xl tracking-tight leading-none">
                        Unlocked
                      </h4>
                      <p className="text-sm text-white/80 leading-relaxed pt-2">
                        Full access to all premium components, priority updates,
                        and exclusive templates.
                      </p>
                    </div>
                  </div>
                </div>
              }
            />
          </div>

          {/* Card 4: Tilt Card */}
          <div className="col-span-1 md:col-span-2 min-h-[350px] rounded-3xl border border-[var(--patiya-color-border)] p-8 bg-[var(--patiya-color-card)]/40 backdrop-blur-md shadow-lg flex flex-col md:flex-row items-center justify-center md:justify-around gap-8">
            <div className="flex flex-col text-center md:text-left max-w-xs">
              <h3 className="text-3xl font-bold mb-4">Physics-based Tilt</h3>
              <p className="text-[var(--patiya-color-muted-foreground)]">
                Incredible 3D tilt effects with realistic glare that follow your
                mouse.
              </p>
            </div>

            <TiltCard
              className="w-full max-w-[280px] h-[180px]"
              cardClassName="rounded-2xl bg-[var(--patiya-color-card)] shadow-xl border border-[var(--patiya-color-border)] p-5 flex flex-col justify-between text-foreground"
              tiltMaxAngleX={20}
              tiltMaxAngleY={20}
            >
              <div className="flex justify-between items-center w-full">
                <div className="w-10 h-7 rounded bg-black/10 dark:bg-white/20 backdrop-blur-md" />
                <span className="font-bold tracking-widest opacity-80 text-foreground">
                  PATIYA
                </span>
              </div>
              <div className="space-y-2 w-full text-foreground">
                <div className="font-mono text-lg tracking-[0.2em] opacity-90">
                  **** **** **** 8888
                </div>
                <div className="flex justify-between text-xs opacity-70 font-mono uppercase tracking-wider">
                  <span>Premium</span>
                  <span>12/99</span>
                </div>
              </div>
            </TiltCard>
          </div>
        </Box>

        {/* Live Dock Showcase */}
        <Box className="w-full max-w-4xl mt-5 flex flex-col items-center relative z-10">
          <h3 className="text-2xl font-bold mb-8 text-center">
            Interactive macOS Dock
          </h3>
          <Box className="px-4 py-4 rounded-[2rem] bg-background/30 dark:bg-background/10 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-sm w-max mx-auto flex items-center justify-center">
            <Dock magnification={70} distance={150}>
              <DockItem className="bg-linear-to-tr from-red-500 to-orange-500 text-white shadow-sm border border-black/10 dark:border-white/10">
                🚀
              </DockItem>
              <DockItem className="bg-gradient-to-tr from-blue-500 to-cyan-500 text-white shadow-sm border border-black/10 dark:border-white/10">
                ⚛️
              </DockItem>
              <DockItem className="bg-gradient-to-tr from-green-500 to-emerald-500 text-white shadow-sm border border-black/10 dark:border-white/10">
                🌿
              </DockItem>
              <DockItem className="bg-gradient-to-tr from-purple-500 to-pink-500 text-white shadow-sm border border-black/10 dark:border-white/10">
                🎨
              </DockItem>
              <DockItem className="bg-[var(--patiya-color-primary)] text-primary-foreground shadow-sm border border-black/10 dark:border-white/10">
                P
              </DockItem>
            </Dock>
          </Box>
        </Box>
      </main>
      <Footer />
    </Box>
  );
}
