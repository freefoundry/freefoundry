import type { Metadata } from "next";
import CoursesClient from "./CoursesClient";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "Free Online Courses | Learn New Skills | Free Foundry",
  description:
    "Discover free online courses from top platforms like Udemy, Coursera, edX, and more. Learn programming, data science, design, cloud computing, and more — all for free.",

  alternates: {
    canonical: `${BASE_URL}/courses`,
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Free Online Courses | Free Foundry",
    description:
      "Browse hundreds of free online courses from top learning platforms. Upgrade your skills in tech, design, data science, and more.",
    url: `${BASE_URL}/courses`,
    siteName: "Free Foundry",
    type: "website",
    images: [
      {
        url: `${BASE_URL}/freelogo.svg`,
        width: 1200,
        height: 630,
        alt: "Free Courses on Free Foundry",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Free Online Courses | Free Foundry",
    description:
      "Learn new skills for free with curated online courses from top platforms like Udemy, Coursera, and edX.",
    images: [`${BASE_URL}/freelogo.svg`],
  },

  keywords: [
    "free courses",
    "online courses",
    "learn programming",
    "free Udemy courses",
    "free Coursera courses",
    "tech courses",
    "design courses",
    "data science courses",
    "Free Foundry",
  ],
};

export default function Page() {
  return <CoursesClient />;
}
