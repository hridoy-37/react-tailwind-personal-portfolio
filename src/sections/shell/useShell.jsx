import { useRef, useState } from "react";
import { useTheme } from "@/context/theme-context";
import { useUI } from "@/context/ui-context";
import { CLEAR, findCommand } from "./commands";
import { NotFound, Welcome } from "./output";

/**
 * Shell session state: scrollback `lines` ({ id, kind: "cmd" | "out", content })
 * and command `history` (newest first).
 */
export function useShell() {
  const ui = useUI();
  const theme = useTheme();
  const [lines, setLines] = useState(() => [{ id: 0, kind: "out", content: <Welcome /> }]);
  const [history, setHistory] = useState([]);
  const nextId = useRef(1);

  const append = (...entries) => {
    const withIds = entries.map((entry) => ({ ...entry, id: nextId.current++ }));
    setLines((prev) => [...prev, ...withIds]);
  };

  const clear = () => setLines([]);

  const execute = (raw) => {
    const [name = "", ...args] = raw.trim().split(/\s+/);
    if (name) setHistory((h) => [raw, ...h]);

    const command = name ? findCommand(name) : null;
    const output = !name
      ? null
      : command
        ? command.run({ name: name.toLowerCase(), args, arg: args.join(" "), history, ui, theme })
        : <NotFound name={name} />;

    if (output === CLEAR) return clear();
    append({ kind: "cmd", content: raw }, ...(output ? [{ kind: "out", content: output }] : []));
  };

  return { lines, history, execute, clear };
}
