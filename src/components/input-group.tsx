import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "../lib/cn";
import { Icon } from "./icon";

export interface InputGroupProps extends React.ComponentPropsWithoutRef<"div"> {
  invalid?: boolean;
}

/**
 * Prefixo, campo e sufixo como um controle só. O anel de foco envolve o grupo
 * inteiro, e os cantos de dentro são concêntricos com os de fora.
 */
export function InputGroup({ className, invalid, ...props }: InputGroupProps) {
  return <div data-invalid={invalid ? "true" : undefined} className={cn("voga-ingroup", className)} {...props} />;
}

export interface AffixProps extends React.ComponentPropsWithoutRef<"span"> {
  icon?: LucideIcon;
  /** Com face de poço e hairline, para unidade ("kg", "R$") ou domínio. */
  boxed?: boolean;
}

export function InputAffix({ className, icon, boxed, children, ...props }: AffixProps) {
  return (
    <span className={cn("voga-ingroup__affix", boxed && "voga-ingroup__affix--boxed", className)} {...props}>
      {icon ? <Icon as={icon} /> : null}
      {children}
    </span>
  );
}
