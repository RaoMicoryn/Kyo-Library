"use client";

import { useEffect, useMemo, useState } from "react";
import { App } from "antd";
import { useBooks } from "@/hooks/useBooks";
import { useLenisRef } from "./SmoothScroll";
import ScrollProgress from "./ScrollProgress";
import Header from "./Header";
import Toolbar from "./Toolbar";
import BookGrid from "./BookGrid";
import BookFormModal from "./BookFormModal";
import BookViewModal from "./BookViewModal";
import DeleteModal from "./DeleteModal";

export default function BookShelf() {
  const { message } = App.useApp();
  const lenisRef = useLenisRef();
  const { books, ready, addBook, updateBook, removeBook } = useBooks();

  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("");
  // mode: which dialog is open. active: the book it's about (kept while it fades out)
  const [mode, setMode] = useState(null);
  const [active, setActive] = useState(null);

  const genres = useMemo(
    () => [...new Set(books.map((b) => b.genre).filter(Boolean))].sort(),
    [books]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return books.filter((b) => {
      if (genre && b.genre !== genre) return false;
      return !q || (b.title + " " + b.author).toLowerCase().includes(q);
    });
  }, [books, query, genre]);

  // Reset a filter that no longer exists (e.g. last book of that genre deleted)
  useEffect(() => {
    if (genre && !genres.includes(genre)) setGenre("");
  }, [genre, genres]);

  // Pause Lenis while a dialog is open so the modal scrolls natively
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (mode) lenis.stop();
    else lenis.start();
  }, [mode, lenisRef]);

  const close = () => setMode(null);
  const openForm = (book = null) => { setActive(book); setMode("form"); };
  const openView = (book) => { setActive(book); setMode("view"); };
  const openDelete = (book) => { setActive(book); setMode("delete"); };

  const handleSubmit = (data) => {
    const status = active ? updateBook(active.id, data) : addBook(data);
    if (status === "no-cover") message.warning("Cover too large to store, saved without it");
    else message.success(active ? "Book updated" : "Book added");
    close();
  };

  const handleDelete = () => {
    if (active) removeBook(active.id);
    message.success("Book deleted");
    close();
  };

  const count = ready
    ? `${books.length} ${books.length === 1 ? "book" : "books"} on the shelf`
    : "";

  return (
    <>
      <ScrollProgress />
      <div className="mx-auto max-w-[1120px] px-4 pt-8 pb-[72px] sm:px-6 sm:pt-12 sm:pb-24">
        <Header count={count} onAdd={() => openForm(null)} />
        <Toolbar
          query={query}
          onQuery={setQuery}
          genre={genre}
          onGenre={setGenre}
          genres={genres}
        />
        <BookGrid
          books={filtered}
          total={books.length}
          ready={ready}
          onView={openView}
          onEdit={openForm}
          onDelete={openDelete}
        />
      </div>

      <BookFormModal
        open={mode === "form"}
        book={active}
        genres={genres}
        onSubmit={handleSubmit}
        onClose={close}
      />
      <BookViewModal open={mode === "view"} book={active} onClose={close} onEdit={openForm} />
      <DeleteModal open={mode === "delete"} book={active} onCancel={close} onConfirm={handleDelete} />
    </>
  );
}
