// ── Utilitários ───────────────────────────────────────────────────────────
export { cn } from "./lib/cn";
export { trackPointer, pointerScript } from "./lib/pointer";
export { useTheme, themeScript, type Theme } from "./lib/use-theme";
export { Icon, type IconProps } from "./components/icon";

// ── Ações ─────────────────────────────────────────────────────────────────
export {
  Button,
  type ButtonProps,
  type ButtonVariant,
  type ControlSize,
} from "./components/button";
export { ButtonGroup, SplitButton, type SplitButtonProps } from "./components/button-group";
export { Toolbar, ToolbarButton, ToolbarSeparator } from "./components/toolbar";
export { Kbd } from "./components/kbd";

// ── Formulário ────────────────────────────────────────────────────────────
export { Input, Textarea, Composer, type InputProps } from "./components/input";
export { InputGroup, InputAffix, type InputGroupProps, type AffixProps } from "./components/input-group";
export { CodeInput, type CodeInputProps } from "./components/code-input";
export { Field, Form, Label, Eyebrow, Meta, type FieldProps } from "./components/field";
export { Checkbox, Switch, ControlRow, Toggle } from "./components/toggle";
export { RadioGroup, Radio, Choice, type ChoiceProps } from "./components/radio";
export { Slider } from "./components/slider";
export {
  Segmented,
  SegmentedItem,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "./components/segmented";
export {
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from "./components/select";
export { Combobox, type ComboboxProps, type ComboboxOption } from "./components/combobox";
export { Calendar, type CalendarProps } from "./components/calendar";
export { DatePicker, type DatePickerProps } from "./components/date-picker";

// ── Superfícies ───────────────────────────────────────────────────────────
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardBody,
  CardFooter,
  Well,
  Rows,
  Row,
  type CardProps,
} from "./components/card";
export {
  Item,
  ItemMedia,
  ItemMain,
  ItemTitle,
  ItemDescription,
  ItemSide,
  type ItemProps,
} from "./components/item";
export { ScrollArea, AspectRatio } from "./components/scroll-area";
export { Panels, Pane, PaneHandle } from "./components/panels";
export { Prose } from "./components/prose";

// ── Estado ────────────────────────────────────────────────────────────────
export { Chip, type ChipProps, type ChipTone } from "./components/chip";
export { Note, type NoteProps, type NoteTone } from "./components/note";
export { Empty, type EmptyProps } from "./components/empty";
export { Avatar, type AvatarProps } from "./components/avatar";
export { Skeleton, Spinner, Separator } from "./components/feedback";
export { Meter, Steps, type MeterProps, type StepsProps } from "./components/meter";

// ── Dados ─────────────────────────────────────────────────────────────────
export {
  TableWrap,
  Table,
  TableHead,
  TableBody,
  TableFoot,
  TableRow,
  TableCell,
  TableHeader,
  TableCaption,
  type TableCellProps,
  type TableHeaderProps,
  type CellAlign,
} from "./components/table";
export { Carousel, CarouselSlide, type CarouselProps } from "./components/carousel";

// ── Navegação ─────────────────────────────────────────────────────────────
export {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbCurrent,
} from "./components/breadcrumb";
export { Pagination, type PaginationProps } from "./components/pagination";
export {
  Sidebar,
  SidebarGroup,
  SidebarLabel,
  SidebarItem,
  Shell,
  ShellMain,
  type SidebarItemProps,
} from "./components/sidebar";
export {
  NavMenu,
  NavMenuList,
  NavMenuItem,
  NavMenuTrigger,
  NavMenuContent,
  NavMenuLink,
  NavMenuCard,
} from "./components/nav-menu";
export {
  Menubar,
  MenubarMenu,
  MenubarGroup,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarCheckboxItem,
  MenubarLabel,
  MenubarSeparator,
} from "./components/menubar";

// ── Sobreposições ─────────────────────────────────────────────────────────
export {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "./components/dialog";
export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
} from "./components/alert-dialog";
export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
} from "./components/sheet";
export {
  Popover,
  PopoverTrigger,
  PopoverClose,
  PopoverAnchor,
  PopoverContent,
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "./components/popover";
export {
  Menu,
  MenuTrigger,
  MenuContent,
  MenuItem,
  MenuCheckboxItem,
  MenuLabel,
  MenuSeparator,
  MenuGroup,
  MenuRadioGroup,
} from "./components/menu";
export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuGroup,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuLabel,
  ContextMenuSeparator,
} from "./components/context-menu";
export {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
  CommandDialog,
  useCommandShortcut,
} from "./components/command";
export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./components/fold";
export {
  Tip,
  TipProvider,
  TipRoot,
  TipTrigger,
  TipContent,
  type TipProps,
} from "./components/tip";
export { Toaster, toast } from "./components/toast";
