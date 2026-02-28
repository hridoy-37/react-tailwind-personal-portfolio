import { Code2, Lightbulb, Rocket, Users } from "lucide-react";

const highlights = [
  {
    icon: Code2,
    title: "Clean Code",
    description:
      "Writing maintainable, scalable code that stands the test of time.",
  },
  {
    icon: Rocket,
    title: "Performance",
    description:
      "Optimizing for speed and delivering lightning-fast user experiences.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Working closely with teams to bring ideas to life.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Staying ahead with the latest technologies and best practices.",
  },
];

export const About = () => {
  return (
    <section id="about" className="py-24 md:py-28 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-16 items-center">
          {/* Left Column */}
          <div className="space-y-8 md:space-y-9">
            <div className="animate-fade-in">
              <span className="text-secondary-foreground text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase">
                About Me
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight animate-fade-in animation-delay-100 text-secondary-foreground">
              Crafting impactful experiences,
              <span className="font-serif italic font-normal text-foreground/95">
                {" "}
                one line of code at a time.
              </span>
            </h2>

            <div className="space-y-4 text-base leading-relaxed text-muted-foreground animate-fade-in animation-delay-200">
              <p>
                I’m a senior full-stack software engineer with 3+ years of
                experience delivering production systems that balance speed,
                reliability, and long-term maintainability. I lead projects from
                discovery through delivery with clear technical direction and
                strong execution.
              </p>
              <p>
                I specialize in full-stack JavaScript architecture with React,
                Next.js, and TypeScript on the frontend, plus Node.js services
                with MongoDB and Redis on the backend. I also use Zustand and
                Context API for predictable state management in complex
                applications.
              </p>
              <p>
                Beyond implementation, I focus on engineering leadership:
                mentoring developers, improving code quality standards, and
                aligning technical decisions with product goals to deliver
                measurable business impact.
              </p>
            </div>

            <div className="glass rounded-2xl p-6 md:p-7 glow-border animate-fade-in animation-delay-300">
              <p className="text-base md:text-lg leading-relaxed font-medium italic text-foreground">
                "I build systems that scale with the business, empower teams to
                move with confidence, and turn product vision into reliable,
                high-impact software."
              </p>
            </div>
          </div>

          {/* Right Column - Hilights */}
          <div className="grid sm:grid-cols-2 gap-5 md:gap-6">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="glass p-6 md:p-7 rounded-2xl animate-fade-in"
                style={{ animationDelay: `${(idx + 1) * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 hover:bg-primary/20 transition-colors">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold tracking-tight mb-2">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
