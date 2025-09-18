import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "FreeFoundry - Free Learning Resources",
    template: "%s | FreeFoundry",
  },
  description:
    "Discover curated free learning resources, courses, and tools all in one place. No paywalls, no barriers - just pure knowledge at your fingertips.",
  keywords: [
    "free courses",
    "learning resources",
    "education",
    "programming",
    "web development",
    "study materials",
  ],
  authors: [{ name: "FreeFoundry Team" }],
  creator: "FreeFoundry",
  publisher: "FreeFoundry",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://freefoundry.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://freefoundry.com",
    title: "FreeFoundry - Free Learning Resources",
    description:
      "Discover curated free learning resources, courses, and tools all in one place.",
    siteName: "FreeFoundry",
  },
  twitter: {
    card: "summary_large_image",
    title: "FreeFoundry - Free Learning Resources",
    description:
      "Discover curated free learning resources, courses, and tools all in one place.",
    creator: "@freefoundry",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        type: "image/x-icon",
      },
      {
        url: "/favicon.ico",
        sizes: "any",
      },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/favicon-32x32.png",
        color: "#3B82F6",
      },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#3B82F6" />
        <meta name="msapplication-TileColor" content="#3B82F6" />
      </head>
      <body className={inter.className}>
        {children}{" "}
        <ToastContainer
          autoClose={3000}
          closeButton={false}
          closeOnClick
          pauseOnHover
          draggable
          toastClassName="text-sm"
        />
      </body>
    </html>
  );
}
