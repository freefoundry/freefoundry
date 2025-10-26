"use client";
import { Button } from "@/components/ui/button";

export function Pagination({
  total,
  perPage,
  page,
  onPageChange,
  showSizer = false,
  onPerPageChange,
}: {
  total: number;
  perPage: number;
  page: number;
  onPageChange: (p: number) => void;
  showSizer?: boolean;
  onPerPageChange?: (n: number) => void;
}) {
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const pages: (number | "...")[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (page > 3) pages.push("...");
    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (page < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }

  return (
    <div className="mt-12 space-y-4">
      {showSizer && onPerPageChange && (
        <div className="text-sm text-gray-600">
          Showing {(page - 1) * perPage + 1} to{" "}
          {Math.min(page * perPage, total)} of {total} items
        </div>
      )}

      <div className="flex items-center justify-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(1)}
          disabled={page === 1}
        >
          First
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page === 1}
        >
          Previous
        </Button>

        <div className="flex items-center space-x-1">
          {pages.map((p, i) =>
            p === "..." ? (
              <span key={i} className="px-3 py-2 text-gray-400">
                ...
              </span>
            ) : (
              <Button
                key={i}
                variant={page === p ? "default" : "outline"}
                size="sm"
                onClick={() => onPageChange(p)}
                className={`w-7 h-7 ${
                  page === p ? "bg-blue-600 text-white" : ""
                }`}
              >
                {p}
              </Button>
            )
          )}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
        >
          Next
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(totalPages)}
          disabled={page === totalPages}
        >
          Last
        </Button>
      </div>
    </div>
  );
}
