// app/jobs/[id]/page.tsx
import type { Metadata } from "next";
import JobClient from "./JobClient";
import type { Job } from "@/lib/types";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

async function getJob(id: string): Promise<Job | null> {
  try {
    const res = await fetch(`${BASE_URL}/api/jobs/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

type Props = {
  params: { id: string };
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const job = await getJob(params.id);

  if (!job) {
    return {
      title: "Job Not Found | Free Foundry",
      description:
        "The job you are looking for does not exist or has been removed.",
    };
  }

  const title = `${job.title} at ${job.company} | Free Foundry`;

  const description =
    job.description?.slice(0, 160) ||
    `Apply for ${job.title} at ${job.company}. View salary, requirements, and application details.`;

  const url = `${BASE_URL}/jobs/${params.id}`;

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
      type: "article",
      images: [
        {
          url: job.companyLogo || `${BASE_URL}/freelogo.svg`,
          width: 1200,
          height: 630,
          alt: job.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [job.companyLogo || `${BASE_URL}/freelogo.svg`],
    },
  };
}

export default function Page({ params }: Props) {
  return <JobClient />;
}
