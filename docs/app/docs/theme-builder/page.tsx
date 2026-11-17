"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Input,
  Badge,
  Switch,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Stat,
  StatLabel,
  StatValue,
  StatTrend,
  Slider,
} from "patiya";

export type Preset = {
  name: string;
  hue: number;
  chroma: number;
  lightness: number;
};

const PRESETS: Preset[] = [
  { name: "Violet (Default)", hue: 260, chroma: 0.2, lightness: 0.55 },
  { name: "Cyberpunk", hue: 195, chroma: 0.22, lightness: 0.65 },
  { name: "Emerald", hue: 145, chroma: 0.19, lightness: 0.6 },
  { name: "Sunset", hue: 45, chroma: 0.2, lightness: 0.65 },
  { name: "Midnight", hue: 245, chroma: 0.22, lightness: 0.5 },
  { name: "Rose", hue: 350, chroma: 0.24, lightness: 0.55 },
];

export default function ThemeBuilderPage() {
  const [hue, setHue] = useState(260);
  const [chroma, setChroma] = useState(0.2);
  const [lightness, setLightness] = useState(0.55);
  const [radius, setRadius] = useState("0.5rem");
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const primaryColor = `oklch(${lightness} ${chroma} ${hue})`;
  const primaryHover = `oklch(${Math.max(0.3, lightness - 0.07)} ${chroma} ${hue})`;
  const primaryActive = `oklch(${Math.max(0.25, lightness - 0.13)} ${chroma} ${hue})`;

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const cssTokensCode = `:root {
  --patiya-color-primary: ${primaryColor};
  --patiya-color-primary-hover: ${primaryHover};
  --patiya-color-primary-active: ${primaryActive};
  --patiya-color-primary-foreground: oklch(0.98 0 0);
  --patiya-color-ring: ${primaryColor};
  --patiya-radius-md: ${radius};
}`;

  const tailwindV4Code = `@theme {
  --color-primary: ${primaryColor};
  --color-primary-hover: ${primaryHover};
  --color-primary-active: ${primaryActive};
  --radius-md: ${radius};
}`;

  return (
    <Box className="max-w-4xl space-y-10 pb-24">
      <Box className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge color="primary" variant="soft">
            v3 Feature
          </Badge>
          <span className="text-xs font-mono text-(--patiya-color-muted-foreground)">
            OKLCH Palette Designer
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight lg:text-4xl text-(--patiya-color-foreground)">
          Interactive Theme Builder
        </h1>
        <p className="text-lg text-(--patiya-color-muted-foreground) leading-relaxed">
          Design high-chroma, perceptually uniform color palettes in real-time
          and export directly to Tailwind CSS v4 or native CSS custom
          properties.
        </p>
      </Box>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 space-y-6 p-6 rounded-2xl border border-(--patiya-color-border) bg-(--patiya-color-card) shadow-xs">
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-(--patiya-color-muted-foreground)">
              Presets
            </span>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {PRESETS.map((p) => (
                <button
                  key={p.name}
                  onClick={() => {
                    setHue(p.hue);
                    setChroma(p.chroma);
                    setLightness(p.lightness);
                  }}
                  className="flex items-center gap-2 p-2 rounded-xl border border-(--patiya-color-border) hover:bg-(--patiya-color-muted)/50 transition-colors text-left"
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full shrink-0 shadow-xs"
                    style={{
                      backgroundColor: `oklch(${p.lightness} ${p.chroma} ${p.hue})`,
                    }}
                  />
                  <span className="text-xs font-medium truncate">{p.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-2 border-t border-(--patiya-color-border)">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span>Hue</span>
                <span className="font-mono text-(--patiya-color-muted-foreground)">
                  {hue}°
                </span>
              </div>
              <Slider
                min={0}
                max={360}
                step={1}
                value={hue}
                onChange={(val) => {
                  const v = Array.isArray(val) ? val[0] : val;
                  setHue(Math.round(v));
                }}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span>Chroma</span>
                <span className="font-mono text-(--patiya-color-muted-foreground)">
                  {chroma.toFixed(2)}
                </span>
              </div>
              <Slider
                min={0.05}
                max={0.3}
                step={0.01}
                value={chroma}
                onChange={(val) => {
                  const v = Array.isArray(val) ? val[0] : val;
                  setChroma(Math.round(v * 100) / 100);
                }}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span>Lightness</span>
                <span className="font-mono text-(--patiya-color-muted-foreground)">
                  {lightness.toFixed(2)}
                </span>
              </div>
              <Slider
                min={0.35}
                max={0.75}
                step={0.01}
                value={lightness}
                onChange={(val) => {
                  const v = Array.isArray(val) ? val[0] : val;
                  setLightness(Math.round(v * 100) / 100);
                }}
              />
            </div>

            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs font-semibold">
                <span>Border Radius</span>
                <span className="font-mono text-(--patiya-color-muted-foreground)">
                  {radius}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { label: "None", val: "0px" },
                  { label: "SM", val: "0.25rem" },
                  { label: "MD", val: "0.5rem" },
                  { label: "Full", val: "9999px" },
                ].map((r) => (
                  <button
                    key={r.label}
                    onClick={() => setRadius(r.val)}
                    className={`py-1.5 text-xs font-mono rounded-lg border transition-all ${
                      radius === r.val
                        ? "border-(--patiya-color-primary) font-bold text-(--patiya-color-primary) bg-(--patiya-color-primary)/10"
                        : "border-(--patiya-color-border) text-(--patiya-color-muted-foreground) hover:text-(--patiya-color-foreground)"
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div
            className="p-6 rounded-2xl border border-(--patiya-color-border) bg-(--patiya-color-background) space-y-6 transition-all shadow-sm"
            style={
              {
                "--patiya-color-primary": primaryColor,
                "--patiya-color-primary-hover": primaryHover,
                "--patiya-color-primary-active": primaryActive,
                "--patiya-color-ring": primaryColor,
                "--patiya-radius-md": radius,
              } as React.CSSProperties
            }
          >
            <div className="flex items-center justify-between border-b border-(--patiya-color-border) pb-3">
              <span className="text-xs font-semibold tracking-wider uppercase text-(--patiya-color-muted-foreground)">
                Live Preview
              </span>
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: primaryColor }}
                />
                <span className="font-mono text-xs">{primaryColor}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button color="primary" variant="solid">
                Primary Solid
              </Button>
              <Button color="primary" variant="outline">
                Outline
              </Button>
              <Button color="primary" variant="soft">
                Soft Tint
              </Button>
              <Button color="primary" variant="ghost">
                Ghost
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <Badge color="primary" variant="solid">
                Active
              </Badge>
              <Badge color="primary" variant="soft">
                v3 Feature
              </Badge>
              <Badge color="primary" variant="outline">
                OKLCH
              </Badge>
              <div className="ml-auto flex items-center gap-2">
                <span className="text-xs text-(--patiya-color-muted-foreground)">
                  Auto-sync
                </span>
                <Switch defaultChecked />
              </div>
            </div>

            <Slider defaultValue={65} />

            <Input
              placeholder="Interactive themed input..."
              defaultValue="Ship ultra-fast interfaces"
              className="w-full"
            />

            <Stat variant="card">
              <StatLabel>Total Monthly Telemetry</StatLabel>
              <StatValue prefix="$">48,290</StatValue>
              <StatTrend direction="up">+24.8% vs last month</StatTrend>
            </Stat>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase text-(--patiya-color-muted-foreground) tracking-wider">
                Generated Configuration
              </span>
              <div className="flex items-center gap-2">
                <Button
                  size="xs"
                  variant="outline"
                  onClick={() => copyToClipboard(tailwindV4Code, "tailwind")}
                >
                  {copiedType === "tailwind"
                    ? "Copied @theme!"
                    : "Copy Tailwind v4"}
                </Button>
                <Button
                  size="xs"
                  variant="solid"
                  onClick={() => copyToClipboard(cssTokensCode, "css")}
                >
                  {copiedType === "css" ? "Copied CSS!" : "Copy CSS Tokens"}
                </Button>
              </div>
            </div>

            <div className="rounded-xl border border-(--patiya-color-border) bg-(--patiya-color-card) p-4 font-mono text-xs overflow-x-auto text-[var(--patiya-color-foreground)]">
              <pre>{tailwindV4Code}</pre>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}
