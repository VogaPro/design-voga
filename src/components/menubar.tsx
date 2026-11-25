import * as React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { Check } from "lucide-react";
import { cn } from "../lib/cn";
import { Icon } from "./icon";
import { Kbd } from "./kbd";

/** Barra de menus de aplicativo. A barra é rasa; o painel aberto é vidro. */
export const Menubar = React.forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(function Menubar({ className, ...props }, ref) {
  return <MenubarPrimitive.Root ref={ref} className={cn("voga-menubar", className)} {...props} />;
});

export const MenubarMenu = MenubarPrimitive.Menu;
export const MenubarGroup = MenubarPrimitive.Group;

export const MenubarTrigger = React.forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(function MenubarTrigger({ className, ...props }, ref) {
  return <MenubarPrimitive.Trigger ref={ref} className={cn("voga-menubar__trigger", className)} {...props} />;
});

export const MenubarContent = React.forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(function MenubarContent({ className, sideOffset = 6, ...props }, ref) {
  return (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn("voga-glass voga-menu", className)}
        style={{ zIndex: "var(--voga-z-dropdown)" }}
        {...props}
      />
    </MenubarPrimitive.Portal>
  );
});

export const MenubarItem = React.forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
    tone?: "default" | "danger";
    kbd?: string[];
  }
>(function MenubarItem({ className, tone = "default", kbd, children, ...props }, ref) {
  return (
    <MenubarPrimitive.Item
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
    </MenubarPrimitive.Item>
  );
});

export const MenubarCheckboxItem = React.forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(function MenubarCheckboxItem({ className, children, ...props }, ref) {
  return (
    <MenubarPrimitive.CheckboxItem
      ref={ref}
      className={cn("voga-menu__item voga-menu__item--indent", className)}
      {...props}
    >
      <MenubarPrimitive.ItemIndicator className="voga-menu__mark">
        <Icon as={Check} style={{ width: 15, height: 15 }} />
      </MenubarPrimitive.ItemIndicator>
      {children}
    </MenubarPrimitive.CheckboxItem>
  );
});

export function MenubarLabel({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label>) {
  return <MenubarPrimitive.Label className={cn("voga-menu__label", className)} {...props} />;
}

export function MenubarSeparator({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>) {
  return <MenubarPrimitive.Separator className={cn("voga-menu__sep", className)} {...props} />;
}
