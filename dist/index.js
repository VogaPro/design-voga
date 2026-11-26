export { Eyebrow, Field, Form, Label, Meta } from './chunk-7D5XUG5H.js';
import { Kbd, Icon, Button } from './chunk-NVVXZHBR.js';
export { Button, Composer, Empty, Icon, Input, Kbd, Pagination, Separator, Skeleton, Spinner, Table, TableBody, TableCaption, TableCell, TableFoot, TableHead, TableHeader, TableRow, TableWrap, Textarea } from './chunk-NVVXZHBR.js';
import { cn } from './chunk-7EOSDFS3.js';
export { cn } from './chunk-7EOSDFS3.js';
import * as React11 from 'react';
import { Check, ChevronDown, Search, X, ChevronRight, ChevronLeft, Calendar as Calendar$1, GripVertical, CircleAlert, TriangleAlert, CircleCheck, Info } from 'lucide-react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import * as ToolbarPrimitive from '@radix-ui/react-toolbar';
import { OTPInput } from 'input-otp';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import * as SliderPrimitive from '@radix-ui/react-slider';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as SelectPrimitive from '@radix-ui/react-select';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import { Command as Command$1 } from 'cmdk';
import * as DialogPrimitive2 from '@radix-ui/react-dialog';
import { DayPicker } from 'react-day-picker';
import { ptBR } from 'react-day-picker/locale';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import useEmblaCarousel from 'embla-carousel-react';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import * as MenubarPrimitive from '@radix-ui/react-menubar';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { Drawer as Drawer$1 } from 'vaul';
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { Toaster as Toaster$1 } from 'sonner';
export { toast } from 'sonner';

// src/lib/pointer.ts
function trackPointer() {
  if (typeof document === "undefined") return () => {
  };
  const root = document.documentElement;
  const mark = () => root.setAttribute("data-pointer", "");
  const clear = () => root.removeAttribute("data-pointer");
  const onKey = (event) => {
    if (event.key === "Tab" || event.key.startsWith("Arrow") || event.key === "Home" || event.key === "End") {
      clear();
    }
  };
  mark();
  document.addEventListener("pointerdown", mark, true);
  document.addEventListener("keydown", onKey, true);
  return () => {
    document.removeEventListener("pointerdown", mark, true);
    document.removeEventListener("keydown", onKey, true);
  };
}
var pointerScript = `(function(){var r=document.documentElement;r.setAttribute("data-pointer","");document.addEventListener("pointerdown",function(){r.setAttribute("data-pointer","")},true);document.addEventListener("keydown",function(e){if(e.key==="Tab"||e.key.indexOf("Arrow")===0||e.key==="Home"||e.key==="End")r.removeAttribute("data-pointer")},true)})()`;
var STORAGE_KEY = "voga-theme";
function apply(theme) {
  const root = document.documentElement;
  if (theme === "system") root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", theme);
}
function useTheme() {
  const [theme, setThemeState] = React11.useState("system");
  React11.useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "light" || saved === "dark" || saved === "system") {
        setThemeState(saved);
        apply(saved);
      }
    } catch {
    }
  }, []);
  const setTheme = React11.useCallback((next) => {
    setThemeState(next);
    apply(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
    }
  }, []);
  return { theme, setTheme };
}
var themeScript = `(function(){try{var t=localStorage.getItem("${STORAGE_KEY}");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;
var Menu = DropdownMenuPrimitive.Root;
var MenuTrigger = DropdownMenuPrimitive.Trigger;
var MenuGroup = DropdownMenuPrimitive.Group;
var MenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
var MenuContent = React11.forwardRef(function MenuContent2({ className, sideOffset = 6, ...props }, ref) {
  return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Content,
    {
      ref,
      sideOffset,
      className: cn("voga-glass voga-menu", className),
      style: { zIndex: "var(--voga-z-dropdown)" },
      ...props
    }
  ) });
});
var MenuItem = React11.forwardRef(function MenuItem2({ className, tone = "default", kbd, children, ...props }, ref) {
  return /* @__PURE__ */ jsxs(
    DropdownMenuPrimitive.Item,
    {
      ref,
      className: cn("voga-menu__item", tone === "danger" && "voga-menu__item--danger", className),
      ...props,
      children: [
        children,
        kbd?.length ? /* @__PURE__ */ jsx("span", { className: "voga-menu__shortcut", children: kbd.map((key) => /* @__PURE__ */ jsx(Kbd, { children: key }, key)) }) : null
      ]
    }
  );
});
var MenuCheckboxItem = React11.forwardRef(function MenuCheckboxItem2({ className, children, ...props }, ref) {
  return /* @__PURE__ */ jsxs(
    DropdownMenuPrimitive.CheckboxItem,
    {
      ref,
      className: cn("voga-menu__item voga-menu__item--indent", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { className: "voga-menu__mark", children: /* @__PURE__ */ jsx(Icon, { as: Check, style: { width: 15, height: 15 } }) }),
        children
      ]
    }
  );
});
var MenuRadioItem = React11.forwardRef(function MenuRadioItem2({ className, children, ...props }, ref) {
  return /* @__PURE__ */ jsxs(
    DropdownMenuPrimitive.RadioItem,
    {
      ref,
      className: cn("voga-menu__item voga-menu__item--indent", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { className: "voga-menu__mark", children: /* @__PURE__ */ jsx(Icon, { as: Check, style: { width: 15, height: 15 } }) }),
        children
      ]
    }
  );
});
function MenuLabel({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Label, { className: cn("voga-menu__label", className), ...props });
}
function MenuSeparator({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Separator, { className: cn("voga-menu__sep", className), ...props });
}
function ButtonGroup({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", { role: "group", className: cn("voga-btngroup", className), ...props });
}
function SplitButton({ menu, menuLabel = "Mais op\xE7\xF5es", children, variant = "default", size = "md", ...props }) {
  return /* @__PURE__ */ jsxs(ButtonGroup, { children: [
    /* @__PURE__ */ jsx(Button, { variant, size, ...props, children }),
    /* @__PURE__ */ jsxs(Menu, { children: [
      /* @__PURE__ */ jsx(MenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant, size, icon: ChevronDown, iconOnly: true, "aria-label": menuLabel }) }),
      /* @__PURE__ */ jsx(MenuContent, { align: "end", children: menu })
    ] })
  ] });
}
var Toolbar = React11.forwardRef(function Toolbar2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(ToolbarPrimitive.Root, { ref, className: cn("voga-toolbar", className), ...props });
});
var ToolbarButton = ToolbarPrimitive.Button;
var ToolbarSeparator = React11.forwardRef(function ToolbarSeparator2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(
    ToolbarPrimitive.Separator,
    {
      ref,
      className: cn("voga-sep", className),
      style: { margin: "0 4px", height: 20 },
      ...props
    }
  );
});
function InputGroup({ className, invalid, ...props }) {
  return /* @__PURE__ */ jsx("div", { "data-invalid": invalid ? "true" : void 0, className: cn("voga-ingroup", className), ...props });
}
function InputAffix({ className, icon, boxed, children, ...props }) {
  return /* @__PURE__ */ jsxs("span", { className: cn("voga-ingroup__affix", boxed && "voga-ingroup__affix--boxed", className), ...props, children: [
    icon ? /* @__PURE__ */ jsx(Icon, { as: icon }) : null,
    children
  ] });
}
function Slot({ char, hasFakeCaret, isActive }) {
  return /* @__PURE__ */ jsx("div", { className: "voga-code__slot", "data-active": isActive ? "true" : void 0, children: char ?? (hasFakeCaret ? /* @__PURE__ */ jsx("span", { className: "voga-code__caret" }) : null) });
}
var CodeInput = React11.forwardRef(function CodeInput2({ className, maxLength = 6, grouped, ...props }, ref) {
  const meio = Math.ceil(maxLength / 2);
  return /* @__PURE__ */ jsx(
    OTPInput,
    {
      ref,
      maxLength,
      containerClassName: cn("voga-code", className),
      render: ({ slots }) => grouped ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("div", { className: "voga-code", children: slots.slice(0, meio).map((slot, i) => /* @__PURE__ */ jsx(Slot, { ...slot }, i)) }),
        /* @__PURE__ */ jsx("span", { className: "voga-code__sep", "aria-hidden": "true", children: "\xB7" }),
        /* @__PURE__ */ jsx("div", { className: "voga-code", children: slots.slice(meio).map((slot, i) => /* @__PURE__ */ jsx(Slot, { ...slot }, i)) })
      ] }) : /* @__PURE__ */ jsx(Fragment, { children: slots.map((slot, i) => /* @__PURE__ */ jsx(Slot, { ...slot }, i)) }),
      ...props
    }
  );
});
var Checkbox = React11.forwardRef(function Checkbox2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(CheckboxPrimitive.Root, { ref, className: cn("voga-check", className), ...props, children: /* @__PURE__ */ jsx(CheckboxPrimitive.Indicator, { forceMount: true, asChild: true, children: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", children: props.checked === "indeterminate" ? /* @__PURE__ */ jsx("path", { d: "M6 12h12" }) : /* @__PURE__ */ jsx("path", { d: "M5 12.5 10 17.5 19 7" }) }) }) });
});
var Switch = React11.forwardRef(function Switch2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(SwitchPrimitive.Root, { ref, className: cn("voga-switch", className), ...props, children: /* @__PURE__ */ jsx(SwitchPrimitive.Thumb, { className: "voga-switch__thumb" }) });
});
function ControlRow({
  className,
  split,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "label",
    {
      className: cn("voga-control-row", split && "voga-control-row--split", className),
      ...props
    }
  );
}
var Toggle = React11.forwardRef(function Toggle2({ className, size = "md", iconOnly, ...props }, ref) {
  return /* @__PURE__ */ jsx(
    TogglePrimitive.Root,
    {
      ref,
      className: cn(
        "voga-toggle",
        size === "sm" && "voga-toggle--sm",
        iconOnly && "voga-toggle--icon",
        className
      ),
      ...props
    }
  );
});
var RadioGroup2 = React11.forwardRef(function RadioGroup3({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(RadioGroupPrimitive.Root, { ref, className: cn("voga-radios", className), ...props });
});
var Radio = React11.forwardRef(function Radio2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(RadioGroupPrimitive.Item, { ref, className: cn("voga-radio", className), ...props, children: /* @__PURE__ */ jsx(RadioGroupPrimitive.Indicator, { forceMount: true, asChild: true, children: /* @__PURE__ */ jsx("span", { className: "voga-radio__dot" }) }) });
});
var Choice = React11.forwardRef(
  function Choice2({ className, title, desc, ...props }, ref) {
    return /* @__PURE__ */ jsxs(RadioGroupPrimitive.Item, { ref, className: cn("voga-choice", className), ...props, children: [
      /* @__PURE__ */ jsx("span", { className: "voga-radio", "data-state": props.checked ? "checked" : void 0, "aria-hidden": "true", children: /* @__PURE__ */ jsx("span", { className: "voga-radio__dot" }) }),
      /* @__PURE__ */ jsxs("span", { className: "voga-choice__main", children: [
        /* @__PURE__ */ jsx("span", { className: "voga-choice__title", children: title }),
        desc ? /* @__PURE__ */ jsx("span", { className: "voga-choice__desc", children: desc }) : null
      ] })
    ] });
  }
);
var Slider = React11.forwardRef(function Slider2({ className, value, defaultValue, ...props }, ref) {
  const pontos = value ?? defaultValue ?? [0];
  return /* @__PURE__ */ jsxs(
    SliderPrimitive.Root,
    {
      ref,
      value,
      defaultValue,
      className: cn("voga-slider", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx(SliderPrimitive.Track, { className: "voga-slider__track", children: /* @__PURE__ */ jsx(SliderPrimitive.Range, { className: "voga-slider__range" }) }),
        pontos.map((_, i) => /* @__PURE__ */ jsx(SliderPrimitive.Thumb, { className: "voga-slider__thumb" }, i))
      ]
    }
  );
});
var Segmented = React11.forwardRef(function Segmented2({ className, size = "md", ...props }, ref) {
  return /* @__PURE__ */ jsx(
    ToggleGroupPrimitive.Root,
    {
      ref,
      type: "single",
      className: cn("voga-seg", size === "sm" && "voga-seg--sm", className),
      ...props
    }
  );
});
var SegmentedItem = React11.forwardRef(function SegmentedItem2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(ToggleGroupPrimitive.Item, { ref, className: cn("voga-seg__item", className), ...props });
});
var Tabs = TabsPrimitive.Root;
var TabsList = React11.forwardRef(function TabsList2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(TabsPrimitive.List, { ref, className: cn("voga-tabs", className), ...props });
});
var TabsTrigger = React11.forwardRef(function TabsTrigger2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(TabsPrimitive.Trigger, { ref, className: cn("voga-tabs__item", className), ...props });
});
var TabsContent = TabsPrimitive.Content;
var SelectRoot = SelectPrimitive.Root;
var SelectValue = SelectPrimitive.Value;
var SelectGroup = SelectPrimitive.Group;
var SelectTrigger = React11.forwardRef(function SelectTrigger2({ className, children, ...props }, ref) {
  return /* @__PURE__ */ jsxs(SelectPrimitive.Trigger, { ref, className: cn("voga-select", className), ...props, children: [
    children,
    /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(Icon, { as: ChevronDown }) })
  ] });
});
var SelectContent = React11.forwardRef(function SelectContent2({ className, position = "popper", sideOffset = 6, children, ...props }, ref) {
  return /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsx(
    SelectPrimitive.Content,
    {
      ref,
      position,
      sideOffset,
      className: cn("voga-glass voga-menu", className),
      style: { zIndex: "var(--voga-z-dropdown)", minWidth: "var(--radix-select-trigger-width)" },
      ...props,
      children: /* @__PURE__ */ jsx(SelectPrimitive.Viewport, { children })
    }
  ) });
});
var SelectItem = React11.forwardRef(function SelectItem2({ className, children, ...props }, ref) {
  return /* @__PURE__ */ jsxs(
    SelectPrimitive.Item,
    {
      ref,
      className: cn("voga-menu__item voga-menu__item--indent", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { className: "voga-menu__mark", children: /* @__PURE__ */ jsx(Icon, { as: Check, style: { width: 15, height: 15 } }) }),
        /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
      ]
    }
  );
});
function SelectLabel({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(SelectPrimitive.Label, { className: cn("voga-menu__label", className), ...props });
}
function SelectSeparator({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(SelectPrimitive.Separator, { className: cn("voga-menu__sep", className), ...props });
}
var Popover = PopoverPrimitive.Root;
var PopoverTrigger = PopoverPrimitive.Trigger;
var PopoverClose = PopoverPrimitive.Close;
var PopoverAnchor = PopoverPrimitive.Anchor;
var PopoverContent = React11.forwardRef(function PopoverContent2({ className, sideOffset = 6, arrow, children, ...props }, ref) {
  return /* @__PURE__ */ jsx(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
    PopoverPrimitive.Content,
    {
      ref,
      sideOffset,
      className: cn("voga-glass voga-popover", className),
      ...props,
      children: [
        children,
        arrow ? /* @__PURE__ */ jsx(PopoverPrimitive.Arrow, { className: "voga-popover__arrow", width: 12, height: 6 }) : null
      ]
    }
  ) });
});
var HoverCard = HoverCardPrimitive.Root;
var HoverCardTrigger = HoverCardPrimitive.Trigger;
var HoverCardContent = React11.forwardRef(function HoverCardContent2({ className, sideOffset = 6, ...props }, ref) {
  return /* @__PURE__ */ jsx(HoverCardPrimitive.Portal, { children: /* @__PURE__ */ jsx(
    HoverCardPrimitive.Content,
    {
      ref,
      sideOffset,
      className: cn("voga-glass voga-hovercard", className),
      ...props
    }
  ) });
});
var Command = Command$1;
var CommandInput = React11.forwardRef(function CommandInput2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsxs("div", { className: "voga-palette__search", children: [
    /* @__PURE__ */ jsx(Icon, { as: Search }),
    /* @__PURE__ */ jsx(Command$1.Input, { ref, className: cn("voga-palette__input", className), ...props })
  ] });
});
var CommandList = React11.forwardRef(function CommandList2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(Command$1.List, { ref, className: cn("voga-palette__list", className), ...props });
});
var CommandEmpty = React11.forwardRef(function CommandEmpty2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(Command$1.Empty, { ref, className: cn("voga-palette__empty", className), ...props });
});
var CommandGroup = React11.forwardRef(function CommandGroup2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(Command$1.Group, { ref, className: cn("voga-palette__group", className), ...props });
});
var CommandItem = React11.forwardRef(function CommandItem2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(Command$1.Item, { ref, className: cn("voga-palette__item", className), ...props });
});
var CommandSeparator = React11.forwardRef(function CommandSeparator2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(Command$1.Separator, { ref, className: cn("voga-menu__sep", className), ...props });
});
function CommandShortcut({ className, ...props }) {
  return /* @__PURE__ */ jsx("span", { className: cn("voga-menu__shortcut", className), ...props });
}
function CommandDialog({
  open,
  onOpenChange,
  label = "Buscar comandos",
  children,
  className
}) {
  return /* @__PURE__ */ jsx(DialogPrimitive2.Root, { open, onOpenChange, children: /* @__PURE__ */ jsxs(DialogPrimitive2.Portal, { children: [
    /* @__PURE__ */ jsx(DialogPrimitive2.Overlay, { className: "voga-scrim" }),
    /* @__PURE__ */ jsxs(
      DialogPrimitive2.Content,
      {
        "aria-label": label,
        className: cn("voga-glass voga-palette", className),
        children: [
          /* @__PURE__ */ jsx(DialogPrimitive2.Title, { className: "sr-only", children: label }),
          /* @__PURE__ */ jsx(Command$1, { label, children })
        ]
      }
    )
  ] }) });
}
function useCommandShortcut(onOpen, key = "k") {
  React11.useEffect(() => {
    const onKey = (event) => {
      if (event.key.toLowerCase() === key && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        onOpen();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onOpen, key]);
}
function Combobox({
  options,
  value,
  onChange,
  placeholder = "Escolha",
  searchPlaceholder = "Buscar\u2026",
  emptyText = "Nada encontrado.",
  disabled,
  id,
  className
}) {
  const [open, setOpen] = React11.useState(false);
  const escolhido = options.find((o) => o.value === value);
  return /* @__PURE__ */ jsxs(Popover, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        id,
        role: "combobox",
        "aria-expanded": open,
        disabled,
        "data-placeholder": escolhido ? void 0 : "",
        className: cn("voga-select", className),
        children: [
          escolhido?.label ?? placeholder,
          /* @__PURE__ */ jsx(Icon, { as: ChevronDown })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(
      PopoverContent,
      {
        align: "start",
        style: { padding: 0, width: "var(--radix-popover-trigger-width)", maxWidth: "none" },
        children: /* @__PURE__ */ jsxs(Command, { children: [
          /* @__PURE__ */ jsx(CommandInput, { placeholder: searchPlaceholder }),
          /* @__PURE__ */ jsxs(CommandList, { children: [
            /* @__PURE__ */ jsx(CommandEmpty, { children: emptyText }),
            options.map((option) => /* @__PURE__ */ jsxs(
              CommandItem,
              {
                value: `${option.label} ${option.desc ?? ""}`,
                disabled: option.disabled,
                onSelect: () => {
                  onChange?.(option.value);
                  setOpen(false);
                },
                children: [
                  /* @__PURE__ */ jsx(
                    Icon,
                    {
                      as: Check,
                      style: { width: 16, height: 16, opacity: option.value === value ? 1 : 0 }
                    }
                  ),
                  /* @__PURE__ */ jsxs("span", { children: [
                    option.label,
                    option.desc ? /* @__PURE__ */ jsx("span", { className: "voga-item__desc", children: option.desc }) : null
                  ] })
                ]
              },
              option.value
            ))
          ] })
        ] })
      }
    )
  ] });
}
function Calendar({
  className,
  classNames,
  prevMonthLabel = "M\xEAs anterior",
  nextMonthLabel = "Pr\xF3ximo m\xEAs",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DayPicker,
    {
      locale: ptBR,
      showOutsideDays: true,
      className: cn("voga-calendar", className),
      classNames: {
        months: "voga-calendar__months",
        month_caption: "voga-calendar__nav",
        caption_label: "voga-calendar__title",
        nav: "voga-calendar__arrows",
        month_grid: "voga-calendar__grid",
        weekday: "voga-calendar__weekday",
        day: "voga-calendar__cell",
        day_button: "voga-calendar__day",
        range_start: "voga-calendar__cell--start",
        range_middle: "voga-calendar__cell--mid",
        range_end: "voga-calendar__cell--end",
        ...classNames
      },
      components: {
        PreviousMonthButton: (buttonProps) => /* @__PURE__ */ jsx(Button, { ...buttonProps, variant: "ghost", size: "sm", icon: ChevronLeft, iconOnly: true, "aria-label": prevMonthLabel }),
        NextMonthButton: (buttonProps) => /* @__PURE__ */ jsx(Button, { ...buttonProps, variant: "ghost", size: "sm", icon: ChevronRight, iconOnly: true, "aria-label": nextMonthLabel }),
        // As setas já vêm dos nossos botões; o chevron do pacote fica vazio.
        Chevron: () => /* @__PURE__ */ jsx(Fragment, {})
      },
      ...props
    }
  );
}
var formato = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
function DatePicker({
  value,
  onChange,
  placeholder = "Escolha uma data",
  disabled,
  id,
  className,
  disabledDates
}) {
  const [open, setOpen] = React11.useState(false);
  return /* @__PURE__ */ jsxs(Popover, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        id,
        disabled,
        "data-placeholder": value ? void 0 : "",
        className: cn("voga-select", className),
        children: [
          value ? formato.format(value) : placeholder,
          /* @__PURE__ */ jsx(Icon, { as: Calendar$1 })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs(PopoverContent, { align: "start", style: { padding: 0 }, children: [
      /* @__PURE__ */ jsx(
        Calendar,
        {
          mode: "single",
          selected: value,
          disabled: disabledDates,
          autoFocus: true,
          onSelect: (date) => {
            onChange?.(date);
            setOpen(false);
          }
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "voga-calendar__foot", children: [
        /* @__PURE__ */ jsx(Button, { variant: "link", onClick: () => {
          onChange?.(/* @__PURE__ */ new Date());
          setOpen(false);
        }, children: "Hoje" }),
        /* @__PURE__ */ jsx(Button, { variant: "link", onClick: () => {
          onChange?.(void 0);
          setOpen(false);
        }, children: "Limpar" })
      ] })
    ] })
  ] });
}
var Card = React11.forwardRef(function Card2({ className, variant = "card", interactive, ...props }, ref) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn(
        "voga-card",
        variant === "section" && "voga-card--section",
        variant === "flat" && "voga-card--flat",
        interactive && "voga-card--interactive",
        className
      ),
      ...props
    }
  );
});
function CardHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn("voga-card__head", className), ...props });
}
function CardTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx("h3", { className: cn("voga-card__title", className), ...props });
}
function CardDescription({ className, ...props }) {
  return /* @__PURE__ */ jsx("p", { className: cn("voga-card__desc", className), ...props });
}
function CardBody({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn("voga-card__body", className), ...props });
}
function CardFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn("voga-card__foot", className), ...props });
}
function Well({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn("voga-well", className), ...props });
}
function Rows({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn("voga-rows", className), ...props });
}
function Row({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn("voga-row", className), ...props });
}
var Item5 = React11.forwardRef(function Item6({ className, card, interactive, ...props }, ref) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn("voga-item", card && "voga-item--card", interactive && "voga-item--interactive", className),
      ...props
    }
  );
});
function ItemMedia({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn("voga-item__media", className), ...props });
}
function ItemMain({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn("voga-item__main", className), ...props });
}
function ItemTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx("p", { className: cn("voga-item__title", className), ...props });
}
function ItemDescription({ className, ...props }) {
  return /* @__PURE__ */ jsx("p", { className: cn("voga-item__desc", className), ...props });
}
function ItemSide({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn("voga-item__side", className), ...props });
}
var ScrollArea = React11.forwardRef(function ScrollArea2({ className, children, orientation = "vertical", ...props }, ref) {
  return /* @__PURE__ */ jsxs(ScrollAreaPrimitive.Root, { ref, className: cn("voga-scroll", className), ...props, children: [
    /* @__PURE__ */ jsx(ScrollAreaPrimitive.Viewport, { className: "voga-scroll__viewport", children }),
    orientation !== "horizontal" ? /* @__PURE__ */ jsx(ScrollAreaPrimitive.Scrollbar, { orientation: "vertical", className: "voga-scroll__bar", children: /* @__PURE__ */ jsx(ScrollAreaPrimitive.Thumb, { className: "voga-scroll__thumb" }) }) : null,
    orientation !== "vertical" ? /* @__PURE__ */ jsx(ScrollAreaPrimitive.Scrollbar, { orientation: "horizontal", className: "voga-scroll__bar", children: /* @__PURE__ */ jsx(ScrollAreaPrimitive.Thumb, { className: "voga-scroll__thumb" }) }) : null,
    /* @__PURE__ */ jsx(ScrollAreaPrimitive.Corner, {})
  ] });
});
function AspectRatio({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(AspectRatioPrimitive.Root, { className: cn("voga-ratio", className), ...props });
}
function Panels({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(PanelGroup, { className: cn("voga-panels", className), ...props });
}
function Pane({ className, ...props }) {
  return /* @__PURE__ */ jsx(Panel, { className: cn("voga-panel", className), ...props });
}
function PaneHandle({
  className,
  grip,
  ...props
}) {
  return /* @__PURE__ */ jsx(PanelResizeHandle, { className: cn("voga-handle", className), ...props, children: grip ? /* @__PURE__ */ jsx("span", { className: "voga-handle__grip", children: /* @__PURE__ */ jsx(Icon, { as: GripVertical, style: { width: 12, height: 12 } }) }) : null });
}
function Prose({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn("voga-prose", className), ...props });
}
function Chip({ className, tone = "neutral", icon, count, children, ...props }) {
  return /* @__PURE__ */ jsxs(
    "span",
    {
      className: cn(
        "voga-chip",
        tone !== "neutral" && `voga-chip--${tone}`,
        count && "voga-chip--count",
        className
      ),
      ...props,
      children: [
        icon ? /* @__PURE__ */ jsx(Icon, { as: icon }) : null,
        children
      ]
    }
  );
}
var toneIcon = {
  neutral: Info,
  info: Info,
  ok: CircleCheck,
  attention: TriangleAlert,
  danger: CircleAlert
};
function Note({ className, tone = "neutral", title, icon, children, ...props }) {
  const Glyph = icon === false ? null : icon ?? toneIcon[tone];
  return /* @__PURE__ */ jsxs("div", { role: "note", className: cn("voga-note", tone !== "neutral" && `voga-note--${tone}`, className), ...props, children: [
    Glyph ? /* @__PURE__ */ jsx(Icon, { as: Glyph }) : null,
    /* @__PURE__ */ jsxs("div", { children: [
      title ? /* @__PURE__ */ jsx("p", { className: "voga-note__title", children: title }) : null,
      children ? /* @__PURE__ */ jsx("div", { className: "voga-note__body", children }) : null
    ] })
  ] });
}
function Avatar({ className, src, fallback, size = "md", mark, alt, ...props }) {
  return /* @__PURE__ */ jsxs(
    AvatarPrimitive.Root,
    {
      className: cn("voga-avatar", size !== "md" && `voga-avatar--${size}`, mark && "voga-avatar--mark", className),
      ...props,
      children: [
        src ? /* @__PURE__ */ jsx(AvatarPrimitive.Image, { src, alt: alt ?? "" }) : null,
        /* @__PURE__ */ jsx(AvatarPrimitive.Fallback, { delayMs: src ? 300 : void 0, children: fallback })
      ]
    }
  );
}
var Meter = React11.forwardRef(
  function Meter2({ className, value, tone = "ink", thin, mark, ...props }, ref) {
    const indeterminate = value === void 0;
    return /* @__PURE__ */ jsxs(
      ProgressPrimitive.Root,
      {
        ref,
        value: indeterminate ? null : value,
        className: cn(
          "voga-meter",
          thin && "voga-meter--thin",
          tone !== "ink" && `voga-meter--${tone}`,
          indeterminate && "voga-meter--loading",
          className
        ),
        ...props,
        children: [
          /* @__PURE__ */ jsx(
            ProgressPrimitive.Indicator,
            {
              className: "voga-meter__bar",
              style: indeterminate ? void 0 : { transform: `scaleX(${Math.min(100, Math.max(0, value)) / 100})` }
            }
          ),
          mark !== void 0 ? /* @__PURE__ */ jsx("span", { className: "voga-meter__mark", style: { left: `${Math.min(100, Math.max(0, mark))}%` }, "aria-hidden": "true" }) : null
        ]
      }
    );
  }
);
function Steps({ className, total, done, running, label = "Progresso", ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      role: "progressbar",
      "aria-label": label,
      "aria-valuemin": 0,
      "aria-valuemax": total,
      "aria-valuenow": done,
      className: cn("voga-steps", className),
      ...props,
      children: Array.from({ length: total }, (_, i) => /* @__PURE__ */ jsx(
        "span",
        {
          className: "voga-steps__bar",
          "data-done": i < done ? "true" : void 0,
          "data-current": running && i === done ? "true" : void 0
        },
        i
      ))
    }
  );
}
function Carousel({
  className,
  options,
  arrows = true,
  label = "Carrossel",
  prevLabel = "Anterior",
  nextLabel = "Pr\xF3ximo",
  children,
  ...props
}) {
  const [ref, embla] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps", ...options });
  const [canPrev, setCanPrev] = React11.useState(false);
  const [canNext, setCanNext] = React11.useState(false);
  React11.useEffect(() => {
    if (!embla) return;
    const sync = () => {
      setCanPrev(embla.canScrollPrev());
      setCanNext(embla.canScrollNext());
    };
    sync();
    embla.on("select", sync).on("reInit", sync);
    return () => {
      embla.off("select", sync).off("reInit", sync);
    };
  }, [embla]);
  const more = canPrev && canNext ? "both" : canNext ? "end" : canPrev ? "start" : void 0;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      role: "region",
      "aria-roledescription": "carousel",
      "aria-label": label,
      "data-more": more,
      className: cn("voga-carousel", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx("div", { className: "voga-carousel__viewport", ref, children: /* @__PURE__ */ jsx("div", { className: "voga-carousel__track", children }) }),
        arrows ? /* @__PURE__ */ jsxs(Fragment, { children: [
          canPrev ? /* @__PURE__ */ jsx(
            Button,
            {
              variant: "default",
              size: "sm",
              icon: ChevronLeft,
              iconOnly: true,
              "aria-label": prevLabel,
              className: "voga-carousel__arrow voga-carousel__arrow--prev",
              onClick: () => embla?.scrollPrev()
            }
          ) : null,
          canNext ? /* @__PURE__ */ jsx(
            Button,
            {
              variant: "default",
              size: "sm",
              icon: ChevronRight,
              iconOnly: true,
              "aria-label": nextLabel,
              className: "voga-carousel__arrow voga-carousel__arrow--next",
              onClick: () => embla?.scrollNext()
            }
          ) : null
        ] }) : null
      ]
    }
  );
}
function CarouselSlide({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn("voga-carousel__slide", className), ...props });
}
function Breadcrumb({ className, ...props }) {
  return /* @__PURE__ */ jsx("nav", { "aria-label": "Trilha", className: cn("voga-crumbs", className), ...props });
}
function BreadcrumbLink({ className, ...props }) {
  return /* @__PURE__ */ jsx("a", { className: cn("voga-crumbs__link", className), ...props });
}
function BreadcrumbSeparator({ className, ...props }) {
  return /* @__PURE__ */ jsx("span", { "aria-hidden": "true", className: cn("voga-crumbs__sep", className), ...props, children: /* @__PURE__ */ jsx(Icon, { as: ChevronRight }) });
}
function BreadcrumbCurrent({ className, ...props }) {
  return /* @__PURE__ */ jsx("span", { "aria-current": "page", className: cn("voga-crumbs__current", className), ...props });
}
function Sidebar({ className, ...props }) {
  return /* @__PURE__ */ jsx("nav", { className: cn("voga-sidebar", className), ...props });
}
function SidebarGroup({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn("voga-sidebar__group", className), ...props });
}
function SidebarLabel({ className, ...props }) {
  return /* @__PURE__ */ jsx("p", { className: cn("voga-sidebar__label", className), ...props });
}
var SidebarItem = React11.forwardRef(function SidebarItem2({ className, icon, active, sub, side, children, ...props }, ref) {
  return /* @__PURE__ */ jsxs(
    "a",
    {
      ref,
      "aria-current": active ? "page" : void 0,
      className: cn("voga-sidebar__item", sub && "voga-sidebar__item--sub", className),
      ...props,
      children: [
        icon ? /* @__PURE__ */ jsx(Icon, { as: icon }) : null,
        children,
        side ? /* @__PURE__ */ jsx("span", { className: "voga-sidebar__count", children: side }) : null
      ]
    }
  );
});
function Shell({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn("voga-shell", className), ...props });
}
function ShellMain({ className, ...props }) {
  return /* @__PURE__ */ jsx("main", { className: cn("voga-shell__main", className), ...props });
}
var NavMenu = React11.forwardRef(function NavMenu2({ className, children, ...props }, ref) {
  return /* @__PURE__ */ jsxs(NavigationMenuPrimitive.Root, { ref, className: cn("voga-nav", className), ...props, children: [
    children,
    /* @__PURE__ */ jsx(NavigationMenuPrimitive.Viewport, { className: "voga-glass voga-nav__viewport" })
  ] });
});
var NavMenuList = React11.forwardRef(function NavMenuList2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(NavigationMenuPrimitive.List, { ref, className: cn("voga-nav__list", className), ...props });
});
var NavMenuItem = NavigationMenuPrimitive.Item;
var NavMenuTrigger = React11.forwardRef(function NavMenuTrigger2({ className, children, ...props }, ref) {
  return /* @__PURE__ */ jsxs(NavigationMenuPrimitive.Trigger, { ref, className: cn("voga-nav__trigger", className), ...props, children: [
    children,
    /* @__PURE__ */ jsx(Icon, { as: ChevronDown })
  ] });
});
var NavMenuContent = React11.forwardRef(function NavMenuContent2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(NavigationMenuPrimitive.Content, { ref, className: cn("voga-nav__panel", className), ...props });
});
var NavMenuLink = React11.forwardRef(function NavMenuLink2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(NavigationMenuPrimitive.Link, { ref, className: cn("voga-nav__trigger", className), ...props });
});
var NavMenuCard = React11.forwardRef(function NavMenuCard2({ className, title, desc, ...props }, ref) {
  return /* @__PURE__ */ jsx(NavigationMenuPrimitive.Link, { asChild: true, children: /* @__PURE__ */ jsxs("a", { ref, className: cn("voga-nav__card", className), ...props, children: [
    /* @__PURE__ */ jsx("strong", { children: title }),
    desc ? /* @__PURE__ */ jsx("span", { children: desc }) : null
  ] }) });
});
var Menubar = React11.forwardRef(function Menubar2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(MenubarPrimitive.Root, { ref, className: cn("voga-menubar", className), ...props });
});
var MenubarMenu = MenubarPrimitive.Menu;
var MenubarGroup = MenubarPrimitive.Group;
var MenubarTrigger = React11.forwardRef(function MenubarTrigger2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(MenubarPrimitive.Trigger, { ref, className: cn("voga-menubar__trigger", className), ...props });
});
var MenubarContent = React11.forwardRef(function MenubarContent2({ className, sideOffset = 6, ...props }, ref) {
  return /* @__PURE__ */ jsx(MenubarPrimitive.Portal, { children: /* @__PURE__ */ jsx(
    MenubarPrimitive.Content,
    {
      ref,
      sideOffset,
      className: cn("voga-glass voga-menu", className),
      style: { zIndex: "var(--voga-z-dropdown)" },
      ...props
    }
  ) });
});
var MenubarItem = React11.forwardRef(function MenubarItem2({ className, tone = "default", kbd, children, ...props }, ref) {
  return /* @__PURE__ */ jsxs(
    MenubarPrimitive.Item,
    {
      ref,
      className: cn("voga-menu__item", tone === "danger" && "voga-menu__item--danger", className),
      ...props,
      children: [
        children,
        kbd?.length ? /* @__PURE__ */ jsx("span", { className: "voga-menu__shortcut", children: kbd.map((key) => /* @__PURE__ */ jsx(Kbd, { children: key }, key)) }) : null
      ]
    }
  );
});
var MenubarCheckboxItem = React11.forwardRef(function MenubarCheckboxItem2({ className, children, ...props }, ref) {
  return /* @__PURE__ */ jsxs(
    MenubarPrimitive.CheckboxItem,
    {
      ref,
      className: cn("voga-menu__item voga-menu__item--indent", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx(MenubarPrimitive.ItemIndicator, { className: "voga-menu__mark", children: /* @__PURE__ */ jsx(Icon, { as: Check, style: { width: 15, height: 15 } }) }),
        children
      ]
    }
  );
});
function MenubarLabel({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(MenubarPrimitive.Label, { className: cn("voga-menu__label", className), ...props });
}
function MenubarSeparator({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(MenubarPrimitive.Separator, { className: cn("voga-menu__sep", className), ...props });
}
var Dialog = DialogPrimitive2.Root;
var DialogTrigger = DialogPrimitive2.Trigger;
var DialogClose = DialogPrimitive2.Close;
var DialogContent = React11.forwardRef(function DialogContent2({ className, children, showClose = true, closeLabel = "Fechar", ...props }, ref) {
  return /* @__PURE__ */ jsxs(DialogPrimitive2.Portal, { children: [
    /* @__PURE__ */ jsx(DialogPrimitive2.Overlay, { className: "voga-scrim" }),
    /* @__PURE__ */ jsxs(DialogPrimitive2.Content, { ref, className: cn("voga-dialog", className), ...props, children: [
      children,
      showClose ? /* @__PURE__ */ jsx(DialogPrimitive2.Close, { asChild: true, children: /* @__PURE__ */ jsx(
        Button,
        {
          variant: "ghost",
          size: "sm",
          icon: X,
          iconOnly: true,
          "aria-label": closeLabel,
          className: "voga-dialog__close"
        }
      ) }) : null
    ] })
  ] });
});
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn("voga-dialog__head", className), ...props });
}
function DialogFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn("voga-dialog__foot", className), ...props });
}
var DialogTitle = React11.forwardRef(function DialogTitle2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(DialogPrimitive2.Title, { ref, className: cn("voga-dialog__title", className), ...props });
});
var DialogDescription = React11.forwardRef(function DialogDescription2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(DialogPrimitive2.Description, { ref, className: cn("voga-dialog__desc", className), ...props });
});
var AlertDialog = AlertDialogPrimitive.Root;
var AlertDialogTrigger = AlertDialogPrimitive.Trigger;
var AlertDialogCancel = AlertDialogPrimitive.Cancel;
var AlertDialogAction = AlertDialogPrimitive.Action;
var AlertDialogContent = React11.forwardRef(function AlertDialogContent2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsxs(AlertDialogPrimitive.Portal, { children: [
    /* @__PURE__ */ jsx(AlertDialogPrimitive.Overlay, { className: "voga-scrim" }),
    /* @__PURE__ */ jsx(AlertDialogPrimitive.Content, { ref, className: cn("voga-dialog", className), ...props })
  ] });
});
function AlertDialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn("voga-dialog__head", className), ...props });
}
function AlertDialogFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn("voga-dialog__foot", className), ...props });
}
var AlertDialogTitle = React11.forwardRef(function AlertDialogTitle2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(AlertDialogPrimitive.Title, { ref, className: cn("voga-dialog__title", className), ...props });
});
var AlertDialogDescription = React11.forwardRef(function AlertDialogDescription2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(AlertDialogPrimitive.Description, { ref, className: cn("voga-dialog__desc", className), ...props });
});
var Sheet = DialogPrimitive2.Root;
var SheetTrigger = DialogPrimitive2.Trigger;
var SheetClose = DialogPrimitive2.Close;
var SheetContent = React11.forwardRef(function SheetContent2({ className, children, side = "right", showClose = true, closeLabel = "Fechar", ...props }, ref) {
  return /* @__PURE__ */ jsxs(DialogPrimitive2.Portal, { children: [
    /* @__PURE__ */ jsx(DialogPrimitive2.Overlay, { className: "voga-scrim" }),
    /* @__PURE__ */ jsxs(DialogPrimitive2.Content, { ref, "data-side": side, className: cn("voga-sheet", className), ...props, children: [
      children,
      showClose ? /* @__PURE__ */ jsx(DialogPrimitive2.Close, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", icon: X, iconOnly: true, "aria-label": closeLabel, className: "voga-sheet__close" }) }) : null
    ] })
  ] });
});
function SheetHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn("voga-dialog__head", className), ...props });
}
function SheetFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn("voga-dialog__foot", className), ...props });
}
var SheetTitle = React11.forwardRef(function SheetTitle2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(DialogPrimitive2.Title, { ref, className: cn("voga-dialog__title", className), ...props });
});
var SheetDescription = React11.forwardRef(function SheetDescription2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(DialogPrimitive2.Description, { ref, className: cn("voga-dialog__desc", className), ...props });
});
var Drawer = Drawer$1.Root;
var DrawerTrigger = Drawer$1.Trigger;
var DrawerClose = Drawer$1.Close;
var DrawerTitle = React11.forwardRef(function DrawerTitle2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(Drawer$1.Title, { ref, className: cn("voga-dialog__title", className), ...props });
});
var DrawerDescription = React11.forwardRef(function DrawerDescription2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(Drawer$1.Description, { ref, className: cn("voga-dialog__desc", className), ...props });
});
var DrawerContent = React11.forwardRef(function DrawerContent2({ className, children, grip = true, ...props }, ref) {
  return /* @__PURE__ */ jsxs(Drawer$1.Portal, { children: [
    /* @__PURE__ */ jsx(Drawer$1.Overlay, { className: "voga-scrim" }),
    /* @__PURE__ */ jsxs(Drawer$1.Content, { ref, className: cn("voga-drawer", className), ...props, children: [
      grip ? /* @__PURE__ */ jsx("div", { className: "voga-drawer__grip", "aria-hidden": "true" }) : null,
      children
    ] })
  ] });
});
var ContextMenu = ContextMenuPrimitive.Root;
var ContextMenuTrigger = ContextMenuPrimitive.Trigger;
var ContextMenuGroup = ContextMenuPrimitive.Group;
var ContextMenuContent = React11.forwardRef(function ContextMenuContent2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(ContextMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
    ContextMenuPrimitive.Content,
    {
      ref,
      className: cn("voga-glass voga-menu", className),
      style: { zIndex: "var(--voga-z-dropdown)" },
      ...props
    }
  ) });
});
var ContextMenuItem = React11.forwardRef(function ContextMenuItem2({ className, tone = "default", kbd, children, ...props }, ref) {
  return /* @__PURE__ */ jsxs(
    ContextMenuPrimitive.Item,
    {
      ref,
      className: cn("voga-menu__item", tone === "danger" && "voga-menu__item--danger", className),
      ...props,
      children: [
        children,
        kbd?.length ? /* @__PURE__ */ jsx("span", { className: "voga-menu__shortcut", children: kbd.map((key) => /* @__PURE__ */ jsx(Kbd, { children: key }, key)) }) : null
      ]
    }
  );
});
var ContextMenuCheckboxItem = React11.forwardRef(function ContextMenuCheckboxItem2({ className, children, ...props }, ref) {
  return /* @__PURE__ */ jsxs(
    ContextMenuPrimitive.CheckboxItem,
    {
      ref,
      className: cn("voga-menu__item voga-menu__item--indent", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx(ContextMenuPrimitive.ItemIndicator, { className: "voga-menu__mark", children: /* @__PURE__ */ jsx(Icon, { as: Check, style: { width: 15, height: 15 } }) }),
        children
      ]
    }
  );
});
function ContextMenuLabel({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(ContextMenuPrimitive.Label, { className: cn("voga-menu__label", className), ...props });
}
function ContextMenuSeparator({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(ContextMenuPrimitive.Separator, { className: cn("voga-menu__sep", className), ...props });
}
var Accordion = AccordionPrimitive.Root;
var AccordionItem = React11.forwardRef(function AccordionItem2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(AccordionPrimitive.Item, { ref, className: cn("voga-fold", className), ...props });
});
var AccordionTrigger = React11.forwardRef(function AccordionTrigger2({ className, children, ...props }, ref) {
  return /* @__PURE__ */ jsx(AccordionPrimitive.Header, { asChild: true, children: /* @__PURE__ */ jsx("h3", { children: /* @__PURE__ */ jsxs(AccordionPrimitive.Trigger, { ref, className: cn("voga-fold__trigger", className), ...props, children: [
    children,
    /* @__PURE__ */ jsx(Icon, { as: ChevronDown })
  ] }) }) });
});
var AccordionContent = React11.forwardRef(function AccordionContent2({ className, children, ...props }, ref) {
  return /* @__PURE__ */ jsx(AccordionPrimitive.Content, { ref, className: cn("voga-fold__body", className), ...props, children: /* @__PURE__ */ jsx("div", { className: "voga-fold__inner", children }) });
});
var Collapsible = CollapsiblePrimitive.Root;
var CollapsibleTrigger = React11.forwardRef(function CollapsibleTrigger2({ className, children, ...props }, ref) {
  return /* @__PURE__ */ jsxs(CollapsiblePrimitive.Trigger, { ref, className: cn("voga-fold__trigger", className), ...props, children: [
    children,
    /* @__PURE__ */ jsx(Icon, { as: ChevronDown })
  ] });
});
var CollapsibleContent = React11.forwardRef(function CollapsibleContent2({ className, children, ...props }, ref) {
  return /* @__PURE__ */ jsx(CollapsiblePrimitive.Content, { ref, className: cn("voga-fold__body", className), ...props, children: /* @__PURE__ */ jsx("div", { className: "voga-fold__inner", children }) });
});
var TipProvider = TooltipPrimitive.Provider;
var TipRoot = TooltipPrimitive.Root;
var TipTrigger = TooltipPrimitive.Trigger;
var TipContent = React11.forwardRef(function TipContent2({ className, sideOffset = 6, children, ...props }, ref) {
  return /* @__PURE__ */ jsx(TooltipPrimitive.Portal, { children: /* @__PURE__ */ jsxs(TooltipPrimitive.Content, { ref, sideOffset, className: cn("voga-tip", className), ...props, children: [
    children,
    /* @__PURE__ */ jsx(TooltipPrimitive.Arrow, { className: "voga-tip__arrow", width: 10, height: 5 })
  ] }) });
});
function Tip({ content, children, side = "top", ...props }) {
  return /* @__PURE__ */ jsxs(TipRoot, { ...props, children: [
    /* @__PURE__ */ jsx(TipTrigger, { asChild: true, children }),
    /* @__PURE__ */ jsx(TipContent, { side, children: content })
  ] });
}
function Toaster({
  className,
  position = "bottom-right",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Toaster$1,
    {
      position,
      toastOptions: {
        unstyled: true,
        classNames: {
          toast: "voga-glass voga-toast",
          title: "voga-toast__title",
          description: "voga-toast__desc",
          success: "voga-toast--ok",
          warning: "voga-toast--attention",
          error: "voga-toast--danger"
        }
      },
      style: { zIndex: "var(--voga-z-toast)" },
      className: cn(className),
      ...props
    }
  );
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger, AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, AspectRatio, Avatar, Breadcrumb, BreadcrumbCurrent, BreadcrumbLink, BreadcrumbSeparator, ButtonGroup, Calendar, Card, CardBody, CardDescription, CardFooter, CardHeader, CardTitle, Carousel, CarouselSlide, Checkbox, Chip, Choice, CodeInput, Collapsible, CollapsibleContent, CollapsibleTrigger, Combobox, Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut, ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuGroup, ContextMenuItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuTrigger, ControlRow, DatePicker, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerTitle, DrawerTrigger, HoverCard, HoverCardContent, HoverCardTrigger, InputAffix, InputGroup, Item5 as Item, ItemDescription, ItemMain, ItemMedia, ItemSide, ItemTitle, Menu, MenuCheckboxItem, MenuContent, MenuGroup, MenuItem, MenuLabel, MenuRadioGroup, MenuRadioItem, MenuSeparator, MenuTrigger, Menubar, MenubarCheckboxItem, MenubarContent, MenubarGroup, MenubarItem, MenubarLabel, MenubarMenu, MenubarSeparator, MenubarTrigger, Meter, NavMenu, NavMenuCard, NavMenuContent, NavMenuItem, NavMenuLink, NavMenuList, NavMenuTrigger, Note, Pane, PaneHandle, Panels, Popover, PopoverAnchor, PopoverClose, PopoverContent, PopoverTrigger, Prose, Radio, RadioGroup2 as RadioGroup, Row, Rows, ScrollArea, Segmented, SegmentedItem, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectRoot, SelectSeparator, SelectTrigger, SelectValue, Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger, Shell, ShellMain, Sidebar, SidebarGroup, SidebarItem, SidebarLabel, Slider, SplitButton, Steps, Switch, Tabs, TabsContent, TabsList, TabsTrigger, Tip, TipContent, TipProvider, TipRoot, TipTrigger, Toaster, Toggle, Toolbar, ToolbarButton, ToolbarSeparator, Well, pointerScript, themeScript, trackPointer, useCommandShortcut, useTheme };
