import { Box } from "patiya";
import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <Box className="w-full border-t border-[var(--patiya-color-border)] py-8 px-4 sm:px-6 md:px-12 bg-[var(--patiya-color-background)] z-10 relative mt-16">
      <Box className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <Box className="flex items-center gap-2">
          <Logo className="w-6 h-6" />
          <span className="font-semibold">Patiya UI</span>
        </Box>
        <p className="text-sm text-(--patiya-color-muted-foreground)">
          Built by{" "}
          <a
            href="https://ajaykatariyadev.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:text-[var(--patiya-color-foreground)] underline underline-offset-4 transition-colors"
          >
            ajay-katariya
          </a>
          .
        </p>
        <Box className="flex gap-4">
          <Link
            href="/docs"
            className="text-sm text-(--patiya-color-muted-foreground) hover:text-[var(--patiya-color-foreground)] transition-colors"
          >
            Documentation
          </Link>
          <Link
            href="https://github.com/Ajay-Katariya08/patiya-ui"
            target="_blank"
            className="text-sm text-(--patiya-color-muted-foreground) hover:text-[var(--patiya-color-foreground)] transition-colors"
          >
            GitHub
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
