"use client";

import * as React from "react";

export type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "voga-theme";

function apply(theme: Theme) {
  const root = document.documentElement;
  if (theme === "system") root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", theme);
}

/**
 * Lê/grava o tema em [data-theme] no <html> + localStorage.
 * "system" remove o atributo e deixa o prefers-color-scheme decidir.
 */
export function useTheme() {
  const [theme, setThemeState] = React.useState<Theme>("system");

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
      if (saved === "light" || saved === "dark" || saved === "system") {
        setThemeState(saved);
        apply(saved);
      }
    } catch {
      // localStorage pode lançar em janela privada — o tema do sistema serve.
    }
  }, []);

  const setTheme = React.useCallback((next: Theme) => {
    setThemeState(next);
    apply(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignorado de propósito
    }
  }, []);

  return { theme, setTheme };
}

/**
 * Script inline para o <head> — evita flash de tema errado no primeiro paint.
 * Em Next.js: <script dangerouslySetInnerHTML={{ __html: themeScript }} />
 */
export const themeScript = `(function(){try{var t=localStorage.getItem("${STORAGE_KEY}");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;
