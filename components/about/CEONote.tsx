import { Container } from "@/components/layout/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

export function CEONote() {
  return (
    <section className="py-24 md:py-36">
      <Container>
        <div className="max-w-[720px]">
          <ScrollReveal>
            <p
              className="font-mono text-[11px] tracking-[0.1em] uppercase text-[var(--muted)] mb-8"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              A note from the founder
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <blockquote
              style={{
                fontSize: "clamp(1.25rem, 2.5vw, 2rem)",
                fontWeight: 400,
                lineHeight: 1.5,
                letterSpacing: "-0.01em",
                color: "var(--fg)",
                margin: "0 0 2rem",
                fontStyle: "italic",
              }}
            >
              &ldquo;Tivor is a consulting and AI firm where we delve deep into
              industries, note requirements ourselves — and we don&apos;t stop
              with a PowerPoint. We actually deploy strategic AI-powered
              systems.&rdquo;
            </blockquote>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="flex items-center gap-4">
              <div
                className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[13px] font-medium text-[var(--fg)]"
                style={{ background: "var(--elev)" }}
              >
                T
              </div>
              <div>
                <p className="font-medium text-[var(--fg)] text-[14px]">
                  Founder, Tivor
                </p>
                <p
                  className="text-[var(--muted)] text-[12px]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  info@tivor.us
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
