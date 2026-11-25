import { useEffect, useRef } from "react";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { ShellPrompt } from "@/components/TerminalPrompt";
import { Window } from "@/components/Window";
import { PROFILE, SITE } from "@/data";
import { ShellInput } from "./ShellInput";
import { useShell } from "./useShell";

const QUICK_COMMANDS = ["help", "whoami", "skills", "projects", "neofetch", `sudo hire-${PROFILE.handle}`];

export const Shell = () => {
  const { lines, history, execute, clear } = useShell();
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  // Keep the newest output in view.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  // Clicking the terminal focuses the input, unless the user is selecting text.
  const focusInput = () => {
    if (window.getSelection()?.toString() === "") inputRef.current?.focus({ preventScroll: true });
  };

  return (
    <Section
      id="shell"
      command={`exec ${SITE.shellName}`}
      subtitle="prefer the keyboard? explore this portfolio from an actual (tiny) shell."
    >
      <Reveal>
        <Window title={`${SITE.shellUser}: ~ — ${SITE.shellName}`} right="80×24" className="glow-box">
          <div
            ref={scrollRef}
            onClick={focusInput}
            className="h-104 sm:h-120 overflow-y-auto p-4 sm:p-5 text-[0.78rem] sm:text-sm leading-relaxed cursor-text"
            role="log"
            aria-live="polite"
          >
            {lines.map((line) =>
              line.kind === "cmd" ? (
                <p key={line.id} className="flex flex-wrap mt-3 first:mt-0">
                  <ShellPrompt />
                  <span className="break-all">{line.content}</span>
                </p>
              ) : (
                <div key={line.id} className="mt-1 wrap-break-word">
                  {line.content}
                </div>
              )
            )}
            <ShellInput ref={inputRef} history={history} onSubmit={execute} onClear={clear} />
          </div>
        </Window>
      </Reveal>

      <Reveal className="mt-4 flex flex-wrap gap-2" delay={100}>
        <span className="text-xs text-comment self-center mr-1">quick run:</span>
        {QUICK_COMMANDS.map((cmd) => (
          <button key={cmd} type="button" onClick={() => execute(cmd)} className="chip">
            <span className="text-comment">$</span> {cmd}
          </button>
        ))}
      </Reveal>
    </Section>
  );
};
