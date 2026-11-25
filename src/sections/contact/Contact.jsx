import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { ContactForm } from "./ContactForm";
import { AvailabilityCard, ContactChannels } from "./ContactInfo";

const BottomGlow = () => (
  <div
    className="absolute inset-x-0 bottom-0 h-120 bg-linear-to-t from-primary/5 to-transparent pointer-events-none"
    aria-hidden="true"
  />
);

export const Contact = () => (
  <Section
    id="contact"
    command="./contact.sh --interactive"
    subtitle="got a role, a project, or a gnarly queue problem? send a message."
    backdrop={<BottomGlow />}
  >
    <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6 lg:gap-8 items-start">
      <Reveal>
        <ContactForm />
      </Reveal>
      <div className="space-y-6">
        <Reveal delay={100}>
          <ContactChannels />
        </Reveal>
        <Reveal delay={200}>
          <AvailabilityCard />
        </Reveal>
      </div>
    </div>
  </Section>
);
