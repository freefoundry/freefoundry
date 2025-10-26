"use client";

import dynamic from "next/dynamic";

// ✅ dynamically load ResourceForm (no SSR)
const ResourceForm = dynamic(() => import("../../resource-form"), { ssr: false });

export default function ResourceFormClient({ resource }: { resource: any }) {
  return <ResourceForm mode="edit" resource={resource} />;
}
