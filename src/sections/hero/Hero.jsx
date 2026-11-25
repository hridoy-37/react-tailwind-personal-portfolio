import { ArrowRight, ChevronsDown, Download } from "lucide-react";
import { SocialLinks } from "@/components/SocialLinks";
import { HomePrompt } from "@/components/TerminalPrompt";
import { HOME_ID, PROFILE } from "@/data";
import { useTypewriter } from "@/hooks/useTypewriter";
import { modKey } from "@/utils/platform";
import { Neofetch } from "./Neofetch";
import { TechMarquee } from "./TechMarquee";

const GIVEN_NAMES = PROFILE.name.replace(PROFILE.firstName, "").trim();

export const Hero = () => (
  <section id={HOME_ID} className="relative min-h-screen flex flex-col justify-center overflow-hidden">
    <Backdrop />

    <div className="container mx-auto px-4 sm:px-6 pt-24 md:pt-28 pb-12 relative z-10">
      <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-14 items-center">
        <Intro />
        <Neofetch />
      </div>
    </div>

    <TechMarquee />

    <a
      href="#about"
      className="relative z-10 mx-auto my-6 flex items-center gap-2 text-xs text-comment hover:text-primary transition-colors"
    >
      <ChevronsDown className="w-4 h-4 animate-bounce" aria-hidden="true" /> scroll --down
    </a>
  </section>
);

const Backdrop = () => (
  <>
    <div
      className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      aria-hidden="true"
    />
    <div
      className="absolute -top-40 left-1/2 -translate-x-1/2 w-184 h-184 rounded-full bg-primary/10 blur-[120px]"
      aria-hidden="true"
    />
  </>
);

const Intro = () => {
  const typed = useTypewriter(PROFILE.roles);

  return (
    <div className="space-y-7">
      <HomePrompt command="whoami" />

      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight">
        {GIVEN_NAMES}
        <br />
        <span className="text-primary glow-text animate-glitch inline-block">{PROFILE.firstName}</span>
        <span className="text-primary animate-blink">_</span>
      </h1>

      <p className="text-base sm:text-lg text-cyan min-h-7" aria-hidden="true">
        <span className="text-purple">&gt;</span> {typed}
        <span className="animate-blink">▍</span>
      </p>
      <p className="sr-only">{PROFILE.role}</p>

      <p className="max-w-xl text-sm sm:text-base leading-relaxed text-muted-foreground">
        I build web products end to end with{" "}
        <span className="text-foreground">Node.js, React, Next.js and TypeScript</span>, design{" "}
        <span className="text-foreground">event-driven microservices</span> with BullMQ and Redis, and run the
        production boxes they live on.
      </p>

      <div className="flex flex-wrap gap-3">
        <a href="#contact" className="btn-term btn-primary">
          ./contact.sh <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </a>
        <a href={PROFILE.cv} download={PROFILE.cvDownloadName} className="btn-term btn-ghost">
          <Download className="w-4 h-4" aria-hidden="true" /> wget cv.pdf
        </a>
      </div>

      <SocialLinks />

      <p className="hidden sm:block text-xs text-comment">
        tip: press <span className="kbd">{modKey} K</span> for commands · try{" "}
        <span className="text-muted-foreground">↑ ↑ ↓ ↓ ← → ← → B A</span>
      </p>
    </div>
  );
};
