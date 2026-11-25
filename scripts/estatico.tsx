/**
 * Gera `playground/estatico.html`: um arquivo único, sem build e sem servidor,
 * que abre com duplo clique. Vem do MESMO `playground/src/App.tsx` que o
 * playground React usa — então não existe deriva entre os dois.
 *
 * O que ele tem: toda a página, os dois temas e o foco só de teclado.
 * O que ele não tem: o que depende de React em runtime (abrir menu, abrir
 * diálogo, marcar caixa). Para isso, `bun run playground`.
 *
 * Roda com `bun run estatico`.
 */

import { renderToStaticMarkup } from "react-dom/server";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { $ } from "bun";
import { TipProvider } from "../src/index";
import { App } from "../playground/src/App";

const root = new URL("..", import.meta.url).pathname;

const markup = renderToStaticMarkup(
  <TipProvider>
    <App />
  </TipProvider>,
);

// O CSS vem do mesmo ponto de entrada do playground, compilado pelo Tailwind.
const out = join(mkdtempSync(join(tmpdir(), "voga-")), "estatico.css");
await $`bunx @tailwindcss/cli -i playground/src/app.css -o ${out} --minify`.cwd(root).quiet();
const css = readFileSync(out, "utf8");

const html = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Voga — design system</title>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Onest:wght@400..800&family=Martian+Mono:wght@400;500&display=swap">
<style>${css}</style>
</head>
<body>
${markup}
<script>
(function () {
  var KEY = "voga-theme";
  var root = document.documentElement;
  var items = Array.prototype.slice.call(document.querySelectorAll('[aria-label="Tema"] .voga-seg__item'));
  var order = ["light", "system", "dark"];

  function paint(theme) {
    items.forEach(function (el, i) {
      var on = order[i] === theme;
      el.setAttribute("data-state", on ? "on" : "off");
      el.setAttribute("aria-pressed", String(on));
    });
  }

  function apply(theme) {
    if (theme === "system") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", theme);
    paint(theme);
    try { localStorage.setItem(KEY, theme); } catch (e) {}
  }

  var saved = "system";
  try {
    var v = localStorage.getItem(KEY);
    if (v === "light" || v === "dark" || v === "system") saved = v;
  } catch (e) {}
  apply(saved);
  items.forEach(function (el, i) {
    el.addEventListener("click", function () { apply(order[i]); });
  });

  // Foco só de teclado, igual ao trackPointer() do pacote.
  root.setAttribute("data-pointer", "");
  document.addEventListener("pointerdown", function () { root.setAttribute("data-pointer", ""); }, true);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Tab" || e.key.indexOf("Arrow") === 0 || e.key === "Home" || e.key === "End") {
      root.removeAttribute("data-pointer");
    }
  }, true);
})();
</script>
</body>
</html>
`;

const dest = join(root, "playground/estatico.html");
writeFileSync(dest, html);
console.log(
  `\n  playground/estatico.html — ${(html.length / 1024).toFixed(0)} KB, ${(css.length / 1024).toFixed(0)} KB de CSS`,
);
console.log("  abre com duplo clique, sem instalar nada\n");
