import { useMemo } from "react";
import { Copy, Download, ExternalLink, Hash, Laptop, Monitor, Moon, Sparkles, Sun, TerminalSquare } from "lucide-react";
import { useTheme } from "@/context/theme-context";
import { useUI } from "@/context/ui-context";
import { PROFILE, SECTIONS, SOCIALS } from "@/data";
import { copyEmail, downloadCv, focusShell } from "@/utils/actions";
import { openExternal, scrollToSection } from "@/utils/dom";

/**
 * Palette entries, in display order. Each entry:
 *   { id, group, label, hint?, icon, run(ctx), keepOpen? }
 * `run` receives `{ notify }` for showing a short status message.
 */
export function usePaletteCommands() {
  const { crt, toggleCrt, setMatrix } = useUI();
  const { theme, preference, setPreference, toggleTheme } = useTheme();

  return useMemo(
    () => [
      ...SECTIONS.map((s) => ({
        id: `go-${s.id}`,
        group: "navigate",
        label: `Go to ${s.file}`,
        icon: Hash,
        run: () => scrollToSection(s.id),
      })),
      { id: "cv", group: "actions", label: "Download CV (PDF)", icon: Download, run: downloadCv },
      {
        id: "email",
        group: "actions",
        label: `Copy email: ${PROFILE.email}`,
        icon: Copy,
        keepOpen: true,
        run: async ({ notify }) => (await copyEmail()) && notify("email copied to clipboard ✓"),
      },
      { id: "shell", group: "actions", label: "Open interactive shell", icon: TerminalSquare, run: focusShell },
      ...SOCIALS.map((s) => ({
        id: `social-${s.id}`,
        group: "links",
        label: `Open ${s.label}`,
        hint: s.handle,
        icon: ExternalLink,
        run: () => openExternal(s.href),
      })),
      {
        id: "theme-toggle",
        group: "appearance",
        label: `Switch to ${theme === "dark" ? "light" : "dark"} theme`,
        hint: `:set background=${theme === "dark" ? "light" : "dark"}`,
        icon: theme === "dark" ? Sun : Moon,
        run: toggleTheme,
      },
      {
        id: "theme-system",
        group: "appearance",
        label: "Match system theme",
        hint: preference === "system" ? "active" : undefined,
        icon: Laptop,
        run: () => setPreference("system"),
      },
      { id: "crt", group: "fun", label: `${crt ? "Disable" : "Enable"} CRT scanlines`, icon: Monitor, run: toggleCrt },
      { id: "matrix", group: "fun", label: "Enter the Matrix", icon: Sparkles, run: () => setMatrix(true) },
    ],
    [crt, toggleCrt, setMatrix, theme, preference, setPreference, toggleTheme]
  );
}
