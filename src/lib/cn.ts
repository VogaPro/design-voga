import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Junta classes e resolve conflitos do Tailwind — a última ganha.
 * Use em todo componente para que `className` do consumidor sobrescreva o default.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
