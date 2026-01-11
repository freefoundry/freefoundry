import type { MetadataRoute } from "next";

const baseUrl = "https://www.freefoundryhub.com";

async function safeFetch(url: string) {
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [resources, courses, scholarships, jobs] = await Promise.all([
    safeFetch(`${baseUrl}/api/resources`),
    safeFetch(`${baseUrl}/api/courses`),
    safeFetch(`${baseUrl}/api/scholarships`),
    safeFetch(`${baseUrl}/api/jobs`),
  ]);

  const staticPages = [
    "/", "/resources", "/courses", "/scholarships", "/jobs",
  ].map((p) => ({
    url: `${baseUrl}${p}`,
    lastModified: new Date(),
  }));

  const mapSlug = (items: any[], path: string) =>
    items
      .filter((i) => i?.slug)
      .map((i) => ({
        url: `${baseUrl}/${path}/${i.slug}`,
        lastModified: new Date(i.updatedAt ?? Date.now()),
      }));

  return [
    ...staticPages,
    ...mapSlug(resources, "resources"),
    ...mapSlug(courses, "courses"),
    ...mapSlug(scholarships, "scholarships"),
    ...mapSlug(jobs, "jobs"),
  ];
}
