import type { MetadataRoute } from "next";

const baseUrl = "https://freefoundry.com";

async function fetchResources(type: string) {
  const res = await fetch(`${baseUrl}/api/${type}`, {
    cache: "no-store",
  });

  if (!res.ok) return [];

  return res.json();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [resources, courses, scholarships, jobs] = await Promise.all([
    fetchResources("resources"),
    fetchResources("courses"),
    fetchResources("scholarships"),
    fetchResources("jobs"),
  ]);

  const staticPages = [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/resources`, lastModified: new Date() },
    { url: `${baseUrl}/courses`, lastModified: new Date() },
    { url: `${baseUrl}/scholarships`, lastModified: new Date() },
    { url: `${baseUrl}/jobs`, lastModified: new Date() },
  ];

  const resourcePages = resources.map((item: any) => ({
    url: `${baseUrl}/resources/${item.id}`,
    lastModified: new Date(item.updatedAt ?? Date.now()),
  }));

  const coursePages = courses.map((item: any) => ({
    url: `${baseUrl}/courses/${item.id}`,
    lastModified: new Date(item.updatedAt ?? Date.now()),
  }));

  const scholarshipPages = scholarships.map((item: any) => ({
    url: `${baseUrl}/scholarships/${item.id}`,
    lastModified: new Date(item.updatedAt ?? Date.now()),
  }));

  const jobPages = jobs.map((item: any) => ({
    url: `${baseUrl}/jobs/${item.id}`,
    lastModified: new Date(item.updatedAt ?? Date.now()),
  }));

  return [
    ...staticPages,
    ...resourcePages,
    ...coursePages,
    ...scholarshipPages,
    ...jobPages,
  ];
}
