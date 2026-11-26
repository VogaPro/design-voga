import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check } from "lucide-react";
import { cn } from "../lib/cn";
import { Icon } from "./icon";
import { Kbd } from "./kbd";

export const Menu = DropdownMenuPrimitive.Root;
export const MenuTrigger = DropdownMenuPrimitive.Trigger;
export const MenuGroup = DropdownMenuPrimitive.Group;
export const MenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

/** Painel em vidro. O raio dos itens é concêntrico ao dele. */
export const MenuContent = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(function MenuContent({ className, sideOffset = 6, ...props }, ref) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn("voga-glass voga-menu", className)}
        style={{ zIndex: "var(--voga-z-dropdown)" }}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
});

export const MenuItem = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    tone?: "default" | "danger";
    /** Atalho à direita: `["⌘", "R"]`. */
    kbd?: string[];
  }
>(function MenuItem({ className, tone = "default", kbd, children, ...props }, ref) {
  return (
    <DropdownMenuPrimitive.Item
      ref={ref}
      className={cn("voga-menu__item", tone === "danger" && "voga-menu__item--danger", className)}
      {...props}
    >
      {children}
      {kbd?.length ? (
        <span className="voga-menu__shortcut">
          {kbd.map((key) => (
            <Kbd key={key}>{key}</Kbd>
          ))}
        </span>
      ) : null}
    </DropdownMenuPrimitive.Item>
  );
});

export const MenuCheckboxItem = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(function MenuCheckboxItem({ className, children, ...props }, ref) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      ref={ref}
      className={cn("voga-menu__item voga-menu__item--indent", className)}
     
      {...props}
    >
      <DropdownMenuPrimitive.ItemIndicator className="voga-menu__mark">
        <Icon as={Check} style={{ width: 15, height: 15 }} />
      </DropdownMenuPrimitive.ItemIndicator>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
});

/**
 * A escolha ÚNICA dentro de um `MenuRadioGroup`. O grupo já era exportado sem
 * ela, o que o deixava inútil: não havia com que preencher o grupo.
 *
 * Mesma marca do item de marcar — o que distingue os dois é a semântica que o
 * Radix dá (um de cada vez contra vários), e é ela que o leitor de tela anuncia.
 */
export const MenuRadioItem = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(function MenuRadioItem({ className, children, ...props }, ref) {
  return (
    <DropdownMenuPrimitive.RadioItem
      ref={ref}
      className={cn("voga-menu__item voga-menu__item--indent", className)}
      {...props}
    >
      <DropdownMenuPrimitive.ItemIndicator className="voga-menu__mark">
        <Icon as={Check} style={{ width: 15, height: 15 }} />
      </DropdownMenuPrimitive.ItemIndicator>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
});

export function MenuLabel({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>) {
  return <DropdownMenuPrimitive.Label className={cn("voga-menu__label", className)} {...props} />;
}

export function MenuSeparator({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>) {
  return <DropdownMenuPrimitive.Separator className={cn("voga-menu__sep", className)} {...props} />;
}
