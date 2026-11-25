import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { Check, Minus } from "lucide-react";
import { cn } from "../lib/cn";

export const Checkbox = React.forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(function Checkbox({ className, ...props }, ref) {
  return (
    <CheckboxPrimitive.Root ref={ref} className={cn("voga-check", className)} {...props}>
      {/* O indicador fica montado sempre, para o traço poder se desenhar. */}
      <CheckboxPrimitive.Indicator forceMount asChild>
        <svg viewBox="0 0 24 24">
          {props.checked === "indeterminate" ? <path d="M6 12h12" /> : <path d="M5 12.5 10 17.5 19 7" />}
        </svg>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});

export const Switch = React.forwardRef<
  React.ComponentRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(function Switch({ className, ...props }, ref) {
  return (
    <SwitchPrimitive.Root ref={ref} className={cn("voga-switch", className)} {...props}>
      <SwitchPrimitive.Thumb className="voga-switch__thumb" />
    </SwitchPrimitive.Root>
  );
});

/** Linha que embrulha um controle e suas palavras. `split` joga o controle na direita. */
export function ControlRow({
  className,
  split,
  ...props
}: React.ComponentPropsWithoutRef<"label"> & { split?: boolean }) {
  return (
    <label
      className={cn("voga-control-row", split && "voga-control-row--split", className)}
      {...props}
    />
  );
}

/**
 * Alternador: um botão que fica ligado. É um item de segmentado vivendo
 * sozinho — ligado afunda como tecla pressionada, não pinta de cor.
 */
export const Toggle = React.forwardRef<
  React.ComponentRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> & {
    size?: "sm" | "md";
    /** Só o ícone: então `aria-label` passa a ser obrigatório. */
    iconOnly?: boolean;
  }
>(function Toggle({ className, size = "md", iconOnly, ...props }, ref) {
  return (
    <TogglePrimitive.Root
      ref={ref}
      className={cn(
        "voga-toggle",
        size === "sm" && "voga-toggle--sm",
        iconOnly && "voga-toggle--icon",
        className,
      )}
      {...props}
    />
  );
});

