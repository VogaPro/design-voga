import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../lib/cn";
import { Button, type ButtonProps } from "./button";
import { Menu, MenuContent, MenuTrigger } from "./menu";

/**
 * Botões que são um controle só: raio nas pontas, hairline entre eles.
 * Use para ações da mesma família ("Dia · Semana · Mês" é `Segmented`).
 */
export function ButtonGroup({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return <div role="group" className={cn("voga-btngroup", className)} {...props} />;
}

export interface SplitButtonProps extends ButtonProps {
  /** Os itens do menu que a seta abre. */
  menu: React.ReactNode;
  menuLabel?: string;
}

/** Ação principal mais uma seta que abre as variações dela. */
export function SplitButton({ menu, menuLabel = "Mais opções", children, variant = "default", size = "md", ...props }: SplitButtonProps) {
  return (
    <ButtonGroup>
      <Button variant={variant} size={size} {...props}>
        {children}
      </Button>
      <Menu>
        <MenuTrigger asChild>
          <Button variant={variant} size={size} icon={ChevronDown} iconOnly aria-label={menuLabel} />
        </MenuTrigger>
        <MenuContent align="end">{menu}</MenuContent>
      </Menu>
    </ButtonGroup>
  );
}
