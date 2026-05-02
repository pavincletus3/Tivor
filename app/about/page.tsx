import { Mission } from "@/components/about/Mission";
import { Services } from "@/components/about/Services";
import { Process } from "@/components/about/Process";
import { CEONote } from "@/components/about/CEONote";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import type { Metadata } from "next";
import { SERVICES, SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Tivor is an AI consulting company building custom AI systems for manufacturing, procurement, and HR. We design intelligence that powers real operations — not demos.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About — Tivor",
    description:
      "Custom AI systems for manufacturing, procurement, and HR operations. Built from the ground up — not off a shelf.",
    url: "/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@Tivor_X",
    creator: "@Tivor_X",
    title: "About — Tivor",
    description:
      "Custom AI systems for manufacturing, procurement, and HR operations. Built from the ground up — not off a shelf.",
  },
};

export default function AboutPage() {
  return (
    <main className="pt-24 md:pt-28">
      <Mission />
      <Services />
      <Process />
      <CEONote />
      <ClosingCTA />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Tivor AI Services",
            itemListElement: SERVICES.map((service, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: {
                "@type": "Service",
                name: service.title,
                description: service.description,
                provider: { "@type": "Organization", name: "Tivor", url: SITE.url },
              },
            })),
          }),
        }}
      />
    </main>
  );
}
