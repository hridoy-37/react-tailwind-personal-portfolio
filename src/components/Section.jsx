import { getSection } from "@/data";
import { Reveal } from "./Reveal";
import { HomePrompt } from "./TerminalPrompt";

/**
 * Page section with the standard terminal-style heading:
 *
 *   ~/hridoy $ <command>
 *   0x0N. <title> ─────────────
 *   // <subtitle>
 *
 * The 0x0N number and default title come from `data/navigation.js`.
 * `backdrop` renders behind the container (e.g. full-width glows).
 */
export const Section = ({ id, title, command, subtitle, backdrop, className = "", children }) => {
  const meta = getSection(id);
  return (
    <section id={id} className={`py-24 md:py-28 relative ${className}`}>
      {backdrop}
      <div className="container mx-auto px-4 sm:px-6 relative">
        <Reveal className="mb-12 md:mb-14">
          <HomePrompt command={command} className="mb-3" />
          <div className="flex items-center gap-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight whitespace-nowrap">
              <span className="text-primary font-medium">0x{String(meta?.index ?? 0).padStart(2, "0")}.</span>{" "}
              {title ?? meta?.file}
            </h2>
            <span className="h-px flex-1 bg-linear-to-r from-border to-transparent" />
          </div>
          {subtitle && (
            <p className="mt-4 max-w-2xl text-sm md:text-base leading-relaxed text-comment">
              <span className="select-none">// </span>
              {subtitle}
            </p>
          )}
        </Reveal>
        {children}
      </div>
    </section>
  );
};
