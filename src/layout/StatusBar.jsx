import { GitBranch } from "lucide-react";
import { getSection, HOME_ID, SITE } from "@/data";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useClock } from "@/hooks/useClock";
import { useScrollProgress } from "@/hooks/useScrollProgress";

/** vim's ruler: Top / NN% / Bot */
const toRuler = (pct) => (pct === 0 ? "Top" : pct >= 99 ? "Bot" : `${pct}%`);

/** vim / VS Code-like status line pinned to the bottom (desktop only, decorative). */
export const StatusBar = () => {
  const active = useActiveSection();
  const pct = useScrollProgress();
  const now = useClock();
  const file = active === HOME_ID ? "README.md" : getSection(active)?.file;

  return (
    <div
      className="hidden md:flex fixed inset-x-0 bottom-0 z-90 h-6 items-stretch text-[0.68rem] border-t border-border bg-card/95 backdrop-blur"
      aria-hidden="true"
    >
      <Cell className="font-bold bg-primary text-primary-foreground">NORMAL</Cell>
      <Cell className="gap-1.5 border-r border-border text-muted-foreground">
        <GitBranch className="w-3 h-3" /> {SITE.branch}
      </Cell>
      <Cell className="text-foreground/80">{file}</Cell>
      <Cell className="ml-auto text-comment">utf-8</Cell>
      <Cell className="text-comment border-l border-border">jsx</Cell>
      <Cell className="text-muted-foreground border-l border-border">
        {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </Cell>
      <Cell className="bg-surface text-primary border-l border-border min-w-14 justify-center">{toRuler(pct)}</Cell>
    </div>
  );
};

const Cell = ({ className = "", children }) => <span className={`flex items-center px-3 ${className}`}>{children}</span>;
