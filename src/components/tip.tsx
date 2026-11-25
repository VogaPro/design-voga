import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "../lib/cn";

/** Envolva a raiz do app uma vez. */
export const TipProvider = TooltipPrimitive.Provider;
export const TipRoot = TooltipPrimitive.Root;
export const TipTrigger = TooltipPrimitive.Trigger;

export const TipContent = React.forwardRef<
  React.ComponentRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(function TipContent({ className, sideOffset = 6, children, ...props }, ref) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content ref={ref} sideOffset={sideOffset} className={cn("voga-tip", className)} {...props}>
        {children}
        <TooltipPrimitive.Arrow className="voga-tip__arrow" width={10} height={5} />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
});

export interface TipProps
  extends Omit<React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Root>, "children"> {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>["side"];
}

/** O caso comum: um gatilho, um texto. */
export function Tip({ content, children, side = "top", ...props }: TipProps) {
  return (
    <TipRoot {...props}>
      <TipTrigger asChild>{children}</TipTrigger>
      <TipContent side={side}>{content}</TipContent>
    </TipRoot>
  );
}
