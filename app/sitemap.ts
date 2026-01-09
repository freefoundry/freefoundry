import type { MetadataRoute } from "next";

const baseUrl = "https://www.freefoundryhub.com";

async function safeFetch(url: string) {
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    console.error("Sitemap fetch failed:", url);
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
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/resources`, lastModified: new Date() },
    { url: `${baseUrl}/courses`, lastModified: new Date() },
    { url: `${baseUrl}/scholarships`, lastModified: new Date() },
    { url: `${baseUrl}/jobs`, lastModified: new Date() },
  ];

  const resourcePages = resources.map((r: any) => ({
    url: `${baseUrl}/resources/${r.id}`,
    lastModified: new Date(r.updatedAt ?? Date.now()),
  }));

  const coursePages = courses.map((c: any) => ({
    url: `${baseUrl}/courses/${c.id}`,
    lastModified: new Date(c.updatedAt ?? Date.now()),
  }));

  const scholarshipPages = scholarships.map((s: any) => ({
    url: `${baseUrl}/scholarships/${s.id}`,
    lastModified: new Date(s.updatedAt ?? Date.now()),
  }));

  const jobPages = jobs.map((j: any) => ({
    url: `${baseUrl}/jobs/${j.id}`,
    lastModified: new Date(j.updatedAt ?? Date.now()),
  }));

  return [
    ...staticPages,
    ...resourcePages,
    ...coursePages,
    ...scholarshipPages,
    ...jobPages,
  ];
}
