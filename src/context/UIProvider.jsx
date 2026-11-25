import { useCallback, useEffect, useMemo, useState } from "react";
import { PROFILE } from "@/data";
import { UIContext } from "./ui-context";

const CRT_KEY = `${PROFILE.handle}:crt`;

export const UIProvider = ({ children }) => {
  const [crt, setCrt] = useState(() => {
    try {
      return localStorage.getItem(CRT_KEY) === "1";
    } catch {
      return false;
    }
  });
  const [matrix, setMatrix] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("crt", crt);
    try {
      localStorage.setItem(CRT_KEY, crt ? "1" : "0");
    } catch {
      /* storage unavailable */
    }
  }, [crt]);

  const toggleCrt = useCallback(() => setCrt((v) => !v), []);

  const value = useMemo(
    () => ({ crt, toggleCrt, matrix, setMatrix, paletteOpen, setPaletteOpen }),
    [crt, toggleCrt, matrix, paletteOpen]
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};
