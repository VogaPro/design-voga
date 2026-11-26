import { ClassValue } from 'clsx';
import * as React from 'react';
import { LucideIcon } from 'lucide-react';
import * as ToolbarPrimitive from '@radix-ui/react-toolbar';
import { OTPInput } from 'input-otp';
import * as LabelPrimitive from '@radix-ui/react-label';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import * as SliderPrimitive from '@radix-ui/react-slider';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as SelectPrimitive from '@radix-ui/react-select';
import { DayPicker } from 'react-day-picker';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio';
import { Panel, PanelResizeHandle, PanelGroup } from 'react-resizable-panels';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import useEmblaCarousel from 'embla-carousel-react';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import * as _radix_ui_react_context from '@radix-ui/react-context';
import * as MenubarPrimitive from '@radix-ui/react-menubar';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import * as vaul from 'vaul';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { Toaster as Toaster$1 } from 'sonner';
export { toast } from 'sonner';

/**
 * Junta classes e resolve conflitos do Tailwind — a última ganha.
 * Use em todo componente para que `className` do consumidor sobrescreva o default.
 */
declare function cn(...inputs: ClassValue[]): string;

/**
 * Marca <html data-pointer> enquanto a pessoa estiver usando mouse ou dedo, e
 * tira a marca na primeira tecla de navegação. Toda regra que desenha anel de
 * foco começa com `html:not([data-pointer])` — então um clique, um toque, ou o
 * que um script foca depois de alguém digitar não acendem nada.
 *
 * Chame uma vez na raiz do app. Devolve a função que desliga.
 */
declare function trackPointer(): () => void;
/** Script inline para o <head>: marca antes do primeiro paint, sem flash de anel. */
declare const pointerScript: string;

type Theme = "light" | "dark" | "system";
/**
 * Lê/grava o tema em [data-theme] no <html> + localStorage.
 * "system" remove o atributo e deixa o prefers-color-scheme decidir.
 */
declare function useTheme(): {
    theme: Theme;
    setTheme: (next: Theme) => void;
};
/**
 * Script inline para o <head> — evita flash de tema errado no primeiro paint.
 * Em Next.js: <script dangerouslySetInnerHTML={{ __html: themeScript }} />
 */
declare const themeScript = "(function(){try{var t=localStorage.getItem(\"voga-theme\");if(t===\"light\"||t===\"dark\")document.documentElement.setAttribute(\"data-theme\",t)}catch(e){}})()";

interface IconProps extends Omit<React.ComponentPropsWithoutRef<"svg">, "ref"> {
    /** Qualquer ícone do lucide-react: `import { Check } from "lucide-react"`. */
    as: LucideIcon;
}
/**
 * Normaliza um ícone para a régua do sistema: traço 1.6, pontas arredondadas,
 * tamanho pelo controle que o contém. Sem emoji como ícone.
 */
declare function Icon({ as: Glyph, className, ...props }: IconProps): React.JSX.Element;

type ButtonVariant = "default" | "primary" | "accent" | "danger" | "ghost" | "link";
/** A régua de controle: md 40 (padrão), sm 32, lg 48 (só a ação principal de uma tela). */
type ControlSize = "sm" | "md" | "lg";
interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
    /**
     * `primary` no máximo uma vez por área — é tinta, não cor. `accent` só para a
     * ação que leva ao objeto de identidade. `danger` para recusar ou apagar,
     * sempre com a palavra. `ghost` em barras de ferramenta. `link` para a ação
     * quieta de uma linha ("Editar", "Mudar"): só as palavras, sem caixa — então
     * `size`, `block` e `iconOnly` não se aplicam.
     */
    variant?: ButtonVariant;
    size?: ControlSize;
    /** Ícone que lidera as palavras. */
    icon?: LucideIcon;
    /** O ícone é todo o conteúdo — então `aria-label` passa a ser obrigatório. */
    iconOnly?: boolean;
    block?: boolean;
    /** Atalho depois do rótulo: `["⌘", "↵"]`. */
    kbd?: string[];
    /** Ação assíncrona rodando: girador, mesma largura, não clicável. */
    loading?: boolean;
    /** Renderiza o filho (um <Link>, por exemplo) com o visual do botão. */
    asChild?: boolean;
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;

/**
 * Botões que são um controle só: raio nas pontas, hairline entre eles.
 * Use para ações da mesma família ("Dia · Semana · Mês" é `Segmented`).
 */
declare function ButtonGroup({ className, ...props }: React.ComponentPropsWithoutRef<"div">): React.JSX.Element;
interface SplitButtonProps extends ButtonProps {
    /** Os itens do menu que a seta abre. */
    menu: React.ReactNode;
    menuLabel?: string;
}
/** Ação principal mais uma seta que abre as variações dela. */
declare function SplitButton({ menu, menuLabel, children, variant, size, ...props }: SplitButtonProps): React.JSX.Element;

/** Placa de controles compactos (sm) sobre papel elevado. */
declare const Toolbar: React.ForwardRefExoticComponent<Omit<ToolbarPrimitive.ToolbarProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const ToolbarButton: React.ForwardRefExoticComponent<ToolbarPrimitive.ToolbarButtonProps & React.RefAttributes<HTMLButtonElement>>;
declare const ToolbarSeparator: React.ForwardRefExoticComponent<Omit<ToolbarPrimitive.ToolbarSeparatorProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;

/** Tecla de atalho. Fonte da interface com algarismos tabulares, nunca mono. */
declare function Kbd({ className, ...props }: React.ComponentPropsWithoutRef<"kbd">): React.JSX.Element;

interface InputProps extends Omit<React.ComponentPropsWithoutRef<"input">, "size"> {
    size?: ControlSize;
}
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;
declare const Textarea: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>, "ref"> & React.RefAttributes<HTMLTextAreaElement>>;
/**
 * Caixa de texto flutuante: um card de raio 18 que sobe para e3 em foco, com
 * lugar para pílulas de contexto e para a ação de enviar.
 */
declare const Composer: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;

interface InputGroupProps extends React.ComponentPropsWithoutRef<"div"> {
    invalid?: boolean;
}
/**
 * Prefixo, campo e sufixo como um controle só. O anel de foco envolve o grupo
 * inteiro, e os cantos de dentro são concêntricos com os de fora.
 */
declare function InputGroup({ className, invalid, ...props }: InputGroupProps): React.JSX.Element;
interface AffixProps extends React.ComponentPropsWithoutRef<"span"> {
    icon?: LucideIcon;
    /** Com face de poço e hairline, para unidade ("kg", "R$") ou domínio. */
    boxed?: boolean;
}
declare function InputAffix({ className, icon, boxed, children, ...props }: AffixProps): React.JSX.Element;

interface CodeInputProps extends Omit<React.ComponentPropsWithoutRef<typeof OTPInput>, "render" | "children"> {
    /** Põe um separador no meio: `123 · 456`. */
    grouped?: boolean;
}
/**
 * Código de verificação. Uma casa por dígito, na régua dos controles, com
 * algarismos tabulares — então as casas não dançam ao digitar.
 */
declare const CodeInput: React.ForwardRefExoticComponent<CodeInputProps & React.RefAttributes<HTMLInputElement>>;

declare const Label: React.ForwardRefExoticComponent<Omit<LabelPrimitive.LabelProps & React.RefAttributes<HTMLLabelElement>, "ref"> & {
    required?: boolean;
} & React.RefAttributes<HTMLLabelElement>>;
interface FieldProps extends React.ComponentPropsWithoutRef<"div"> {
    label?: React.ReactNode;
    /** Ajuda abaixo do controle. Escondida quando há `error`. */
    hint?: React.ReactNode;
    error?: React.ReactNode;
    required?: boolean;
    /**
     * id do controle. Com ele o Field conecta rótulo e mensagem: clone seu
     * controle com `id={id}` e `aria-describedby={`${id}-desc`}`.
     */
    htmlFor?: string;
}
/** Rótulo + controle + ajuda ou erro, com o ritmo e a fiação de acessibilidade. */
declare function Field({ className, label, hint, error, required, htmlFor, children, ...props }: FieldProps): React.JSX.Element;
/** Pilha de campos no ritmo do formulário. */
declare function Form({ className, ...props }: React.ComponentPropsWithoutRef<"form">): React.JSX.Element;
/** Rótulo de seção: caixa alta, fraco, nunca mono. */
declare function Eyebrow({ className, ...props }: React.ComponentPropsWithoutRef<"p">): React.JSX.Element;
/** Metadado — custo, contagem, horário — com algarismos tabulares. */
declare function Meta({ className, ...props }: React.ComponentPropsWithoutRef<"span">): React.JSX.Element;

declare const Checkbox: React.ForwardRefExoticComponent<Omit<CheckboxPrimitive.CheckboxProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
declare const Switch: React.ForwardRefExoticComponent<Omit<SwitchPrimitive.SwitchProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
/** Linha que embrulha um controle e suas palavras. `split` joga o controle na direita. */
declare function ControlRow({ className, split, ...props }: React.ComponentPropsWithoutRef<"label"> & {
    split?: boolean;
}): React.JSX.Element;
/**
 * Alternador: um botão que fica ligado. É um item de segmentado vivendo
 * sozinho — ligado afunda como tecla pressionada, não pinta de cor.
 */
declare const Toggle: React.ForwardRefExoticComponent<Omit<TogglePrimitive.ToggleProps & React.RefAttributes<HTMLButtonElement>, "ref"> & {
    size?: "sm" | "md";
    /** Só o ícone: então `aria-label` passa a ser obrigatório. */
    iconOnly?: boolean;
} & React.RefAttributes<HTMLButtonElement>>;

/** Escolha única. Marcado é tinta, nunca cor. */
declare const RadioGroup: React.ForwardRefExoticComponent<Omit<RadioGroupPrimitive.RadioGroupProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const Radio: React.ForwardRefExoticComponent<Omit<RadioGroupPrimitive.RadioGroupItemProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
interface ChoiceProps extends Omit<React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>, "title"> {
    title: React.ReactNode;
    desc?: React.ReactNode;
}
/**
 * Cartão de escolha: a linha inteira é o alvo. Escolhido afunda como tecla
 * pressionada — não pinta de cor.
 */
declare const Choice: React.ForwardRefExoticComponent<ChoiceProps & React.RefAttributes<HTMLButtonElement>>;

/**
 * Deslizador. Trilho de tinta translúcida, polegar que se levanta do papel.
 * Mostre o valor em algum lugar — um deslizador sozinho não diz onde está.
 */
declare const Slider: React.ForwardRefExoticComponent<Omit<SliderPrimitive.SliderProps & React.RefAttributes<HTMLSpanElement>, "ref"> & React.RefAttributes<HTMLSpanElement>>;

declare const Segmented: React.ForwardRefExoticComponent<Omit<Omit<ToggleGroupPrimitive.ToggleGroupSingleProps & React.RefAttributes<HTMLDivElement>, "ref">, "type"> & {
    size?: "sm" | "md";
} & React.RefAttributes<HTMLDivElement>>;
declare const SegmentedItem: React.ForwardRefExoticComponent<Omit<ToggleGroupPrimitive.ToggleGroupItemProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
/** Abas: a linha fica embaixo do item ativo; nada de fundo colorido. */
declare const Tabs: React.ForwardRefExoticComponent<TabsPrimitive.TabsProps & React.RefAttributes<HTMLDivElement>>;
declare const TabsList: React.ForwardRefExoticComponent<Omit<TabsPrimitive.TabsListProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const TabsTrigger: React.ForwardRefExoticComponent<Omit<TabsPrimitive.TabsTriggerProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
declare const TabsContent: React.ForwardRefExoticComponent<TabsPrimitive.TabsContentProps & React.RefAttributes<HTMLDivElement>>;

declare const SelectRoot: React.FC<SelectPrimitive.SelectProps>;
declare const SelectValue: React.ForwardRefExoticComponent<SelectPrimitive.SelectValueProps & React.RefAttributes<HTMLSpanElement>>;
declare const SelectGroup: React.ForwardRefExoticComponent<SelectPrimitive.SelectGroupProps & React.RefAttributes<HTMLDivElement>>;
/** Gatilho com o visual nosso — o select nativo não aparece em lugar nenhum. */
declare const SelectTrigger: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectTriggerProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
declare const SelectContent: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const SelectItem: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectItemProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare function SelectLabel({ className, ...props }: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>): React.JSX.Element;
declare function SelectSeparator({ className, ...props }: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>): React.JSX.Element;

interface ComboboxOption {
    value: string;
    label: string;
    /** Uma linha explicando, quando o rótulo não basta. */
    desc?: string;
    disabled?: boolean;
}
interface ComboboxProps {
    options: ComboboxOption[];
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    /** O que aparece no campo de busca. */
    searchPlaceholder?: string;
    emptyText?: string;
    disabled?: boolean;
    id?: string;
    className?: string;
}
/**
 * Select com busca. É um `Popover` com uma `Command` dentro — então o gatilho
 * é o nosso select, o painel é vidro, e a navegação é por seta e Enter.
 */
declare function Combobox({ options, value, onChange, placeholder, searchPlaceholder, emptyText, disabled, id, className, }: ComboboxProps): React.JSX.Element;

type CalendarProps = React.ComponentProps<typeof DayPicker> & {
    /**
     * Nomes acessíveis das setas de mês. Traduza-os — e passe também `locale`
     * (do react-day-picker), que por padrão é pt-BR: os dois juntos é que fazem
     * o calendário falar a língua do app.
     */
    prevMonthLabel?: string;
    nextMonthLabel?: string;
};
/**
 * Calendário. 280px, com a folga do menu — então os dias dos cantos ficam
 * concêntricos com a caixa. O dia escolhido é tinta; hoje é um anel.
 */
declare function Calendar({ className, classNames, prevMonthLabel, nextMonthLabel, ...props }: CalendarProps): React.JSX.Element;

interface DatePickerProps {
    value?: Date;
    onChange?: (date: Date | undefined) => void;
    /** O que aparece quando não há data. */
    placeholder?: string;
    disabled?: boolean;
    id?: string;
    className?: string;
    /** Datas que não se pode escolher. */
    disabledDates?: React.ComponentProps<typeof Calendar>["disabled"];
}
/** Campo de data: gatilho na régua, calendário num popover. */
declare function DatePicker({ value, onChange, placeholder, disabled, id, className, disabledDates, }: DatePickerProps): React.JSX.Element;

interface CardProps extends React.ComponentPropsWithoutRef<"div"> {
    /** `section` usa o raio maior (20) para blocos de página; `flat` é poço, sem elevação. */
    variant?: "card" | "section" | "flat";
    /** Sobe para e2 no hover. Use só quando a coisa inteira é clicável. */
    interactive?: boolean;
}
/**
 * Card é sempre neutro: o estado vai num Chip, nunca no fundo nem na borda.
 * Papel elevado, anel de hairline e a luz de 1px no topo.
 */
declare const Card: React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>>;
declare function CardHeader({ className, ...props }: React.ComponentPropsWithoutRef<"div">): React.JSX.Element;
declare function CardTitle({ className, ...props }: React.ComponentPropsWithoutRef<"h3">): React.JSX.Element;
declare function CardDescription({ className, ...props }: React.ComponentPropsWithoutRef<"p">): React.JSX.Element;
declare function CardBody({ className, ...props }: React.ComponentPropsWithoutRef<"div">): React.JSX.Element;
declare function CardFooter({ className, ...props }: React.ComponentPropsWithoutRef<"div">): React.JSX.Element;
/** Poço: código, faixa de tabela, citação — um degrau abaixo da face do card. */
declare function Well({ className, ...props }: React.ComponentPropsWithoutRef<"div">): React.JSX.Element;
/** Lista com hairline entre as linhas, nunca abaixo da última. */
declare function Rows({ className, ...props }: React.ComponentPropsWithoutRef<"div">): React.JSX.Element;
declare function Row({ className, ...props }: React.ComponentPropsWithoutRef<"div">): React.JSX.Element;

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
    /** Face elevada em vez de linha rasa. */
    card?: boolean;
    /** Placa no hover e cursor de mão. */
    interactive?: boolean;
}
/** A linha de uma lista: face à esquerda, palavras no meio, ação à direita. */
declare const Item: React.ForwardRefExoticComponent<ItemProps & React.RefAttributes<HTMLDivElement>>;
declare function ItemMedia({ className, ...props }: React.ComponentPropsWithoutRef<"div">): React.JSX.Element;
declare function ItemMain({ className, ...props }: React.ComponentPropsWithoutRef<"div">): React.JSX.Element;
declare function ItemTitle({ className, ...props }: React.ComponentPropsWithoutRef<"p">): React.JSX.Element;
declare function ItemDescription({ className, ...props }: React.ComponentPropsWithoutRef<"p">): React.JSX.Element;
declare function ItemSide({ className, ...props }: React.ComponentPropsWithoutRef<"div">): React.JSX.Element;

/** Área de rolagem com barra fina de tinta, igual nos dois sistemas. */
declare const ScrollArea: React.ForwardRefExoticComponent<Omit<ScrollAreaPrimitive.ScrollAreaProps & React.RefAttributes<HTMLDivElement>, "ref"> & {
    orientation?: "vertical" | "horizontal" | "both";
} & React.RefAttributes<HTMLDivElement>>;
/** Caixa de proporção fixa — para imagem e vídeo não pularem ao carregar. */
declare function AspectRatio({ className, ...props }: React.ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root>): React.JSX.Element;

/** Painéis que a pessoa redimensiona. A divisa é um hairline que engrossa no hover. */
declare function Panels({ className, ...props }: React.ComponentPropsWithoutRef<typeof PanelGroup>): React.JSX.Element;
declare function Pane({ className, ...props }: React.ComponentPropsWithoutRef<typeof Panel>): React.JSX.Element;
declare function PaneHandle({ className, grip, ...props }: React.ComponentPropsWithoutRef<typeof PanelResizeHandle> & {
    grip?: boolean;
}): React.JSX.Element;

/**
 * Texto corrido — para o que vem de markdown, de um CMS, de um e-mail.
 * 68 caracteres por linha, que é onde o olho não se perde, e a hierarquia
 * inteira já resolvida: título, lista, citação, código, tabela, imagem.
 */
declare function Prose({ className, ...props }: React.ComponentPropsWithoutRef<"div">): React.JSX.Element;

type ChipTone = "neutral" | "attention" | "ok" | "danger" | "info" | "accent" | "solid";
interface ChipProps extends React.ComponentPropsWithoutRef<"span"> {
    /**
     * `attention` só quando algo espera uma pessoa. Um chip de estado leva
     * ícone, nunca bolinha colorida.
     */
    tone?: ChipTone;
    icon?: LucideIcon;
    /** Contador: largura mínima quadrada e centrado. */
    count?: boolean;
}
/** Etiqueta que não se pressiona: estado, contador, menção. */
declare function Chip({ className, tone, icon, count, children, ...props }: ChipProps): React.JSX.Element;

type NoteTone = "neutral" | "info" | "ok" | "attention" | "danger";
interface NoteProps extends Omit<React.ComponentPropsWithoutRef<"div">, "title"> {
    tone?: NoteTone;
    title?: React.ReactNode;
    /** `false` tira o ícone; um nó substitui o padrão. */
    icon?: LucideIcon | false;
}
/**
 * Aviso: face neutra com uma barra de 2px na lateral. A cor fica na barra e no
 * ícone — nunca tingindo o fundo inteiro.
 */
declare function Note({ className, tone, title, icon, children, ...props }: NoteProps): React.JSX.Element;

interface EmptyProps extends Omit<React.ComponentPropsWithoutRef<"div">, "title"> {
    icon?: LucideIcon;
    title: React.ReactNode;
    /** Uma linha dizendo o que fazer a respeito. */
    desc?: React.ReactNode;
    /** Botões. No máximo dois, e o primeiro é a ação óbvia. */
    actions?: React.ReactNode;
    /** `page` ocupa a tela; `inline` cabe dentro de um card. */
    size?: "page" | "panel" | "inline";
}
/**
 * O que mostrar quando não há nada. Nunca deixe uma tela em branco: diga o que
 * está vazio e qual é o próximo passo.
 */
declare function Empty({ className, icon, title, desc, actions, size, ...props }: EmptyProps): React.JSX.Element;

interface AvatarProps extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
    src?: string;
    /** Iniciais quando não há imagem. */
    fallback: string;
    size?: "sm" | "md" | "lg";
    /**
     * Marca: quadrado com raio a 30% do lado e um canto vivo no inferior
     * esquerdo, no degradê do acento. Reserve para o que não é pessoa — a
     * identidade de um produto, de um bot, de um sistema.
     */
    mark?: boolean;
    alt?: string;
}
/** Pessoas são círculos. A marca é o quadrado de canto vivo. */
declare function Avatar({ className, src, fallback, size, mark, alt, ...props }: AvatarProps): React.JSX.Element;

/** Placeholder de carregamento — sempre `sunken`, com a forma do conteúdo real. */
declare function Skeleton({ className, ...props }: React.ComponentPropsWithoutRef<"div">): React.JSX.Element;
declare function Spinner({ className, label, ...props }: React.ComponentPropsWithoutRef<"svg"> & {
    label?: string;
}): React.JSX.Element;
declare const Separator: React.ForwardRefExoticComponent<Omit<SeparatorPrimitive.SeparatorProps & React.RefAttributes<HTMLDivElement>, "ref"> & {
    strong?: boolean;
} & React.RefAttributes<HTMLDivElement>>;

interface MeterProps extends Omit<React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>, "value"> {
    /** 0–100. `undefined` deixa indeterminado, com a tinta atravessando. */
    value?: number;
    tone?: "ink" | "ok" | "attention" | "danger";
    thin?: boolean;
    /** Uma marca vertical no trilho — o limite do plano, a meta. */
    mark?: number;
}
/**
 * Medidor. O trilho é tinta translúcida, não superfície — então ele aparece
 * igual num card elevado e num poço.
 */
declare const Meter: React.ForwardRefExoticComponent<MeterProps & React.RefAttributes<HTMLDivElement>>;
interface StepsProps extends React.ComponentPropsWithoutRef<"div"> {
    total: number;
    /** Quantos passos já terminaram. */
    done: number;
    /** `true` acende o passo seguinte com a tinta viajando. */
    running?: boolean;
    label?: string;
}
/** Passos de um trabalho: barra por passo, tinta no que terminou. */
declare function Steps({ className, total, done, running, label, ...props }: StepsProps): React.JSX.Element;

/**
 * Tabela. Cabeçalho fixo no poço, hairline entre as linhas, algarismos
 * tabulares em tudo. A caixa rola sozinha na horizontal — a página nunca.
 */
declare function TableWrap({ className, ...props }: React.ComponentPropsWithoutRef<"div">): React.JSX.Element;
declare const Table: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>, "ref"> & {
    hover?: boolean;
    /**
     * Fileira mais larga. A régua da tabela é compacta por padrão; use só na
     * listagem de poucas linhas e muita leitura, onde a densidade não compra nada.
     */
    roomy?: boolean;
} & React.RefAttributes<HTMLTableElement>>;
declare function TableHead({ className, ...props }: React.ComponentPropsWithoutRef<"thead">): React.JSX.Element;
declare function TableBody({ className, ...props }: React.ComponentPropsWithoutRef<"tbody">): React.JSX.Element;
declare function TableFoot({ className, ...props }: React.ComponentPropsWithoutRef<"tfoot">): React.JSX.Element;
declare function TableRow({ className, ...props }: React.ComponentPropsWithoutRef<"tr">): React.JSX.Element;
/** `align` do HTML é um atributo antigo com outros valores, então usamos nome próprio. */
type CellAlign = "start" | "center" | "end";
interface TableCellProps extends Omit<React.ComponentPropsWithoutRef<"td">, "align"> {
    /** `end` alinha número à direita; `center` centraliza. */
    alignment?: CellAlign;
}
declare function TableCell({ className, alignment, ...props }: TableCellProps): React.JSX.Element;
interface TableHeaderProps extends Omit<React.ComponentPropsWithoutRef<"th">, "align"> {
    alignment?: CellAlign;
}
declare function TableHeader({ className, alignment, ...props }: TableHeaderProps): React.JSX.Element;
declare function TableCaption({ className, ...props }: React.ComponentPropsWithoutRef<"caption">): React.JSX.Element;

type EmblaOptions = NonNullable<Parameters<typeof useEmblaCarousel>[0]>;
interface CarouselProps extends React.ComponentPropsWithoutRef<"div"> {
    options?: EmblaOptions;
    /** `false` esconde as setas — então deixe claro que arrasta. */
    arrows?: boolean;
    label?: string;
    /** Nomes acessíveis das setas. Traduza-os. */
    prevLabel?: string;
    nextLabel?: string;
}
/**
 * Uma fileira que desliza item por item. As setas flutuam nas bordas e a
 * fileira some sob elas — só do lado onde ainda há coisa para ver.
 */
declare function Carousel({ className, options, arrows, label, prevLabel, nextLabel, children, ...props }: CarouselProps): React.JSX.Element;
declare function CarouselSlide({ className, ...props }: React.ComponentPropsWithoutRef<"div">): React.JSX.Element;

/** Trilha. O último item é a página onde você está — não é link. */
declare function Breadcrumb({ className, ...props }: React.ComponentPropsWithoutRef<"nav">): React.JSX.Element;
declare function BreadcrumbLink({ className, ...props }: React.ComponentPropsWithoutRef<"a">): React.JSX.Element;
declare function BreadcrumbSeparator({ className, ...props }: React.ComponentPropsWithoutRef<"span">): React.JSX.Element;
declare function BreadcrumbCurrent({ className, ...props }: React.ComponentPropsWithoutRef<"span">): React.JSX.Element;

interface PaginationProps extends Omit<React.ComponentPropsWithoutRef<"nav">, "onChange"> {
    page: number;
    /** Total de páginas. 1 esconde o controle inteiro. */
    pages: number;
    onChange: (page: number) => void;
    /** Quantas páginas mostrar de cada lado da atual. */
    around?: number;
}
/** Paginação na régua compacta, com algarismos tabulares. */
declare function Pagination({ className, page, pages, onChange, around, ...props }: PaginationProps): React.JSX.Element | null;

/**
 * Barra lateral. Papel próprio (`--voga-side`), e a linha escolhida é um
 * degrau de tinta nesse papel — nunca uma cor.
 */
interface SidebarProps extends React.ComponentPropsWithoutRef<"nav"> {
    /**
     * Régua `sm` (32) no lugar de `md` (40). Para o produto com muitos módulos:
     * uma barra de 24 entradas a 40px não cabe na janela, e rolar a navegação é
     * pior que apertá-la. O alvo de toque continua 44 — ele cresce por fora.
     */
    compact?: boolean;
}
declare function Sidebar({ className, compact, ...props }: SidebarProps): React.JSX.Element;
declare function SidebarGroup({ className, ...props }: React.ComponentPropsWithoutRef<"div">): React.JSX.Element;
declare function SidebarLabel({ className, ...props }: React.ComponentPropsWithoutRef<"p">): React.JSX.Element;
interface SidebarItemProps extends React.ComponentPropsWithoutRef<"a"> {
    icon?: LucideIcon;
    /** Marca como a página atual: afunda no papel e engrossa a palavra. */
    active?: boolean;
    /** Item de segundo nível, recuado e menor. */
    sub?: boolean;
    /** Contador à direita — passe um `Chip`. */
    side?: React.ReactNode;
}
declare const SidebarItem: React.ForwardRefExoticComponent<SidebarItemProps & React.RefAttributes<HTMLAnchorElement>>;
/** A casca de três colunas: barra lateral + área de trabalho. */
declare function Shell({ className, ...props }: React.ComponentPropsWithoutRef<"div">): React.JSX.Element;
declare function ShellMain({ className, ...props }: React.ComponentPropsWithoutRef<"main">): React.JSX.Element;

/** Menu de navegação de site: gatilhos rasos, painel em vidro embaixo. */
declare const NavMenu: React.ForwardRefExoticComponent<Omit<NavigationMenuPrimitive.NavigationMenuProps & React.RefAttributes<HTMLElement>, "ref"> & React.RefAttributes<HTMLElement>>;
declare const NavMenuList: React.ForwardRefExoticComponent<Omit<NavigationMenuPrimitive.NavigationMenuListProps & React.RefAttributes<HTMLUListElement>, "ref"> & React.RefAttributes<HTMLUListElement>>;
declare const NavMenuItem: React.ForwardRefExoticComponent<NavigationMenuPrimitive.NavigationMenuItemProps & React.RefAttributes<HTMLLIElement>>;
declare const NavMenuTrigger: React.ForwardRefExoticComponent<Omit<NavigationMenuPrimitive.NavigationMenuTriggerProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
declare const NavMenuContent: React.ForwardRefExoticComponent<Omit<NavigationMenuPrimitive.NavigationMenuContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const NavMenuLink: React.ForwardRefExoticComponent<Omit<NavigationMenuPrimitive.NavigationMenuLinkProps & React.RefAttributes<HTMLAnchorElement>, "ref"> & React.RefAttributes<HTMLAnchorElement>>;
/** Cartão de link dentro do painel: título em cima, uma linha explicando. */
declare const NavMenuCard: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, "ref"> & {
    title: string;
    desc?: string;
} & React.RefAttributes<HTMLAnchorElement>>;

/** Barra de menus de aplicativo. A barra é rasa; o painel aberto é vidro. */
declare const Menubar: React.ForwardRefExoticComponent<Omit<MenubarPrimitive.MenubarProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const MenubarMenu: (props: MenubarPrimitive.MenubarMenuProps & {
    __scopeMenubar?: _radix_ui_react_context.Scope | undefined;
}) => React.JSX.Element;
declare const MenubarGroup: React.ForwardRefExoticComponent<MenubarPrimitive.MenubarGroupProps & React.RefAttributes<HTMLDivElement>>;
declare const MenubarTrigger: React.ForwardRefExoticComponent<Omit<MenubarPrimitive.MenubarTriggerProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
declare const MenubarContent: React.ForwardRefExoticComponent<Omit<MenubarPrimitive.MenubarContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const MenubarItem: React.ForwardRefExoticComponent<Omit<MenubarPrimitive.MenubarItemProps & React.RefAttributes<HTMLDivElement>, "ref"> & {
    tone?: "default" | "danger";
    kbd?: string[];
} & React.RefAttributes<HTMLDivElement>>;
declare const MenubarCheckboxItem: React.ForwardRefExoticComponent<Omit<MenubarPrimitive.MenubarCheckboxItemProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare function MenubarLabel({ className, ...props }: React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label>): React.JSX.Element;
declare function MenubarSeparator({ className, ...props }: React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>): React.JSX.Element;

declare const Dialog: React.FC<DialogPrimitive.DialogProps>;
declare const DialogTrigger: React.ForwardRefExoticComponent<DialogPrimitive.DialogTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const DialogClose: React.ForwardRefExoticComponent<DialogPrimitive.DialogCloseProps & React.RefAttributes<HTMLButtonElement>>;
declare const DialogContent: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & {
    /** `false` tira o X do canto — então feche pelo rodapé. */
    showClose?: boolean;
    /**
     * O nome acessível do X. Traduza-o: num app que não fala português o
     * leitor de tela anunciaria "Fechar" no meio de uma tela em outra língua.
     */
    closeLabel?: string;
} & React.RefAttributes<HTMLDivElement>>;
declare function DialogHeader({ className, ...props }: React.ComponentPropsWithoutRef<"div">): React.JSX.Element;
declare function DialogFooter({ className, ...props }: React.ComponentPropsWithoutRef<"div">): React.JSX.Element;
declare const DialogTitle: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogTitleProps & React.RefAttributes<HTMLHeadingElement>, "ref"> & React.RefAttributes<HTMLHeadingElement>>;
declare const DialogDescription: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogDescriptionProps & React.RefAttributes<HTMLParagraphElement>, "ref"> & React.RefAttributes<HTMLParagraphElement>>;

/**
 * Diálogo que exige uma escolha: não fecha clicando fora nem com Esc. Use só
 * quando a ação não tem volta, e nomeie o alvo no título ("Excluir a rampa?").
 */
declare const AlertDialog: React.FC<AlertDialogPrimitive.AlertDialogProps>;
declare const AlertDialogTrigger: React.ForwardRefExoticComponent<AlertDialogPrimitive.AlertDialogTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const AlertDialogCancel: React.ForwardRefExoticComponent<AlertDialogPrimitive.AlertDialogCancelProps & React.RefAttributes<HTMLButtonElement>>;
declare const AlertDialogAction: React.ForwardRefExoticComponent<AlertDialogPrimitive.AlertDialogActionProps & React.RefAttributes<HTMLButtonElement>>;
declare const AlertDialogContent: React.ForwardRefExoticComponent<Omit<AlertDialogPrimitive.AlertDialogContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare function AlertDialogHeader({ className, ...props }: React.ComponentPropsWithoutRef<"div">): React.JSX.Element;
declare function AlertDialogFooter({ className, ...props }: React.ComponentPropsWithoutRef<"div">): React.JSX.Element;
declare const AlertDialogTitle: React.ForwardRefExoticComponent<Omit<AlertDialogPrimitive.AlertDialogTitleProps & React.RefAttributes<HTMLHeadingElement>, "ref"> & React.RefAttributes<HTMLHeadingElement>>;
declare const AlertDialogDescription: React.ForwardRefExoticComponent<Omit<AlertDialogPrimitive.AlertDialogDescriptionProps & React.RefAttributes<HTMLParagraphElement>, "ref"> & React.RefAttributes<HTMLParagraphElement>>;

declare const Sheet: React.FC<DialogPrimitive.DialogProps>;
declare const SheetTrigger: React.ForwardRefExoticComponent<DialogPrimitive.DialogTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const SheetClose: React.ForwardRefExoticComponent<DialogPrimitive.DialogCloseProps & React.RefAttributes<HTMLButtonElement>>;
declare const SheetContent: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & {
    side?: "right" | "left" | "top" | "bottom";
    showClose?: boolean;
    /** O nome acessível do X. Traduza-o. */
    closeLabel?: string;
} & React.RefAttributes<HTMLDivElement>>;
declare function SheetHeader({ className, ...props }: React.ComponentPropsWithoutRef<"div">): React.JSX.Element;
declare function SheetFooter({ className, ...props }: React.ComponentPropsWithoutRef<"div">): React.JSX.Element;
declare const SheetTitle: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogTitleProps & React.RefAttributes<HTMLHeadingElement>, "ref"> & React.RefAttributes<HTMLHeadingElement>>;
declare const SheetDescription: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogDescriptionProps & React.RefAttributes<HTMLParagraphElement>, "ref"> & React.RefAttributes<HTMLParagraphElement>>;
/**
 * Gaveta do telefone: puxa de baixo, com alça, e o dedo arrasta para fechar.
 * Num desktop, prefira `Sheet`.
 */
declare const Drawer: typeof vaul.Root;
declare const DrawerTrigger: React.ForwardRefExoticComponent<DialogPrimitive.DialogTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const DrawerClose: React.ForwardRefExoticComponent<DialogPrimitive.DialogCloseProps & React.RefAttributes<HTMLButtonElement>>;
declare const DrawerTitle: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogTitleProps & React.RefAttributes<HTMLHeadingElement>, "ref"> & React.RefAttributes<HTMLHeadingElement>>;
declare const DrawerDescription: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogDescriptionProps & React.RefAttributes<HTMLParagraphElement>, "ref"> & React.RefAttributes<HTMLParagraphElement>>;
declare const DrawerContent: React.ForwardRefExoticComponent<Omit<Omit<DialogPrimitive.DialogContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>, "ref"> & {
    grip?: boolean;
} & React.RefAttributes<HTMLDivElement>>;

declare const Popover: React.FC<PopoverPrimitive.PopoverProps>;
declare const PopoverTrigger: React.ForwardRefExoticComponent<PopoverPrimitive.PopoverTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const PopoverClose: React.ForwardRefExoticComponent<PopoverPrimitive.PopoverCloseProps & React.RefAttributes<HTMLButtonElement>>;
declare const PopoverAnchor: React.ForwardRefExoticComponent<PopoverPrimitive.PopoverAnchorProps & React.RefAttributes<HTMLDivElement>>;
/** Vidro com palavras e controles próprios. Para uma lista, use `Menu`. */
declare const PopoverContent: React.ForwardRefExoticComponent<Omit<PopoverPrimitive.PopoverContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & {
    arrow?: boolean;
} & React.RefAttributes<HTMLDivElement>>;
declare const HoverCard: React.FC<HoverCardPrimitive.HoverCardProps>;
declare const HoverCardTrigger: React.ForwardRefExoticComponent<HoverCardPrimitive.HoverCardTriggerProps & React.RefAttributes<HTMLAnchorElement>>;
/** Abre ao passar o mouse. Nunca guarde aqui a única via para uma ação. */
declare const HoverCardContent: React.ForwardRefExoticComponent<Omit<HoverCardPrimitive.HoverCardContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;

declare const Menu: React.FC<DropdownMenuPrimitive.DropdownMenuProps>;
declare const MenuTrigger: React.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const MenuGroup: React.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuGroupProps & React.RefAttributes<HTMLDivElement>>;
declare const MenuRadioGroup: React.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuRadioGroupProps & React.RefAttributes<HTMLDivElement>>;
/** Painel em vidro. O raio dos itens é concêntrico ao dele. */
declare const MenuContent: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const MenuItem: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuItemProps & React.RefAttributes<HTMLDivElement>, "ref"> & {
    tone?: "default" | "danger";
    /** Atalho à direita: `["⌘", "R"]`. */
    kbd?: string[];
} & React.RefAttributes<HTMLDivElement>>;
declare const MenuCheckboxItem: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuCheckboxItemProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
/**
 * A escolha ÚNICA dentro de um `MenuRadioGroup`. O grupo já era exportado sem
 * ela, o que o deixava inútil: não havia com que preencher o grupo.
 *
 * Mesma marca do item de marcar — o que distingue os dois é a semântica que o
 * Radix dá (um de cada vez contra vários), e é ela que o leitor de tela anuncia.
 */
declare const MenuRadioItem: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuRadioItemProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare function MenuLabel({ className, ...props }: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>): React.JSX.Element;
declare function MenuSeparator({ className, ...props }: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>): React.JSX.Element;

/** Menu do botão direito. Tudo que está aqui tem de existir em outro lugar também. */
declare const ContextMenu: React.FC<ContextMenuPrimitive.ContextMenuProps>;
declare const ContextMenuTrigger: React.ForwardRefExoticComponent<ContextMenuPrimitive.ContextMenuTriggerProps & React.RefAttributes<HTMLSpanElement>>;
declare const ContextMenuGroup: React.ForwardRefExoticComponent<ContextMenuPrimitive.ContextMenuGroupProps & React.RefAttributes<HTMLDivElement>>;
declare const ContextMenuContent: React.ForwardRefExoticComponent<Omit<ContextMenuPrimitive.ContextMenuContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const ContextMenuItem: React.ForwardRefExoticComponent<Omit<ContextMenuPrimitive.ContextMenuItemProps & React.RefAttributes<HTMLDivElement>, "ref"> & {
    tone?: "default" | "danger";
    kbd?: string[];
} & React.RefAttributes<HTMLDivElement>>;
declare const ContextMenuCheckboxItem: React.ForwardRefExoticComponent<Omit<ContextMenuPrimitive.ContextMenuCheckboxItemProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare function ContextMenuLabel({ className, ...props }: React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label>): React.JSX.Element;
declare function ContextMenuSeparator({ className, ...props }: React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>): React.JSX.Element;

/**
 * Paleta de comandos. Em vidro, raio de seção, busca no topo. Grupos nomeiam
 * o que fazem ("Ir para", "Pedir a…"), setas e Enter navegam, Esc fecha.
 */
declare const Command: React.ForwardRefExoticComponent<{
    children?: React.ReactNode;
} & Pick<Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React.HTMLAttributes<HTMLDivElement>> & {
    ref?: React.Ref<HTMLDivElement>;
} & {
    asChild?: boolean;
}, "key" | keyof React.HTMLAttributes<HTMLDivElement> | "asChild"> & {
    label?: string;
    shouldFilter?: boolean;
    filter?: (value: string, search: string, keywords?: string[]) => number;
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    loop?: boolean;
    disablePointerSelection?: boolean;
    vimBindings?: boolean;
} & React.RefAttributes<HTMLDivElement>> & {
    List: React.ForwardRefExoticComponent<{
        children?: React.ReactNode;
    } & Pick<Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React.HTMLAttributes<HTMLDivElement>> & {
        ref?: React.Ref<HTMLDivElement>;
    } & {
        asChild?: boolean;
    }, "key" | keyof React.HTMLAttributes<HTMLDivElement> | "asChild"> & {
        label?: string;
    } & React.RefAttributes<HTMLDivElement>>;
    Item: React.ForwardRefExoticComponent<{
        children?: React.ReactNode;
    } & Omit<Pick<Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React.HTMLAttributes<HTMLDivElement>> & {
        ref?: React.Ref<HTMLDivElement>;
    } & {
        asChild?: boolean;
    }, "key" | keyof React.HTMLAttributes<HTMLDivElement> | "asChild">, "onSelect" | "disabled" | "value"> & {
        disabled?: boolean;
        onSelect?: (value: string) => void;
        value?: string;
        keywords?: string[];
        forceMount?: boolean;
    } & React.RefAttributes<HTMLDivElement>>;
    Input: React.ForwardRefExoticComponent<Omit<Pick<Pick<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "key" | keyof React.InputHTMLAttributes<HTMLInputElement>> & {
        ref?: React.Ref<HTMLInputElement>;
    } & {
        asChild?: boolean;
    }, "key" | "asChild" | keyof React.InputHTMLAttributes<HTMLInputElement>>, "onChange" | "value" | "type"> & {
        value?: string;
        onValueChange?: (search: string) => void;
    } & React.RefAttributes<HTMLInputElement>>;
    Group: React.ForwardRefExoticComponent<{
        children?: React.ReactNode;
    } & Omit<Pick<Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React.HTMLAttributes<HTMLDivElement>> & {
        ref?: React.Ref<HTMLDivElement>;
    } & {
        asChild?: boolean;
    }, "key" | keyof React.HTMLAttributes<HTMLDivElement> | "asChild">, "heading" | "value"> & {
        heading?: React.ReactNode;
        value?: string;
        forceMount?: boolean;
    } & React.RefAttributes<HTMLDivElement>>;
    Separator: React.ForwardRefExoticComponent<Pick<Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React.HTMLAttributes<HTMLDivElement>> & {
        ref?: React.Ref<HTMLDivElement>;
    } & {
        asChild?: boolean;
    }, "key" | keyof React.HTMLAttributes<HTMLDivElement> | "asChild"> & {
        alwaysRender?: boolean;
    } & React.RefAttributes<HTMLDivElement>>;
    Dialog: React.ForwardRefExoticComponent<DialogPrimitive.DialogProps & {
        children?: React.ReactNode;
    } & Pick<Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React.HTMLAttributes<HTMLDivElement>> & {
        ref?: React.Ref<HTMLDivElement>;
    } & {
        asChild?: boolean;
    }, "key" | keyof React.HTMLAttributes<HTMLDivElement> | "asChild"> & {
        label?: string;
        shouldFilter?: boolean;
        filter?: (value: string, search: string, keywords?: string[]) => number;
        defaultValue?: string;
        value?: string;
        onValueChange?: (value: string) => void;
        loop?: boolean;
        disablePointerSelection?: boolean;
        vimBindings?: boolean;
    } & {
        overlayClassName?: string;
        contentClassName?: string;
        container?: HTMLElement;
    } & React.RefAttributes<HTMLDivElement>>;
    Empty: React.ForwardRefExoticComponent<{
        children?: React.ReactNode;
    } & Pick<Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React.HTMLAttributes<HTMLDivElement>> & {
        ref?: React.Ref<HTMLDivElement>;
    } & {
        asChild?: boolean;
    }, "key" | keyof React.HTMLAttributes<HTMLDivElement> | "asChild"> & React.RefAttributes<HTMLDivElement>>;
    Loading: React.ForwardRefExoticComponent<{
        children?: React.ReactNode;
    } & Pick<Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React.HTMLAttributes<HTMLDivElement>> & {
        ref?: React.Ref<HTMLDivElement>;
    } & {
        asChild?: boolean;
    }, "key" | keyof React.HTMLAttributes<HTMLDivElement> | "asChild"> & {
        progress?: number;
        label?: string;
    } & React.RefAttributes<HTMLDivElement>>;
};
declare const CommandInput: React.ForwardRefExoticComponent<Omit<Omit<Pick<Pick<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "key" | keyof React.InputHTMLAttributes<HTMLInputElement>> & {
    ref?: React.Ref<HTMLInputElement>;
} & {
    asChild?: boolean;
}, "key" | "asChild" | keyof React.InputHTMLAttributes<HTMLInputElement>>, "type" | "onChange" | "value"> & {
    value?: string;
    onValueChange?: (search: string) => void;
} & React.RefAttributes<HTMLInputElement>, "ref"> & React.RefAttributes<HTMLInputElement>>;
declare const CommandList: React.ForwardRefExoticComponent<Omit<{
    children?: React.ReactNode;
} & Pick<Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React.HTMLAttributes<HTMLDivElement>> & {
    ref?: React.Ref<HTMLDivElement>;
} & {
    asChild?: boolean;
}, "key" | keyof React.HTMLAttributes<HTMLDivElement> | "asChild"> & {
    label?: string;
} & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const CommandEmpty: React.ForwardRefExoticComponent<Omit<{
    children?: React.ReactNode;
} & Pick<Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React.HTMLAttributes<HTMLDivElement>> & {
    ref?: React.Ref<HTMLDivElement>;
} & {
    asChild?: boolean;
}, "key" | keyof React.HTMLAttributes<HTMLDivElement> | "asChild"> & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const CommandGroup: React.ForwardRefExoticComponent<Omit<{
    children?: React.ReactNode;
} & Omit<Pick<Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React.HTMLAttributes<HTMLDivElement>> & {
    ref?: React.Ref<HTMLDivElement>;
} & {
    asChild?: boolean;
}, "key" | keyof React.HTMLAttributes<HTMLDivElement> | "asChild">, "heading" | "value"> & {
    heading?: React.ReactNode;
    value?: string;
    forceMount?: boolean;
} & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const CommandItem: React.ForwardRefExoticComponent<Omit<{
    children?: React.ReactNode;
} & Omit<Pick<Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React.HTMLAttributes<HTMLDivElement>> & {
    ref?: React.Ref<HTMLDivElement>;
} & {
    asChild?: boolean;
}, "key" | keyof React.HTMLAttributes<HTMLDivElement> | "asChild">, "onSelect" | "disabled" | "value"> & {
    disabled?: boolean;
    onSelect?: (value: string) => void;
    value?: string;
    keywords?: string[];
    forceMount?: boolean;
} & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const CommandSeparator: React.ForwardRefExoticComponent<Omit<Pick<Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React.HTMLAttributes<HTMLDivElement>> & {
    ref?: React.Ref<HTMLDivElement>;
} & {
    asChild?: boolean;
}, "key" | keyof React.HTMLAttributes<HTMLDivElement> | "asChild"> & {
    alwaysRender?: boolean;
} & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare function CommandShortcut({ className, ...props }: React.ComponentPropsWithoutRef<"span">): React.JSX.Element;
/** A paleta inteira em diálogo, do jeito que o ⌘K abre. */
declare function CommandDialog({ open, onOpenChange, label, children, className, }: {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    label?: string;
    children: React.ReactNode;
    className?: string;
}): React.JSX.Element;
/** Liga ⌘K / Ctrl+K a um estado aberto/fechado. */
declare function useCommandShortcut(onOpen: () => void, key?: string): void;

declare const Accordion: React.ForwardRefExoticComponent<(AccordionPrimitive.AccordionSingleProps | AccordionPrimitive.AccordionMultipleProps) & React.RefAttributes<HTMLDivElement>>;
declare const AccordionItem: React.ForwardRefExoticComponent<Omit<AccordionPrimitive.AccordionItemProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const AccordionTrigger: React.ForwardRefExoticComponent<Omit<AccordionPrimitive.AccordionTriggerProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
declare const AccordionContent: React.ForwardRefExoticComponent<Omit<AccordionPrimitive.AccordionContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
/** Uma linha quieta sobre o que a maioria nunca precisa abrir. */
declare const Collapsible: React.ForwardRefExoticComponent<CollapsiblePrimitive.CollapsibleProps & React.RefAttributes<HTMLDivElement>>;
declare const CollapsibleTrigger: React.ForwardRefExoticComponent<Omit<CollapsiblePrimitive.CollapsibleTriggerProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
declare const CollapsibleContent: React.ForwardRefExoticComponent<Omit<CollapsiblePrimitive.CollapsibleContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;

/** Envolva a raiz do app uma vez. */
declare const TipProvider: React.FC<TooltipPrimitive.TooltipProviderProps>;
declare const TipRoot: React.FC<TooltipPrimitive.TooltipProps>;
declare const TipTrigger: React.ForwardRefExoticComponent<TooltipPrimitive.TooltipTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const TipContent: React.ForwardRefExoticComponent<Omit<TooltipPrimitive.TooltipContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
interface TipProps extends Omit<React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Root>, "children"> {
    content: React.ReactNode;
    children: React.ReactNode;
    side?: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>["side"];
}
/** O caso comum: um gatilho, um texto. */
declare function Tip({ content, children, side, ...props }: TipProps): React.JSX.Element;

declare function Toaster({ className, position, ...props }: React.ComponentPropsWithoutRef<typeof Toaster$1>): React.JSX.Element;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger, type AffixProps, AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, AspectRatio, Avatar, type AvatarProps, Breadcrumb, BreadcrumbCurrent, BreadcrumbLink, BreadcrumbSeparator, Button, ButtonGroup, type ButtonProps, type ButtonVariant, Calendar, type CalendarProps, Card, CardBody, CardDescription, CardFooter, CardHeader, type CardProps, CardTitle, Carousel, type CarouselProps, CarouselSlide, type CellAlign, Checkbox, Chip, type ChipProps, type ChipTone, Choice, type ChoiceProps, CodeInput, type CodeInputProps, Collapsible, CollapsibleContent, CollapsibleTrigger, Combobox, type ComboboxOption, type ComboboxProps, Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut, Composer, ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuGroup, ContextMenuItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuTrigger, ControlRow, type ControlSize, DatePicker, type DatePickerProps, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerTitle, DrawerTrigger, Empty, type EmptyProps, Eyebrow, Field, type FieldProps, Form, HoverCard, HoverCardContent, HoverCardTrigger, Icon, type IconProps, Input, InputAffix, InputGroup, type InputGroupProps, type InputProps, Item, ItemDescription, ItemMain, ItemMedia, type ItemProps, ItemSide, ItemTitle, Kbd, Label, Menu, MenuCheckboxItem, MenuContent, MenuGroup, MenuItem, MenuLabel, MenuRadioGroup, MenuRadioItem, MenuSeparator, MenuTrigger, Menubar, MenubarCheckboxItem, MenubarContent, MenubarGroup, MenubarItem, MenubarLabel, MenubarMenu, MenubarSeparator, MenubarTrigger, Meta, Meter, type MeterProps, NavMenu, NavMenuCard, NavMenuContent, NavMenuItem, NavMenuLink, NavMenuList, NavMenuTrigger, Note, type NoteProps, type NoteTone, Pagination, type PaginationProps, Pane, PaneHandle, Panels, Popover, PopoverAnchor, PopoverClose, PopoverContent, PopoverTrigger, Prose, Radio, RadioGroup, Row, Rows, ScrollArea, Segmented, SegmentedItem, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectRoot, SelectSeparator, SelectTrigger, SelectValue, Separator, Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger, Shell, ShellMain, Sidebar, SidebarGroup, SidebarItem, type SidebarItemProps, SidebarLabel, Skeleton, Slider, Spinner, SplitButton, type SplitButtonProps, Steps, type StepsProps, Switch, Table, TableBody, TableCaption, TableCell, type TableCellProps, TableFoot, TableHead, TableHeader, type TableHeaderProps, TableRow, TableWrap, Tabs, TabsContent, TabsList, TabsTrigger, Textarea, type Theme, Tip, TipContent, type TipProps, TipProvider, TipRoot, TipTrigger, Toaster, Toggle, Toolbar, ToolbarButton, ToolbarSeparator, Well, cn, pointerScript, themeScript, trackPointer, useCommandShortcut, useTheme };
