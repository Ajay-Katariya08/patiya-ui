import React, { useRef, useEffect, useCallback, forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { PatiyaColor, PatiyaSize } from '../../types/common';

export type ConfettiShape = 'square' | 'circle' | 'star' | 'ribbon';

export type ConfettiOptions = {
  particleCount?: number;
  spread?: number;
  startVelocity?: number;
  decay?: number;
  gravity?: number;
  colors?: string[];
  shapes?: ConfettiShape[];
  origin?: { x: number; y: number };
  scalar?: number;
};

export type ConfettiProps = React.HTMLAttributes<HTMLDivElement> & {
  options?: ConfettiOptions;
  color?: PatiyaColor;
  trigger?: boolean;
  onComplete?: () => void;
};

export type ConfettiButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'> & {
  options?: ConfettiOptions;
  variant?: 'solid' | 'outline' | 'soft' | 'ghost';
  color?: PatiyaColor;
  buttonColor?: PatiyaColor;
  size?: PatiyaSize;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  shape: ConfettiShape;
  rotation: number;
  rotationSpeed: number;
  alpha: number;
  wobble: number;
  wobbleSpeed: number;
};

const defaultColors = [
  '#2563eb',
  '#7c3aed',
  '#db2777',
  '#ea580c',
  '#eab308',
  '#10b981',
  '#06b6d4',
];

const patiyaColorPalettes: Record<PatiyaColor, string[]> = {
  primary: ['#3b82f6', '#2563eb', '#1d4ed8', '#60a5fa', '#93c5fd'],
  secondary: ['#a855f7', '#9333ea', '#7e22ce', '#c084fc', '#e9d5ff'],
  accent: ['#f59e0b', '#d97706', '#b45309', '#fbbf24', '#fde68a'],
  destructive: ['#ef4444', '#dc2626', '#b91c1c', '#f87171', '#fca5a5'],
  success: ['#10b981', '#059669', '#047857', '#34d399', '#a7f3d0'],
  warning: ['#f97316', '#ea580c', '#c2410c', '#fb923c', '#fed7aa'],
  info: ['#06b6d4', '#0891b2', '#0e7490', '#22d3ee', '#a5f3fc'],
  muted: ['#64748b', '#475569', '#334155', '#94a3b8', '#cbd5e1'],
};

const solidColorClasses: Record<PatiyaColor, string> = {
  primary: 'bg-[var(--patiya-color-primary)] text-[var(--patiya-color-primary-foreground)] hover:bg-[var(--patiya-color-primary-hover)] shadow-md shadow-[var(--patiya-color-primary)]/20',
  secondary: 'bg-[var(--patiya-color-secondary)] text-[var(--patiya-color-primary-foreground)] hover:opacity-90 shadow-md shadow-[var(--patiya-color-secondary)]/20',
  accent: 'bg-[var(--patiya-color-accent)] text-[var(--patiya-color-primary-foreground)] hover:opacity-90 shadow-md shadow-[var(--patiya-color-accent)]/20',
  destructive: 'bg-[var(--patiya-color-destructive)] text-[var(--patiya-color-primary-foreground)] hover:opacity-90 shadow-md shadow-[var(--patiya-color-destructive)]/20',
  success: 'bg-[var(--patiya-color-success)] text-[var(--patiya-color-primary-foreground)] hover:opacity-90 shadow-md shadow-[var(--patiya-color-success)]/20',
  warning: 'bg-[var(--patiya-color-warning)] text-[var(--patiya-color-primary-foreground)] hover:opacity-90 shadow-md shadow-[var(--patiya-color-warning)]/20',
  info: 'bg-[var(--patiya-color-info)] text-[var(--patiya-color-primary-foreground)] hover:opacity-90 shadow-md shadow-[var(--patiya-color-info)]/20',
  muted: 'bg-[var(--patiya-color-muted)] text-[var(--patiya-color-foreground)] hover:opacity-90',
};

const outlineColorClasses: Record<PatiyaColor, string> = {
  primary: 'border border-[var(--patiya-color-primary)] text-[var(--patiya-color-primary)] hover:bg-[var(--patiya-color-primary)]/10',
  secondary: 'border border-[var(--patiya-color-secondary)] text-[var(--patiya-color-secondary)] hover:bg-[var(--patiya-color-secondary)]/10',
  accent: 'border border-[var(--patiya-color-accent)] text-[var(--patiya-color-accent)] hover:bg-[var(--patiya-color-accent)]/10',
  destructive: 'border border-[var(--patiya-color-destructive)] text-[var(--patiya-color-destructive)] hover:bg-[var(--patiya-color-destructive)]/10',
  success: 'border border-[var(--patiya-color-success)] text-[var(--patiya-color-success)] hover:bg-[var(--patiya-color-success)]/10',
  warning: 'border border-[var(--patiya-color-warning)] text-[var(--patiya-color-warning)] hover:bg-[var(--patiya-color-warning)]/10',
  info: 'border border-[var(--patiya-color-info)] text-[var(--patiya-color-info)] hover:bg-[var(--patiya-color-info)]/10',
  muted: 'border border-[var(--patiya-color-border)] text-[var(--patiya-color-muted-foreground)] hover:bg-[var(--patiya-color-muted)]/10',
};

const softColorClasses: Record<PatiyaColor, string> = {
  primary: 'bg-[var(--patiya-color-primary)]/15 text-[var(--patiya-color-primary)] hover:bg-[var(--patiya-color-primary)]/25',
  secondary: 'bg-[var(--patiya-color-secondary)]/15 text-[var(--patiya-color-secondary)] hover:bg-[var(--patiya-color-secondary)]/25',
  accent: 'bg-[var(--patiya-color-accent)]/15 text-[var(--patiya-color-accent)] hover:bg-[var(--patiya-color-accent)]/25',
  destructive: 'bg-[var(--patiya-color-destructive)]/15 text-[var(--patiya-color-destructive)] hover:bg-[var(--patiya-color-destructive)]/25',
  success: 'bg-[var(--patiya-color-success)]/15 text-[var(--patiya-color-success)] hover:bg-[var(--patiya-color-success)]/25',
  warning: 'bg-[var(--patiya-color-warning)]/15 text-[var(--patiya-color-warning)] hover:bg-[var(--patiya-color-warning)]/25',
  info: 'bg-[var(--patiya-color-info)]/15 text-[var(--patiya-color-info)] hover:bg-[var(--patiya-color-info)]/25',
  muted: 'bg-[var(--patiya-color-muted)] text-[var(--patiya-color-foreground)] hover:bg-[var(--patiya-color-muted)]/80',
};

const ghostColorClasses: Record<PatiyaColor, string> = {
  primary: 'text-[var(--patiya-color-primary)] hover:bg-[var(--patiya-color-primary)]/10',
  secondary: 'text-[var(--patiya-color-secondary)] hover:bg-[var(--patiya-color-secondary)]/10',
  accent: 'text-[var(--patiya-color-accent)] hover:bg-[var(--patiya-color-accent)]/10',
  destructive: 'text-[var(--patiya-color-destructive)] hover:bg-[var(--patiya-color-destructive)]/10',
  success: 'text-[var(--patiya-color-success)] hover:bg-[var(--patiya-color-success)]/10',
  warning: 'text-[var(--patiya-color-warning)] hover:bg-[var(--patiya-color-warning)]/10',
  info: 'text-[var(--patiya-color-info)] hover:bg-[var(--patiya-color-info)]/10',
  muted: 'text-[var(--patiya-color-muted-foreground)] hover:bg-[var(--patiya-color-muted)]/20',
};

const sizeClasses: Record<PatiyaSize, string> = {
  xs: 'px-2.5 py-1 text-xs rounded-lg',
  sm: 'px-3.5 py-1.5 text-xs rounded-lg',
  md: 'px-4 py-2 text-sm rounded-xl',
  lg: 'px-5 py-2.5 text-base rounded-xl',
  xl: 'px-6 py-3 text-lg rounded-2xl',
};

const drawParticle = (ctx: CanvasRenderingContext2D, p: Particle) => {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rotation);
  ctx.fillStyle = p.color;
  ctx.globalAlpha = Math.max(0, p.alpha);

  if (p.shape === 'circle') {
    ctx.beginPath();
    ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
    ctx.fill();
  } else if (p.shape === 'star') {
    const spikes = 5;
    const outerRadius = p.size;
    const innerRadius = p.size / 2;
    ctx.beginPath();
    for (let i = 0; i < spikes * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (i * Math.PI) / spikes;
      const sx = Math.cos(angle) * radius;
      const sy = Math.sin(angle) * radius;
      if (i === 0) ctx.moveTo(sx, sy);
      else ctx.lineTo(sx, sy);
    }
    ctx.closePath();
    ctx.fill();
  } else if (p.shape === 'ribbon') {
    ctx.scale(Math.sin(p.wobble), 1);
    ctx.fillRect(-p.size / 2, -p.size * 1.5, p.size, p.size * 3);
  } else {
    ctx.scale(Math.cos(p.wobble), 1);
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
  }

  ctx.restore();
};

export const Confetti = forwardRef<HTMLDivElement, ConfettiProps>(
  ({ className, options, color, trigger = false, onComplete, children, ...props }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animationFrameRef = useRef<number | null>(null);

    const spawnParticles = useCallback((opts?: ConfettiOptions) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const count = opts?.particleCount ?? 80;
      const spread = opts?.spread ?? 70;
      const startVelocity = opts?.startVelocity ?? 45;
      const colors = opts?.colors ?? (color ? patiyaColorPalettes[color] : defaultColors);
      const shapes = opts?.shapes ?? ['square', 'circle', 'ribbon'];
      const scalar = opts?.scalar ?? 1;
      const originX = (opts?.origin?.x ?? 0.5) * canvas.width;
      const originY = (opts?.origin?.y ?? 0.5) * canvas.height;

      const newParticles: Particle[] = [];
      const angleRad = -Math.PI / 2;
      const spreadRad = (spread * Math.PI) / 180;

      for (let i = 0; i < count; i++) {
        const angle = angleRad + (Math.random() - 0.5) * spreadRad;
        const velocity = startVelocity * (0.6 + Math.random() * 0.8);
        newParticles.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          size: (6 + Math.random() * 6) * scalar,
          color: colors[Math.floor(Math.random() * colors.length)],
          shape: shapes[Math.floor(Math.random() * shapes.length)],
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.2,
          alpha: 1,
          wobble: Math.random() * 10,
          wobbleSpeed: 0.1 + Math.random() * 0.1,
        });
      }

      particlesRef.current.push(...newParticles);
    }, [color]);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const handleResize = () => {
        const parent = canvas.parentElement;
        if (parent) {
          canvas.width = parent.clientWidth;
          canvas.height = parent.clientHeight;
        }
      };

      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
      if (trigger) {
        spawnParticles(options);
      }
    }, [trigger, options, spawnParticles]);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const loop = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const gravity = options?.gravity ?? 0.8;
        const decay = options?.decay ?? 0.95;

        const activeParticles: Particle[] = [];

        for (const p of particlesRef.current) {
          p.vx *= decay;
          p.vy *= decay;
          p.vy += gravity;
          p.x += p.vx;
          p.y += p.vy;
          p.rotation += p.rotationSpeed;
          p.wobble += p.wobbleSpeed;
          p.alpha -= 0.009;

          if (p.alpha > 0 && p.y < canvas.height + 50) {
            drawParticle(ctx, p);
            activeParticles.push(p);
          }
        }

        particlesRef.current = activeParticles;

        if (activeParticles.length > 0) {
          animationFrameRef.current = requestAnimationFrame(loop);
        } else if (trigger) {
          onComplete?.();
        }
      };

      if (particlesRef.current.length > 0) {
        animationFrameRef.current = requestAnimationFrame(loop);
      }

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, [options, trigger, onComplete]);

    return (
      <div ref={ref} className={cn('relative overflow-hidden', className)} {...props}>
        {children}
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 z-50 h-full w-full"
        />
      </div>
    );
  }
);
Confetti.displayName = 'Confetti';

export const ConfettiButton = forwardRef<HTMLButtonElement, ConfettiButtonProps>(
  (
    {
      className,
      children,
      options,
      variant = 'solid',
      color,
      buttonColor,
      size = 'md',
      onClick,
      ...props
    },
    ref
  ) => {
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const activeColor: PatiyaColor = color || buttonColor || 'primary';

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);

      const target = buttonRef.current;
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const originX = (rect.left + rect.width / 2) / window.innerWidth;
      const originY = (rect.top + rect.height / 2) / window.innerHeight;

      let globalCanvas = document.getElementById('patiya-confetti-global-canvas') as HTMLCanvasElement;
      if (!globalCanvas) {
        globalCanvas = document.createElement('canvas');
        globalCanvas.id = 'patiya-confetti-global-canvas';
        globalCanvas.className = 'fixed inset-0 pointer-events-none z-[9999] w-screen h-screen';
        document.body.appendChild(globalCanvas);
      }

      globalCanvas.width = window.innerWidth;
      globalCanvas.height = window.innerHeight;

      const ctx = globalCanvas.getContext('2d');
      if (!ctx) return;

      const count = options?.particleCount ?? 70;
      const spread = options?.spread ?? 75;
      const startVelocity = options?.startVelocity ?? 42;
      const colors = options?.colors ?? patiyaColorPalettes[activeColor] ?? defaultColors;
      const shapes = options?.shapes ?? ['square', 'circle', 'ribbon'];
      const scalar = options?.scalar ?? 1;

      const startX = originX * globalCanvas.width;
      const startY = originY * globalCanvas.height;

      const particles: Particle[] = [];
      const angleRad = -Math.PI / 2;
      const spreadRad = (spread * Math.PI) / 180;

      for (let i = 0; i < count; i++) {
        const angle = angleRad + (Math.random() - 0.5) * spreadRad;
        const velocity = startVelocity * (0.6 + Math.random() * 0.8);
        particles.push({
          x: startX,
          y: startY,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          size: (6 + Math.random() * 6) * scalar,
          color: colors[Math.floor(Math.random() * colors.length)],
          shape: shapes[Math.floor(Math.random() * shapes.length)],
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.2,
          alpha: 1,
          wobble: Math.random() * 10,
          wobbleSpeed: 0.1 + Math.random() * 0.1,
        });
      }

      let animId: number;
      const gravity = options?.gravity ?? 0.75;
      const decay = options?.decay ?? 0.94;

      const animate = () => {
        ctx.clearRect(0, 0, globalCanvas.width, globalCanvas.height);
        let remaining = false;

        for (const p of particles) {
          if (p.alpha <= 0) continue;
          p.vx *= decay;
          p.vy *= decay;
          p.vy += gravity;
          p.x += p.vx;
          p.y += p.vy;
          p.rotation += p.rotationSpeed;
          p.wobble += p.wobbleSpeed;
          p.alpha -= 0.01;

          if (p.alpha > 0) {
            drawParticle(ctx, p);
            remaining = true;
          }
        }

        if (remaining) {
          animId = requestAnimationFrame(animate);
        } else {
          ctx.clearRect(0, 0, globalCanvas.width, globalCanvas.height);
          cancelAnimationFrame(animId);
        }
      };

      animate();
    };

    const variantStyles = {
      solid: solidColorClasses,
      outline: outlineColorClasses,
      soft: softColorClasses,
      ghost: ghostColorClasses,
    };

    const colorClass = variantStyles[variant]?.[activeColor] || solidColorClasses[activeColor];

    return (
      <button
        ref={(el) => {
          buttonRef.current = el;
          if (typeof ref === 'function') ref(el);
          else if (ref) (ref as any).current = el;
        }}
        onClick={handleClick}
        className={cn(
          'relative inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 active:scale-95 cursor-pointer',
          sizeClasses[size],
          colorClass,
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
ConfettiButton.displayName = 'ConfettiButton';
