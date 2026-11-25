import * as React from "react";
import { OTPInput, type SlotProps } from "input-otp";
import { cn } from "../lib/cn";

export interface CodeInputProps
  extends Omit<React.ComponentPropsWithoutRef<typeof OTPInput>, "render" | "children"> {
  /** Põe um separador no meio: `123 · 456`. */
  grouped?: boolean;
}

function Slot({ char, hasFakeCaret, isActive }: SlotProps) {
  return (
    <div className="voga-code__slot" data-active={isActive ? "true" : undefined}>
      {char ?? (hasFakeCaret ? <span className="voga-code__caret" /> : null)}
    </div>
  );
}

/**
 * Código de verificação. Uma casa por dígito, na régua dos controles, com
 * algarismos tabulares — então as casas não dançam ao digitar.
 */
export const CodeInput = React.forwardRef<HTMLInputElement, CodeInputProps>(function CodeInput(
  { className, maxLength = 6, grouped, ...props },
  ref,
) {
  const meio = Math.ceil(maxLength / 2);
  return (
    <OTPInput
      ref={ref}
      maxLength={maxLength}
      containerClassName={cn("voga-code", className)}
      render={({ slots }) =>
        grouped ? (
          <>
            <div className="voga-code">
              {slots.slice(0, meio).map((slot, i) => (
                <Slot key={i} {...slot} />
              ))}
            </div>
            <span className="voga-code__sep" aria-hidden="true">·</span>
            <div className="voga-code">
              {slots.slice(meio).map((slot, i) => (
                <Slot key={i} {...slot} />
              ))}
            </div>
          </>
        ) : (
          <>
            {slots.map((slot, i) => (
              <Slot key={i} {...slot} />
            ))}
          </>
        )
      }
      {...props}
    />
  );
});
