#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const c = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  cyan: "\x1b[36m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  magenta: "\x1b[35m",
};

const PKG_VERSION = "3.0.0";
const CONFIG_FILE = "patiya.json";
const GITHUB_RAW = "https://raw.githubusercontent.com/Ajay-Katariya08/patiya-ui/main";
const DOCS_REGISTRY = "https://patiya-ui.vercel.app/r";

function log(msg) {
  process.stdout.write(msg + "\n");
}

function success(msg) {
  log(`${c.green}✔${c.reset} ${msg}`);
}

function info(msg) {
  log(`${c.cyan}ℹ${c.reset} ${msg}`);
}

function warn(msg) {
  log(`${c.yellow}⚠${c.reset} ${msg}`);
}

function error(msg) {
  log(`${c.red}✖${c.reset} ${msg}`);
}

function getPackageManager(cwd) {
  if (fs.existsSync(path.join(cwd, "bun.lock")) || fs.existsSync(path.join(cwd, "bun.lockb"))) return "bun";
  if (fs.existsSync(path.join(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (fs.existsSync(path.join(cwd, "yarn.lock"))) return "yarn";
  if (fs.existsSync(path.join(cwd, "package-lock.json"))) return "npm";
  const userAgent = process.env.npm_config_user_agent;
  if (userAgent?.startsWith("bun")) return "bun";
  if (userAgent?.startsWith("pnpm")) return "pnpm";
  if (userAgent?.startsWith("yarn")) return "yarn";
  return "bun";
}

function getInstallCommand(pm, deps, isDev = false) {
  if (pm === "bun") return ["bun", "add", ...(isDev ? ["-d"] : []), ...deps];
  if (pm === "pnpm") return ["pnpm", "add", ...(isDev ? ["-D"] : []), ...deps];
  if (pm === "yarn") return ["yarn", "add", ...(isDev ? ["-D"] : []), ...deps];
  return ["npm", "install", ...(isDev ? ["--save-dev"] : []), ...deps];
}

function loadConfig(cwd) {
  const p = path.join(cwd, CONFIG_FILE);
  if (fs.existsSync(p)) {
    try {
      return JSON.parse(fs.readFileSync(p, "utf8"));
    } catch {
      return null;
    }
  }
  const alt = path.join(cwd, "components.json");
  if (fs.existsSync(alt)) {
    try {
      const data = JSON.parse(fs.readFileSync(alt, "utf8"));
      return {
        style: data.style || "default",
        rsc: data.rsc ?? true,
        tsx: data.tsx ?? true,
        tailwind: {
          config: data.tailwind?.config || "",
          css: data.tailwind?.css || "app/globals.css",
          baseColor: data.tailwind?.baseColor || "neutral",
          cssVariables: data.tailwind?.cssVariables ?? true,
        },
        aliases: {
          components: data.aliases?.components || "@/components",
          utils: data.aliases?.utils || "@/lib/utils",
          ui: data.aliases?.ui || "@/components/ui",
        },
      };
    } catch {
      return null;
    }
  }
  return null;
}

function resolvePathAlias(cwd, alias) {
  if (alias.startsWith("@/")) {
    const hasSrc = fs.existsSync(path.join(cwd, "src"));
    return path.join(cwd, hasSrc ? "src" : ".", alias.slice(2));
  }
  if (alias.startsWith("~/")) {
    const hasSrc = fs.existsSync(path.join(cwd, "src"));
    return path.join(cwd, hasSrc ? "src" : ".", alias.slice(2));
  }
  return path.join(cwd, alias);
}

function detectCssPath(cwd) {
  const candidates = [
    "app/globals.css",
    "src/app/globals.css",
    "src/index.css",
    "src/main.css",
    "styles/globals.css",
    "src/styles/globals.css",
  ];
  for (const cPath of candidates) {
    if (fs.existsSync(path.join(cwd, cPath))) return cPath;
  }
  return "app/globals.css";
}

const COMMON_TYPES_CONTENT = `export type PatiyaSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type PatiyaVariant = 'solid' | 'outline' | 'ghost' | 'soft' | 'link';
export type PatiyaColor = 'primary' | 'secondary' | 'accent' | 'destructive' | 'success' | 'warning' | 'info' | 'muted';
export type PatiyaRadius = 'none' | 'sm' | 'md' | 'lg' | 'full';
export type PatiyaTheme = 'light' | 'dark' | 'system';
export type PatiyaResolvedTheme = 'light' | 'dark';
`;

const POLYMORPHIC_UTILS_CONTENT = `import React from 'react';

export type AsProp<T extends React.ElementType> = {
  as?: T;
};

export type PolymorphicComponentProps<
  T extends React.ElementType,
  P = Record<string, unknown>
> = React.PropsWithChildren<P & AsProp<T>> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof (P & AsProp<T>)>;

export type PolymorphicComponent<
  DefaultType extends React.ElementType,
  P = Record<string, unknown>
> = <T extends React.ElementType = DefaultType>(
  props: PolymorphicComponentProps<T, P>
) => React.ReactElement | null;
`;

const UTILS_CN_CONTENT = `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`;

const THEME_CSS_TOKENS = `@layer base {
  :root {
    --patiya-color-primary: oklch(0.55 0.2 260);
    --patiya-color-primary-hover: oklch(0.48 0.22 260);
    --patiya-color-primary-active: oklch(0.42 0.24 260);
    --patiya-color-primary-foreground: oklch(0.98 0 0);
    --patiya-color-secondary: oklch(0.65 0.05 270);
    --patiya-color-accent: oklch(0.7 0.18 160);
    --patiya-color-destructive: oklch(0.55 0.22 25);
    --patiya-color-success: oklch(0.6 0.19 145);
    --patiya-color-warning: oklch(0.75 0.15 75);
    --patiya-color-info: oklch(0.6 0.15 240);
    --patiya-color-muted: oklch(0.96 0.005 260);
    --patiya-color-muted-foreground: oklch(0.48 0.02 260);
    --patiya-color-background: oklch(0.99 0 0);
    --patiya-color-foreground: oklch(0.15 0.02 260);
    --patiya-color-card: oklch(1 0 0);
    --patiya-color-card-foreground: oklch(0.15 0.02 260);
    --patiya-color-border: oklch(0.91 0.008 260);
    --patiya-color-ring: oklch(0.55 0.2 260);
    --patiya-radius-sm: 0.25rem;
    --patiya-radius-md: 0.375rem;
    --patiya-radius-lg: 0.5rem;
    --patiya-radius-xl: 0.75rem;
  }

  [data-theme="dark"],
  .dark {
    --patiya-color-background: oklch(0.15 0.02 260);
    --patiya-color-foreground: oklch(0.93 0.01 260);
    --patiya-color-card: oklch(0.2 0.02 260);
    --patiya-color-card-foreground: oklch(0.93 0.01 260);
    --patiya-color-border: oklch(0.28 0.015 260);
    --patiya-color-muted: oklch(0.24 0.015 260);
    --patiya-color-muted-foreground: oklch(0.72 0.015 260);
  }
}
`;

function transformImports(content, config) {
  let res = content;
  res = res.replace(/from\s+['"][./]+utils\/cn['"]/g, `from "${config.aliases.utils}"`);
  res = res.replace(/from\s+['"][./]+types\/common['"]/g, `from "${config.aliases.ui}/types"`);
  res = res.replace(/from\s+['"][./]+utils\/polymorphic['"]/g, `from "${config.aliases.ui}/polymorphic"`);
  res = res.replace(/from\s+['"][./]+Layout\/Box['"]/g, `from "${config.aliases.ui}/box"`);
  res = res.replace(/from\s+['"][./]+Spinner\/Spinner['"]/g, `from "${config.aliases.ui}/spinner"`);
  res = res.replace(/from\s+['"][./]+Button\/Button['"]/g, `from "${config.aliases.ui}/button"`);
  res = res.replace(/from\s+['"][./]+Badge\/Badge['"]/g, `from "${config.aliases.ui}/badge"`);
  res = res.replace(/from\s+['"][./]+Input\/Input['"]/g, `from "${config.aliases.ui}/input"`);
  res = res.replace(/from\s+['"][./]+Card\/Card['"]/g, `from "${config.aliases.ui}/card"`);
  res = res.replace(/from\s+['"][./]+([A-Za-z0-9_-]+)\/\1['"]/g, (_m, p1) => {
    return `from "${config.aliases.ui}/${toKebabCase(p1)}"`;
  });
  return res;
}

function toKebabCase(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

function toPascalCase(str) {
  return str.replace(/(^\w|-\w)/g, (s) => s.replace("-", "").toUpperCase());
}

async function fetchRegistryItem(name) {
  const localRegistryPath = path.join(__dirname, "registry.json");
  if (fs.existsSync(localRegistryPath)) {
    try {
      const data = JSON.parse(fs.readFileSync(localRegistryPath, "utf8"));
      const found = data.items?.find(
        (i) => i.name.toLowerCase() === name.toLowerCase() || toKebabCase(i.name) === toKebabCase(name)
      );
      if (found) return found;
    } catch {}
  }

  const rootComponentDir = path.resolve(__dirname, "../src/components");
  if (fs.existsSync(rootComponentDir)) {
    const directDir = path.join(rootComponentDir, toPascalCase(name));
    if (fs.existsSync(directDir)) {
      const files = fs.readdirSync(directDir).filter((f) => f.endsWith(".tsx") || f.endsWith(".ts"));
      const componentFiles = files.map((f) => ({
        name: f,
        content: fs.readFileSync(path.join(directDir, f), "utf8"),
      }));
      return {
        name: toKebabCase(name),
        files: componentFiles,
        dependencies: [],
        registryDependencies: [],
      };
    }
  }

  const urls = [
    `${DOCS_REGISTRY}/${toKebabCase(name)}.json`,
    `${GITHUB_RAW}/registry/${toKebabCase(name)}.json`,
  ];

  for (const url of urls) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        return await res.json();
      }
    } catch {}
  }

  return null;
}

async function commandInit(args, flags) {
  const cwd = flags.cwd || process.cwd();
  log(`\n${c.bold}${c.cyan}Patiya UI${c.reset} ${c.dim}v${PKG_VERSION}${c.reset}\n`);
  info("Initializing Patiya UI configuration...");

  const pkgJsonPath = path.join(cwd, "package.json");
  if (!fs.existsSync(pkgJsonPath)) {
    error("No package.json found. Run this inside a project root.");
    process.exit(1);
  }

  const existingConfig = loadConfig(cwd);
  if (existingConfig && !flags.overwrite && !flags.yes && !flags.y) {
    warn(`Found existing configuration at ${CONFIG_FILE}. Use -o to overwrite.`);
    return;
  }

  const cssPath = detectCssPath(cwd);
  const config = {
    $schema: "https://patiya-ui.vercel.app/schema.json",
    style: "default",
    rsc: true,
    tsx: true,
    tailwind: {
      config: "",
      css: cssPath,
      baseColor: "neutral",
      cssVariables: true,
    },
    aliases: {
      components: "@/components",
      utils: "@/lib/utils",
      ui: "@/components/ui",
    },
  };

  fs.writeFileSync(path.join(cwd, CONFIG_FILE), JSON.stringify(config, null, 2) + "\n", "utf8");
  success(`Created ${CONFIG_FILE}`);

  const utilsDir = resolvePathAlias(cwd, "@/lib");
  if (!fs.existsSync(utilsDir)) fs.mkdirSync(utilsDir, { recursive: true });
  const utilsPath = path.join(utilsDir, "utils.ts");
  if (!fs.existsSync(utilsPath) || flags.overwrite) {
    fs.writeFileSync(utilsPath, UTILS_CN_CONTENT, "utf8");
    success("Created lib/utils.ts (cn helper)");
  }

  const uiDir = resolvePathAlias(cwd, config.aliases.ui);
  if (!fs.existsSync(uiDir)) fs.mkdirSync(uiDir, { recursive: true });

  const typesPath = path.join(uiDir, "types.ts");
  if (!fs.existsSync(typesPath) || flags.overwrite) {
    fs.writeFileSync(typesPath, COMMON_TYPES_CONTENT, "utf8");
    success("Created UI common types");
  }

  const polymorphicPath = path.join(uiDir, "polymorphic.ts");
  if (!fs.existsSync(polymorphicPath) || flags.overwrite) {
    fs.writeFileSync(polymorphicPath, POLYMORPHIC_UTILS_CONTENT, "utf8");
    success("Created polymorphic component types");
  }

  const fullCssPath = path.join(cwd, cssPath);
  if (fs.existsSync(fullCssPath)) {
    const currentCss = fs.readFileSync(fullCssPath, "utf8");
    if (!currentCss.includes("--patiya-color-primary")) {
      fs.appendFileSync(fullCssPath, "\n" + THEME_CSS_TOKENS, "utf8");
      success(`Added Patiya OKLCH color tokens to ${cssPath}`);
    }
  }

  const pm = getPackageManager(cwd);
  const pkgData = JSON.parse(fs.readFileSync(pkgJsonPath, "utf8"));
  const allDeps = { ...(pkgData.dependencies || {}), ...(pkgData.devDependencies || {}) };
  const neededDeps = [];

  if (!allDeps["clsx"]) neededDeps.push("clsx");
  if (!allDeps["tailwind-merge"]) neededDeps.push("tailwind-merge");

  if (neededDeps.length > 0) {
    info(`Installing required dependencies: ${neededDeps.join(", ")}...`);
    const cmd = getInstallCommand(pm, neededDeps);
    spawnSync(cmd[0], cmd.slice(1), { cwd, stdio: "inherit" });
    success("Dependencies installed.");
  }

  log(`\n${c.green}✔ Initialization complete!${c.reset} You can now add components:`);
  log(`  ${c.cyan}bun x patiya add button card modal${c.reset}\n`);
}

async function commandAdd(args, flags) {
  const cwd = flags.cwd || process.cwd();
  log(`\n${c.bold}${c.cyan}Patiya UI${c.reset} ${c.dim}v${PKG_VERSION}${c.reset}\n`);

  let config = loadConfig(cwd);
  if (!config) {
    warn(`No ${CONFIG_FILE} found. Initializing project first...`);
    await commandInit([], { ...flags, yes: true });
    config = loadConfig(cwd);
  }

  if (args.length === 0 && !flags.all) {
    error("Please specify one or more components to add.");
    log(`Example: ${c.cyan}bun x patiya add button card input${c.reset}`);
    process.exit(1);
  }

  const uiDir = resolvePathAlias(cwd, config.aliases.ui);
  if (!fs.existsSync(uiDir)) fs.mkdirSync(uiDir, { recursive: true });

  const requested = flags.all ? ["button", "card", "input", "modal", "badge", "dialog"] : args;
  const queue = [...requested];
  const processed = new Set();
  const externalDepsToInstall = new Set();

  while (queue.length > 0) {
    const rawName = queue.shift();
    const name = toKebabCase(rawName);
    if (processed.has(name)) continue;
    processed.add(name);

    info(`Resolving component: ${c.bold}${name}${c.reset}...`);
    const item = await fetchRegistryItem(name);

    if (!item) {
      error(`Component "${name}" was not found in registry.`);
      continue;
    }

    if (item.dependencies) {
      for (const d of item.dependencies) externalDepsToInstall.add(d);
    }

    if (item.registryDependencies) {
      for (const rd of item.registryDependencies) {
        if (!processed.has(toKebabCase(rd))) queue.push(rd);
      }
    }

    for (const file of item.files || []) {
      const fileName = file.name.endsWith(".tsx") || file.name.endsWith(".ts")
        ? file.name
        : `${file.name}.tsx`;
      const targetFilePath = path.join(uiDir, fileName);

      if (fs.existsSync(targetFilePath) && !flags.overwrite && !flags.o && !flags.yes && !flags.y) {
        warn(`Skipped ${fileName} (file already exists. Use -o to overwrite).`);
        continue;
      }

      const transformed = transformImports(file.content, config);
      fs.writeFileSync(targetFilePath, transformed, "utf8");
      success(`Installed ${c.bold}${fileName}${c.reset} in ${config.aliases.ui}/${fileName}`);
    }
  }

  if (externalDepsToInstall.size > 0) {
    const pm = getPackageManager(cwd);
    const pkgJsonPath = path.join(cwd, "package.json");
    const pkgData = fs.existsSync(pkgJsonPath) ? JSON.parse(fs.readFileSync(pkgJsonPath, "utf8")) : {};
    const allDeps = { ...(pkgData.dependencies || {}), ...(pkgData.devDependencies || {}) };

    const missing = Array.from(externalDepsToInstall).filter((d) => !allDeps[d]);
    if (missing.length > 0) {
      info(`Installing required packages: ${missing.join(", ")}...`);
      const cmd = getInstallCommand(pm, missing);
      spawnSync(cmd[0], cmd.slice(1), { cwd, stdio: "inherit" });
      success("Packages installed successfully.");
    }
  }

  log(`\n${c.green}✔ All requested components installed.${c.reset}\n`);
}

async function commandList() {
  log(`\n${c.bold}${c.cyan}Patiya UI Registry${c.reset} ${c.dim}(100+ components available)${c.reset}\n`);
  const rootComponentDir = path.resolve(__dirname, "../src/components");

  let components = [];
  if (fs.existsSync(rootComponentDir)) {
    components = fs.readdirSync(rootComponentDir).filter((f) => {
      return fs.statSync(path.join(rootComponentDir, f)).isDirectory();
    });
  } else {
    const localReg = path.join(__dirname, "registry.json");
    if (fs.existsSync(localReg)) {
      try {
        const d = JSON.parse(fs.readFileSync(localReg, "utf8"));
        components = d.items?.map((i) => i.name) || [];
      } catch {}
    }
  }

  if (components.length === 0) {
    components = [
      "Button", "Input", "Card", "Modal", "Drawer", "Badge", "Switch", "Checkbox",
      "Radio", "Select", "Slider", "Progress", "Skeleton", "Spinner", "Tooltip",
      "Popover", "DropdownMenu", "Tabs", "Accordion", "Table", "Timeline", "Stepper",
      "Stat", "DataList", "TreeView", "Command", "Dock", "SpotlightCard", "TiltCard",
      "ShimmerButton", "GradientText", "TypingText", "VoiceVisualizer", "PromptInput",
      "ChatBubble", "PricingTable", "ProductCard", "CartDrawer", "QuantitySelector",
      "CheckoutSummary", "FilterPanel", "OrderTracker", "DynamicIsland", "OptimisticAction"
    ];
  }

  components.sort();
  for (let i = 0; i < components.length; i += 3) {
    const c1 = components[i]?.padEnd(24) || "";
    const c2 = components[i + 1]?.padEnd(24) || "";
    const c3 = components[i + 2] || "";
    log(`  ${c.cyan}${c1}${c.reset} ${c.cyan}${c2}${c.reset} ${c.cyan}${c3}${c.reset}`);
  }

  log(`\nAdd any component via: ${c.bold}bun x patiya add <name>${c.reset}\n`);
}

async function commandCreate(args, flags) {
  const baseCwd = flags.cwd || process.cwd();
  const projectName = args[0] || "patiya-saas";
  const projectDir = path.resolve(baseCwd, projectName);

  log(`\n${c.bold}${c.cyan}Patiya UI${c.reset} ${c.dim}v${PKG_VERSION}${c.reset}\n`);
  info(`Scaffolding full SaaS starter in ${c.bold}${projectName}${c.reset}...`);

  if (fs.existsSync(projectDir)) {
    const files = fs.readdirSync(projectDir);
    if (files.length > 0 && !flags.overwrite && !flags.o) {
      error(`Directory "${projectName}" already exists and is not empty. Use -o to overwrite.`);
      process.exit(1);
    }
  } else {
    fs.mkdirSync(projectDir, { recursive: true });
  }

  const pkgJson = {
    name: projectName,
    version: "0.1.0",
    private: true,
    scripts: {
      dev: "next dev",
      build: "next build",
      start: "next start"
    },
    dependencies: {
      next: "^16.0.0",
      react: "^19.0.0",
      "react-dom": "^19.0.0",
      patiya: `^${PKG_VERSION}`,
      motion: "^12.4.7",
      "lucide-react": "^1.16.0",
      clsx: "^2.1.1",
      "tailwind-merge": "^3.0.2"
    },
    devDependencies: {
      typescript: "^5.7.3",
      "@types/node": "^22.13.4",
      "@types/react": "^19.0.10",
      "@types/react-dom": "^19.0.4",
      tailwindcss: "^4.0.6",
      "@tailwindcss/postcss": "^4.0.6"
    }
  };
  fs.writeFileSync(path.join(projectDir, "package.json"), JSON.stringify(pkgJson, null, 2) + "\n", "utf8");

  const tsConfig = {
    compilerOptions: {
      target: "ES2022",
      lib: ["dom", "dom.iterable", "esnext"],
      allowJs: true,
      skipLibCheck: true,
      strict: true,
      noEmit: true,
      esModuleInterop: true,
      module: "esnext",
      moduleResolution: "bundler",
      resolveJsonModule: true,
      isolatedModules: true,
      jsx: "preserve",
      incremental: true,
      plugins: [{ name: "next" }],
      paths: {
        "@/*": ["./*"]
      }
    },
    include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
    exclude: ["node_modules"]
  };
  fs.writeFileSync(path.join(projectDir, "tsconfig.json"), JSON.stringify(tsConfig, null, 2) + "\n", "utf8");

  fs.writeFileSync(
    path.join(projectDir, "next.config.ts"),
    `import type { NextConfig } from "next";\n\nconst nextConfig: NextConfig = {};\n\nexport default nextConfig;\n`,
    "utf8"
  );

  fs.writeFileSync(
    path.join(projectDir, "postcss.config.mjs"),
    `export default {\n  plugins: {\n    "@tailwindcss/postcss": {},\n  },\n};\n`,
    "utf8"
  );

  const patiyaConfig = {
    $schema: "https://patiya-ui.vercel.app/schema.json",
    style: "default",
    rsc: true,
    tsx: true,
    tailwind: {
      config: "",
      css: "app/globals.css",
      baseColor: "neutral",
      cssVariables: true
    },
    aliases: {
      components: "@/components",
      utils: "@/lib/utils",
      ui: "@/components/ui"
    }
  };
  fs.writeFileSync(path.join(projectDir, CONFIG_FILE), JSON.stringify(patiyaConfig, null, 2) + "\n", "utf8");

  const libDir = path.join(projectDir, "lib");
  fs.mkdirSync(libDir, { recursive: true });
  fs.writeFileSync(path.join(libDir, "utils.ts"), UTILS_CN_CONTENT, "utf8");

  const appDir = path.join(projectDir, "app");
  fs.mkdirSync(appDir, { recursive: true });

  fs.writeFileSync(
    path.join(appDir, "globals.css"),
    `@import "tailwindcss";\n\n${THEME_CSS_TOKENS}\nbody {\n  background-color: var(--patiya-color-background);\n  color: var(--patiya-color-foreground);\n  min-height: 100vh;\n}\n`,
    "utf8"
  );

  fs.writeFileSync(
    path.join(appDir, "layout.tsx"),
    `import "./globals.css";\nimport { PatiyaProvider } from "patiya";\n\nexport const metadata = {\n  title: "${projectName} - Built with Patiya UI",\n  description: "Production SaaS application built with Patiya UI and Next.js",\n};\n\nexport default function RootLayout({ children }: { children: React.ReactNode }) {\n  return (\n    <html lang="en" suppressHydrationWarning>\n      <body>\n        <PatiyaProvider defaultTheme="system">\n          {children}\n        </PatiyaProvider>\n      </body>\n    </html>\n  );\n}\n`,
    "utf8"
  );

  fs.writeFileSync(
    path.join(appDir, "page.tsx"),
    `import Link from "next/link";\nimport { Button, Badge, Stat, StatLabel, StatValue, StatTrend } from "patiya";\n\nexport default function HomePage() {\n  return (\n    <div className="flex flex-col min-h-screen">\n      <header className="h-16 border-b border-[var(--patiya-color-border)] px-6 flex items-center justify-between sticky top-0 bg-[var(--patiya-color-background)]/80 backdrop-blur-md z-40">\n        <div className="font-bold text-lg tracking-tight">${projectName}</div>\n        <div className="flex items-center gap-3">\n          <Link href="/login">\n            <Button variant="ghost" size="sm">Sign In</Button>\n          </Link>\n          <Link href="/dashboard">\n            <Button variant="solid" size="sm">Dashboard</Button>\n          </Link>\n        </div>\n      </header>\n\n      <main className="flex-1 max-w-5xl mx-auto px-6 py-20 space-y-16 text-center">\n        <div className="space-y-4 max-w-2xl mx-auto">\n          <Badge color="primary" variant="soft">v3 SaaS Starter</Badge>\n          <h1 className="text-5xl font-black tracking-tight">\n            Ship Modern SaaS Interfaces Faster\n          </h1>\n          <p className="text-lg text-[var(--patiya-color-muted-foreground)] leading-relaxed">\n            Powered by Patiya UI v3, Next.js 16, and Tailwind CSS v4.\n          </p>\n          <div className="flex items-center justify-center gap-3 pt-4">\n            <Link href="/dashboard">\n              <Button size="lg" color="primary">Open Dashboard →</Button>\n            </Link>\n            <Link href="/login">\n              <Button size="lg" variant="outline">Sign In</Button>\n            </Link>\n          </div>\n        </div>\n\n        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">\n          <Stat variant="card">\n            <StatLabel>Monthly Recurring</StatLabel>\n            <StatValue prefix="$">38,420</StatValue>\n            <StatTrend direction="up">+18.4% vs last month</StatTrend>\n          </Stat>\n          <Stat variant="card">\n            <StatLabel>Active Organizations</StatLabel>\n            <StatValue>1,248</StatValue>\n            <StatTrend direction="up">+92 this week</StatTrend>\n          </Stat>\n          <Stat variant="card">\n            <StatLabel>System Availability</StatLabel>\n            <StatValue suffix="%">99.99</StatValue>\n            <StatTrend direction="neutral">Zero incident reports</StatTrend>\n          </Stat>\n        </div>\n      </main>\n    </div>\n  );\n}\n`,
    "utf8"
  );

  const dashboardDir = path.join(appDir, "dashboard");
  fs.mkdirSync(dashboardDir, { recursive: true });
  fs.writeFileSync(
    path.join(dashboardDir, "page.tsx"),
    `import Link from "next/link";\nimport { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Stat, StatLabel, StatValue, StatTrend, DataList, DataListItem, DataListLabel, DataListValue, Badge } from "patiya";\n\nexport default function DashboardPage() {\n  return (\n    <div className="min-h-screen bg-[var(--patiya-color-background)]">\n      <header className="h-16 border-b border-[var(--patiya-color-border)] px-6 flex items-center justify-between">\n        <div className="flex items-center gap-4">\n          <Link href="/" className="font-bold text-lg">${projectName}</Link>\n          <Badge variant="soft">Dashboard</Badge>\n        </div>\n        <Link href="/">\n          <Button variant="outline" size="sm">Exit</Button>\n        </Link>\n      </header>\n      <main className="max-w-6xl mx-auto p-6 md:p-10 space-y-8">\n        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">\n          <Stat variant="card">\n            <StatLabel>API Requests (24h)</StatLabel>\n            <StatValue>2.4M</StatValue>\n            <StatTrend direction="up">+14.2%</StatTrend>\n          </Stat>\n          <Stat variant="card">\n            <StatLabel>P95 Latency</StatLabel>\n            <StatValue suffix="ms">18</StatValue>\n            <StatTrend direction="up">Optimal</StatTrend>\n          </Stat>\n          <Stat variant="card">\n            <StatLabel>Success Rate</StatLabel>\n            <StatValue suffix="%">99.98</StatValue>\n            <StatTrend direction="neutral">Operational</StatTrend>\n          </Stat>\n        </div>\n        <Card>\n          <CardHeader>\n            <CardTitle>Organization Overview</CardTitle>\n            <CardDescription>Primary workspace configuration & metadata</CardDescription>\n          </CardHeader>\n          <CardContent>\n            <DataList variant="divided">\n              <DataListItem>\n                <DataListLabel>Cluster ID</DataListLabel>\n                <DataListValue copyable>cls_us_east_9942a</DataListValue>\n              </DataListItem>\n              <DataListItem>\n                <DataListLabel>Billing Tier</DataListLabel>\n                <DataListValue>Enterprise Dedicated</DataListValue>\n              </DataListItem>\n              <DataListItem>\n                <DataListLabel>Gateway Status</DataListLabel>\n                <DataListValue>Operational (Edge CDN enabled)</DataListValue>\n              </DataListItem>\n            </DataList>\n          </CardContent>\n        </Card>\n      </main>\n    </div>\n  );\n}\n`,
    "utf8"
  );

  const loginDir = path.join(appDir, "login");
  fs.mkdirSync(loginDir, { recursive: true });
  fs.writeFileSync(
    path.join(loginDir, "page.tsx"),
    `"use client";\nimport Link from "next/link";\nimport { useState } from "react";\nimport { Button, Input, Card, CardHeader, CardTitle, CardDescription, CardContent, Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "patiya";\n\nexport default function LoginPage() {\n  const [email, setEmail] = useState("");\n  const [submitted, setSubmitted] = useState(false);\n  const error = submitted && !email.includes("@") ? "Please enter a valid email address." : undefined;\n\n  return (\n    <div className="min-h-screen flex items-center justify-center p-6 bg-[var(--patiya-color-background)]">\n      <Card className="w-full max-w-sm">\n        <CardHeader className="text-center space-y-1">\n          <CardTitle className="text-2xl">Welcome back</CardTitle>\n          <CardDescription>Enter your email to sign in</CardDescription>\n        </CardHeader>\n        <CardContent>\n          <Form\n            onSubmit={(e) => {\n              e.preventDefault();\n              setSubmitted(true);\n            }}\n            className="space-y-4"\n          >\n            <FormField name="email" error={error}>\n              <FormItem>\n                <FormLabel>Email</FormLabel>\n                <FormControl>\n                  <Input\n                    type="email"\n                    placeholder="name@example.com"\n                    value={email}\n                    onChange={(e) => setEmail(e.target.value)}\n                  />\n                </FormControl>\n                <FormMessage />\n              </FormItem>\n            </FormField>\n            <Button type="submit" className="w-full" color="primary">Continue with Email</Button>\n            <div className="text-center pt-2">\n              <Link href="/" className="text-xs text-[var(--patiya-color-muted-foreground)] hover:underline">\n                ← Back to home\n              </Link>\n            </div>\n          </Form>\n        </CardContent>\n      </Card>\n    </div>\n  );\n}\n`,
    "utf8"
  );

  fs.writeFileSync(
    path.join(projectDir, "README.md"),
    `# ${projectName}\n\nBuilt with [Patiya UI v3](https://patiya-ui.vercel.app).\n\n## Getting Started\n\n\`\`\`bash\nbun run dev\n\`\`\`\n\n## Adding Components\n\n\`\`\`bash\nbun x patiya add button card modal\n\`\`\`\n`,
    "utf8"
  );

  success(`Generated project template files in ${projectName}`);

  const pm = getPackageManager(baseCwd);
  if (!flags["no-install"]) {
    info(`Installing dependencies using ${pm}...`);
    const installArgs = pm === "bun" ? ["install"] : pm === "pnpm" ? ["install"] : ["install"];
    spawnSync(pm, installArgs, { cwd: projectDir, stdio: "inherit" });
    success("Dependencies installed.");
  }

  log(`\n${c.green}✔ Successfully created ${projectName}!${c.reset}\n`);
  log(`Next steps:`);
  log(`  ${c.cyan}cd ${projectName}${c.reset}`);
  log(`  ${c.cyan}${pm} run dev${c.reset}\n`);
}

function printHelp() {
  log(`\n${c.bold}${c.cyan}patiya${c.reset} - Official CLI for Patiya UI v3\n`);
  log(`${c.bold}USAGE${c.reset}`);
  log(`  $ bun create patiya [name] [options]`);
  log(`  $ bun x patiya <command> [options]\n`);
  log(`${c.bold}COMMANDS${c.reset}`);
  log(`  ${c.green}create [name]${c.reset}        Scaffold a complete Next.js SaaS starter`);
  log(`  ${c.green}init${c.reset}                 Configure your project and install core utilities`);
  log(`  ${c.green}add [components]${c.reset}     Add component(s) directly into your codebase`);
  log(`  ${c.green}list${c.reset}                 List all available components in the registry\n`);
  log(`${c.bold}OPTIONS${c.reset}`);
  log(`  ${c.yellow}-y, --yes${c.reset}            Skip confirmation prompts and accept defaults`);
  log(`  ${c.yellow}-o, --overwrite${c.reset}      Overwrite existing component files`);
  log(`  ${c.yellow}-a, --all${c.reset}            Add all core components`);
  log(`  ${c.yellow}--no-install${c.reset}         Skip automatic package dependency installation`);
  log(`  ${c.yellow}-c, --cwd <path>${c.reset}     Working directory (defaults to current directory)`);
  log(`  ${c.yellow}-v, --version${c.reset}        Display version`);
  log(`  ${c.yellow}-h, --help${c.reset}           Display this help message\n`);
  log(`${c.bold}EXAMPLES${c.reset}`);
  log(`  $ bun create patiya my-saas`);
  log(`  $ bun x patiya create my-saas`);
  log(`  $ bun x patiya init`);
  log(`  $ bun x patiya add button card modal\n`);
}

async function main() {
  const argv = process.argv.slice(2);
  const scriptName = path.basename(process.argv[1] || "");
  const isCreateDirect = scriptName.includes("create-patiya");

  let command = argv[0];
  let rawArgs = argv.slice(1);

  if (isCreateDirect && command !== "create" && command !== "--help" && command !== "-h") {
    rawArgs = argv;
    command = "create";
  }

  const flags = {};
  const args = [];

  for (let i = 0; i < rawArgs.length; i++) {
    const arg = rawArgs[i];
    if (arg === "-y" || arg === "--yes") flags.yes = true;
    else if (arg === "-o" || arg === "--overwrite") flags.overwrite = true;
    else if (arg === "-a" || arg === "--all") flags.all = true;
    else if (arg === "-h" || arg === "--help") flags.help = true;
    else if (arg === "-v" || arg === "--version") flags.version = true;
    else if (arg === "--no-install") flags["no-install"] = true;
    else if (arg === "-c" || arg === "--cwd") {
      flags.cwd = rawArgs[++i];
    } else if (arg.startsWith("--cwd=")) {
      flags.cwd = arg.split("=")[1];
    } else if (!arg.startsWith("-")) {
      args.push(arg);
    }
  }

  if (flags.version || command === "-v" || command === "--version") {
    log(PKG_VERSION);
    process.exit(0);
  }

  if (flags.help || !command || command === "-h" || command === "--help") {
    printHelp();
    process.exit(0);
  }

  switch (command) {
    case "create":
      await commandCreate(args, flags);
      break;
    case "init":
      await commandInit(args, flags);
      break;
    case "add":
      await commandAdd(args, flags);
      break;
    case "list":
    case "ls":
      await commandList();
      break;
    default:
      error(`Unknown command "${command}".`);
      printHelp();
      process.exit(1);
  }
}

main().catch((err) => {
  error(err?.message || "An unexpected error occurred.");
  process.exit(1);
});
