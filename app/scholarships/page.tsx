import type { Metadata } from "next";
import ScholarshipsPage from "./ScholarshipsPage";

export const metadata: Metadata = {
  title: "Global Scholarships | Fully & Partially Funded Opportunities",
  description:
    "Explore global scholarships for undergraduate, graduate, PhD, and postdoctoral studies. Find fully and partially funded opportunities worldwide.",
  keywords: [
    "scholarships",
    "fully funded scholarships",
    "international scholarships",
    "PhD scholarships",
    "masters scholarships",
    "undergraduate scholarships",
    "study abroad funding",
  ],
  openGraph: {
    title: "Global Scholarships | Free Foundry",
    description:
      "Discover fully and partially funded scholarships around the world. Updated daily with verified opportunities.",
    url: "https://freefoundryhub.com/scholarships",
    siteName: "Free Foundry",
    images: [
      {
        url: "https://freefoundryhub.com/freelogo.svg",
        width: 1200,
        height: 630,
        alt: "Global Scholarships",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Global Scholarships | Free Foundry",
    description:
      "Find fully funded scholarships for international students worldwide.",
    images: ["https://freefoundryhub.com/freelogo.svg"],
  },
  alternates: {
    canonical: "https://freefoundryhub.com/scholarships",
  },
};

export default function Page() {
  return <ScholarshipsPage />;
}
