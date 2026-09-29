"use client";

import { useRef } from "react";
import { Button } from "antd";
import { gsap } from "@/lib/gsap";
import { metaLine } from "@/lib/books";
import BookCover from "./BookCover";

export default function BookCard({ book, onView, onEdit, onDelete }) {
  const inner = useRef(null);
  const meta = metaLine(book);

  const lift = (y) =>
    gsap.to(inner.current, {
      y,
      duration: 0.35,
      ease: "power3.out",
      overwrite: "auto",
    });

  return (
    <article data-card>
      <div
        ref={inner}
        onMouseEnter={() => lift(-6)}
        onMouseLeave={() => lift(0)}
        className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-card transition-colors duration-200 hover:border-line-hi"
      >
        <button
          type="button"
          onClick={() => onView(book)}
          aria-label={`View ${book.title}`}
          className="relative block w-full cursor-pointer border-0 bg-transparent p-0 text-left focus-visible:outline-offset-[-2px]"
        >
          <div className="relative aspect-[5/7] w-full overflow-hidden">
            {book.genre && (
              <span className="absolute top-2.5 left-2.5 z-[2] rounded-full border border-white/25 bg-black/80 px-2.5 py-0.5 text-xs text-white backdrop-blur-sm">
                {book.genre}
              </span>
            )}
            <BookCover book={book} />
          </div>
        </button>

        <div className="px-4 pt-4 pb-2">
          <h3 className="mb-0.5 text-[15px] leading-[1.3] font-semibold">
            {book.title}
          </h3>
          <p className="text-[13px] text-muted">
            {book.author}
            {meta ? ` · ${meta}` : ""}
          </p>
          {book.synopsis && (
            <p className="mt-2 line-clamp-3 text-[12px] leading-relaxed text-muted">
              {book.synopsis}
            </p>
          )}
        </div>

        <div className="mt-auto flex gap-2 px-4 pt-3 pb-4">
          <Button size="small" className="flex-1" onClick={() => onView(book)}>
            View
          </Button>
          <Button size="small" className="flex-1" onClick={() => onEdit(book)}>
            Edit
          </Button>
          <Button
            size="small"
            type="text"
            style={{ color: "var(--muted)" }}
            onClick={() => onDelete(book)}
          >
            Delete
          </Button>
        </div>
      </div>
    </article>
  );
}
