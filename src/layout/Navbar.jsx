import { Button } from "@/components/Button";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#testimonials", label: "Testimonials" },
];

const scrollToSection = (href) => {
  const element = document.querySelector(href);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
  }, [isMobileMenuOpen]);

  const handleContactClick = () => {
    setIsMobileMenuOpen(false);
    scrollToSection("#contact");
  };

  const handleNavClick = (href) => {
    setIsMobileMenuOpen(false);
    scrollToSection(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isScrolled || isMobileMenuOpen
        ? "bg-card border-b border-border h-16"
        : "bg-transparent border-b border-transparent h-20"
        }`}
    >
      <nav className="container mx-auto px-6 h-full flex items-center justify-between">
        <a href="#" className="text-xl font-bold tracking-tighter text-foreground hover:text-primary transition-colors">
          HRIDOY<span className="text-primary">.</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1 glass rounded-full px-2 py-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-full hover:bg-muted transition-all"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Button size="sm" onClick={handleContactClick}>
            Contact Me
          </Button>
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="md:hidden relative z-[110] p-2 text-foreground hover:text-primary transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <div
        className={`fixed inset-0 z-[105] md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen
          ? "opacity-100 pointer-events-auto visible"
          : "opacity-0 pointer-events-none invisible"
          }`}
      >
        {/* Dark Backdrop Overlay */}
        <div
          className="absolute inset-0 bg-background/90 backdrop-blur-md"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Content Box */}
        <div
          className={`absolute top-0 left-0 right-0 bg-card border-b border-border px-6 pt-24 pb-10 shadow-2xl transition-transform duration-300 ease-out ${isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
            }`}
        >
          <div className="flex flex-col gap-6 text-center">
            {navLinks.map((link, index) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                style={{ transitionDelay: `${index * 50}ms` }}
                className={`text-2xl font-semibold text-foreground hover:text-primary transition-all ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  }`}
              >
                {link.label}
              </button>
            ))}
            <div className={`pt-4 transition-all duration-500 delay-300 ${isMobileMenuOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
              }`}>
              <Button onClick={handleContactClick} className="w-full">
                Contact Me
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};