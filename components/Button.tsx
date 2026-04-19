import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({
  children,
  className = "",
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex min-h-[3rem] min-w-[10rem] items-center justify-center rounded-full px-8 text-[0.8125rem] font-medium tracking-[0.1em] transition-[transform,box-shadow,background-color,color] duration-500 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40";

  const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary:
      "bg-[var(--color-ink)] text-[var(--color-paper)] shadow-soft hover:shadow-soft-lg hover:bg-[color-mix(in_oklab,var(--color-ink)_88%,white)] focus-visible:outline-[var(--color-ink)]",
    secondary:
      "bg-[var(--color-surface)] text-[var(--color-ink)] shadow-soft ring-1 ring-[color-mix(in_oklab,var(--color-ink)_8%,transparent)] hover:ring-[color-mix(in_oklab,var(--color-rose)_35%,transparent)] focus-visible:outline-[var(--color-rose)]",
    ghost:
      "bg-transparent text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] focus-visible:outline-[var(--color-ink)]",
  };

  return (
    <button
      type={type}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
