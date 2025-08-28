"use client";

import type React from "react";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  LinkIcon,
  ImageIcon,
  Quote,
  Code,
  Undo,
  Redo,
  Type,
  Palette,
  Table,
  Minus,
} from "lucide-react";

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
  const editorRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState({
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
    insertUnorderedList: false,
    insertOrderedList: false,
    justifyLeft: false,
    justifyCenter: false,
    justifyRight: false,
    justifyFull: false,
  });

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const executeCommand = useCallback((command: string, value?: string) => {
    document.execCommand(command, false, value);
    updateActiveStates();
    handleContentChange();
    editorRef.current?.focus();
  }, []);

  const updateActiveStates = useCallback(() => {
    const commands = [
      "bold",
      "italic",
      "underline",
      "strikeThrough",
      "insertUnorderedList",
      "insertOrderedList",
      "justifyLeft",
      "justifyCenter",
      "justifyRight",
      "justifyFull",
    ];

    const newStates: any = {};
    commands.forEach((command) => {
      newStates[command] = document.queryCommandState(command);
    });

    setIsActive(newStates);
  }, []);

  const handleContentChange = useCallback(() => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  const insertLink = () => {
    const selection = window.getSelection();
    const selectedText = selection?.toString();
    const url = prompt("Enter URL:", "https://");

    if (url) {
      if (selectedText) {
        executeCommand("createLink", url);
      } else {
        const linkText = prompt("Enter link text:", "Link");
        if (linkText) {
          document.execCommand(
            "insertHTML",
            false,
            `<a href="${url}" target="_blank">${linkText}</a>`
          );
          handleContentChange();
        }
      }
    }
  };

  const insertImage = () => {
    const url = prompt("Enter image URL:", "https://");
    if (url) {
      const alt = prompt("Enter alt text (optional):", "");
      document.execCommand(
        "insertHTML",
        false,
        `<img src="${url}" alt="${alt}" style="max-width: 100%; height: auto;" />`
      );
      handleContentChange();
    }
  };

  const insertTable = () => {
    const rows = prompt("Number of rows:", "3");
    const cols = prompt("Number of columns:", "3");

    if (rows && cols) {
      const numRows = Number.parseInt(rows);
      const numCols = Number.parseInt(cols);

      let tableHTML =
        '<table border="1" style="border-collapse: collapse; width: 100%; margin: 10px 0;"><tbody>';

      for (let i = 0; i < numRows; i++) {
        tableHTML += "<tr>";
        for (let j = 0; j < numCols; j++) {
          tableHTML +=
            '<td style="padding: 8px; border: 1px solid #ddd;">&nbsp;</td>';
        }
        tableHTML += "</tr>";
      }

      tableHTML += "</tbody></table>";

      document.execCommand("insertHTML", false, tableHTML);
      handleContentChange();
    }
  };

  const changeTextColor = () => {
    const color = prompt("Enter color (hex, rgb, or color name):", "#000000");
    if (color) {
      executeCommand("foreColor", color);
    }
  };

  const changeBackgroundColor = () => {
    const color = prompt(
      "Enter background color (hex, rgb, or color name):",
      "#ffff00"
    );
    if (color) {
      executeCommand("backColor", color);
    }
  };

  const formatBlock = (tag: string) => {
    executeCommand("formatBlock", `<${tag}>`);
  };

  const insertHorizontalRule = () => {
    executeCommand("insertHorizontalRule");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case "b":
          e.preventDefault();
          executeCommand("bold");
          break;
        case "i":
          e.preventDefault();
          executeCommand("italic");
          break;
        case "u":
          e.preventDefault();
          executeCommand("underline");
          break;
        case "z":
          e.preventDefault();
          executeCommand("undo");
          break;
        case "y":
          e.preventDefault();
          executeCommand("redo");
          break;
      }
    }
  };

  return (
    <div className={`border rounded-lg bg-white ${className}`}>
      {/* Toolbar */}
      <div className="border-b p-2 bg-gray-50">
        <div className="flex items-center flex-wrap gap-1">
          {/* Text Formatting Group */}
          <div className="flex items-center">
            <Button
              variant={isActive.bold ? "default" : "ghost"}
              size="sm"
              onClick={() => executeCommand("bold")}
              title="Bold (Ctrl+B)"
              type="button"
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button
              variant={isActive.italic ? "default" : "ghost"}
              size="sm"
              onClick={() => executeCommand("italic")}
              title="Italic (Ctrl+I)"
              type="button"
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button
              variant={isActive.underline ? "default" : "ghost"}
              size="sm"
              onClick={() => executeCommand("underline")}
              title="Underline (Ctrl+U)"
              type="button"
            >
              <Underline className="h-4 w-4" />
            </Button>
            <Button
              variant={isActive.strikethrough ? "default" : "ghost"}
              size="sm"
              onClick={() => executeCommand("strikeThrough")}
              title="Strikethrough"
              type="button"
            >
              <Strikethrough className="h-4 w-4" />
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Text Style */}
          <Select onValueChange={(value) => formatBlock(value)}>
            <SelectTrigger className="w-32 h-8">
              <SelectValue placeholder="Style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="p">Paragraph</SelectItem>
              <SelectItem value="h1">Heading 1</SelectItem>
              <SelectItem value="h2">Heading 2</SelectItem>
              <SelectItem value="h3">Heading 3</SelectItem>
              <SelectItem value="h4">Heading 4</SelectItem>
              <SelectItem value="h5">Heading 5</SelectItem>
              <SelectItem value="h6">Heading 6</SelectItem>
            </SelectContent>
          </Select>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Lists */}
          <div className="flex items-center">
            <Button
              variant={isActive.insertUnorderedList ? "default" : "ghost"}
              size="sm"
              onClick={() => executeCommand("insertUnorderedList")}
              title="Bullet List"
              type="button"
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={isActive.insertOrderedList ? "default" : "ghost"}
              size="sm"
              onClick={() => executeCommand("insertOrderedList")}
              title="Numbered List"
              type="button"
            >
              <ListOrdered className="h-4 w-4" />
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Alignment */}
          <div className="flex items-center">
            <Button
              variant={isActive.justifyLeft ? "default" : "ghost"}
              size="sm"
              onClick={() => executeCommand("justifyLeft")}
              title="Align Left"
              type="button"
            >
              <AlignLeft className="h-4 w-4" />
            </Button>
            <Button
              variant={isActive.justifyCenter ? "default" : "ghost"}
              size="sm"
              onClick={() => executeCommand("justifyCenter")}
              title="Align Center"
              type="button"
            >
              <AlignCenter className="h-4 w-4" />
            </Button>
            <Button
              variant={isActive.justifyRight ? "default" : "ghost"}
              size="sm"
              onClick={() => executeCommand("justifyRight")}
              title="Align Right"
              type="button"
            >
              <AlignRight className="h-4 w-4" />
            </Button>
            <Button
              variant={isActive.justifyFull ? "default" : "ghost"}
              size="sm"
              onClick={() => executeCommand("justifyFull")}
              title="Justify"
              type="button"
            >
              <AlignJustify className="h-4 w-4" />
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Insert Elements */}
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={insertLink}
              title="Insert Link"
              type="button"
            >
              <LinkIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={insertImage}
              title="Insert Image"
              type="button"
            >
              <ImageIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => executeCommand("formatBlock", "<blockquote>")}
              title="Quote"
              type="button"
            >
              <Quote className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => executeCommand("formatBlock", "<pre>")}
              title="Code Block"
              type="button"
            >
              <Code className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={insertTable}
              title="Insert Table"
              type="button"
            >
              <Table className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={insertHorizontalRule}
              title="Horizontal Rule"
              type="button"
            >
              <Minus className="h-4 w-4" />
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Colors */}
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={changeTextColor}
              title="Text Color"
              type="button"
            >
              <Type className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={changeBackgroundColor}
              title="Background Color"
              type="button"
            >
              <Palette className="h-4 w-4" />
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Actions */}
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => executeCommand("removeFormat")}
              title="Clear Formatting"
              type="button"
            >
              Clear
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => executeCommand("undo")}
              title="Undo (Ctrl+Z)"
              type="button"
            >
              <Undo className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => executeCommand("redo")}
              title="Redo (Ctrl+Y)"
              type="button"
            >
              <Redo className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Editor Content */}
      <div
        ref={editorRef}
        contentEditable
        className="min-h-[300px] max-h-[500px] overflow-y-auto p-4 focus:outline-none prose prose-sm max-w-none"
        onInput={handleContentChange}
        onKeyUp={updateActiveStates}
        onMouseUp={updateActiveStates}
        onFocus={updateActiveStates}
        onKeyDown={handleKeyDown}
        style={{
          minHeight: "300px",
        }}
        suppressContentEditableWarning={true}
        data-placeholder={placeholder}
      />

      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }

        [contenteditable] h1 {
          font-size: 2em;
          font-weight: bold;
          margin: 0.67em 0;
        }

        [contenteditable] h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin: 0.75em 0;
        }

        [contenteditable] h3 {
          font-size: 1.17em;
          font-weight: bold;
          margin: 1em 0;
        }

        [contenteditable] h4 {
          font-size: 1em;
          font-weight: bold;
          margin: 1.33em 0;
        }

        [contenteditable] h5 {
          font-size: 0.83em;
          font-weight: bold;
          margin: 1.67em 0;
        }

        [contenteditable] h6 {
          font-size: 0.67em;
          font-weight: bold;
          margin: 2.33em 0;
        }

        [contenteditable] ul,
        [contenteditable] ol {
          margin: 1em 0;
          padding-left: 2em;
        }

        [contenteditable] li {
          margin: 0.5em 0;
        }

        [contenteditable] blockquote {
          margin: 1em 0;
          padding: 0.5em 1em;
          border-left: 4px solid #ddd;
          background-color: #f9f9f9;
        }

        [contenteditable] pre {
          background-color: #f4f4f4;
          padding: 1em;
          border-radius: 4px;
          overflow-x: auto;
          font-family: monospace;
        }

        [contenteditable] a {
          color: #0066cc;
          text-decoration: underline;
        }

        [contenteditable] table {
          border-collapse: collapse;
          width: 100%;
          margin: 1em 0;
        }

        [contenteditable] td,
        [contenteditable] th {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }

        [contenteditable] th {
          background-color: #f2f2f2;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}
