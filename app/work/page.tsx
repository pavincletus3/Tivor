import { Container } from "@/components/layout/Container";
import { CaseStudyCard } from "@/components/work/CaseStudyCard";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { PRODUCTS } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work — Tivor",
  description: "AI systems built for real operations.",
};

export default function WorkPage() {
  return (
    <main className="pt-28">
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
          />
        ))}
      </Container>

      <ClosingCTA />
    </main>
  );
}
