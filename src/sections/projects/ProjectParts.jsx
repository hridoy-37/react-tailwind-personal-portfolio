// Building blocks shared by the featured and grid project cards.
import { ArrowUpRight, Github } from "lucide-react";
import { ExternalLink } from "@/components/ExternalLink";
import { prettyUrl, toHashtag } from "@/utils/format";

export const ProjectTitle = ({ project, className = "" }) => (
  <h3 className={`font-bold ${className}`}>
    <ExternalLink href={project.link} className="hover:text-primary transition-colors">
      {project.title}
    </ExternalLink>
  </h3>
);

/**
 * Decorative screenshot linking to the live site, shown crisp (no fade).
 * On hover: CRT scanlines plus a `$ open <domain>` prompt, like previewing it from a terminal.
 */
export const ProjectScreenshot = ({ project, className = "" }) => (
  <ExternalLink
    href={project.link}
    className={`relative block overflow-hidden bg-surface group/shot ${className}`}
    tabIndex={-1}
    aria-hidden="true"
  >
    <img
      src={project.image}
      alt=""
      loading="lazy"
      className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover/shot:scale-[1.03]"
    />
    <div className="absolute inset-0 opacity-0 group-hover/shot:opacity-100 transition-opacity duration-300 bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_2px,rgb(0_0_0/0.16)_3px)]" />
    <span className="absolute left-3 bottom-3 max-w-[calc(100%-1.5rem)] truncate px-2.5 py-1 rounded border border-border bg-card/90 backdrop-blur text-[0.7rem] text-foreground opacity-0 translate-y-1 group-hover/shot:opacity-100 group-hover/shot:translate-y-0 transition-all duration-300">
      <span className="text-primary">$</span> open {prettyUrl(project.link)} <span className="text-primary">↗</span>
    </span>
  </ExternalLink>
);

export const ProjectHighlights = ({ items = [] }) => (
  <ul className="space-y-1.5 text-[0.8rem]">
    {items.map((item) => (
      <li key={item} className="flex gap-2.5 text-foreground/80 leading-relaxed">
        <span className="text-primary shrink-0">▸</span>
        {item}
      </li>
    ))}
  </ul>
);

export const ProjectTags = ({ tags }) => (
  <ul className="flex flex-wrap gap-1.5">
    {tags.map((tag) => (
      <li key={tag} className="chip">
        <span className="text-comment">#</span>
        {toHashtag(tag)}
      </li>
    ))}
  </ul>
);

/** "open live" always; "source" only when the project has a public repo. */
export const ProjectLinks = ({ project }) => (
  <div className="flex flex-wrap gap-2">
    <ExternalLink
      href={project.link}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-primary/40 text-primary text-xs hover:bg-primary hover:text-primary-foreground transition-colors"
    >
      open live <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
    </ExternalLink>
    {project.github && (
      <ExternalLink
        href={project.github}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-border text-muted-foreground text-xs hover:text-foreground hover:border-foreground/40 transition-colors"
      >
        <Github className="w-3.5 h-3.5" aria-hidden="true" /> source
      </ExternalLink>
    )}
  </div>
);
