"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { Container } from "@/components/layout/Container";
import { gsap } from "@/lib/gsap";
import { useGsapContext } from "@/components/motion/useGsapContext";
import { prefersReducedMotion } from "@/lib/reducedMotion";
import { PRODUCTS } from "@/lib/content";

const DOTS = [
  { color: "#FF5F57" }, // red
  { color: "#FEBC2E" }, // yellow
  { color: "#28C840" }, // green
];

export function ProductGrid() {
  const ref = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useGsapContext(
    () => {
      if (prefersReducedMotion()) return;

      const section = ref.current!;
      const cards = gsap.utils.toArray<HTMLElement>(".product-card-inner", section);
      const wrappers = gsap.utils.toArray<HTMLElement>(".product-card", section);
      const n = cards.length;
      const vh = window.innerHeight;
      const isMobile = window.innerWidth < 768;

      if (isMobile) {
        section.style.height = "auto";
        cards.forEach((card) => {
          gsap.from(card, {
            opacity: 0,
            y: 40,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          });
        });
        return;
      }

      const cardBase = 10;
      const cardStep = 6;
      const scrollPx = vh;

      section.style.height = `${n * 100}vh`;

      cards.forEach((card, i) => {
        if (i === n - 1) return;

        gsap.fromTo(
          card,
          { scale: 1, opacity: 1 },
          {
            scale: 0.95,
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: `top+=${(i + 1) * scrollPx}px top`,
              end: `top+=${(i + 2) * scrollPx}px top`,
              scrub: 1,
            },
          }
        );

        for (let j = i + 1; j < n; j++) {
          const fromTop = cardBase + j * cardStep - i * cardStep;
          const toTop = fromTop - cardStep;
          gsap.fromTo(
            wrappers[j],
            { top: `${fromTop}vh` },
            {
              top: `${toTop}vh`,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: `top+=${(i + 1) * scrollPx}px top`,
                end: `top+=${(i + 2) * scrollPx}px top`,
                scrub: 1,
              },
            }
          );
        }
      });
    },
    ref,
    []
  );

  return (
    <section ref={ref} style={{ height: isMobile ? "auto" : `${PRODUCTS.length * 100}vh` }}>
      <Container className="sticky top-0 pt-16 md:pt-24 pb-6 md:pb-8">
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
          className={`product-card${isMobile ? " mb-4" : " sticky"}`}
          style={{
            top: isMobile ? "auto" : `${10 + i * 6}vh`,
            zIndex: 10 + i,
            background: "var(--bg)",
          }}
        >
          <Container>
            <Link href={`/work#${p.slug}`}>
              <div
                className="product-card-inner rounded-2xl overflow-hidden border border-border"
                style={{
                  boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
                  willChange: "transform, opacity",
                  transformOrigin: "top center",
                }}
              >
                {/* Mac-style window chrome — always visible when cards are stacked */}
                <div
                  className="flex items-center justify-between px-4 md:px-5 py-3 md:py-3.5 border-b border-border"
                  style={{ background: "var(--elev)" }}
                >
                  <div className="flex items-center gap-3 md:gap-4 min-w-0">
                    {/* Traffic-light dots */}
                    <div className="flex items-center gap-[5px] shrink-0">
                      {DOTS.map((d) => (
                        <span
                          key={d.color}
                          className="rounded-full"
                          style={{
                            width: 10,
                            height: 10,
                            background: d.color,
                            flexShrink: 0,
                          }}
                        />
                      ))}
                    </div>

                    {/* Thin vertical divider */}
                    <span
                      className="shrink-0"
                      style={{
                        width: 1,
                        height: 16,
                        background: "var(--border)",
                      }}
                    />

                    {/* Index */}
                    <span
                      className="font-mono text-[10px] tracking-widest uppercase text-muted shrink-0"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Name + label */}
                    <div className="min-w-0">
                      <p className="font-semibold text-fg text-sm md:text-base leading-tight truncate">
                        {p.name}
                      </p>
                      <p
                        className="text-[10px] md:text-[11px] text-muted mt-0.5 truncate"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        {p.label}
                      </p>
                    </div>
                  </div>

                  {/* Right meta + arrow */}
                  <div className="flex items-center gap-4 md:gap-5 shrink-0 ml-4">
                    <div className="text-right hidden sm:block">
                      <p
                        className="text-[11px] text-muted"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        {p.sector}
                      </p>
                      <p
                        className="text-[11px] text-muted"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        {p.year}
                      </p>
                    </div>
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-muted shrink-0"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </div>

                {/* Image slot */}
                <div className="w-full">
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={p.name}
                      width={0}
                      height={0}
                      sizes="(max-width: 768px) 100vw, 90vw"
                      className="w-full h-auto"
                    />
                  ) : (
                    <div
                      className="w-full flex items-center justify-center"
                      style={{
                        aspectRatio: "16/7",
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
                  )}
                </div>
              </div>
            </Link>
          </Container>
        </div>
      ))}
    </section>
  );
}
