import { Hero } from "@/components/hero/Hero";
import { Manifesto } from "@/components/home/Manifesto";
import { ProductGrid } from "@/components/home/ProductGrid";
import { HowWeWork } from "@/components/home/HowWeWork";
import { ClosingCTA } from "@/components/home/ClosingCTA";

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
