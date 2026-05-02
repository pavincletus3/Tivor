import type { Metadata } from "next";
import { CareersForm } from "@/components/careers/CareersForm";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Tivor and help build strategic AI systems. Apply for open roles in engineering, ML, design, sales, and more.",
  alternates: {
    canonical: "/careers",
  },
  openGraph: {
    title: "Careers — Tivor",
    description:
      "Join Tivor. We're building strategic AI systems and looking for engineers, designers, and operators to do it with.",
    url: "/careers",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@Tivor_X",
    creator: "@Tivor_X",
    title: "Careers — Tivor",
    description:
      "Join Tivor. We're building strategic AI systems and looking for engineers, designers, and operators to do it with.",
  },
};

export default function CareersPage() {
  return (
    <main className="pt-24 md:pt-28">
      <CareersForm />
    </main>
  );
}
