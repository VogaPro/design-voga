# Caminho 1 — instalar o pacote

Para projeto React (18 ou 19) que pode receber a dependência. É o caminho curto:
você ganha os 57 componentes e os tokens de uma vez.

## 1. Instalar

```bash
npm i github:caiosantosxp/design-voga
# travar numa versão:  npm i github:caiosantosxp/design-voga#v0.3.0
```

O `dist/` é commitado no repositório de propósito, então a instalação por git não
precisa de build na máquina de quem consome.

## 2. CSS

```css
/* app.css */
@import "@voga/ui/styles.css";
```

Isso é tudo. **O pacote não depende do Tailwind** — o visual dos componentes é CSS
de verdade com prefixo `voga-`.

Se o projeto usa Tailwind v4 e você quer também os utilitários (`bg-raised`,
`text-muted`, `rounded-btn`, `shadow-e2`, `h-control-md`):

```css
@import "tailwindcss";
@import "@voga/ui/styles.css";
```

A ordem importa: o Tailwind primeiro, para o `@theme inline` do Voga registrar os
tokens nele.

> Não existe `@source` apontando para `node_modules`. Se você se pegar escrevendo
> isso, parou no caminho errado — as classes dos componentes não são utilitários
> do Tailwind.

## 3. Fontes e os dois scripts do `<head>`

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

Os dois scripts existem para evitar flash no primeiro paint: `themeScript` aplica
`[data-theme]` antes de pintar, e `pointerScript` marca `data-pointer` para o anel
de foco não acender sozinho. Sem eles o app funciona, mas pisca.

Se preferir ligar o rastreio do ponteiro em runtime, chame `trackPointer()` uma vez
na raiz — ele devolve a função que desliga.

## 4. Provedores

```tsx
import { TipProvider, Toaster } from "@voga/ui";

<TipProvider delayDuration={200}>
  <App />
  <Toaster />
</TipProvider>
```

`TipProvider` é necessário para qualquer `Tip`. `Toaster` só se o app usar `toast`.

## 5. Por framework

### Next.js (App Router)

```ts
// next.config.ts
export default { transpilePackages: ["@voga/ui"] };
```

Os scripts vão no `app/layout.tsx`, dentro do `<head>`. Componentes com estado
(`Dialog`, `Menu`, `Select`, `Tabs`, `useTheme`) precisam de `"use client"` no
arquivo que os usa.

### Vite / Remix / React Router

Nada além do import do CSS no ponto de entrada.

### Astro

Importe o CSS num layout e marque as ilhas React com `client:load` quando o
componente tiver estado.

## 6. Os três subcaminhos com peer opcional

Três peças carregam biblioteca grande e vivem fora do entry principal. Quem não
importa não precisa instalar:

```ts
import { Chart, ChartTooltip, ChartLegend, seriesColor } from "@voga/ui/chart";   // precisa de recharts
import { Form, FormField } from "@voga/ui/form";                                  // precisa de react-hook-form
import { DataTable, type ColumnDef } from "@voga/ui/data-table";                   // precisa de @tanstack/react-table
```

Versões que a API espera: `recharts@>=3`, `react-hook-form@>=7`,
`@tanstack/react-table@^8` (a v9 tem API nova e incompatível).

## 7. Primeiro teste

Monte isto numa página e confira as quatro coisas que provam que o sistema está de
pé:

```tsx
import { Button, Card, CardBody, Chip, Note, useTheme } from "@voga/ui";
import { Check } from "lucide-react";

export function Prova() {
  const { theme, setTheme } = useTheme();
  return (
    <Card>
      <CardBody>
        <Chip tone="ok" icon={Check}>Publicado</Chip>
        <Note tone="attention" title="Espera aprovação">
          A barra é âmbar; o fundo continua neutro.
        </Note>
        <Button variant="primary">Salvar alterações</Button>
        <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          Trocar tema
        </Button>
      </CardBody>
    </Card>
  );
}
```

1. O botão primário é **tinta**, não colorido.
2. O card tem a luz de 1px no topo (aproxime: a borda de cima é mais clara).
3. Trocar o tema re-tematiza sem recarregar.
4. Tab acende o anel de foco; clicar apaga.

Se qualquer uma falhar, o problema é de instalação, não de uso — volte ao passo 2.
