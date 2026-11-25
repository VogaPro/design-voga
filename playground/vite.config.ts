import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwind from "@tailwindcss/vite";
import { resolve } from "node:path";

/**
 * Playground local: renderiza os componentes de verdade, direto do fonte.
 *   bun run playground         → http://localhost:5173
 *   bun run playground:build   → playground/dist
 */
export default defineConfig({
  root: import.meta.dirname,
  plugins: [react(), tailwind()],
  resolve: {
    alias: {
      // A ordem importa: o alias mais específico vem primeiro.
      "@voga/ui/chart": resolve(import.meta.dirname, "../src/chart/index.tsx"),
      "@voga/ui/form": resolve(import.meta.dirname, "../src/form/index.tsx"),
      "@voga/ui/data-table": resolve(import.meta.dirname, "../src/data-table/index.tsx"),
      "@voga/ui": resolve(import.meta.dirname, "../src/index.ts"),
    },
  },
  server: { port: 5173, open: false },
  build: { outDir: "dist", emptyOutDir: true },
});
