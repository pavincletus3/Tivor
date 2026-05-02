"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { useGsapContext } from "@/components/motion/useGsapContext";
import { prefersReducedMotion } from "@/lib/reducedMotion";
import { CARDS } from "./cards.data";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGsapContext(
    () => {
      const reduced = prefersReducedMotion();

      /* 1 — Wordmark char reveal */
      let split: import("split-type").default | null = null;

      const runSplit = async () => {
        const { default: SplitType } = await import("split-type");
        if (!sectionRef.current) return;
        split = new SplitType(".hero-heading", {
          types: "chars,words",
          tagName: "span",
        });

        if (!reduced) {
          gsap.from(".hero-heading .char", {
            autoAlpha: 0,
            yPercent: 100,
            rotation: -30,
            duration: 0.75,
            delay: 0.5,
            ease: "power4.out",
            stagger: { each: 0.025 },
          });
        }
      };

      runSplit();

      /* 2 — Card stagger entry */
      if (!reduced) {
        gsap.from(".canvas-card", {
          duration: 0.75,
          scale: 0.5,
          opacity: 0,
          ease: "back.out",
          delay: 0.75,
          stagger: { from: "random", amount: 1 },
        });
      }

      /* 3 — Mouse parallax */
      const fine = window.matchMedia("(pointer: fine)").matches;
      const strength = window.innerWidth < 768 ? 0.4 : 1.1;

      if (fine && cardsRef.current && !reduced) {
        const xTo = gsap.quickTo(cardsRef.current, "x", {
          duration: 1.2,
          ease: "power3.out",
        });
        const yTo = gsap.quickTo(cardsRef.current, "y", {
          duration: 1.2,
          ease: "power3.out",
        });

        const onMove = (e: MouseEvent) => {
          if (!sectionRef.current) return;
          const r = sectionRef.current.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width / 2);
          const dy = e.clientY - (r.top + r.height / 2);
          xTo(-dx * strength);
          yTo(-dy * strength);
        };

        const onLeave = () => {
          xTo(0);
          yTo(0);
        };

        sectionRef.current?.addEventListener("mousemove", onMove);
        sectionRef.current?.addEventListener("mouseleave", onLeave);

        return () => {
          sectionRef.current?.removeEventListener("mousemove", onMove);
          sectionRef.current?.removeEventListener("mouseleave", onLeave);
          split?.revert();
        };
      }

      return () => {
        split?.revert();
      };
    },
    sectionRef,
    []
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden hero-section"
      style={{ minHeight: "100svh", background: "var(--bg)" }}
      aria-label="Tivor hero"
    >
      {/* Card canvas — all screen sizes */}
      <div
        ref={cardsRef}
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: "auto", willChange: "transform", zIndex: 1 }}
        id="cardsWrap"
      >
        {CARDS.map((card, i) => (
          <Link key={i} className="canvas-card" href={card.href}>
            <span
              className={`tile ${card.tile}`}
              style={{ aspectRatio: card.ar, display: "block", position: "relative" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.img}
                alt=""
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </span>
          </Link>
        ))}
      </div>

      {/* Wordmark */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ pointerEvents: "none", zIndex: 2 }}
      >
        <h1
          className="hero-heading"
          style={{
            fontFamily: "var(--font-bebas)",
            fontWeight: 400,
            fontSize: "clamp(6rem, 18vw, 16rem)",
            lineHeight: 0.95,
            letterSpacing: "0.02em",
            margin: 0,
            color: "var(--fg)",
            overflow: "hidden",
            padding: "0.15em 0 0.2em",
          }}
        >
          TIVOR
        </h1>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[5] pointer-events-none"
        style={{
          height: 220,
          background: "linear-gradient(to bottom, transparent 0%, var(--bg) 100%)",
        }}
      />
    </section>
  );
}
