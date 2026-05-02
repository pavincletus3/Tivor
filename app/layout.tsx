import type { Metadata, Viewport } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { ThemeScript } from "./theme-script";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { FloatingCTA } from "@/components/layout/FloatingCTA";
import { SITE } from "@/lib/content";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Tivor — Strategic AI Systems",
    template: "%s | Tivor",
  },
  description:
    "Strategic AI Systems, Not Generic Tools. Tivor deploys purpose-built AI systems for manufacturing, procurement, and HR operations — not generic tools.",
  keywords: [
    "AI consulting",
    "strategic AI systems",
    "manufacturing AI",
    "procurement AI",
    "HR AI",
    "custom AI solutions",
    "operational AI",
    "AI integration",
    "ManufAI",
    "ProcureAI",
  ],
  authors: [{ name: "Tivor", url: SITE.url }],
  creator: "Tivor",
  publisher: "Tivor",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "Tivor",
    title: "Tivor — Strategic AI Systems",
    description:
      "Strategic AI Systems, Not Generic Tools. Purpose-built AI for manufacturing, procurement, and HR.",
    url: "/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tivor — Strategic AI Systems",
    description:
      "Strategic AI Systems, Not Generic Tools. Purpose-built AI for manufacturing, procurement, and HR.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${bebasNeue.variable}`} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider>
          <LenisProvider>
            <Nav />
            <div className="flex-1 flex flex-col">{children}</div>
            <Footer />
            <FloatingCTA />
          </LenisProvider>
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Tivor",
              url: SITE.url,
              logo: `${SITE.url}/logo.png`,
              description:
                "Strategic AI Systems, Not Generic Tools. Tivor builds purpose-built AI systems for manufacturing, procurement, and HR operations.",
              email: SITE.email,
              sameAs: [SITE.linkedin, SITE.instagram],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer support",
                email: SITE.email,
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
