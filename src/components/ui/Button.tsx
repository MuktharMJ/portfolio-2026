import type { ReactNode } from "react";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  disabled?: boolean;
  external?: boolean;
}

/** CTA link. Primary = the amber workbench lamp (a sanctioned glow location). */
export default function Button({ href, children, variant = "primary", disabled = false, external = false }: ButtonProps) {
  const base =
    "inline-flex items-center gap-2 px-6 py-3 font-mono text-xs tracking-[0.14em] uppercase transition-all duration-200";
  const styles =
    variant === "primary"
      ? "bg-signal text-bg-0 hover:-translate-y-px hover:brightness-110 hover:shadow-[0_0_28px_rgba(255,182,92,0.28)]"
      : "border border-line text-ink hover:border-signal hover:text-signal";

  if (disabled) {
    return (
      <span aria-disabled="true" className={`${base} ${styles} cursor-not-allowed opacity-40`}>
        {children}
      </span>
    );
  }

  return (
    <a
      href={href}
      className={styles}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
