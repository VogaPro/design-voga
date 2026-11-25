# Caminho 2 — portar sem a dependência

Para quando o projeto não pode receber o pacote: outro framework (Vue, Svelte,
Angular), server-rendered (Django, Rails, Laravel, PHP), HTML estático, ou uma
política que proíbe dependência de git.

A boa notícia: **o visual do Voga é CSS puro**. Os componentes React só aplicam
classes. Portar é copiar CSS e reescrever a camada de comportamento no framework
do projeto.

## 1. Copiar o CSS

Os arquivos estão em `assets/` desta skill. Copie todos para o projeto, mantendo
os nomes, e crie o ponto de entrada:

```
styles/
├── index.css              ← o ponto de entrada (abaixo)
├── tokens.css             ← TODO valor de cor, espaço, régua, forma, movimento
├── theme.css              ← ponte Tailwind v4. Pule se o projeto não usa Tailwind
├── base.css               ← reset leve, tipografia base, foco só de teclado
├── components.css         ← botão, campo, card, chip, aviso, menu, diálogo, dica
├── components-overlay.css ← popover, painel, gaveta, paleta, torrada, dobra
├── components-nav.css     ← trilha, paginação, barra de menus, barra lateral
└── components-data.css    ← tabela, medidor, deslizador, rádio, calendário, gráfico
```

```css
/* styles/index.css */
@import "./tokens.css";
@import "./theme.css";      /* só com Tailwind v4 */
@import "./base.css";
@import "./components.css";
@import "./components-overlay.css";
@import "./components-nav.css";
@import "./components-data.css";
```

### Sem Tailwind

Pule `theme.css` inteiro. Ele só existe para gerar utilitários; nenhum componente
depende dele.

Em `base.css` há um `@layer base { … }`. Sem Tailwind, camadas sem nada declarado
antes funcionam, mas **CSS sem camada vence CSS em camada** — então o reset do seu
projeto pode ganhar do `base.css`. Se o `body` sair com a fonte errada, repita as
declarações fora da camada:

```css
body {
  background: var(--voga-bg);
  color: var(--voga-ink);
  font-family: var(--voga-font-sans);
  font-size: var(--voga-text-base);
  line-height: 22px;
  font-feature-settings: "ss01", "tnum";
}
```

### Sem suporte a `@import` no pipeline

Concatene na ordem acima. A ordem **não** é negociável: `tokens` antes de tudo,
porque todo o resto só lê `var()`.

## 2. As fontes

```html
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Onest:wght@400..800&family=Martian+Mono:wght@400;500&display=swap">
```

Se o projeto não pode buscar fonte externa, as duas são OFL: baixe os `.woff2` e
sirva local com `@font-face`. Mantenha os nomes das famílias — `tokens.css` as
referencia por nome. Se trocar de fonte, remeça `--voga-cap-mid`/`--voga-cap-top`
se você usa alinhamento óptico.

## 3. Tema e foco — 16 linhas de JavaScript

Isto é tudo que a camada de comportamento precisa para o sistema funcionar, em
qualquer stack:

```html
<script>
(function () {
  var root = document.documentElement;

  // Tema: [data-theme] no <html>. Sem atributo = segue o sistema.
  try {
    var t = localStorage.getItem("voga-theme");
    if (t === "light" || t === "dark") root.setAttribute("data-theme", t);
  } catch (e) { /* janela privada */ }

  // Foco só de teclado: a marca sai na primeira tecla que move o foco.
  root.setAttribute("data-pointer", "");
  document.addEventListener("pointerdown", function () {
    root.setAttribute("data-pointer", "");
  }, true);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Tab" || e.key.indexOf("Arrow") === 0 || e.key === "Home" || e.key === "End") {
      root.removeAttribute("data-pointer");
    }
  }, true);
})();
</script>
```

Ponha **inline no `<head>`**, antes do CSS. Se rodar depois, o primeiro paint
pisca o tema errado e acende o anel de foco sem motivo.

Para trocar o tema em runtime: `setAttribute("data-theme", "dark")`,
`"light"`, ou `removeAttribute("data-theme")` para voltar ao sistema. Grave em
`localStorage` com a chave `voga-theme`.

## 4. Markup — o contrato das classes

Cada componente é uma classe raiz mais partes com `__`, e variações com `--`.
Abra o CSS correspondente e leia os seletores; eles são o contrato.

```html
<!-- Botão: a régua está na classe raiz; a variante pinta -->
<button class="voga-btn voga-btn--primary">Salvar alterações</button>
<button class="voga-btn voga-btn--default voga-btn--sm">Secundário</button>
<button class="voga-btn voga-btn--ghost voga-btn--icon" aria-label="Opções">
  <svg class="voga-icon" viewBox="0 0 24 24"><!-- traço 1.6 --></svg>
</button>

<!-- Campo: o Field é só o ritmo; o aria você conecta -->
<div class="voga-field">
  <label class="voga-field__label" for="nome">Nome<span class="voga-field__req"> *</span></label>
  <input class="voga-input" id="nome" aria-describedby="nome-desc">
  <p class="voga-field__help" id="nome-desc">Aparece no cabeçalho.</p>
</div>

<!-- Card: neutro, com o estado num chip -->
<div class="voga-card">
  <div class="voga-card__head">
    <h3 class="voga-card__title">Equipe</h3>
    <p class="voga-card__desc">Quem pode publicar.</p>
  </div>
  <div class="voga-card__body">…</div>
  <div class="voga-card__foot">…</div>
</div>

<span class="voga-chip voga-chip--ok">publicado</span>
```

Estados que o CSS lê por atributo — o mesmo vocabulário do Radix, para o markup
não mudar se um dia o projeto adotar o pacote:

| Atributo | Onde |
|---|---|
| `data-state="checked" \| "unchecked" \| "indeterminate"` | caixa de marcar, chave, rádio |
| `data-state="on" \| "off"` | item de segmentado, alternador |
| `data-state="active"` / `aria-selected="true"` | aba |
| `data-state="open" \| "closed"` | diálogo, menu, dobra, painel |
| `data-highlighted` | item de menu sob o teclado |
| `data-disabled` | qualquer controle desligado |
| `aria-current="page"` | item da barra lateral, página atual na paginação |
| `aria-invalid="true"` | campo com erro |

## 5. Comportamento: o que você precisa escrever

O CSS cobre o visual inteiro. Falta o comportamento acessível, que no pacote vem do
Radix. Por ordem de importância:

1. **Foco preso e `Esc`** em diálogo, painel e gaveta. Devolva o foco ao gatilho
   ao fechar.
2. **Navegação por seta** em menu, select, segmentado, abas e paleta. `Home`/`End`
   para as pontas.
3. **Posicionamento** de popover e menu: vire de lado quando não couber. O CSS usa
   `--radix-popper-available-height`; sem Radix, defina a sua própria variável
   equivalente com a altura disponível medida, ou tire a linha de `max-height`.
4. **`aria-expanded`**, `aria-controls` e `role` corretos em cada gatilho.

Atalho honesto: a maioria dos frameworks tem um equivalente headless —
**Vue** → Reka UI ou Headless UI · **Svelte** → Melt UI ou Bits UI ·
**Angular** → Angular CDK · **HTML puro** → Floating UI para posicionamento, e
`<dialog>` nativo para modal (ele já traz foco preso e `Esc`).

Use o headless do framework e aplique as classes `voga-`. Não reescreva
acessibilidade à mão se houver biblioteca.

## 6. Conferir

Copie `scripts/audit.ts` e `scripts/color.ts` desta skill, ajuste os caminhos no
topo do `audit.ts` para onde seu CSS ficou, e rode. Ele mede contraste nos dois
temas, paridade de tema escuro e ausência de cor crua. Detalhes em
`auditar.md`.
