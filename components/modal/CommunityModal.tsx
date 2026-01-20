"use client";

import Link from "next/link";
import { X } from "lucide-react";
import {
  FaTelegram,
  FaWhatsapp,
  FaLinkedinIn,
  FaFacebookF,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

interface CommunityModalProps {
  open: boolean;
  onClose: () => void;
}

export function CommunityModal({ open, onClose }: CommunityModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X />
        </button>

        <h3 className="text-xl font-bold mb-2 text-center">
          Join Our Community
        </h3>
        <p className="text-gray-600 text-sm text-center mb-6">
          Connect with learners, get updates, and grow together
        </p>

        <div className="grid gap-4">
          <CommunityLink
            href="https://t.me/boost/freefoundryhub"
            icon={<FaTelegram />}
            label="Join Telegram"
            color="bg-sky-500"
          />

          <CommunityLink
            href="https://chat.whatsapp.com/GF819wc0KFf3ytAL910KKX"
            icon={<FaWhatsapp />}
            label="Join Free Foundry WhatsApp Group"
            color="bg-green-500"
          />

          <CommunityLink
            href="https://www.linkedin.com/company/freefoundry/"
            icon={<FaLinkedinIn />}
            label="Follow on LinkedIn"
            color="bg-blue-700"
          />

          <CommunityLink
            href="https://www.facebook.com/profile.php?id=100083560747021"
            icon={<FaFacebookF />}
            label="Follow on Facebook"
            color="bg-blue-600"
          />

          {/* <CommunityLink
            href="https://x.com/yourlink"
            icon={<FaXTwitter />}
            label="Follow on X"
            color="bg-black"
          /> */}
        </div>
      </div>
    </div>
  );
}

function CommunityLink({
  href,
  icon,
  label,
  color,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  color: string;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      className={`${color} text-white rounded-xl flex items-center gap-3 px-4 py-3 hover:opacity-90 transition`}
    >
      <span className="text-xl">{icon}</span>
      <span className="font-medium">{label}</span>
    </Link>
  );
}
