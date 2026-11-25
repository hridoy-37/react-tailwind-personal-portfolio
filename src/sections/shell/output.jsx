// Presentational building blocks for shell command output.
import { ExternalLink } from "@/components/ExternalLink";
import { PROFILE, SITE } from "@/data";

const BANNER = [
  " _   _  ____   ___  ____    ___  __   __",
  "| | | ||  _ \\ |_ _||  _ \\  / _ \\ \\ \\ / /",
  "| |_| || |_) | | | | | | || | | | \\ V / ",
  "|  _  ||  _ <  | | | |_| || |_| |  | |  ",
  "|_| |_||_| \\_\\|___||____/  \\___/   |_|  ",
].join("\n");

export const Welcome = () => (
  <div className="space-y-2">
    <pre
      className="text-primary glow-text text-[0.55rem] leading-[1.15] sm:text-xs sm:leading-tight overflow-x-auto"
      aria-label={PROFILE.firstName}
    >
      {BANNER}
    </pre>
    <p className="text-muted-foreground">
      Welcome to{" "}
      <span className="text-foreground">
        {SITE.shellName} v{SITE.shellVersion}
      </span>
      . Type <span className="text-primary">help</span> to see what you can do. Tab to autocomplete, ↑/↓ for history.
    </p>
  </div>
);

export const ShellLink = ({ href, children }) => (
  <ExternalLink href={href} className="text-cyan underline decoration-dotted underline-offset-4 hover:text-primary">
    {children}
  </ExternalLink>
);

/** Aligned `label  value` rows. `rows` is an array of [label, node]. */
export const Rows = ({ rows, labelClass = "w-24" }) => (
  <div className="space-y-0.5">
    {rows.map(([label, value]) => (
      <p key={label}>
        <span className={`text-cyan inline-block ${labelClass}`}>{label}</span>
        {value}
      </p>
    ))}
  </div>
);

export const Ok = ({ children }) => <p className="text-primary">{children}</p>;
export const Muted = ({ children }) => <p className="text-muted-foreground">{children}</p>;
export const Hint = ({ children }) => <p className="text-comment">{children}</p>;
export const Err = ({ children }) => <p className="text-red">{children}</p>;

export const NotFound = ({ name }) => (
  <Err>
    {SITE.shellName}: command not found: {name}. <span className="text-comment">type `help`.</span>
  </Err>
);
