import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "../lib/cn";

export interface AvatarProps extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  src?: string;
  /** Iniciais quando não há imagem. */
  fallback: string;
  size?: "sm" | "md" | "lg";
  /**
   * Marca: quadrado com raio a 30% do lado e um canto vivo no inferior
   * esquerdo, no degradê do acento. Reserve para o que não é pessoa — a
   * identidade de um produto, de um bot, de um sistema.
   */
  mark?: boolean;
  alt?: string;
}

/** Pessoas são círculos. A marca é o quadrado de canto vivo. */
export function Avatar({ className, src, fallback, size = "md", mark, alt, ...props }: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      className={cn("voga-avatar", size !== "md" && `voga-avatar--${size}`, mark && "voga-avatar--mark", className)}
      {...props}
    >
      {src ? <AvatarPrimitive.Image src={src} alt={alt ?? ""} /> : null}
      <AvatarPrimitive.Fallback delayMs={src ? 300 : 0}>{fallback}</AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
}
