import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeScript } from "./theme-script";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tivor — Strategic AI Systems",
  description:
    "Strategic AI Systems, Not Generic Tools. We deploy AI-powered systems that drive real operational decisions.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body
        className="min-h-screen flex flex-col"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        <ThemeProvider>
          <LenisProvider>
            <Nav />
            <div className="flex-1 flex flex-col">{children}</div>
            <Footer />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
