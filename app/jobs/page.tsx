// app/jobs/page.tsx
import type { Metadata } from "next";
import JobsClient from "./JobsClient";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "Tech Jobs & Remote Opportunities | Free Foundry",
  description:
    "Browse the latest tech job opportunities including remote, hybrid, and on-site roles for developers, designers, and tech professionals.",
  alternates: {
    canonical: `${BASE_URL}/jobs`,
  },
  openGraph: {
    title: "Tech Jobs & Remote Opportunities | Free Foundry",
    description:
      "Discover curated tech job opportunities across companies and platforms. Filter by location, experience, and work mode.",
    url: `${BASE_URL}/jobs`,
    siteName: "Free Foundry",
    images: [
      {
        url: `${BASE_URL}/freelogo.svg`,
        width: 1200,
        height: 630,
        alt: "Tech Jobs on Free Foundry",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech Jobs & Remote Opportunities | Free Foundry",
    description:
      "Find the latest tech jobs including remote and hybrid roles on Free Foundry.",
    images: [`${BASE_URL}/freelogo.svg`],
  },
};

export default function Page() {
  return <JobsClient />;
}
