# Auditoria do design system

Última passada: **2026-11-25**, Voga v0.2.0. Resultado: **0 falhas, 0 avisos**.

Para repetir tudo:

```bash
bun run check          # typecheck + audit + smoke + build do playground
```

Ou cada parte:

```bash
bun run typecheck      # tsc --noEmit
bun run audit          # contraste, paridade de tema, cor crua, ponte, classes, exports, a11y
bun run smoke          # renderiza o playground inteiro no servidor (contra dist/)
bun run playground     # http://localhost:5173 — os componentes de verdade, interativos
bun run estatico       # playground/estatico.html — arquivo único, duplo clique
```

---

## Como ver o sistema localmente

**Interativo** (abre menu, abre diálogo, marca caixa, troca tema):

```bash
bun install
bun run playground
# → http://localhost:5173
```

O Vite aponta o alias `@voga/ui` para `src/` — então você mexe num componente e a
página recarrega na hora.

**Sem instalar nada:** abra `playground/estatico.html` com duplo clique. É um
arquivo só, com o CSS embutido, gerado do **mesmo** `playground/src/App.tsx` —
não existe deriva entre os dois. Lá dentro funciona a troca de tema e o foco de
teclado; o que depende de React em runtime aparece em repouso.

---

## O que o auditor verifica

### 1. Contraste WCAG 2.1

`scripts/color.ts` converte OKLCH → sRGB → luminância sem nenhuma dependência,
segue `var()` e `color-mix(in oklab, …)`, e compõe alfa sobre o fundo certo.
São 30 pares medidos nos dois temas — todos os que o sistema usa de verdade.

| Par | Pede | Claro | Escuro |
|---|---:|---:|---:|
| texto principal no fundo | 4.5:1 | 17.16 | 16.64 |
| texto principal no card | 4.5:1 | 17.91 | 15.02 |
| texto principal na área de trabalho | 4.5:1 | 17.91 | 15.66 |
| texto principal no poço | 4.5:1 | 15.76 | 17.19 |
| texto principal na barra lateral | 4.5:1 | 16.72 | 16.79 |
| corpo de texto no card | 4.5:1 | 13.87 | 11.60 |
| texto secundário no fundo | 4.5:1 | 6.68 | 7.45 |
| texto secundário no card | 4.5:1 | 6.97 | 6.73 |
| texto secundário no poço | 4.5:1 | 6.13 | 7.70 |
| metadado no fundo | 4.5:1 | 5.16 | 5.70 |
| metadado no card | 4.5:1 | 5.39 | 5.14 |
| metadado na face escolhida | 4.5:1 | 4.74 | 4.69 |
| texto do botão primário | 4.5:1 | 17.16 | 16.64 |
| texto sobre o acento | 4.5:1 | 5.68 | 7.53 |
| texto sobre o âmbar | 4.5:1 | 5.53 | 8.93 |
| acento como texto no card | 4.5:1 | 5.68 | 7.13 |
| chip de acento | 4.5:1 | 4.98 | 6.09 |
| sucesso como texto | 4.5:1 | 5.31 | 8.83 |
| chip de atenção | 4.5:1 | 4.68 | 7.34 |
| atenção como texto | 4.5:1 | 5.53 | 8.67 |
| erro como texto | 4.5:1 | 6.02 | 6.80 |
| chip de erro | 4.5:1 | 5.18 | 5.85 |
| informação como texto | 4.5:1 | 5.32 | 8.58 |
| chip de informação | 4.5:1 | 4.69 | 7.14 |
| texto da dica (invertido) | 4.5:1 | 17.16 | 16.64 |
| borda de controle no fundo | 3:1 | 4.36 | 3.55 |
| borda de controle no card | 3:1 | 4.56 | 3.20 |
| anel de foco no fundo | 3:1 | 4.36 | 3.55 |
| anel de foco no card | 3:1 | 4.56 | 3.20 |
| avatar de marca no card | 3:1 | 5.68 | 7.13 |

Texto normal pede 4.5:1; borda de controle e anel de foco pedem 3:1.

### 2. Paridade do tema escuro

O tema escuro vive em dois lugares: `:root[data-theme="dark"]` e
`@media (prefers-color-scheme: dark)`. O auditor exige que os dois declarem **os
mesmos tokens com os mesmos valores** — e que nenhum token **nasça** dentro de um
bloco de tema, que é o bug clássico de página ilegível (a cor existe só num tema
e o outro renderiza texto de um sobre fundo do outro).

### 3. Cor crua em `components.css`

Nenhum `#hex`, `rgb()`, `hsl()` ou `oklch()` literal é aceito no CSS dos
componentes. Valor de cor só existe em `tokens.css`. É isto que faz rebrand e
tema escuro acontecerem sem abrir um componente.

### 4. Cobertura da ponte Tailwind

Todo token de cor público tem utilitário em `theme.css`; a ponte usa
`@theme inline` (sem isso, trocar `[data-theme]` exigiria rebuild); e a variante
`dark:` cobre preferência do sistema **e** `[data-theme]`.

### 5. Classes e componentes

Toda classe `voga-` do CSS é aplicada por algum componente ou está na lista de
utilidades públicas; e toda classe que os componentes aplicam existe no CSS.

### 6. Exports

Todo componente com nome de peça é exportado pelo `index.ts`, e todo arquivo de
componente é alcançável por ele.

### 7. Acessibilidade e movimento

Movimento desligado com `prefers-reduced-motion`; anel de foco guardado por
`html:not([data-pointer])` em toda regra; nenhum componente desenha `outline`
próprio; controle compacto cresce até o alvo de toque em ponteiro grosso.

---

## O que esta passada encontrou e corrigiu

### Falhas

1. **`Button asChild` lançava exceção.** Com `asChild`, o `Slot` do Radix recebia
   três filhos (ícone, rótulo, atalho) e não sabia qual era o alvo. Qualquer
   `<Button asChild><Link/></Button>` quebrava a página. Corrigido com
   `Slottable` marcando o alvo — achado pelo smoke test, não pelo typecheck.

2. **Sete valores de cor crus no CSS dos componentes.** Os brilhos e sombras do
   botão primário, do botão de acento e do polegar da chave estavam escritos à
   mão em `oklch()`. No tema escuro ficavam fracos demais, porque não tinham como
   mudar. Viraram os tokens `--voga-gloss`, `--voga-gloss-strong`, `--voga-lift`
   e `--voga-thumb-lift`, com valor próprio em cada tema.

3. **`--voga-on-warn` sem utilitário na ponte.** Texto sobre âmbar não tinha
   `text-on-warn` — quem usasse o Tailwind escreveria branco literal, que é
   exatamente o que a regra proíbe.

4. **O girador não seguia a régua do botão.** `.voga-spinner` lia sempre o ícone
   de 18px, então um botão `sm` carregava um girador grande demais e um `lg`,
   pequeno demais.

5. **Dois `style` inline em React cobrindo falha do CSS.** `MenuItem` e
   `SelectItem` passavam `position: relative` inline só para o indicador de
   check se posicionar. Foi para o CSS, onde era o lugar.

6. **Metadado na face escolhida, no escuro: 4.50:1.** Passava o AA por um fio.
   `--voga-chosen-bg` escureceu de `0.262` para `0.248` de lightness — agora
   4.69:1, e a face continua mais clara que um card, que é o que faz a pressão
   preta aparecer.

### Bugs no próprio auditor

7. **A extração de classe só lia string de uma classe só.** `"voga-glass voga-menu"`
   era ignorada inteira, então `voga-menu` aparecia como classe órfã. Agora toda
   string literal é partida em palavras.

8. **`outline: none` contava como outline próprio.** `/outline:\s*(?!none)/`
   casava com `outline: none` por backtracking do `\s*`. Trocado por uma leitura
   do valor de verdade.

---

## O que esta auditoria **não** cobre

Honestidade sobre os buracos:

- **Nenhum teste de interação.** O smoke test renderiza; não clica. Abrir menu,
  navegar com seta, fechar diálogo com Esc, foco preso dentro do modal — tudo
  isso é o Radix, e confiamos nele sem testar. Faltam testes com
  `@testing-library/react`.
- **Nenhuma checagem visual automática.** Ninguém compara captura de tela entre
  versões. Uma sombra que sumiu passa.
- **`axe` não roda.** O auditor verifica as regras que nós escrevemos, não o
  catálogo completo de WCAG.
- **Contraste só nos pares que listamos.** Uma combinação nova que alguém invente
  no app não é medida. A lista está em `scripts/audit.ts`, em `PAIRS` — se você
  criar um par novo, adicione lá.
- **APCA não é usado.** WCAG 2.1 é o que os clientes pedem, mas mede mal cores
  saturadas. Um dia vale medir os dois.
- **Nenhum teste de performance.** 20,5 KB de ESM e 39 KB de CSS são números de
  build, não de runtime.

---

## Números

| | |
|---|---|
| Componentes do shadcn/ui cobertos | 57 de 57 |
| Nomes exportados (peças + partes) | 197 |
| Arquivos de componente | 45 |
| Classes `voga-` | 228 |
| CSS do sistema | 2.764 linhas em 7 arquivos |
| Bundle ESM | 54,3 KB (entry principal) |
| Subcaminhos com peer opcional | 3 (`/chart`, `/form`, `/data-table`) |
| Pares de contraste medidos | 46 × 2 temas |
| Checagens do smoke | 46 |
