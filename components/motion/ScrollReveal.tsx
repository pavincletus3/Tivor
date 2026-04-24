"use client";

import { useRef, ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useGsapContext } from "./useGsapContext";
import { prefersReducedMotion } from "@/lib/reducedMotion";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  y = 32,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGsapContext(
    () => {
      if (prefersReducedMotion()) return;

      gsap.from(ref.current, {
        autoAlpha: 0,
        y,
        duration: 0.9,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          once: true,
        } as ScrollTrigger.Vars,
      });
    },
    ref,
    []
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
