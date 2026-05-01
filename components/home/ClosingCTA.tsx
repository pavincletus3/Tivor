"use client";

import Link from "next/link";
import { useRef } from "react";
import { Container } from "@/components/layout/Container";
import { LogoMarquee } from "@/components/motion/LogoMarquee";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { gsap } from "@/lib/gsap";
import { useGsapContext } from "@/components/motion/useGsapContext";
import { prefersReducedMotion } from "@/lib/reducedMotion";

export function ClosingCTA() {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  /* Magnetic button */
  useGsapContext(
    () => {
      if (prefersReducedMotion() || !btnRef.current) return;
      const btn = btnRef.current;

      const xTo = gsap.quickTo(btn, "x", { duration: 0.6, ease: "power3.out" });
      const yTo = gsap.quickTo(btn, "y", { duration: 0.6, ease: "power3.out" });

      const onMove = (e: MouseEvent) => {
        const r = btn.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 80) {
          xTo(dx * 0.4);
          yTo(dy * 0.4);
        } else {
          xTo(0);
          yTo(0);
        }
      };

      window.addEventListener("mousemove", onMove);
      return () => window.removeEventListener("mousemove", onMove);
    },
    sectionRef,
    []
  );

  return (
    <section
      ref={sectionRef}
      className="py-40 border-t border-[var(--border)]"
      style={{ background: "var(--bg)" }}
    >
      <Container className="text-center">
        <ScrollReveal>
          <p
            className="font-mono text-[11px] tracking-[0.1em] uppercase text-[var(--muted)] mb-8"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Ready to start
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2
            style={{
              fontSize: "clamp(2.5rem, 7vw, 8rem)",
              fontWeight: 500,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              color: "var(--fg)",
              margin: "0 0 3rem",
            }}
          >
            Let&apos;s start
            <br />
            creating together
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <Link
            ref={btnRef}
            href="/contact"
            className="cta-btn inline-flex items-center gap-3 px-8 py-4 rounded-full border border-fg text-fg font-medium text-[15px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            style={{ display: "inline-flex" }}
          >
            Get in touch
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </ScrollReveal>
      </Container>

      {/* Logo marquee strip */}
      <div className="mt-24">
        <LogoMarquee />
      </div>
    </section>
  );
}
