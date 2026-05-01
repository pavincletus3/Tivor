import { Container } from "@/components/layout/Container";
import { CaseStudyCard } from "@/components/work/CaseStudyCard";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { PRODUCTS } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Explore Tivor's AI systems built for real operations — ManufAI, ProcureAI, Intercom, and JobReady. Each system is purpose-built for a specific operational domain.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Work — Tivor",
    description:
      "AI systems built for real operations: manufacturing feasibility, procurement intelligence, internal comms, and workforce simulation.",
    url: "/work",
    type: "website",
  },
  twitter: {
    title: "Work — Tivor",
    description:
      "AI systems built for real operations: ManufAI, ProcureAI, Intercom, and JobReady.",
  },
};

export default function WorkPage() {
  return (
    <main className="pt-24 md:pt-28">
      <Container>
        <div className="py-16 border-b border-[var(--border)]">
          <p
            className="font-mono text-[11px] tracking-[0.1em] uppercase text-[var(--muted)] mb-4"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Selected Work
          </p>
          <h1
            style={{
              fontSize: "clamp(4rem, 10vw, 10rem)",
              fontWeight: 500,
              lineHeight: 0.9,
              letterSpacing: "-0.05em",
              color: "var(--fg)",
            }}
          >
            Our Work
          </h1>
        </div>

        {PRODUCTS.map((product, i) => (
          <CaseStudyCard
            key={product.id}
            id={product.slug}
            name={product.name}
            label={product.label}
            description={product.description}
            sector={product.sector}
            year={product.year}
            index={i}
            image={product.image}
          />
        ))}
      </Container>

      <ClosingCTA />
    </main>
  );
}
