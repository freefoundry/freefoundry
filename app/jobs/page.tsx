"use client";

import React, { useEffect, useState } from "react";
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
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination } from "@/components/pagination/Pagination";

type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  workMode: string;
  experience: string;
  salary: string;
  salaryType: string;
  description: string;
  requirements: string[];
  benefits: string[];
  postedDate: string;
  platform: string;
  companyLogo: string;
  featured: number;
  urgent: number;
  applicationUrl?: string;
  bookmarked?: boolean;
};

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [loading, setLoading] = useState(false);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [selectedWorkModes, setSelectedWorkModes] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(5);
  const [bookmarkedJobs, setBookmarkedJobs] = useState<number[]>([]);

  // Fetch jobs
  const fetchJobs = async () => {
    setLoading(true);
    try {
      const body = {
        page: currentPage,
        limit: jobsPerPage,
        search: searchTerm || undefined,
        types: selectedJobTypes, //  matches backend key
        workModes: selectedWorkModes,
        experienceLevels: selectedExperience,
        locations: selectedLocations,
        sort: sortBy,
      };

      const res = await fetch("/api/jobs/public", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      const normalized = (data.data || []).map((job: any) => ({
        ...job,
        requirements:
          typeof job.requirements === "string"
            ? JSON.parse(job.requirements)
            : job.requirements || [],
        benefits:
          typeof job.benefits === "string"
            ? JSON.parse(job.benefits)
            : job.benefits || [],
      }));

      setJobs(normalized);
      setTotalJobs(data.pagination?.total || normalized.length);
    } catch (err) {
      console.error("  Failed to fetch jobs:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, [
    searchTerm,
    selectedJobTypes,
    selectedWorkModes,
    selectedExperience,
    selectedLocations,
    sortBy,
    currentPage,
  ]);

  // Get unique values for filters
  // Static filter lists (based on your mock jobs data)
  const jobTypes = ["Full-time", "Part-time", "Contract"];

  const workModes = ["Remote", "Hybrid", "On-site"];

  const experienceLevels = [
    "0-2 years",
    "3-5 years",
    "4-6 years",
    "6-8 years",
    "8+ years",
  ];

  const locations = [
    "Lagos, Nigeria",
    "Abuja, Nigeria",
    "Port Harcourt, Nigeria",
    "Ibadan, Nigeria",
  ];

  const handleToggle = (
    value: string,
    selected: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const toggleBookmark = (jobId: number) => {
    setBookmarkedJobs((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId]
    );
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
  const parseMySQLDate = (value: string) => {
    return new Date(value.replace(" ", "T"));
  };
  const getDaysAgo = (dateString: string) => {
    if (!dateString) return "";

    const d = parseMySQLDate(dateString);
    const now = new Date();

    const diffMs = now.getTime() - d.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) return "Today";
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 30) return `${diffDays} days ago`;

    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths === 1) return "1 month ago";
    if (diffMonths < 12) return `${diffMonths} months ago`;

    const diffYears = Math.floor(diffMonths / 12);
    return diffYears === 1 ? "1 year ago" : `${diffYears} years ago`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showSearch type="jobs" />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Tech Job Opportunities</h1>
          <p className="text-gray-600">
            Discover {totalJobs} job openings for developers, designers, and
            tech professionals.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80">
            {/* Mobile toggle */}
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

            {/* Filters */}
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
                      className="mb-2 block text-sm font-medium"
                    >
                      Search Jobs
                    </Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="search"
                        placeholder="Search by title, company, or skills..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Job Type */}
                  <FilterGroup
                    label="Job Type"
                    options={jobTypes}
                    selected={selectedJobTypes}
                    onToggle={(v) =>
                      handleToggle(v, selectedJobTypes, setSelectedJobTypes)
                    }
                  />

                  {/* Work Mode */}
                  <FilterGroup
                    label="Work Mode"
                    options={workModes}
                    selected={selectedWorkModes}
                    onToggle={(v) =>
                      handleToggle(v, selectedWorkModes, setSelectedWorkModes)
                    }
                  />

                  {/* Experience */}
                  <FilterGroup
                    label="Experience Level"
                    options={experienceLevels}
                    selected={selectedExperience}
                    onToggle={(v) =>
                      handleToggle(v, selectedExperience, setSelectedExperience)
                    }
                  />

                  {/* Location */}
                  <FilterGroup
                    label="Location"
                    options={locations}
                    selected={selectedLocations}
                    onToggle={(v) =>
                      handleToggle(v, selectedLocations, setSelectedLocations)
                    }
                  />

                  {activeFiltersCount > 0 && (
                    <Button
                      variant="outline"
                      onClick={clearAllFilters}
                      className="w-full mt-4"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Clear All Filters
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Jobs Section */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Showing {jobs.length} of {totalJobs} jobs
              </p>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="salary-high">Highest Salary</SelectItem>
                  <SelectItem value="company">Company A–Z</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Job Cards */}
            {loading ? (
              <JobSkeletonGrid count={jobsPerPage} />
            ) : jobs.length === 0 ? (
              <NoJobs clearAll={clearAllFilters} />
            ) : (
              <>
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      toggleBookmark={toggleBookmark}
                      bookmarked={bookmarkedJobs.includes(job.id)}
                      getDaysAgo={getDaysAgo}
                    />
                  ))}
                </div>

                {totalJobs > jobsPerPage && (
                  <div className="mt-6">
                    <Pagination
                      total={totalJobs}
                      perPage={jobsPerPage}
                      page={currentPage}
                      onPageChange={(p) => setCurrentPage(p)}
                    />
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

/* --- Extracted Components --- */
function FilterGroup({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  if (options.length === 0) return null;
  return (
    <div className="mb-6">
      <Label className="text-sm font-medium mb-3 block">{label}</Label>
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option} className="flex items-center space-x-2">
            <Checkbox
              id={`${label}-${option}`}
              checked={selected.includes(option)}
              onCheckedChange={() => onToggle(option)}
            />
            <Label htmlFor={`${label}-${option}`} className="text-sm">
              {option}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}

function JobSkeletonGrid({ count }: { count: number }) {
  return (
    <div className="space-y-4">
      {[...Array(count)].map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <CardContent className="p-6 space-y-3">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-8 w-32" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function NoJobs({ clearAll }: { clearAll: () => void }) {
  return (
    <div className="text-center py-12">
      <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
      <p className="text-gray-500 mb-4">
        Try adjusting your filters or search terms
      </p>
      <Button onClick={clearAll} variant="outline">
        Clear All Filters
      </Button>
    </div>
  );
}

function JobCard({
  job,
  toggleBookmark,
  bookmarked,
  getDaysAgo,
}: {
  job: Job;
  toggleBookmark: (id: number) => void;
  bookmarked: boolean;
  getDaysAgo: (date: string) => string;
}) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-4">
            <img
              src={job.companyLogo || "/placeholder.svg"}
              alt={job.company}
              className="w-12 h-12 rounded object-cover"
            />
            <div>
              <h3 className="text-xl font-semibold">{job.title}</h3>
              <p className="text-gray-600 text-sm mb-2">
                {job.company} {job.location && "•"} {job.location}
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                {job.featured === 1 && (
                  <Badge className="bg-blue-600">Featured</Badge>
                )}
                {job.urgent === 1 && (
                  <Badge className="bg-red-600">Urgent</Badge>
                )}
                {job.type && <Badge variant="outline">{job.type}</Badge>}
                {job.workMode && (
                  <Badge variant="outline">{job.workMode}</Badge>
                )}
                {job.experience && (
                  <Badge variant="outline">{job.experience}</Badge>
                )}
              </div>
              <p className="text-gray-600 line-clamp-2 mb-3">
                {job.description}
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  {getDaysAgo(job.postedDate)}
                  <span className="mx-2">•</span>
                  <span className="text-blue-600">{job.platform}</span>
                </div>
                <div className="flex space-x-2">
                  <Link href={`/jobs/${job.id}`}>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </Link>
                  <Button size="sm">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Apply
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleBookmark(job.id)}
          >
            {bookmarked ? (
              <BookmarkCheck className="h-5 w-5 text-blue-600" />
            ) : (
              <Bookmark className="h-5 w-5 text-gray-400" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
