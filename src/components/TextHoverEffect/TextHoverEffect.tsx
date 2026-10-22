'use client';

import React, { useRef, useState, useId } from 'react';
import { cn } from '../../utils/cn';
import { PatiyaColor } from '../../types/common';

export type TextHoverEffectProps = {
  text: string;
  className?: string;
  duration?: number;
  color?: PatiyaColor | string;
};

const semanticColors: Record<string, string> = {
  primary: 'var(--patiya-color-primary)',
  secondary: 'var(--patiya-color-secondary)',
  accent: 'var(--patiya-color-accent)',
  destructive: 'var(--patiya-color-destructive)',
  success: 'var(--patiya-color-success)',
  warning: 'var(--patiya-color-warning)',
  info: 'var(--patiya-color-info)',
  muted: 'var(--patiya-color-muted-foreground)',
};

export const TextHoverEffect = ({
  text,
  className,
  duration = 0.3,
  color = 'primary',
}: TextHoverEffectProps) => {
  const rawId = useId();
  const id = rawId.replace(/[^a-zA-Z0-9]/g, '');
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 300, y: 80 });
  const [hovered, setHovered] = useState(false);

  const resolvedColor = (color && color in semanticColors)
    ? semanticColors[color]
    : color;

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 600;
    const y = ((e.clientY - rect.top) / rect.height) * 160;
    setCursor({
      x: Math.max(0, Math.min(600, x)),
      y: Math.max(0, Math.min(160, y)),
    });
  };

  const maskId = `textMask-${id}`;
  const revealMaskId = `revealMask-${id}`;
  const glowId = `textGlow-${id}`;

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 600 160"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      className={cn('select-none w-full h-full cursor-default overflow-visible', className)}
    >
      <defs>
        <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="blur" />
        </filter>

        <radialGradient
          id={revealMaskId}
          cx={cursor.x}
          cy={cursor.y}
          r={180}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="60%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>

        <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="600" height="160">
          <rect x="0" y="0" width="600" height="160" fill={`url(#${revealMaskId})`} />
        </mask>
      </defs>

      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="central"
        strokeWidth="1.5"
        style={{
          stroke: resolvedColor,
          strokeOpacity: 0.35,
          fill: resolvedColor,
          fillOpacity: 0.05,
        }}
        className="font-black tracking-widest text-7xl font-sans"
      >
        {text}
      </text>

      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="central"
        strokeWidth="4"
        mask={`url(#${maskId})`}
        style={{
          opacity: hovered ? 0.45 : 0,
          transition: `opacity ${duration}s ease`,
          stroke: resolvedColor,
        }}
        className="font-black tracking-widest text-7xl font-sans pointer-events-none"
        fill="none"
        filter={`url(#${glowId})`}
      >
        {text}
      </text>

      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="central"
        strokeWidth="2"
        mask={`url(#${maskId})`}
        style={{
          opacity: hovered ? 1 : 0,
          transition: `opacity ${duration}s ease`,
          stroke: resolvedColor,
          fill: resolvedColor,
        }}
        className="font-black tracking-widest text-7xl font-sans pointer-events-none"
      >
        {text}
      </text>
    </svg>
  );
};
