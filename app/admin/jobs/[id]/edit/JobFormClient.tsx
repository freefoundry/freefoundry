"use client";

import dynamic from "next/dynamic";

//  dynamically load JobForm (no SSR)
const JobForm = dynamic(() => import("../../job-form"), { ssr: false });

export default function JobFormClient({ job }: { job: any }) {
  return <JobForm mode="edit" job={job} />;
}
