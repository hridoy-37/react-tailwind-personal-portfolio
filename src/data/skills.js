/** Grouped by layer. `comment` is rendered as a code comment in stack.ts. */
export const SKILLS = [
  { key: "languages", items: ["JavaScript", "TypeScript", "PHP", "SQL"], comment: "the ones I think in" },
  { key: "backend", items: ["Node.js", "Express", "Laravel", "REST APIs", "WebSockets (Socket.io)", "Server-Sent Events"], comment: "APIs, realtime, streaming" },
  { key: "frontend", items: ["React", "Next.js (App Router)", "Redux Toolkit (RTK Query)", "Zustand", "Framer Motion"], comment: "UI + state" },
  { key: "architecture", items: ["Microservices", "Event-Driven Architecture", "Job Queues (BullMQ)", "RBAC", "Atomic Design"], comment: "how the pieces talk" },
  { key: "data", items: ["PostgreSQL", "MongoDB", "Redis", "CDN"], comment: "where state lives" },
  { key: "devops", items: ["Linux VPS", "Nginx", "SSL/TLS", "Docker", "PM2", "CI/CD", "Git"], comment: "from git push to prod" },
  { key: "aiTooling", items: ["Claude Code", "GitHub Copilot", "Gemini", "MCP servers"], comment: "pair programmers that never sleep" },
  { key: "testingDesign", items: ["Jest", "React Testing Library", "Figma"], comment: "trust, but verify" },
];

export const SKILL_COUNT = SKILLS.reduce((sum, group) => sum + group.items.length, 0);

/** Flat list, e.g. for the hero marquee. */
export const ALL_SKILLS = SKILLS.flatMap((group) => group.items);
