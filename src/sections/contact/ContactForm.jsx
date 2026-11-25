import { AlertCircle, CheckCircle, Send } from "lucide-react";
import { Window } from "@/components/Window";
import { PROFILE } from "@/data";
import { useContactForm } from "./useContactForm";

const INPUT_CLASS =
  "w-full px-3 py-2.5 rounded bg-background border border-border text-sm text-primary placeholder:text-comment/60 outline-none focus:border-primary/70 focus:ring-1 focus:ring-primary/40 transition-colors";

/** Contact form presented as a bash script with NAME= / EMAIL= / MESSAGE= variables. */
export const ContactForm = () => {
  const { bind, submit, sending, status } = useContactForm();

  return (
    <Window title="contact.sh" right="bash">
      <form onSubmit={submit} className="p-5 sm:p-6 space-y-4">
        <p className="text-[0.8rem] text-comment">
          #!/usr/bin/env bash
          <br /># fill in the vars and run the script ↓
        </p>

        <Field label="NAME" htmlFor="name">
          <input {...bind("name")} required autoComplete="name" placeholder='"Ada Lovelace"' className={INPUT_CLASS} />
        </Field>
        <Field label="EMAIL" htmlFor="email">
          <input
            {...bind("email")}
            type="email"
            required
            autoComplete="email"
            placeholder='"ada@example.com"'
            className={INPUT_CLASS}
          />
        </Field>
        <Field label="MESSAGE" htmlFor="message">
          <textarea
            {...bind("message")}
            rows={5}
            required
            placeholder={`"Hey ${PROFILE.firstName}, we have a role that…"`}
            className={`${INPUT_CLASS} resize-y min-h-28`}
          />
        </Field>

        <div className="sm:pl-29 pt-1">
          <button
            type="submit"
            disabled={sending}
            className="btn-term btn-primary w-full sm:w-auto justify-center disabled:opacity-60 disabled:cursor-wait"
          >
            {sending ? (
              <>
                sending<span className="animate-blink">…</span>
              </>
            ) : (
              <>
                $ ./contact.sh --send <Send className="w-4 h-4" aria-hidden="true" />
              </>
            )}
          </button>
        </div>

        {status.type && <StatusMessage {...status} />}
      </form>
    </Window>
  );
};

const Field = ({ label, htmlFor, children }) => (
  <div className="grid sm:grid-cols-[6.5rem_1fr] gap-1 sm:gap-3 items-start">
    <label htmlFor={htmlFor} className="text-cyan pt-2.5 text-[0.8rem]">
      {label}
      <span className="text-foreground">=</span>
    </label>
    {children}
  </div>
);

const StatusMessage = ({ type, message }) => {
  const ok = type === "success";
  const Icon = ok ? CheckCircle : AlertCircle;
  return (
    <p
      role="status"
      className={`flex items-start gap-2 p-3 rounded border text-[0.8rem] ${
        ok ? "border-primary/40 bg-primary/10 text-primary" : "border-red/40 bg-red/10 text-red"
      }`}
    >
      <Icon className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
      {message}
    </p>
  );
};
