// app/resources/page.tsx
import type { Metadata } from "next";
import ResourcesClient from "./ResourcesClient";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "Learning Resources | Free Foundry",
  description:
    "Explore curated learning resources including tools, guides, templates, and educational materials to accelerate your learning.",
  alternates: {
    canonical: `${BASE_URL}/resources`,
  },
  openGraph: {
    title: "Learning Resources | Free Foundry",
    description:
      "Discover high-quality learning resources, tools, and guides curated to help students and professionals grow.",
    url: `${BASE_URL}/resources`,
    siteName: "Free Foundry",
    images: [
      {
        url: `${BASE_URL}/freelogo.svg.png`,
        width: 1200,
        height: 630,
        alt: "Free Foundry Learning Resources",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learning Resources | Free Foundry",
    description:
      "Discover curated learning resources, tools, and guides on Free Foundry.",
    images: [`${BASE_URL}/freelogo.svg.png`],
  },
};

export default function Page() {
  return <ResourcesClient />;
}
