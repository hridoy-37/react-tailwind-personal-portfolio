import { SocialLinks } from "@/components/SocialLinks";
import { HOME_ID, PROFILE } from "@/data";

export const Footer = () => (
  <footer className="border-t border-border pb-10 md:pb-14 pt-10">
    <div className="container mx-auto px-4 sm:px-6">
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 text-sm">
        <div className="text-center md:text-left space-y-2">
          <a href={`#${HOME_ID}`} className="font-bold">
            <span className="text-primary">~/</span>
            {PROFILE.handle}
          </a>
          <p className="text-comment text-xs">
            /* © {new Date().getFullYear()} {PROFILE.name}. Built with React + Tailwind, powered by caffeine. */
          </p>
          <p className="text-comment text-xs">
            exit code <span className="text-primary">0</span> · no bugs were harmed (that we know of)
          </p>
        </div>
        <SocialLinks />
      </div>
    </div>
  </footer>
);
