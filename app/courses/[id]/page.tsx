import type { Metadata } from "next";
import CourseClient from "./CourseClient";
import type { Course } from "@/lib/types";

type Props = {
  params: { id: string };
};

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

async function getCourse(id: string): Promise<Course | null> {
  try {
    const res = await fetch(`${BASE_URL}/api/courses/${id}`, {
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
const course = await getCourse(params.id);

  //  Course not found
  if (!course) {
    return {
      title: "Course Not Found | Free Foundry",
      description:
        "The course you are looking for does not exist or may have been removed.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${course.title} | Free Course on ${course.platform}`;
  const description =
    course.excerpt?.replace(/<[^>]+>/g, "").slice(0, 160) ||
    course.description?.replace(/<[^>]+>/g, "").slice(0, 160) ||
    "Explore this free online course including curriculum, instructor details, and enrollment information.";

  const url = `${BASE_URL}/courses/${course.id}`;

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
          url: course.image || `${BASE_URL}/freelogo.svg`,
          width: 1200,
          height: 630,
          alt: course.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [course.image || `${BASE_URL}/freelogo.svg`],
    },

    keywords: [
      course.title,
      "free online course",
      "learn online",
      course.platform,
      course.category,
      ...(course.tags || []),
    ],
  };
}

export default function Page() {
  return <CourseClient />;
}
