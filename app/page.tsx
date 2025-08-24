import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Search,
  Briefcase,
  FileText,
  PenToolIcon as Tool,
  GraduationCap,
  ChevronRight,
  Clock,
  Users,
  CheckCircle,
  Bell,
  SearchIcon,
} from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { FeatureCard } from "@/components/cards/FeatureCard";
import { CourseCard } from "@/components/cards/CourseCard";
import { courses as mockCourses, jobs as mockJobs } from "@/lib/mock-data";
import { JobCard } from "@/components/cards/JobCard";
import { CTASection } from "@/components/sections/CTASection";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header showSearch />

      {/* Hero Section */}
      <Hero
        title={
          <>
            Learn Without <span className="text-blue-600">Limits</span>
          </>
        }
        subtitle="Discover curated free learning resources, courses, tutorials, tech blogs, study materials, and tools designed to empower your learning journey."
        primaryHref="/courses"
        primaryText="Explore Resources"
        secondaryText="Join Community"
        imageSrc="https://alterainstitute.com/blog/content/images/2024/12/data-src-image-11293e72-5d3a-47f1-ad99-d1c394682d22.jpeg"
        badgeText="100% Free Resources"
      />

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Everything You Need to Learn
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Curated resources for self-learners, students, and professionals
              without financial barriers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<BookOpen className="h-8 w-8 text-blue-600" />}
              title="Free Courses"
              description="Access thousands of free Udemy courses with automatic expiry detection."
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
              description="WAEC, JAMB, and tertiary resources at no cost."
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
              description="Remote and local roles with salary insights."
              href="/jobs"
              linkText={
                <>
                  View Openings <ChevronRight className="h-4 w-4 ml-1" />
                </>
              }
            />
            <FeatureCard
              icon={<FileText className="h-8 w-8 text-blue-600" />}
              title="Tech Blog"
              description="Curated articles and expert guides."
              href="/resources#blog"
              linkText={
                <>
                  Read Articles <ChevronRight className="h-4 w-4 ml-1" />
                </>
              }
            />
            <FeatureCard
              icon={<SearchIcon className="h-8 w-8 text-blue-600" />}
              title="Smart Search"
              description="Advanced filtering and categorization."
              href="/resources#search"
              linkText={
                <>
                  Try Search <ChevronRight className="h-4 w-4 ml-1" />
                </>
              }
            />
            <FeatureCard
              icon={<Tool className="h-8 w-8 text-blue-600" />}
              title="Career Tools"
              description="Resume builders, GPA calculators, and more."
              href="/resources#tools"
              linkText={
                <>
                  Access Tools <ChevronRight className="h-4 w-4 ml-1" />
                </>
              }
            />
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-2">For Everyone</Badge>
            <h2 className="text-3xl font-bold mb-4">Who We're Built For</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              FreeFoundry serves diverse learning needs without financial
              barriers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-2 rounded-lg mr-4">
                  <GraduationCap className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold">Students</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  <span>Secondary & tertiary education</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  <span>WAEC/JAMB preparation materials</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  <span>Course supplements & study guides</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-2 rounded-lg mr-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold">
                  Self-Taught Developers
                </h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  <span>Programming & development courses</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  <span>Project-based learning resources</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  <span>Developer tools & productivity aids</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-2 rounded-lg mr-4">
                  <Briefcase className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold">Career Switchers</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  <span>Career transition guidance</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  <span>Industry-specific resources</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  <span>Portfolio & resume building tools</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section id="courses" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Free Courses</h2>
            <Link
              href="/courses"
              className="text-blue-600 hover:text-blue-700 flex items-center"
            >
              View All Courses
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCourses.slice(0, 3).map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Job Opportunities */}
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockJobs.slice(0, 3).map((job) => (
              <JobCard key={job.id} job={job} variant="teaser" />
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 px-4 bg-[#0052CC10] text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-[#0052CC]">
            <div>
              <p className="text-4xl font-bold mb-2">1,000+</p>
              <p className="text-[#0052CC]">Free Resources</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">15,000+</p>
              <p className="text-[#0052CC]">Happy Learners</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">24/7</p>
              <p className="text-[#0052CC]">Always Available</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">100%</p>
              <p className="text-[#0052CC]">Free</p>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
