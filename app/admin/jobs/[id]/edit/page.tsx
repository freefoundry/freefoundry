import JobFormClient from "./JobFormClient";

export default async function EditJobPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const job = await fetch(`${baseUrl}/api/jobs/${id}`, {
    cache: "no-store",
  }).then((res) => res.json());

  //  Normalize JSON fields
  const normalized = {
    ...job,
    tags: typeof job.tags === "string" ? JSON.parse(job.tags) : job.tags || [],
    requirements:
      typeof job.requirements === "string"
        ? JSON.parse(job.requirements)
        : job.requirements || [],
    benefits:
      typeof job.benefits === "string"
        ? JSON.parse(job.benefits)
        : job.benefits || [],
    responsibilities:
      typeof job.responsibilities === "string"
        ? JSON.parse(job.responsibilities)
        : job.responsibilities || [],
    qualifications:
      typeof job.qualifications === "string"
        ? JSON.parse(job.qualifications)
        : job.qualifications || [],
    niceToHave:
      typeof job.niceToHave === "string"
        ? JSON.parse(job.niceToHave)
        : job.niceToHave || [],
    companyInfo:
      typeof job.companyInfo === "string"
        ? JSON.parse(job.companyInfo)
        : job.companyInfo || {},
    applicationProcess:
      typeof job.applicationProcess === "string"
        ? JSON.parse(job.applicationProcess)
        : job.applicationProcess || {},
    similarJobs:
      typeof job.similarJobs === "string"
        ? JSON.parse(job.similarJobs)
        : job.similarJobs || [],
  };

  return <JobFormClient job={normalized} />;
}
