import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "../lib/cn";
import { Icon } from "./icon";

export type ChipTone = "neutral" | "attention" | "ok" | "danger" | "info" | "accent" | "solid";

export interface ChipProps extends React.ComponentPropsWithoutRef<"span"> {
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
export function Chip({ className, tone = "neutral", icon, count, children, ...props }: ChipProps) {
  return (
    <span
      className={cn(
        "voga-chip",
        tone !== "neutral" && `voga-chip--${tone}`,
        count && "voga-chip--count",
        className,
      )}
      {...props}
    >
      {icon ? <Icon as={icon} /> : null}
      {children}
    </span>
  );
}
