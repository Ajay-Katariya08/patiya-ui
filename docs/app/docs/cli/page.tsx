"use client";

import { Box, Badge, Alert } from "patiya";
import { CodeTabs } from "../../../components/CodeTabs";

export default function CliDocPage() {
  return (
    <Box className="max-w-3xl space-y-12 pb-24">
      <Box className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge color="primary" variant="soft">
            v3 Feature
          </Badge>
          <span className="text-xs font-mono text-(--patiya-color-muted-foreground)">
            @patiya/cli
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight lg:text-4xl text-(--patiya-color-foreground)">
          Patiya CLI
        </h1>
        <p className="text-lg text-(--patiya-color-muted-foreground) leading-relaxed">
          The official command-line tool to initialize projects, manage registry
          tokens, and copy component source directly into your codebase.
        </p>
      </Box>

      <Alert variant="soft" color="info" title="Zero Lock-In">
        The CLI copies production-ready, typed source files directly into your
        project. You maintain full ownership and can customize every component
        without waiting for library releases.
      </Alert>

      <Box className="space-y-6">
        <h2 className="text-2xl font-semibold border-b border-(--patiya-color-border) pb-3">
          1. Create SaaS Starter (create)
        </h2>
        <p className="text-(--patiya-color-muted-foreground)">
          Scaffolds a Next.js 16+ SaaS starter app pre-wired with Tailwind v4,
          OKLCH themes, Auth, and Dashboard.
        </p>
        <CodeTabs
          tabs={[
            { name: "bun create", code: "bun create patiya my-saas" },
            { name: "bun x", code: "bun x patiya create my-saas" },
            { name: "npx", code: "npx create-patiya my-saas" },
          ]}
        />
      </Box>

      <Box className="space-y-6">
        <h2 className="text-2xl font-semibold border-b border-(--patiya-color-border) pb-3">
          2. Initialize Project (init)
        </h2>
        <p className="text-(--patiya-color-muted-foreground)">
          Configures{" "}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded bg-(--patiya-color-muted) text-(--patiya-color-foreground)">
            patiya.json
          </code>
          , installs the{" "}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded bg-[var(--patiya-color-muted)] text-[var(--patiya-color-foreground)]">
            cn
          </code>{" "}
          utility, and sets up OKLCH theme tokens.
        </p>
        <CodeTabs
          tabs={[
            { name: "bun", code: "bun x patiya init" },
            { name: "npx", code: "npx patiya init" },
            { name: "pnpm", code: "pnpm dlx patiya init" },
          ]}
        />
      </Box>

      <Box className="space-y-6">
        <h2 className="text-2xl font-semibold border-b border-[var(--patiya-color-border)] pb-3">
          3. Add Components (add)
        </h2>
        <p className="text-[var(--patiya-color-muted-foreground)]">
          Adds one or multiple components with automatic dependency resolution
          and path transformation.
        </p>
        <CodeTabs
          tabs={[
            { name: "Single component", code: "bun x patiya add button" },
            {
              name: "Multiple components",
              code: "bun x patiya add card modal drawer tooltip",
            },
            {
              name: "Overwrite existing",
              code: "bun x patiya add checkout-summary -o -y",
            },
            { name: "All core components", code: "bun x patiya add --all" },
          ]}
        />
      </Box>

      <Box className="space-y-6">
        <h2 className="text-2xl font-semibold border-b border-[var(--patiya-color-border)] pb-3">
          4. List Components (list)
        </h2>
        <p className="text-[var(--patiya-color-muted-foreground)]">
          Inspect all 100+ available components in the registry directly from
          your terminal.
        </p>
        <CodeTabs
          tabs={[
            { name: "bun", code: "bun x patiya list" },
            { name: "npx", code: "npx patiya list" },
          ]}
        />
      </Box>

      <Box className="space-y-6">
        <h2 className="text-2xl font-semibold border-b border-[var(--patiya-color-border)] pb-3">
          Configuration (patiya.json)
        </h2>
        <p className="text-[var(--patiya-color-muted-foreground)]">
          The CLI reads your aliases and styling settings from the root
          configuration file:
        </p>
        <CodeTabs
          tabs={[
            {
              name: "patiya.json",
              code: `{
  "$schema": "https://patiya-ui.vercel.app/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui"
  }
}`,
            },
          ]}
        />
      </Box>

      <Box className="space-y-4">
        <h2 className="text-2xl font-semibold border-b border-[var(--patiya-color-border)] pb-3">
          CLI Options & Flags
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border border-[var(--patiya-color-border)] rounded-xl overflow-hidden">
            <thead className="bg-[var(--patiya-color-muted)] text-[var(--patiya-color-foreground)] font-semibold">
              <tr>
                <th className="py-2.5 px-4 border-b border-[var(--patiya-color-border)]">
                  Option
                </th>
                <th className="py-2.5 px-4 border-b border-[var(--patiya-color-border)]">
                  Alias
                </th>
                <th className="py-2.5 px-4 border-b border-[var(--patiya-color-border)]">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--patiya-color-border)] font-mono text-xs">
              <tr>
                <td className="py-2 px-4 text-[var(--patiya-color-primary)]">
                  --yes
                </td>
                <td className="py-2 px-4">-y</td>
                <td className="py-2 px-4 font-sans text-xs text-[var(--patiya-color-muted-foreground)]">
                  Skip confirmation prompts and apply defaults
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-[var(--patiya-color-primary)]">
                  --overwrite
                </td>
                <td className="py-2 px-4">-o</td>
                <td className="py-2 px-4 font-sans text-xs text-[var(--patiya-color-muted-foreground)]">
                  Overwrite existing local component files
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-[var(--patiya-color-primary)]">
                  --all
                </td>
                <td className="py-2 px-4">-a</td>
                <td className="py-2 px-4 font-sans text-xs text-[var(--patiya-color-muted-foreground)]">
                  Add all core components at once
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-[var(--patiya-color-primary)]">
                  --cwd &lt;path&gt;
                </td>
                <td className="py-2 px-4">-c</td>
                <td className="py-2 px-4 font-sans text-xs text-[var(--patiya-color-muted-foreground)]">
                  Target project directory
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-[var(--patiya-color-primary)]">
                  --help
                </td>
                <td className="py-2 px-4">-h</td>
                <td className="py-2 px-4 font-sans text-xs text-[var(--patiya-color-muted-foreground)]">
                  Display command help and available flags
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Box>
    </Box>
  );
}
