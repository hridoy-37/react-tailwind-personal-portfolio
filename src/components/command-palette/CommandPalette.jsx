import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { useUI } from "@/context/ui-context";
import { useEventListener } from "@/hooks/useEventListener";
import { searchItems } from "@/utils/search";
import { usePaletteCommands } from "./usePaletteCommands";

const TOAST_MS = 1800;

/** Registers the global ⌘K / Ctrl+K shortcut and renders the palette while open. */
export const CommandPalette = () => {
  const { paletteOpen, setPaletteOpen } = useUI();

  useEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      setPaletteOpen((open) => !open);
    }
  });

  // Mounted only while open, so its query/cursor state resets on every open.
  return paletteOpen ? <PaletteDialog onClose={() => setPaletteOpen(false)} /> : null;
};

const PaletteDialog = ({ onClose }) => {
  const commands = usePaletteCommands();
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const [toast, setToast] = useState("");
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const results = useMemo(
    () => searchItems(commands, query, (c) => `${c.label} ${c.hint ?? ""} ${c.group}`),
    [commands, query]
  );

  useEffect(() => inputRef.current?.focus(), []);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(""), TOAST_MS);
    return () => clearTimeout(id);
  }, [toast]);

  useEffect(() => {
    listRef.current?.querySelector(`[data-idx="${cursor}"]`)?.scrollIntoView({ block: "nearest" });
  }, [cursor]);

  const run = (cmd) => {
    if (!cmd) return;
    cmd.run({ notify: setToast });
    if (!cmd.keepOpen) onClose();
  };

  const move = (delta) => setCursor((c) => (c + delta + results.length) % Math.max(results.length, 1));

  const onKeyDown = (e) => {
    const actions = {
      Escape: onClose,
      ArrowDown: () => move(1),
      ArrowUp: () => move(-1),
      Enter: () => run(results[cursor]),
    };
    if (actions[e.key]) {
      e.preventDefault();
      actions[e.key]();
    }
  };

  return (
    <div
      className="fixed inset-0 z-250 flex items-start justify-center px-4 pt-[12vh] bg-background/70 backdrop-blur-sm"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div className="window w-full max-w-xl glow-box">
        <div className="flex items-center gap-3 px-4 border-b border-border">
          <Search className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setCursor(0);
            }}
            onKeyDown={onKeyDown}
            placeholder="Type a command or search…"
            className="w-full h-12 bg-transparent outline-none text-sm placeholder:text-comment"
            aria-label="Search commands"
            aria-controls="palette-list"
            aria-activedescendant={results[cursor] ? `cmd-${results[cursor].id}` : undefined}
          />
          <span className="kbd">esc</span>
        </div>

        <ul id="palette-list" ref={listRef} role="listbox" className="max-h-[50vh] overflow-y-auto py-2">
          {results.length === 0 && (
            <li className="px-4 py-6 text-center text-sm text-comment">command not found: {query}</li>
          )}
          {results.map((cmd, idx) => (
            <PaletteItem
              key={cmd.id}
              cmd={cmd}
              idx={idx}
              active={idx === cursor}
              showGroup={idx === 0 || results[idx - 1].group !== cmd.group}
              onHover={() => setCursor(idx)}
              onRun={() => run(cmd)}
            />
          ))}
        </ul>

        <div className="flex items-center justify-between gap-4 px-4 h-9 border-t border-border text-[0.68rem] text-comment">
          <span className="flex items-center gap-1.5">
            <span className="kbd">↑</span>
            <span className="kbd">↓</span> navigate
            <span className="kbd ml-2">↵</span> run
          </span>
          <span className="text-primary" aria-live="polite">
            {toast}
          </span>
        </div>
      </div>
    </div>
  );
};

const PaletteItem = ({ cmd, idx, active, showGroup, onHover, onRun }) => {
  const Icon = cmd.icon;
  return (
    <li role="presentation">
      {showGroup && (
        <div className="px-4 pt-2 pb-1 text-[0.65rem] uppercase tracking-[0.2em] text-comment">{cmd.group}</div>
      )}
      <button
        id={`cmd-${cmd.id}`}
        data-idx={idx}
        role="option"
        aria-selected={active}
        onMouseMove={onHover}
        onClick={onRun}
        className={`w-full flex items-center gap-3 px-4 py-2 text-left text-sm transition-colors ${
          active ? "bg-primary/10 text-primary" : "text-foreground/85"
        }`}
      >
        <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
        <span className="flex-1 truncate">{cmd.label}</span>
        {cmd.hint && <span className="text-xs text-comment">{cmd.hint}</span>}
        {active && <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />}
      </button>
    </li>
  );
};
