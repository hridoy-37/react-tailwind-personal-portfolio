// Personal details. Keep in sync with public/CV-Mostafa-Ryhan-Hridoy.pdf.

export const PROFILE = {
  name: "Mostafa Ryhan Hridoy",
  firstName: "Hridoy",
  handle: "hridoy",
  role: "Full-Stack Software Engineer",
  location: "Chittagong, Bangladesh",
  email: "mostafaryhanhridoy@gmail.com",
  phone: "+880 1874 518655",
  phoneHref: "tel:+8801874518655",
  website: "hridoy-dev-portfolio.vercel.app",
  cv: "/CV-Mostafa-Ryhan-Hridoy.pdf",
  cvDownloadName: "Mostafa_Ryhan_Hridoy_CV.pdf",
  photo: "/profile.webp",
  yearsExperience: "3+",
  availability: "Full-time; on-site, hybrid or remote",
  roles: [
    "Full-Stack Software Engineer",
    "Node.js · React · Next.js · TypeScript",
    "Event-driven microservices with BullMQ + Redis",
    "Linux VPS · Nginx · Docker · PM2 · CI/CD",
    "Shipping with Claude Code + MCP servers",
  ],
  summary: [
    "Full-Stack Software Engineer with 3+ years of experience building web applications with Node.js, React, Next.js and TypeScript, plus working experience in Laravel and PHP from co-developing an ERP system.",
    "I've designed event-driven microservices with BullMQ and Redis, and configured production infrastructure on a private VPS with PostgreSQL, Nginx, SSL, Docker, PM2 and CI/CD.",
    "Claude Code, GitHub Copilot, Gemini and MCP servers are part of my daily development workflow. I'm looking for a full-time role with responsibility for project delivery, from requirements to deployment.",
  ],
  languages: [
    { name: "Bangla", level: "Native" },
    { name: "English", level: "Professional working proficiency" },
  ],
  education: {
    degree: "B.Sc. in Information and Communication Engineering",
    school: "Noakhali Science and Technology University (NSTU)",
    year: "2023",
  },
};

/** Headline numbers shown in the About section. */
export const STATS = [
  { value: "3+", label: "years shipping to production" },
  { value: "~40%", label: "less UI dev time via a shared component library" },
  { value: "4", label: "independent BullMQ-backed services" },
  { value: "req→prod", label: "end-to-end delivery, including infra" },
];

export const SOCIALS = [
  { id: "github", label: "GitHub", href: "https://github.com/hridoy-37", handle: "hridoy-37" },
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/hridoy379/", handle: "hridoy379" },
  { id: "x", label: "X / Twitter", href: "https://x.com/MostafaRyhan", handle: "@MostafaRyhan" },
  { id: "facebook", label: "Facebook", href: "https://www.facebook.com/mostafaryhan.hridoy.9/", handle: "mostafaryhan.hridoy.9" },
];

/** Key/value rows for the `neofetch` card (hero) and the shell's `neofetch` command. */
export const NEOFETCH = [
  ["role", PROFILE.role],
  ["uptime", `${PROFILE.yearsExperience} years in production`],
  ["location", PROFILE.location],
  ["frontend", "React · Next.js · TypeScript"],
  ["backend", "Node.js · Express · Laravel"],
  ["queues", "BullMQ · Redis"],
  ["data", "PostgreSQL · MongoDB"],
  ["infra", "Docker · Nginx · PM2 · CI/CD"],
  ["ai", "Claude Code · Copilot · MCP"],
];
