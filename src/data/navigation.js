/**
 * Page sections in order. The order here drives the navbar, the command palette,
 * the shell's `ls`/`cd`, and each section's 0x0N heading number.
 * `hint` is the short comment shown next to the file in the mobile menu.
 */
const SECTION_LIST = [
  { id: "about", file: "about.md", hint: "whoami, in prose" },
  { id: "stack", file: "stack.ts", hint: "the toolbox" },
  { id: "experience", file: "experience.log", hint: "career as git history" },
  { id: "projects", file: "projects/", hint: "things I shipped" },
  { id: "reviews", file: "reviews", hint: "kind words" },
  { id: "shell", file: "shell", hint: "try typing help" },
  { id: "contact", file: "contact.sh", hint: "say hello" },
];

export const SECTIONS = SECTION_LIST.map((section, i) => ({ ...section, index: i + 1 }));

export const SECTION_IDS = SECTIONS.map((s) => s.id);

export const HOME_ID = "home";

export const getSection = (id) => SECTIONS.find((s) => s.id === id);
