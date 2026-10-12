"use client";

import React, { use, useState } from 'react';
import { componentsRegistry } from '../../../../registry/components';
import { notFound } from 'next/navigation';
import { Box } from 'patiya';
import { CodeTabs } from '../../../../components/CodeTabs';
import { ExampleCard } from '../../../../components/ExampleCard';

export default function ComponentPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const comp = componentsRegistry[slug];
  
  if (!comp) {
    notFound();
  }

  const tocItems = [
    { id: 'installation', title: 'Installation' }
  ];

  if (comp.examples) {
    comp.examples.forEach((example: any, i: number) => {
      tocItems.push({
        id: `example-${i}`,
        title: example.title
      });
    });
  } else {
    tocItems.push({
      id: 'preview',
      title: 'Preview'
    });
  }

  if (comp.props) {
    tocItems.push({
      id: 'props-api',
      title: 'Props API'
    });
  }

  return (
    <Box className="max-w-4xl mx-auto space-y-12 pb-20">
        <Box className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">{comp.title}</h1>
          <p className="text-lg text-[var(--patiya-color-muted-foreground)]">
            {comp.description}
          </p>
        </Box>

        <Box className="space-y-6 mt-8 scroll-mt-28">
          <h2 id="installation" className="text-2xl font-semibold border-b border-[var(--patiya-color-border)] pb-3">Installation</h2>
          <CodeTabs tabs={[{ name: 'import', code: comp.installation || `import { ${comp.title.split(' / ')[0].replace(' ', '')} } from 'patiya';` }]} />
        </Box>

        {comp.examples ? (
          <Box className="grid gap-12 mt-12">
            {comp.examples.map((example: any, i: number) => (
              <section key={i} className="space-y-6 scroll-mt-28">
                <div className="space-y-2 pb-4 border-b border-[var(--patiya-color-border)]">
                  <h2 id={`example-${i}`} className="text-2xl font-semibold">{example.title}</h2>
                  {example.description && <p className="text-[var(--patiya-color-muted-foreground)]">{example.description}</p>}
                </div>
                <ExampleCard code={example.code}>
                  <div className="w-full flex justify-center relative z-10">
                    {example.preview}
                  </div>
                </ExampleCard>
              </section>
            ))}
          </Box>
        ) : (
          <Box className="grid gap-12 mt-12">
            <section className="space-y-6 scroll-mt-28">
              <div className="space-y-2 pb-4 border-b border-[var(--patiya-color-border)]">
                <h2 id="preview" className="text-2xl font-semibold">Preview</h2>
                <p className="text-[var(--patiya-color-muted-foreground)]">A live preview of the component.</p>
              </div>
              <ExampleCard code={comp.code}>
                <div className="w-full flex justify-center relative z-10">
                  {comp.preview}
                </div>
              </ExampleCard>
            </section>
          </Box>
        )}

        {comp.props && (
          <section className="space-y-6 mt-12 scroll-mt-28">
            <div className="space-y-2 pb-4 border-b border-[var(--patiya-color-border)]">
              <h2 id="props-api" className="text-2xl font-semibold">Props API</h2>
              <p className="text-[var(--patiya-color-muted-foreground)]">Available properties for the {comp.title} component.</p>
            </div>
            <div className="overflow-x-auto rounded-xl border border-[var(--patiya-color-border)]">
              <table className="w-full text-sm text-left border-collapse">
                <thead className="bg-[var(--patiya-color-muted)] text-[var(--patiya-color-foreground)]">
                  <tr>
                    <th className="px-6 py-4 font-semibold border-b border-[var(--patiya-color-border)]">Prop</th>
                    <th className="px-6 py-4 font-semibold border-b border-[var(--patiya-color-border)]">Type</th>
                    <th className="px-6 py-4 font-semibold border-b border-[var(--patiya-color-border)]">Default</th>
                    <th className="px-6 py-4 font-semibold border-b border-[var(--patiya-color-border)]">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--patiya-color-border)] bg-[var(--patiya-color-background)]">
                  {comp.props.map((prop: any) => (
                    <tr key={prop.name} className="hover:bg-[var(--patiya-color-muted)]/30 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs text-blue-500 font-medium">{prop.name}</td>
                      <td className="px-6 py-4 font-mono text-xs text-orange-500">{prop.type}</td>
                      <td className="px-6 py-4 font-mono text-xs text-gray-500">{prop.default || '-'}</td>
                      <td className="px-6 py-4 text-sm leading-relaxed">{prop.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
    </Box>
  );
}
