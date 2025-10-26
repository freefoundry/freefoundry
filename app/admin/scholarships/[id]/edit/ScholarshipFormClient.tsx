"use client";

import dynamic from "next/dynamic";

// ✅ dynamically load ScholarshipForm (no SSR)
const ScholarshipForm = dynamic(() => import("../../scholarship-form"), { ssr: false });

export default function ScholarshipFormClient({ scholarship }: { scholarship: any }) {
  return <ScholarshipForm mode="edit" scholarship={scholarship} />;
}
