"use client";

import { useRef } from "react";
import { Container } from "@/components/layout/Container";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useGsapContext } from "@/components/motion/useGsapContext";
import { prefersReducedMotion } from "@/lib/reducedMotion";

export function Mission() {
  const ref = useRef<HTMLElement>(null);

  useGsapContext(
    () => {
      if (prefersReducedMotion()) return;

      const runSplit = async () => {
        const { default: SplitType } = await import("split-type");
        if (!ref.current) return;
        const split = new SplitType(".mission-heading", {
          types: "chars,words",
          tagName: "span",
        });

        gsap.from(".mission-heading .char", {
          autoAlpha: 0,
          yPercent: 100,
          rotation: -20,
          duration: 0.8,
          ease: "power4.out",
          stagger: { each: 0.02 },
          scrollTrigger: {
            trigger: ".mission-heading",
            start: "top 80%",
            once: true,
          } as ScrollTrigger.Vars,
        });

        return () => split.revert();
      };

      runSplit();
    },
    ref,
    []
  );

  return (
    <section
      ref={ref}
      className="py-32 md:py-48 border-b border-border"
    >
      <Container>
        <p
          className="font-mono text-[11px] tracking-widest uppercase text-muted mb-8"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Our Mission
        </p>
        <h1
          className="mission-heading"
          style={{
            fontSize: "clamp(3rem, 7vw, 8rem)",
            fontWeight: 500,
            lineHeight: 0.95,
            letterSpacing: "-0.04em",
            maxWidth: "18ch",
            overflow: "hidden",
            color: "var(--fg)",
            margin: "0 0 2.5rem",
          }}
        >
          Building AI Systems That Power Real Operations
        </h1>
        <p
          style={{
            fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
            lineHeight: 1.7,
            color: "var(--muted)",
            maxWidth: "56ch",
          }}
        >
          We turn operational knowledge into intelligent systems that drive
          scalable decision-making — across manufacturing, procurement, and
          enterprise operations.
        </p>
      </Container>
    </section>
  );
}
