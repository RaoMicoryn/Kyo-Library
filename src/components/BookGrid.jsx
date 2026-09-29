"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/hooks/useIsoLayoutEffect";
import BookCard from "./BookCard";

export default function BookGrid({ books, total, ready, onView, onEdit, onDelete }) {
  const root = useRef(null);
  // Re-run the reveal whenever the visible set of books changes
  const key = ready ? books.map((b) => b.id).join("|") + "#" + total : "";

  useIsoLayoutEffect(() => {
    if (!ready || prefersReducedMotion()) return;
    const items = root.current.querySelectorAll("[data-card]");
    if (!items.length) return;

    const ctx = gsap.context(() => {
      gsap.set(items, { autoAlpha: 0, y: 44 });
      ScrollTrigger.batch(items, {
        start: "top 92%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            stagger: 0.08,
            overwrite: true,
          }),
      });
    }, root);

    return () => ctx.revert();
  }, [key, ready]);

  return (
    <main
      ref={root}
      className="grid min-h-[200px] grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-6"
    >
      {ready && books.length === 0 && (
        <div data-card className="col-span-full py-[72px] text-center text-muted">
          <h2 className="mb-2 font-serif text-[2rem] font-normal text-fg">
            {total ? "No matches" : "The shelf is empty"}
          </h2>
          <p>
            {total
              ? "Try a different title, author, or genre."
              : "Add your first book to get started."}
          </p>
        </div>
      )}
      {books.map((b) => (
        <BookCard key={b.id} book={b} onView={onView} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </main>
  );
}
