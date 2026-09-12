import type { ReactNode } from "react";

/** The page's own hero owns the entrance. Preserve native route scroll restoration. */
export default function CaseTemplate({ children }: { children: ReactNode }) {
  return children;
}
