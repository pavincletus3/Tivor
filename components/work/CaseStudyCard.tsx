"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useGsapContext } from "@/components/motion/useGsapContext";
import { prefersReducedMotion } from "@/lib/reducedMotion";

interface CaseStudyCardProps {
  id: string;
  name: string;
  label: string;
  description: string;
  sector: string;
  year: string;
  index: number;
}

export function CaseStudyCard({
  id,
  name,
  label,
  description,
  sector,
  year,
  index,
}: CaseStudyCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useGsapContext(
    () => {
      if (prefersReducedMotion() || !imgRef.current) return;

      gsap.fromTo(
        imgRef.current,
        { clipPath: "inset(8% 0)", scale: 1.1 },
        {
          clipPath: "inset(0% 0)",
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            end: "center center",
            scrub: true,
          } as ScrollTrigger.Vars,
        }
      );
    },
    cardRef,
    []
  );

  return (
    <div
      id={id}
      ref={cardRef}
      className="border-t border-[var(--border)] pt-12 pb-20"
    >
      {/* Metadata row */}
      <div
        className="flex items-center gap-6 mb-8 font-mono text-[12px] tracking-[0.08em] uppercase text-[var(--muted)]"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        <span>0{index + 1}</span>
        <span>{sector}</span>
        <span>{year}</span>
      </div>

      {/* Image slot */}
      <div
        ref={imgRef}
        className="w-full rounded-xl overflow-hidden mb-8"
        style={{ aspectRatio: "16/9" }}
      >
        <div
          className="w-full h-full flex items-center justify-center"
          style={{
            background: `repeating-linear-gradient(${45 + index * 30}deg, var(--border) 0 8px, var(--elev) 8px 16px)`,
          }}
        >
          <span
            className="font-mono text-[12px] tracking-[0.08em] uppercase text-[var(--muted)]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {name} — Coming soon
          </span>
        </div>
      </div>

      {/* Text */}
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <h2
          style={{
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            fontWeight: 500,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            color: "var(--fg)",
          }}
        >
          {name}
        </h2>
        <div>
          <p
            className="text-[var(--muted)] mb-2 font-mono text-[12px] tracking-[0.08em] uppercase"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {label}
          </p>
          <p
            style={{
              fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)",
              lineHeight: 1.7,
              color: "var(--muted)",
            }}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
