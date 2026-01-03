import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

// Simple button component matching your design system
const Button = ({ children, size = "md", onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 px-6 py-2 bg-primary text-primary-foreground font-medium rounded-full hover:opacity-90 transition-all ${size === "sm" ? "text-sm px-4 py-1.5" : ""
        } ${className}`}
    >
      {children}
    </button>
  );
};

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex items-center transition-all duration-500 ${isScrolled ? "glass-strong h-14" : "bg-transparent h-20 py-3"
          }`}
      >
        <nav className="container mx-auto px-6 flex items-center justify-between">
          <a
            href="#"
            className="text-xl font-bold tracking-tight hover:text-primary"
          >
            HRIDOY<span className="text-primary">.</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <div className="glass rounded-full px-2 py-1 flex items-center gap-1">
              {navLinks.map((link, index) => (
                <a
                  href={link.href}
                  key={index}
                  className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground rounded-full hover:bg-surface transition-all"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button size="sm">Contact Me</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground cursor-pointer hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-strong fixed top-14 left-0 right-0 z-40 animate-fade-in">
          <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link, index) => (
              <a
                href={link.href}
                key={index}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg text-muted-foreground hover:text-foreground py-2 transition-colors"
              >
                {link.label}
              </a>
            ))}

            <Button onClick={() => setIsMobileMenuOpen(false)}>
              Contact Me
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
