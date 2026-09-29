"use client";

import { useRef } from "react";
import { Input, Select } from "antd";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/hooks/useIsoLayoutEffect";

export default function Toolbar({ query, onQuery, genre, onGenre, genres }) {
  const root = useRef(null);

  useIsoLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-tool]", {
        y: 18,
        autoAlpha: 0,
        duration: 0.7,
        stagger: 0.1,
        delay: 0.7,
        ease: "power3.out",
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="mt-7 mb-8 flex flex-wrap gap-3">
      <div data-tool className="min-w-[260px] flex-[1_1_260px]">
        <Input
          size="large"
          allowClear
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Search by title or author"
          aria-label="Search books"
        />
      </div>
      <div data-tool className="flex-[0_1_200px]">
        <Select
          size="large"
          className="w-full min-w-[200px]"
          value={genre}
          onChange={onGenre}
          aria-label="Filter by genre"
          options={[
            { value: "", label: "All genres" },
            ...genres.map((g) => ({ value: g, label: g })),
          ]}
        />
      </div>
    </div>
  );
}
