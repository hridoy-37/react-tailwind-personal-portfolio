/* eslint-disable react-refresh/only-export-components --
   This is a data registry, not a component module; editing it triggers a full reload instead of HMR. */
/**
 * Command registry for the interactive shell.
 *
 * To add a command, append an object to COMMANDS:
 *   {
 *     name: "foo",                 // what the user types
 *     aliases: ["bar"],            // optional alternate names
 *     usage: "foo <thing>",        // optional, shown in `help` instead of `name`
 *     description: "does foo",     // shown in `help`
 *     hidden: true,                // optional, omit from `help` and Tab completion
 *     complete: () => ["a", "b"],  // optional, Tab-completion candidates for the argument
 *     run: (ctx) => <p>output</p>, // return JSX, null for no output, or CLEAR
 *   }
 *
 * `ctx` is { name, args, arg, history, ui: { crt, toggleCrt, setMatrix },
 *           theme: { theme, preference, setPreference, toggleTheme } }.
 */
import { EXPERIENCES, NEOFETCH, PROFILE, PROJECTS, SECTIONS, SITE, SKILLS, SOCIALS } from "@/data";
import { PREFERENCES } from "@/theme/theme";
import { downloadCv } from "@/utils/actions";
import { openExternal, scrollToSection } from "@/utils/dom";
import { FILE_COLOR, fileKind } from "@/utils/files";
import { prettyUrl } from "@/utils/format";
import { Err, Hint, Muted, Ok, Rows, ShellLink } from "./output";

/** Sentinel returned by `clear` so the shell wipes its scrollback instead of printing. */
export const CLEAR = Symbol("clear");

const findProject = (query) => {
  const q = query.toLowerCase();
  return PROJECTS.find((p) => p.slug === q || p.title.toLowerCase() === q);
};

/** "~/projects/" or "about.md" -> section id, or null */
const resolveSection = (path) => {
  const id = path.replace(/^~?\/?/, "").replace(/\/$/, "").replace(/\.\w+$/, "").toLowerCase();
  return SECTIONS.find((s) => s.id === id) ?? null;
};


const sudo = {
  name: "sudo",
  hidden: true,
  run: ({ arg }) => {
    if (/hire/i.test(arg)) {
      setTimeout(() => scrollToSection("contact"), 900);
      return (
        <Ok>
          [sudo] password for recruiter: ******** <br />✓ permission granted. redirecting to ./contact.sh…
        </Ok>
      );
    }
    return (
      <Err>
        guest is not in the sudoers file. This incident will be reported.{" "}
        <span className="text-comment">(hint: sudo hire-{PROFILE.handle})</span>
      </Err>
    );
  },
};

const COMMANDS = [
  {
    name: "help",
    description: "list available commands",
    run: () => (
      <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-0.5">
        {VISIBLE_COMMANDS.map((c) => (
          <div key={c.name} className="contents">
            <span className="text-primary">{c.usage ?? c.name}</span>
            <span className="text-muted-foreground">{c.description}</span>
          </div>
        ))}
        <span className="col-span-2 mt-2 text-comment">psst… there are a few hidden commands too.</span>
      </div>
    ),
  },
  {
    name: "whoami",
    description: "who is this guy?",
    run: () => (
      <p>
        <span className="font-bold">{PROFILE.name}</span>
        <span className="text-muted-foreground">
          , {PROFILE.role} based in {PROFILE.location}.
        </span>
      </p>
    ),
  },
  {
    name: "about",
    description: "short bio",
    run: () => (
      <div className="space-y-2 text-foreground/85">
        {PROFILE.summary.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    ),
  },
  {
    name: "skills",
    aliases: ["stack"],
    description: "the tech stack",
    run: () => (
      <Rows labelClass="w-32" rows={SKILLS.map((g) => [g.key, <span className="text-foreground/85">{g.items.join(", ")}</span>])} />
    ),
  },
  {
    name: "experience",
    aliases: ["work"],
    description: "work history",
    run: () => (
      <div className="space-y-2">
        {EXPERIENCES.map((e) => (
          <p key={e.hash}>
            <span className="text-amber">{e.hash}</span> <span className="font-bold">{e.role}</span>{" "}
            <span className="text-primary">@ {e.company}</span> <span className="text-comment">({e.period})</span>
          </p>
        ))}
        <Hint>run `cd experience` for the full git log.</Hint>
      </div>
    ),
  },
  {
    name: "projects",
    description: "things I've built",
    run: () => (
      <div className="space-y-0.5">
        {PROJECTS.map((p) => (
          <p key={p.slug}>
            <span className="text-amber inline-block w-5">{p.featured ? "★" : "·"}</span>
            <span className="text-primary inline-block w-44 sm:w-52">{p.slug}</span>
            <ShellLink href={p.link}>{prettyUrl(p.link)}</ShellLink>
          </p>
        ))}
        <Hint>try `open {PROJECTS[0].slug}`</Hint>
      </div>
    ),
  },
  {
    name: "open",
    usage: "open <project>",
    description: "open a project in a new tab",
    complete: () => PROJECTS.map((p) => p.slug),
    run: ({ arg }) => {
      const project = findProject(arg);
      if (!project) return <Err>open: no such project: {arg || "(none)"}. run `projects` to list them.</Err>;
      openExternal(project.link);
      return <Muted>opening {project.title} in a new tab…</Muted>;
    },
  },
  {
    name: "contact",
    description: "how to reach me",
    run: () => (
      <Rows
        rows={[
          ["email", <ShellLink href={`mailto:${PROFILE.email}`}>{PROFILE.email}</ShellLink>],
          ["phone", <ShellLink href={PROFILE.phoneHref}>{PROFILE.phone}</ShellLink>],
          ["location", PROFILE.location],
        ]}
      />
    ),
  },
  {
    name: "social",
    description: "where to find me online",
    run: () => <Rows labelClass="w-28" rows={SOCIALS.map((s) => [s.label, <ShellLink href={s.href}>{s.handle}</ShellLink>])} />,
  },
  {
    name: "cv",
    aliases: ["resume"],
    description: "download my CV (PDF)",
    run: () => {
      downloadCv();
      return <Ok>↓ downloading {PROFILE.cvDownloadName}… done.</Ok>;
    },
  },
  {
    name: "neofetch",
    description: "system info, nerd edition",
    run: () => (
      <div>
        <p className="text-primary font-bold">{SITE.shellUser}</p>
        <Hint>--------------</Hint>
        <Rows labelClass="w-20" rows={[...NEOFETCH, ["shell", `${SITE.shellName} ${SITE.shellVersion}`]]} />
      </div>
    ),
  },
  {
    name: "ls",
    description: "list sections",
    run: () => (
      <p className="flex flex-wrap gap-x-6">
        {SECTIONS.map((s) => (
          <span key={s.id} className={FILE_COLOR[fileKind(s.file)]}>
            {s.id}
          </span>
        ))}
      </p>
    ),
  },
  {
    name: "cd",
    aliases: ["cat"],
    usage: "cd <section>",
    description: "jump to a section",
    complete: () => SECTIONS.map((s) => s.id),
    run: ({ name, arg }) => {
      if (!arg || arg === "~" || arg === "home") {
        scrollToSection("home");
        return null;
      }
      const section = resolveSection(arg);
      if (!section) return <Err>{name}: no such file or directory: {arg}</Err>;
      scrollToSection(section.id);
      return <Muted>→ {section.file}</Muted>;
    },
  },
  {
    name: "history",
    description: "previous commands",
    run: ({ history }) =>
      history.length === 0 ? (
        <Hint>(empty)</Hint>
      ) : (
        <div>
          {[...history].reverse().map((entry, i) => (
            <p key={i}>
              <span className="text-comment inline-block w-8 text-right mr-3">{i + 1}</span>
              {entry}
            </p>
          ))}
        </div>
      ),
  },
  {
    name: "theme",
    usage: "theme [dark|light|system]",
    description: "show or change the colour theme",
    complete: () => PREFERENCES,
    run: ({ arg, theme: { theme, preference, setPreference } }) => {
      const choice = arg.toLowerCase();
      if (!choice) {
        return (
          <Muted>
            theme: {theme}
            {preference === "system" && " (following system)"}. usage: theme [{PREFERENCES.join("|")}]
          </Muted>
        );
      }
      if (!PREFERENCES.includes(choice)) return <Err>theme: unknown theme &apos;{arg}&apos;. try {PREFERENCES.join(", ")}.</Err>;
      setPreference(choice);
      return <Ok>✓ theme set to {choice}.</Ok>;
    },
  },
  { name: "clear", description: "clear the screen (or Ctrl+L)", run: () => CLEAR },

  // ---- hidden easter eggs -------------------------------------------------
  sudo,
  { name: "hire", hidden: true, run: (ctx) => sudo.run({ ...ctx, arg: `hire-${PROFILE.handle}` }) },
  { name: "echo", hidden: true, run: ({ arg }) => <p>{arg}</p> },
  { name: "date", hidden: true, run: () => <p>{new Date().toString()}</p> },
  {
    name: "matrix",
    hidden: true,
    run: ({ ui }) => {
      ui.setMatrix(true);
      return <Ok>follow the white rabbit…</Ok>;
    },
  },
  {
    name: "crt",
    hidden: true,
    run: ({ ui }) => {
      ui.toggleCrt();
      return <Muted>CRT scanlines {ui.crt ? "disabled" : "enabled"}.</Muted>;
    },
  },
  {
    name: "coffee",
    hidden: true,
    run: () => (
      <pre className="text-amber leading-tight">
        {"   ( (\n    ) )\n  ........\n  |      |]\n  \\      /\n   `----'\n"}
        <span className="text-muted-foreground">brewing… code quality +10</span>
      </pre>
    ),
  },
  {
    name: "vim",
    aliases: ["nvim", "vi"],
    hidden: true,
    run: () => (
      <Muted>
        you are now trapped in vim. good luck. <span className="text-comment">(type :q! … just kidding, you&apos;re free)</span>
      </Muted>
    ),
  },
  { name: ":q", aliases: [":q!", ":wq"], hidden: true, run: () => <Muted>nice reflexes.</Muted> },
  { name: "rm", hidden: true, run: () => <Err>rm: refusing to delete my portfolio. nice try though.</Err> },
  {
    name: "exit",
    aliases: ["logout"],
    hidden: true,
    run: () => <Muted>logout… there is no escape. scroll down to `contact.sh` instead.</Muted>,
  },
  {
    name: "42",
    hidden: true,
    run: () => <p className="text-amber">the answer to life, the universe and everything. also a good port suffix.</p>,
  },
];

const VISIBLE_COMMANDS = COMMANDS.filter((c) => !c.hidden);

const BY_NAME = new Map(COMMANDS.flatMap((c) => [c.name, ...(c.aliases ?? [])].map((n) => [n, c])));

export const findCommand = (name) => BY_NAME.get(name.toLowerCase());

/** Returns the completed input for a unique match, or null if there's no single candidate. */
export function completeInput(input) {
  const [first, ...rest] = input.split(" ");
  const unique = (pool, prefix) => {
    const hits = pool.filter((candidate) => candidate.startsWith(prefix.toLowerCase()));
    return hits.length === 1 ? hits[0] : null;
  };

  if (rest.length === 0) {
    const hit = unique(VISIBLE_COMMANDS.map((c) => c.name), first);
    return hit && `${hit} `;
  }
  const hit = unique(findCommand(first)?.complete?.() ?? [], rest.join(" "));
  return hit && `${first} ${hit}`;
}
