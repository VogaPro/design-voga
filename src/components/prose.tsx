import * as React from "react";
import { cn } from "../lib/cn";

/**
 * Texto corrido — para o que vem de markdown, de um CMS, de um e-mail.
 * 68 caracteres por linha, que é onde o olho não se perde, e a hierarquia
 * inteira já resolvida: título, lista, citação, código, tabela, imagem.
 */
export function Prose({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return <div className={cn("voga-prose", className)} {...props} />;
}
