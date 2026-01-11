// app/resources/[id]/page.tsx
import type { Metadata } from "next";
import ResourceClient from "./ResourceClient";
import type { Resource } from "@/lib/types";

type Props = {
  params: { id: string };
};

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

async function getResource(id: string): Promise<Resource | null> {
  try {
    const res = await fetch(`${BASE_URL}/api/resources/${id}`, {
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
  const resource = await getResource(params.id);

  if (!resource) {
    return {
      title: "Resource Not Found | Free Foundry",
      description:
        "The resource you are looking for does not exist or has been removed.",
    };
  }

  const title = `${resource.title} | Free Foundry`;

  const description =
    resource.excerpt ||
    resource.content?.replace(/<[^>]+>/g, "").slice(0, 160) ||
    "Explore this learning resource on Free Foundry.";

  const url = `${BASE_URL}/resources/${resource.slug || resource._id}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Free Foundry",
      type: "article",
      images: [
        {
          url: resource.featuredImage || `${BASE_URL}/freelogo.svg`,
          width: 1200,
          height: 630,
          alt: resource.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [resource.featuredImage || `${BASE_URL}/freelogo.svg`],
    },
  };
}

export default function Page() {
  return <ResourceClient />;
}
