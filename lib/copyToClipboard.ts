export async function copyToClipboard(text: string): Promise<boolean> {
  // Modern clipboard API (desktop, some mobile)
  if (navigator?.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // fall through to legacy method
    }
  }

  // Fallback for iOS Safari & older browsers
  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;

    // Prevent scrolling to bottom on iOS
    textarea.style.position = "fixed";
    textarea.style.top = "0";
    textarea.style.left = "0";
    textarea.style.opacity = "0";

    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    const success = document.execCommand("copy");
    document.body.removeChild(textarea);

    return success;
  } catch {
    return false;
  }
}
