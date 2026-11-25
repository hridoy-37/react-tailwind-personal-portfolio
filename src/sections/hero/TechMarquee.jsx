import { ALL_SKILLS } from "@/data";

/** Infinite horizontal ticker of `import <Tech>;` lines. The list is doubled for a seamless loop. */
export const TechMarquee = () => (
  <div className="relative z-10 border-y border-border bg-card/40 py-3 overflow-hidden" aria-label="Technologies">
    <div className="absolute inset-y-0 left-0 w-24 bg-linear-to-r from-background to-transparent z-10" />
    <div className="absolute inset-y-0 right-0 w-24 bg-linear-to-l from-background to-transparent z-10" />
    <ul className="flex w-max animate-marquee">
      {[...ALL_SKILLS, ...ALL_SKILLS].map((tech, i) => (
        <li
          key={i}
          className="px-5 text-sm text-muted-foreground/70 whitespace-nowrap"
          aria-hidden={i >= ALL_SKILLS.length}
        >
          <span className="text-purple">import</span> <span className="text-foreground/80">{tech}</span>
          <span className="text-comment">;</span>
        </li>
      ))}
    </ul>
  </div>
);
