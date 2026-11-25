import { SITE } from "@/data";

/** `~/hridoy $ <command>` */
export const HomePrompt = ({ command, className = "" }) => (
  <p className={`text-sm text-comment ${className}`}>
    <span className="text-primary">{SITE.homePrompt}</span>
    <span className="text-muted-foreground"> $ </span>
    {command && <span className="text-foreground/90">{command}</span>}
  </p>
);

/** `hridoy@dev:~$ ` used inside the interactive shell. */
export const ShellPrompt = () => (
  <span className="shrink-0 select-none">
    <span className="text-primary">{SITE.shellUser}</span>
    <span className="text-foreground">:</span>
    <span className="text-blue">~</span>
    <span className="text-foreground">$&nbsp;</span>
  </span>
);
