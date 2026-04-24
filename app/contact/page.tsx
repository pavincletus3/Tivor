"use client";

import { Container } from "@/components/layout/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SITE } from "@/lib/content";

const SOCIALS = [
  { label: "LinkedIn", href: SITE.linkedin },
  { label: "Instagram", href: SITE.instagram },
];

export default function ContactPage() {
  return (
    <main className="pt-24 md:pt-28">
      {/* Hero — heading left, form right */}
      <section className="py-24 md:py-40 border-b border-border">
        <Container>
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
            {/* Left: heading + tagline */}
            <div className="md:sticky md:top-32">
              <h1
                style={{
                  fontSize: "clamp(4rem, 10vw, 10rem)",
                  fontWeight: 500,
                  lineHeight: 0.9,
                  letterSpacing: "-0.05em",
                  color: "var(--fg)",
                  margin: "0 0 2rem",
                }}
              >
                say hi.
              </h1>
              <p
                style={{
                  fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                  color: "var(--muted)",
                  lineHeight: 1.6,
                }}
              >
                Got a project? A problem? A half-baked idea at 11pm?
                <br />
                We&apos;re into it. Let&apos;s talk.
              </p>
            </div>

            {/* Right: form */}
            <ScrollReveal delay={0.15}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const data = new FormData(form);
                  window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(data.get("subject") as string)}&body=${encodeURIComponent(data.get("message") as string)}`;
                }}
              >
                {[
                  { name: "name", label: "Name", type: "text" },
                  { name: "subject", label: "Subject", type: "text" },
                ].map((field) => (
                  <div key={field.name} className="mb-6">
                    <label
                      htmlFor={field.name}
                      className="block font-mono text-[11px] tracking-widest uppercase text-muted mb-2"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {field.label}
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      required
                      className="w-full bg-transparent border-b border-border py-3 text-fg text-[16px] outline-none focus:border-fg transition-colors"
                      style={{ fontFamily: "var(--font-sans)" }}
                    />
                  </div>
                ))}

                <div className="mb-8">
                  <label
                    htmlFor="message"
                    className="block font-mono text-[11px] tracking-widest uppercase text-muted mb-2"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full bg-transparent border-b border-border py-3 text-fg text-[16px] outline-none focus:border-fg transition-colors resize-none"
                    style={{ fontFamily: "var(--font-sans)" }}
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full border border-fg text-fg font-medium text-[14px] transition-colors hover:bg-fg hover:text-bg"
                >
                  Send message
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </form>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* Contact columns */}
      <section className="py-20 md:py-32">
        <Container>
          <div className="grid md:grid-cols-3 gap-px" style={{ background: "var(--border)" }}>
            {/* Email */}
            <ScrollReveal className="bg-elev">
              <div className="p-8 md:p-10">
                <p
                  className="font-mono text-[11px] tracking-widest uppercase text-muted mb-4"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Email
                </p>
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-fg hover:text-muted transition-colors"
                  style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)", fontWeight: 400, letterSpacing: "-0.01em" }}
                >
                  {SITE.email}
                </a>
              </div>
            </ScrollReveal>

            {/* Phone */}
            <ScrollReveal delay={0.1} className="bg-elev">
              <div className="p-8 md:p-10">
                <p
                  className="font-mono text-[11px] tracking-widest uppercase text-muted mb-4"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Phone
                </p>
                <a
                  href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                  className="text-fg hover:text-muted transition-colors"
                  style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)", fontWeight: 400, letterSpacing: "-0.01em" }}
                >
                  {SITE.phone}
                </a>
              </div>
            </ScrollReveal>

            {/* Socials */}
            <ScrollReveal delay={0.2} className="bg-elev">
              <div className="p-8 md:p-10">
                <p
                  className="font-mono text-[11px] tracking-widest uppercase text-muted mb-4"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Socials
                </p>
                <div className="flex flex-col gap-2">
                  {SOCIALS.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-fg hover:text-muted transition-colors"
                      style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)", fontWeight: 400, letterSpacing: "-0.01em" }}
                    >
                      {s.label} ↗
                    </a>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>
    </main>
  );
}
