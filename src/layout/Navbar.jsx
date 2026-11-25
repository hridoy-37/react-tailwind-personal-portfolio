import { useRef, useState } from "react";
import { Command } from "lucide-react";
import { useUI } from "@/context/ui-context";
import { ThemeToggle } from "@/components/ThemeToggle";
import { HOME_ID, PROFILE, SECTIONS } from "@/data";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useEventListener } from "@/hooks/useEventListener";
import { modKey } from "@/utils/platform";
import { MobileMenu } from "./MobileMenu";

const DESKTOP_MIN_WIDTH = 1024;
const SCROLLED_AFTER_PX = 10;

export const Navbar = () => {
  const { setPaletteOpen } = useUI();
  const active = useActiveSection();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const [scrolled, setScrolled] = useState(() => window.scrollY > SCROLLED_AFTER_PX);

  useEventListener("scroll", () => setScrolled(window.scrollY > SCROLLED_AFTER_PX), { passive: true });
  useEventListener("resize", () => window.innerWidth >= DESKTOP_MIN_WIDTH && setMenuOpen(false));

  const openPalette = () => {
    setMenuOpen(false);
    setPaletteOpen(true);
  };

  const closeMenu = ({ restoreFocus = false } = {}) => {
    setMenuOpen(false);
    if (restoreFocus) menuButtonRef.current?.focus();
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-100 transition-colors duration-300 ${
          scrolled || menuOpen ? "bg-background/90 backdrop-blur-md border-b border-border" : "border-b border-transparent"
        }`}
      >
        <nav className="container mx-auto px-4 sm:px-6 h-14 flex items-center gap-4" aria-label="Main">
          <Logo />
          <DesktopTabs active={active} />

          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={openPalette}
              className="hidden sm:flex items-center gap-2 h-8 pl-3 pr-1.5 rounded-md border border-border bg-surface/70 text-xs text-muted-foreground hover:border-primary/60 hover:text-foreground transition-colors"
              aria-label="Open command palette"
            >
              <Command className="w-3.5 h-3.5" aria-hidden="true" />
              <span>commands</span>
              <span className="kbd">{modKey} K</span>
            </button>
            <ThemeToggle />
            <MenuToggle ref={menuButtonRef} open={menuOpen} onToggle={() => setMenuOpen((o) => !o)} />
          </div>
        </nav>
      </header>

      {/* Rendered outside <header>: its backdrop-filter would otherwise trap this fixed overlay. */}
      {menuOpen && <MobileMenu active={active} onClose={closeMenu} onOpenPalette={openPalette} />}
    </>
  );
};

const Logo = () => (
  <a href={`#${HOME_ID}`} className="text-sm font-bold shrink-0 group" aria-label="Back to top">
    <span className="text-primary">~/</span>
    <span className="group-hover:text-primary transition-colors">{PROFILE.handle}</span>
    <span className="text-primary animate-blink">▍</span>
  </a>
);

/** Editor-style tabs, one per section; the active one gets an underline. */
const DesktopTabs = ({ active }) => (
  <ul className="hidden lg:flex items-stretch h-full ml-4 flex-1">
    {SECTIONS.map(({ id, file }) => {
      const isActive = active === id;
      return (
        <li key={id} className="flex">
          <a
            href={`#${id}`}
            aria-current={isActive ? "true" : undefined}
            className={`relative flex items-center px-3.5 text-[0.8rem] transition-colors ${
              isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {file}
            <span
              className={`absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-primary transition-opacity ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
            />
          </a>
        </li>
      );
    })}
  </ul>
);

/** `$ menu` when closed, vim's `:q` when open. */
const MenuToggle = ({ ref, open, onToggle }) => (
  <button
    ref={ref}
    onClick={onToggle}
    aria-label={open ? "Close menu" : "Open menu"}
    aria-expanded={open}
    aria-controls="mobile-menu"
    className={`lg:hidden flex items-center gap-1.5 h-8 px-3 rounded-md border text-xs transition-colors ${
      open
        ? "border-primary/60 bg-primary/10 text-primary"
        : "border-border bg-surface/70 text-foreground hover:border-primary/60 hover:text-primary"
    }`}
  >
    {open ? (
      <span className="font-bold">:q</span>
    ) : (
      <>
        <span className="text-primary">$</span> menu
      </>
    )}
  </button>
);
