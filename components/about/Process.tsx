"use client";

import { Container } from "@/components/layout/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { HOW_WE_WORK } from "@/lib/content";

export function Process() {
  return (
    <section className="py-24 md:py-36 border-b border-[var(--border)]">
      <Container>
        <ScrollReveal>
          <p
            className="font-mono text-[11px] tracking-widest uppercase text-muted mb-4"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            How We Work
          </p>
          <h2
            style={{
              fontSize: "clamp(3rem, 6vw, 7rem)",
              fontWeight: 500,
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              color: "var(--fg)",
              marginBottom: "5rem",
            }}
          >
            Four steps.
            <br />
            Real results.
          </h2>
        </ScrollReveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 0,
          }}
        >
          {HOW_WE_WORK.map((step, i) => (
            <ScrollReveal key={step.step} delay={i * 0.1}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0 4rem",
                  padding: "3rem 0",
                  borderTop: "1px solid var(--border)",
                  alignItems: "start",
                }}
                className="how-we-work-row"
              >
                {/* Left: step number + title */}
                <div style={{ display: "flex", alignItems: "baseline", gap: "1.5rem" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      letterSpacing: "0.08em",
                      color: "var(--muted)",
                      flexShrink: 0,
                      paddingTop: "0.35rem",
                    }}
                  >
                    {step.step}
                  </span>
                  <h3
                    style={{
                      fontSize: "clamp(1.4rem, 2.2vw, 2.5rem)",
                      fontWeight: 500,
                      letterSpacing: "-0.03em",
                      lineHeight: 1.1,
                      color: "var(--fg)",
                    }}
                  >
                    {step.title}
                  </h3>
                </div>

                {/* Right: description */}
                <p
                  style={{
                    fontSize: "clamp(0.9rem, 1.1vw, 1rem)",
                    lineHeight: 1.8,
                    color: "var(--muted)",
                    paddingTop: "0.25rem",
                  }}
                >
                  {step.description}
                </p>
              </div>
            </ScrollReveal>
          ))}

          {/* Bottom border */}
          <div style={{ borderTop: "1px solid var(--border)" }} />
        </div>
      </Container>
    </section>
  );
}
