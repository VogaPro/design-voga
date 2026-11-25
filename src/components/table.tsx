import * as React from "react";
import { cn } from "../lib/cn";

/**
 * Tabela. Cabeçalho fixo no poço, hairline entre as linhas, algarismos
 * tabulares em tudo. A caixa rola sozinha na horizontal — a página nunca.
 */
export function TableWrap({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return <div className={cn("voga-table-wrap", className)} {...props} />;
}

export const Table = React.forwardRef<
  HTMLTableElement,
  React.ComponentPropsWithoutRef<"table"> & { hover?: boolean }
>(function Table({ className, hover, ...props }, ref) {
  return <table ref={ref} className={cn("voga-table", hover && "voga-table--hover", className)} {...props} />;
});

export function TableHead({ className, ...props }: React.ComponentPropsWithoutRef<"thead">) {
  return <thead className={cn(className)} {...props} />;
}
export function TableBody({ className, ...props }: React.ComponentPropsWithoutRef<"tbody">) {
  return <tbody className={cn(className)} {...props} />;
}
export function TableFoot({ className, ...props }: React.ComponentPropsWithoutRef<"tfoot">) {
  return <tfoot className={cn(className)} {...props} />;
}
export function TableRow({ className, ...props }: React.ComponentPropsWithoutRef<"tr">) {
  return <tr className={cn(className)} {...props} />;
}

/** `align` do HTML é um atributo antigo com outros valores, então usamos nome próprio. */
export type CellAlign = "start" | "center" | "end";

export interface TableCellProps extends Omit<React.ComponentPropsWithoutRef<"td">, "align"> {
  /** `end` alinha número à direita; `center` centraliza. */
  alignment?: CellAlign;
}

export function TableCell({ className, alignment, ...props }: TableCellProps) {
  return <td data-align={alignment} className={cn(className)} {...props} />;
}

export interface TableHeaderProps extends Omit<React.ComponentPropsWithoutRef<"th">, "align"> {
  alignment?: CellAlign;
}

export function TableHeader({ className, alignment, ...props }: TableHeaderProps) {
  return <th scope="col" data-align={alignment} className={cn(className)} {...props} />;
}

export function TableCaption({ className, ...props }: React.ComponentPropsWithoutRef<"caption">) {
  return <caption className={cn(className)} {...props} />;
}
