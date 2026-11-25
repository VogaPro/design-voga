import * as React from "react";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { Check } from "lucide-react";
import { cn } from "../lib/cn";
import { Icon } from "./icon";
import { Kbd } from "./kbd";

/** Menu do botão direito. Tudo que está aqui tem de existir em outro lugar também. */
export const ContextMenu = ContextMenuPrimitive.Root;
export const ContextMenuTrigger = ContextMenuPrimitive.Trigger;
export const ContextMenuGroup = ContextMenuPrimitive.Group;

export const ContextMenuContent = React.forwardRef<
  React.ComponentRef<typeof ContextMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(function ContextMenuContent({ className, ...props }, ref) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        ref={ref}
        className={cn("voga-glass voga-menu", className)}
        style={{ zIndex: "var(--voga-z-dropdown)" }}
        {...props}
      />
    </ContextMenuPrimitive.Portal>
  );
});

export const ContextMenuItem = React.forwardRef<
  React.ComponentRef<typeof ContextMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
    tone?: "default" | "danger";
    kbd?: string[];
  }
>(function ContextMenuItem({ className, tone = "default", kbd, children, ...props }, ref) {
  return (
    <ContextMenuPrimitive.Item
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
    </ContextMenuPrimitive.Item>
  );
});

export const ContextMenuCheckboxItem = React.forwardRef<
  React.ComponentRef<typeof ContextMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(function ContextMenuCheckboxItem({ className, children, ...props }, ref) {
  return (
    <ContextMenuPrimitive.CheckboxItem
      ref={ref}
      className={cn("voga-menu__item voga-menu__item--indent", className)}
      {...props}
    >
      <ContextMenuPrimitive.ItemIndicator className="voga-menu__mark">
        <Icon as={Check} style={{ width: 15, height: 15 }} />
      </ContextMenuPrimitive.ItemIndicator>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  );
});

export function ContextMenuLabel({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label>) {
  return <ContextMenuPrimitive.Label className={cn("voga-menu__label", className)} {...props} />;
}

export function ContextMenuSeparator({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>) {
  return <ContextMenuPrimitive.Separator className={cn("voga-menu__sep", className)} {...props} />;
}
