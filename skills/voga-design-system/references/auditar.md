# Medir contraste e consistência

Um design system que ninguém mede vira opinião. O auditor existe para transformar
as regras em checagens que falham.

## Rodar

Copie `scripts/audit.ts` e `scripts/color.ts` desta skill para o projeto e rode:

```bash
bun scripts/audit.ts
# ou, sem bun:
npx tsx scripts/audit.ts
```

Saída: cada checagem com ✓, ! (aviso) ou ✗ (falha), e o código de saída é 1 se
houver falha — então dá para pôr no CI direto.

Se o CSS do projeto está em outro lugar, ajuste no topo do `audit.ts`:

```ts
const CSS_COMPONENTES = [
  "src/styles/components.css",
  "src/styles/components-overlay.css",
  "src/styles/components-nav.css",
  "src/styles/components-data.css",
];
```

## O que ele mede, e por quê

### 1. Contraste WCAG 2.1 nos dois temas

`color.ts` converte OKLCH → sRGB → luminância **sem dependência nenhuma**, segue
`var()` e `color-mix(in oklab, …)` até o valor concreto, entende hex, e compõe alfa
sobre o fundo certo. Texto normal pede 4.5:1; borda de controle e anel de foco
pedem 3:1.

A lista de pares está em `PAIRS`, dentro do `audit.ts`. **Ela é a parte que você
mantém**: se criar uma combinação nova (uma cor de texto sobre uma face nova),
adicione o par ali. O que não está na lista não é medido.

```ts
const PAIRS: Pair[] = [
  { fg: "--voga-ink", on: "--voga-bg", min: 4.5, what: "texto principal no fundo" },
  { fg: "--voga-line-strong", on: "--voga-raised", min: 3, what: "borda de controle no card" },
  // o seu par novo entra aqui
];
```

### 2. Paridade do tema escuro

Os dois blocos escuros — `:root[data-theme="dark"]` e o `@media` — têm de declarar
os mesmos tokens com os mesmos valores. E nenhum token pode **nascer** dentro de um
bloco de tema: isso é o bug clássico de página ilegível, em que a cor existe num
tema e o outro renderiza texto de um sobre fundo do outro.

### 3. Cor crua no CSS dos componentes

Nenhum `#hex`, `rgb()`, `hsl()` ou `oklch()` literal passa no CSS dos componentes.
Valor de cor só existe em `tokens.css`. Exceção única e explícita: dentro de
`mask-image`, preto e transparente são estêncil de opacidade, não cor de tema.

### 4. Cobertura da ponte Tailwind

Todo token de cor público tem utilitário; a ponte usa `@theme inline` (sem isso,
trocar `[data-theme]` exigiria rebuild); e a variante `dark:` cobre preferência do
sistema **e** `[data-theme]`.

### 5. Classe órfã, nos dois sentidos

Toda classe `voga-` do CSS é aplicada por algum componente (ou está na lista de
utilidades públicas), e toda classe que os componentes aplicam existe no CSS. Pega
tanto CSS morto quanto classe com erro de digitação.

### 6. Independência do Tailwind

Nenhum componente aplica classe que não seja `voga-`. Se um utilitário do Tailwind
escapar para dentro de um componente, o pacote deixa de funcionar sem Tailwind — e
essa é a promessa.

### 7. Acessibilidade e movimento

Movimento desligado com `prefers-reduced-motion`; toda regra que **desenha** anel
carrega a guarda `html:not([data-pointer])`; nenhum componente desenha `outline`
próprio; controle compacto cresce até o alvo de toque em ponteiro grosso.

## O que o auditor NÃO cobre

Seja honesto sobre os buracos quando reportar:

- **Nenhum teste de interação.** Abrir menu, navegar por seta, fechar com `Esc`,
  foco preso no modal — isso é o primitivo, e confiamos nele sem testar. Quem
  quiser cobrir: `@testing-library/react`.
- **Nenhuma comparação visual.** Uma sombra que sumiu passa.
- **`axe` não roda.** O auditor verifica as regras que nós escrevemos, não o
  catálogo completo de WCAG.
- **Contraste só dos pares listados.**
- **APCA não é usado.** WCAG 2.1 é o que os clientes pedem, mas mede mal cores
  saturadas.

## Smoke test: o complemento que pega o que o typecheck não pega

`scripts/smoke.tsx` renderiza o playground inteiro no servidor com
`renderToStaticMarkup` e falha se qualquer componente lançar, montar hook fora de
lugar ou receber prop inválida — e falha também em qualquer aviso do React.

Vale replicar no projeto novo. No Voga, foi o smoke que pegou `Button asChild`
lançando exceção (o `Slot` do Radix recebia três filhos e não sabia qual era o
alvo), com o typecheck passando limpo.

## Paleta de gráfico

Cor de série é um caso separado, porque ali a cor **é** a identidade. A paleta do
Voga tem oito séries em ordem fixa, nunca ciclada, e foi medida com o validador do
skill `dataviz`:

```bash
node scripts/validate_palette.js "<hex,hex,…>" --mode light
node scripts/validate_palette.js "<hex,hex,…>" --mode dark
```

Checagens: faixa de lightness, piso de croma, separação entre vizinhos sob
protanopia/deuteranopia/tritanopia, piso de visão normal e contraste 3:1 contra a
superfície.

A pior vizinhança da paleta do Voga cai na banda em que a cor sozinha não basta —
por isso `Chart` **sempre** desenha legenda a partir de duas séries e deixa 2px de
superfície entre marcas. Se você trocar a paleta, rode o validador de novo: três
das minhas cinco tentativas falharam, e nenhuma delas parecia errada a olho.
