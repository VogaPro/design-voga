import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "../lib/cn";

/** Escolha única. Marcado é tinta, nunca cor. */
export const RadioGroup = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(function RadioGroup({ className, ...props }, ref) {
  return <RadioGroupPrimitive.Root ref={ref} className={cn("voga-radios", className)} {...props} />;
});

export const Radio = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(function Radio({ className, ...props }, ref) {
  return (
    <RadioGroupPrimitive.Item ref={ref} className={cn("voga-radio", className)} {...props}>
      {/* O ponto fica montado sempre, para poder crescer com mola ao marcar. */}
      <RadioGroupPrimitive.Indicator forceMount asChild>
        <span className="voga-radio__dot" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});

export interface ChoiceProps
  extends Omit<React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>, "title"> {
  title: React.ReactNode;
  desc?: React.ReactNode;
}

/**
 * Cartão de escolha: a linha inteira é o alvo. Escolhido afunda como tecla
 * pressionada — não pinta de cor.
 */
export const Choice = React.forwardRef<React.ComponentRef<typeof RadioGroupPrimitive.Item>, ChoiceProps>(
  function Choice({ className, title, desc, ...props }, ref) {
    return (
      <RadioGroupPrimitive.Item ref={ref} className={cn("voga-choice", className)} {...props}>
        <span className="voga-radio" data-state={props.checked ? "checked" : undefined} aria-hidden="true">
          <span className="voga-radio__dot" />
        </span>
        <span className="voga-choice__main">
          <span className="voga-choice__title">{title}</span>
          {desc ? <span className="voga-choice__desc">{desc}</span> : null}
        </span>
      </RadioGroupPrimitive.Item>
    );
  },
);
