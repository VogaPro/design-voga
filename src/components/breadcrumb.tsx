import * as React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "../lib/cn";
import { Icon } from "./icon";

/** Trilha. O último item é a página onde você está — não é link. */
export function Breadcrumb({ className, ...props }: React.ComponentPropsWithoutRef<"nav">) {
  return <nav aria-label="Trilha" className={cn("voga-crumbs", className)} {...props} />;
}

export function BreadcrumbLink({ className, ...props }: React.ComponentPropsWithoutRef<"a">) {
  return <a className={cn("voga-crumbs__link", className)} {...props} />;
}

export function BreadcrumbSeparator({ className, ...props }: React.ComponentPropsWithoutRef<"span">) {
  return (
    <span aria-hidden="true" className={cn("voga-crumbs__sep", className)} {...props}>
      <Icon as={ChevronRight} />
    </span>
  );
}

export function BreadcrumbCurrent({ className, ...props }: React.ComponentPropsWithoutRef<"span">) {
  return <span aria-current="page" className={cn("voga-crumbs__current", className)} {...props} />;
}
