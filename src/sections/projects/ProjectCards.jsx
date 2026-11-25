import { Star } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Window } from "@/components/Window";
import { ProjectHighlights, ProjectLinks, ProjectScreenshot, ProjectTags, ProjectTitle } from "./ProjectParts";

const windowTitle = (project) => `~/projects/${project.slug}`;

/** Wide card: screenshot on the left, description + highlights on the right. */
export const FeaturedProjectCard = ({ project, delay }) => (
  <Reveal delay={delay} className="min-w-0">
    <Window
      title={windowTitle(project)}
      right={<Star className="w-3.5 h-3.5 inline text-amber fill-amber" aria-label="featured" />}
      className="hover:border-primary/40 transition-colors"
      bodyClassName="grid md:grid-cols-2"
    >
      <ProjectScreenshot
        project={project}
        className="aspect-video md:aspect-auto md:min-h-full border-b md:border-b-0 md:border-r border-border"
      />
      <div className="p-5 sm:p-6 space-y-4">
        <div>
          <p className="text-xs text-amber mb-1">★ featured · {project.kind}</p>
          <ProjectTitle project={project} className="text-xl sm:text-2xl" />
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
        </div>
        <ProjectHighlights items={project.highlights} />
        <ProjectTags tags={project.tags} />
        <ProjectLinks project={project} />
      </div>
    </Window>
  </Reveal>
);

/** Grid card: screenshot on top, details below. Cards in a row stretch to equal height. */
export const ProjectCard = ({ project, delay }) => (
  <Reveal delay={delay} className="h-full min-w-0">
    <Window
      title={windowTitle(project)}
      className="h-full flex flex-col hover:border-primary/40 hover:-translate-y-1 transition-all duration-300"
      bodyClassName="flex flex-col flex-1"
    >
      <ProjectScreenshot project={project} className="aspect-video border-b border-border" />
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div>
          <p className="text-[0.7rem] text-comment">{project.kind}</p>
          <ProjectTitle project={project} className="text-lg" />
        </div>
        <p className="text-[0.8rem] leading-relaxed text-muted-foreground flex-1">{project.description}</p>
        <ProjectTags tags={project.tags} />
        <ProjectLinks project={project} />
      </div>
    </Window>
  </Reveal>
);
