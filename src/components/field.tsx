import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "../lib/cn";

export const Label = React.forwardRef<
  React.ComponentRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & { required?: boolean }
>(function Label({ className, required, children, ...props }, ref) {
  return (
    <LabelPrimitive.Root ref={ref} className={cn("voga-field__label", className)} {...props}>
      {children}
      {required ? (
        <span className="voga-field__req" aria-hidden="true">
          {" *"}
        </span>
      ) : null}
    </LabelPrimitive.Root>
  );
});

export interface FieldProps extends React.ComponentPropsWithoutRef<"div"> {
  label?: React.ReactNode;
  /** Ajuda abaixo do controle. Escondida quando há `error`. */
  hint?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
  /**
   * id do controle. Com ele o Field conecta rótulo e mensagem: clone seu
   * controle com `id={id}` e `aria-describedby={`${id}-desc`}`.
   */
  htmlFor?: string;
}

/** Rótulo + controle + ajuda ou erro, com o ritmo e a fiação de acessibilidade. */
export function Field({ className, label, hint, error, required, htmlFor, children, ...props }: FieldProps) {
  const message = error ?? hint;
  return (
    <div className={cn("voga-field", className)} {...props}>
      {label ? (
        <Label htmlFor={htmlFor} required={required}>
          {label}
        </Label>
      ) : null}
      {children}
      {message ? (
        <p
          id={htmlFor ? `${htmlFor}-desc` : undefined}
          className={error ? "voga-field__error" : "voga-field__help"}
        >
          {message}
        </p>
      ) : null}
    </div>
  );
}

/** Pilha de campos no ritmo do formulário. */
export function Form({ className, ...props }: React.ComponentPropsWithoutRef<"form">) {
  return <form className={cn("voga-form", className)} {...props} />;
}

/** Rótulo de seção: caixa alta, fraco, nunca mono. */
export function Eyebrow({ className, ...props }: React.ComponentPropsWithoutRef<"p">) {
  return <p className={cn("voga-eyebrow", className)} {...props} />;
}

/** Metadado — custo, contagem, horário — com algarismos tabulares. */
export function Meta({ className, ...props }: React.ComponentPropsWithoutRef<"span">) {
  return <span className={cn("voga-meta", className)} {...props} />;
}
