import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "../lib/cn";

/**
 * Segmentado: escolha única numa placa afundada. Os itens ficam 4px para
 * dentro e o raio de dentro é o de fora menos esse recuo.
 */
/** Só a forma de escolha única da raiz do Radix — o segmentado nunca é múltiplo. */
type SegmentedProps = Omit<
  Extract<React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>, { type: "single" }>,
  "type"
> & { size?: "sm" | "md" };

export const Segmented = React.forwardRef<
  React.ComponentRef<typeof ToggleGroupPrimitive.Root>,
  SegmentedProps
>(function Segmented({ className, size = "md", ...props }, ref) {
  return (
    <ToggleGroupPrimitive.Root
      ref={ref}
      type="single"
      className={cn("voga-seg", size === "sm" && "voga-seg--sm", className)}
      {...props}
    />
  );
});

export const SegmentedItem = React.forwardRef<
  React.ComponentRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>
>(function SegmentedItem({ className, ...props }, ref) {
  return <ToggleGroupPrimitive.Item ref={ref} className={cn("voga-seg__item", className)} {...props} />;
});

/** Abas: a linha fica embaixo do item ativo; nada de fundo colorido. */
export const Tabs = TabsPrimitive.Root;

export const TabsList = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(function TabsList({ className, ...props }, ref) {
  return <TabsPrimitive.List ref={ref} className={cn("voga-tabs", className)} {...props} />;
});

export const TabsTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(function TabsTrigger({ className, ...props }, ref) {
  return <TabsPrimitive.Trigger ref={ref} className={cn("voga-tabs__item", className)} {...props} />;
});

export const TabsContent = TabsPrimitive.Content;
