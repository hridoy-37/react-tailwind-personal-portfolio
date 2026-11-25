import { PulseDot } from "@/components/PulseDot";

/** One entry in the git-log graph. Only `hash`, `type` and `title` are required. */
export const Commit = ({ hash, refs, author, date, type, title, scope, body, bullets = [], tags = [], current, last }) => (
  <li className={`relative flex gap-4 sm:gap-6 ${last ? "" : "pb-10"}`}>
    <GraphNode current={current} />

    <article className="min-w-0 flex-1">
      <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <span className="text-amber">commit {hash}</span>
        {refs && (
          <span className="text-xs">
            <span className="text-amber">(</span>
            {refs}
            <span className="text-amber">)</span>
          </span>
        )}
      </p>
      <div className="mt-1">
        {author && <Header label="Author:">{author}</Header>}
        {date && <Header label="Date:">{date}</Header>}
      </div>

      <h3 className="mt-4 text-base sm:text-lg font-bold">
        <span className="text-purple">{type}:</span> {title}
        {scope && <span className="text-primary"> @ {scope}</span>}
      </h3>
      {body && <p className="mt-1 text-muted-foreground">{body}</p>}

      {bullets.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {bullets.map((line) => (
            <li key={line} className="flex gap-2.5 leading-relaxed text-foreground/80">
              <span className="text-primary select-none shrink-0">+</span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      )}

      {tags.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <li key={tag} className="chip">
              {tag}
            </li>
          ))}
        </ul>
      )}
    </article>
  </li>
);

const Header = ({ label, children }) => (
  <p className="text-muted-foreground">
    <span className="text-comment inline-block w-16">{label}</span>
    {children}
  </p>
);

/** Hollow ring for past commits, solid pulsing dot for HEAD. */
const GraphNode = ({ current }) =>
  current ? (
    <PulseDot size="lg" className="z-10 mt-1.5" />
  ) : (
    <span className="relative z-10 w-3 h-3 mt-1.5 shrink-0 rounded-full border-2 border-primary bg-background" aria-hidden="true" />
  );
