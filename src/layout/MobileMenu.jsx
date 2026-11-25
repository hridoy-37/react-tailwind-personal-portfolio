import { useEffect, useRef } from "react";
import { Command, Download } from "lucide-react";
import { PulseDot } from "@/components/PulseDot";
import { SocialLinks } from "@/components/SocialLinks";
import { ShellPrompt } from "@/components/TerminalPrompt";
import { Window } from "@/components/Window";
import { PROFILE, SECTIONS, SITE } from "@/data";
import { useEventListener } from "@/hooks/useEventListener";
import { scrollToSection } from "@/utils/dom";
import { FILE_COLOR, FILE_PERMISSIONS, fileKind } from "@/utils/files";

const LINE_STAGGER_MS = 45;

/** Delay for the i-th line's staggered "typed out" entrance (pair with `animate-line-in`). */
const lineDelay = (i) => ({ animationDelay: `${i * LINE_STAGGER_MS}ms` });

/**
 * Mobile / tablet navigation, rendered as a terminal running `ls -la ~/hridoy`.
 * Number keys 1–N jump to a section; Esc closes. Page scroll is locked while open.
 */
export const MobileMenu = ({ active, onClose, onOpenPalette }) => {
  const firstLinkRef = useRef(null);

  // Lock page scroll and move focus into the menu while it's open.
  useEffect(() => {
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = overflow;
    };
  }, []);

  const go = (id) => {
    onClose();
    // Wait for the scroll lock to be released before scrolling.
    requestAnimationFrame(() => scrollToSection(id));
  };

  useEventListener("keydown", (e) => {
    if (e.key === "Escape") return onClose({ restoreFocus: true });
    const section = SECTIONS[Number(e.key) - 1];
    if (section && !e.metaKey && !e.ctrlKey && !e.altKey) go(section.id);
  });

  const footerStart = SECTIONS.length + 3;

  return (
    <div
      id="mobile-menu"
      className="lg:hidden fixed inset-x-0 top-14 bottom-0 z-99 overflow-y-auto bg-background/85 backdrop-blur-md"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
    >
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <Window title={`${SITE.shellUser}: ~ — nav`} right="zsh" className="glow-box animate-menu-in">
          <nav className="p-4 sm:p-5 text-[0.8rem] sm:text-sm" aria-label="Sections">
            <p style={lineDelay(0)} className="flex flex-wrap animate-line-in">
              <ShellPrompt />
              <span>ls -la ~/{PROFILE.handle}</span>
            </p>
            <p style={lineDelay(1)} className="mt-1 text-comment animate-line-in">
              total {SECTIONS.length}
            </p>

            <ul className="mt-1">
              {SECTIONS.map((section, i) => (
                <li key={section.id} style={lineDelay(i + 2)} className="animate-line-in">
                  <FileRow
                    ref={i === 0 ? firstLinkRef : undefined}
                    section={section}
                    active={active === section.id}
                    onSelect={(e) => {
                      e.preventDefault();
                      go(section.id);
                    }}
                  />
                </li>
              ))}
            </ul>

            <p style={lineDelay(footerStart - 1)} className="mt-3 hidden sm:block text-comment animate-line-in">
              # tip: press 1–{SECTIONS.length} to jump, esc to close
            </p>
          </nav>

          <div style={lineDelay(footerStart)} className="border-t border-border p-4 sm:p-5 space-y-4 animate-line-in">
            <div className="grid grid-cols-1 min-[360px]:grid-cols-2 gap-2">
              <a href={PROFILE.cv} download={PROFILE.cvDownloadName} className="btn-term btn-ghost justify-center text-xs whitespace-nowrap">
                <Download className="w-4 h-4" aria-hidden="true" /> wget cv.pdf
              </a>
              <button onClick={onOpenPalette} className="btn-term btn-ghost justify-center text-xs whitespace-nowrap">
                <Command className="w-4 h-4" aria-hidden="true" /> commands
              </button>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <SocialLinks />
              <span className="flex items-center gap-2 text-xs text-primary">
                <PulseDot /> open to work
              </span>
            </div>
          </div>
        </Window>
      </div>
    </div>
  );
};

/** One `ls -la` row: [n]  permissions  owner  name   # hint */
const FileRow = ({ ref, section: { id, file, hint, index }, active, onSelect }) => {
  const kind = fileKind(file);
  return (
    <a
      ref={ref}
      href={`#${id}`}
      onClick={onSelect}
      aria-current={active ? "true" : undefined}
      className={`group flex items-center gap-3 -mx-2 px-2 py-2.5 rounded transition-colors ${
        active ? "bg-primary/10" : "hover:bg-surface focus-visible:bg-surface"
      }`}
    >
      <span className={`w-3 shrink-0 ${active ? "text-primary" : "text-transparent group-hover:text-comment"}`} aria-hidden="true">
        &gt;
      </span>
      <span className="text-amber shrink-0" aria-hidden="true">
        [{index}]
      </span>
      <span className="hidden min-[360px]:inline text-comment shrink-0" aria-hidden="true">
        {FILE_PERMISSIONS[kind]}
      </span>
      <span className={`truncate ${active ? "text-primary font-bold" : FILE_COLOR[kind]}`}>{file}</span>
      <span className="ml-auto hidden sm:inline text-comment truncate">
        <span aria-hidden="true"># </span>
        {hint}
      </span>
    </a>
  );
};
