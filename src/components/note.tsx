import * as React from "react";
import { CircleAlert, CircleCheck, Info, TriangleAlert } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "../lib/cn";
import { Icon } from "./icon";

export type NoteTone = "neutral" | "info" | "ok" | "attention" | "danger";

const toneIcon: Record<NoteTone, LucideIcon> = {
  neutral: Info,
  info: Info,
  ok: CircleCheck,
  attention: TriangleAlert,
  danger: CircleAlert,
};

export interface NoteProps extends Omit<React.ComponentPropsWithoutRef<"div">, "title"> {
  tone?: NoteTone;
  title?: React.ReactNode;
  /** `false` tira o ícone; um nó substitui o padrão. */
  icon?: LucideIcon | false;
}

/**
 * Aviso: face neutra com uma barra de 2px na lateral. A cor fica na barra e no
 * ícone — nunca tingindo o fundo inteiro.
 */
export function Note({ className, tone = "neutral", title, icon, children, ...props }: NoteProps) {
  const Glyph = icon === false ? null : (icon ?? toneIcon[tone]);
  return (
    <div role="note" className={cn("voga-note", tone !== "neutral" && `voga-note--${tone}`, className)} {...props}>
      {Glyph ? <Icon as={Glyph} /> : null}
      <div>
        {title ? <p className="voga-note__title">{title}</p> : null}
        {children ? <div className="voga-note__body">{children}</div> : null}
      </div>
    </div>
  );
}
