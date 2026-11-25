/**
 * Projects in display order. `featured` projects render as large cards with `highlights`.
 * `github` is optional; omit it when the source is private.
 */
export const PROJECTS = [
  {
    slug: "coworker-ai",
    title: "Coworker AI",
    kind: "AI Hub Platform",
    featured: true,
    description:
      "An AI hub platform that runs long-running AI media generation jobs, with a guided first-run experience.",
    highlights: [
      "Built asynchronous state handling for long-running AI media generation tasks.",
      "Added a guided onboarding tour with React Tour for first-time users.",
      "Used Claude Code, Gemini and MCP servers throughout planning, implementation and testing.",
    ],
    image: "/projects/coworker_im.webp",
    tags: ["Next.js", "TypeScript", "React Tour"],
    link: "https://coworker.im",
  },
  {
    slug: "cartelier",
    title: "Cartelier",
    kind: "E-commerce Platform",
    featured: true,
    description:
      "A multi-tenant e-commerce platform with separate roles for store owners, staff and customers.",
    highlights: [
      "Built multi-tenant storefronts with role-based access control for owners, staff and customers.",
      "Used Redis caching for inventory sync and delivered static assets through a CDN.",
      "Integrated Stripe for secure checkout and payment processing.",
    ],
    image: "/projects/cartelier.webp",
    tags: ["MongoDB", "Express", "React", "Node.js", "Redis", "Stripe"],
    link: "https://cartelier.onrender.com/",
  },
  {
    slug: "ai-video-generator",
    title: "AI Video Generator",
    kind: "Coworker AI module",
    description:
      "An AI video generation tool inside Coworker AI, powered by Sora and Veo, that helps users create content faster.",
    image: "/projects/coworker-im-2.webp",
    tags: ["React", "OpenAI", "Sora", "Veo", "FastAPI"],
    link: "https://coworker.im/dashboard/video",
  },
  {
    slug: "indepth-studio",
    title: "Indepth Studio",
    kind: "Agency Website",
    description:
      "A custom website for an interior design agency, showcasing residential and commercial projects, services and studio philosophy through an editorial, architecture-led design.",
    image: "/projects/indepth-studio-portfolio-updated.webp",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    link: "https://indepthstudio.com/",
  },
  {
    slug: "revencomm",
    title: "RevEnComm",
    kind: "Marketing Platform",
    description:
      "A digital marketing platform with real-time analytics, forecasting and AI-driven insights.",
    image: "/projects/revencomm.webp",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "EmailJS"],
    link: "https://revencomm.com/",
    github: "https://github.com/RevEnComm/RevEnComm",
  },
  {
    slug: "raadcraft-solutions",
    title: "RaadCraft Solutions",
    kind: "Company Website",
    description:
      "Mobile-first, SEO-focused company website with a dynamic portfolio, structured service pages and a modular team showcase.",
    image: "/projects/raadcraft-solutions.webp",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    link: "https://raad-craft-solutions.vercel.app/",
  },
  {
    slug: "sangini-lifestyle",
    title: "Sangini Lifestyle",
    kind: "Fashion E-commerce",
    description:
      "A fashion e-commerce store with inventory management, payment processing and an analytics dashboard.",
    image: "/projects/shoplanet.webp",
    tags: ["Next.js", "Stripe", "PostgreSQL", "Tailwind CSS"],
    link: "https://sanginilifestyle.com/",
  },
  {
    slug: "prize-bond-checker",
    title: "Prize Bond Checker",
    kind: "Utility App",
    description:
      "A fast utility for checking Bangladesh prize bond numbers against draw results.",
    image: "/projects/prize-bond-cheker.webp",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    link: "https://prize-bond-checker-bd.vercel.app/",
  },
];
