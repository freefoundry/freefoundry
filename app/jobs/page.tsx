"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Briefcase,
  Search,
  MapPin,
  DollarSign,
  Building,
  ExternalLink,
  ChevronDown,
  X,
  SlidersHorizontal,
  Calendar,
  Bookmark,
  BookmarkCheck,
} from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";

// Mock jobs data
const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechCorp Nigeria",
    location: "Lagos, Nigeria",
    type: "Full-time",
    workMode: "Remote",
    experience: "2-4 years",
    salary: "₦300,000 - ₦500,000",
    salaryType: "monthly",
    description:
      "We're looking for a skilled Frontend Developer to join our growing team. You'll work on building responsive web applications using React, TypeScript, and modern CSS frameworks.",
    requirements: ["React.js", "TypeScript", "CSS/SCSS", "Git", "REST APIs"],
    benefits: [
      "Health Insurance",
      "Remote Work",
      "Learning Budget",
      "Flexible Hours",
    ],
    postedDate: "2024-01-25",
    platform: "LinkedIn",
    companyLogo: "/placeholder.svg?height=60&width=60&text=TC",
    featured: true,
    urgent: false,
    bookmarked: false,
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "Fintech Solutions Ltd",
    location: "Abuja, Nigeria",
    type: "Full-time",
    workMode: "Hybrid",
    experience: "3-5 years",
    salary: "₦400,000 - ₦650,000",
    salaryType: "monthly",
    description:
      "Join our fintech team to build scalable backend systems. Experience with Node.js, Python, and cloud platforms required.",
    requirements: ["Node.js", "Python", "MongoDB", "AWS", "Docker"],
    benefits: [
      "Health Insurance",
      "Stock Options",
      "Training Budget",
      "Gym Membership",
    ],
    postedDate: "2024-01-24",
    platform: "Indeed",
    companyLogo: "/placeholder.svg?height=60&width=60&text=FS",
    featured: true,
    urgent: true,
    bookmarked: true,
  },
  {
    id: 3,
    title: "Full Stack Developer",
    company: "StartupHub",
    location: "Port Harcourt, Nigeria",
    type: "Contract",
    workMode: "On-site",
    experience: "1-3 years",
    salary: "₦250,000 - ₦400,000",
    salaryType: "monthly",
    description:
      "Exciting opportunity to work with a fast-growing startup. Build end-to-end web applications using modern technologies.",
    requirements: ["JavaScript", "React", "Node.js", "PostgreSQL", "Git"],
    benefits: ["Flexible Schedule", "Startup Equity", "Learning Opportunities"],
    postedDate: "2024-01-23",
    platform: "AngelList",
    companyLogo: "/placeholder.svg?height=60&width=60&text=SH",
    featured: false,
    urgent: false,
    bookmarked: false,
  },
  {
    id: 4,
    title: "Mobile Developer (React Native)",
    company: "MobileFirst Agency",
    location: "Remote",
    type: "Full-time",
    workMode: "Remote",
    experience: "2-4 years",
    salary: "$2,000 - $3,500",
    salaryType: "monthly",
    description:
      "Build cross-platform mobile applications for international clients. Remote-first company with flexible working hours.",
    requirements: [
      "React Native",
      "JavaScript",
      "iOS/Android",
      "Redux",
      "Firebase",
    ],
    benefits: [
      "100% Remote",
      "USD Salary",
      "Health Insurance",
      "Equipment Allowance",
    ],
    postedDate: "2024-01-22",
    platform: "RemoteOK",
    companyLogo: "/placeholder.svg?height=60&width=60&text=MF",
    featured: true,
    urgent: false,
    bookmarked: false,
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "CloudTech Systems",
    location: "Lagos, Nigeria",
    type: "Full-time",
    workMode: "Hybrid",
    experience: "3-6 years",
    salary: "₦500,000 - ₦800,000",
    salaryType: "monthly",
    description:
      "Manage cloud infrastructure and CI/CD pipelines. Experience with AWS, Docker, and Kubernetes required.",
    requirements: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform"],
    benefits: [
      "Health Insurance",
      "Certification Budget",
      "Flexible Hours",
      "Stock Options",
    ],
    postedDate: "2024-01-21",
    platform: "LinkedIn",
    companyLogo: "/placeholder.svg?height=60&width=60&text=CT",
    featured: false,
    urgent: true,
    bookmarked: false,
  },
  {
    id: 6,
    title: "UI/UX Designer",
    company: "Design Studio Pro",
    location: "Ibadan, Nigeria",
    type: "Part-time",
    workMode: "Remote",
    experience: "1-2 years",
    salary: "₦150,000 - ₦250,000",
    salaryType: "monthly",
    description:
      "Create beautiful and intuitive user interfaces for web and mobile applications. Portfolio review required.",
    requirements: [
      "Figma",
      "Adobe XD",
      "Prototyping",
      "User Research",
      "HTML/CSS",
    ],
    benefits: [
      "Flexible Hours",
      "Remote Work",
      "Portfolio Projects",
      "Mentorship",
    ],
    postedDate: "2024-01-20",
    platform: "Dribbble",
    companyLogo: "/placeholder.svg?height=60&width=60&text=DS",
    featured: false,
    urgent: false,
    bookmarked: true,
  },
  {
    id: 7,
    title: "Data Scientist",
    company: "Analytics Corp",
    location: "Lagos, Nigeria",
    type: "Full-time",
    workMode: "On-site",
    experience: "2-5 years",
    salary: "₦400,000 - ₦700,000",
    salaryType: "monthly",
    description:
      "Analyze large datasets and build machine learning models to drive business insights and decisions.",
    requirements: ["Python", "R", "SQL", "Machine Learning", "Statistics"],
    benefits: [
      "Health Insurance",
      "Research Budget",
      "Conference Attendance",
      "Flexible Hours",
    ],
    postedDate: "2024-01-19",
    platform: "Indeed",
    companyLogo: "/placeholder.svg?height=60&width=60&text=AC",
    featured: true,
    urgent: false,
    bookmarked: false,
  },
  {
    id: 8,
    title: "Product Manager",
    company: "InnovateNG",
    location: "Abuja, Nigeria",
    type: "Full-time",
    workMode: "Hybrid",
    experience: "3-5 years",
    salary: "₦600,000 - ₦900,000",
    salaryType: "monthly",
    description:
      "Lead product development from conception to launch. Work closely with engineering and design teams.",
    requirements: [
      "Product Strategy",
      "Agile/Scrum",
      "Analytics",
      "User Research",
      "Roadmapping",
    ],
    benefits: [
      "Health Insurance",
      "Stock Options",
      "Learning Budget",
      "Team Retreats",
    ],
    postedDate: "2024-01-18",
    platform: "ProductHunt",
    companyLogo: "/placeholder.svg?height=60&width=60&text=IN",
    featured: false,
    urgent: false,
    bookmarked: false,
  },
  {
    id: 9,
    title: "Cybersecurity Analyst",
    company: "SecureNet Africa",
    location: "Lagos, Nigeria",
    type: "Full-time",
    workMode: "On-site",
    experience: "2-4 years",
    salary: "₦350,000 - ₦550,000",
    salaryType: "monthly",
    description:
      "Monitor and protect our systems from security threats. Experience with security tools and frameworks required.",
    requirements: [
      "Network Security",
      "SIEM Tools",
      "Incident Response",
      "Risk Assessment",
      "Compliance",
    ],
    benefits: [
      "Health Insurance",
      "Security Certifications",
      "Training Budget",
      "Overtime Pay",
    ],
    postedDate: "2024-01-17",
    platform: "CyberSeek",
    companyLogo: "/placeholder.svg?height=60&width=60&text=SN",
    featured: false,
    urgent: true,
    bookmarked: false,
  },
  {
    id: 10,
    title: "Junior Software Developer",
    company: "CodeAcademy Nigeria",
    location: "Remote",
    type: "Full-time",
    workMode: "Remote",
    experience: "0-2 years",
    salary: "₦180,000 - �N300,000",
    salaryType: "monthly",
    description:
      "Perfect entry-level position for new graduates. Mentorship and training provided. Work on real projects while learning.",
    requirements: [
      "JavaScript",
      "HTML/CSS",
      "Git",
      "Problem Solving",
      "Eagerness to Learn",
    ],
    benefits: [
      "Mentorship Program",
      "Training Budget",
      "Remote Work",
      "Career Growth",
    ],
    postedDate: "2024-01-16",
    platform: "LinkedIn",
    companyLogo: "/placeholder.svg?height=60&width=60&text=CA",
    featured: true,
    urgent: false,
    bookmarked: false,
  },
  {
    id: 11,
    title: "QA Engineer",
    company: "TestPro Solutions",
    location: "Lagos, Nigeria",
    type: "Contract",
    workMode: "Hybrid",
    experience: "2-3 years",
    salary: "₦280,000 - ₦420,000",
    salaryType: "monthly",
    description:
      "Ensure software quality through manual and automated testing. Experience with testing frameworks preferred.",
    requirements: [
      "Manual Testing",
      "Selenium",
      "Test Planning",
      "Bug Tracking",
      "API Testing",
    ],
    benefits: [
      "Flexible Schedule",
      "Training Opportunities",
      "Health Insurance",
    ],
    postedDate: "2024-01-15",
    platform: "Indeed",
    companyLogo: "/placeholder.svg?height=60&width=60&text=TP",
    featured: false,
    urgent: false,
    bookmarked: true,
  },
  {
    id: 12,
    title: "Technical Writer",
    company: "DocuTech",
    location: "Remote",
    type: "Part-time",
    workMode: "Remote",
    experience: "1-3 years",
    salary: "₦120,000 - ₦200,000",
    salaryType: "monthly",
    description:
      "Create technical documentation, API docs, and user guides. Strong writing skills and technical background required.",
    requirements: [
      "Technical Writing",
      "Markdown",
      "API Documentation",
      "Git",
      "Communication",
    ],
    benefits: [
      "100% Remote",
      "Flexible Hours",
      "Writing Portfolio",
      "Learning Resources",
    ],
    postedDate: "2024-01-14",
    platform: "WriterAccess",
    companyLogo: "/placeholder.svg?height=60&width=60&text=DT",
    featured: false,
    urgent: false,
    bookmarked: false,
  },
];

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [selectedWorkModes, setSelectedWorkModes] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(8);
  const [bookmarkedJobs, setBookmarkedJobs] = useState<number[]>([2, 6, 11]);

  // Reset pagination when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [
    searchTerm,
    selectedJobTypes,
    selectedWorkModes,
    selectedExperience,
    selectedLocations,
    sortBy,
  ]);

  // Get unique values for filters
  const jobTypes = [...new Set(jobs.map((job) => job.type))];
  const workModes = [...new Set(jobs.map((job) => job.workMode))];
  const experienceLevels = [...new Set(jobs.map((job) => job.experience))];
  const locations = [...new Set(jobs.map((job) => job.location))];

  // Filter jobs based on selected filters
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.requirements.some((req) =>
        req.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesJobType =
      selectedJobTypes.length === 0 || selectedJobTypes.includes(job.type);
    const matchesWorkMode =
      selectedWorkModes.length === 0 ||
      selectedWorkModes.includes(job.workMode);
    const matchesExperience =
      selectedExperience.length === 0 ||
      selectedExperience.includes(job.experience);
    const matchesLocation =
      selectedLocations.length === 0 ||
      selectedLocations.includes(job.location);

    return (
      matchesSearch &&
      matchesJobType &&
      matchesWorkMode &&
      matchesExperience &&
      matchesLocation
    );
  });

  // Sort jobs
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return (
          new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
        );
      case "featured":
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      case "salary-high":
        const aSalary = Number.parseInt(a.salary.replace(/[^\d]/g, ""));
        const bSalary = Number.parseInt(b.salary.replace(/[^\d]/g, ""));
        return bSalary - aSalary;
      case "company":
        return a.company.localeCompare(b.company);
      default:
        return 0;
    }
  });

  const handleJobTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setSelectedJobTypes([...selectedJobTypes, type]);
    } else {
      setSelectedJobTypes(selectedJobTypes.filter((t) => t !== type));
    }
  };

  const handleWorkModeChange = (mode: string, checked: boolean) => {
    if (checked) {
      setSelectedWorkModes([...selectedWorkModes, mode]);
    } else {
      setSelectedWorkModes(selectedWorkModes.filter((m) => m !== mode));
    }
  };

  const handleExperienceChange = (exp: string, checked: boolean) => {
    if (checked) {
      setSelectedExperience([...selectedExperience, exp]);
    } else {
      setSelectedExperience(selectedExperience.filter((e) => e !== exp));
    }
  };

  const handleLocationChange = (location: string, checked: boolean) => {
    if (checked) {
      setSelectedLocations([...selectedLocations, location]);
    } else {
      setSelectedLocations(selectedLocations.filter((l) => l !== location));
    }
  };

  const toggleBookmark = (jobId: number) => {
    if (bookmarkedJobs.includes(jobId)) {
      setBookmarkedJobs(bookmarkedJobs.filter((id) => id !== jobId));
    } else {
      setBookmarkedJobs([...bookmarkedJobs, jobId]);
    }
  };

  const clearAllFilters = () => {
    setSelectedJobTypes([]);
    setSelectedWorkModes([]);
    setSelectedExperience([]);
    setSelectedLocations([]);
    setSearchTerm("");
  };

  const activeFiltersCount =
    selectedJobTypes.length +
    selectedWorkModes.length +
    selectedExperience.length +
    selectedLocations.length;

  const getDaysAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays === 1 ? "1 day ago" : `${diffDays} days ago`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header showSearch />
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Tech Job Opportunities</h1>
          <p className="text-gray-600">
            Discover {jobs.length} curated job opportunities for developers,
            designers, and tech professionals in Nigeria and remote positions
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="w-full justify-between"
              >
                <div className="flex items-center">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </div>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    showFilters ? "rotate-180" : ""
                  }`}
                />
              </Button>
            </div>

            {/* Filters Panel */}
            <div
              className={`space-y-6 ${
                showFilters ? "block" : "hidden lg:block"
              }`}
            >
              <Card>
                <CardContent className="p-6">
                  {/* Search */}
                  <div className="mb-6">
                    <Label
                      htmlFor="search"
                      className="text-sm font-medium mb-2 block"
                    >
                      Search Jobs
                    </Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="search"
                        placeholder="Search by title, company, or skills..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Job Type Filter */}
                  <div className="mb-6">
                    <Label className="text-sm font-medium mb-3 block">
                      Job Type
                    </Label>
                    <div className="space-y-2">
                      {jobTypes.map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox
                            id={`type-${type}`}
                            checked={selectedJobTypes.includes(type)}
                            onCheckedChange={(checked) =>
                              handleJobTypeChange(type, checked as boolean)
                            }
                          />
                          <Label htmlFor={`type-${type}`} className="text-sm">
                            {type}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Work Mode Filter */}
                  <div className="mb-6">
                    <Label className="text-sm font-medium mb-3 block">
                      Work Mode
                    </Label>
                    <div className="space-y-2">
                      {workModes.map((mode) => (
                        <div key={mode} className="flex items-center space-x-2">
                          <Checkbox
                            id={`mode-${mode}`}
                            checked={selectedWorkModes.includes(mode)}
                            onCheckedChange={(checked) =>
                              handleWorkModeChange(mode, checked as boolean)
                            }
                          />
                          <Label htmlFor={`mode-${mode}`} className="text-sm">
                            {mode}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Experience Filter */}
                  <div className="mb-6">
                    <Label className="text-sm font-medium mb-3 block">
                      Experience Level
                    </Label>
                    <div className="space-y-2">
                      {experienceLevels.map((exp) => (
                        <div key={exp} className="flex items-center space-x-2">
                          <Checkbox
                            id={`exp-${exp}`}
                            checked={selectedExperience.includes(exp)}
                            onCheckedChange={(checked) =>
                              handleExperienceChange(exp, checked as boolean)
                            }
                          />
                          <Label htmlFor={`exp-${exp}`} className="text-sm">
                            {exp}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Location Filter */}
                  <div className="mb-6">
                    <Label className="text-sm font-medium mb-3 block">
                      Location
                    </Label>
                    <div className="space-y-2">
                      {locations.map((location) => (
                        <div
                          key={location}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`location-${location}`}
                            checked={selectedLocations.includes(location)}
                            onCheckedChange={(checked) =>
                              handleLocationChange(location, checked as boolean)
                            }
                          />
                          <Label
                            htmlFor={`location-${location}`}
                            className="text-sm"
                          >
                            {location}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Clear Filters */}
                  {activeFiltersCount > 0 && (
                    <Button
                      variant="outline"
                      onClick={clearAllFilters}
                      className="w-full bg-transparent"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Clear All Filters
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <p className="text-gray-600">
                  Showing {sortedJobs.length} of {jobs.length} jobs
                </p>
                {activeFiltersCount > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedJobTypes.map((type) => (
                      <Badge key={type} variant="secondary" className="text-xs">
                        {type}
                        <button
                          onClick={() => handleJobTypeChange(type, false)}
                          className="ml-1 hover:text-red-500"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                    {selectedWorkModes.map((mode) => (
                      <Badge key={mode} variant="secondary" className="text-xs">
                        {mode}
                        <button
                          onClick={() => handleWorkModeChange(mode, false)}
                          className="ml-1 hover:text-red-500"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                    {selectedExperience.map((exp) => (
                      <Badge key={exp} variant="secondary" className="text-xs">
                        {exp}
                        <button
                          onClick={() => handleExperienceChange(exp, false)}
                          className="ml-1 hover:text-red-500"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                    {selectedLocations.map((location) => (
                      <Badge
                        key={location}
                        variant="secondary"
                        className="text-xs"
                      >
                        {location}
                        <button
                          onClick={() => handleLocationChange(location, false)}
                          className="ml-1 hover:text-red-500"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="featured">Featured First</SelectItem>
                  <SelectItem value="salary-high">Highest Salary</SelectItem>
                  <SelectItem value="company">Company A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Jobs List */}
            {sortedJobs.length === 0 ? (
              <div className="text-center py-12">
                <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No jobs found
                </h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your filters or search terms
                </p>
                <Button onClick={clearAllFilters} variant="outline">
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {sortedJobs
                    .slice(
                      (currentPage - 1) * jobsPerPage,
                      currentPage * jobsPerPage
                    )
                    .map((job) => (
                      <Card
                        key={job.id}
                        className="hover:shadow-lg transition-shadow"
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-start space-x-4">
                              <img
                                src={job.companyLogo || "/placeholder.svg"}
                                alt={`${job.company} logo`}
                                className="w-12 h-12 rounded-lg object-cover"
                              />
                              <div className="flex-1">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <h3 className="text-xl font-semibold mb-1">
                                      {job.title}
                                    </h3>
                                    <div className="flex items-center text-gray-600 mb-2">
                                      <Building className="h-4 w-4 mr-1" />
                                      <span className="font-medium">
                                        {job.company}
                                      </span>
                                      <span className="mx-2">•</span>
                                      <MapPin className="h-4 w-4 mr-1" />
                                      <span>{job.location}</span>
                                    </div>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => toggleBookmark(job.id)}
                                    className="text-gray-400 hover:text-blue-600"
                                  >
                                    {bookmarkedJobs.includes(job.id) ? (
                                      <BookmarkCheck className="h-5 w-5 text-blue-600" />
                                    ) : (
                                      <Bookmark className="h-5 w-5" />
                                    )}
                                  </Button>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-3">
                                  {job.featured && (
                                    <Badge className="bg-blue-600">
                                      Featured
                                    </Badge>
                                  )}
                                  {job.urgent && (
                                    <Badge className="bg-red-600">Urgent</Badge>
                                  )}
                                  <Badge variant="outline">{job.type}</Badge>
                                  <Badge variant="outline">
                                    {job.workMode}
                                  </Badge>
                                  <Badge variant="outline">
                                    {job.experience}
                                  </Badge>
                                  <Badge
                                    variant="secondary"
                                    className="bg-green-50 text-green-700 border-green-200"
                                  >
                                    <DollarSign className="h-3 w-3 mr-1" />
                                    {job.salary}
                                  </Badge>
                                </div>

                                <p className="text-gray-600 mb-4 line-clamp-2">
                                  {job.description}
                                </p>

                                <div className="mb-4">
                                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                                    Required Skills:
                                  </h4>
                                  <div className="flex flex-wrap gap-1">
                                    {job.requirements.slice(0, 5).map((req) => (
                                      <Badge
                                        key={req}
                                        variant="outline"
                                        className="text-xs"
                                      >
                                        {req}
                                      </Badge>
                                    ))}
                                    {job.requirements.length > 5 && (
                                      <Badge
                                        variant="outline"
                                        className="text-xs"
                                      >
                                        +{job.requirements.length - 5} more
                                      </Badge>
                                    )}
                                  </div>
                                </div>

                                <div className="flex items-center justify-between">
                                  <div className="flex items-center text-sm text-gray-500">
                                    <Calendar className="h-4 w-4 mr-1" />
                                    <span>{getDaysAgo(job.postedDate)}</span>
                                    <span className="mx-2">•</span>
                                    <span className="text-blue-600">
                                      {job.platform}
                                    </span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Link href={`/jobs/${job.id}`} passHref>
                                      <Button variant="outline" size="sm">
                                        View Details
                                      </Button>
                                    </Link>
                                    <Button
                                      size="sm"
                                      className="flex items-center"
                                    >
                                      <ExternalLink className="h-3 w-3 mr-1" />
                                      Apply on {job.platform}
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>

                {/* Pagination */}
                {Math.ceil(sortedJobs.length / jobsPerPage) > 1 && (
                  <div className="mt-12">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        Showing {(currentPage - 1) * jobsPerPage + 1} to{" "}
                        {Math.min(currentPage * jobsPerPage, sortedJobs.length)}{" "}
                        of {sortedJobs.length} jobs
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(1)}
                          disabled={currentPage === 1}
                        >
                          First
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setCurrentPage(Math.max(1, currentPage - 1))
                          }
                          disabled={currentPage === 1}
                        >
                          Previous
                        </Button>

                        <div className="flex items-center space-x-1">
                          {(() => {
                            const totalPages = Math.ceil(
                              sortedJobs.length / jobsPerPage
                            );
                            const pages = [];

                            if (totalPages <= 7) {
                              for (let i = 1; i <= totalPages; i++) {
                                pages.push(i);
                              }
                            } else {
                              pages.push(1);
                              if (currentPage > 3) pages.push("...");

                              const start = Math.max(2, currentPage - 1);
                              const end = Math.min(
                                totalPages - 1,
                                currentPage + 1
                              );

                              for (let i = start; i <= end; i++) {
                                if (i !== 1 && i !== totalPages) pages.push(i);
                              }

                              if (currentPage < totalPages - 2)
                                pages.push("...");
                              if (totalPages > 1) pages.push(totalPages);
                            }

                            return pages.map((page, index) => (
                              <div key={index}>
                                {page === "..." ? (
                                  <span className="px-3 py-2 text-gray-400">
                                    ...
                                  </span>
                                ) : (
                                  <Button
                                    variant={
                                      currentPage === page
                                        ? "default"
                                        : "outline"
                                    }
                                    size="sm"
                                    onClick={() =>
                                      setCurrentPage(page as number)
                                    }
                                    className={`w-10 h-10 ${
                                      currentPage === page
                                        ? "bg-blue-600 text-white"
                                        : ""
                                    }`}
                                  >
                                    {page}
                                  </Button>
                                )}
                              </div>
                            ));
                          })()}
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setCurrentPage(
                              Math.min(
                                Math.ceil(sortedJobs.length / jobsPerPage),
                                currentPage + 1
                              )
                            )
                          }
                          disabled={
                            currentPage ===
                            Math.ceil(sortedJobs.length / jobsPerPage)
                          }
                        >
                          Next
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setCurrentPage(
                              Math.ceil(sortedJobs.length / jobsPerPage)
                            )
                          }
                          disabled={
                            currentPage ===
                            Math.ceil(sortedJobs.length / jobsPerPage)
                          }
                        >
                          Last
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
