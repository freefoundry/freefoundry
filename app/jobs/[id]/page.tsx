"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ExternalLink,
  Share2,
  Bookmark,
  BookmarkCheck,
  ChevronRight,
  CheckCircle,
  Building,
  MapPin,
  DollarSign,
  Calendar,
  Clock,
  Users,
  Eye,
  AlertCircle,
  Globe,
  Mail,
  Phone,
} from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import type { Job } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { Header } from "@/components/layout/Header";

// Extended Job type for detail page
type JobDetail = Job & {
  fullDescription: string;
  responsibilities: string[];
  qualifications: string[];
  niceToHave: string[];
  companyInfo: {
    name: string;
    description: string;
    industry: string;
    size: string;
    founded: string;
    website: string;
    logo: string;
    culture: string[];
  };
  applicationProcess: {
    steps: string[];
    timeline: string;
    contact: {
      email?: string;
      phone?: string;
      recruiter?: string;
    };
  };
  similarJobs: Job[];
  views: number;
  applications: number;
  lastUpdated: string;
};

// Mock job data - in a real app, this would come from an API
const getJobById = (id: string): JobDetail => {
  return {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Nigeria",
    location: "Lagos, Nigeria",
    type: "Full-time",
    workMode: "Remote",
    experience: "3-5 years",
    salary: "₦400,000 - ₦650,000",
    salaryType: "monthly",
    description:
      "Join our dynamic team as a Senior Frontend Developer and help build the next generation of web applications.",
    requirements: [
      "React.js",
      "TypeScript",
      "CSS/SCSS",
      "Git",
      "REST APIs",
      "Next.js",
      "Tailwind CSS",
    ],
    benefits: [
      "Health Insurance",
      "Remote Work",
      "Learning Budget",
      "Flexible Hours",
      "Stock Options",
    ],
    postedDate: "2024-01-25",
    platform: "LinkedIn",
    companyLogo: "/placeholder.svg?height=100&width=100&text=TC",
    featured: true,
    urgent: false,
    fullDescription: `We are looking for a passionate Senior Frontend Developer to join our growing engineering team. You will be responsible for developing and maintaining high-quality web applications using modern JavaScript frameworks and technologies.

As a Senior Frontend Developer, you will work closely with our design and backend teams to create exceptional user experiences. You'll have the opportunity to mentor junior developers, contribute to architectural decisions, and help shape our frontend development practices.

This is a remote-first position with flexible working hours. We believe in work-life balance and provide a supportive environment for professional growth and learning.

Key Responsibilities:
• Develop and maintain responsive web applications using React.js and TypeScript
• Collaborate with designers to implement pixel-perfect UI components
• Work with backend developers to integrate APIs and services
• Optimize applications for maximum speed and scalability
• Mentor junior developers and conduct code reviews
• Participate in architectural discussions and technical planning
• Stay up-to-date with the latest frontend technologies and best practices

What We Offer:
• Competitive salary with performance bonuses
• Comprehensive health insurance for you and your family
• Annual learning and development budget
• Latest MacBook Pro and necessary equipment
• Flexible working hours and remote work options
• Stock options and equity participation
• Regular team building activities and company retreats`,
    responsibilities: [
      "Develop and maintain responsive web applications using React.js and TypeScript",
      "Collaborate with UX/UI designers to implement pixel-perfect interfaces",
      "Integrate with RESTful APIs and GraphQL endpoints",
      "Optimize application performance and ensure cross-browser compatibility",
      "Write clean, maintainable, and well-documented code",
      "Conduct code reviews and mentor junior developers",
      "Participate in agile development processes and sprint planning",
      "Contribute to frontend architecture and technical decisions",
      "Implement automated testing strategies (unit, integration, e2e)",
      "Stay current with frontend technologies and industry best practices",
    ],
    qualifications: [
      "Bachelor's degree in Computer Science, Engineering, or related field",
      "3-5 years of professional frontend development experience",
      "Strong proficiency in React.js and modern JavaScript (ES6+)",
      "Experience with TypeScript and static type checking",
      "Solid understanding of HTML5, CSS3, and responsive design principles",
      "Experience with CSS preprocessors (SCSS/SASS) or CSS-in-JS solutions",
      "Proficiency with Git version control and collaborative development workflows",
      "Experience with REST APIs and asynchronous programming",
      "Understanding of web performance optimization techniques",
      "Strong problem-solving skills and attention to detail",
    ],
    niceToHave: [
      "Experience with Next.js or other React frameworks",
      "Knowledge of state management libraries (Redux, Zustand, etc.)",
      "Experience with testing frameworks (Jest, React Testing Library, Cypress)",
      "Familiarity with CI/CD pipelines and deployment processes",
      "Experience with design systems and component libraries",
      "Knowledge of accessibility standards (WCAG)",
      "Experience with GraphQL and Apollo Client",
      "Understanding of server-side rendering and static site generation",
      "Experience with mobile-first development and PWAs",
      "Contributions to open-source projects",
    ],
    companyInfo: {
      name: "TechCorp Nigeria",
      description:
        "TechCorp Nigeria is a leading technology company focused on building innovative solutions for the African market. We specialize in fintech, e-commerce, and digital transformation services for businesses across Nigeria and West Africa.",
      industry: "Technology / Fintech",
      size: "50-200 employees",
      founded: "2018",
      website: "https://techcorp.ng",
      logo: "/placeholder.svg?height=100&width=100&text=TechCorp",
      culture: [
        "Innovation-driven environment",
        "Collaborative and inclusive team",
        "Continuous learning and growth",
        "Work-life balance priority",
        "Remote-first culture",
        "Diversity and inclusion focus",
      ],
    },
    applicationProcess: {
      steps: [
        "Submit your application with resume and portfolio",
        "Initial screening call with HR (30 minutes)",
        "Technical assessment and coding challenge",
        "Technical interview with engineering team (1 hour)",
        "Final interview with hiring manager (45 minutes)",
        "Reference checks and offer discussion",
      ],
      timeline: "2-3 weeks from application to offer",
      contact: {
        email: "careers@techcorp.ng",
        recruiter: "Sarah Johnson - Senior Talent Acquisition Specialist",
      },
    },
    similarJobs: [
      {
        id: 2,
        title: "React Developer",
        company: "StartupHub",
        location: "Remote",
        type: "Full-time",
        workMode: "Remote",
        experience: "2-4 years",
        salary: "₦300,000 - ₦500,000",
        salaryType: "monthly",
        description: "Build modern web applications with React and TypeScript.",
        requirements: ["React", "JavaScript", "CSS"],
        benefits: ["Remote Work", "Health Insurance"],
        postedDate: "2024-01-20",
        platform: "Indeed",
        companyLogo: "/placeholder.svg?height=60&width=60&text=SH",
        featured: false,
        urgent: false,
      },
      {
        id: 3,
        title: "Full Stack Developer",
        company: "InnovateLabs",
        location: "Abuja, Nigeria",
        type: "Full-time",
        workMode: "Hybrid",
        experience: "3-5 years",
        salary: "₦450,000 - ₦700,000",
        salaryType: "monthly",
        description: "Work on both frontend and backend technologies.",
        requirements: ["React", "Node.js", "MongoDB"],
        benefits: ["Health Insurance", "Learning Budget"],
        postedDate: "2024-01-18",
        platform: "LinkedIn",
        companyLogo: "/placeholder.svg?height=60&width=60&text=IL",
        featured: true,
        urgent: false,
      },
      {
        id: 4,
        title: "UI/UX Developer",
        company: "DesignPro",
        location: "Lagos, Nigeria",
        type: "Contract",
        workMode: "On-site",
        experience: "2-3 years",
        salary: "₦250,000 - ₦400,000",
        salaryType: "monthly",
        description: "Create beautiful and functional user interfaces.",
        requirements: ["HTML", "CSS", "JavaScript", "Figma"],
        benefits: ["Flexible Hours", "Creative Environment"],
        postedDate: "2024-01-15",
        platform: "AngelList",
        companyLogo: "/placeholder.svg?height=60&width=60&text=DP",
        featured: false,
        urgent: true,
      },
    ],
    views: 1250,
    applications: 45,
    lastUpdated: "2024-01-28",
  };
};

export default function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params); // ✅ unwrap the promise
  const job = getJobById(id);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getDaysAgo = () => {
    const posted = new Date(job.postedDate);
    const now = new Date();
    const diffTime = now.getTime() - posted.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays === 1 ? "1 day ago" : `${diffDays} days ago`;
  };

  const daysAgo = getDaysAgo();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header showSearch />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/jobs" className="hover:text-blue-600">
              Jobs
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900">{job.title}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Header */}
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                {job.featured && (
                  <Badge className="bg-blue-600">Featured</Badge>
                )}
                {job.urgent && <Badge className="bg-red-600">Urgent</Badge>}
                <Badge variant="outline">{job.type}</Badge>
                <Badge variant="outline">{job.workMode}</Badge>
                <Badge variant="outline">{job.experience}</Badge>
              </div>

              <h1 className="text-3xl font-bold mb-4">{job.title}</h1>

              <div className="flex items-center space-x-6 text-gray-600 mb-6">
                <div className="flex items-center">
                  <Building className="h-5 w-5 mr-2" />
                  <span className="font-medium">{job.company}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  <span className="font-medium text-green-600">
                    {job.salary}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Posted {daysAgo}</span>
                </div>
                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  <span>{job.views.toLocaleString()} views</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{job.applications} applications</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Updated {formatDate(job.lastUpdated)}</span>
                </div>
              </div>



              <p className="text-lg text-gray-600 mb-6">{job.description}</p>

              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className="text-gray-600 hover:text-blue-600"
                >
                  {isBookmarked ? (
                    <BookmarkCheck className="h-4 w-4 mr-2" />
                  ) : (
                    <Bookmark className="h-4 w-4 mr-2" />
                  )}
                  {isBookmarked ? "Bookmarked" : "Bookmark"}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-blue-600"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Job Content Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="requirements">Requirements</TabsTrigger>
                <TabsTrigger value="company">Company</TabsTrigger>
                <TabsTrigger value="process">Process</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Job Description */}
                <Card>
                  <CardHeader>
                    <CardTitle>Job Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      <p className="whitespace-pre-line text-gray-700">
                        {job.fullDescription}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Key Responsibilities */}
                <Card>
                  <CardHeader>
                    <CardTitle>Key Responsibilities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {job.responsibilities.map((responsibility: string, index: number) => (
                        <div key={index} className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{responsibility}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Benefits */}
                <Card>
                  <CardHeader>
                    <CardTitle>Benefits & Perks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-3">
                      {job.benefits.map((benefit, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0" />
                          <span className="text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="requirements" className="space-y-6">
                {/* Required Qualifications */}
                <Card>
                  <CardHeader>
                    <CardTitle>Required Qualifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {job.qualifications.map((qualification, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <AlertCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{qualification}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Technical Skills */}
                <Card>
                  <CardHeader>
                    <CardTitle>Required Technical Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {job.requirements.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="text-sm"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Nice to Have */}
                <Card>
                  <CardHeader>
                    <CardTitle>Nice to Have</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {job.niceToHave.map((item, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="company" className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4 mb-6">
                      <img
                        src={job.companyInfo.logo || "/placeholder.svg"}
                        alt={job.companyInfo.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">
                          {job.companyInfo.name}
                        </h3>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                          <div>
                            <span className="font-medium">Industry:</span>{" "}
                            {job.companyInfo.industry}
                          </div>
                          <div>
                            <span className="font-medium">Size:</span>{" "}
                            {job.companyInfo.size}
                          </div>
                          <div>
                            <span className="font-medium">Founded:</span>{" "}
                            {job.companyInfo.founded}
                          </div>
                          <div className="flex items-center">
                            <Globe className="h-3 w-3 mr-1" />
                            <Link
                              href={job.companyInfo.website}
                              className="text-blue-600 hover:underline"
                            >
                              Company Website
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold mb-3">About the Company</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {job.companyInfo.description}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Company Culture</h4>
                      <div className="grid md:grid-cols-2 gap-2">
                        {job.companyInfo.culture.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2"
                          >
                            <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0" />
                            <span className="text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="process" className="space-y-6">
                {/* Application Process */}
                <Card>
                  <CardHeader>
                    <CardTitle>Application Process</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {job.applicationProcess.steps.map((step, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-medium">
                            {index + 1}
                          </div>
                          <span className="text-sm">{step}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Clock className="h-4 w-4 text-blue-600 mr-2" />
                        <span className="font-medium text-blue-800">
                          Timeline
                        </span>
                      </div>
                      <p className="text-sm text-blue-700">
                        {job.applicationProcess.timeline}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {job.applicationProcess.contact.email && (
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-gray-600" />
                          <span className="text-sm">
                            {job.applicationProcess.contact.email}
                          </span>
                        </div>
                      )}
                      {job.applicationProcess.contact.phone && (
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-gray-600" />
                          <span className="text-sm">
                            {job.applicationProcess.contact.phone}
                          </span>
                        </div>
                      )}
                      {job.applicationProcess.contact.recruiter && (
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-gray-600" />
                          <span className="text-sm">
                            {job.applicationProcess.contact.recruiter}
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Card */}
            <Card className="">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <span className="text-2xl font-bold text-green-600">
                      {job.salary}
                    </span>
                    <span className="text-gray-500">/{job.salaryType}</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {job.experience} experience required
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    size="lg"
                    asChild
                  >
                    <Link
                      href={`https://${job.platform.toLowerCase()}.com`}
                      target="_blank"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Apply on {job.platform}
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    size="lg"
                  >
                    <Bookmark className="h-4 w-4 mr-2" />
                    Save for Later
                  </Button>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Job Type:</span>
                    <Badge variant="secondary">{job.type}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Work Mode:</span>
                    <Badge variant="secondary">{job.workMode}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Experience:</span>
                    <span>{job.experience}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Posted:</span>
                    <span>{daysAgo}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Platform:</span>
                    <Badge variant="outline">{job.platform}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Similar Jobs */}
            <Card>
              <CardHeader>
                <CardTitle>Similar Jobs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {job.similarJobs.map((similarJob) => (
                  <Link
                    key={similarJob.id}
                    href={`/jobs/${similarJob.id}`}
                    className="block hover:bg-gray-50 rounded-lg p-3 -m-3 transition-colors"
                  >
                    <div className="flex space-x-3">
                      <img
                        src={similarJob.companyLogo || "/placeholder.svg"}
                        alt={similarJob.company}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm line-clamp-1 mb-1">
                          {similarJob.title}
                        </h4>
                        <p className="text-xs text-gray-600 mb-1">
                          {similarJob.company}
                        </p>
                        <p className="text-xs text-gray-500 mb-2">
                          {similarJob.location}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex gap-1">
                            {similarJob.featured && (
                              <Badge className="bg-blue-600 text-xs">
                                Featured
                              </Badge>
                            )}
                            {similarJob.urgent && (
                              <Badge className="bg-red-600 text-xs">
                                Urgent
                              </Badge>
                            )}
                          </div>
                          <span className="text-xs font-medium text-green-600">
                            {similarJob.salary}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
