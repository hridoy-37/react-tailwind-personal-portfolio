import { ArrowUpRight, Github } from "lucide-react";
import { PROJECTS_DETAILS } from "../../utils/data"

export default function ProjectShowcase() {
    // const mdUp = useRespon('up', 'md');
    return (
        <div className="grid md:grid-cols-2 gap-8">
            {PROJECTS_DETAILS.map((project, idx) => (
                <div
                    key={idx}
                    className="group glass rounded-2xl overflow-hidden animate-fade-in md:row-span-1"
                    style={{ animationDelay: `${(idx + 1) * 100}ms` }}
                >
                    {/* Image */}
                    <div className="relative overflow-hidden aspect-video">
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div
                            className="absolute inset-0 
                  to-t from-card via-card/50
                  to-transparent opacity-60"
                        />
                        {/* Overlay Links */}
                        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <a
                                href={project.link}
                                target="_blank"
                                noreferrer
                                className="p-3 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all"
                            >
                                <ArrowUpRight className="w-5 h-5" />
                            </a>
                            <a
                                href={project.github}
                                className="p-3 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all"
                            >
                                <Github className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                        <div className="flex items-start justify-between">
                            <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                                <a href={project.link} target="_blank" noreferrer="true">
                                    {project.title}
                                </a>
                            </h3>
                            <a href={project.link} target="_blank" noreferrer="true">
                                <ArrowUpRight
                                    className="w-5 h-5 
                      text-muted-foreground group-hover:text-primary
                      group-hover:translate-x-1 
                      group-hover:-translate-y-1 transition-all"
                                />
                            </a>
                        </div>
                        <p className="text-muted-foreground text-sm">
                            {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag, tagIdx) => (
                                <span
                                    key={tagIdx}
                                    className="px-4 py-1.5 rounded-full bg-surface text-xs font-medium border border-border/50 text-muted-foreground hover:border-primary/50 hover:text-primary transition-all duration-300"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}