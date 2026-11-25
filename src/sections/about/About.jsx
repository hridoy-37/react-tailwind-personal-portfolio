import { CodeBlock } from "@/components/CodeBlock";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { Window } from "@/components/Window";
import { PROFILE, STATS } from "@/data";
import { MetaPanel } from "./MetaPanel";

const PHILOSOPHY =
  "I build systems that scale with the business, let teams move with confidence, and turn product vision into reliable software.";

/** about.md rendered as raw markdown, with each element type in its own syntax colour. */
const MARKDOWN_LINES = [
  <span className="text-primary font-bold"># About me</span>,
  null,
  ...PROFILE.summary.flatMap((paragraph) => [<span className="text-foreground/85">{paragraph}</span>, null]),
  <span className="text-cyan font-bold">## Philosophy</span>,
  null,
  <span className="text-amber italic">&gt; {PHILOSOPHY}</span>,
];

export const About = () => (
  <Section id="about" command="cat about.md" subtitle="who I am, what I do, and how I like to work.">
    <div className="grid lg:grid-cols-[1.35fr_1fr] gap-6 lg:gap-8 lg:items-stretch">
      <Reveal className="min-w-0">
        <Window title="about.md" right="md" className="h-full">
          <CodeBlock lines={MARKDOWN_LINES} cursor />
        </Window>
      </Reveal>

      <div className="flex flex-col gap-6 min-w-0">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 80} className="window p-4 sm:p-5 hover:border-primary/50 transition-colors">
              <div className="text-2xl sm:text-3xl font-extrabold text-primary glow-text">{stat.value}</div>
              <div className="mt-1.5 text-[0.72rem] sm:text-xs leading-snug text-muted-foreground">{stat.label}</div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="flex-1 flex flex-col">
          <MetaPanel />
        </Reveal>
      </div>
    </div>
  </Section>
);
