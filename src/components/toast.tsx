import * as React from "react";
import { Toaster as Sonner } from "sonner";
import { cn } from "../lib/cn";

/**
 * Torrada. Monte o `<Toaster />` uma vez na raiz e chame `toast(...)`.
 * Ela anuncia o que aconteceu, no passado: "Versão publicada", não "Publicar".
 */
// Reexport direto: atribuir a uma const faria o tsc precisar nomear tipos
// internos do sonner que ele não exporta.
export { toast } from "sonner";

export function Toaster({
  className,
  position = "bottom-right",
  ...props
}: React.ComponentPropsWithoutRef<typeof Sonner>) {
  return (
    <Sonner
      position={position}
      // `unstyled` desliga o visual do sonner — o nosso vem do CSS do pacote.
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: "voga-glass voga-toast",
          title: "voga-toast__title",
          description: "voga-toast__desc",
          success: "voga-toast--ok",
          warning: "voga-toast--attention",
          error: "voga-toast--danger",
        },
      }}
      style={{ zIndex: "var(--voga-z-toast)" } as React.CSSProperties}
      className={cn(className)}
      {...props}
    />
  );
}
