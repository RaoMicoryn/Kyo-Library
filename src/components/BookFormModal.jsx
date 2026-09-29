"use client";

import { useState } from "react";
import {
  App,
  AutoComplete,
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Upload,
} from "antd";
import { resizeImage } from "@/lib/books";
import BookCover from "./BookCover";

function BookForm({ book, genres, onSubmit, onCancel }) {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const [cover, setCover] = useState(book?.cover || "");
  const [coverUrl, setCoverUrl] = useState(
    book?.cover?.startsWith("data:") ? "" : book?.cover || "",
  );

  const title = Form.useWatch("title", form);
  const author = Form.useWatch("author", form);

  const handleFinish = (v) =>
    onSubmit({
      title: v.title.trim(),
      author: v.author.trim(),
      genre: (v.genre || "").trim(),
      year: v.year == null ? "" : v.year,
      synopsis: (v.synopsis || "").trim(),
      notes: (v.notes || "").trim(),
      cover,
    });

  const beforeUpload = (file) => {
    resizeImage(file)
      .then((image) => {
        setCover(image);
        setCoverUrl("");
      })
      .catch(() => message.error("That image couldn't be read"));
    return false; // handled locally, never uploaded anywhere
  };

  return (
    <Form
      form={form}
      layout="vertical"
      requiredMark={false}
      onFinish={handleFinish}
      initialValues={{
        title: book?.title || "",
        author: book?.author || "",
        genre: book?.genre || "",
        year: book?.year === "" || book?.year == null ? null : book.year,
        synopsis: book?.synopsis || "",
        notes: book?.notes || "",
      }}
    >
      <div className="mb-[18px] flex items-center gap-4">
        <div className="aspect-[5/7] w-[70px] flex-none overflow-hidden rounded-md border border-line bg-card">
          <BookCover book={{ title, author, cover }} small />
        </div>
        <div className="flex flex-col items-start gap-2 text-[13px] text-muted">
          <span>
            Paste an image URL or upload a cover. Without one, a text cover is
            made for you.
          </span>
          <Input
            aria-label="Cover image URL"
            value={coverUrl}
            onChange={(event) => {
              const value = event.target.value;
              setCoverUrl(value);
              setCover(value.trim());
            }}
            placeholder="/images/my-cover.jpg"
            autoComplete="off"
          />
          <div className="flex flex-wrap gap-2">
            <Upload
              accept="image/*"
              showUploadList={false}
              maxCount={1}
              beforeUpload={beforeUpload}
            >
              <Button>Upload cover</Button>
            </Upload>
            {cover && (
              <Button
                type="text"
                style={{ color: "var(--muted)" }}
                onClick={() => {
                  setCover("");
                  setCoverUrl("");
                }}
              >
                Remove cover
              </Button>
            )}
          </div>
        </div>
      </div>

      <Form.Item
        name="title"
        label="Title"
        rules={[
          { required: true, whitespace: true, message: "Title is required" },
        ]}
      >
        <Input maxLength={120} autoComplete="off" autoFocus />
      </Form.Item>
      <Form.Item
        name="author"
        label="Author"
        rules={[
          { required: true, whitespace: true, message: "Author is required" },
        ]}
      >
        <Input maxLength={80} autoComplete="off" />
      </Form.Item>

      <div className="grid grid-cols-1 gap-x-3.5 sm:grid-cols-2">
        <Form.Item name="genre" label="Genre">
          <AutoComplete
            options={genres.map((g) => ({ value: g }))}
            filterOption={(input, opt) =>
              opt.value.toLowerCase().includes(input.toLowerCase())
            }
          >
            <Input maxLength={30} placeholder="Sci-Fi" autoComplete="off" />
          </AutoComplete>
        </Form.Item>
        <Form.Item name="year" label="Year">
          <InputNumber
            className="!w-full"
            min={-3000}
            max={2100}
            precision={0}
            controls={false}
            placeholder="1949"
          />
        </Form.Item>
      </div>

      <Form.Item name="synopsis" label="Synopsis">
        <Input.TextArea
          maxLength={3000}
          showCount
          autoSize={{ minRows: 4, maxRows: 10 }}
          placeholder="A short summary of the book…"
        />
      </Form.Item>

      <Form.Item name="notes" label="Notes">
        <Input.TextArea
          maxLength={1000}
          showCount
          autoSize={{ minRows: 3, maxRows: 8 }}
          placeholder="Your thoughts, favorite quotes, or who you lent it to…"
        />
      </Form.Item>

      <div className="mt-2 flex justify-end gap-2.5">
        <Button
          type="text"
          style={{ color: "var(--muted)" }}
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button type="primary" shape="round" htmlType="submit">
          Save book
        </Button>
      </div>
    </Form>
  );
}

export default function BookFormModal({
  open,
  book,
  genres,
  onSubmit,
  onClose,
}) {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      destroyOnHidden
      width={560}
      title={
        <span className="font-serif text-[2rem] leading-[1.1] font-normal">
          {book ? "Edit book" : "Add a book"}
        </span>
      }
    >
      <BookForm
        book={book}
        genres={genres}
        onSubmit={onSubmit}
        onCancel={onClose}
      />
    </Modal>
  );
}
