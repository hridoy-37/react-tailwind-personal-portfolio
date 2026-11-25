import { useEffect } from "react";
import { CommandPalette } from "@/components/command-palette/CommandPalette";
import { MatrixRain } from "@/components/MatrixRain";
import { useUI } from "@/context/ui-context";
import { PROFILE, SECTIONS } from "@/data";
import { useKonami } from "@/hooks/useKonami";
import { Footer } from "@/layout/Footer";
import { Navbar } from "@/layout/Navbar";
import { StatusBar } from "@/layout/StatusBar";
import { About } from "@/sections/about/About";
import { Contact } from "@/sections/contact/Contact";
import { Experience } from "@/sections/experience/Experience";
import { Hero } from "@/sections/hero/Hero";
import { Projects } from "@/sections/projects/Projects";
import { Reviews } from "@/sections/reviews/Reviews";
import { Shell } from "@/sections/shell/Shell";
import { Stack } from "@/sections/stack/Stack";

/** Section id -> component. Render order comes from SECTIONS in data/navigation.js. */
const SECTION_COMPONENTS = {
  about: About,
  stack: Stack,
  experience: Experience,
  projects: Projects,
  reviews: Reviews,
  shell: Shell,
  contact: Contact,
};

const DEVTOOLS_GREETING_STYLE = "color:#3ee08f;font:bold 14px 'JetBrains Mono',monospace";

function App() {
  const { setMatrix } = useUI();
  useKonami(() => setMatrix(true));

  // A little something for people who open devtools.
  useEffect(() => {
    console.log(
      `%c> hello, fellow dev 👋\n> like poking around? so do I.\n> ${PROFILE.email}`,
      DEVTOOLS_GREETING_STYLE
    );
  }, []);

  return (
    <div className="min-h-screen overflow-x-clip md:pb-6">
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-400 focus:px-3 focus:py-2 focus:rounded focus:bg-primary focus:text-primary-foreground"
      >
        skip to content
      </a>

      <Navbar />
      <main>
        <Hero />
        {SECTIONS.map(({ id }) => {
          const SectionComponent = SECTION_COMPONENTS[id];
          return <SectionComponent key={id} />;
        })}
      </main>
      <Footer />

      {/* Overlays */}
      <StatusBar />
      <CommandPalette />
      <MatrixRain />
    </div>
  );
}

export default App;
