export function generateCourseFromOpportunity(opp: any) {

  const slug = opp.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return {
    slug,
    title: opp.title,
    description: opp.description || "",
    excerpt: opp.description?.slice(0, 180) || "",
    platform: opp.source_name || "External",
    tags: ["imported", "external"]
  };
}