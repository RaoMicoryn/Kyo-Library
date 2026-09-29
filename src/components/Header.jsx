"use client";

import { useRef } from "react";
import { Button } from "antd";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/hooks/useIsoLayoutEffect";
import { useTheme } from "./ThemeProvider";

const TITLE_LINES = ["Book Collection", "Manager"];

export default function Header({ count, onAdd }) {
  const root = useRef(null);
  const { theme, toggle } = useTheme();

  useIsoLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-line]", {
        yPercent: 110,
        duration: 1,
        stagger: 0.09,
      }).from("[data-sub]", { y: 16, autoAlpha: 0, duration: 0.7 }, "-=0.6");

      // Parallax: the title drifts slower than the page and fades out
      gsap.to("[data-parallax]", {
        y: 60,
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={root}
      className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-7"
    >
      <div data-parallax>
        <h1 className="mb-3 font-serif text-[clamp(2.4rem,6vw,3.8rem)] leading-none font-normal tracking-[-0.01em]">
          {TITLE_LINES.map((line) => (
            <span key={line} className="block overflow-hidden pb-[0.08em]">
              <span data-line className="block">
                {line}
              </span>
            </span>
          ))}
        </h1>
        <p data-sub className="max-w-[46ch] text-muted">
          Every book you&apos;ve read, borrowed, or want to brag about, kept on
          one shelf. <b className="font-medium text-fg">{count}</b>
        </p>
      </div>
      <div data-actions className="flex items-center gap-2.5">
        <Button
          type="text"
          shape="round"
          onClick={toggle}
          style={{ color: "var(--muted)" }}
        >
          {theme === "light" ? "Dark mode" : "Light mode"}
        </Button>
        <Button type="primary" shape="round" onClick={onAdd}>
          + Add a book
        </Button>
      </div>
    </header>
  );
}
