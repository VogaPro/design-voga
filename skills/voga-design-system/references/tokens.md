# Tokens

Todo valor do sistema vive em `tokens.css` (em `assets/`). Componente lê **papel**,
nunca valor — é isso que faz tema escuro e rebrand funcionarem sem abrir um `.tsx`.

O arquivo tem quatro blocos, nesta ordem:

1. `:root, :root[data-theme="light"]` — o tema claro **completo**
2. `:root[data-theme="dark"]` — o escuro, por atributo
3. `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) }` — o
   escuro, por preferência do sistema, com **os mesmos valores** do bloco 2
4. `:root` — o que não muda com o tema: papéis, régua, espaço, forma, tipo,
   movimento, camadas

A duplicação dos blocos 2 e 3 é de propósito, e o auditor exige que sejam idênticos.
Sem o bloco 3, quem não escolheu tema (o padrão) nunca vê o escuro. Sem o bloco 2,
o seletor de tema não funciona.

---

## Superfícies — a escada de papel

| Token | Papel |
|---|---|
| `--voga-bg` | Fundo do app |
| `--voga-pane` | Área de trabalho, ao lado da barra lateral |
| `--voga-raised` | Card, diálogo, botão secundário |
| `--voga-raised-2` | O que fica **dentro** de algo elevado: um degrau acima |
| `--voga-sunken` | Trilho de campo, poço, esqueleto, segmentado |
| `--voga-side` | Barra lateral (papel com leve viés frio) |
| `--voga-side-hover` / `--voga-side-chosen` | Linha da barra sob o mouse / aberta |
| `--voga-glass` | Menu, popover, select, dica, torrada, paleta |
| `--voga-glass-solid` | Vidro onde não há `backdrop-filter` |
| `--voga-scrim` | O véu atrás de um modal |

## Linhas

| Token | Papel |
|---|---|
| `--voga-line` | Hairline (separador, anel de elevação) |
| `--voga-line-2` | Separador forte, borda do `e3` |
| `--voga-line-strong` | **Borda de controle e anel de foco — 3:1** |

## Tinta — quatro degraus, e só

| Token | Papel |
|---|---|
| `--voga-ink` | Texto principal **e a ação primária** |
| `--voga-ink-2` | Corpo de texto longo |
| `--voga-muted` | Texto secundário, placeholder |
| `--voga-faint` | Metadado, rótulo de seção (AA nos dois temas) |

## Placas de hover

`--voga-plate` (cinza translúcido ~10%) · `--voga-plate-soft` (~6%). São tinta
translúcida, não superfície — aparecem igual num card e num poço.

## Papéis — use SEMPRE estes nos componentes

| Token | Resolve para | Papel |
|---|---|---|
| `--voga-action` | `ink` | A ação humana. **É tinta, não cor.** |
| `--voga-on-action` | `bg` | Texto sobre a ação |
| `--voga-attention` | `warn` | Só o que espera uma pessoa |
| `--voga-on-attention` / `--voga-attention-soft` | | Texto e face do chip de atenção |
| `--voga-success` | `ok` | Passo concluído, presença |
| `--voga-surface` / `--voga-surface-raised` / `--voga-surface-sunken` | | Apelidos |
| `--voga-focus-color` | `line-strong` | A cor do anel |
| `--voga-focus-ring` | | `0 0 0 1px raised, 0 0 0 3px focus-color` |
| `--voga-focus-ring-inset` | | O mesmo anel por dentro, para linha que a caixa corta |
| `--voga-chosen-bg` / `--voga-chosen-press` / `--voga-chosen-shadow` | | Escolhido: afundado como tecla pressionada |
| `--voga-overlay` | `e3` | |

## Cor reservada

| Token | Regra |
|---|---|
| `--voga-accent`, `--voga-accent-2`, `--voga-accent-soft`, `--voga-on-accent` | **Só** identidade e seleção |
| `--voga-ok` | Discreto: sucesso se diz pelo check |
| `--voga-warn`, `--voga-warn-soft`, `--voga-on-warn` | Só o que espera uma pessoa, em peça pequena |
| `--voga-danger`, `--voga-danger-soft` | Sempre com palavra ou ícone |
| `--voga-info`, `--voga-info-soft` | Informação |

### Rebrand

Troque `--voga-accent`, `--voga-accent-2` e `--voga-accent-soft`. Como a interface
é tinta, o acento quase não aparece — um projeto inteiro muda de identidade com
três valores. Rode o auditor depois: o contraste do acento como texto e no chip
precisa continuar em 4.5:1 nos dois temas.

## Elevação

| Token | Onde |
|---|---|
| `--voga-e1` | Card, botão secundário, item ativo do segmentado |
| `--voga-e2` | Hover de card interativo, composer |
| `--voga-e3` | Vidro, diálogo, composer em foco |
| `--voga-top` | **A luz de 1px no topo de toda superfície elevada** |
| `--voga-gloss` / `--voga-gloss-strong` | O brilho fino do botão primário / de acento |
| `--voga-lift` / `--voga-thumb-lift` | O peso embaixo do botão primário / do polegar |

Sempre junto: `box-shadow: var(--voga-e1), var(--voga-top)`. É a luz no topo que
faz a superfície parecer placa.

## Régua de controle

`--voga-control-h-sm|md|lg` 32/40/48 · `-r-` 10/12/14 · `-px-` 12/14/16 ·
`-fs-` 13/14/15 · `-icon-` 16/18/20 · `--voga-touch-target` 44 ·
`--voga-action-clear` 8.

## Espaço e ritmo

`--voga-space-1|2|3|4|6|8|12|16` = 4/8/12/16/24/32/48/64px.
`--voga-form-gap` (entre campos) · `--voga-field-gap` (rótulo↔controle) ·
`--voga-row-py` (acima e abaixo de uma linha de lista) ·
`--voga-icon-gap-sm|—|lg` 6/8/10 (entre ícone e as palavras que ele lidera).

## Forma

`--voga-radius-xs` 4 · `sm` 6 · `item` 10 · `btn` 12 · `lg` 14 · `xl` 18 ·
`section` 20 · `full`.
`--voga-menu-pad` 6 e `--voga-seg-in` 4 são as **folgas** dos pares concêntricos.

## Tipo

`--voga-font-sans` Onest · `--voga-font-mono` Martian Mono (**só em código**).

Escala em px: `--voga-text-xs` 12 (meta) · `sm` 13 (rótulo) · `md` 14.5
(interface) · `base` 15 (corpo) · `lg` 16 (busca) · `h3` 17 · `h2` 20 (seção) ·
`h1` 28 · `display` 32.

`--voga-track-tight` −0.025em (h2, h3) · `--voga-track-tighter` −0.035em (h1,
display) · `--voga-track-label` +0.08em (rótulo de seção).

A escala é em px porque controle e texto compartilham a mesma régua — em `rem` o
campo de 40px e o texto de 14.5px deixariam de encaixar quando a pessoa muda a
fonte base do navegador.

## Movimento

`--voga-out` `cubic-bezier(.2,.8,.2,1)` — entradas e sombras.
`--voga-spring` `cubic-bezier(.34,1.4,.5,1)` — pressionar, polegar da chave, pílula.
`--voga-drawer` `cubic-bezier(.32,.72,0,1)` — a curva do painel que desliza.
`--voga-dur-fast` 140ms · `-base` 180ms · `-panel` 240ms.

Só entradas animam. Fechar é imediato — animar o fechamento faz a interface
parecer lenta.

## Camadas

`--voga-z-dropdown` 1000 · `-sticky` 1100 · `-overlay` 1200 · `-modal` 1300 ·
`-toast` 1400 · `-tooltip` 1500.

## Série de gráfico

`--voga-series-1` … `--voga-series-8`, em **ordem fixa, nunca ciclada**. Uma nona
série vira "Outros", vira painel pequeno, ou vira outra codificação. São hex de
propósito: a validação delas é feita em sRGB pelo validador do skill `dataviz`.

---

## A ponte Tailwind (opcional)

`theme.css` transforma os papéis em utilitários: `bg-raised`, `text-muted`,
`border-line`, `rounded-btn`, `shadow-e2`, `h-control-md`, `text-h2`,
`tracking-tighter`, `ease-spring`, `bg-series-1`.

O `inline` em `@theme inline` é **obrigatório**: ele mantém o utilitário apontando
para a variável em runtime, então trocar `[data-theme]` re-tematiza sem rebuild.
Sem `inline`, o Tailwind congela o valor no build e o tema escuro para de funcionar
nos utilitários.

Ele também define a variante `dark:` própria, que cobre preferência do sistema
**e** `[data-theme]` — a padrão do Tailwind só cobre a preferência.
