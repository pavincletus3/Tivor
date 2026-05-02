import type { Metadata } from "next";
import { CareersForm } from "@/components/careers/CareersForm";

export const metadata: Metadata = {
  title: "Careers — Tivor",
  description:
    "Join Tivor and help build strategic AI systems. Apply for open roles in engineering, ML, design, sales, and more.",
};

export default function CareersPage() {
  return (
    <main className="pt-24 md:pt-28">
      <CareersForm />
    </main>
  );
}
