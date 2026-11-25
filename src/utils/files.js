// Fake-filesystem helpers so section "files" look right in ls-style listings.

/** "projects/" -> "dir", "contact.sh" -> "exec", anything else -> "file" */
export const fileKind = (name) => (name.endsWith("/") ? "dir" : name.endsWith(".sh") ? "exec" : "file");

/** Tailwind text classes matching common `ls --color` defaults. */
export const FILE_COLOR = {
  dir: "text-blue font-bold",
  exec: "text-primary",
  file: "text-foreground",
};

export const FILE_PERMISSIONS = {
  dir: "drwxr-xr-x",
  exec: "-rwxr-xr-x",
  file: "-rw-r--r--",
};
