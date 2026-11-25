import * as React from "react";
import { cn } from "../lib/cn";

/** Tecla de atalho. Fonte da interface com algarismos tabulares, nunca mono. */
export function Kbd({ className, ...props }: React.ComponentPropsWithoutRef<"kbd">) {
  return <kbd className={cn("voga-kbd", className)} {...props} />;
}
