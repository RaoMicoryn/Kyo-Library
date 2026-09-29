"use client";

import { Button, Modal } from "antd";
import { metaLine } from "@/lib/books";
import BookCover from "./BookCover";

export default function BookViewModal({ open, book, onClose, onEdit }) {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      centered
      destroyOnHidden
      width={560}
      title={null}
      footer={
        <div className="flex justify-end gap-2.5">
          <Button
            type="text"
            style={{ color: "var(--muted)" }}
            onClick={onClose}
          >
            Close
          </Button>
          <Button shape="round" onClick={() => book && onEdit(book)}>
            Edit
          </Button>
        </div>
      }
    >
      {book && (
        <div className="grid grid-cols-1 gap-6 pt-2 sm:grid-cols-[200px_1fr]">
          <div className="aspect-[5/7] w-full max-w-[200px] overflow-hidden rounded-lg border border-line">
            <BookCover book={book} />
          </div>
          <div>
            <h2 className="mb-1 font-serif text-[2rem] leading-[1.1] font-normal">
              {book.title}
            </h2>
            <p className="mb-1 font-medium">{book.author}</p>
            <p className="mb-4 text-[13px] text-muted">
              {metaLine(book) || "No genre or year"}
            </p>
            {book.synopsis && (
              <div className="mb-4">
                <h3 className="mb-1 text-sm font-semibold">Synopsis</h3>
                <p className="whitespace-pre-wrap">{book.synopsis}</p>
              </div>
            )}
            {book.notes && (
              <div>
                <h3 className="mb-1 text-sm font-semibold">Notes</h3>
                <p className="whitespace-pre-wrap">{book.notes}</p>
              </div>
            )}
            {!book.synopsis && !book.notes && (
              <p className="text-muted">No synopsis or notes yet.</p>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}
