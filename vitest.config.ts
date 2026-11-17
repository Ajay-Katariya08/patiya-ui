import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-oxc";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    include: ["tests/**/*.{test,spec}.{ts,tsx}", "src/**/*.{test,spec}.{ts,tsx}"],
  },
  resolve: {
    alias: {
      "patiya": resolve(__dirname, "./src"),
    },
  },
});

