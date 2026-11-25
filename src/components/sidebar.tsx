import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "../lib/cn";
import { Icon } from "./icon";

/**
 * Barra lateral. Papel próprio (`--voga-side`), e a linha escolhida é um
 * degrau de tinta nesse papel — nunca uma cor.
 */
export function Sidebar({ className, ...props }: React.ComponentPropsWithoutRef<"nav">) {
  return <nav className={cn("voga-sidebar", className)} {...props} />;
}

export function SidebarGroup({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return <div className={cn("voga-sidebar__group", className)} {...props} />;
}

export function SidebarLabel({ className, ...props }: React.ComponentPropsWithoutRef<"p">) {
  return <p className={cn("voga-sidebar__label", className)} {...props} />;
}

export interface SidebarItemProps extends React.ComponentPropsWithoutRef<"a"> {
  icon?: LucideIcon;
  /** Marca como a página atual: afunda no papel e engrossa a palavra. */
  active?: boolean;
  /** Item de segundo nível, recuado e menor. */
  sub?: boolean;
  /** Contador à direita — passe um `Chip`. */
  side?: React.ReactNode;
}

export const SidebarItem = React.forwardRef<HTMLAnchorElement, SidebarItemProps>(function SidebarItem(
  { className, icon, active, sub, side, children, ...props },
  ref,
) {
  return (
    <a
      ref={ref}
      aria-current={active ? "page" : undefined}
      className={cn("voga-sidebar__item", sub && "voga-sidebar__item--sub", className)}
      {...props}
    >
      {icon ? <Icon as={icon} /> : null}
      {children}
      {side ? <span className="voga-sidebar__count">{side}</span> : null}
    </a>
  );
});

/** A casca de três colunas: barra lateral + área de trabalho. */
export function Shell({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return <div className={cn("voga-shell", className)} {...props} />;
}

export function ShellMain({ className, ...props }: React.ComponentPropsWithoutRef<"main">) {
  return <main className={cn("voga-shell__main", className)} {...props} />;
}
