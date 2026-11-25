import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { applyTheme, readPreference, resolveTheme, storePreference, SYSTEM_LIGHT_QUERY } from "@/theme/theme";
import { ThemeContext } from "./theme-context";

/** Follows the OS theme until the visitor picks one; the choice is remembered. */
export const ThemeProvider = ({ children }) => {
  const [preference, setPreference] = useState(readPreference);
  const systemIsLight = useMediaQuery(SYSTEM_LIGHT_QUERY);
  const theme = resolveTheme(preference, systemIsLight);

  // Layout effect: apply before paint so a theme change never shows a mixed frame.
  useLayoutEffect(() => applyTheme(theme), [theme]);
  useEffect(() => storePreference(preference), [preference]);

  const toggleTheme = useCallback(() => setPreference(theme === "dark" ? "light" : "dark"), [theme]);

  const value = useMemo(
    () => ({ theme, preference, setPreference, toggleTheme }),
    [theme, preference, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
