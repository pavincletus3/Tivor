"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function FloatingCTA() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (pathname === "/contact") return;

    const onScroll = () => {
      const scrollY = window.scrollY;
      const winH = window.innerHeight;

      if (scrollY <= 320) {
        setVisible(false);
        return;
      }

      /* Hide as soon as the closing-cta section OR footer enters the viewport */
      const cta = document.getElementById("closing-cta");
      const footer = document.querySelector("footer");

      const ctaTop = cta?.getBoundingClientRect().top ?? Infinity;
      const footerTop = footer?.getBoundingClientRect().top ?? Infinity;

      const sectionVisible = ctaTop < winH || footerTop < winH;
      setVisible(!sectionVisible);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  if (pathname === "/contact") return null;

  return (
    <Link
      href="/contact"
      aria-label="Get in touch"
      style={{
        background: "var(--fg)",
        color: "var(--bg)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.22)",
      }}
      className={`fixed bottom-6 right-6 z-50 inline-flex items-center gap-2.5 px-5 py-3 rounded-full font-medium text-[14px] transition-all duration-300 ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      Get in touch
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    </Link>
  );
}
