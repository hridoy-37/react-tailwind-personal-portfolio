import { useState } from "react";
import { sendContactEmail } from "@/services/email";

const EMPTY = { name: "", email: "", message: "" };

/** Form state + submit handling for the contact form. `status.type` is null | "success" | "error". */
export function useContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState({ type: null, message: "" });

  const bind = (field) => ({
    id: field,
    value: values[field],
    onChange: (e) => setValues((v) => ({ ...v, [field]: e.target.value })),
  });

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus({ type: null, message: "" });
    try {
      await sendContactEmail(values);
      setStatus({ type: "success", message: "200 OK: message delivered. I'll get back to you soon." });
      setValues(EMPTY);
    } catch (err) {
      console.error("Contact form error:", err);
      const reason = err.text || err.message || "failed to send message, please email me directly.";
      setStatus({ type: "error", message: `exit 1: ${reason}` });
    } finally {
      setSending(false);
    }
  };

  return { bind, submit, sending, status };
}
