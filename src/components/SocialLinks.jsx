import { Facebook, Github, Linkedin, Twitter } from "lucide-react";
import { SOCIALS } from "@/data";
import { ExternalLink } from "./ExternalLink";

const ICONS = { github: Github, linkedin: Linkedin, x: Twitter, facebook: Facebook };

/** Row of square icon buttons for every entry in SOCIALS. */
export const SocialLinks = ({ className = "" }) => (
  <ul className={`flex flex-wrap items-center gap-2 ${className}`}>
    {SOCIALS.map(({ id, label, href }) => {
      const Icon = ICONS[id];
      return (
        <li key={id}>
          <ExternalLink
            href={href}
            aria-label={label}
            className="flex p-2.5 rounded-md border border-border bg-surface/70 text-muted-foreground hover:text-primary hover:border-primary/60 transition-colors"
          >
            {Icon && <Icon className="w-4 h-4" aria-hidden="true" />}
          </ExternalLink>
        </li>
      );
    })}
  </ul>
);
