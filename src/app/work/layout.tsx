import type { ReactNode } from "react";
import CaseTemplate from "@/components/case/CaseTemplate";

/**
 * Shared shell for every case study. The template provides the homepage →
 * case-study transition choreography and per-page section reveals.
 */
export default function WorkLayout({ children }: { children: ReactNode }) {
  return <CaseTemplate>{children}</CaseTemplate>;
}
