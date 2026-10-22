"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../utils/cn";

export type MatrixCharset = "matrix" | "katakana" | "binary" | "alphanumeric";
export type MatrixColor = "matrix" | "cyber" | "amethyst" | "amber";

export type MatrixRainProps = React.HTMLAttributes<HTMLDivElement> & {
  charset?: MatrixCharset;
  color?: MatrixColor;
  speed?: number;
  fontSize?: number;
  interactive?: boolean;
};

const CHARSETS: Record<MatrixCharset, string> = {
  katakana:
    "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン",
  binary: "01",
  alphanumeric: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  matrix: "ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ1234567890ABCDEF:*+-<>~",
};

const PALETTES: Record<
  MatrixColor,
  { head: string; trail: string; glow: string }
> = {
  matrix: {
    head: "#ffffff",
    trail: "#22c55e",
    glow: "rgba(34, 197, 94, 0.6)",
  },
  cyber: {
    head: "#e0f2fe",
    trail: "#06b6d4",
    glow: "rgba(6, 182, 212, 0.6)",
  },
  amethyst: {
    head: "#faf5ff",
    trail: "#a855f7",
    glow: "rgba(168, 85, 247, 0.6)",
  },
  amber: {
    head: "#fffbeb",
    trail: "#f59e0b",
    glow: "rgba(245, 158, 11, 0.6)",
  },
};

export const MatrixRain = React.forwardRef<HTMLDivElement, MatrixRainProps>(
  ({
    className,
    charset = "matrix",
    color = "matrix",
    speed = 1,
    fontSize = 16,
    interactive = true,
    children,
    ...props
  }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mousePos = useRef<{ x: number; y: number } | null>(null);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsVisible(entry.isIntersecting);
        },
        { threshold: 0.05 },
      );

      observer.observe(container);
      return () => observer.disconnect();
    }, []);

    useEffect(() => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container || !isVisible) return;

      const ctx = canvas.getContext("2d", { alpha: true });
      if (!ctx) return;

      let animationFrameId: number;
      let lastTime = performance.now();
      const glyphs = CHARSETS[charset];
      const palette = PALETTES[color];

      let columns = 0;
      let drops: number[] = [];
      let speeds: number[] = [];
      let chars: string[] = [];

      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const rect = container.getBoundingClientRect();
        const width = Math.max(rect.width, 100);
        const height = Math.max(rect.height, 100);

        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        columns = Math.floor(width / fontSize);
        drops = new Array(columns)
          .fill(0)
          .map(() => Math.floor(Math.random() * -50));
        speeds = new Array(columns)
          .fill(0)
          .map(() => 0.8 + Math.random() * 0.8);
        chars = new Array(columns)
          .fill("")
          .map(() => glyphs[Math.floor(Math.random() * glyphs.length)]);
      };

      resize();

      const resizeObserver = new ResizeObserver(() => {
        resize();
      });
      resizeObserver.observe(container);

      const render = (currentTime: number) => {
        animationFrameId = requestAnimationFrame(render);

        const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
        lastTime = currentTime;

        const rect = container.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        ctx.fillStyle = "rgba(10, 10, 15, 0.12)";
        ctx.fillRect(0, 0, width, height);

        ctx.font = `600 ${fontSize}px monospace`;
        ctx.textAlign = "center";

        const mouse = mousePos.current;

        for (let i = 0; i < drops.length; i++) {
          const x = i * fontSize + fontSize / 2;
          const y = drops[i] * fontSize;

          if (Math.random() > 0.95) {
            chars[i] = glyphs[Math.floor(Math.random() * glyphs.length)];
          }

          let isNearMouse = false;
          if (interactive && mouse) {
            const dx = x - mouse.x;
            const dy = y - mouse.y;
            if (dx * dx + dy * dy < 80 * 80) {
              isNearMouse = true;
            }
          }

          if (isNearMouse) {
            ctx.shadowBlur = 16;
            ctx.shadowColor = palette.head;
            ctx.fillStyle = palette.head;
          } else {
            ctx.shadowBlur = 8;
            ctx.shadowColor = palette.glow;
            ctx.fillStyle = palette.head;
          }

          ctx.fillText(chars[i], x, y);

          const trailChar = glyphs[Math.floor(Math.random() * glyphs.length)];
          ctx.shadowBlur = 4;
          ctx.shadowColor = palette.trail;
          ctx.fillStyle = isNearMouse ? palette.head : palette.trail;
          ctx.fillText(trailChar, x, y - fontSize);

          ctx.shadowBlur = 0;

          drops[i] += speeds[i] * speed * delta * 25;

          if (drops[i] * fontSize > height && Math.random() > 0.975) {
            drops[i] = 0;
            speeds[i] = 0.8 + Math.random() * 0.8;
          }
        }
      };

      animationFrameId = requestAnimationFrame(render);

      return () => {
        cancelAnimationFrame(animationFrameId);
        resizeObserver.disconnect();
      };
    }, [charset, color, fontSize, speed, isVisible, interactive]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!interactive || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mousePos.current = null;
    };

    return (
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "relative w-full h-full min-h-[300px] overflow-hidden rounded-2xl bg-[#0a0a0f] border border-[var(--patiya-color-border)]",
          className,
        )}
        {...props}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none block"
        />
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-6">
          {children}
        </div>
      </div>
    );
  },
);

MatrixRain.displayName = "MatrixRain";
