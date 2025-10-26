import ScholarshipFormClient from "./ScholarshipFormClient";


export default async function EditScholarshipPage(props: {
  params: Promise<{ id: string }>;
}) {
  // ✅ Extract scholarship ID from URL params
  const { id } = await props.params;

  // ✅ Set your base API URL
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // ✅ Fetch scholarship data from API
  const scholarship = await fetch(`${baseUrl}/api/scholarships/${id}`, {
    cache: "no-store", // always fetch fresh data
  }).then((res) => res.json());

  // ✅ Normalize JSON fields (convert stringified arrays back to arrays)
  const normalized = {
    ...scholarship,
    tags:
      typeof scholarship.tags === "string"
        ? JSON.parse(scholarship.tags)
        : scholarship.tags || [],
    eligibility:
      typeof scholarship.eligibility === "string"
        ? JSON.parse(scholarship.eligibility)
        : scholarship.eligibility || [],
    requirements:
      typeof scholarship.requirements === "string"
        ? JSON.parse(scholarship.requirements)
        : scholarship.requirements || [],
    benefits:
      typeof scholarship.benefits === "string"
        ? JSON.parse(scholarship.benefits)
        : scholarship.benefits || [],
  };

  return <ScholarshipFormClient scholarship={normalized} />;
}
