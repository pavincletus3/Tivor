"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/reducedMotion";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<import("lenis").default | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    let raf: (time: number) => void;

    async function init() {
      const { default: Lenis } = await import("lenis");
      const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
      lenisRef.current = lenis;

      lenis.on("scroll", () => ScrollTrigger.update());

      raf = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }

    init();

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      if (raf) gsap.ticker.remove(raf);
    };
  }, []);

  return <>{children}</>;
}
