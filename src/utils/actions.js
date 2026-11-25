// App-level actions shared by the command palette and the shell.
import { PROFILE, SITE } from "@/data";
import { downloadFile, scrollToSection } from "./dom";

export const downloadCv = () => downloadFile(PROFILE.cv, PROFILE.cvDownloadName);

/** Copies the email address; falls back to opening the mail client. Resolves to true on copy. */
export const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText(PROFILE.email);
    return true;
  } catch {
    window.location.href = `mailto:${PROFILE.email}`;
    return false;
  }
};

/** Scrolls to the shell section and focuses its input once the scroll settles. */
export const focusShell = () => {
  scrollToSection("shell");
  setTimeout(
    () => document.getElementById(SITE.shellInputId)?.focus({ preventScroll: true }),
    600
  );
};
