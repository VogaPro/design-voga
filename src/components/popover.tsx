import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { cn } from "../lib/cn";

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverClose = PopoverPrimitive.Close;
export const PopoverAnchor = PopoverPrimitive.Anchor;

/** Vidro com palavras e controles próprios. Para uma lista, use `Menu`. */
export const PopoverContent = React.forwardRef<
  React.ComponentRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & { arrow?: boolean }
>(function PopoverContent({ className, sideOffset = 6, arrow, children, ...props }, ref) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn("voga-glass voga-popover", className)}
        {...props}
      >
        {children}
        {arrow ? <PopoverPrimitive.Arrow className="voga-popover__arrow" width={12} height={6} /> : null}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
});

export const HoverCard = HoverCardPrimitive.Root;
export const HoverCardTrigger = HoverCardPrimitive.Trigger;

/** Abre ao passar o mouse. Nunca guarde aqui a única via para uma ação. */
export const HoverCardContent = React.forwardRef<
  React.ComponentRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(function HoverCardContent({ className, sideOffset = 6, ...props }, ref) {
  return (
    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn("voga-glass voga-hovercard", className)}
        {...props}
      />
    </HoverCardPrimitive.Portal>
  );
});
