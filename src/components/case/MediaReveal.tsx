"use client";

import Image from "next/image";
import { useState } from "react";

/** Decode before revealing; native image loading and CSS handle the rest. */
export default function MediaReveal({ src, alt, hue, className = "" }: {
  src: string; alt: string; hue: string; width?: number; height?: number; className?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  return (
    <div className={`relative aspect-video overflow-hidden border border-line bg-bg-1 ${className}`} style={{ boxShadow: `0 12px 48px -28px ${hue}25` }}>
      {!failed && <Image src={src} alt={alt} fill sizes="(max-width: 768px) 92vw, (max-width: 1280px) 90vw, 1152px" className={`case-image object-contain ${loaded ? "is-loaded" : ""}`} onLoad={() => setLoaded(true)} onError={() => setFailed(true)} />}
      {failed && <p className="mono-label absolute inset-0 flex items-center justify-center">VISUAL — COMING SOON</p>}
    </div>
  );
}
