import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";
import { cn } from "../lib/cn";

/** Área de rolagem com barra fina de tinta, igual nos dois sistemas. */
export const ScrollArea = React.forwardRef<
  React.ComponentRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> & {
    orientation?: "vertical" | "horizontal" | "both";
  }
>(function ScrollArea({ className, children, orientation = "vertical", ...props }, ref) {
  return (
    <ScrollAreaPrimitive.Root ref={ref} className={cn("voga-scroll", className)} {...props}>
      <ScrollAreaPrimitive.Viewport className="voga-scroll__viewport">{children}</ScrollAreaPrimitive.Viewport>
      {orientation !== "horizontal" ? (
        <ScrollAreaPrimitive.Scrollbar orientation="vertical" className="voga-scroll__bar">
          <ScrollAreaPrimitive.Thumb className="voga-scroll__thumb" />
        </ScrollAreaPrimitive.Scrollbar>
      ) : null}
      {orientation !== "vertical" ? (
        <ScrollAreaPrimitive.Scrollbar orientation="horizontal" className="voga-scroll__bar">
          <ScrollAreaPrimitive.Thumb className="voga-scroll__thumb" />
        </ScrollAreaPrimitive.Scrollbar>
      ) : null}
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
});

/** Caixa de proporção fixa — para imagem e vídeo não pularem ao carregar. */
export function AspectRatio({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root>) {
  return <AspectRatioPrimitive.Root className={cn("voga-ratio", className)} {...props} />;
}
