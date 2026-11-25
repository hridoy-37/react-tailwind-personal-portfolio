import { useState } from "react";
import { initials } from "@/utils/format";

/** Round avatar that falls back to initials when there's no image or it fails to load. */
export const Avatar = ({ src, name, className = "w-9 h-9" }) => {
  const [failed, setFailed] = useState(false);

  if (src && !failed) {
    return (
      <img
        src={src}
        alt={name}
        onError={() => setFailed(true)}
        className={`rounded-full object-cover ring-1 ring-border ${className}`}
      />
    );
  }
  return (
    <span
      className={`rounded-full grid place-items-center bg-primary/15 text-primary text-xs font-bold ring-1 ring-primary/30 ${className}`}
      aria-hidden="true"
    >
      {initials(name)}
    </span>
  );
};
