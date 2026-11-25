import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    // Subcaminhos com peer opcional: quem não importa não precisa instalar.
    "chart/index": "src/chart/index.tsx",
    "form/index": "src/form/index.tsx",
    "data-table/index": "src/data-table/index.tsx",
  },
  format: ["esm"],
  dts: true,
  clean: true,
  treeshake: true,
  external: ["react", "react-dom", "recharts", "react-hook-form", "@tanstack/react-table"],
  // O CSS é copiado cru: o Tailwind v4 do app consumidor precisa processar o
  // @theme, então não pode vir pré-compilado.
  onSuccess: "cp src/styles/index.css dist/styles.css && cp -r src/styles dist/styles",
});
