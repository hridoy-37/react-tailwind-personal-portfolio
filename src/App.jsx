import { Navbar } from "@/layout/Navbar";
import { Hero } from "@/sections/Hero";
import { Footer } from "./layout/Footer";
import { Projects } from "./sections/projects/Projects";
import { Contact } from "./sections/contacts/Contact";
import { Experience } from "./sections/experiences/Experience";
import { Testimonials } from "./sections/testimonials/Testimonials";
import { About } from "./sections/about/About";

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
