"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { THEME_KEY } from "@/lib/books";

const ThemeContext = createContext({ theme: "dark", toggle: () => {} });
export const useTheme = () => useContext(ThemeContext);

export default function ThemeProvider({ children }) {
  // null until we've read the saved value, so we never overwrite the
  // attribute the inline script already set.
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    let t = "dark";
    try {
      t = localStorage.getItem(THEME_KEY) === "light" ? "light" : "dark";
    } catch {}
    setTheme(t);
  }, []);

  useEffect(() => {
    if (!theme) return;
    const el = document.documentElement;
    if (theme === "light") el.setAttribute("data-theme", "light");
    else el.removeAttribute("data-theme");
  }, [theme]);

  const toggle = useCallback(() => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {}
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme: theme || "dark", toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
