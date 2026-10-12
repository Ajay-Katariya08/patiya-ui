"use client";

import { PatiyaProvider } from "patiya";

export function Providers({ children }: { children: React.ReactNode }) {
  return <PatiyaProvider defaultTheme="system">{children}</PatiyaProvider>;
}
