"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SEED, STORAGE_KEY, uid } from "@/lib/books";

function persist(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    return true;
  } catch {
    return false;
  }
}

function migrateStarterBook(list) {
  const index = list.findIndex(
    (book) =>
      book.title === "All Tomorrows" &&
      book.author === "C.M. Kösemen" &&
      book.cover === "/images/all-tomorrows.jpg" &&
      book.genre === "Sci-Fi" &&
      book.year === 2025,
  );
  if (index === -1 || !SEED[0]) return list;

  return list.map((book, bookIndex) =>
    bookIndex === index
      ? {
          ...SEED[0],
          id: book.id,
          synopsis: book.synopsis || "",
          notes: book.notes || "",
        }
      : book,
  );
}

function syncSeedSynopses(list) {
  let changed = false;
  const next = list.map((book) => {
    const seed = SEED.find(
      (item) => item.title === book.title && item.author === book.author,
    );
    if (!seed?.synopsis || seed.synopsis === book.synopsis) return book;
    changed = true;
    return { ...book, synopsis: seed.synopsis };
  });
  return changed ? next : list;
}

function addRecentSeedBooks(list) {
  const recentCovers = ["/images/Takou.jpg", "/images/Mushoku.jpg"];
  let changed = false;
  const next = list.map((book) => {
    const seed = SEED.find(
      (item) => recentCovers.includes(item.cover) && item.cover === book.cover,
    );
    if (!seed) return book;

    changed ||= Object.keys(seed).some((key) => book[key] !== seed[key]);
    return { ...seed, ...book, ...seed, id: book.id, notes: book.notes || "" };
  });

  const missing = SEED.filter(
    (seed) =>
      recentCovers.includes(seed.cover) &&
      !next.some((book) => book.cover === seed.cover),
  ).map((book) => ({ ...book, id: uid(), notes: "" }));

  if (missing.length === 0 && !changed) return list;
  return [...next, ...missing];
}

export function useBooks() {
  const [books, setBooks] = useState([]);
  const [ready, setReady] = useState(false);
  const ref = useRef([]);

  // Load after mount so server and client markup match.
  useEffect(() => {
    let data = null;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) data = JSON.parse(raw);
    } catch {}
    if (!data) {
      data = SEED.map((b) => ({ ...b, id: uid(), notes: "" }));
      persist(data);
    } else {
      const storedData = data;
      data = addRecentSeedBooks(syncSeedSynopses(migrateStarterBook(data)));
      if (data !== storedData) persist(data);
    }
    ref.current = data;
    setBooks(data);
    setReady(true);
  }, []);

  // Returns "ok" or "no-cover" (storage full, saved without the cover).
  const commit = useCallback((next, changedId) => {
    let final = next;
    let status = "ok";
    if (!persist(next)) {
      final = next.map((b) => (b.id === changedId ? { ...b, cover: "" } : b));
      persist(final);
      status = "no-cover";
    }
    ref.current = final;
    setBooks(final);
    return status;
  }, []);

  const addBook = useCallback(
    (data) => {
      const book = { ...data, id: uid() };
      return commit([book, ...ref.current], book.id);
    },
    [commit],
  );

  const updateBook = useCallback(
    (id, data) =>
      commit(
        ref.current.map((b) => (b.id === id ? { ...b, ...data } : b)),
        id,
      ),
    [commit],
  );

  const removeBook = useCallback(
    (id) =>
      commit(
        ref.current.filter((b) => b.id !== id),
        id,
      ),
    [commit],
  );

  return { books, ready, addBook, updateBook, removeBook };
}
