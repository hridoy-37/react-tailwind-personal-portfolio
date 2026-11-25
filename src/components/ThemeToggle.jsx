import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/theme-context";

/** Icon button that flips between dark and light. The tooltip is the equivalent vim command. */
export const ThemeToggle = ({ className = "" }) => {
  const { theme, toggleTheme } = useTheme();
  const next = theme === "dark" ? "light" : "dark";
  const Icon = theme === "dark" ? Sun : Moon;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${next} theme`}
      title={`:set background=${next}`}
      className={`grid place-items-center w-8 h-8 rounded-md border border-border bg-surface/70 text-muted-foreground hover:text-primary hover:border-primary/60 transition-colors ${className}`}
    >
      <Icon className="w-4 h-4" aria-hidden="true" />
    </button>
  );
};
