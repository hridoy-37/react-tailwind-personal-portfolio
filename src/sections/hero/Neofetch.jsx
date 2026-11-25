import { PulseDot } from "@/components/PulseDot";
import { Window } from "@/components/Window";
import { NEOFETCH, PROFILE, SITE } from "@/data";

const SWATCHES = ["bg-red", "bg-amber", "bg-primary", "bg-cyan", "bg-blue", "bg-purple", "bg-foreground", "bg-comment"];
const HOST = PROFILE.location.split(",")[0].toLowerCase();

/** Hero card styled like `neofetch` output: photo on the left, system info on the right. */
export const Neofetch = () => (
  <Window title={`${SITE.shellUser}: ~ — neofetch`} right="zsh" className="glow-box">
    <div className="p-5 sm:p-6 grid sm:grid-cols-[auto_1fr] gap-6 items-start text-[0.8rem]">
      <Portrait />

      <div className="min-w-0">
        <p className="font-bold">
          <span className="text-primary">{PROFILE.handle}</span>@<span className="text-primary">{HOST}</span>
        </p>
        <p className="text-comment" aria-hidden="true">
          {"-".repeat(PROFILE.handle.length + HOST.length + 1)}
        </p>

        <dl className="mt-1 space-y-0.5">
          {NEOFETCH.map(([key, value]) => (
            <InfoRow key={key} label={key}>
              <span className="text-foreground/85 truncate" title={value}>
                {value}
              </span>
            </InfoRow>
          ))}
          <InfoRow label="status">
            <span className="text-primary flex items-center gap-1.5">
              <PulseDot /> open to work
            </span>
          </InfoRow>
        </dl>

        <div className="flex mt-4" aria-hidden="true">
          {SWATCHES.map((color) => (
            <span key={color} className={`w-5 h-3 ${color}`} />
          ))}
        </div>
      </div>
    </div>
  </Window>
);

const InfoRow = ({ label, children }) => (
  <div className="flex gap-2 min-w-0">
    <dt className="text-cyan w-19 shrink-0">{label}</dt>
    <dd className="min-w-0 flex">{children}</dd>
  </div>
);

const CORNERS = [
  "top-1.5 left-1.5 border-t-2 border-l-2",
  "top-1.5 right-1.5 border-t-2 border-r-2",
  "bottom-1.5 left-1.5 border-b-2 border-l-2",
  "bottom-1.5 right-1.5 border-b-2 border-r-2",
];

/** Natural-colour photo behind a subtle CRT layer (scanlines, vignette, sweep) and viewfinder brackets; clears on hover, and is clear by default on touch devices. */
const Portrait = () => (
  <div className="relative mx-auto sm:mx-0 w-40 sm:w-44 aspect-square rounded-md overflow-hidden border border-border group">
    <img
      src={PROFILE.photo}
      alt={PROFILE.name}
      width={400}
      height={400}
      fetchPriority="high"
      className="w-full h-full object-cover object-top saturate-[.85] contrast-105 group-hover:saturate-100 touch:saturate-100 transition-all duration-500"
    />
    <div className="absolute inset-0 pointer-events-none group-hover:opacity-0 touch:hidden transition-opacity duration-500" aria-hidden="true">
      <div className="absolute inset-0 portrait-scanlines" />
      <div className="absolute inset-0 portrait-vignette" />
      <div className="h-1/3 w-full bg-linear-to-b from-transparent via-white/10 to-transparent animate-scan" />
    </div>
    {CORNERS.map((pos) => (
      <span key={pos} className={`absolute w-3.5 h-3.5 border-amber/80 pointer-events-none ${pos}`} aria-hidden="true" />
    ))}
  </div>
);
