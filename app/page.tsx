"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { FeatureCard } from "@/components/cards/FeatureCard";
import { CourseCard } from "@/components/cards/CourseCard";
import { JobCard } from "@/components/cards/JobCard";
import { CTASection } from "@/components/sections/CTASection";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Briefcase,
  FileText,
  GraduationCap,
  PenToolIcon as Tool,
  ChevronRight,
  Users,
  CheckCircle,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
   const [jobs, setJobs] = useState<any[]>([]);
   const [loadingJobs, setLoadingJobs] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      const platformNames: Record<string, string> = {
        udemy: "Udemy",
        coursera: "Coursera",
        edx: "edX",
        pluralsight: "Pluralsight",
        skillshare: "Skillshare",
        linkedin: "LinkedIn Learning",
        codecademy: "Codecademy",
        freecodecamp: "freeCodeCamp",
        "khan-academy": "Khan Academy",
        youtube: "YouTube",
        default: "Other",
      };
      try {
        setLoading(true);
        const res = await fetch("/api/courses", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch courses");

        const data = await res.json();

        // ✅ Normalize and take only 3
        const normalized = (data.data || data || []).map((c: any) => ({
          ...c,
          tags: typeof c.tags === "string" ? JSON.parse(c.tags) : c.tags || [],
          requirements:
            typeof c.requirements === "string"
              ? JSON.parse(c.requirements)
              : c.requirements || [],
          outcomes:
            typeof c.outcomes === "string"
              ? JSON.parse(c.outcomes)
              : c.outcomes || [],
          instructor:
            typeof c.instructor === "string"
              ? JSON.parse(c.instructor)
              : c.instructor || {},
          platform:
            platformNames[c.platform?.toLowerCase()] || platformNames.default,
        }));

        setCourses(normalized.slice(0, 3));
      } catch (err: any) {
        console.error("❌ Error fetching courses:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  // ✅ Fetch Jobs (similar logic)
  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoadingJobs(true);
        const res = await fetch("/api/jobs", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch jobs");

        const data = await res.json();

        // Normalize job data
        const normalized = (data.data || data || []).map((j: any) => ({
          ...j,
          requirements:
            typeof j.requirements === "string"
              ? JSON.parse(j.requirements)
              : j.requirements || [],
          benefits:
            typeof j.benefits === "string"
              ? JSON.parse(j.benefits)
              : j.benefits || [],
        }));
        setJobs(normalized.slice(0, 3));
      } catch (err: any) {
        console.error("❌ Error fetching jobs:", err);
        setError(err.message);
      } finally {
        setLoadingJobs(false);
      }
    }

    fetchJobs();
  }, []);
  return (
    <div className="min-h-screen bg-white">
      <Header showSearch />

      {/* Hero */}
      <Hero
        title={
          <>
            Learn Without <span className="text-blue-600">Limits</span>
          </>
        }
        subtitle="Discover curated free learning resources, courses, tutorials, tech blogs, study materials, and tools designed to empower your learning journey."
        primaryHref="/courses"
        primaryText="Explore Courses"
        secondaryText="Join Community"
        imageSrc="https://alterainstitute.com/blog/content/images/2024/12/data-src-image-11293e72-5d3a-47f1-ad99-d1c394682d22.jpeg"
        badgeText="100% Free Resources"
      />

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Everything You Need to Learn
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Curated resources for self-learners, students, and professionals
              without financial barriers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<BookOpen className="h-8 w-8 text-blue-600" />}
              title="Free Courses"
              description="Access thousands of free Udemy and Coursera courses with expiry detection."
              href="/courses"
              linkText={
                <>
                  Browse Courses <ChevronRight className="h-4 w-4 ml-1" />
                </>
              }
            />
            <FeatureCard
              icon={<GraduationCap className="h-8 w-8 text-blue-600" />}
              title="Study Materials"
              description="Access WAEC, JAMB, and tertiary resources at no cost."
              href="/resources"
              linkText={
                <>
                  Access Materials <ChevronRight className="h-4 w-4 ml-1" />
                </>
              }
            />
            <FeatureCard
              icon={<Briefcase className="h-8 w-8 text-blue-600" />}
              title="Job Opportunities"
              description="Find remote and local roles with salary insights."
              href="/jobs"
              linkText={
                <>
                  View Openings <ChevronRight className="h-4 w-4 ml-1" />
                </>
              }
            />
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div>
              <Badge className="mb-4" variant="secondary">
                About FreeFoundry
              </Badge>

              <h2 className="text-3xl font-bold mb-6">
                Learning Should Be Accessible to Everyone
              </h2>

              <p className="text-gray-600 mb-6 leading-relaxed">
                <strong>FreeFoundry</strong> is a curated learning platform
                built to remove financial barriers from education. We bring
                together free courses, study materials, job opportunities, and
                career tools from trusted sources; all in one place.
              </p>

              <p className="text-gray-600 mb-8 leading-relaxed">
                Whether you’re a student, self-learner, or professional looking
                to upskill, FreeFoundry helps you learn smarter without paying a
                dime.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-blue-600 w-6 h-6 mt-1" />
                  <p className="text-gray-700">
                    Carefully curated, high-quality free resources
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="text-blue-600 w-6 h-6 mt-1" />
                  <p className="text-gray-700">
                    Courses, jobs, scholarships and materials updated regularly
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="text-blue-600 w-6 h-6 mt-1" />
                  <p className="text-gray-700">
                    Built for learners across all skill levels
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="text-blue-600 w-6 h-6 mt-1" />
                  <p className="text-gray-700">No paywalls, no hidden fees</p>
                </div>
              </div>

              {/* <div className="mt-8 flex gap-4">
          <Link href="/about">
            <Button>
              Learn More About Us
            </Button>
          </Link>

          <Link href="/courses">
            <Button variant="outline">
              Explore Courses
            </Button>
          </Link>
        </div> */}
            </div>

            {/* Visual / Stats */}
            <div className="bg-gray-50 rounded-2xl p-8 grid grid-cols-2 gap-6">
              <div className="flex flex-col items-start gap-2">
                <Users className="w-8 h-8 text-blue-600" />
                <h4 className="text-lg font-semibold">Built for Learners</h4>
                <p className="text-gray-600 text-sm">
                  Designed to support students, self-learners, and
                  professionals.
                </p>
              </div>

              <div className="flex flex-col items-start gap-2">
                <BookOpen className="w-8 h-8 text-blue-600" />
                <h4 className="text-lg font-semibold">Curated Resources</h4>
                <p className="text-gray-600 text-sm">
                  Carefully selected free courses and learning materials.
                </p>
              </div>

              <div className="flex flex-col items-start gap-2">
                <GraduationCap className="w-8 h-8 text-blue-600" />
                <h4 className="text-lg font-semibold">Quality First</h4>
                <p className="text-gray-600 text-sm">
                  Focused on usefulness, clarity, and real-world value.
                </p>
              </div>

              <div className="flex flex-col items-start gap-2">
                <Briefcase className="w-8 h-8 text-blue-600" />
                <h4 className="text-lg font-semibold">Growing Daily</h4>
                <p className="text-gray-600 text-sm">
                  New courses, resources, and opportunities added regularly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section id="courses" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Free Courses</h2>
            <Link
              href="/courses"
              className="text-blue-600 hover:text-blue-700 flex items-center"
            >
              View All Courses <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="w-full h-48" />
                  <CardContent className="p-5 space-y-3">
                    <Skeleton className="h-6 w-3/4" /> {/* Title */}
                    <Skeleton className="h-4 w-1/2" /> {/* Instructor */}
                    <Skeleton className="h-4 w-full" /> {/* Description */}
                    <div className="flex gap-3">
                      <Skeleton className="h-4 w-12" />
                      <Skeleton className="h-4 w-12" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                    <Skeleton className="h-6 w-24" /> {/* Button */}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <CourseCard key={course._id || course.id} course={course} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Latest Jobs */}
      <section id="jobs" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Latest Job Opportunities</h2>
            <Link
              href="/jobs"
              className="text-blue-600 hover:text-blue-700 flex items-center"
            >
              View All Jobs
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          {loadingJobs ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="w-full h-48" />
                  <CardContent className="p-5 space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-6 w-24" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <JobCard key={job._id || job.id} job={job} variant={"teaser"} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA + Footer */}
      <CTASection />
      <Footer />
    </div>
  );
}
