"use client";

import { DependencyList, RefObject } from "react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

export function useGsapContext(
  fn: (context: gsap.Context) => void | (() => void),
  scope: RefObject<HTMLElement | null>,
  deps: DependencyList = []
) {
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      fn(self);
    }, scope);

    return () => {
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
