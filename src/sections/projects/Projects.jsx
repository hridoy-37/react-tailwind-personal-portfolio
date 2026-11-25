import { useMemo, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { PROJECTS } from "@/data";
import { includesQuery } from "@/utils/search";
import { FeaturedProjectCard, ProjectCard } from "./ProjectCards";
import { ProjectFilter } from "./ProjectFilter";

const searchableText = (p) => [p.title, p.kind, p.description, ...p.tags].join(" ");

export const Projects = () => {
  const [query, setQuery] = useState("");

  const matches = useMemo(() => PROJECTS.filter((p) => includesQuery(searchableText(p), query)), [query]);
  const featured = matches.filter((p) => p.featured);
  const others = matches.filter((p) => !p.featured);

  return (
    <Section
      id="projects"
      command="ls -la ~/projects"
      subtitle="things I've built and shipped. filter them like a true terminal dweller."
    >
      <Reveal className="mb-8">
        <ProjectFilter value={query} onChange={setQuery} shown={matches.length} total={PROJECTS.length} />
      </Reveal>

      {matches.length === 0 && (
        <p className="text-sm text-comment py-10">
          grep: no matches for &quot;<span className="text-red">{query}</span>&quot;. try a different pattern.
        </p>
      )}

      <div className="space-y-6">
        {featured.map((project, i) => (
          <FeaturedProjectCard key={project.slug} project={project} delay={i * 100} />
        ))}
      </div>

      {others.length > 0 && (
        <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-6 ${featured.length ? "mt-6" : ""}`}>
          {others.map((project, i) => (
            <ProjectCard key={project.slug} project={project} delay={(i % 3) * 80} />
          ))}
        </div>
      )}
    </Section>
  );
};
