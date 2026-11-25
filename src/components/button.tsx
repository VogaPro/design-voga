import * as React from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import type { LucideIcon } from "lucide-react";
import { cn } from "../lib/cn";
import { Icon } from "./icon";
import { Kbd } from "./kbd";
import { Spinner } from "./feedback";

export type ButtonVariant = "default" | "primary" | "accent" | "danger" | "ghost" | "link";
/** A régua de controle: md 40 (padrão), sm 32, lg 48 (só a ação principal de uma tela). */
export type ControlSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  /**
   * `primary` no máximo uma vez por área — é tinta, não cor. `accent` só para a
   * ação que leva ao objeto de identidade. `danger` para recusar ou apagar,
   * sempre com a palavra. `ghost` em barras de ferramenta. `link` para a ação
   * quieta de uma linha ("Editar", "Mudar"): só as palavras, sem caixa — então
   * `size`, `block` e `iconOnly` não se aplicam.
   */
  variant?: ButtonVariant;
  size?: ControlSize;
  /** Ícone que lidera as palavras. */
  icon?: LucideIcon;
  /** O ícone é todo o conteúdo — então `aria-label` passa a ser obrigatório. */
  iconOnly?: boolean;
  block?: boolean;
  /** Atalho depois do rótulo: `["⌘", "↵"]`. */
  kbd?: string[];
  /** Ação assíncrona rodando: girador, mesma largura, não clicável. */
  loading?: boolean;
  /** Renderiza o filho (um <Link>, por exemplo) com o visual do botão. */
  asChild?: boolean;
}

/** Palavras puras cortam com elipse num lugar estreito; qualquer elemento fica como foi escrito. */
const isWords = (children: React.ReactNode) =>
  children !== "" &&
  (Array.isArray(children) ? children : [children]).every(
    (child) => typeof child === "string" || typeof child === "number",
  );

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "default",
    size = "md",
    icon,
    iconOnly,
    block,
    kbd,
    loading,
    asChild,
    className,
    children,
    type = "button",
    disabled,
    ...rest
  },
  ref,
) {
  const Comp = asChild ? Slot : "button";
  const square = iconOnly || (!!icon && children == null);

  // Palavras puras ganham a caixa que corta com elipse; qualquer elemento fica.
  const body =
    children == null ? null : isWords(children) ? (
      <span className="voga-btn__label">{children}</span>
    ) : (
      children
    );

  return (
    <Comp
      ref={ref}
      type={asChild ? undefined : type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        "voga-btn",
        `voga-btn--${variant}`,
        size !== "md" && variant !== "link" && `voga-btn--${size}`,
        square && variant !== "link" && "voga-btn--icon",
        block && variant !== "link" && "voga-btn--block",
        className,
      )}
      {...rest}
    >
      {loading ? <Spinner /> : icon ? <Icon as={icon} /> : null}
      {/*
        Com `asChild` o Slot precisa saber QUAL filho recebe as props — o ícone e
        o atalho são irmãos, não o alvo. Slottable marca o alvo.
      */}
      {asChild ? <Slottable>{body}</Slottable> : body}
      {kbd?.length ? (
        <span className="voga-menu__shortcut">
          {kbd.map((key) => (
            <Kbd key={key}>{key}</Kbd>
          ))}
        </span>
      ) : null}
    </Comp>
  );
});
