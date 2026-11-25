const SIZES = { sm: "w-2 h-2", md: "w-2.5 h-2.5", lg: "w-3 h-3" };

/** Solid dot with an expanding ping ring, used for "live" / "current" states. */
export const PulseDot = ({ size = "sm", pulse = true, className = "" }) => (
  <span className={`relative inline-flex shrink-0 ${SIZES[size]} ${className}`} aria-hidden="true">
    {pulse && <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-70" />}
    <span className="relative w-full h-full rounded-full bg-primary" />
  </span>
);
