type SectionHeadingProps = {
  title: string;
  eyebrow?: string;
  subtitle?: string;
  align?: "center" | "left";
};

export function SectionHeading({
  title,
  eyebrow,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <header className={`mb-[clamp(2.5rem,6vw,3.75rem)] max-w-[34rem] sm:mb-16 ${alignClass}`}>
      {eyebrow ? (
        <p className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.38em] text-[var(--color-ink-muted)]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-4 text-balance font-serif text-[clamp(1.85rem,5.2vw,2.65rem)] font-medium leading-[1.12] tracking-tight text-[var(--color-ink)]">
        {title}
      </h2>
      {subtitle ? (
        <p
          className={`mt-5 max-w-[28rem] font-sans text-[0.9375rem] font-normal leading-[1.75] text-[var(--color-ink-muted)] sm:text-base sm:leading-[1.8] ${align === "center" ? "mx-auto" : ""}`}
        >
          {subtitle}
        </p>
      ) : null}
    </header>
  );
}
