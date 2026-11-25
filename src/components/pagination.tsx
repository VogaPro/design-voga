import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../lib/cn";
import { Button } from "./button";

export interface PaginationProps extends Omit<React.ComponentPropsWithoutRef<"nav">, "onChange"> {
  page: number;
  /** Total de páginas. 1 esconde o controle inteiro. */
  pages: number;
  onChange: (page: number) => void;
  /** Quantas páginas mostrar de cada lado da atual. */
  around?: number;
}

/** Devolve a sequência de páginas a mostrar, com `null` onde há buraco. */
function janela(page: number, pages: number, around: number): (number | null)[] {
  const keep = new Set<number>([1, pages]);
  for (let i = page - around; i <= page + around; i++) {
    if (i >= 1 && i <= pages) keep.add(i);
  }
  const sorted = [...keep].sort((a, b) => a - b);
  const out: (number | null)[] = [];
  let last = 0;
  for (const n of sorted) {
    if (last && n - last > 1) out.push(null);
    out.push(n);
    last = n;
  }
  return out;
}

/** Paginação na régua compacta, com algarismos tabulares. */
export function Pagination({ className, page, pages, onChange, around = 1, ...props }: PaginationProps) {
  if (pages <= 1) return null;
  return (
    <nav aria-label="Paginação" className={cn("voga-pages", className)} {...props}>
      <Button
        size="sm"
        variant="ghost"
        icon={ChevronLeft}
        iconOnly
        aria-label="Página anterior"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
      />
      {janela(page, pages, around).map((n, i) =>
        n === null ? (
          <span key={`gap-${i}`} className="voga-pages__gap" aria-hidden="true">
            …
          </span>
        ) : (
          <Button
            key={n}
            size="sm"
            variant="ghost"
            aria-label={`Página ${n}`}
            aria-current={n === page ? "page" : undefined}
            className={n === page ? "voga-chosen" : undefined}
            onClick={() => onChange(n)}
          >
            {n}
          </Button>
        ),
      )}
      <Button
        size="sm"
        variant="ghost"
        icon={ChevronRight}
        iconOnly
        aria-label="Próxima página"
        disabled={page >= pages}
        onClick={() => onChange(page + 1)}
      />
    </nav>
  );
}
