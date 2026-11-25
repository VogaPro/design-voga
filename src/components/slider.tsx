import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "../lib/cn";

/**
 * Deslizador. Trilho de tinta translúcida, polegar que se levanta do papel.
 * Mostre o valor em algum lugar — um deslizador sozinho não diz onde está.
 */
export const Slider = React.forwardRef<
  React.ComponentRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(function Slider({ className, value, defaultValue, ...props }, ref) {
  const pontos = value ?? defaultValue ?? [0];
  return (
    <SliderPrimitive.Root
      ref={ref}
      value={value}
      defaultValue={defaultValue}
      className={cn("voga-slider", className)}
      {...props}
    >
      <SliderPrimitive.Track className="voga-slider__track">
        <SliderPrimitive.Range className="voga-slider__range" />
      </SliderPrimitive.Track>
      {pontos.map((_, i) => (
        <SliderPrimitive.Thumb key={i} className="voga-slider__thumb" />
      ))}
    </SliderPrimitive.Root>
  );
});
