"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SERVICES } from "@/lib/content";

export function Services() {
  const ref = useRef<HTMLElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
          {SERVICES.map((service, i) => {
            const isHovered = hoveredIndex === i;
            const isDimmed = hoveredIndex !== null && !isHovered;

            return (
              <ScrollReveal key={service.title} delay={i * 0.08}>
                <div
                  className="relative overflow-hidden border-b border-border last:border-0"
                  style={{
                    padding: isHovered ? "3.5rem 0" : "2rem 0",
                    transition: "padding 0.55s cubic-bezier(0.16, 1, 0.3, 1)",
                    cursor: "default",
                  }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Ghost number watermark */}
                  <span
                    style={{
                      position: "absolute",
                      right: 0,
                      top: "50%",
                      transform: `translateY(-50%) scale(${isHovered ? 1 : 0.75})`,
                      fontSize: "clamp(6rem, 10vw, 11rem)",
                      fontWeight: 700,
                      color: "transparent",
                      WebkitTextStroke: "1px color-mix(in srgb, var(--fg) 8%, transparent)",
                      opacity: isHovered ? 1 : 0,
                      transition: "opacity 0.5s ease, transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)",
                      lineHeight: 1,
                      userSelect: "none",
                      pointerEvents: "none",
                      letterSpacing: "-0.05em",
                    }}
                  >
                    0{i + 1}
                  </span>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1.5rem",
                      position: "relative",
                      opacity: isDimmed ? 0.3 : 1,
                      transition: "opacity 0.35s ease",
                    }}
                  >
                    {/* Number */}
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 12,
                        color: "var(--muted)",
                        width: 32,
                        flexShrink: 0,
                        opacity: isHovered ? 0 : 1,
                        transition: "opacity 0.25s ease",
                      }}
                    >
                      0{i + 1}
                    </span>

                    {/* Text */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3
                        style={{
                          fontSize: "clamp(1.25rem, 2.5vw, 3rem)",
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

                    {/* Image strip reveal — desktop hover only */}
                    <div
                      className="hidden md:block"
                      style={{
                        width: isHovered ? 260 : 0,
                        height: 150,
                        flexShrink: 0,
                        borderRadius: 6,
                        overflow: "hidden",
                        position: "relative",
                        transition: "width 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    >
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        sizes="260px"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </div>

                  {/* Mobile image — always visible, full-width below text */}
                  <div
                    className="block md:hidden"
                    style={{
                      marginTop: "1.25rem",
                      borderRadius: 6,
                      overflow: "hidden",
                      position: "relative",
                      height: 200,
                    }}
                  >
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="100vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
