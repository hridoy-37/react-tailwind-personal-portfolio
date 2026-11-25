import { CodeBlock } from "@/components/CodeBlock";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { Window } from "@/components/Window";
import { SKILL_COUNT, SKILLS } from "@/data";

// Tiny syntax-highlighting helpers so the listing below reads like the code it imitates.
const Kw = ({ children }) => <span className="text-purple">{children}</span>;
const Id = ({ children }) => <span className="text-blue">{children}</span>;
const Type = ({ children }) => <span className="text-amber">{children}</span>;
const Punct = ({ children }) => <span className="text-foreground/70">{children}</span>;
const Comment = ({ children, className = "" }) => <span className={`text-comment ${className}`}>// {children}</span>;
const Str = ({ children }) => (
  <span className="text-primary hover:bg-primary/15 rounded px-0.5 transition-colors cursor-default">
    &quot;{children}&quot;
  </span>
);

const SkillLine = ({ group }) => (
  <span className="pl-4 sm:pl-6 inline-block">
    {group.key}
    <span className="text-cyan">: </span>
    <Punct>[</Punct>
    {group.items.map((item, i) => (
      <span key={item}>
        <Str>{item}</Str>
        {i < group.items.length - 1 && <Punct>, </Punct>}
      </span>
    ))}
    <Punct>],</Punct> <Comment className="hidden sm:inline">{group.comment}</Comment>
  </span>
);

const LINES = [
  <Comment>stack.ts: things I&apos;ve shipped to production with</Comment>,
  <>
    <Kw>export const</Kw> <Id>stack</Id> <span className="text-cyan">=</span> {"{"}
  </>,
  ...SKILLS.map((group) => <SkillLine group={group} />),
  <>
    {"}"} <Kw>as const</Kw>;
  </>,
  null,
  <>
    <Kw>export type</Kw> <Type>Skill</Type> <span className="text-cyan">=</span> <Kw>typeof</Kw> <Id>stack</Id>[
    <Kw>keyof typeof</Kw> <Id>stack</Id>][<Type>number</Type>];
  </>,
];

export const Stack = () => (
  <Section id="stack" command="bat stack.ts" subtitle="the toolbox, typed and grouped by layer.">
    <Reveal>
      <Window title="src/config/stack.ts" right="ts">
        <CodeBlock lines={LINES} className="leading-7!" />
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 px-4 py-2.5 border-t border-border text-xs">
          <span className="text-comment">$ tsc --noEmit</span>
          <span className="text-primary">✓ 0 errors</span>
          <span className="text-comment">
            · {SKILL_COUNT} skills across {SKILLS.length} layers
          </span>
        </div>
      </Window>
    </Reveal>
  </Section>
);
