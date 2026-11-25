import { useEffect, useState } from "react";
import { HOME_ID, SECTION_IDS } from "@/data";

/** Id of the section currently crossing the upper third of the viewport. */
export function useActiveSection(ids = SECTION_IDS) {
  const [active, setActive] = useState(HOME_ID);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-30% 0px -65% 0px" }
    );
    [HOME_ID, ...ids].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
