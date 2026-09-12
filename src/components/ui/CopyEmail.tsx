"use client";

import { useEffect, useRef, useState } from "react";

export default function CopyEmail({ email }: { email: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  async function copy() {
    clearTimeout(timer.current);
    try { await navigator.clipboard.writeText(email); setStatus("copied"); }
    catch { setStatus("failed"); }
    timer.current = setTimeout(() => setStatus("idle"), 3000);
  }
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
      <button type="button" onClick={copy} aria-label="Copy email address" className="copy-email mono-label inline-flex min-h-11 min-w-24 items-center gap-2 text-ink-60">
        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="5" y="5" width="8" height="8" rx="1" /><path d="M10 3H3v7" /></svg>
        {status === "copied" ? "Copied" : "Copy email"}
      </button>
      <span role="status" aria-live="polite" className="text-xs text-ink-60">{status === "failed" ? "Unable to copy. Select the address or use the email link." : status === "copied" ? "Email address copied." : ""}</span>
    </div>
  );
}
