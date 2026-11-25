import emailjs from "@emailjs/browser";

const config = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

/** Sends the contact form through EmailJS. Throws if config is missing or the request fails. */
export async function sendContactEmail({ name, email, message }) {
  const { serviceId, templateId, publicKey } = config;
  if (!serviceId || !templateId || !publicKey) {
    throw new Error("EmailJS configuration is missing. Please check your environment variables.");
  }
  return emailjs.send(serviceId, templateId, { name, email, message }, publicKey);
}
