// CourseFormClient.tsx
"use client";

import dynamic from "next/dynamic";

const CourseForm = dynamic(() => import("../../course-form"), { ssr: false });

export default function CourseFormClient({ course }: { course: any }) {
  return <CourseForm mode="edit" course={course} />;
}
