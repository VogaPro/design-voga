import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "../lib/cn";
import { Icon } from "./icon";

export interface EmptyProps extends Omit<React.ComponentPropsWithoutRef<"div">, "title"> {
  icon?: LucideIcon;
  title: React.ReactNode;
  /** Uma linha dizendo o que fazer a respeito. */
  desc?: React.ReactNode;
  /** Botões. No máximo dois, e o primeiro é a ação óbvia. */
  actions?: React.ReactNode;
  /** `page` ocupa a tela; `inline` cabe dentro de um card. */
  size?: "page" | "panel" | "inline";
}

/**
 * O que mostrar quando não há nada. Nunca deixe uma tela em branco: diga o que
 * está vazio e qual é o próximo passo.
 */
export function Empty({ className, icon, title, desc, actions, size = "panel", ...props }: EmptyProps) {
  return (
    <div className={cn("voga-empty", className)} data-size={size} {...props}>
      {icon ? (
        <div className="voga-empty__glyph">
          <Icon as={icon} />
        </div>
      ) : null}
      <p className="voga-empty__title">{title}</p>
      {desc ? <p className="voga-empty__desc">{desc}</p> : null}
      {actions ? <div className="voga-empty__actions">{actions}</div> : null}
    </div>
  );
}
