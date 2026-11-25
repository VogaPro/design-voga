import * as React from "react";
import { cn } from "../lib/cn";

export interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  /** Face elevada em vez de linha rasa. */
  card?: boolean;
  /** Placa no hover e cursor de mão. */
  interactive?: boolean;
}

/** A linha de uma lista: face à esquerda, palavras no meio, ação à direita. */
export const Item = React.forwardRef<HTMLDivElement, ItemProps>(function Item(
  { className, card, interactive, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn("voga-item", card && "voga-item--card", interactive && "voga-item--interactive", className)}
      {...props}
    />
  );
});

export function ItemMedia({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return <div className={cn("voga-item__media", className)} {...props} />;
}
export function ItemMain({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return <div className={cn("voga-item__main", className)} {...props} />;
}
export function ItemTitle({ className, ...props }: React.ComponentPropsWithoutRef<"p">) {
  return <p className={cn("voga-item__title", className)} {...props} />;
}
export function ItemDescription({ className, ...props }: React.ComponentPropsWithoutRef<"p">) {
  return <p className={cn("voga-item__desc", className)} {...props} />;
}
export function ItemSide({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return <div className={cn("voga-item__side", className)} {...props} />;
}
