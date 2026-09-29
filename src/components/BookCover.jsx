"use client";

import { useEffect, useState } from "react";

// Show a cover image when available; otherwise leave a plain background.
export default function BookCover({ book }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [book.cover]);

  if (book.cover && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={book.cover}
        alt={`Cover of ${book.title}`}
        onError={() => setFailed(true)}
        className="block h-full w-full object-cover"
      />
    );
  }

  return (
    <div
      className="h-full w-full bg-card"
      aria-label={`No cover image for ${book.title}`}
    />
  );
}
