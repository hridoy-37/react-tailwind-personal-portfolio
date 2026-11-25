import { Briefcase, GraduationCap, Languages } from "lucide-react";
import { Window } from "@/components/Window";
import { PROFILE } from "@/data";

/** Education, languages and availability rendered as a YAML file. */
export const MetaPanel = () => (
  <Window title="meta.yml" right="yml" className="flex-1" bodyClassName="p-5 text-[0.8rem] space-y-4">
    <YamlEntry icon={GraduationCap} label="education">
      <p className="text-foreground/90">{PROFILE.education.degree}</p>
      <p className="text-muted-foreground">
        {PROFILE.education.school} <span className="text-amber">· {PROFILE.education.year}</span>
      </p>
    </YamlEntry>

    <YamlEntry icon={Languages} label="languages">
      {PROFILE.languages.map((lang) => (
        <p key={lang.name} className="text-foreground/90">
          <span className="text-comment">- </span>
          {lang.name} <span className="text-muted-foreground">({lang.level})</span>
        </p>
      ))}
    </YamlEntry>

    <YamlEntry icon={Briefcase} label="availability" inline={<span className="text-primary">"{PROFILE.availability}"</span>} />
  </Window>
);

/** `key:` followed by a nested block, or `key: value` when `inline` is given. */
const YamlEntry = ({ icon, label, inline, children }) => {
  const Icon = icon;
  return (
    <div className="flex gap-3">
      <Icon className="w-4 h-4 mt-0.5 text-purple shrink-0" aria-hidden="true" />
      <div>
        <p>
          <span className="text-cyan">{label}</span>
          <span className="text-comment">:{inline && " "}</span>
          {inline}
        </p>
        {children}
      </div>
    </div>
  );
};
