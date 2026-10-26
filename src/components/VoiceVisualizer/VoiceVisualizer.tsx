import React, { useEffect, useRef, useState, useImperativeHandle } from "react";
import { cn } from "../../utils/cn";

export type VoiceState = "idle" | "listening" | "thinking" | "speaking";
export type VisualizerMode = "wave" | "bars" | "orb";
export type VisualizerTheme =
  "primary" | "neon" | "aurora" | "sunset" | "monochrome";

export type VoiceVisualizerProps = React.HTMLAttributes<HTMLDivElement> & {
  state?: VoiceState;
  mode?: VisualizerMode;
  theme?: VisualizerTheme;
  barCount?: number;
  interactive?: boolean;
  height?: number;
};

export const VoiceVisualizer = React.forwardRef<
  HTMLDivElement,
  VoiceVisualizerProps
>(
  (
    {
      className,
      state = "speaking",
      mode = "wave",
      theme = "primary",
      barCount = 36,
      interactive = true,
      height = 140,
      ...props
    },
    ref
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);
    const [intensity, setIntensity] = useState(1);

    const stateRef = useRef(state);
    stateRef.current = state;

    const modeRef = useRef(mode);
    modeRef.current = mode;

    const themeRef = useRef(theme);
    themeRef.current = theme;

    const intensityRef = useRef(intensity);
    intensityRef.current = intensity;

    useEffect(() => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      let rafId: number | null = null;
      let width = (canvas.width = container.clientWidth || 320);
      let h = (canvas.height = height);

      const onResize = () => {
        if (!container || !canvas) return;
        width = canvas.width = container.clientWidth || 320;
        h = canvas.height = height;
      };

      const resizeObserver = new ResizeObserver(onResize);
      resizeObserver.observe(container);

      let isVisible = true;
      const intersectionObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            isVisible = entry.isIntersecting;
          }
        },
        { threshold: 0.05 },
      );
      intersectionObserver.observe(container);

      const themeGradients: Record<VisualizerTheme, [string, string, string]> =
        {
          primary: ["#3b82f6", "#6366f1", "#a855f7"],
          neon: ["#06b6d4", "#ec4899", "#8b5cf6"],
          aurora: ["#10b981", "#06b6d4", "#3b82f6"],
          sunset: ["#f59e0b", "#ef4444", "#ec4899"],
          monochrome: ["#94a3b8", "#64748b", "#cbd5e1"],
        };

      let time = 0;

      const drawWave = (
        t: number,
        colors: [string, string, string],
        amp: number,
      ) => {
        ctx.clearRect(0, 0, width, h);
        const midY = h / 2;

        const layers = [
          {
            freq: 0.015,
            speed: 2.5,
            ampMult: 1.0,
            color: colors[0],
            alpha: 0.85,
            lineWidth: 2.8,
          },
          {
            freq: 0.022,
            speed: -1.8,
            ampMult: 0.75,
            color: colors[1],
            alpha: 0.6,
            lineWidth: 2.0,
          },
          {
            freq: 0.03,
            speed: 3.2,
            ampMult: 0.5,
            color: colors[2],
            alpha: 0.45,
            lineWidth: 1.5,
          },
        ];

        layers.forEach((layer) => {
          ctx.beginPath();
          ctx.lineWidth = layer.lineWidth;
          ctx.strokeStyle = layer.color;
          ctx.globalAlpha = layer.alpha;
          ctx.shadowBlur = 12;
          ctx.shadowColor = layer.color;

          for (let x = 0; x <= width; x += 3) {
            const envelope = Math.sin((x / width) * Math.PI);
            const y1 =
              Math.sin(x * layer.freq + t * layer.speed) *
              amp *
              layer.ampMult *
              envelope;
            const y2 =
              Math.cos(x * layer.freq * 1.5 - t * layer.speed * 0.6) *
              (amp * 0.4) *
              envelope;
            const y = midY + y1 + y2;

            if (x === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.stroke();
        });

        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      };

      const drawBars = (
        t: number,
        colors: [string, string, string],
        amp: number,
      ) => {
        ctx.clearRect(0, 0, width, h);
        const count = barCount;
        const totalGap = (count - 1) * 3;
        const barWidth = Math.max((width - totalGap) / count, 2);
        const midY = h / 2;

        for (let i = 0; i < count; i++) {
          const x = i * (barWidth + 3);
          const distFromCenter = Math.abs(i - count / 2) / (count / 2);
          const envelope = Math.cos(distFromCenter * (Math.PI / 2.2));

          const wave1 = Math.sin(i * 0.35 + t * 4) * 0.5 + 0.5;
          const wave2 = Math.cos(i * 0.2 - t * 2.5) * 0.5 + 0.5;
          const barHeight = Math.max(
            (wave1 * 0.6 + wave2 * 0.4) * amp * 1.4 * envelope,
            4,
          );

          const grad = ctx.createLinearGradient(
            0,
            midY - barHeight / 2,
            0,
            midY + barHeight / 2,
          );
          grad.addColorStop(0, colors[0]);
          grad.addColorStop(0.5, colors[1]);
          grad.addColorStop(1, colors[2]);

          ctx.fillStyle = grad;
          ctx.shadowBlur = 8;
          ctx.shadowColor = colors[0];

          const radius = Math.min(barWidth / 2, 3);
          ctx.beginPath();
          ctx.roundRect(x, midY - barHeight / 2, barWidth, barHeight, radius);
          ctx.fill();
        }

        ctx.shadowBlur = 0;
      };

      const drawOrb = (
        t: number,
        colors: [string, string, string],
        amp: number,
      ) => {
        ctx.clearRect(0, 0, width, h);
        const centerX = width / 2;
        const centerY = h / 2;
        const baseRadius = Math.min(width, h) * 0.22;

        const pulse = 1 + (amp / 80) * Math.sin(t * 3.5);
        const r = baseRadius * pulse;

        const radGrad = ctx.createRadialGradient(
          centerX,
          centerY,
          2,
          centerX,
          centerY,
          r * 1.6,
        );
        radGrad.addColorStop(0, colors[0]);
        radGrad.addColorStop(0.4, colors[1]);
        radGrad.addColorStop(0.8, colors[2]);
        radGrad.addColorStop(1, "transparent");

        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(centerX, centerY, r * 1.6, 0, Math.PI * 2);
        ctx.fill();

        for (let ring = 1; ring <= 3; ring++) {
          ctx.beginPath();
          ctx.strokeStyle = colors[ring - 1];
          ctx.lineWidth = 1.5;
          ctx.globalAlpha = 0.5 / ring;
          const ringR = r * (1 + ring * 0.25) + Math.sin(t * 2 + ring) * 6;
          ctx.arc(centerX, centerY, Math.max(ringR, 1), 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      };

      const render = () => {
        if (!isVisible || document.hidden) {
          rafId = requestAnimationFrame(render);
          return;
        }

        time += 0.02;

        const currentTheme = themeRef.current;
        const colors = themeGradients[currentTheme] || themeGradients.primary;
        const currentState = stateRef.current;
        const currentMode = modeRef.current;

        let baseAmp = 20;
        if (currentState === "idle") baseAmp = 6;
        else if (currentState === "listening") baseAmp = 18;
        else if (currentState === "thinking") baseAmp = 28;
        else if (currentState === "speaking") baseAmp = 42;

        const finalAmp = baseAmp * intensityRef.current;

        if (currentMode === "bars") {
          drawBars(time, colors, finalAmp);
        } else if (currentMode === "orb") {
          drawOrb(time, colors, finalAmp);
        } else {
          drawWave(time, colors, finalAmp);
        }

        rafId = requestAnimationFrame(render);
      };

      rafId = requestAnimationFrame(render);

      return () => {
        if (rafId !== null) cancelAnimationFrame(rafId);
        resizeObserver.disconnect();
        intersectionObserver.disconnect();
      };
    }, [height, barCount]);

    return (
      <div
        ref={containerRef}
        onMouseMove={
          interactive
            ? (e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const dist =
                  Math.abs(e.clientX - (rect.left + rect.width / 2)) /
                  (rect.width / 2);
                setIntensity(1 + (1 - dist) * 0.6);
              }
            : undefined
        }
        onMouseLeave={interactive ? () => setIntensity(1) : undefined}
        style={{ height: `${height}px` }}
        className={cn(
          "relative w-full overflow-hidden rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)]/50 backdrop-blur-md p-2 flex items-center justify-center select-none",
          className,
        )}
        {...props}
      >
        <canvas ref={canvasRef} className="block w-full h-full" />
      </div>
    );
  },
);

VoiceVisualizer.displayName = "VoiceVisualizer";
