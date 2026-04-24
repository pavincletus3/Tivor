"use client";

import { useRef } from "react";
import { Container } from "@/components/layout/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { HOW_WE_WORK } from "@/lib/content";

export function Process() {
  return (
    <section className="py-24 md:py-36 border-b border-[var(--border)]">
      <Container>
        <ScrollReveal>
          <p
            className="font-mono text-[11px] tracking-[0.1em] uppercase text-[var(--muted)] mb-12"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            How We Work
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-px" style={{ background: "var(--border)" }}>
          {HOW_WE_WORK.map((step, i) => (
            <ScrollReveal key={step.step} delay={i * 0.1} className="bg-elev">
              <div
                className="p-8 md:p-12"
              >
                <p
                  className="text-[var(--muted)] mb-6"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "clamp(3rem, 5vw, 5rem)",
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
                    fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)",
                    fontWeight: 500,
                    letterSpacing: "-0.02em",
                    color: "var(--fg)",
                    marginBottom: "0.75rem",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontSize: "clamp(0.875rem, 1vw, 1rem)",
                    lineHeight: 1.7,
                    color: "var(--muted)",
                  }}
                >
                  {step.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
