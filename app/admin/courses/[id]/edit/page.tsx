import CourseFormClient from "./CourseFormClient";

export default async function EditCoursePage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const course = await fetch(`${baseUrl}/api/courses/${id}`, {
    cache: "no-store",
  }).then((res) => res.json());

  const normalized = {
    ...course,
    tags:
      typeof course.tags === "string"
        ? JSON.parse(course.tags)
        : course.tags || [],
    requirements:
      typeof course.requirements === "string"
        ? JSON.parse(course.requirements)
        : course.requirements || [],
    outcomes:
      typeof course.outcomes === "string"
        ? JSON.parse(course.outcomes)
        : course.outcomes || [],
    instructor:
      typeof course.instructor === "string"
        ? JSON.parse(course.instructor)
        : course.instructor || {},
  };

  return <CourseFormClient course={normalized} />;
}
