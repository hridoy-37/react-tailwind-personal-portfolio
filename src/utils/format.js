/** "https://example.com/" -> "example.com" */
export const prettyUrl = (url) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

/** "Ada Lovelace" -> "AL" */
export const initials = (name) =>
  name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

/** "Tailwind CSS" -> "tailwind-css" */
export const toHashtag = (tag) => tag.toLowerCase().replace(/\s+/g, "-");
