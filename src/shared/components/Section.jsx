export const Section = ({ hasContainer = true, children, className }) => (
  <section
    className={`${hasContainer ? "container" : ""} mx-auto px-4 pt-10 md:pt-14 pb-14 md:pb-20 ${className}`}
  >
    {children}
  </section>
);
