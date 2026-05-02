"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SITE } from "@/lib/content";

const SOCIALS = [
  { label: "LinkedIn", href: SITE.linkedin },
  { label: "Instagram", href: SITE.instagram },
];

type Status = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setName("");
      setEmail("");

      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  const fields = [
    { name: "name",    label: "Name",    type: "text",  value: name,    onChange: setName },
    { name: "email",   label: "Email",   type: "email", value: email,   onChange: setEmail },
  ];

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
              {status === "success" ? (
                <div style={{ paddingTop: "1rem" }}>
                  <p
                    style={{
                      fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                      fontWeight: 500,
                      letterSpacing: "-0.03em",
                      color: "var(--fg)",
                      margin: "0 0 1rem",
                    }}
                  >
                    Message sent.
                  </p>
                  <p style={{ fontSize: "1rem", color: "var(--muted)", lineHeight: 1.7 }}>
                    We&apos;ll be in touch — check your inbox for a confirmation.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {fields.map((field) => (
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
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
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
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-transparent border-b border-border py-3 text-fg text-[16px] outline-none focus:border-fg transition-colors resize-none"
                      style={{ fontFamily: "var(--font-sans)" }}
                    />
                  </div>

                  {status === "error" && (
                    <p
                      className="mb-4 text-[13px]"
                      style={{ color: "var(--muted)", fontFamily: "var(--font-mono)" }}
                    >
                      Something went wrong — please try again.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full border border-fg text-fg font-medium text-[14px] transition-colors hover:bg-fg hover:text-bg disabled:opacity-50"
                  >
                    {status === "loading" ? "Sending…" : "Send message"}
                    {status !== "loading" && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    )}
                  </button>
                </form>
              )}
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* Contact columns */}
      <section className="py-20 md:py-32">
        <Container>
          <div className="grid md:grid-cols-2 gap-px" style={{ background: "var(--border)" }}>
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
