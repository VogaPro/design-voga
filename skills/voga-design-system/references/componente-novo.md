# Caminho 3 — criar uma peça nova

O Voga cobre 57 componentes. Quando falta um, o objetivo não é "fazer bonito" — é
fazer uma peça que ninguém consiga apontar como diferente das outras.

## Antes de escrever: existe mesmo?

A metade dos pedidos de "componente novo" é composição do que já existe. Confira
em `componentes.md` antes. Exemplos reais:

| Pedido | É composição de |
|---|---|
| "select com busca" | `Combobox` (já existe: `Popover` + `Command`) |
| "campo com unidade" | `InputGroup` + `InputAffix boxed` |
| "card de escolha" | `Choice` |
| "aviso com barra colorida" | `Note` |
| "contador no menu lateral" | `SidebarItem side={<Chip count>7</Chip>}` |
| "modal de confirmação" | `AlertDialog` |
| "⌘K" | `CommandDialog` + `useCommandShortcut` |

## A receita

### 1. Decida a camada

**É um controle?** (se clica ou se digita) → entra na régua: `sm` 32 / `md` 40 /
`lg` 48, raio 30% da altura, lado 12/14/16, texto 13/14/15, ícone 16/18/20. Leia
os tokens `--voga-control-*`.

**É uma superfície?** → `--voga-raised` + `var(--voga-e1), var(--voga-top)`, raio
14 (ou 20 para seção). Se flutua, é `.voga-glass` com `e3`.

**É uma etiqueta?** (não se pressiona) → pílula, `--voga-radius-full`, altura 22,
ícone de 13px. Nunca bolinha colorida.

### 2. Escreva o CSS primeiro, lendo só papéis

```css
/* --------------------------------------------------------------------------
   Nome da peça — uma linha dizendo para que ela serve e o que ela NÃO é.
   -------------------------------------------------------------------------- */

.voga-minhapeca {
  /* Régua, se for controle */
  height: var(--voga-control-h-md);
  padding-inline: var(--voga-control-px-md);
  border-radius: var(--voga-control-r-md);
  font-size: var(--voga-control-fs-md);

  /* Papéis, nunca valores */
  background: var(--voga-raised);
  color: var(--voga-ink);
  box-shadow: var(--voga-e1), var(--voga-top);

  /* Movimento: só na entrada, e com a curva do sistema */
  transition: box-shadow var(--voga-dur-fast) var(--voga-out);
}

.voga-minhapeca:hover { box-shadow: var(--voga-e2), var(--voga-top); }

/* Estado pela mesma gramática de atributo do resto */
.voga-minhapeca[data-state="on"] {
  background: var(--voga-chosen-bg);
  box-shadow: var(--voga-chosen-shadow);
}

/* Anel de foco: SEMPRE com a guarda de ponteiro */
html:not([data-pointer]) .voga-minhapeca:focus-visible {
  box-shadow: var(--voga-focus-ring);
}

/* Partes com __, e raio concêntrico se houver folga */
.voga-minhapeca__item {
  border-radius: calc(var(--voga-control-r-md) - var(--voga-minhapeca-pad));
}
```

### 3. Depois o componente, que só aplica classe

```tsx
import * as React from "react";
import { cn } from "../lib/cn";

export interface MinhaPecaProps extends React.ComponentPropsWithoutRef<"div"> {
  /** Documente o PAPEL da prop, não o visual: quando usar, não como fica. */
  tone?: "neutral" | "attention";
}

export const MinhaPeca = React.forwardRef<HTMLDivElement, MinhaPecaProps>(
  function MinhaPeca({ className, tone = "neutral", ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn("voga-minhapeca", tone !== "neutral" && `voga-minhapeca--${tone}`, className)}
        {...props}
      />
    );
  },
);
```

Quatro coisas que todo componente do Voga faz, e a sua também deve:

1. **`forwardRef`** — sem ele, `asChild`, foco programático e medição quebram.
2. **`cn(..., className)` por último** — quem consome sobrescreve sem
   `!important` e sem fork.
3. **Espalhar `...props`** — `aria-*`, `data-*` e handlers passam.
4. **Nenhuma classe que não seja `voga-`** — um utilitário do Tailwind aqui faz o
   pacote parar de funcionar sem Tailwind.

### 4. Acessibilidade: use primitivo, não escreva à mão

Se a peça tem foco preso, navegação por seta, posicionamento ou `role` composto,
procure o primitivo do Radix antes. O Voga já depende de 20 deles — adicionar um é
baratíssimo comparado a reimplementar teclado.

Se não houver primitivo: `role` correto, `aria-expanded`/`aria-controls` no
gatilho, `Esc` fecha, foco volta ao gatilho, e setas navegam.

### 5. Registre

1. `src/styles/components*.css` — escolha o arquivo pelo domínio (base, overlay,
   nav, data).
2. `src/index.ts` — exporte a peça e os tipos dela.
3. `playground/src/sections/*.tsx` — mostre a peça, inclusive nos estados chatos
   (vazio, carregando, erro, desabilitado).
4. `scripts/smoke.tsx` — uma linha conferindo que ela renderiza.
5. `bun run check` — typecheck, auditoria, smoke e build do playground.

O auditor vai reclamar se você deixar cor crua, classe órfã, anel sem guarda, peça
não exportada ou classe de fora do pacote. Ele é chato de propósito.

## Dois exemplos resolvidos

### Um "stat tile" (número grande de destaque)

Não é card tingido nem número colorido. É superfície neutra, o número em `ink` no
degrau grande da escala, o rótulo em `faint`, e a variação num chip:

```css
.voga-stat { padding: var(--voga-space-4); border-radius: var(--voga-radius-lg);
  background: var(--voga-raised); box-shadow: var(--voga-e1), var(--voga-top); }
.voga-stat__value { font-size: var(--voga-text-h1); font-weight: 650;
  letter-spacing: var(--voga-track-tighter); font-variant-numeric: tabular-nums; }
.voga-stat__label { font-size: 11.5px; font-weight: 600; text-transform: uppercase;
  letter-spacing: var(--voga-track-label); color: var(--voga-faint); }
```

### Uma "timeline" de eventos

A linha é `--voga-line`, o nó é `ink` (ou `ok` se concluído), o horário é `Meta`
com algarismos tabulares. Nada ganha cor por ser "importante" — importante vira
peso de fonte ou um chip de `attention`.

## O teste final

Ponha a peça nova ao lado de um `Button`, um `Input` e um `Card`, nos dois temas.
Se ela chamar atenção por algum motivo que não seja o conteúdo dela, algo saiu da
régua. Os suspeitos, em ordem: raio fora da escala, falta de `--voga-top`, uma cor
que devia ser papel, e altura que não é 32/40/48.
