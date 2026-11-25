import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "../lib/cn";

/** Placeholder de carregamento — sempre `sunken`, com a forma do conteúdo real. */
export function Skeleton({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return <div aria-hidden="true" className={cn("voga-skeleton", className)} {...props} />;
}

export function Spinner({
  className,
  label,
  ...props
}: React.ComponentPropsWithoutRef<"svg"> & { label?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("voga-spinner", className)}
      role={label ? "status" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : "true"}
      {...props}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M21 12a9 9 0 0 0-9-9" />
    </svg>
  );
}

export const Separator = React.forwardRef<
  React.ComponentRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> & { strong?: boolean }
>(function Separator({ className, orientation = "horizontal", decorative = true, strong, ...props }, ref) {
  return (
    <SeparatorPrimitive.Root
      ref={ref}
      orientation={orientation}
      decorative={decorative}
      className={cn("voga-sep", strong && "voga-sep--strong", className)}
      {...props}
    />
  );
});
