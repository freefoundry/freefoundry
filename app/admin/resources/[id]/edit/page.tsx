import ResourceFormClient from "./ResourceFormClient";

export default async function EditResourcePage(props: {
  params: Promise<{ id: string }>;
}) {
  //  Extract resource ID or slug from dynamic params
  const { id } = await props.params;

  //  Set your base API URL
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  //  Fetch resource data from API
  const resource = await fetch(`${baseUrl}/api/resources/${id}`, {
    cache: "no-store", // always fetch fresh data
  }).then((res) => res.json());

  //  Normalize JSON fields (convert stringified arrays back to arrays)
  const normalized = {
    ...resource,
    tags:
      typeof resource.tags === "string"
        ? JSON.parse(resource.tags)
        : resource.tags || [],
    requirements:
      typeof resource.requirements === "string"
        ? JSON.parse(resource.requirements)
        : resource.requirements || [],
    features:
      typeof resource.features === "string"
        ? JSON.parse(resource.features)
        : resource.features || [],
    whatYouWillGet:
      typeof resource.whatYouWillGet === "string"
        ? JSON.parse(resource.whatYouWillGet)
        : resource.whatYouWillGet || [],
  };

  return <ResourceFormClient resource={normalized} />;
}
