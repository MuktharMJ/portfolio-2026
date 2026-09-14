"use client";
import { useEffect, useRef, useState } from "react";

export default function CopyEmail({ email }: { email: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  async function copy() {
    clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    timer.current = setTimeout(() => setStatus("idle"), 3000);
  }
  return (
    <div className="copy-wrap">
      <button type="button" onClick={copy} className="copy-email">
        <svg
          aria-hidden="true"
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          <rect x="5" y="5" width="8" height="8" rx="1" />
          <path d="M10 3H3v7" />
        </svg>
        {status === "copied" ? "Copied" : "Copy email"}
      </button>
      <span role="status">
        {status === "failed"
          ? "Unable to copy. Use the email link above."
          : status === "copied"
            ? "Email address copied."
            : ""}
      </span>
    </div>
  );
}
