# Os 57 componentes

Cobre a lista completa do shadcn/ui. Onde o nome muda, é porque o nome do Voga diz
melhor o que a peça faz.

## Índice

- [Ações](#ações) · [Formulário](#formulário) · [Superfícies](#superfícies)
- [Estado](#estado) · [Dados](#dados) · [Navegação](#navegação)
- [Sobreposições](#sobreposições) · [Texto e utilitários](#texto-e-utilitários)
- [Mapa shadcn → Voga](#mapa-shadcnui--voga)

---

## Ações

```tsx
<Button variant="primary" size="md" icon={Check} kbd={["⌘","↵"]} loading={false}>Aprovar</Button>
```

`variant`: `default` (o padrão, papel elevado) · `primary` (tinta, **no máximo um
por área**) · `accent` (só a ação que leva ao objeto de identidade) · `danger`
(sempre com a palavra) · `ghost` (barras e ações em linha) · `link` (a ação quieta
de uma linha; `size`, `block` e `iconOnly` não se aplicam).
`size`: `sm` 32 · `md` 40 · `lg` 48 — só a ação principal de uma tela inteira.
Outras props: `iconOnly` (então `aria-label` é obrigatório), `block`, `asChild`.

- `ButtonGroup` — botões que são um controle só, com hairline entre eles.
- `SplitButton menu={<>…</>}` — ação principal mais seta com as variações dela.
- `Toolbar`, `ToolbarButton`, `ToolbarSeparator` — placa de controles `sm`.
- `Kbd` — tecla de atalho. Escondida onde não há teclado.

## Formulário

- `Field label hint error required htmlFor` — o ritmo e a fiação de aria. Passe
  `htmlFor` e ele conecta rótulo, ajuda e erro; o controle recebe
  `aria-describedby={id + "-desc"}`.
- `Form` — pilha de campos no ritmo. (Para react-hook-form, veja `@voga/ui/form`.)
- `Input size` · `Textarea` · `Label required`
- `InputGroup` + `InputAffix icon boxed` — prefixo e sufixo no mesmo controle, com
  o anel de foco em volta do grupo inteiro.
- `CodeInput maxLength grouped` — código de verificação, uma casa por dígito.
- `Checkbox` (o traço se desenha ao marcar; aceita `"indeterminate"`) ·
  `Switch` (o polegar desliza com mola) · `ControlRow split` (embrulha o controle
  e as palavras).
- `RadioGroup` + `Radio` — escolha única. `Choice title desc` é o cartão de
  escolha: a linha inteira é o alvo, e escolhido **afunda** em vez de pintar.
- `Slider` — mostre o valor em algum lugar; um deslizador sozinho não diz onde está.
- `Segmented` + `SegmentedItem` — escolha única numa placa afundada, cantos
  concêntricos. (É o Toggle Group do shadcn.)
- `Tabs` + `TabsList` + `TabsTrigger` + `TabsContent` — a linha fica embaixo do ativo.
- `SelectRoot` + `SelectTrigger` + `SelectValue` + `SelectContent` + `SelectItem`
  (+ `SelectGroup`, `SelectLabel`, `SelectSeparator`).
- `Combobox options value onChange` — select com busca. Já é `Popover` + `Command`.
- `Calendar` — react-day-picker em pt-BR, 280px, dia escolhido em tinta, hoje com anel.
- `DatePicker value onChange` — gatilho na régua, calendário num popover.
- `Composer` — caixa de texto flutuante (raio 18, `e2`+luz, `e3` em foco).
- `Toggle pressed onPressedChange iconOnly` — botão que fica ligado; ligado afunda.

## Superfícies

- `Card variant interactive` + `CardHeader` `CardTitle` `CardDescription`
  `CardBody` `CardFooter`. `variant`: `card` · `section` (raio 20) · `flat` (poço).
  **Card é sempre neutro:** o estado vai num `Chip`.
- `Well` — poço para código, faixa de tabela, citação.
- `Rows` + `Row` — lista com hairline entre as linhas, nunca abaixo da última.
- `Item card interactive` + `ItemMedia` `ItemMain` `ItemTitle` `ItemDescription`
  `ItemSide` — a linha de uma lista que se clica.
- `ScrollArea orientation` · `AspectRatio ratio`
- `Panels` + `Pane` + `PaneHandle grip` — painéis que a pessoa redimensiona.

## Estado

- `Chip tone icon count` — etiqueta que **não** se pressiona.
  `tone`: `neutral` `attention` `ok` `danger` `info` `accent` `solid`.
  Chip de estado leva ícone, nunca bolinha colorida.
- `Note tone title icon` — aviso com barra de 2px na lateral; o fundo fica neutro.
  `tone`: `neutral` `info` `ok` `attention` `danger`.
- `Empty icon title desc actions size` — `size`: `page` `panel` `inline`. Nunca
  deixe uma tela em branco: diga o que está vazio e qual é o próximo passo.
- `Avatar src fallback size mark` — pessoa é círculo; `mark` é o quadrado de canto
  vivo, para identidade que não é pessoa.
- `Skeleton` (sempre `sunken`) · `Spinner label` · `Separator orientation strong`
- `Meter value tone thin mark` — trilho de tinta translúcida, com marca opcional.
  `value` indefinido deixa indeterminado.
- `Steps total done running` — passos de um trabalho.

## Dados

- `TableWrap` + `Table hover` + `TableHead` `TableBody` `TableFoot` `TableRow`
  `TableHeader` `TableCell`. Alinhamento de número: `alignment="end"` (o atributo
  `align` do HTML é antigo e tem outros valores, então o nome é outro).
- `Carousel options arrows label` + `CarouselSlide` — a fileira some do lado que
  ainda tem coisa para ver.
- `DataTable columns data searchColumn pageSize` → `@voga/ui/data-table`. Ordena, busca, pagina.
- `Chart` + `ChartTooltip` + `ChartLegend` + `seriesColor` → `@voga/ui/chart`.

## Navegação

- `Breadcrumb` + `BreadcrumbLink` + `BreadcrumbSeparator` + `BreadcrumbCurrent` —
  o último item é a página, não é link.
- `Pagination page pages onChange around` — com reticências e janela.
- `Sidebar` + `SidebarGroup` + `SidebarLabel` + `SidebarItem icon active sub side`
  — papel próprio (`--voga-side`); a linha escolhida é um degrau de tinta nesse
  papel, nunca uma cor. `Shell` + `ShellMain` é a casca de colunas.
- `NavMenu` + `NavMenuList` + `NavMenuItem` + `NavMenuTrigger` + `NavMenuContent` +
  `NavMenuLink` + `NavMenuCard title desc`.
- `Menubar` + `MenubarMenu` + `MenubarTrigger` + `MenubarContent` + `MenubarItem` +
  `MenubarCheckboxItem` + `MenubarLabel` + `MenubarSeparator`.

## Sobreposições

Tudo que flutua é vidro em `e3`, entra subindo e **fecha na hora**.

- `Dialog` + `DialogTrigger` + `DialogContent showClose` + `DialogHeader`
  `DialogTitle` `DialogDescription` `DialogFooter` `DialogClose`.
- `AlertDialog` + … + `AlertDialogCancel` / `AlertDialogAction` — não fecha
  clicando fora nem com `Esc`. Use só quando a ação não tem volta, e **nomeie o
  alvo no título**: "Excluir a rampa de acento?", não "Confirmar".
- `Sheet` + `SheetContent side` — painel lateral, quatro lados.
- `Drawer` + `DrawerContent grip` — gaveta do telefone, com alça e arraste.
- `Popover` + `PopoverTrigger` + `PopoverContent arrow` (+ `PopoverAnchor`,
  `PopoverClose`) — para palavras e controles próprios. Para uma lista, use `Menu`.
- `HoverCard` + `HoverCardTrigger` + `HoverCardContent` — nunca guarde aqui a
  única via para uma ação.
- `Menu` + `MenuTrigger` + `MenuContent` + `MenuItem tone kbd` +
  `MenuCheckboxItem` + `MenuLabel` + `MenuSeparator`.
- `ContextMenu` + … — tudo que está aqui tem de existir em outro lugar também.
- `Command` + `CommandInput` `CommandList` `CommandEmpty` `CommandGroup`
  `CommandItem` `CommandSeparator` `CommandShortcut`; `CommandDialog open
  onOpenChange` é a paleta inteira, e `useCommandShortcut(onOpen)` liga o ⌘K.
- `Accordion` + `AccordionItem` + `AccordionTrigger` + `AccordionContent` ·
  `Collapsible` + `CollapsibleTrigger` + `CollapsibleContent`.
- `Tip content side` (atalho) ou `TipRoot`/`TipTrigger`/`TipContent`.
  **`TipProvider` na raiz do app** é obrigatório.
- `Toaster` na raiz + `toast(...)` em qualquer lugar. A torrada anuncia o que
  aconteceu, no passado: "Versão publicada", não "Publicar".

## Texto e utilitários

- `Prose` — texto corrido de markdown ou CMS, com a hierarquia toda resolvida.
- `Eyebrow` — rótulo de seção, caixa alta, 11.5px. Nunca mono.
- `Meta` — metadado (custo, contagem, horário) com algarismos tabulares.
- `Icon as={QualquerIconeDoLucide}` — normaliza para a régua (traço 1.6, tamanho
  pelo controle). Sem emoji como ícone.
- `cn(...)` — junta classes e resolve conflito do Tailwind; a última ganha.
- `useTheme()` → `{ theme, setTheme }`, com `"light" | "dark" | "system"`.
- `themeScript` / `pointerScript` — strings para script inline no `<head>`.
- `trackPointer()` — liga o foco só de teclado; devolve a função que desliga.

---

## Mapa shadcn/ui → Voga

| shadcn/ui | Voga |
|---|---|
| Accordion | `Accordion` |
| Alert | `Note` |
| Alert Dialog | `AlertDialog` |
| Aspect Ratio | `AspectRatio` |
| Avatar | `Avatar` |
| Badge | `Chip` |
| Breadcrumb | `Breadcrumb` |
| Button | `Button` |
| Button Group | `ButtonGroup`, `SplitButton` |
| Calendar | `Calendar` |
| Card | `Card` |
| Carousel | `Carousel` |
| Chart | `Chart` → `@voga/ui/chart` |
| Checkbox | `Checkbox` |
| Collapsible | `Collapsible` |
| Combobox | `Combobox` |
| Command | `Command`, `CommandDialog` |
| Context Menu | `ContextMenu` |
| Data Table | `DataTable` → `@voga/ui/data-table` |
| Date Picker | `DatePicker` |
| Dialog | `Dialog` |
| Drawer | `Drawer` |
| Dropdown Menu | `Menu` |
| Empty | `Empty` |
| Field | `Field` |
| Form | `Form`, `FormField` → `@voga/ui/form` |
| Hover Card | `HoverCard` |
| Input | `Input` |
| Input Group | `InputGroup`, `InputAffix` |
| Input OTP | `CodeInput` |
| Item | `Item` |
| Kbd | `Kbd` |
| Label | `Label` |
| Menubar | `Menubar` |
| Navigation Menu | `NavMenu` |
| Pagination | `Pagination` |
| Popover | `Popover` |
| Progress | `Meter`, `Steps` |
| Radio Group | `RadioGroup`, `Radio`, `Choice` |
| Resizable | `Panels`, `Pane`, `PaneHandle` |
| Scroll Area | `ScrollArea` |
| Select | `SelectRoot` + partes |
| Separator | `Separator` |
| Sheet | `Sheet` |
| Sidebar | `Sidebar`, `Shell` |
| Skeleton | `Skeleton` |
| Slider | `Slider` |
| Sonner | `Toaster`, `toast` |
| Spinner | `Spinner` |
| Switch | `Switch` |
| Table | `Table` + partes |
| Tabs | `Tabs` + partes |
| Textarea | `Textarea` |
| Toggle | `Toggle` |
| Toggle Group | `Segmented` |
| Tooltip | `Tip` |
| Typography | `Prose` |

**Além do shadcn:** `Composer`, `Well`, `Rows`/`Row`, `ControlRow`, `Eyebrow`,
`Meta`, `Icon`, `Shell`, `useTheme`, `trackPointer`, `cn`.
