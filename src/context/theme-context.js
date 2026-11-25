import { createContext, useContext } from "react";

export const ThemeContext = createContext(null);

/**
 * { theme: "dark" | "light",                 // what's on screen
 *   preference: "system" | "dark" | "light", // what the visitor chose
 *   setPreference, toggleTheme }
 */
export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
};
