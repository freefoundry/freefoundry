"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FaWhatsapp,
  FaXTwitter,
  FaLinkedinIn,
  FaFacebookF,
} from "react-icons/fa6";
import { FiLink } from "react-icons/fi";
import { toast } from "react-toastify";
import { copyToClipboard } from "@/lib/copyToClipboard";

type ShareModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  url: string;
  message: string;
  from?: string;
};

export function ShareModal({
  open,
  onClose,
  title,
  url,
  message,
  from,
}: ShareModalProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedMessage = encodeURIComponent(message);

  const copyLink = async () => {
    const success = await copyToClipboard(url);
    success
      ? toast.success("Link copied to clipboard")
      : toast.error("Unable to copy link");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share {from ?? "Opportunity"}</DialogTitle>
        </DialogHeader>

        {/* Social buttons */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          {/* WhatsApp */}
          <a
            href={`https://wa.me/?text=${encodedMessage}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" className="w-full gap-2 justify-center">
              <FaWhatsapp className="h-5 w-5 text-green-600" />
              WhatsApp
            </Button>
          </a>

          {/* X */}
          <a
            href={`https://x.com/intent/post?text=${encodedMessage}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" className="w-full gap-2 justify-center">
              <FaXTwitter className="h-5 w-5" />X
            </Button>
          </a>

          {/* LinkedIn */}
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" className="w-full gap-2 justify-center">
              <FaLinkedinIn className="h-5 w-5 text-blue-700" />
              LinkedIn
            </Button>
          </a>

          {/* Facebook */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" className="w-full gap-2 justify-center">
              <FaFacebookF className="h-5 w-5 text-blue-600" />
              Facebook
            </Button>
          </a>
        </div>

        {/* Copy link */}
        <div className="mt-4 space-y-2">
          <Input readOnly value={url} />
          <Button onClick={copyLink} className="w-full gap-2">
            <FiLink className="h-4 w-4" />
            Copy Link
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
