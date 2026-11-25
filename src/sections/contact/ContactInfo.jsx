import { Mail, MapPin, Phone } from "lucide-react";
import { PulseDot } from "@/components/PulseDot";
import { Window } from "@/components/Window";
import { PROFILE } from "@/data";

const CHANNELS = [
  { icon: Mail, label: "email", value: PROFILE.email, href: `mailto:${PROFILE.email}` },
  { icon: Phone, label: "phone", value: PROFILE.phone, href: PROFILE.phoneHref },
  { icon: MapPin, label: "location", value: PROFILE.location },
];

/** Email / phone / location as `cat contact.txt`. Entries with an href are clickable. */
export const ContactChannels = () => (
  <Window title="cat contact.txt" right="txt" bodyClassName="p-3">
    <ul>
      {CHANNELS.map((channel) => (
        <li key={channel.label}>
          <Channel {...channel} />
        </li>
      ))}
    </ul>
  </Window>
);

const Channel = ({ icon, label, value, href }) => {
  const Icon = icon;
  const Tag = href ? "a" : "div";
  return (
    <Tag href={href} className={`flex items-center gap-3 p-3 rounded text-sm ${href ? "hover:bg-surface group" : ""}`}>
      <span className="grid place-items-center w-9 h-9 rounded bg-primary/10 text-primary shrink-0">
        <Icon className="w-4 h-4" aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block text-xs text-comment">{label}</span>
        <span className="block break-all text-foreground/90 group-hover:text-primary transition-colors">{value}</span>
      </span>
    </Tag>
  );
};

/** Availability card styled as `systemctl status`. */
export const AvailabilityCard = () => (
  <div className="window p-5 glow-box">
    <p className="flex items-center gap-2 text-sm font-bold text-primary">
      <PulseDot size="md" />
      systemctl status {PROFILE.handle}
    </p>
    <p className="mt-2 text-[0.8rem] text-muted-foreground">
      <span className="text-primary">active (running)</span>, open to{" "}
      {PROFILE.availability.toLowerCase().replace(";", ",")} roles.
    </p>
  </div>
);
