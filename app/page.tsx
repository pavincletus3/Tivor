import type { Metadata } from "next";
import { Hero } from "@/components/hero/Hero";
import { Manifesto } from "@/components/home/Manifesto";
import { ProductGrid } from "@/components/home/ProductGrid";
import { HowWeWork } from "@/components/home/HowWeWork";
import { ClosingCTA } from "@/components/home/ClosingCTA";

export const metadata: Metadata = {
  title: {
    absolute: "Tivor — Strategic AI Systems",
  },
  description:
    "Tivor builds strategic AI systems for manufacturing, procurement, and HR — not generic tools. Custom intelligence designed around your real operations.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Tivor — Strategic AI Systems",
    description:
      "Tivor builds strategic AI systems for manufacturing, procurement, and HR — not generic tools.",
    url: "/",
    type: "website",
  },
  twitter: {
    title: "Tivor — Strategic AI Systems",
    description:
      "Tivor builds strategic AI systems for manufacturing, procurement, and HR — not generic tools.",
  },
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Manifesto />
      <ProductGrid />
      <HowWeWork />
      <ClosingCTA />
    </main>
  );
}
