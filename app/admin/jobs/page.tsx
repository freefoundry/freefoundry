"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Copy,
  Download,
  Upload,
  Calendar,
  MapPin,
  Building,
  Star,
  TrendingUp,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import type { Job } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

export default function JobsAdminPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [workModeFilter, setWorkModeFilter] = useState("all");
  const [selectedJobs, setSelectedJobs] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState("newest");

  //  Fetch jobs from API
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/jobs");
      if (!res.ok) throw new Error("Failed to fetch jobs");
      const data = await res.json();
      setJobs(data);
    } catch (err) {
      console.error("❌ Error loading jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);
  //  Filter and sort jobs
  const filteredJobs = jobs
    .filter((job) => {
      const matchesSearch =
        job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType =
        typeFilter === "all" || job.type?.toLowerCase() === typeFilter;
      const matchesWorkMode =
        workModeFilter === "all" ||
        job.workMode?.toLowerCase() === workModeFilter;

      return matchesSearch && matchesType && matchesWorkMode;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
          );
        case "oldest":
          return (
            new Date(a.postedDate).getTime() - new Date(b.postedDate).getTime()
          );
        case "title":
          return a.title.localeCompare(b.title);
        case "company":
          return a.company.localeCompare(b.company);
        default:
          return 0;
      }
    });

  const handleSelectJob = (jobId: number) => {
    setSelectedJobs((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId]
    );
  };

  const handleSelectAll = () => {
    setSelectedJobs(
      selectedJobs.length === filteredJobs.length
        ? []
        : filteredJobs.map((job) => job.id)
    );
  };
  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action} on jobs:`, selectedJobs);
    // Implement bulk actions here
    setSelectedJobs([]);
  };
  const handleDeleteJob = async (jobId: number) => {
    if (!confirm("Are you sure you want to delete this job?")) return;

    try {
      const res = await fetch(`/api/jobs/${jobId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete job");

      setJobs((prev) => prev.filter((job) => job.id !== jobId));
      setSelectedJobs((prev) => prev.filter((id) => id !== jobId));
    } catch (err: any) {
      console.error("❌ Delete failed:", err);
      alert("Error deleting job: " + err.message);
    }
  };

  const handleToggleFeatured = (jobId: number) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === jobId ? { ...job, featured: !job.featured } : job
      )
    );
  };

  const stats = {
    total: jobs.length,
    featured: jobs.filter((job) => job.featured).length,
    urgent: jobs.filter((job) => job.urgent).length,
    remote: jobs.filter((job) => job.workMode === "Remote").length,
  };
const currencySymbols: Record<string, string> = {
  NGN: "₦",
  USD: "$",
  EUR: "€",
  GBP: "£",
  INR: "₹",
  AUD: "A$",
  CAD: "C$",
};

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Jobs</h1>
              <p className="text-gray-600">
                Manage job listings and applications
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Link href="/admin/jobs/new">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Job
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Building className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Total Jobs
                  </p>

                  <div className="text-2xl font-bold text-gray-900">
                    {loading ? <Skeleton className="h-6 w-12" /> : stats.total}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Featured</p>
                  <div className="text-2xl font-bold text-gray-900">
                    {loading ? (
                      <Skeleton className="h-6 w-12" />
                    ) : (
                      stats.featured
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Urgent</p>
                  <div className="text-2xl font-bold text-gray-900">
                    {loading ? <Skeleton className="h-6 w-12" /> : stats.urgent}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <MapPin className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Remote</p>
                  <div className="text-2xl font-bold text-gray-900">
                    {loading ? <Skeleton className="h-6 w-12" /> : stats.remote}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search jobs by title, company, or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Job Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="freelance">Freelance</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={workModeFilter}
                  onValueChange={setWorkModeFilter}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Work Mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Modes</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                    <SelectItem value="on-site">On-site</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="title">Title A-Z</SelectItem>
                    <SelectItem value="company">Company A-Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bulk Actions */}
        {selectedJobs.length > 0 && (
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {selectedJobs.length} job
                  {selectedJobs.length !== 1 ? "s" : ""} selected
                </span>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleBulkAction("feature")}
                  >
                    <Star className="h-4 w-4 mr-1" />
                    Feature
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleBulkAction("urgent")}
                  >
                    <TrendingUp className="h-4 w-4 mr-1" />
                    Mark Urgent
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleBulkAction("delete")}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Jobs Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Jobs ({filteredJobs.length})</span>
              {/* <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button> */}
              <Button
                variant="outline"
                onClick={() => fetchJobs()}
                disabled={loading}
              >
                {loading ? "Syncing..." : "Sync"}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              {loading ? (
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={
                            selectedJobs.length === filteredJobs.length &&
                            filteredJobs.length > 0
                          }
                          onCheckedChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead>Job Details</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Location & Type</TableHead>
                      <TableHead>Salary</TableHead>
                      <TableHead>Posted</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredJobs.map((job) => (
                      <TableRow key={job.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedJobs.includes(job.id)}
                            onCheckedChange={() => handleSelectJob(job.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <Link
                                href={`/admin/jobs/${job.id}`}
                                className="font-medium text-blue-600 hover:text-blue-800"
                              >
                                {job.title}
                              </Link>
                              {Boolean(job.featured) && (
                                <Badge variant="secondary" className="text-xs">
                                  <Star className="h-3 w-3 mr-1" />
                                  Featured
                                </Badge>
                              )}

                              {Boolean(job.urgent) && (
                                <Badge
                                  variant="destructive"
                                  className="text-xs"
                                >
                                  <TrendingUp className="h-3 w-3 mr-1" />
                                  Urgent
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 line-clamp-1">
                              {job.description}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <img
                              src={job.companyLogo || "/placeholder.svg"}
                              alt={job.company}
                              className="h-8 w-8 rounded-full"
                            />
                            <div>
                              <p className="font-medium">{job.company}</p>
                              <p className="text-sm text-gray-600">
                                {job.platform}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center text-sm">
                              <MapPin className="h-3 w-3 mr-1 text-gray-400" />
                              {job.location}
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className="text-xs">
                                {job.type}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {job.workMode}
                              </Badge>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center text-sm">
                            <span className="mr-1 text-gray-400">
                              {currencySymbols[job.currency] || job.currency}
                            </span>
                            {job.salary}
                          </div>

                          {job.salaryType && (
                            <p className="text-xs text-gray-500">
                              per {job.salaryType}
                            </p>
                          )}
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(job.postedDate).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-green-600">
                            Active
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem asChild>
                                <Link href={`/jobs/${job.id}`}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/admin/jobs/${job.id}/edit`}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="h-4 w-4 mr-2" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleToggleFeatured(job.id)}
                              >
                                <Star className="h-4 w-4 mr-2" />
                                {job.featured
                                  ? "Remove Featured"
                                  : "Make Featured"}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleDeleteJob(job.id)}
                                className="text-red-600"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </CardContent>
        </Card>

        {filteredJobs.length === 0 && !loading && (
          <div className="text-center py-12">
            <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No jobs found
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || typeFilter !== "all" || workModeFilter !== "all"
                ? "Try adjusting your search or filters"
                : "Get started by adding your first job listing"}
            </p>
            <Link href="/admin/jobs/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add New Job
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
