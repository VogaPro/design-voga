import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "../lib/cn";

export interface IconProps extends Omit<React.ComponentPropsWithoutRef<"svg">, "ref"> {
  /** Qualquer ícone do lucide-react: `import { Check } from "lucide-react"`. */
  as: LucideIcon;
}

/**
 * Normaliza um ícone para a régua do sistema: traço 1.6, pontas arredondadas,
 * tamanho pelo controle que o contém. Sem emoji como ícone.
 */
export function Icon({ as: Glyph, className, ...props }: IconProps) {
  return <Glyph className={cn("voga-icon", className)} strokeWidth={1.6} aria-hidden="true" {...props} />;
}
