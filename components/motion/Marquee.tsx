"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGsapContext } from "./useGsapContext";
import { MARQUEE_PHRASES } from "@/lib/content";

interface MarqueeProps {
  phrases?: string[];
  duration?: number;
  className?: string;
}

function buildSet(phrases: string[]) {
  const items: React.ReactNode[] = [];
  phrases.forEach((p, i) => {
    items.push(<span key={`p-${i}`}>{p}</span>);
    items.push(
      <span key={`s-${i}`} className="sep">
        ◆
      </span>
    );
  });
  return items;
}

export function Marquee({
  phrases = MARQUEE_PHRASES,
  duration = 30,
  className,
}: MarqueeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGsapContext(
    () => {
      if (!trackRef.current) return;
      gsap.to(trackRef.current, {
        xPercent: -50,
        duration,
        ease: "linear",
        repeat: -1,
      });
    },
    ref,
    []
  );

  return (
    <div
      ref={ref}
      className={className}
      style={{
        overflow: "hidden",
        maskImage:
          "linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)",
        pointerEvents: "none",
      }}
      aria-hidden="true"
    >
      <div ref={trackRef} className="marquee-track">
        {buildSet(phrases)}
        {buildSet(phrases)}
      </div>
    </div>
  );
}
