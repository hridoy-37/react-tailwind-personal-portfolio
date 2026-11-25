/** Terminal / editor window chrome with traffic-light dots. */
export const Window = ({ title, right, children, className = "", bodyClassName = "" }) => (
  <div className={`window overflow-hidden ${className}`}>
    <div className="flex items-center gap-3 px-4 h-9 border-b border-border bg-surface/60">
      <div className="flex shrink-0 gap-1.5" aria-hidden="true">
        <span className="w-3 h-3 rounded-full bg-traffic-close" />
        <span className="w-3 h-3 rounded-full bg-traffic-minimize" />
        <span className="w-3 h-3 rounded-full bg-traffic-zoom" />
      </div>
      <span className="flex-1 min-w-0 truncate text-center text-xs text-muted-foreground">{title}</span>
      <span className="shrink-0 text-xs text-comment text-right sm:min-w-11">{right}</span>
    </div>
    <div className={bodyClassName}>{children}</div>
  </div>
);
