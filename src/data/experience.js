/** Newest first. `hash` is a decorative fake commit id for the git-log view. */
export const EXPERIENCES = [
  {
    hash: "a3f9c1e",
    period: "2024 — Present",
    role: "Software Developer",
    company: "RaadCraft Solutions",
    stack: ["Next.js", "TypeScript", "Docker", "Linux"],
    current: true,
    bullets: [
      "Develop enterprise web applications in Next.js and TypeScript, with typed API contracts and shared components.",
      "Built a reusable Atomic Design component library that reduced UI development time by about 40% across the team.",
      "Restructured React Context providers to remove unnecessary re-renders in dashboards that handle large datasets.",
      "Containerized applications with Docker and set up Linux-based CI/CD pipelines for development and production releases.",
      "Use Claude Code, GitHub Copilot and MCP servers for code generation, refactoring, test writing and code review.",
    ],
  },
  {
    hash: "7b2e04d",
    period: "2023 — 2024",
    role: "Full-Stack Developer",
    company: "RevEnComm",
    stack: ["Node.js", "Laravel", "PHP", "BullMQ", "Redis", "PostgreSQL", "React"],
    current: false,
    bullets: [
      "Designed event-driven microservices with BullMQ and Redis to move heavy processing out of the API request cycle and keep response times low.",
      "Separated the backend into independent services for message sync, post scheduling, webhook ingestion and notifications, each with dedicated BullMQ workers.",
      "Implemented retries with exponential backoff, delayed and scheduled jobs, and queue rate limiting to stay within third-party API limits.",
      "Configured the production server on a private VPS: PostgreSQL, Nginx reverse proxy, SSL certificates, Docker, PM2 process management and a CI/CD pipeline.",
      "Co-developed an internal ERP system in Laravel and PHP with a senior Laravel developer, building feature modules, database schema and API endpoints.",
      "Built SaaS interfaces from Figma designs on the MERN stack with Zustand, including role-based access control (RBAC) for admin modules.",
    ],
  },
];
