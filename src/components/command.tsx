import * as React from "react";
import { Command as Cmdk } from "cmdk";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Search } from "lucide-react";
import { cn } from "../lib/cn";
import { Icon } from "./icon";

/**
 * Paleta de comandos. Em vidro, raio de seção, busca no topo. Grupos nomeiam
 * o que fazem ("Ir para", "Pedir a…"), setas e Enter navegam, Esc fecha.
 */
export const Command = Cmdk;

export const CommandInput = React.forwardRef<
  React.ComponentRef<typeof Cmdk.Input>,
  React.ComponentPropsWithoutRef<typeof Cmdk.Input>
>(function CommandInput({ className, ...props }, ref) {
  return (
    <div className="voga-palette__search">
      <Icon as={Search} />
      <Cmdk.Input ref={ref} className={cn("voga-palette__input", className)} {...props} />
    </div>
  );
});

export const CommandList = React.forwardRef<
  React.ComponentRef<typeof Cmdk.List>,
  React.ComponentPropsWithoutRef<typeof Cmdk.List>
>(function CommandList({ className, ...props }, ref) {
  return <Cmdk.List ref={ref} className={cn("voga-palette__list", className)} {...props} />;
});

export const CommandEmpty = React.forwardRef<
  React.ComponentRef<typeof Cmdk.Empty>,
  React.ComponentPropsWithoutRef<typeof Cmdk.Empty>
>(function CommandEmpty({ className, ...props }, ref) {
  return <Cmdk.Empty ref={ref} className={cn("voga-palette__empty", className)} {...props} />;
});

export const CommandGroup = React.forwardRef<
  React.ComponentRef<typeof Cmdk.Group>,
  React.ComponentPropsWithoutRef<typeof Cmdk.Group>
>(function CommandGroup({ className, ...props }, ref) {
  return <Cmdk.Group ref={ref} className={cn("voga-palette__group", className)} {...props} />;
});

export const CommandItem = React.forwardRef<
  React.ComponentRef<typeof Cmdk.Item>,
  React.ComponentPropsWithoutRef<typeof Cmdk.Item>
>(function CommandItem({ className, ...props }, ref) {
  return <Cmdk.Item ref={ref} className={cn("voga-palette__item", className)} {...props} />;
});

export const CommandSeparator = React.forwardRef<
  React.ComponentRef<typeof Cmdk.Separator>,
  React.ComponentPropsWithoutRef<typeof Cmdk.Separator>
>(function CommandSeparator({ className, ...props }, ref) {
  return <Cmdk.Separator ref={ref} className={cn("voga-menu__sep", className)} {...props} />;
});

export function CommandShortcut({ className, ...props }: React.ComponentPropsWithoutRef<"span">) {
  return <span className={cn("voga-menu__shortcut", className)} {...props} />;
}

/** A paleta inteira em diálogo, do jeito que o ⌘K abre. */
export function CommandDialog({
  open,
  onOpenChange,
  label = "Buscar comandos",
  children,
  className,
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  label?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="voga-scrim" />
        <DialogPrimitive.Content
          aria-label={label}
          className={cn("voga-glass voga-palette", className)}
        >
          <DialogPrimitive.Title className="sr-only">{label}</DialogPrimitive.Title>
          <Cmdk label={label}>{children}</Cmdk>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

/** Liga ⌘K / Ctrl+K a um estado aberto/fechado. */
export function useCommandShortcut(onOpen: () => void, key = "k") {
  React.useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === key && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        onOpen();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onOpen, key]);
}
