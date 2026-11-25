/**
 * Auditor do design system. Roda com `bun run audit`.
 *
 * Verifica, nos dois temas:
 *   1. contraste de todo par de cor que o sistema usa de verdade
 *   2. paridade do tema escuro (bloco [data-theme] vs bloco @media)
 *   3. cor crua em components.css — nenhum componente deve conhecer um valor
 *   4. cobertura da ponte Tailwind
 *   5. toda classe `voga-` usada por algum componente, e vice-versa
 *   6. todo componente exportado pelo index
 */

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { contrast, mixOklab, oklchToRgb, over, parseHex, parseOklch, type Rgb } from "./color";

const root = new URL("..", import.meta.url).pathname;
const read = (p: string) => readFileSync(join(root, p), "utf8");

const tokensCss = read("src/styles/tokens.css");
const themeCss = read("src/styles/theme.css");
// Todo o CSS de componente, nos quatro arquivos.
const CSS_COMPONENTES = [
  "src/styles/components.css",
  "src/styles/components-overlay.css",
  "src/styles/components-nav.css",
  "src/styles/components-data.css",
];
const componentsCss = CSS_COMPONENTES.map(read).join("\n");
const baseCss = read("src/styles/base.css");

/*
 * Num projeto portado (sem React) não existe `src/components` nem `src/index.ts`.
 * As checagens que dependem deles se desligam, em vez de derrubar o auditor — o
 * que importa ali é contraste, paridade de tema e ausência de cor crua.
 */
const temReact = existsSync(join(root, "src/components")) && existsSync(join(root, "src/index.ts"));
const componentFiles = temReact
  ? readdirSync(join(root, "src/components")).filter((f) => f.endsWith(".tsx"))
  : [];
// Os subcaminhos opcionais também são código do pacote e seguem as mesmas regras.
const SUBCAMINHOS = ["src/chart/index.tsx", "src/form/index.tsx", "src/data-table/index.tsx"].filter((f) =>
  existsSync(join(root, f)),
);
const componentSource = [
  ...componentFiles.map((f) => read(`src/components/${f}`)),
  ...SUBCAMINHOS.map(read),
].join("\n");
const indexTs = temReact ? read("src/index.ts") : "";
const allTsx = componentSource + indexTs;

let fails = 0;
let warns = 0;
const section = (name: string) => console.log(`\n\x1b[1m${name}\x1b[0m`);
const ok = (msg: string) => console.log(`  \x1b[32m✓\x1b[0m ${msg}`);
const fail = (msg: string) => {
  fails++;
  console.log(`  \x1b[31m✗\x1b[0m ${msg}`);
};
const warn = (msg: string) => {
  warns++;
  console.log(`  \x1b[33m!\x1b[0m ${msg}`);
};

/* ──────────────────────────────────────────────────────────────────────────
   Resolve os tokens de cor de um bloco CSS, seguindo var() e color-mix().
   ────────────────────────────────────────────────────────────────────────── */

type Block = Record<string, string>;

function blockOf(css: string, startRe: RegExp): Block {
  const start = css.search(startRe);
  if (start < 0) throw new Error(`bloco não encontrado: ${startRe}`);
  const open = css.indexOf("{", start);
  let depth = 0;
  let i = open;
  for (; i < css.length; i++) {
    if (css[i] === "{") depth++;
    else if (css[i] === "}") {
      depth--;
      if (depth === 0) break;
    }
  }
  const body = css.slice(open + 1, i);
  const out: Block = {};
  for (const m of body.matchAll(/(--voga-[\w-]+)\s*:\s*([^;]+);/g)) {
    out[m[1]!] = m[2]!.trim();
  }
  return out;
}

const shared = blockOf(tokensCss, /^:root \{$/m);
const light = blockOf(tokensCss, /^:root,\n:root\[data-theme="light"\] \{/m);
const darkAttr = blockOf(tokensCss, /^:root\[data-theme="dark"\] \{/m);
const darkMedia = blockOf(tokensCss, /^\s*:root:not\(\[data-theme="light"\]\) \{/m);

/** Resolve um token até uma cor concreta. Devolve [L,C,H,a] em oklch. */
function resolve(name: string, block: Block, depth = 0): [number, number, number, number] | null {
  if (depth > 12) return null;
  const raw = block[name] ?? shared[name];
  if (raw === undefined) return null;

  const direct = parseOklch(raw);
  if (direct) return [direct.L, direct.C, direct.H, direct.a];

  const varOnly = raw.match(/^var\((--voga-[\w-]+)\)$/);
  if (varOnly) return resolve(varOnly[1]!, block, depth + 1);

  const mix = raw.match(
    /^color-mix\(in oklab,\s*var\((--voga-[\w-]+)\)\s+([\d.]+)%,\s*var\((--voga-[\w-]+)\)\s*\)$/,
  );
  if (mix) {
    const a = resolve(mix[1]!, block, depth + 1);
    const b = resolve(mix[3]!, block, depth + 1);
    if (!a || !b) return null;
    const [L, C, H, al] = mixOklab(a, b, Number(mix[2]));
    return [L!, C!, H!, al!];
  }

  return null;
}

function rgbOf(name: string, block: Block, bgName?: string): Rgb | null {
  // Alguns tokens são hex por natureza (a série de gráfico vive em sRGB, onde
  // o validador de paleta do dataviz a mediu).
  const raw = block[name] ?? shared[name];
  if (raw) {
    const hex = parseHex(raw);
    if (hex) return hex;
  }
  const c = resolve(name, block);
  if (!c) return null;
  const color = oklchToRgb(c[0], c[1], c[2], c[3]);
  if (c[3] >= 1) return color;
  if (!bgName) return null;
  const bg = rgbOf(bgName, block);
  return bg ? over(color, bg) : null;
}

/* ──────────────────────────────────────────────────────────────────────────
   1. Contraste
   ────────────────────────────────────────────────────────────────────────── */

type Pair = { fg: string; on: string; min: number; what: string };

const PAIRS: Pair[] = [
  // Texto normal — AA pede 4.5:1
  { fg: "--voga-ink", on: "--voga-bg", min: 4.5, what: "texto principal no fundo" },
  { fg: "--voga-ink", on: "--voga-raised", min: 4.5, what: "texto principal no card" },
  { fg: "--voga-ink", on: "--voga-pane", min: 4.5, what: "texto principal na área de trabalho" },
  { fg: "--voga-ink", on: "--voga-sunken", min: 4.5, what: "texto principal no poço" },
  { fg: "--voga-ink", on: "--voga-side", min: 4.5, what: "texto principal na barra lateral" },
  { fg: "--voga-ink-2", on: "--voga-raised", min: 4.5, what: "corpo de texto no card" },
  { fg: "--voga-muted", on: "--voga-bg", min: 4.5, what: "texto secundário no fundo" },
  { fg: "--voga-muted", on: "--voga-raised", min: 4.5, what: "texto secundário no card" },
  { fg: "--voga-muted", on: "--voga-sunken", min: 4.5, what: "texto secundário no poço" },
  { fg: "--voga-faint", on: "--voga-bg", min: 4.5, what: "metadado no fundo" },
  { fg: "--voga-faint", on: "--voga-raised", min: 4.5, what: "metadado no card" },
  { fg: "--voga-faint", on: "--voga-chosen-bg", min: 4.5, what: "metadado na face escolhida" },
  { fg: "--voga-on-action", on: "--voga-action", min: 4.5, what: "texto do botão primário" },
  { fg: "--voga-on-accent", on: "--voga-accent", min: 4.5, what: "texto sobre o acento" },
  { fg: "--voga-on-warn", on: "--voga-warn", min: 4.5, what: "texto sobre o âmbar" },
  { fg: "--voga-accent", on: "--voga-raised", min: 4.5, what: "acento como texto no card" },
  { fg: "--voga-accent", on: "--voga-accent-soft", min: 4.5, what: "chip de acento" },
  { fg: "--voga-ok", on: "--voga-raised", min: 4.5, what: "sucesso como texto" },
  { fg: "--voga-warn", on: "--voga-warn-soft", min: 4.5, what: "chip de atenção" },
  { fg: "--voga-warn", on: "--voga-raised", min: 4.5, what: "atenção como texto" },
  { fg: "--voga-danger", on: "--voga-raised", min: 4.5, what: "erro como texto" },
  { fg: "--voga-danger", on: "--voga-danger-soft", min: 4.5, what: "chip de erro" },
  { fg: "--voga-info", on: "--voga-raised", min: 4.5, what: "informação como texto" },
  { fg: "--voga-info", on: "--voga-info-soft", min: 4.5, what: "chip de informação" },
  { fg: "--voga-bg", on: "--voga-ink", min: 4.5, what: "texto da dica (invertido)" },
  // Não-texto — AA pede 3:1
  { fg: "--voga-line-strong", on: "--voga-bg", min: 3, what: "borda de controle no fundo" },
  { fg: "--voga-line-strong", on: "--voga-raised", min: 3, what: "borda de controle no card" },
  { fg: "--voga-focus-color", on: "--voga-bg", min: 3, what: "anel de foco no fundo" },
  { fg: "--voga-focus-color", on: "--voga-raised", min: 3, what: "anel de foco no card" },
  { fg: "--voga-accent", on: "--voga-raised", min: 3, what: "avatar de marca no card" },
  // Série de gráfico: marca não-textual sobre a face do card.
  ...Array.from({ length: 8 }, (_, i) => ({
    fg: `--voga-series-${i + 1}`,
    on: "--voga-raised",
    min: 3,
    what: `série ${i + 1} do gráfico no card`,
  })),
];

section("1. Contraste WCAG 2.1");
for (const [themeName, block] of [
  ["claro", light],
  ["escuro", darkAttr],
] as const) {
  console.log(`  \x1b[2m── tema ${themeName}\x1b[0m`);
  for (const p of PAIRS) {
    const fg = rgbOf(p.fg, block, p.on);
    const bg = rgbOf(p.on, block, p.on === "--voga-bg" ? undefined : "--voga-bg");
    if (!fg || !bg) {
      warn(`${p.what}: não deu para resolver ${p.fg} sobre ${p.on}`);
      continue;
    }
    const ratio = contrast(fg, bg);
    const label = `${p.what} — ${ratio.toFixed(2)}:1 (pede ${p.min})`;
    if (ratio >= p.min) ok(label);
    else fail(label);
  }
}

/* ──────────────────────────────────────────────────────────────────────────
   2. Paridade do tema escuro
   ────────────────────────────────────────────────────────────────────────── */

section("2. Paridade do tema escuro");
{
  const a = Object.keys(darkAttr).sort();
  const b = Object.keys(darkMedia).sort();
  const onlyAttr = a.filter((k) => !(k in darkMedia));
  const onlyMedia = b.filter((k) => !(k in darkAttr));
  if (onlyAttr.length) fail(`só em [data-theme="dark"]: ${onlyAttr.join(", ")}`);
  if (onlyMedia.length) fail(`só no @media: ${onlyMedia.join(", ")}`);
  const diff = a.filter((k) => k in darkMedia && darkAttr[k] !== darkMedia[k]);
  if (diff.length) fail(`valor diferente nos dois blocos escuros: ${diff.join(", ")}`);
  if (!onlyAttr.length && !onlyMedia.length && !diff.length) {
    ok(`os dois blocos escuros declaram os mesmos ${a.length} tokens, com os mesmos valores`);
  }

  // Todo token de cor do claro precisa de um par no escuro.
  const COLORISH = /^--voga-(bg|pane|raised|raised-2|sunken|side|side-hover|side-chosen|glass|glass-solid|line|line-2|line-strong|ink|ink-2|muted|faint|plate|plate-soft|accent|accent-2|accent-soft|on-accent|ok|warn|warn-soft|on-warn|danger|danger-soft|info|info-soft|e1|e2|e3|top|scrim|chosen-bg|chosen-press)$/;
  const missing = Object.keys(light).filter((k) => COLORISH.test(k) && !(k in darkAttr));
  if (missing.length) fail(`sem redefinição no escuro: ${missing.join(", ")}`);
  else ok("todo token de cor do claro tem par no escuro");

  // Nenhum token pode nascer dentro de um bloco de tema.
  const bornInDark = Object.keys(darkAttr).filter((k) => !(k in light) && !(k in shared));
  if (bornInDark.length) fail(`nasce só no escuro (bug clássico de página ilegível): ${bornInDark.join(", ")}`);
  else ok("nenhum token nasce dentro de um bloco de tema");
}

/* ──────────────────────────────────────────────────────────────────────────
   3. Cor crua nos componentes
   ────────────────────────────────────────────────────────────────────────── */

section("3. Cor crua no CSS dos componentes");
{
  const offenders: string[] = [];
  for (const file of CSS_COMPONENTES) {
    read(file).split("\n").forEach((line, i) => {
      if (/^\s*(\/\*|\*)/.test(line)) return;
      // Em `mask-image`, preto e transparente são estêncil de opacidade — opaco
      // e vazado —, não cor de tema. A regra de cor não se aplica.
      if (/mask-image/.test(line)) return;
      const colors = line.match(/#[0-9a-f]{3,8}\b|\brgba?\(|\bhsla?\(|\boklch\(/gi) ?? [];
      if (colors.length) offenders.push(`${file}:${i + 1}: ${line.trim().slice(0, 80)}`);
    });
  }
  if (offenders.length) {
    for (const o of offenders) fail(o);
  } else {
    ok("nenhum valor de cor literal — todo componente lê tokens");
  }
}

/* ──────────────────────────────────────────────────────────────────────────
   4. Ponte Tailwind
   ────────────────────────────────────────────────────────────────────────── */

section("4. Cobertura da ponte Tailwind");
{
  // Tokens que de propósito não viram utilitário.
  const SKIP = new Set([
    "--voga-side-hover",
    "--voga-side-chosen",
    "--voga-glass-solid",
    "--voga-action-grad",
    "--voga-chosen-bg",
    "--voga-chosen-press",
    "--voga-chosen-shadow",
    "--voga-focus-color",
    "--voga-focus-ring",
    "--voga-focus-ring-inset",
    "--voga-top",
    "--voga-overlay",
    "--voga-success",
    "--voga-surface",
    "--voga-surface-raised",
    "--voga-surface-sunken",
  ]);
  const colorTokens = Object.keys(light).filter((k) =>
    /^--voga-(bg|pane|raised|raised-2|sunken|side|glass|line|line-2|line-strong|ink|ink-2|muted|faint|plate|plate-soft|accent|accent-2|accent-soft|on-accent|ok|warn|warn-soft|on-warn|danger|danger-soft|info|info-soft|scrim)$/.test(k),
  );
  const roleTokens = ["--voga-action", "--voga-on-action", "--voga-attention", "--voga-attention-soft"];
  const missing = [...colorTokens, ...roleTokens].filter(
    (k) => !SKIP.has(k) && !themeCss.includes(`var(${k})`),
  );
  if (missing.length) fail(`sem utilitário na ponte: ${missing.join(", ")}`);
  else ok(`os ${colorTokens.length + roleTokens.length} tokens de cor públicos têm utilitário`);

  if (!themeCss.includes("@theme inline")) fail("a ponte não usa `@theme inline` — trocar tema exigiria rebuild");
  else ok("a ponte usa `@theme inline`: trocar [data-theme] re-tematiza em runtime");

  if (!themeCss.includes("@custom-variant dark")) fail("sem variante `dark:` própria");
  else if (!themeCss.includes("prefers-color-scheme: dark") || !themeCss.includes('[data-theme="dark"]')) {
    fail("a variante `dark:` não cobre sistema e atributo ao mesmo tempo");
  } else ok("a variante `dark:` cobre preferência do sistema e [data-theme]");
}

/* ──────────────────────────────────────────────────────────────────────────
   5. Classes vs componentes
   ────────────────────────────────────────────────────────────────────────── */

section("5. Classes e componentes");
if (!temReact) {
  ok("sem camada React neste projeto — checagem de classe órfã desligada");
} else {
  const declared = new Set<string>();
  for (const m of componentsCss.matchAll(/\.(voga-[\w-]+)/g)) declared.add(m[1]!);

  const used = new Set<string>();
  // Toda string literal do fonte, partida em palavras: pega "voga-glass voga-menu"
  // tanto quanto "voga-btn", que a versão anterior deste auditor perdia.
  for (const m of allTsx.matchAll(/["'`]([^"'`\n]*)["'`]/g)) {
    for (const word of m[1]!.split(/\s+/)) {
      if (/^voga-[\w-]+$/.test(word)) used.add(word);
    }
  }

  // Classes montadas por template (`voga-btn--${variant}`): expande pelos tipos.
  const EXPANDED = [
    ...["default", "primary", "accent", "danger", "ghost", "link"].map((v) => `voga-btn--${v}`),
    ...["sm", "lg"].map((v) => `voga-btn--${v}`),
    ...["sm", "lg"].map((v) => `voga-input--${v}`),
    ...["attention", "ok", "danger", "info", "accent", "solid"].map((v) => `voga-chip--${v}`),
    ...["info", "ok", "attention", "danger"].map((v) => `voga-note--${v}`),
    ...["sm", "lg"].map((v) => `voga-avatar--${v}`),
    ...["ok", "attention", "danger"].map((v) => `voga-meter--${v}`),
    ...["sm"].map((v) => `voga-toggle--${v}`),
  ];
  for (const c of EXPANDED) used.add(c);

  // Utilidades que o app usa direto, documentadas no README.
  const PUBLIC_UTILS = new Set([
    "voga-chosen",
    "voga-glass",
    "voga-icon",
    "voga-card--flat",
    "voga-card--section",
    "voga-control-row",
    "voga-control-row--split",
    "voga-seg--sm",
    "voga-sep--strong",
    "voga-btn--block",
    "voga-btn--icon",
    "voga-field__req",
    "voga-dialog__close",
    "voga-menu__shortcut",
    "voga-menu__mark",
    "voga-menu__item--indent",
    "voga-menu__item--danger",
    "voga-btn__label",
    "voga-switch__thumb",
    "voga-tip__arrow",
    "voga-card--interactive",
    "voga-textarea",
    "voga-row__main",
    "voga-row__title",
    "voga-row__sub",
    "voga-form",
    "voga-composer",
    "voga-well",
    "voga-eyebrow",
    "voga-meta",
  ]);

  const orphanCss = [...declared].filter((c) => !used.has(c) && !PUBLIC_UTILS.has(c));
  const orphanTsx = [...used].filter((c) => !declared.has(c));

  if (orphanCss.length) warn(`classe no CSS que nenhum componente aplica: ${orphanCss.join(", ")}`);
  else ok("toda classe do CSS é aplicada por um componente ou é utilidade pública");

  if (orphanTsx.length) fail(`classe aplicada sem regra no CSS: ${orphanTsx.join(", ")}`);
  else ok(`as ${used.size} classes que os componentes aplicam todas existem no CSS`);
}

/* ──────────────────────────────────────────────────────────────────────────
   5b. Nenhum componente depende do Tailwind
   ────────────────────────────────────────────────────────────────────────── */

section("5b. Independência do Tailwind");
if (!temReact) {
  ok("sem camada React neste projeto — checagem desligada");
} else {
  // Toda palavra de classe que um componente aplica tem de ser `voga-` (ou uma
  // das poucas utilidades de plataforma). Se um utilitário do Tailwind escapar
  // para cá, o pacote deixa de funcionar sem Tailwind — e essa é a promessa.
  const PLATAFORMA = new Set(["sr-only"]);
  const vazando: string[] = [];
  for (const file of [...componentFiles.map((f) => `src/components/${f}`), ...SUBCAMINHOS]) {
    const src = read(file);
    for (const m of src.matchAll(/className=\{?["'`]([^"'`\n{]+)["'`]/g)) {
      for (const word of m[1]!.split(/\s+/)) {
        if (!word || word.startsWith("voga-") || PLATAFORMA.has(word)) {
          if (word && !word.startsWith("voga-") && !PLATAFORMA.has(word)) vazando.push(`${file}: ${word}`);
          continue;
        }
      }
    }
  }
  if (vazando.length) fail(`classe que não é do pacote: ${[...new Set(vazando)].join(", ")}`);
  else ok("nenhum componente aplica classe de fora do pacote");
}

/* ──────────────────────────────────────────────────────────────────────────
   6. Exports
   ────────────────────────────────────────────────────────────────────────── */

section("6. Exports do pacote");
if (!temReact) {
  ok("sem camada React neste projeto — checagem desligada");
} else {
  const missing: string[] = [];
  for (const file of componentFiles) {
    const src = read(`src/components/${file}`);
    const names = new Set<string>();
    for (const m of src.matchAll(/^export (?:const|function) (\w+)/gm)) names.add(m[1]!);
    for (const name of names) {
      // Um componente interno pode não ser público; só cobramos o que tem nome de peça.
      if (!/^[A-Z]/.test(name)) continue;
      if (!new RegExp(`\\b${name}\\b`).test(indexTs)) missing.push(`${file}: ${name}`);
    }
  }
  if (missing.length) fail(`componente não exportado pelo index: ${missing.join(", ")}`);
  else ok("todo componente com nome de peça é exportado pelo index");

  const files = new Set(componentFiles.map((f) => f.replace(/\.tsx$/, "")));
  const referenced = new Set<string>();
  for (const m of indexTs.matchAll(/from "\.\/components\/([\w-]+)"/g)) referenced.add(m[1]!);
  const unreferenced = [...files].filter((f) => !referenced.has(f));
  if (unreferenced.length) warn(`arquivo de componente que o index não importa: ${unreferenced.join(", ")}`);
  else ok(`os ${files.size} arquivos de componente são todos alcançáveis pelo index`);
}

/* ──────────────────────────────────────────────────────────────────────────
   7. Acessibilidade e movimento
   ────────────────────────────────────────────────────────────────────────── */

section("7. Acessibilidade e movimento");
{
  if (!baseCss.includes("prefers-reduced-motion")) fail("base.css não desliga movimento com prefers-reduced-motion");
  else ok("movimento desligado com prefers-reduced-motion");

  if (!baseCss.includes('html:not([data-pointer])')) fail("anel de foco não está guardado por html:not([data-pointer])");
  else ok("anel de foco só para teclado (guardado por html:not([data-pointer]))");

  // O invariante é: nenhuma regra DESENHA anel sem a guarda. Uma regra que só
  // mexe em z-index ou empilhamento não desenha nada, então não conta.
  const ringRules = [...componentsCss.matchAll(/^([^\n{]*focus-visible[^\n{]*)\{([^}]*)\}/gm)]
    .filter(([, , body]) => /box-shadow|outline/.test(body!))
    .map((m) => m[1]!.trim());
  const unguarded = ringRules.filter((r) => !r.includes("html:not([data-pointer])"));
  if (unguarded.length) fail(`regra de foco sem a guarda de ponteiro: ${unguarded.join(" | ")}`);
  else ok("toda regra de foco nos componentes carrega a guarda");

  // Nada deve desenhar outline do navegador por cima do nosso anel.
  const ownOutline = [...componentsCss.matchAll(/outline:\s*([^;]+);/g)]
    .map((m) => m[1]!.trim())
    .filter((v) => v !== "none");
  if (ownOutline.length) warn(`algum componente desenha outline próprio: ${ownOutline.join(", ")}`);
  else ok("nenhum componente desenha outline próprio");

  // Alvo de toque.
  if (!componentsCss.includes("--voga-touch-target")) warn("alvo de toque não é aplicado em nenhum controle");
  else ok("controles compactos crescem até o alvo de toque em ponteiro grosso");
}

/* ──────────────────────────────────────────────────────────────────────────
   Resumo
   ────────────────────────────────────────────────────────────────────────── */

console.log(
  `\n\x1b[1mResumo\x1b[0m  ${fails === 0 ? "\x1b[32m" : "\x1b[31m"}${fails} falha(s)\x1b[0m · \x1b[33m${warns} aviso(s)\x1b[0m\n`,
);
process.exit(fails > 0 ? 1 : 0);
