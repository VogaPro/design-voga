import * as React from "react";
import { cn } from "../lib/cn";

export interface CardProps extends React.ComponentPropsWithoutRef<"div"> {
  /** `section` usa o raio maior (20) para blocos de página; `flat` é poço, sem elevação. */
  variant?: "card" | "section" | "flat";
  /** Sobe para e2 no hover. Use só quando a coisa inteira é clicável. */
  interactive?: boolean;
}

/**
 * Card é sempre neutro: o estado vai num Chip, nunca no fundo nem na borda.
 * Papel elevado, anel de hairline e a luz de 1px no topo.
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(
  { className, variant = "card", interactive, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        "voga-card",
        variant === "section" && "voga-card--section",
        variant === "flat" && "voga-card--flat",
        interactive && "voga-card--interactive",
        className,
      )}
      {...props}
    />
  );
});

export function CardHeader({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return <div className={cn("voga-card__head", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.ComponentPropsWithoutRef<"h3">) {
  return <h3 className={cn("voga-card__title", className)} {...props} />;
}

export function CardDescription({ className, ...props }: React.ComponentPropsWithoutRef<"p">) {
  return <p className={cn("voga-card__desc", className)} {...props} />;
}

export function CardBody({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return <div className={cn("voga-card__body", className)} {...props} />;
}

export function CardFooter({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return <div className={cn("voga-card__foot", className)} {...props} />;
}

/** Poço: código, faixa de tabela, citação — um degrau abaixo da face do card. */
export function Well({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return <div className={cn("voga-well", className)} {...props} />;
}

/** Lista com hairline entre as linhas, nunca abaixo da última. */
export function Rows({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return <div className={cn("voga-rows", className)} {...props} />;
}

export function Row({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return <div className={cn("voga-row", className)} {...props} />;
}
