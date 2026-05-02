"use client";

import { useState, useRef, useEffect } from "react";
import { Container } from "@/components/layout/Container";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useGsapContext } from "@/components/motion/useGsapContext";
import { useIsomorphicLayoutEffect } from "@/components/motion/useIsomorphicLayoutEffect";
import { prefersReducedMotion } from "@/lib/reducedMotion";

const ROLES = [
  { id: "fullstack", label: "Full Stack Engineer", description: "Build end-to-end systems across frontend, backend, and infra. Next.js, Python, Supabase, cloud. You care about performance and clean APIs." },
  { id: "ml", label: "ML Developer", description: "Design and deploy ML pipelines embedded in real operations. Production models, not notebooks — fine-tuning, inference optimization, real data." },
  { id: "frontend", label: "Frontend Developer", description: "Craft interfaces that feel alive — GSAP, scroll-driven experiences, pixel-perfect systems. Motion is UX, not decoration." },
  { id: "sales", label: "Sales", description: "Take Tivor's solutions to market. Enterprise discovery, complex B2B, closing deals. Explain AI value without jargon." },
  { id: "hr", label: "HR", description: "Build the people infrastructure behind a fast-moving firm — pipelines, culture, onboarding. Talent is the real product." },
  { id: "pm", label: "Project Manager", description: "Run delivery for AI system builds — engineers, clients, timelines. Thrive in ambiguity. Keep complex projects moving." },
];

type Status = "idle" | "loading" | "success" | "error";

const MAX_FILE_BYTES = 3 * 1024 * 1024;

export function CareersForm() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [hoveredRole, setHoveredRole] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const formFieldsRef = useRef<HTMLDivElement>(null);
  const dropzoneRef = useRef<HTMLDivElement>(null);
  const defaultDescRef = useRef<HTMLParagraphElement>(null);
  const roleDescRef = useRef<HTMLParagraphElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeRole = hoveredRole ?? selectedRole ?? null;
  const activeRoleData = ROLES.find((r) => r.id === activeRole) ?? null;

  // Hide roleDesc before first paint so React never races GSAP
  useIsomorphicLayoutEffect(() => {
    if (roleDescRef.current) {
      roleDescRef.current.style.opacity = "0";
      roleDescRef.current.style.visibility = "hidden";
    }
  }, []);

  // Crossfade description on activeRole change
  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!defaultDescRef.current || !roleDescRef.current) return;

    // Kill any in-flight tweens before starting new ones to prevent overlap on rapid hover
    gsap.killTweensOf([defaultDescRef.current, roleDescRef.current]);

    if (activeRole) {
      gsap.to(defaultDescRef.current, { autoAlpha: 0, y: -12, duration: 0.25 });
      gsap.to(roleDescRef.current, { autoAlpha: 1, y: 0, duration: 0.35, delay: 0.15 });
    } else {
      gsap.to(roleDescRef.current, { autoAlpha: 0, y: -12, duration: 0.25 });
      gsap.to(defaultDescRef.current, { autoAlpha: 1, y: 0, duration: 0.35, delay: 0.15 });
    }
  }, [activeRole]);

  // GSAP entrance animations
  useGsapContext(
    () => {
      if (prefersReducedMotion()) return;

      // Set initial state for role desc
      gsap.set(roleDescRef.current, { autoAlpha: 0 });

      // Heading char reveal
      async function animateHeading() {
        const SplitType = (await import("split-type")).default;
        if (!h1Ref.current) return;
        const split = new SplitType(h1Ref.current, { types: "chars" });
        gsap.from(split.chars, {
          autoAlpha: 0,
          yPercent: 110,
          rotation: -25,
          duration: 0.8,
          delay: 0.3,
          ease: "power4.out",
          stagger: { each: 0.03 },
        });
        return () => split.revert();
      }
      animateHeading();

      // Form fields stagger — trigger as soon as any part enters the viewport
      gsap.from(".careers-field", {
        autoAlpha: 0,
        y: 24,
        duration: 0.7,
        ease: "power3.out",
        stagger: { each: 0.08 },
        scrollTrigger: {
          trigger: formFieldsRef.current,
          start: "top bottom",
          once: true,
        } as ScrollTrigger.Vars,
      });
    },
    sectionRef,
    []
  );

  function handleFileChange(f: File | null) {
    if (!f) return;
    if (f.size > MAX_FILE_BYTES) {
      alert("File must be under 3 MB.");
      return;
    }
    setFile(f);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0] ?? null;
    handleFileChange(dropped);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedRole) { alert("Please select a role."); return; }
    if (!file) { alert("Please attach your resume."); return; }

    setStatus("loading");

    try {
      const fileBase64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          resolve(result.split(",")[1]);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const roleData = ROLES.find((r) => r.id === selectedRole)!;

      const res = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          role: selectedRole,
          roleLabel: roleData.label,
          message,
          fileName: file.name,
          fileType: file.type,
          fileBase64,
        }),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      setName(""); setEmail(""); setPhone(""); setMessage("");
      setFile(null); setSelectedRole(null);
    } catch {
      setStatus("error");
    }
  }

  return (
    <section ref={sectionRef} className="py-24 md:py-40 border-b border-border">
      <Container>
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">

          {/* Left: sticky heading + description swap */}
          <div className="md:sticky md:top-32">
            <div ref={headingRef} style={{ overflow: "hidden" }}>
              <h1
                ref={h1Ref}
                style={{
                  fontSize: "clamp(5rem, 12vw, 11rem)",
                  fontWeight: 500,
                  lineHeight: 0.9,
                  letterSpacing: "-0.05em",
                  color: "var(--fg)",
                  margin: "0 0 2rem",
                  fontFamily: "var(--font-display)",
                }}
              >
                join us.
              </h1>
            </div>

            <div style={{ position: "relative", minHeight: "9rem" }}>
              <p
                ref={defaultDescRef}
                style={{
                  position: "absolute",
                  fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                  color: "var(--muted)",
                  lineHeight: 1.6,
                }}
              >
                We build AI systems that change how businesses operate.
                <br />
                Hover a role to see what you&apos;d be working on.
              </p>
              <p
                ref={roleDescRef}
                style={{
                  position: "absolute",
                  fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                  color: "var(--muted)",
                  lineHeight: 1.6,
                }}
              >
                {activeRoleData?.description ?? ""}
              </p>
            </div>
          </div>

          {/* Right: form */}
          <div>
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
                  Application sent.
                </p>
                <p style={{ fontSize: "1rem", color: "var(--muted)", lineHeight: 1.7 }}>
                  We&apos;ll review your application and be in touch — check your inbox for a confirmation.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Role pills */}
                <div className="careers-field mb-8">
                  <p
                    className="block font-mono text-[11px] tracking-widest uppercase text-muted mb-3"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    Role
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {ROLES.map((role) => {
                      const isActive = selectedRole === role.id;
                      return (
                        <button
                          key={role.id}
                          type="button"
                          onMouseEnter={() => setHoveredRole(role.id)}
                          onMouseLeave={() => setHoveredRole(null)}
                          onClick={() => setSelectedRole(isActive ? null : role.id)}
                          className="px-4 py-2 rounded-full border text-[13px] font-medium transition-all duration-200"
                          style={{
                            background: isActive ? "var(--fg)" : "transparent",
                            color: isActive ? "var(--bg)" : "var(--fg)",
                            borderColor: isActive ? "var(--fg)" : "var(--border)",
                            cursor: "pointer",
                          }}
                        >
                          {role.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Text fields */}
                <div ref={formFieldsRef}>
                  {[
                    { id: "name", label: "Name", type: "text", value: name, onChange: setName, required: true },
                    { id: "email", label: "Email", type: "email", value: email, onChange: setEmail, required: true },
                    { id: "phone", label: "Phone", type: "tel", value: phone, onChange: setPhone, required: true },
                  ].map((field) => (
                    <div key={field.id} className="careers-field mb-6">
                      <label
                        htmlFor={field.id}
                        className="block font-mono text-[11px] tracking-widest uppercase text-muted mb-2"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        {field.label}
                      </label>
                      <input
                        id={field.id}
                        name={field.id}
                        type={field.type}
                        required={field.required}
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        className="w-full bg-transparent border-b border-border py-3 text-fg text-[16px] outline-none focus:border-fg transition-colors"
                        style={{ fontFamily: "var(--font-sans)" }}
                      />
                    </div>
                  ))}

                  <div className="careers-field mb-8">
                    <label
                      htmlFor="message"
                      className="block font-mono text-[11px] tracking-widest uppercase text-muted mb-2"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      Message <span style={{ opacity: 0.5 }}>(optional)</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-transparent border-b border-border py-3 text-fg text-[16px] outline-none focus:border-fg transition-colors resize-none"
                      style={{ fontFamily: "var(--font-sans)" }}
                    />
                  </div>
                </div>

                {/* Dropzone */}
                <div
                  ref={dropzoneRef}
                  className="careers-field mb-8"
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    border: `1.5px dashed ${dragOver ? "var(--fg)" : "var(--border)"}`,
                    borderRadius: "12px",
                    padding: "2rem",
                    cursor: "pointer",
                    transition: "border-color 0.2s",
                    textAlign: "center",
                  }}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    style={{ display: "none" }}
                    onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
                  />
                  {file ? (
                    <div>
                      <p className="text-[14px] text-fg font-medium">{file.name}</p>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setFile(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                        className="mt-2 text-[12px] text-muted hover:text-fg transition-colors"
                        style={{ fontFamily: "var(--font-mono)", background: "none", border: "none", cursor: "pointer" }}
                      >
                        Change file
                      </button>
                    </div>
                  ) : (
                    <div>
                      <p className="text-[14px] text-muted">
                        Drop your resume here or <span style={{ color: "var(--fg)", textDecoration: "underline" }}>browse</span>
                      </p>
                      <p className="mt-1 text-[11px] text-muted" style={{ fontFamily: "var(--font-mono)" }}>
                        PDF, DOC, DOCX — max 3 MB
                      </p>
                    </div>
                  )}
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
                  {status === "loading" ? "Sending…" : "Submit application"}
                  {status !== "loading" && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
