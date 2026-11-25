import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { cn } from "../lib/cn";

/**
 * Diálogo que exige uma escolha: não fecha clicando fora nem com Esc. Use só
 * quando a ação não tem volta, e nomeie o alvo no título ("Excluir a rampa?").
 */
export const AlertDialog = AlertDialogPrimitive.Root;
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
export const AlertDialogCancel = AlertDialogPrimitive.Cancel;
export const AlertDialogAction = AlertDialogPrimitive.Action;

export const AlertDialogContent = React.forwardRef<
  React.ComponentRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(function AlertDialogContent({ className, ...props }, ref) {
  return (
    <AlertDialogPrimitive.Portal>
      <AlertDialogPrimitive.Overlay className="voga-scrim" />
      <AlertDialogPrimitive.Content ref={ref} className={cn("voga-dialog", className)} {...props} />
    </AlertDialogPrimitive.Portal>
  );
});

export function AlertDialogHeader({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return <div className={cn("voga-dialog__head", className)} {...props} />;
}
export function AlertDialogFooter({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return <div className={cn("voga-dialog__foot", className)} {...props} />;
}
export const AlertDialogTitle = React.forwardRef<
  React.ComponentRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(function AlertDialogTitle({ className, ...props }, ref) {
  return <AlertDialogPrimitive.Title ref={ref} className={cn("voga-dialog__title", className)} {...props} />;
});
export const AlertDialogDescription = React.forwardRef<
  React.ComponentRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(function AlertDialogDescription({ className, ...props }, ref) {
  return (
    <AlertDialogPrimitive.Description ref={ref} className={cn("voga-dialog__desc", className)} {...props} />
  );
});
