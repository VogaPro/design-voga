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
  // O CSS vai para a RAIZ do dist, e não para dist/styles/: o dist/styles.css é
  // o index.css copiado, e ele importa as outras seis como "./tokens.css". Com
  // `cp -r src/styles dist/styles` elas caíam em dist/styles/styles/ e nenhum
  // dos sete imports resolvia — `@import "@voga/ui/styles.css"` entrava vazio.
  onSuccess: "cp src/styles/*.css dist/ && cp src/styles/index.css dist/styles.css",
});
