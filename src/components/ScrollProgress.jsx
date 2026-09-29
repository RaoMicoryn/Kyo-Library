"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/hooks/useIsoLayoutEffect";

export default function ScrollProgress() {
  const bar = useRef(null);

  useIsoLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        bar.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={bar}
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[1100] h-0.5 origin-left scale-x-0 bg-fg"
    />
  );
}
