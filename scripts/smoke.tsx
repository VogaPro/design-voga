/**
 * Smoke test: renderiza o playground inteiro no servidor. Se qualquer
 * componente lançar, montar hook fora de lugar ou receber prop inválida, isto
 * quebra — e quebra antes de abrir o navegador. Roda com `bun run smoke`.
 *
 * Importante: o App importa de `@voga/ui`, que resolve para `dist/`. Então o
 * script `smoke` builda antes — ele testa o que o consumidor recebe, não o
 * fonte. O playground (Vite) aponta para o fonte; os dois caminhos são cobertos.
 */

import { renderToStaticMarkup } from "react-dom/server";
import { TipProvider } from "../src/index";
import { App } from "../playground/src/App";

const warnings: string[] = [];
const realError = console.error;
const realWarn = console.warn;
console.error = (...args: unknown[]) => warnings.push(args.map(String).join(" "));
console.warn = (...args: unknown[]) => warnings.push(args.map(String).join(" "));

let html = "";
try {
  html = renderToStaticMarkup(
    <TipProvider>
      <App />
    </TipProvider>,
  );
} finally {
  console.error = realError;
  console.warn = realWarn;
}

const checks: [string, boolean][] = [
  ["renderizou markup", html.length > 5000],
  ["botão primário presente", html.includes("voga-btn--primary")],
  ["campo com erro marcado", html.includes('aria-invalid="true"')],
  ["ajuda do campo conectada", html.includes('aria-describedby="pg-nome-desc"')],
  ["chip de atenção presente", html.includes("voga-chip--attention")],
  ["aviso presente", html.includes("voga-note--danger")],
  ["abas presentes", html.includes("voga-tabs__item")],
  ["segmentado presente", html.includes("voga-seg__item")],
  ["chave presente", html.includes("voga-switch__thumb")],
  ["caixa de marcar presente", html.includes("voga-check")],
  ["select presente", html.includes("voga-select")],
  ["avatar de marca presente", html.includes("voga-avatar--mark")],
  ["esqueleto presente", html.includes("voga-skeleton")],
  ["girador com papel de status", html.includes('role="status"')],
  ["composer presente", html.includes("voga-composer")],
  ["barra de ferramentas presente", html.includes("voga-toolbar")],
  ["botão de ícone tem rótulo", html.includes('aria-label="Mais opções"')],
  ["poço presente", html.includes("voga-well")],
  ["kbd presente", html.includes("voga-kbd")],
  // Peças de navegação e estrutura
  ["trilha presente", html.includes("voga-crumbs")],
  ["paginação presente", html.includes("voga-pages")],
  ["barra de menus presente", html.includes("voga-menubar")],
  ["menu de navegação presente", html.includes("voga-nav__trigger")],
  ["barra lateral presente", html.includes("voga-sidebar__item")],
  ["item de lista presente", html.includes("voga-item__title")],
  ["vazio presente", html.includes("voga-empty__title")],
  ["grupo de botões presente", html.includes("voga-btngroup")],
  // Dados e medida
  ["tabela presente", html.includes("voga-table")],
  ["medidor presente", html.includes("voga-meter__bar")],
  ["passos presentes", html.includes("voga-steps__bar")],
  ["deslizador presente", html.includes("voga-slider__thumb")],
  ["rádio presente", html.includes("voga-radio__dot")],
  ["cartão de escolha presente", html.includes("voga-choice__title")],
  ["grupo de campo presente", html.includes("voga-ingroup")],
  ["código de verificação presente", html.includes("voga-code__slot")],
  ["alternador presente", html.includes("voga-toggle")],
  ["carrossel presente", html.includes("voga-carousel__track")],
  ["área de rolagem presente", html.includes("voga-scroll__viewport")],
  ["proporção presente", html.includes("voga-ratio")],
  ["painéis presentes", html.includes("voga-handle")],
  ["texto corrido presente", html.includes("voga-prose")],
  // Sobreposições: o que renderiza fechado ainda deixa o gatilho no HTML
  ["acordeão presente", html.includes("voga-fold__trigger")],
  ["gráfico presente", html.includes("voga-chart")],
  // Acessibilidade que não pode faltar
  ["tabela tem cabeçalho com escopo", html.includes('scope="col"')],
  ["paginação diz onde está", html.includes('aria-current="page"')],
  ["medidor tem papel de progressbar", html.includes('role="progressbar"')],
];

let fails = 0;
console.log("\n\x1b[1mSmoke test — render no servidor\x1b[0m");
for (const [name, pass] of checks) {
  if (pass) console.log(`  \x1b[32m✓\x1b[0m ${name}`);
  else {
    fails++;
    console.log(`  \x1b[31m✗\x1b[0m ${name}`);
  }
}

// React avisa sobre prop inválida, key faltando, hook mal usado. Nada passa.
const real = warnings.filter((w) => !/useLayoutEffect does nothing on the server/.test(w));
if (real.length) {
  fails++;
  console.log(`\n  \x1b[31m✗\x1b[0m ${real.length} aviso(s) do React:`);
  for (const w of real.slice(0, 10)) console.log(`      ${w.slice(0, 220)}`);
} else {
  console.log(`  \x1b[32m✓\x1b[0m nenhum aviso do React`);
}

console.log(
  `\n\x1b[1mResumo\x1b[0m  ${fails === 0 ? "\x1b[32m" : "\x1b[31m"}${fails} falha(s)\x1b[0m · ${html.length.toLocaleString("pt-BR")} caracteres de markup\n`,
);
process.exit(fails > 0 ? 1 : 0);
