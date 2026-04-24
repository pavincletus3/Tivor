import { Mission } from "@/components/about/Mission";
import { Services } from "@/components/about/Services";
import { Process } from "@/components/about/Process";
import { CEONote } from "@/components/about/CEONote";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Tivor",
  description:
    "Building AI Systems That Power Real Operations.",
};

export default function AboutPage() {
  return (
    <main className="pt-28">
      <Mission />
      <Services />
      <Process />
      <CEONote />
      <ClosingCTA />
    </main>
  );
}
