import { useState } from "react";
import { ShellPrompt } from "@/components/TerminalPrompt";
import { SITE } from "@/data";
import { completeInput } from "./commands";

/**
 * Prompt + input line. Handles ↑/↓ history recall, Tab completion and Ctrl+L.
 * `history` is newest-first.
 */
export const ShellInput = ({ ref, history, onSubmit, onClear }) => {
  const [value, setValue] = useState("");
  const [historyIdx, setHistoryIdx] = useState(-1);

  const recall = (idx) => {
    setHistoryIdx(idx);
    setValue(idx < 0 ? "" : history[idx]);
  };

  const keyHandlers = {
    ArrowUp: () => historyIdx + 1 < history.length && recall(historyIdx + 1),
    ArrowDown: () => recall(Math.max(historyIdx - 1, -1)),
    Tab: () => {
      const completed = completeInput(value);
      if (completed) setValue(completed);
    },
  };

  const onKeyDown = (e) => {
    if (e.ctrlKey && e.key === "l") {
      e.preventDefault();
      onClear();
    } else if (keyHandlers[e.key]) {
      e.preventDefault();
      keyHandlers[e.key]();
    }
  };

  const submit = (e) => {
    e.preventDefault();
    onSubmit(value);
    setValue("");
    setHistoryIdx(-1);
  };

  return (
    <form onSubmit={submit} className="flex mt-3">
      <ShellPrompt />
      <input
        id={SITE.shellInputId}
        ref={ref}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck={false}
        aria-label="Shell input. Type help for commands."
        className="flex-1 min-w-0 bg-transparent outline-none caret-primary"
      />
    </form>
  );
};
