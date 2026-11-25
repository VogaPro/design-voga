import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Drawer as Vaul } from "vaul";
import { X } from "lucide-react";
import { cn } from "../lib/cn";
import { Button } from "./button";

/* ── Painel lateral ───────────────────────────────────────────────────────── */

export const Sheet = DialogPrimitive.Root;
export const SheetTrigger = DialogPrimitive.Trigger;
export const SheetClose = DialogPrimitive.Close;

export const SheetContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    side?: "right" | "left" | "top" | "bottom";
    showClose?: boolean;
  }
>(function SheetContent({ className, children, side = "right", showClose = true, ...props }, ref) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="voga-scrim" />
      <DialogPrimitive.Content ref={ref} data-side={side} className={cn("voga-sheet", className)} {...props}>
        {children}
        {showClose ? (
          <DialogPrimitive.Close asChild>
            <Button variant="ghost" size="sm" icon={X} iconOnly aria-label="Fechar" className="voga-sheet__close" />
          </DialogPrimitive.Close>
        ) : null}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
});

export function SheetHeader({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return <div className={cn("voga-dialog__head", className)} {...props} />;
}
export function SheetFooter({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return <div className={cn("voga-dialog__foot", className)} {...props} />;
}
export const SheetTitle = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(function SheetTitle({ className, ...props }, ref) {
  return <DialogPrimitive.Title ref={ref} className={cn("voga-dialog__title", className)} {...props} />;
});
export const SheetDescription = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(function SheetDescription({ className, ...props }, ref) {
  return <DialogPrimitive.Description ref={ref} className={cn("voga-dialog__desc", className)} {...props} />;
});

/* ── Gaveta ───────────────────────────────────────────────────────────────── */

/**
 * Gaveta do telefone: puxa de baixo, com alça, e o dedo arrasta para fechar.
 * Num desktop, prefira `Sheet`.
 */
export const Drawer = Vaul.Root;
export const DrawerTrigger = Vaul.Trigger;
export const DrawerClose = Vaul.Close;
export const DrawerTitle = React.forwardRef<
  React.ComponentRef<typeof Vaul.Title>,
  React.ComponentPropsWithoutRef<typeof Vaul.Title>
>(function DrawerTitle({ className, ...props }, ref) {
  return <Vaul.Title ref={ref} className={cn("voga-dialog__title", className)} {...props} />;
});
export const DrawerDescription = React.forwardRef<
  React.ComponentRef<typeof Vaul.Description>,
  React.ComponentPropsWithoutRef<typeof Vaul.Description>
>(function DrawerDescription({ className, ...props }, ref) {
  return <Vaul.Description ref={ref} className={cn("voga-dialog__desc", className)} {...props} />;
});

export const DrawerContent = React.forwardRef<
  React.ComponentRef<typeof Vaul.Content>,
  React.ComponentPropsWithoutRef<typeof Vaul.Content> & { grip?: boolean }
>(function DrawerContent({ className, children, grip = true, ...props }, ref) {
  return (
    <Vaul.Portal>
      <Vaul.Overlay className="voga-scrim" />
      <Vaul.Content ref={ref} className={cn("voga-drawer", className)} {...props}>
        {grip ? <div className="voga-drawer__grip" aria-hidden="true" /> : null}
        {children}
      </Vaul.Content>
    </Vaul.Portal>
  );
});
