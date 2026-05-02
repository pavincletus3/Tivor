import { Container } from "@/components/layout/Container";
import { CaseStudyCard } from "@/components/work/CaseStudyCard";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { PRODUCTS, SITE } from "@/lib/content";
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
    card: "summary_large_image",
    site: "@Tivor_X",
    creator: "@Tivor_X",
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
            Featured Works
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Tivor AI Systems",
            description: "Purpose-built AI systems for manufacturing, procurement, and HR operations.",
            url: `${SITE.url}/work`,
            itemListElement: PRODUCTS.map((product, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "SoftwareApplication",
                name: product.name,
                description: product.description,
                applicationCategory: "BusinessApplication",
                operatingSystem: "Web",
                offers: {
                  "@type": "Offer",
                  availability: "https://schema.org/InStock",
                },
                creator: {
                  "@type": "Organization",
                  name: "Tivor",
                  url: SITE.url,
                },
              },
            })),
          }),
        }}
      />
    </main>
  );
}
