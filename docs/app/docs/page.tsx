"use client";
import { Box, Badge, Alert } from 'patiya';
import { CodeTabs } from '../../components/CodeTabs';

export default function GettingStartedPage() {
  const installTabs = [
    { name: 'bun', code: 'bun add patiya' },
    { name: 'npm', code: 'npm install patiya' },
    { name: 'pnpm', code: 'pnpm add patiya' },
    { name: 'yarn', code: 'yarn add patiya' },
  ];

  return (
    <Box className="max-w-3xl space-y-12 pb-20">
      <Box className="space-y-6">
        <Badge color="primary" variant="soft">Installation</Badge>
        <h1 className="text-4xl font-medium tracking-tight lg:text-5xl">Getting Started</h1>
        <p className="text-xl text-(--patiya-color-muted-foreground) leading-relaxed">
          Welcome to Patiya UI. A beautifully designed, accessible, and highly customizable React component library.
        </p>
      </Box>

      <Alert variant="soft" color="info" title="Note">
        Patiya UI is designed for React 19+ and Next.js App Router. It leverages Tailwind CSS v4 for powerful utility-first styling.
      </Alert>

      <Box className="space-y-6">
        <h2 className="text-2xl font-semibold border-b border-[var(--patiya-color-border)] pb-3">1. Install Package</h2>
        <p className="text-(--patiya-color-muted-foreground)">Run one of the following commands in your terminal to install the library.</p>
        <CodeTabs tabs={installTabs} />
      </Box>

      <Box className="space-y-6">
        <h2 className="text-2xl font-semibold border-b border-[var(--patiya-color-border)] pb-3">2. Add Provider & Styles</h2>
        <p className="text-(--patiya-color-muted-foreground)">Wrap your application in the <code className="bg-[var(--patiya-color-muted)] px-1.5 py-0.5 rounded text-sm text-[var(--patiya-color-foreground)]">PatiyaProvider</code> and import the global styles in your root layout.</p>
        <CodeTabs tabs={[{ name: 'app/layout.tsx', code: `import { PatiyaProvider } from 'patiya';\nimport 'patiya/styles';\n\nexport default function RootLayout({ children }) {\n  return (\n    <html>\n      <body>\n        <PatiyaProvider defaultTheme="system">\n          {children}\n        </PatiyaProvider>\n      </body>\n    </html>\n  );\n}` }]} />
      </Box>
      
      <Box className="space-y-6">
        <h2 className="text-2xl font-semibold border-b border-[var(--patiya-color-border)] pb-3">3. Start Building</h2>
        <p className="text-(--patiya-color-muted-foreground) leading-relaxed">You are all set! Browse the components in the sidebar to see how to use them. Here is a quick example to verify your setup:</p>
        <CodeTabs tabs={[{ name: 'app/page.tsx', code: `import { Button } from 'patiya';\n\nexport default function Home() {\n  return (\n    <Button color="primary" variant="solid">\n      Hello Patiya UI!\n    </Button>\n  );\n}` }]} />
      </Box>
    </Box>
  );
}
