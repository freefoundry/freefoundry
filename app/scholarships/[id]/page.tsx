import type { Metadata } from "next";
import ScholarshipClient from "./ScholarshipClient";
import type { Scholarship } from "@/lib/types";

type Props = {
  params: { id: string };
};

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

async function getScholarship(id: string): Promise<Scholarship | null> {
  try {
    const res = await fetch(`${BASE_URL}/api/scholarships/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const scholarship = await getScholarship(params.id);

  if (!scholarship) {
    return {
      title: "Scholarship Not Found | Free Foundry",
      description:
        "The scholarship you are looking for does not exist or has been removed.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${scholarship.title} | ${
    scholarship.country ? scholarship.country + " Scholarship" : "Scholarship"
  }`;

  const description =
    scholarship.description?.replace(/<[^>]+>/g, "").slice(0, 160) ||
    "Explore this scholarship opportunity including benefits, eligibility, and application details.";

  const url = `${BASE_URL}/scholarships/${scholarship.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Free Foundry",
      images: [
        {
          url: scholarship.featuredImage || `${BASE_URL}/freelogo.svg`,
          width: 1200,
          height: 630,
          alt: scholarship.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [scholarship.featuredImage || `${BASE_URL}/freelogo.svg`],
    },
  };
}


export default function Page() {
  return <ScholarshipClient />;
}
