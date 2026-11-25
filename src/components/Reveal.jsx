import { useInView } from "@/hooks/useInView";

/** Fades children in the first time they scroll into view. */
export const Reveal = ({ as = "div", delay = 0, className = "", children, ...rest }) => {
  const Tag = as;
  const [ref, visible] = useInView();
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
};
