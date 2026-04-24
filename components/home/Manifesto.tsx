"use client";

import { useRef } from "react";
import { Container } from "@/components/layout/Container";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useGsapContext } from "@/components/motion/useGsapContext";
import { prefersReducedMotion } from "@/lib/reducedMotion";

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);

  useGsapContext(
    () => {
      if (prefersReducedMotion()) return;

      const runSplit = async () => {
        const { default: SplitType } = await import("split-type");
        if (!ref.current) return;
        const split = new SplitType(".manifesto-heading", {
          types: "chars,words",
          tagName: "span",
        });

        gsap.from(".manifesto-heading .char", {
          autoAlpha: 0,
          yPercent: 80,
          rotation: -15,
          duration: 0.8,
          ease: "power3.out",
          stagger: { each: 0.018 },
          scrollTrigger: {
            trigger: ".manifesto-heading",
            start: "top 70%",
            once: true,
          } as ScrollTrigger.Vars,
        });

        gsap.from(".manifesto-sub", {
          autoAlpha: 0,
          y: 24,
          duration: 0.9,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".manifesto-sub",
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
      className="relative flex items-center py-20 md:py-28"
    >
      <Container>
        <h2
          className="manifesto-heading"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 6rem)",
            fontWeight: 500,
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
            margin: "0 0 2rem",
            maxWidth: "16ch",
            overflow: "hidden",
            color: "var(--fg)",
          }}
        >
          Strategic AI Systems, Not Generic Tools
        </h2>
        <p
          className="manifesto-sub"
          style={{
            maxWidth: "52ch",
            fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
            lineHeight: 1.6,
            color: "var(--muted)",
            fontWeight: 400,
          }}
        >
          We don&apos;t stop at the PowerPoint. We delve deep into your
          industry, understand your operations first-hand, and deploy strategic
          AI-powered systems that drive real decisions.
        </p>
      </Container>

      {/* Decorative hairline */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{ height: 1, background: "var(--border)" }}
      />
    </section>
  );
}
