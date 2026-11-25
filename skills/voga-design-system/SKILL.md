---
name: voga-design-system
description: >-
  Implementa o design system Voga — tokens neutros-primeiro em OKLCH e 57 componentes React
  sobre Radix — em qualquer projeto. Use sempre que aparecer 'Voga', '@voga/ui', 'design-voga',
  'nosso design system', 'tokens voga-', ou um pedido para aplicar, portar, instalar ou estender
  esse sistema. Use TAMBÉM, sem o usuário pedir pelo nome, quando for construir UI, tela,
  formulário, tema, dark mode ou componente novo num projeto que já tenha o Voga instalado — aí
  as regras daqui valem em vez dos defaults do shadcn/ui, do Tailwind ou do Material. E use
  quando o pedido for 'cria um componente que combine com o resto', 'coloca no nosso padrão',
  'deixa igual aos outros projetos', ou auditar contraste e consistência de tema. Cobre os três
  caminhos — instalar o pacote, portar os tokens para um projeto que não pode ter a dependência,
  e criar peças novas que encaixam sem destoar.
---

# Voga — design system

Voga é um sistema **neutro primeiro**: a interface é tinta sobre papel, e a cor é
reservada. Isso não é gosto — é o que faz um rebrand e um tema escuro acontecerem
sem abrir um único componente.

Sua primeira decisão é qual dos três caminhos você está:

| Situação | Caminho | Leia |
|---|---|---|
| Projeto React que pode ter a dependência | **Instalar** | `references/instalar.md` |
| Não pode ter a dependência, ou não é React (Vue, Svelte, Django, Rails, HTML puro) | **Portar** | `references/portar.md` |
| Já tem o Voga e precisa de uma peça nova | **Estender** | `references/componente-novo.md` |

Em qualquer um dos três, **as regras abaixo valem**. Elas são o sistema; o resto é
consequência.

---

## As oito regras

### 1. Ação humana é tinta, não cor

O botão primário é `--voga-action` sobre `--voga-on-action` — que no claro é quase
preto sobre branco, e no escuro é quase branco sobre preto. Nenhum botão comum é
colorido.

**Por quê:** se todo botão for colorido, a cor para de significar. Com a ação em
tinta, sobra acento para identidade e âmbar para o que espera uma pessoa.

### 2. Cor é reservada, e cada uma tem uma regra

- `accent` — **só** identidade e seleção. Nunca nome, menção, botão comum, barra
  ou fundo.
- `attention` (âmbar) — **só** o que espera uma pessoa, e sempre em peça pequena:
  um chip, um contador. Nunca um card inteiro nem a borda dele.
- `danger` — erro e destrutivo, sempre acompanhado de palavra ou ícone.
- `ok` — passo concluído, presença. Discreto: sucesso se diz pelo check.
- Texto sobre fundo colorido usa o token `on-…` correspondente, nunca branco
  literal.

### 3. Card é sempre neutro

O estado vai num chip com ícone, nunca tingindo o fundo nem a borda.

**Por quê:** um card vermelho não diz mais que a palavra "Falhou" — e um card
tingido impede que o próximo estado apareça.

### 4. Nenhum componente conhece uma cor

Componente lê **papel** (`--voga-action`, `--voga-attention`, `--voga-muted`),
nunca valor. Todo valor de cor vive só em `tokens.css`.

**Por quê:** é literalmente isto que faz tema escuro e rebrand funcionarem sem
tocar num `.tsx`. Se você escrever `#1a2b3c` ou `oklch(…)` dentro de um
componente, acabou de quebrar os dois.

### 5. Todo token nasce no `:root` claro

Blocos de tema só **redefinem**. Um token que nasce dentro de um `@media` ou de um
`[data-theme]` é o bug clássico de página ilegível: a cor existe num tema e o
outro renderiza texto de um sobre fundo do outro.

O tema escuro vive em **dois** lugares, com os mesmos valores:
`:root[data-theme="dark"]` e `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) }`.
Sem atributo = segue o sistema.

### 6. A régua de controle

Tudo que se clica ou se digita tem uma de três alturas, com raio de 30% da altura:

| | altura | raio | lado | texto | ícone | onde |
|---|---|---|---|---|---|---|
| `sm` | 32 | 10 | 12 | 13 | 16 | barras, ações em linha, filtros |
| `md` | 40 | 12 | 14 | 14 | 18 | formulário, página, diálogo, select |
| `lg` | 48 | 14 | 16 | 15 | 20 | só a ação principal de uma tela inteira |

Pílula (`radius-full`) é **só** para etiqueta que não se pressiona: status,
contador, menção.

**Por quê:** botão, campo e select partilhando a mesma régua é o que faz um
formulário parecer desenhado em vez de montado.

### 7. Profundidade é sombra curta + anel de hairline + a luz do topo

`e1` card e botão secundário · `e2` hover de card interativo e composer · `e3`
vidro (menu, popover, select, dica) e diálogo.

Toda superfície elevada leva a luz de 1px no topo:
`box-shadow: var(--voga-e1), var(--voga-top)`.

**Por quê:** é a luz no topo que faz a superfície parecer uma placa e não um
retângulo. Esquecer `--voga-top` é o erro mais comum ao criar peça nova.

O que fica **dentro** de uma superfície elevada sobe um degrau — e a regra vale
para os **filhos**, não para o contêiner, para o contêiner guardar o próprio
nível:

```css
:where(.voga-card, .voga-dialog, .voga-glass, .voga-composer) > * {
  --voga-raised: var(--voga-raised-2);
}
```

### 8. Cantos concêntricos

Uma coisa arredondada perto da borda de uma caixa arredondada usa
`calc(raio-de-fora − folga)`, nunca o mesmo raio da caixa. Cada par nomeia o
próprio raio e a própria folga (`--voga-menu-pad`, `--voga-seg-in`).

```css
.voga-menu { padding: var(--voga-menu-pad); border-radius: var(--voga-radius-lg); }
.voga-menu__item { border-radius: calc(var(--voga-radius-lg) - var(--voga-menu-pad)); }
```

---

## Mais duas que não entram na lista mas quebram tudo se faltarem

**Foco só de teclado.** Todo controle focado pelo teclado mostra o anel: 1px da
superfície e 2px de cinza em `--voga-line-strong` (3:1). Um clique, um toque, ou o
que um script foca depois de alguém digitar **não** acendem nada.

Mecânica: `trackPointer()` marca `<html data-pointer>` em todo `pointerdown` e
tira a marca na primeira tecla que move o foco. Toda regra que desenha anel começa
com `html:not([data-pointer])`.

**Movimento só na entrada.** `--voga-out` para entradas e sombras; `--voga-spring`
para pressionar e para o polegar da chave. Fechar é imediato — animar o
fechamento faz a interface parecer lenta. Nada anima com
`prefers-reduced-motion: reduce`.

**Mono só em código.** Martian Mono em código inline, bloco, diff e comando.
Rótulo, metadado, contador, botão e medida usam Onest com algarismos tabulares
(`font-variant-numeric: tabular-nums`). Chip de estado leva ícone, nunca bolinha
colorida. Sem emoji como ícone.

---

## Os erros que mais aparecem

Se você estiver com pressa, confira só estes seis:

1. Cor crua dentro de componente (`#hex`, `rgb()`, `oklch()`) → use o papel.
2. Esquecer `var(--voga-top)` numa superfície elevada → ela fica chapada.
3. Tingir o card em vez de pôr um chip.
4. Botão primário colorido → ele é tinta.
5. Um raio interno igual ao externo → canto concêntrico.
6. Utilitário do Tailwind dentro de um componente do pacote → ele deixa de
   funcionar sem Tailwind, e a promessa do pacote é funcionar sem.

---

## Verificar antes de dizer que terminou

Um design system que ninguém mede vira opinião. O repositório do Voga traz um
auditor que você pode copiar para o projeto novo (`scripts/` desta skill):

```bash
bun scripts/audit.ts     # ou: npx tsx scripts/audit.ts
```

Ele mede, nos dois temas: contraste WCAG de todo par que o sistema usa de verdade
(convertendo OKLCH → sRGB → luminância, seguindo `var()` e `color-mix()`),
paridade entre os dois blocos escuros, ausência de cor crua no CSS dos
componentes, cobertura da ponte Tailwind, classe órfã nos dois sentidos, e as
regras de acessibilidade acima.

Como ler e estender → `references/auditar.md`.

---

## Onde ler o quê

| Arquivo | Quando abrir |
|---|---|
| `references/instalar.md` | Projeto React que pode ter a dependência |
| `references/portar.md` | Sem a dependência, ou fora do React |
| `references/componente-novo.md` | Criar uma peça que ainda não existe |
| `references/componentes.md` | Qual peça usar, e a API dela (57 componentes) |
| `references/tokens.md` | A lista completa de tokens, por papel |
| `references/auditar.md` | Medir contraste e consistência |
| `assets/tokens.css` | O arquivo de tokens, pronto para copiar |
| `assets/base.css` · `assets/theme.css` | Camada base e ponte Tailwind |
| `assets/components*.css` | O visual dos componentes, em quatro arquivos |
| `scripts/audit.ts` · `scripts/color.ts` | O auditor |
| `assets/prompt-refatorar.md` | Prompt pronto para migrar um projeto inteiro |

Comece pelo caminho da tabela do topo. Não leia tudo: cada referência é
autossuficiente para o caminho dela.
