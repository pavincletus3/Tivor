"use client";

import Link from "next/link";
import { useRef } from "react";
import { Container } from "@/components/layout/Container";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useGsapContext } from "@/components/motion/useGsapContext";
import { prefersReducedMotion } from "@/lib/reducedMotion";
import { PRODUCTS } from "@/lib/content";

export function ProductGrid() {
  const ref = useRef<HTMLElement>(null);

  useGsapContext(
    () => {
      if (prefersReducedMotion()) return;

      const cards = gsap.utils.toArray<HTMLElement>(".product-card-inner");
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { scale: 1, opacity: 1 },
          {
            scale: 0.92,
            opacity: 0.6,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top top",
              end: "bottom top",
              scrub: true,
            } as ScrollTrigger.Vars,
          }
        );
      });
    },
    ref,
    []
  );

  return (
    <section ref={ref} style={{ height: `${PRODUCTS.length * 100}vh` }}>
      <Container className="sticky top-0 pt-24 pb-8">
        <p
          className="font-mono text-[11px] tracking-widest uppercase text-muted mb-8"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Selected Work
        </p>
      </Container>

      {PRODUCTS.map((p, i) => (
        <div
          key={p.id}
          className="product-card sticky"
          style={{
            top: `${10 + i * 6}vh`,
            zIndex: 10 + i,
            background: "var(--bg)",
          }}
        >
          <Container>
            <Link href={`/work#${p.slug}`}>
              <div
                className="product-card-inner rounded-2xl overflow-hidden border border-border bg-elev transition-shadow hover:shadow-2xl"
                style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.06)" }}
              >
                {/* Image slot */}
                <div
                  className="w-full bg-border"
                  style={{ aspectRatio: "16/7" }}
                >
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{
                      background: `repeating-linear-gradient(${45 + i * 30}deg, var(--border) 0 8px, var(--elev) 8px 16px)`,
                    }}
                  >
                    <span
                      className="font-mono text-[11px] tracking-widest uppercase text-muted"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {p.name} — Image coming soon
                    </span>
                  </div>
                </div>

                {/* Card footer */}
                <div className="flex items-center justify-between px-6 py-5">
                  <div>
                    <p className="font-medium text-fg text-lg">
                      {p.name}
                    </p>
                    <p
                      className="text-[13px] text-muted mt-0.5"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {p.label}
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className="text-[12px] text-muted"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {p.sector}
                    </p>
                    <p
                      className="text-[12px] text-muted"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {p.year}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </Container>
        </div>
      ))}
    </section>
  );
}
