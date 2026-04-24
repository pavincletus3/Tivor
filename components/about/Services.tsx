"use client";

import { useRef } from "react";
import { Container } from "@/components/layout/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SERVICES } from "@/lib/content";

export function Services() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section ref={ref} className="py-24 md:py-36 border-b border-border">
      <Container>
        <ScrollReveal>
          <p
            className="font-mono text-[11px] tracking-widest uppercase text-muted mb-4"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Services
          </p>
          <h2
            style={{
              fontSize: "clamp(3rem, 6vw, 7rem)",
              fontWeight: 500,
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              color: "var(--fg)",
              marginBottom: "4rem",
            }}
          >
            What we build.
          </h2>
        </ScrollReveal>

        <div>
          {SERVICES.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 0.08}>
              <div className="flex flex-col md:flex-row md:items-start gap-6 py-8 border-b border-border last:border-0">
                <span
                  className="text-muted shrink-0 w-8"
                  style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}
                >
                  0{i + 1}
                </span>
                <div className="flex-1">
                  <h3
                    style={{
                      fontSize: "clamp(1.75rem, 2.5vw, 3rem)",
                      fontWeight: 500,
                      letterSpacing: "-0.03em",
                      color: "var(--fg)",
                      marginBottom: "0.75rem",
                      lineHeight: 1.1,
                    }}
                  >
                    {service.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "clamp(0.9rem, 1.1vw, 1rem)",
                      lineHeight: 1.7,
                      color: "var(--muted)",
                      maxWidth: "52ch",
                    }}
                  >
                    {service.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
