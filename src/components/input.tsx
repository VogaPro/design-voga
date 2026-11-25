import * as React from "react";
import { cn } from "../lib/cn";
import type { ControlSize } from "./button";

export interface InputProps extends Omit<React.ComponentPropsWithoutRef<"input">, "size"> {
  size?: ControlSize;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, size = "md", type = "text", ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      type={type}
      className={cn("voga-input", size !== "md" && `voga-input--${size}`, className)}
      {...props}
    />
  );
});

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentPropsWithoutRef<"textarea">
>(function Textarea({ className, ...props }, ref) {
  return <textarea ref={ref} className={cn("voga-input voga-textarea", className)} {...props} />;
});

/**
 * Caixa de texto flutuante: um card de raio 18 que sobe para e3 em foco, com
 * lugar para pílulas de contexto e para a ação de enviar.
 */
export const Composer = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  function Composer({ className, ...props }, ref) {
    return <div ref={ref} className={cn("voga-composer", className)} {...props} />;
  },
);
