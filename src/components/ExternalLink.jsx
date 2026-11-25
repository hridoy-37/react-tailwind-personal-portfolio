/** Anchor that opens off-site URLs in a new tab safely. Same-page/mailto/tel links open normally. */
export const ExternalLink = ({ href, children, ...rest }) => {
  const external = /^https?:\/\//.test(href);
  return (
    <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
      {children}
    </a>
  );
};
