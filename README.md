# Voga — Design System

Tokens + componentes React para usar em **todos** os projetos.
React 18/19 · TypeScript · Radix UI · Tailwind v4 **opcional**.

**O sistema é neutro primeiro.** A interface é tinta sobre papel. A ação primária
é tinta, não cor. Cor é reservada: `accent` só para identidade e seleção,
`attention` (âmbar) só para o que espera uma pessoa. Card é sempre neutro — o
estado vai num chip com ícone, nunca tingindo o fundo.

---

## Instalar

```bash
npm i github:caiosantosxp/design-voga
```

```css
/* app.css */
@import "@voga/ui/styles.css";
```

Com Tailwind v4, importe os dois para ganhar também os utilitários
(`bg-raised`, `text-muted`, `rounded-btn`, `shadow-e2`, `h-control-md`):

```css
@import "tailwindcss";
@import "@voga/ui/styles.css";
```

> Os componentes **não** dependem do Tailwind — o visual deles é CSS de verdade
> com prefixo `voga-`. Nada de `@source` apontando para `node_modules`.

No `<head>`, as fontes e os dois scripts que evitam flash:

```tsx
import { themeScript, pointerScript } from "@voga/ui";

<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Onest:wght@400..800&family=Martian+Mono:wght@400;500&display=swap"
/>
<script dangerouslySetInnerHTML={{ __html: themeScript }} />
<script dangerouslySetInnerHTML={{ __html: pointerScript }} />
```

Next.js também precisa de `transpilePackages: ["@voga/ui"]` no `next.config.ts`.

```tsx
import { Button, Card, CardBody, Chip, Note } from "@voga/ui";
import { Check } from "lucide-react";

<Card>
  <CardBody>
    <Chip tone="ok" icon={Check}>Publicado</Chip>
    <Button variant="primary">Salvar alterações</Button>
  </CardBody>
</Card>
```

---

## As regras

**Cor.** Interface e pessoas usam tinta: `ink` sobre `bg`, `raised`, `sunken`;
texto secundário em `muted`, metadado em `faint`. O botão primário é `action`
com `on-action` — ação humana é tinta.
- `accent` é só identidade e seleção. Nunca pinte nome, menção, botão comum,
  barra ou fundo com ele.
- `attention` (âmbar) só quando algo espera uma pessoa, e sempre em peça pequena
  (chip com ícone, contador) — nunca um card inteiro nem a borda dele.
- `danger` sempre acompanha uma palavra ou um ícone.
- Texto sobre fundo colorido usa o token `on-…`, nunca branco literal.

**Forma.** Pessoas são círculos. A marca é um quadrado com raio a 30% do lado e
**um canto vivo** no inferior esquerdo. Raios: item de menu 10, botão 12,
card 14, composer 18, seção 20. Pílula (`radius-full`) só para etiqueta que não
se pressiona.

**Cantos concêntricos.** Uma coisa arredondada perto da borda de uma caixa
arredondada usa `calc(raio-de-fora − folga)`, nunca o mesmo raio da caixa.

**Régua de controle.** Tudo que se clica ou se digita tem uma de três alturas,
com raio de 30% da altura:

| | altura | raio | lado | texto | ícone | onde |
|---|---|---|---|---|---|---|
| `sm` | 32 | 10 | 12 | 13 | 16 | barras, ações em linha, filtros |
| `md` | 40 | 12 | 14 | 14 | 18 | formulários, página, diálogo, select |
| `lg` | 48 | 14 | 16 | 15 | 20 | só a ação principal de uma tela |

**Tipo.** Onest em toda a interface, com `ss01` e `tnum`. Escala em px:
12 (meta) · 13 (pequeno) · 14.5 (interface) · 15 (corpo) · 16 · 17 · 20 (seção)
· 28 / 32 (página). Martian Mono só em código — nunca em rótulo, metadado ou
botão.

**Profundidade.** `e1` cards e botão secundário · `e2` hover de card
interativo e composer · `e3` vidro (menu, popover, select, dica) e diálogo.
Toda superfície elevada leva a luz de 1px do topo: `box-shadow: var(--voga-e1), var(--voga-top)`.

**Escolhido.** Afundado na página como tecla pressionada (`.voga-chosen`), nunca
um fundo colorido e nunca deslocado.

**Foco.** Só o teclado desenha o anel: 1px da superfície e 2px de cinza em
`line-strong` (3:1). `trackPointer()` marca `<html data-pointer>` em todo
clique, e toda regra de anel começa com `html:not([data-pointer])`.

**Movimento.** `--voga-out` para entradas e sombras, `--voga-spring` para
pressionar e para o polegar da chave. Só entradas animam; fechar é imediato.
Nada anima com `prefers-reduced-motion`.

---

## Arquitetura

| Arquivo | O que é |
|---|---|
| `src/styles/tokens.css` | Todos os tokens: cor (claro/escuro/sistema), espaço, régua, forma, tipo, movimento |
| `src/styles/theme.css` | `@theme inline` → utilitários Tailwind. Opcional |
| `src/styles/base.css` | Reset, tipografia base, foco só de teclado |
| `src/styles/components.css` | O visual dos componentes, prefixo `voga-`. Só lê tokens |
| `src/components/*.tsx` | A lógica e a acessibilidade, em Radix. Aplicam as classes |

Essa separação é o ponto: **nenhum componente conhece uma cor**. Rebrand e dark
mode acontecem em `tokens.css`, sem abrir um `.tsx`.

### Tema

```tsx
import { useTheme } from "@voga/ui";
const { theme, setTheme } = useTheme(); // "light" | "dark" | "system"
```

Por baixo: `[data-theme]` no `<html>`. Sem atributo = segue o sistema.

### Rebrand

Troque `--voga-accent`, `--voga-accent-2` e `--voga-accent-soft` em
`tokens.css`. Como o acento quase não aparece (a interface é tinta), um projeto
inteiro muda de identidade com três valores.

---

## Componentes

Os 57 componentes do shadcn/ui, todos na linguagem do Voga. Onde o nome muda, é
porque o nome do Voga diz melhor o que a peça faz.

| shadcn/ui | Voga | Nota |
|---|---|---|
| Accordion | `Accordion` | |
| Alert | `Note` | barra de 2px na lateral; o fundo fica neutro |
| Alert Dialog | `AlertDialog` | não fecha clicando fora nem com Esc |
| Aspect Ratio | `AspectRatio` | |
| Avatar | `Avatar` | pessoa é círculo; `mark` é o quadrado de canto vivo |
| Badge | `Chip` | etiqueta que não se pressiona, com ícone |
| Breadcrumb | `Breadcrumb` | |
| Button | `Button` | 6 variantes × 3 tamanhos, `icon`, `kbd`, `loading` |
| Button Group | `ButtonGroup`, `SplitButton` | |
| Calendar | `Calendar` | react-day-picker, em pt-BR |
| Card | `Card` + 5 partes | sempre neutro: o estado vai no chip |
| Carousel | `Carousel` | embla; a fileira some do lado que tem mais |
| Chart | `Chart` | `@voga/ui/chart` · paleta de série validada |
| Checkbox | `Checkbox` | o traço se desenha ao marcar |
| Collapsible | `Collapsible` | |
| Combobox | `Combobox` | select com busca |
| Command | `Command`, `CommandDialog` | a paleta ⌘K, em vidro |
| Context Menu | `ContextMenu` | |
| Data Table | `DataTable` | `@voga/ui/data-table` · ordena, busca, pagina |
| Date Picker | `DatePicker` | |
| Dialog | `Dialog` | |
| Drawer | `Drawer` | vaul; gaveta do telefone, com alça |
| Dropdown Menu | `Menu` | |
| Empty | `Empty` | três tamanhos: page, panel, inline |
| Field | `Field` | liga rótulo, ajuda e erro por aria |
| Form | `Form`, `FormField` | `@voga/ui/form` · react-hook-form |
| Hover Card | `HoverCard` | |
| Input | `Input` | |
| Input Group | `InputGroup`, `InputAffix` | prefixo e sufixo no mesmo controle |
| Input OTP | `CodeInput` | |
| Item | `Item` + 5 partes | |
| Kbd | `Kbd` | escondido onde não há teclado |
| Label | `Label` | |
| Menubar | `Menubar` | |
| Navigation Menu | `NavMenu` | |
| Pagination | `Pagination` | com reticências e janela |
| Popover | `Popover` | |
| Progress | `Meter`, `Steps` | trilho de tinta translúcida, com marca |
| Radio Group | `RadioGroup`, `Radio`, `Choice` | `Choice` é o cartão de escolha |
| Resizable | `Panels`, `Pane`, `PaneHandle` | |
| Scroll Area | `ScrollArea` | |
| Select | `Select*` | visual nosso, nunca o nativo |
| Separator | `Separator` | |
| Sheet | `Sheet` | quatro lados |
| Sidebar | `Sidebar`, `Shell` | papel próprio; escolhido é degrau de tinta |
| Skeleton | `Skeleton` | sempre `sunken` |
| Slider | `Slider` | |
| Sonner | `Toaster`, `toast` | |
| Spinner | `Spinner` | |
| Switch | `Switch` | o polegar desliza com mola |
| Table | `Table` + 8 partes | cabeçalho fixo, algarismos tabulares |
| Tabs | `Tabs` | a linha fica embaixo do ativo |
| Textarea | `Textarea` | |
| Toggle | `Toggle` | ligado afunda, não pinta |
| Toggle Group | `Segmented` | pílula que desliza, cantos concêntricos |
| Tooltip | `Tip` | |
| Typography | `Prose` | |

### Além do shadcn

`Composer` (caixa de texto flutuante) · `Well` (poço) · `Rows`/`Row` (lista com
hairline) · `ControlRow` · `Eyebrow` · `Meta` (metadado com algarismos
tabulares) · `Icon` (normaliza qualquer ícone do lucide para a régua) ·
`useTheme` · `trackPointer` · `cn`

### Subcaminhos com peer opcional

Três peças carregam biblioteca grande, então vivem fora do entry principal —
quem não importa não instala:

```ts
import { Chart, ChartTooltip, ChartLegend, seriesColor } from "@voga/ui/chart";       // recharts
import { Form, FormField } from "@voga/ui/form";                                      // react-hook-form
import { DataTable, type ColumnDef } from "@voga/ui/data-table";                       // @tanstack/react-table
```

### Paleta de gráfico

Oito séries em **ordem fixa**, nunca ciclada — uma nona série vira "Outros",
vira painel pequeno, ou vira outra codificação (`seriesColor` lança se você
passar do oitavo). A paleta foi medida nos dois temas: faixa de lightness, piso
de croma, separação sob protanopia/deuteranopia/tritanopia, piso de visão normal
e contraste 3:1 contra a face do card. A pior vizinhança cai na banda em que a
cor sozinha não basta — por isso `Chart` **sempre** desenha legenda a partir de
duas séries e deixa 2px de superfície entre marcas.

---

## Levar para outro projeto — a skill

`skills/voga-design-system/` é uma skill de Claude Code que ensina outra IA a
implementar este sistema em qualquer lugar. Já está instalada em
`~/.claude/skills/`, então vale em todos os seus projetos sem você digitar nada.

Para levar para outra máquina ou outra conta:
`skills/dist/voga-design-system.skill` (56 KB).

A skill cobre três caminhos, e decide sozinha qual é o seu:

| Situação | O que ela faz |
|---|---|
| Projeto React que pode ter a dependência | instala o pacote e configura framework, fontes e provedores |
| Sem a dependência, ou fora do React (Vue, Svelte, Django, HTML puro) | copia o CSS dos `assets/` e escreve as 16 linhas de JS de tema e foco |
| Já tem o Voga e falta uma peça | a receita para a peça nova não destoar |

Ela carrega o CSS completo nos `assets/` e o auditor nos `scripts/` — então
funciona mesmo sem acesso a este repositório. O auditor se degrada sozinho num
projeto portado: desliga as checagens que dependem de React e continua medindo
contraste, paridade de tema e ausência de cor crua.

---

## Ver o sistema localmente

**Interativo** — abre menu, abre diálogo, marca caixa, troca tema:

```bash
bun install
bun run playground      # → http://localhost:5173
```

O Vite aponta `@voga/ui` para `src/`, então editar um componente recarrega a
página na hora.

**De fora da VPS** — https://vmi3764524.contaboserver.net (usuário `caio`, senha
em `/root/.voga-preview-senha`). Republique com `sudo bun run publicar`. Como
está montado, em [`docs/DEPLOY.md`](docs/DEPLOY.md).

**Sem instalar nada** — abra `playground/estatico.html` com duplo clique. Um
arquivo só, CSS embutido, gerado do mesmo `playground/src/App.tsx`. Regenere com
`bun run estatico`.

---

## Verificar

```bash
bun run check           # typecheck + audit + smoke + build do playground
```

| Comando | O que faz |
|---|---|
| `bun run typecheck` | `tsc --noEmit` |
| `bun run audit` | contraste WCAG nos dois temas, paridade de tema, cor crua no CSS, cobertura da ponte Tailwind, classes órfãs, exports, regras de a11y |
| `bun run smoke` | builda e renderiza o playground inteiro no servidor — pega componente que lança, hook fora de lugar, prop inválida |
| `bun run playground:build` | prova que o bundle de produção fecha |

O auditor mede contraste de verdade: `scripts/color.ts` converte OKLCH → sRGB →
luminância sem dependência nenhuma, segue `var()` e `color-mix()`, e compõe alfa
sobre o fundo certo. O relatório da última passada, com o que foi encontrado e o
que **não** é coberto, está em [`docs/AUDITORIA.md`](docs/AUDITORIA.md).

---

## Desenvolver

```bash
bun install
bun run build      # → dist/ (ESM + .d.ts + styles.css)
bun run dev        # watch
```

`dist/` é commitado de propósito: é o que faz `npm i github:...` funcionar sem
build na máquina de quem consome.

---

## Crédito e licença

As **ideias** de linguagem visual aqui — neutro primeiro com cor reservada,
régua de controle de três alturas, elevação `e1/e2/e3` com luz no topo, cantos
concêntricos, escolhido como tecla pressionada, anel de foco só de teclado —
vêm do design system de [agentes.chat](https://github.com/agentes-chat/agentes-chat),
que é AGPL-3.0. **Nenhum código ou arquivo de lá foi copiado**: tokens, CSS e
componentes deste repositório são implementação própria, em OKLCH e com API
própria. Voga é MIT.

## Próximos passos

- [ ] `Popover`, `Toast`, `CommandPalette` (⌘K em vidro), `SplitButton`, `DatePicker`
- [ ] `Table` com cabeçalho fixo e faixa em poço
- [ ] Playground Vite para desenvolver componente isolado
- [ ] Export dos tokens em JSON para Figma Variables
