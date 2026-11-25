import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { Window } from "@/components/Window";
import { EXPERIENCES, PROFILE, SITE } from "@/data";
import { Commit } from "./Commit";

const HeadRef = () => (
  <>
    <span className="text-cyan font-bold">HEAD -&gt; </span>
    <span className="text-primary font-bold">{SITE.branch}</span>
  </>
);

/** Career as git history: one commit per job, newest first, with graduation as the initial commit. */
const COMMITS = [
  ...EXPERIENCES.map((job) => ({
    hash: job.hash,
    refs: job.current ? <HeadRef /> : null,
    author: `${PROFILE.firstName} <${job.company}>`,
    date: job.period,
    type: "feat",
    title: job.role,
    scope: job.company,
    bullets: job.bullets,
    tags: job.stack,
    current: job.current,
  })),
  {
    hash: "0000001",
    refs: <span className="text-amber font-bold">tag: v1.0-graduated</span>,
    date: PROFILE.education.year,
    type: "init",
    title: PROFILE.education.degree,
    body: PROFILE.education.school,
  },
];

export const Experience = () => (
  <Section
    id="experience"
    title="git log"
    command="git log --graph --decorate career"
    subtitle="every role is a commit. HEAD is where I am now."
  >
    <Reveal>
      <Window title="git log --graph" right={SITE.branch} bodyClassName="p-4 sm:p-7">
        <ol className="relative text-[0.8rem] sm:text-sm">
          <span
            className="absolute left-1.25 top-3 bottom-3 w-px bg-linear-to-b from-primary via-primary/40 to-primary/10"
            aria-hidden="true"
          />
          {COMMITS.map((commit, i) => (
            <Commit key={commit.hash} {...commit} last={i === COMMITS.length - 1} />
          ))}
        </ol>
      </Window>
    </Reveal>
  </Section>
);
