import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { ChevronDown } from "lucide-react";
import { cn } from "../lib/cn";
import { Icon } from "./icon";

/* ── Acordeão ─────────────────────────────────────────────────────────────── */

export const Accordion = AccordionPrimitive.Root;

export const AccordionItem = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(function AccordionItem({ className, ...props }, ref) {
  return <AccordionPrimitive.Item ref={ref} className={cn("voga-fold", className)} {...props} />;
});

export const AccordionTrigger = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(function AccordionTrigger({ className, children, ...props }, ref) {
  return (
    <AccordionPrimitive.Header asChild>
      <h3>
        <AccordionPrimitive.Trigger ref={ref} className={cn("voga-fold__trigger", className)} {...props}>
          {children}
          <Icon as={ChevronDown} />
        </AccordionPrimitive.Trigger>
      </h3>
    </AccordionPrimitive.Header>
  );
});

export const AccordionContent = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(function AccordionContent({ className, children, ...props }, ref) {
  return (
    <AccordionPrimitive.Content ref={ref} className={cn("voga-fold__body", className)} {...props}>
      <div className="voga-fold__inner">{children}</div>
    </AccordionPrimitive.Content>
  );
});

/* ── Revelação ────────────────────────────────────────────────────────────── */

/** Uma linha quieta sobre o que a maioria nunca precisa abrir. */
export const Collapsible = CollapsiblePrimitive.Root;

export const CollapsibleTrigger = React.forwardRef<
  React.ComponentRef<typeof CollapsiblePrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Trigger>
>(function CollapsibleTrigger({ className, children, ...props }, ref) {
  return (
    <CollapsiblePrimitive.Trigger ref={ref} className={cn("voga-fold__trigger", className)} {...props}>
      {children}
      <Icon as={ChevronDown} />
    </CollapsiblePrimitive.Trigger>
  );
});

export const CollapsibleContent = React.forwardRef<
  React.ComponentRef<typeof CollapsiblePrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content>
>(function CollapsibleContent({ className, children, ...props }, ref) {
  return (
    <CollapsiblePrimitive.Content ref={ref} className={cn("voga-fold__body", className)} {...props}>
      <div className="voga-fold__inner">{children}</div>
    </CollapsiblePrimitive.Content>
  );
});
