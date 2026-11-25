import { Check, MessageSquare } from "lucide-react";
import { Avatar } from "@/components/Avatar";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { PROFILE, TESTIMONIALS } from "@/data";

export const Reviews = () => (
  <Section id="reviews" command={`gh pr view ${PROFILE.handle} --comments`} subtitle="code reviews from people I've shipped with.">
    <div className="grid md:grid-cols-2 gap-5">
      {TESTIMONIALS.map((review, i) => (
        <ReviewCard key={review.author} review={review} delay={(i % 2) * 100} />
      ))}
    </div>
  </Section>
);

/** A testimonial styled as an approving GitHub PR review. */
const ReviewCard = ({ review: { author, role, quote, avatar }, delay }) => (
  <Reveal as="figure" delay={delay} className="window flex flex-col min-w-0">
    <header className="flex items-center gap-3 px-4 py-3 border-b border-border bg-surface/50 text-[0.8rem]">
      <Avatar src={avatar} name={author} />
      <div className="min-w-0 flex-1">
        <p className="sm:truncate">
          <span className="font-bold">{author}</span> <span className="text-muted-foreground">approved these changes</span>
        </p>
        <p className="text-xs text-comment sm:truncate">{role}</p>
      </div>
      <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-primary/40 bg-primary/10 text-primary text-[0.68rem]">
        <Check className="w-3 h-3" aria-hidden="true" /> Approved
      </span>
    </header>
    <blockquote className="flex-1 px-5 py-5 text-sm leading-relaxed text-foreground/85">
      <MessageSquare className="inline w-4 h-4 mr-2 -mt-0.5 text-comment" aria-hidden="true" />
      {quote}
    </blockquote>
    <figcaption className="sr-only">
      {author}, {role}
    </figcaption>
  </Reveal>
);
