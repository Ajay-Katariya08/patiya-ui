"use client";

import React from "react";
import Link from "next/link";
import { Box } from "patiya";
import { blocksRegistry } from "../../../registry/blocks";

export default function BlocksIndexPage() {
  const blockEntries = Object.entries(blocksRegistry);

  return (
    <Box className="max-w-4xl mx-auto space-y-12 pb-24">
      <Box className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--patiya-color-primary)]/10 text-[var(--patiya-color-primary)] border border-[var(--patiya-color-primary)]/20">
          <span>Motion.dev Blocks</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--patiya-color-primary)]" />
          <span>Production Ready</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--patiya-color-foreground)]">
          Motion Blocks
        </h1>
        <p className="text-lg text-[var(--patiya-color-muted-foreground)] max-w-2xl leading-relaxed">
          Self-contained animated component blocks powered by Motion.dev. Built with GPU-accelerated spring physics, clean hairline borders, and zero shadows.
        </p>
      </Box>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {blockEntries.map(([slug, block]) => (
          <Link
            key={slug}
            href={`/docs/blocks/${slug}`}
            className="group block p-5 rounded-2xl border border-[var(--patiya-color-border)] bg-[var(--patiya-color-card)]/50 hover:bg-[var(--patiya-color-card)] transition-colors hover:border-[var(--patiya-color-primary)]/40 select-none"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--patiya-color-primary)]">
                {block.category}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--patiya-color-muted)] text-[var(--patiya-color-muted-foreground)]">
                {block.badge || "motion.dev"}
              </span>
            </div>
            <h3 className="text-base font-bold text-[var(--patiya-color-foreground)] mt-2 group-hover:text-[var(--patiya-color-primary)] transition-colors">
              {block.title}
            </h3>
            <p className="text-xs text-[var(--patiya-color-muted-foreground)] mt-1.5 line-clamp-2 leading-relaxed">
              {block.description}
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-[var(--patiya-color-primary)]">
              <span>View component</span>
              <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </Box>
  );
}
