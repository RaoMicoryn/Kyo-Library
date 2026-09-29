"use client";

import { Button, Modal } from "antd";

export default function DeleteModal({ open, book, onCancel, onConfirm }) {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      centered
      destroyOnHidden
      width={480}
      title={<span className="font-serif text-[2rem] leading-[1.1] font-normal">Delete this book?</span>}
      footer={
        <div className="flex justify-end gap-2.5">
          <Button type="text" style={{ color: "var(--muted)" }} onClick={onCancel}>Keep it</Button>
          <Button type="primary" shape="round" onClick={onConfirm}>Delete book</Button>
        </div>
      }
    >
      {book && (
        <p className="text-muted">
          &ldquo;{book.title}&rdquo; by {book.author} will be removed from your shelf.
        </p>
      )}
    </Modal>
  );
}
