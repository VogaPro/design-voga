import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { ChevronDown } from "lucide-react";
import { cn } from "../lib/cn";
import { Icon } from "./icon";

/** Menu de navegação de site: gatilhos rasos, painel em vidro embaixo. */
export const NavMenu = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(function NavMenu({ className, children, ...props }, ref) {
  return (
    <NavigationMenuPrimitive.Root ref={ref} className={cn("voga-nav", className)} {...props}>
      {children}
      <NavigationMenuPrimitive.Viewport className="voga-glass voga-nav__viewport" />
    </NavigationMenuPrimitive.Root>
  );
});

export const NavMenuList = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(function NavMenuList({ className, ...props }, ref) {
  return <NavigationMenuPrimitive.List ref={ref} className={cn("voga-nav__list", className)} {...props} />;
});

export const NavMenuItem = NavigationMenuPrimitive.Item;

export const NavMenuTrigger = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(function NavMenuTrigger({ className, children, ...props }, ref) {
  return (
    <NavigationMenuPrimitive.Trigger ref={ref} className={cn("voga-nav__trigger", className)} {...props}>
      {children}
      <Icon as={ChevronDown} />
    </NavigationMenuPrimitive.Trigger>
  );
});

export const NavMenuContent = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(function NavMenuContent({ className, ...props }, ref) {
  return <NavigationMenuPrimitive.Content ref={ref} className={cn("voga-nav__panel", className)} {...props} />;
});

export const NavMenuLink = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Link>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Link>
>(function NavMenuLink({ className, ...props }, ref) {
  return <NavigationMenuPrimitive.Link ref={ref} className={cn("voga-nav__trigger", className)} {...props} />;
});

/** Cartão de link dentro do painel: título em cima, uma linha explicando. */
export const NavMenuCard = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & { title: string; desc?: string }
>(function NavMenuCard({ className, title, desc, ...props }, ref) {
  return (
    <NavigationMenuPrimitive.Link asChild>
      <a ref={ref} className={cn("voga-nav__card", className)} {...props}>
        <strong>{title}</strong>
        {desc ? <span>{desc}</span> : null}
      </a>
    </NavigationMenuPrimitive.Link>
  );
});
