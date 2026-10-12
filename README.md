<div align="center">

# 💎 Patiya UI

**Modern, accessible, and high-performance React 19 UI component library styled with Tailwind CSS.**

[![npm version](https://img.shields.io/npm/v/patiya?style=flat-square&color=8b5cf6)](https://www.npmjs.com/package/patiya)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![React 19](https://img.shields.io/badge/React-19+-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Bun](https://img.shields.io/badge/Bun-%23000000.svg?style=flat-square&logo=bun&logoColor=white)](https://bun.sh)
[![Live Demo](https://img.shields.io/badge/Live_Demo-patiya--ui.vercel.app-emerald?style=flat-square)](https://patiya-ui.vercel.app)

[Live Demo](https://patiya-ui.vercel.app) · [Documentation](https://patiya-ui.vercel.app/docs) · [Report Bug](https://github.com/Ajay-Katariya08/patiya-ui/issues) · [Request Feature](https://github.com/Ajay-Katariya08/patiya-ui/issues)

</div>

---

## ⚡ Overview

Patiya UI is a React component suite built from the ground up for modern web applications. It offers 50+ accessible primitives, rich micro-interactions, AI interface elements, visual effects, and theme management with zero configuration.

### Highlights

- ⚡ **React 19 Ready**: Built and optimized for the latest React concurrency and SSR patterns.
- 🎨 **Tailwind CSS v4 Native**: Tokenized styling engine driven by native CSS variables.
- 🌓 **Built-in Dark Mode**: System-aware theme switcher with zero flicker and local storage persistence.
- ♿ **Accessible by Design**: Keyboard navigation, screen-reader support, and ARIA compliancy.
- 🤖 **AI-Ready UI Suite**: Dedicated chat bubbles, prompt inputs, streaming text, and thinking state indicators.
- 🔮 **Motion & FX**: Magnetic triggers, spotlight cards, aurora backdrops, border beams, and tilt cards.
- 📦 **Tree-Shakeable**: Highly modular bundle with clean ESM and CJS exports.

---

## 📦 Installation

```bash
bun add patiya
```

Or using other package managers:

```bash
npm install patiya
pnpm add patiya
yarn add patiya
```

### Peer Dependencies

Ensure your project has the required peer dependencies installed:

```bash
bun add react react-dom tailwindcss
```

---

## 🚀 Quick Start

### 1. Root Provider & Styles

Wrap your root layout with `PatiyaProvider` and import the global styles:

```tsx
import { PatiyaProvider } from "patiya";
import "patiya/styles";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <PatiyaProvider defaultTheme="system">{children}</PatiyaProvider>
      </body>
    </html>
  );
}
```

### 2. Component Usage

```tsx
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
} from "patiya";

export default function App() {
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Patiya UI</CardTitle>
          <Badge variant="outline" color="primary">
            v1.1
          </Badge>
        </div>
        <CardDescription>
          Craft sleek web applications at lightning speed.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Fully typed, accessible components designed for modern production
          apps.
        </p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="ghost">Cancel</Button>
        <Button color="primary">Get Started</Button>
      </CardFooter>
    </Card>
  );
}
```

---

## 🌓 Dark Mode

Switch themes dynamically using the `useTheme` hook:

```tsx
import { useTheme, Button } from "patiya";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      Toggle {theme === "dark" ? "Light" : "Dark"}
    </Button>
  );
}
```

---

## 🧩 Component Directory

| Category                    | Components                                                                                                                                                                     |
| :-------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **General & Layout**        | `Box`, `Button`, `IconButton`, `Card`, `Badge`, `Chip`, `Divider`, `Kbd`, `Rating`, `StatusDot`, `CopyButton`                                                                  |
| **Form Inputs**             | `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`, `Switch`, `Slider`, `OTPInput`, `PasswordStrength`                                                                         |
| **Feedback & Overlays**     | `Alert`, `Progress`, `Spinner`, `Skeleton`, `Tooltip`, `Modal`, `Drawer`, `Popover`, `Toast`, `DropdownMenu`                                                                   |
| **Navigation & Disclosure** | `Tabs`, `Accordion`, `Collapse`, `Breadcrumb`, `Pagination`, `Navbar`, `Stepper`, `Timeline`, `Command`                                                                        |
| **Interactive & Motion**    | `SpotlightCard`, `TiltCard`, `FlipCard`, `Dock`, `Magnetic`, `CompareSlider`, `ScratchToReveal`, `DirectionAwareHover`, `ShimmerButton`, `Carousel`, `VideoModal`, `ImageZoom` |
| **Text Effects**            | `GradientText`, `TypingText`, `FlipText`, `BlurText`, `TypewriterText`                                                                                                         |
| **FX & Backgrounds**        | `MeteorShower`, `AuroraBackground`, `BorderBeam`, `Sparkles`, `Spotlight`                                                                                                      |
| **AI Interfaces**           | `ChatBubble`, `PromptInput`, `TypingIndicator`, `ThinkingProcess`, `PromptSuggestion`                                                                                          |
| **Auth & Security**         | `SocialLoginButton`, `UserButton`, `SecurityBadge`                                                                                                                             |
| **Data & Charts**           | `Table`, `Chart`, `RichTextEditor`, `LineChart`, `BarChart`, `AreaChart`, `PieChart`                                                                                           |

---

## 🤝 Contributing

Contributions are always welcome.

### Development Workflow

1. Fork the repository.
2. Clone your fork locally:
   ```bash
   git clone https://github.com/<YOUR_USERNAME>/patiya-ui.git
   cd patiya
   ```
3. Install dependencies:
   ```bash
   bun install
   ```
4. Start development mode:
   ```bash
   bun run dev
   ```
5. Run tests & type checks:
   ```bash
   bun run test
   bun run typecheck
   ```
6. Create a feature branch:
   ```bash
   git checkout -b feature/my-new-feature
   ```
7. Commit changes, push to your branch, and submit a Pull Request.

---

## 📜 Available Scripts

- `bun run dev` - Start Vite dev server
- `bun run build` - Compile TypeScript declarations and build production library
- `bun run typecheck` - Run static type check with `tsc`
- `bun run test` - Execute unit and accessibility tests with Vitest
- `bun run lint` - Run ESLint across source files
- `bun run format` - Format code using Prettier

---

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.
