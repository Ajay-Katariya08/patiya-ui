"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Box,
  Badge,
  Button,
  DynamicIsland,
  DynamicIslandCompact,
  DynamicIslandExpanded,
  DynamicIslandMinimal,
  DynamicIslandUltra,
  DynamicIslandLeading,
  DynamicIslandTrailing,
  DynamicIslandTitle,
  DynamicIslandDescription,
  DynamicIslandAction,
  DynamicIslandProgress,
  type DynamicIslandMode,
  OptimisticButton,
} from "patiya";
import { CodeTabs } from "../../components/CodeTabs";

export default function GettingStartedPage() {
  const [islandMode, setIslandMode] = useState<DynamicIslandMode>("compact");
  const [starred, setStarred] = useState(false);

  const motionCategories = [
    {
      name: "Biometric & Vaults",
      count: "5 blocks",
      href: "/docs/blocks/biometric-passkey-vault",
    },
    {
      name: "Agentic AI & Neural",
      count: "5 blocks",
      href: "/docs/blocks/agent-voice-orb",
    },
    {
      name: "Smart Workspaces",
      count: "9 blocks",
      href: "/docs/blocks/prompt-model-switcher",
    },
    {
      name: "Spatial Dynamic Hubs",
      count: "6 blocks",
      href: "/docs/blocks/dynamic-island-hub",
    },
    {
      name: "Tactile Surfaces",
      count: "7 blocks",
      href: "/docs/blocks/fluid-equalizer-scrubber",
    },
    {
      name: "Interactive Studios",
      count: "5 blocks",
      href: "/docs/blocks/bezier-curve-surface",
    },
    {
      name: "Toolbars & Docks",
      count: "4 blocks",
      href: "/docs/blocks/action-dock",
    },
    {
      name: "Metrics & Telemetry",
      count: "3 blocks",
      href: "/docs/blocks/telemetry-live-stream",
    },
  ];

  const v3Features = [
    {
      title: "CLI & SaaS Scaffolding",
      badge: "v3 New",
      code: "bun create patiya my-saas",
      description:
        "One-command full-stack Next.js 16 starter pre-wired with Tailwind v4, OKLCH themes, Auth, and Dashboard.",
      href: "/docs/cli",
    },
    {
      title: "Dynamic Island HUD",
      badge: "Hatke",
      code: "<DynamicIsland mode='compact' />",
      description:
        "Adaptive floating notch HUD with fluid spring transitions across 4 states for live telemetry and activity streams.",
      href: "/docs/components/dynamicIsland",
    },
    {
      title: "Generative AI Canvas",
      badge: "AI Native",
      code: "<ArtifactCanvas title='App.tsx' />",
      description:
        "Code/preview split-view canvas with version checkpoint history, export actions, and tool invocation cards.",
      href: "/docs/components/artifactCanvas",
    },
    {
      title: "OKLCH Theme Studio",
      badge: "Tokens",
      code: "export-oklch-tokens",
      description:
        "In-browser perceptual color token designer exporting instant CSS variables and Tailwind v4 configurations.",
      href: "/docs/theme-builder",
    },
    {
      title: "Headless Primitives",
      badge: "Unstyled",
      code: "import from 'patiya/primitives'",
      description:
        "Compound unstyled logic hooks for total CSS customization without Tailwind lock-in or style conflicts.",
      href: "/docs/components/form",
    },
    {
      title: "Optimistic State Engine",
      badge: "Instant UI",
      code: "<OptimisticButton onAction={save} />",
      description:
        "Immediate user feedback with automated error rollback, countdown undo window, and tactile sound chimes.",
      href: "/docs/components/optimisticAction",
    },
  ];

  return (
    <Box className="space-y-16 pb-28">
      <div className="relative overflow-hidden rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] p-8 sm:p-12 shadow-xs">
        <div className="relative space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--patiya-color-primary)] text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              v3.0.0 Production Release
            </span>
            <span className="text-xs font-mono text-[var(--patiya-color-muted-foreground)]">
              Next.js 16 Ready • 105+ Components • Tailwind v4
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--patiya-color-foreground)] leading-[1.1]">
            Build Interfaces That Feel{" "}
            <span className="text-[var(--patiya-color-primary)]">
              Decades Ahead
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[var(--patiya-color-muted-foreground)] max-w-2xl leading-relaxed">
            Patiya UI v3 blends production-grade React 19 components with
            copy-paste CLI tooling, generative AI canvases, and 120 FPS
            interactive motion blocks.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link href="/docs/cli">
              <Button
                size="lg"
                color="primary"
                className="font-medium"
              >
                Quickstart with CLI →
              </Button>
            </Link>
            <Link href="/docs/components/button">
              <Button size="lg" variant="outline" className="font-medium border-[var(--patiya-color-border)]">
                Browse 105+ Components
              </Button>
            </Link>
            <Link href="/docs/theme-builder">
              <Button size="lg" variant="ghost" className="font-medium text-[var(--patiya-color-primary)] hover:bg-[var(--patiya-color-muted)]">
                Theme Builder ⚡
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-[var(--patiya-color-foreground)] flex items-center gap-2">
              <span>Interactive Telemetry Notch</span>
              <Badge variant="soft" color="primary">
                Live Dynamic Island
              </Badge>
            </h2>
            <p className="text-sm text-[var(--patiya-color-muted-foreground)]">
              Click the modes below to preview fluid spring layout morphing:
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-full bg-[var(--patiya-color-muted)]/60 border border-[var(--patiya-color-border)] self-start sm:self-auto">
            {(
              ["minimal", "compact", "expanded", "ultra"] as DynamicIslandMode[]
            ).map((m) => (
              <button
                key={m}
                onClick={() => setIslandMode(m)}
                className={`px-3 py-1 text-xs font-semibold rounded-full capitalize transition-all cursor-pointer ${
                  islandMode === m
                    ? "bg-[var(--patiya-color-foreground)] text-[var(--patiya-color-background)] border border-[var(--patiya-color-border)]"
                    : "text-[var(--patiya-color-muted-foreground)] hover:text-[var(--patiya-color-foreground)]"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <div className="min-h-[220px] rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] p-6 flex items-center justify-center relative overflow-hidden">

          <DynamicIsland
            mode={islandMode}
            onModeChange={setIslandMode}
            interactive={false}
          >
            <DynamicIslandMinimal>
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500" />
              </span>
            </DynamicIslandMinimal>

            <DynamicIslandCompact>
              <DynamicIslandLeading pulse>
                <svg
                  className="w-4 h-4 text-emerald-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48 2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48 2.83-2.83" />
                </svg>
                <span>v3 Engine</span>
              </DynamicIslandLeading>
              <DynamicIslandTrailing>
                <span className="text-emerald-400 font-mono text-[11px]">
                  120 FPS
                </span>
              </DynamicIslandTrailing>
            </DynamicIslandCompact>

            <DynamicIslandExpanded>
              <div className="flex items-center justify-between w-full">
                <DynamicIslandLeading pulse>
                  <div className="flex flex-col text-left">
                    <DynamicIslandTitle>Patiya v3 Ecosystem</DynamicIslandTitle>
                    <DynamicIslandDescription>
                      Compiling Next.js 16 App Router bundle
                    </DynamicIslandDescription>
                  </div>
                </DynamicIslandLeading>
                <DynamicIslandTrailing>
                  <span className="text-cyan-400 font-mono text-xs">14ms</span>
                </DynamicIslandTrailing>
              </div>
              <DynamicIslandProgress value={84} />
              <div className="flex items-center justify-end gap-2 pt-1">
                <DynamicIslandAction
                  variant="ghost"
                  onClick={() => setIslandMode("compact")}
                >
                  Minimize
                </DynamicIslandAction>
                <DynamicIslandAction
                  variant="solid"
                  onClick={() => setIslandMode("ultra")}
                >
                  Expand HUD
                </DynamicIslandAction>
              </div>
            </DynamicIslandExpanded>

            <DynamicIslandUltra>
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[var(--patiya-color-primary)] flex items-center justify-center text-white">
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <DynamicIslandTitle>Live Activity HUD</DynamicIslandTitle>
                    <DynamicIslandDescription>
                      Zero Three.js overhead • OKLCH palettes
                    </DynamicIslandDescription>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  ONLINE
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono text-white/80 space-y-1 text-left">
                <div>⚡ Total Registry: 105 typed components</div>
                <div>🎨 Palette: Perceptual OKLCH tokens</div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-white/50">
                  Fluid spring physics
                </span>
                <div className="flex items-center gap-2">
                  <DynamicIslandAction
                    variant="glass"
                    onClick={() => setIslandMode("compact")}
                  >
                    Collapse
                  </DynamicIslandAction>
                  <DynamicIslandAction
                    variant="solid"
                    onClick={() => setIslandMode("minimal")}
                  >
                    Mini Dot
                  </DynamicIslandAction>
                </div>
              </div>
            </DynamicIslandUltra>
          </DynamicIsland>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-[var(--patiya-color-foreground)]">
            v3 Architecture & Innovation
          </h2>
          <p className="text-sm text-[var(--patiya-color-muted-foreground)]">
            Unrivaled developer ergonomics designed to outperform traditional
            component libraries:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {v3Features.map((feat) => (
            <Link
              key={feat.title}
              href={feat.href}
              className="group p-6 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] hover:border-[var(--patiya-color-primary)]/50 hover:bg-[var(--patiya-color-muted)]/15 hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base text-[var(--patiya-color-foreground)] group-hover:text-[var(--patiya-color-primary)] transition-colors">
                    {feat.title}
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[var(--patiya-color-primary)]/15 text-[var(--patiya-color-primary)]">
                    {feat.badge}
                  </span>
                </div>
                <p className="text-xs text-[var(--patiya-color-muted-foreground)] leading-relaxed">
                  {feat.description}
                </p>
              </div>

              <div className="pt-2">
                <code className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-[var(--patiya-color-muted)] text-[var(--patiya-color-foreground)] block truncate">
                  {feat.code}
                </code>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        <div className="border-b border-[var(--patiya-color-border)] pb-4 space-y-1">
          <h2 className="text-2xl font-bold text-[var(--patiya-color-foreground)]">
            Three Ways to Get Started
          </h2>
          <p className="text-sm text-[var(--patiya-color-muted-foreground)]">
            Pick the installation workflow that matches your project
            architecture:
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[var(--patiya-color-primary)] text-white text-xs font-bold flex items-center justify-center">
                1
              </span>
              <h3 className="text-lg font-semibold text-[var(--patiya-color-foreground)]">
                Create Full SaaS Starter (Next.js 16 + Tailwind v4)
              </h3>
            </div>
            <p className="text-sm text-[var(--patiya-color-muted-foreground)] pl-8">
              Scaffolds a turnkey SaaS application with pre-configured Auth,
              Dashboard, and Themes:
            </p>
            <div className="pl-8">
              <CodeTabs
                tabs={[
                  { name: "bun create", code: "bun create patiya my-saas" },
                  { name: "bun x", code: "bun x patiya create my-saas" },
                  { name: "npx", code: "npx create-patiya my-saas" },
                ]}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[var(--patiya-color-muted)] text-[var(--patiya-color-foreground)] text-xs font-bold flex items-center justify-center border border-[var(--patiya-color-border)]">
                2
              </span>
              <h3 className="text-lg font-semibold text-[var(--patiya-color-foreground)]">
                CLI Registry in Existing Projects (Copy-Paste)
              </h3>
            </div>
            <p className="text-sm text-[var(--patiya-color-muted-foreground)] pl-8">
              Drop typed source files directly into your components folder with
              zero dependency lock-in:
            </p>
            <div className="pl-8">
              <CodeTabs
                tabs={[
                  {
                    name: "bun",
                    code: "bun x patiya init\nbun x patiya add button card modal dynamic-island",
                  },
                  {
                    name: "npx",
                    code: "npx patiya init\nnpx patiya add button card modal dynamic-island",
                  },
                  {
                    name: "pnpm",
                    code: "pnpm dlx patiya init\npnpm dlx patiya add button card modal dynamic-island",
                  },
                ]}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[var(--patiya-color-muted)] text-[var(--patiya-color-foreground)] text-xs font-bold flex items-center justify-center border border-[var(--patiya-color-border)]">
                3
              </span>
              <h3 className="text-lg font-semibold text-[var(--patiya-color-foreground)]">
                Install as NPM Package
              </h3>
            </div>
            <p className="text-sm text-[var(--patiya-color-muted-foreground)] pl-8">
              Install the bundled package with tree-shaken ESM exports and zero
              config:
            </p>
            <div className="pl-8">
              <CodeTabs
                tabs={[
                  { name: "bun", code: "bun add patiya motion" },
                  { name: "pnpm", code: "pnpm add patiya motion" },
                  { name: "npm", code: "npm install patiya motion" },
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-[var(--patiya-color-foreground)] border-b border-[var(--patiya-color-border)] pb-3">
          Root Setup & Provider
        </h2>
        <p className="text-sm text-[var(--patiya-color-muted-foreground)] leading-relaxed">
          Wrap your root layout with{" "}
          <code className="bg-[var(--patiya-color-muted)] px-1.5 py-0.5 rounded text-xs font-mono text-[var(--patiya-color-foreground)]">
            PatiyaProvider
          </code>{" "}
          to enable dynamic light, dark, and system theme switching:
        </p>
        <CodeTabs
          tabs={[
            {
              name: "app/layout.tsx",
              code: `import { PatiyaProvider } from 'patiya';
import 'patiya/styles';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <PatiyaProvider defaultTheme="system">
          {children}
        </PatiyaProvider>
      </body>
    </html>
  );
}`,
            },
          ]}
        />
      </div>

      <div className="p-8 rounded-3xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--patiya-color-primary)] animate-pulse" />
              <h2 className="text-xl font-bold text-[var(--patiya-color-foreground)]">
                Motion Blocks Gallery (42 Interactive Blocks)
              </h2>
            </div>
            <p className="text-xs text-[var(--patiya-color-muted-foreground)]">
              Self-contained, GPU-accelerated motion surfaces powered by
              Motion.dev:
            </p>
          </div>
          <Link
            href="/docs/blocks"
            className="text-xs font-bold text-[var(--patiya-color-primary)] hover:underline inline-flex items-center gap-1 shrink-0"
          >
            <span>Browse all 42 blocks</span>
            <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {motionCategories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="p-3.5 rounded-2xl border border-[var(--patiya-color-border)]/70 bg-[var(--patiya-color-background)]/80 hover:bg-[var(--patiya-color-card)] hover:border-[var(--patiya-color-primary)]/40 hover:-translate-y-0.5 transition-all flex flex-col justify-between space-y-2"
            >
              <span className="text-xs font-semibold text-[var(--patiya-color-foreground)] truncate">
                {cat.name}
              </span>
              <span className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)]">
                {cat.count}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="p-6 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="font-bold text-sm text-[var(--patiya-color-foreground)]">
            Experience Optimistic Actions
          </div>
          <div className="text-xs text-[var(--patiya-color-muted-foreground)]">
            Test the instant rollback undo window built directly into Patiya v3:
          </div>
        </div>

        <OptimisticButton
          onAction={async () => {
            setStarred(true);
            await new Promise((r) => setTimeout(r, 600));
          }}
          optimisticText="Starred ★"
          undoTimeoutMs={4000}
          onUndo={() => setStarred(false)}
        >
          {starred ? "★ Starred" : "☆ Star on GitHub"}
        </OptimisticButton>
      </div>
    </Box>
  );
}
