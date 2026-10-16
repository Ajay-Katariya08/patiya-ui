"use client";

import Link from "next/link";
import { Box, Badge, Alert } from "patiya";
import { CodeTabs } from "../../components/CodeTabs";

export default function GettingStartedPage() {
  const installTabs = [
    { name: "bun", code: "bun add patiya motion" },
    { name: "npm", code: "npm install patiya motion" },
    { name: "pnpm", code: "pnpm add patiya motion" },
    { name: "yarn", code: "yarn add patiya motion" },
  ];

  const motionCategories = [
    { name: "Smart Workspaces", count: "9 blocks", href: "/docs/blocks/prompt-model-switcher" },
    { name: "Spatial Dynamic Hubs", count: "6 blocks", href: "/docs/blocks/dynamic-island-hub" },
    { name: "Tactile Surfaces", count: "7 blocks", href: "/docs/blocks/fluid-equalizer-scrubber" },
    { name: "Interactive Studios", count: "5 blocks", href: "/docs/blocks/bezier-curve-surface" },
    { name: "Toolbars & Docks", count: "4 blocks", href: "/docs/blocks/action-dock" },
    { name: "Metrics & Telemetry", count: "3 blocks", href: "/docs/blocks/telemetry-live-stream" },
  ];

  return (
    <Box className="max-w-3xl space-y-12 pb-24">
      <Box className="space-y-6">
        <Badge color="primary" variant="soft">Installation</Badge>
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-[var(--patiya-color-foreground)]">
          Getting Started
        </h1>
        <p className="text-xl text-[var(--patiya-color-muted-foreground)] leading-relaxed">
          Welcome to Patiya UI. A beautifully designed, accessible React component library and interactive Motion.dev block system.
        </p>
      </Box>

      <Alert variant="soft" color="info" title="Requirements">
        Patiya UI is designed for React 19+ and Next.js App Router with Tailwind CSS. Animated blocks require <code className="text-xs font-mono px-1 py-0.5 rounded bg-[var(--patiya-color-muted)]">motion</code>.
      </Alert>

      <Box className="space-y-6">
        <h2 className="text-2xl font-semibold border-b border-[var(--patiya-color-border)] pb-3">1. Install Package</h2>
        <p className="text-[var(--patiya-color-muted-foreground)]">Install Patiya UI and Motion.dev in your project.</p>
        <CodeTabs tabs={installTabs} />
      </Box>

      <Box className="space-y-6">
        <h2 className="text-2xl font-semibold border-b border-[var(--patiya-color-border)] pb-3">2. Add Provider & Styles</h2>
        <p className="text-[var(--patiya-color-muted-foreground)]">Wrap your application in the <code className="bg-[var(--patiya-color-muted)] px-1.5 py-0.5 rounded text-sm text-[var(--patiya-color-foreground)]">PatiyaProvider</code> and import the global styles in your root layout.</p>
        <CodeTabs tabs={[{ name: 'app/layout.tsx', code: `import { PatiyaProvider } from 'patiya';\nimport 'patiya/styles';\n\nexport default function RootLayout({ children }) {\n  return (\n    <html>\n      <body>\n        <PatiyaProvider defaultTheme="system">\n          {children}\n        </PatiyaProvider>\n      </body>\n    </html>\n  );\n}` }]} />
      </Box>
      
      <Box className="space-y-6">
        <h2 className="text-2xl font-semibold border-b border-[var(--patiya-color-border)] pb-3">3. Start Building</h2>
        <p className="text-[var(--patiya-color-muted-foreground)] leading-relaxed">Import components directly from <code className="text-xs font-mono px-1.5 py-0.5 rounded bg-[var(--patiya-color-muted)] text-[var(--patiya-color-foreground)]">patiya</code> or copy and paste self-contained Motion Blocks from our blocks gallery.</p>
        <CodeTabs tabs={[{ name: 'app/page.tsx', code: `import { Button } from 'patiya';\n\nexport default function Home() {\n  return (\n    <Button color="primary" variant="solid">\n      Hello Patiya UI!\n    </Button>\n  );\n}` }]} />
      </Box>

      <Box className="p-6 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--patiya-color-primary)] animate-pulse" />
            <h2 className="text-lg font-bold text-[var(--patiya-color-foreground)]">Motion Blocks</h2>
          </div>
          <Link
            href="/docs/blocks"
            className="text-xs font-semibold text-[var(--patiya-color-primary)] hover:underline inline-flex items-center gap-1"
          >
            <span>Browse all blocks</span>
            <span>→</span>
          </Link>
        </div>
        <p className="text-sm text-[var(--patiya-color-muted-foreground)] leading-relaxed">
          Production-ready, self-contained UI blocks powered by Motion.dev (<code className="text-xs font-mono px-1.5 py-0.5 rounded bg-[var(--patiya-color-muted)] text-[var(--patiya-color-foreground)]">motion/react</code>). Each block features GPU-accelerated FLIP transitions, layoutId morphing, and fluid gesture feedback with zero drop shadows.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
          {motionCategories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="p-3 rounded-xl border border-[var(--patiya-color-border)]/70 bg-[var(--patiya-color-background)]/60 hover:bg-[var(--patiya-color-card)] hover:border-[var(--patiya-color-primary)]/40 transition-colors flex flex-col justify-between"
            >
              <span className="text-xs font-semibold text-[var(--patiya-color-foreground)] truncate">{cat.name}</span>
              <span className="text-[10px] font-mono text-[var(--patiya-color-muted-foreground)] mt-1">{cat.count}</span>
            </Link>
          ))}
        </div>
      </Box>
    </Box>
  );
}
