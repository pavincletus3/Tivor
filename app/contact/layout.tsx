import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Tivor. Have a project, a problem, or a half-baked idea? We're into it. Let's talk about building AI systems for your operations.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact — Tivor",
    description:
      "Get in touch with Tivor to discuss building strategic AI systems for your operations.",
    url: "/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@Tivor_X",
    creator: "@Tivor_X",
    title: "Contact — Tivor",
    description:
      "Get in touch with Tivor to discuss building strategic AI systems for your operations.",
  },
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
