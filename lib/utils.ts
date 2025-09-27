import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  // ✅ Use a fixed, predictable format (no locale issues)
  return date.toISOString().split("T")[0]; 
  // → outputs "2024-01-15"
  
  // OR, if you want pretty format but still consistent:
  // return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export function stripHtml(html: string) {
  return html.replace(/<[^>]*>?/gm, "");
}