/** Search box styled as `$ ls | grep -i <query>`. */
export const ProjectFilter = ({ value, onChange, shown, total }) => (
  <label className="flex items-center gap-2 max-w-xl px-4 h-11 rounded-md border border-border bg-card focus-within:border-primary/60 transition-colors text-sm">
    <span className="text-comment whitespace-nowrap">
      $ ls | <span className="text-purple">grep</span> -i
    </span>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="redis, next.js, stripe…"
      className="flex-1 min-w-0 bg-transparent outline-none text-primary placeholder:text-comment/60"
      aria-label="Filter projects"
    />
    <span className="text-xs text-comment whitespace-nowrap" aria-live="polite">
      {shown}/{total}
    </span>
  </label>
);
