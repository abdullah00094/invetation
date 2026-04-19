import type { ReactNode } from "react";

type SectionContainerProps = {
  id: string;
  children: ReactNode;
  className?: string;
  /** Extra vertical rhythm */
  airy?: boolean;
};

export function SectionContainer({
  id,
  children,
  className = "",
  airy = true,
}: SectionContainerProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-10 ${airy ? "py-[clamp(4.5rem,12vw,8rem)] sm:py-28 lg:py-32" : "py-16 sm:py-20"} ${className}`}
    >
      <div className="mx-auto w-full max-w-[var(--container-md)] px-6 sm:px-10">
        {children}
      </div>
    </section>
  );
}
