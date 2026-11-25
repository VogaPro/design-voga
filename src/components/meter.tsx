import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "../lib/cn";

export interface MeterProps extends Omit<React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>, "value"> {
  /** 0–100. `undefined` deixa indeterminado, com a tinta atravessando. */
  value?: number;
  tone?: "ink" | "ok" | "attention" | "danger";
  thin?: boolean;
  /** Uma marca vertical no trilho — o limite do plano, a meta. */
  mark?: number;
}

/**
 * Medidor. O trilho é tinta translúcida, não superfície — então ele aparece
 * igual num card elevado e num poço.
 */
export const Meter = React.forwardRef<React.ComponentRef<typeof ProgressPrimitive.Root>, MeterProps>(
  function Meter({ className, value, tone = "ink", thin, mark, ...props }, ref) {
    const indeterminate = value === undefined;
    return (
      <ProgressPrimitive.Root
        ref={ref}
        value={indeterminate ? null : value}
        className={cn(
          "voga-meter",
          thin && "voga-meter--thin",
          tone !== "ink" && `voga-meter--${tone}`,
          indeterminate && "voga-meter--loading",
          className,
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className="voga-meter__bar"
          style={indeterminate ? undefined : { transform: `scaleX(${Math.min(100, Math.max(0, value)) / 100})` }}
        />
        {mark !== undefined ? (
          <span className="voga-meter__mark" style={{ left: `${Math.min(100, Math.max(0, mark))}%` }} aria-hidden="true" />
        ) : null}
      </ProgressPrimitive.Root>
    );
  },
);

export interface StepsProps extends React.ComponentPropsWithoutRef<"div"> {
  total: number;
  /** Quantos passos já terminaram. */
  done: number;
  /** `true` acende o passo seguinte com a tinta viajando. */
  running?: boolean;
  label?: string;
}

/** Passos de um trabalho: barra por passo, tinta no que terminou. */
export function Steps({ className, total, done, running, label = "Progresso", ...props }: StepsProps) {
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={done}
      className={cn("voga-steps", className)}
      {...props}
    >
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className="voga-steps__bar"
          data-done={i < done ? "true" : undefined}
          data-current={running && i === done ? "true" : undefined}
        />
      ))}
    </div>
  );
}
