"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type Theme = "light" | "dark";

interface ThemeCtx {
  theme: Theme;
  toggle: () => void;
}

const Ctx = createContext<ThemeCtx>({ theme: "light", toggle: () => {} });

export function useTheme() {
  return useContext(Ctx);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    // Hydrate from what the blocking inline script already set
    const current = document.documentElement.dataset.theme as Theme;
    if (current === "dark" || current === "light") {
      setTheme(current);
    }

    // Listen for OS changes (only when no manual override)
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("tivor-theme")) {
        apply(e.matches ? "dark" : "light", false);
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  function apply(next: Theme, persist = true) {
    document.documentElement.dataset.theme = next;
    setTheme(next);
    if (persist) {
      localStorage.setItem("tivor-theme", next);
    } else {
      localStorage.removeItem("tivor-theme");
    }
  }

  function toggle() {
    apply(theme === "dark" ? "light" : "dark");
  }

  return <Ctx.Provider value={{ theme, toggle }}>{children}</Ctx.Provider>;
}
