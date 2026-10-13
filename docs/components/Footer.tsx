import { Box } from "patiya";
import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <Box className="w-full border-t border-(--patiya-color-border) py-10 px-4 sm:px-6 md:px-12 bg-[var(--patiya-color-background)] z-10 relative">
      <Box className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <Box className="flex items-center gap-2">
          <Logo className="w-6 h-6" />
          <span className="font-semibold">Patiya UI</span>
        </Box>
        <Box className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-sm text-(--patiya-color-muted-foreground)">
          <p>© {new Date().getFullYear()} Patiya UI. All rights reserved.</p>
          <span className="hidden sm:inline">•</span>
          <p>
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
        </Box>
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
