import * as React from "react";
import * as ToolbarPrimitive from "@radix-ui/react-toolbar";
import { cn } from "../lib/cn";

/** Placa de controles compactos (sm) sobre papel elevado. */
export const Toolbar = React.forwardRef<
  React.ComponentRef<typeof ToolbarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Root>
>(function Toolbar({ className, ...props }, ref) {
  return <ToolbarPrimitive.Root ref={ref} className={cn("voga-toolbar", className)} {...props} />;
});

export const ToolbarButton = ToolbarPrimitive.Button;

export const ToolbarSeparator = React.forwardRef<
  React.ComponentRef<typeof ToolbarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Separator>
>(function ToolbarSeparator({ className, ...props }, ref) {
  return (
    <ToolbarPrimitive.Separator
      ref={ref}
      className={cn("voga-sep", className)}
      style={{ margin: "0 4px", height: 20 }}
      {...props}
    />
  );
});
