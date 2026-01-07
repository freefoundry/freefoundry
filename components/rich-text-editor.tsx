"use client";

import { useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Start writing...",
  className,
}: RichTextEditorProps) {
  const { quill, quillRef } = useQuill({
    placeholder,
    modules,
    theme: "snow",
  });

  // Sync external value → editor
  useEffect(() => {
    if (quill && value !== quill.root.innerHTML) {
      quill.root.innerHTML = value || "";
    }
  }, [value, quill]);

  // Sync editor → external value
  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        onChange(quill.root.innerHTML);
      });
    }
  }, [quill, onChange]);

  return (
    <div className={`border rounded-lg bg-white ${className || ""}`}>
      <div ref={quillRef} className="min-h-[300px]" />
    </div>
  );
}

//  Extended Toolbar
const modules = {
  toolbar: [
    // Font family + size
    [{ font: [] }, { size: ["small", false, "large", "huge"] }],

    // Headers
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    // Basic styles
    ["bold", "italic", "underline", "strike"],

    // Subscript / Superscript
    [{ script: "sub" }, { script: "super" }],

    // Lists
    [{ list: "ordered" }, { list: "bullet" }],

    // Indent / Outdent
    [{ indent: "-1" }, { indent: "+1" }],

    // Text alignment + direction
    [{ align: [] }, { direction: "rtl" }],

    // Links, images, video, blockquote, code
    ["link", "image", "video", "blockquote", "code-block"],

    // Colors
    [{ color: [] }, { background: [] }],

    // Clean formatting
    ["clean"],
  ],
};
