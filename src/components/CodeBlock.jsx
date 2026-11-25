/**
 * Editor-style listing with a line-number gutter.
 * `lines` is an array of React nodes; use null/"" for an empty line.
 */
export const CodeBlock = ({ lines, cursor = false, className = "" }) => (
  <ol className={`py-4 text-[0.78rem] sm:text-sm leading-relaxed ${className}`}>
    {lines.map((line, i) => (
      <CodeLine key={i} n={i + 1}>
        {line || " "}
      </CodeLine>
    ))}
    {cursor && (
      <CodeLine n={lines.length + 1}>
        <span className="text-primary animate-blink">▍</span>
      </CodeLine>
    )}
  </ol>
);

const CodeLine = ({ n, children }) => (
  <li className="grid grid-cols-[2.75rem_1fr] pr-4 hover:bg-surface/60">
    <span className="text-right pr-4 text-comment/70 select-none tabular-nums">{n}</span>
    <span className="min-w-0">{children}</span>
  </li>
);
