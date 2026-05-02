"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { useGsapContext } from "@/components/motion/useGsapContext";
import { prefersReducedMotion } from "@/lib/reducedMotion";
import { HOW_WE_WORK } from "@/lib/content";

function HowWeWorkDesktop() {
  const outerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGsapContext(
    () => {
      if (prefersReducedMotion() || !trackRef.current || !outerRef.current) return;

      const track = trackRef.current;
      const outer = outerRef.current;

      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth) + "px",
        ease: "none",
        scrollTrigger: {
          trigger: outer,
          start: "top top",
          end: () => "+=" + (track.scrollWidth - window.innerWidth),
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    },
    outerRef,
    []
  );

  return (
    <section
      ref={outerRef}
      style={{
        height: `calc(100vh + ${(HOW_WE_WORK.length + 1) * 40 - 100}vw)`,
        background: "var(--bg)",
        marginTop: "8rem",
        position: "relative",
        zIndex: 20,
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <div
          ref={trackRef}
          className="flex h-full"
          style={{ width: `${(HOW_WE_WORK.length + 1) * 40}vw` }}
        >
          {/* Section label (first panel) */}
          <div
            className="shrink-0 flex items-center px-10 md:px-20"
            style={{ width: "40vw" }}
          >
            <div>
              <p
                className="font-mono text-[11px] tracking-widest uppercase text-muted mb-4"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                How We Work
              </p>
              <h2
                style={{
                  fontSize: "clamp(3rem, 5vw, 6rem)",
                  fontWeight: 500,
                  letterSpacing: "-0.04em",
                  lineHeight: 0.95,
                  color: "var(--fg)",
                }}
              >
                Four steps.
                <br />
                Real results.
              </h2>
            </div>
          </div>

          {/* Steps */}
          {HOW_WE_WORK.map((step) => (
            <div
              key={step.step}
              className="shrink-0 flex flex-col justify-start pt-[20vh] px-10 md:px-16 border-l border-border"
              style={{ width: "40vw" }}
            >
              <p
                className="text-muted mb-6"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "clamp(3rem, 6vw, 6rem)",
                  fontWeight: 500,
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                  opacity: 0.15,
                }}
              >
                {step.step}
              </p>
              <h3
                style={{
                  fontSize: "clamp(2rem, 3.2vw, 3.5rem)",
                  fontWeight: 500,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                  color: "var(--fg)",
                  marginBottom: "1rem",
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)",
                  lineHeight: 1.7,
                  color: "var(--muted)",
                  maxWidth: "36ch",
                }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowWeWorkMobile() {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapContext(
    () => {
      if (prefersReducedMotion() || !sectionRef.current) return;
      const steps = gsap.utils.toArray<HTMLElement>(".hww-step", sectionRef.current);
      steps.forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          x: -20,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    },
    sectionRef,
    []
  );

  return (
    <section
      ref={sectionRef}
      style={{
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
        marginTop: "8rem",
      }}
    >
      {/* Header */}
      <div style={{ padding: "3rem 1.5rem 2rem" }}>
        <p
          className="font-mono text-[11px] tracking-widest uppercase text-muted mb-4"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          How We Work
        </p>
        <h2
          style={{
            fontSize: "clamp(2rem, 9vw, 3rem)",
            fontWeight: 500,
            letterSpacing: "-0.04em",
            lineHeight: 0.95,
            color: "var(--fg)",
          }}
        >
          Four steps.
          <br />
          Real results.
        </h2>
      </div>

      {/* Timeline steps */}
      <div
        style={{
          borderTop: "1px solid var(--border)",
          paddingLeft: "1.5rem",
          borderLeft: "2px solid var(--border)",
          marginLeft: "1.5rem",
        }}
      >
        {HOW_WE_WORK.map((step) => (
          <div
            key={step.step}
            className="hww-step"
            style={{
              padding: "1.75rem 1.5rem 1.75rem 1.25rem",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "0.5rem" }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  color: "var(--muted)",
                  opacity: 0.5,
                  flexShrink: 0,
                }}
              >
                {step.step}
              </span>
              <h3
                style={{
                  fontSize: "clamp(1.1rem, 4.5vw, 1.5rem)",
                  fontWeight: 500,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.15,
                  color: "var(--fg)",
                  margin: 0,
                }}
              >
                {step.title}
              </h3>
            </div>
            <p
              style={{
                fontSize: "0.9rem",
                lineHeight: 1.7,
                color: "var(--muted)",
                paddingLeft: "2rem",
              }}
            >
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function HowWeWork() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  if (isMobile === null) return null;
  return isMobile ? <HowWeWorkMobile /> : <HowWeWorkDesktop />;
}
