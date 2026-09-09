import type { ReactNode } from "react";

interface GhostNumeralProps {
  children: ReactNode;
  /** Solid fill color applied on group hover/focus, e.g. "text-signal". */
  fillClass?: string;
  className?: string;
}

/**
 * Outlined display numeral that fills with `fillClass` when the nearest
 * `.group` ancestor is hovered or focused. Pure CSS — server component.
 * Decorative: hidden from assistive tech; always pair with real text.
 */
export default function GhostNumeral({
  children,
  fillClass = "text-signal",
  className = "",
}: GhostNumeralProps) {
  return (
    <span aria-hidden="true" className={`relative inline-block select-none ${className}`}>
      <span className="ghost-numeral block">{children}</span>
      <span
        aria-hidden="true"
        style={{ WebkitTextStroke: "1px transparent" }}
        className={`absolute inset-0 block opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 ${fillClass}`}
      >
        {children}
      </span>
    </span>
  );
}