"use client";

import React, { use } from "react";
import { notFound } from "next/navigation";
import { Box } from "patiya";
import { blocksRegistry } from "../../../../registry/blocks";
import { CodeTabs } from "../../../../components/CodeTabs";
import { ExampleCard } from "../../../../components/ExampleCard";

type BlockPageProps = {
  params: Promise<{ slug: string }>;
};

export default function BlockPage({ params }: BlockPageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const block = blocksRegistry[slug];

  if (!block) {
    notFound();
  }

  return (
    <Box className="max-w-4xl mx-auto space-y-12 pb-24">
      <Box className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-[var(--patiya-color-foreground)]">
          {block.title}
        </h1>
        <p className="text-lg text-[var(--patiya-color-muted-foreground)]">
          {block.description}
        </p>
      </Box>

      <Box className="space-y-6 scroll-mt-28">
        <div className="flex items-center justify-between border-b border-[var(--patiya-color-border)] pb-3">
          <h2 id="preview" className="text-2xl font-semibold">
            Live Component Preview
          </h2>
          <span className="text-xs text-[var(--patiya-color-muted-foreground)]">
            Powered by Motion.dev
          </span>
        </div>
        <ExampleCard
          code={block.code}
          className="bg-[var(--patiya-color-background)]"
        >
          <div className="w-full flex justify-center relative z-10 overflow-x-auto no-scrollbar py-2">
            {block.preview}
          </div>
        </ExampleCard>
      </Box>

      <Box className="space-y-6 mt-8 scroll-mt-28">
        <h2
          id="installation"
          className="text-2xl font-semibold border-b border-[var(--patiya-color-border)] pb-3"
        >
          Installation
        </h2>
        <CodeTabs
          tabs={[
            { name: "bun", code: "bun add motion" },
            { name: "npm", code: "npm install motion" },
            { name: "pnpm", code: "pnpm add motion" },
            { name: "yarn", code: "yarn add motion" },
          ]}
        />
      </Box>

      <Box className="space-y-6 mt-8 scroll-mt-28">
        <h2
          id="import"
          className="text-2xl font-semibold border-b border-[var(--patiya-color-border)] pb-3"
        >
          Import Reference
        </h2>
        <CodeTabs
          tabs={[
            {
              name: "import",
              code: "import { motion, AnimatePresence } from 'motion/react';",
            },
          ]}
        />
      </Box>
    </Box>
  );
}
