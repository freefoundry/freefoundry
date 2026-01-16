"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ExternalLink,
  Share2,
  ChevronRight,
  CheckCircle,
  Building,
  MapPin,
  DollarSign,
  Calendar,
  AlertCircle,
  Banknote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/layout/Header";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation";
import { ShareModal } from "@/components/share/ShareModal";
import { buildJobShareMessage } from "@/lib/shareMessage";

export default function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [shareData, setShareData] = useState<{
    title: string;
    url: string;
    message: any;
  } | null>(null);

  const handleShare = () => {
    if (!job) return;

    const url = `${window.location.origin}/jobs/${job.id}`;

    setShareData({
      title: job.title,
      url,
      message: buildJobShareMessage({
        title: job.title,
        company: job.company,
        location: job.location,
        type: job.type,
        workMode: job.workMode,
        experience: job.experience,
        salary: job.salary,
        url,
        source: "Free Foundry",
      }),
    });
  };

  useEffect(() => {
    async function fetchJob() {
      try {
        setLoading(true);
        const res = await fetch(`/api/jobs/${id}`);
        if (!res.ok) throw new Error("Failed to fetch job");

        const data = await res.json();

        // Normalize JSON fields
        const normalized = {
          ...data,
          requirements:
            typeof data.requirements === "string"
              ? JSON.parse(data.requirements)
              : data.requirements || [],
          benefits:
            typeof data.benefits === "string"
              ? JSON.parse(data.benefits)
              : data.benefits || [],
          responsibilities:
            typeof data.responsibilities === "string"
              ? JSON.parse(data.responsibilities)
              : data.responsibilities || [],
          qualifications:
            typeof data.qualifications === "string"
              ? JSON.parse(data.qualifications)
              : data.qualifications || [],
          niceToHave:
            typeof data.niceToHave === "string"
              ? JSON.parse(data.niceToHave)
              : data.niceToHave || [],
          companyInfo:
            typeof data.companyInfo === "string"
              ? JSON.parse(data.companyInfo)
              : data.companyInfo || {},
          applicationProcess:
            typeof data.applicationProcess === "string"
              ? JSON.parse(data.applicationProcess)
              : data.applicationProcess || {},
          similarJobs:
            typeof data.similarJobs === "string"
              ? JSON.parse(data.similarJobs)
              : data.similarJobs || [],
        };

        setJob(normalized);
      } catch (err) {
        console.error("  Error fetching job:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header showSearch type="jobs" />
        <div className="container mx-auto px-4 py-8 space-y-4">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header showSearch type="jobs" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Building className="h-10 w-10 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              Job Not Found
            </h2>
            <p className="text-gray-600 mb-4">
              Sorry, this job doesn’t exist or may have been removed.
            </p>
            {/* <Link
              href="/jobs"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Browse Jobs
            </Link> */}
          </div>
        </div>
      </div>
    );
  }
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
  const daysAgo = getDaysAgo(job.postedDate);
  return (
    <div className="min-h-screen bg-gray-50">
      <Header showSearch type="jobs" />

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
            <span className="text-gray-900  truncate max-w-[140px] sm:max-w-none">
              {job.title}
            </span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                {job.featured === 1 && (
                  <Badge className="bg-blue-600">Featured</Badge>
                )}
                {job.urgent === 1 && (
                  <Badge className="bg-red-600">Urgent</Badge>
                )}
                <Badge variant="outline">{job.type}</Badge>
                <Badge variant="outline">{job.workMode}</Badge>
              </div>

              <h1 className="text-3xl font-bold mb-4">{job.title}</h1>

              <div className="flex items-center gap-6 text-gray-600 mb-6 flex-wrap">
                <div className="flex items-center">
                  <Building className="h-5 w-5 mr-2" />
                  <span className="font-medium">{job.company}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center">
                  <Banknote className="h-5 w-5 mr-2" />
                  <span className="text-green-600 font-medium">
                    {job.salary + " "} {job.currency}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-6">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Posted {daysAgo}</span>
                </div>
                {/* <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  <span>{job.views?.toLocaleString() || 0} views</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{job.applications || 0} applications</span>
                </div> */}
              </div>

              <p className="text-gray-700 mb-6 ">{job.description}</p>

              <div className="flex items-center gap-3">
                {/* <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                >
                  {isBookmarked ? (
                    <>
                      <BookmarkCheck className="h-4 w-4 mr-2" /> Bookmarked
                    </>
                  ) : (
                    <>
                      <Bookmark className="h-4 w-4 mr-2" /> Bookmark
                    </>
                  )}
                </Button> */}
                <Button variant="ghost" size="sm" onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-2" /> Share
                </Button>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="requirements">Requirements</TabsTrigger>
                <TabsTrigger value="company">Company</TabsTrigger>
                <TabsTrigger value="process">Process</TabsTrigger>
              </TabsList>

              {/* Overview */}
              <TabsContent value="overview" className="space-y-6">
                {job.fullDescription && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Job Description</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p
                        className="whitespace-pre-line text-gray-700 text-justify"
                        dangerouslySetInnerHTML={{
                          __html: job.fullDescription,
                        }}
                      ></p>
                    </CardContent>
                  </Card>
                )}

                {job.responsibilities?.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Key Responsibilities</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {job.responsibilities.map((item: string, i: number) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 text-sm leading-relaxed"
                        >
                          <CheckCircle className="h-5 w-5 text-green-600 mt-1 shrink-0" />
                          <span className="flex-1">{item}</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}

                {job.benefits?.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Benefits</CardTitle>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-2">
                      {job.benefits.map((b: string, i: number) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 text-sm leading-relaxed"
                        >
                          <CheckCircle className="h-5 w-5 text-blue-600 shrink-0" />
                          <span className="flex-1">{b}</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Requirements */}
              <TabsContent value="requirements" className="space-y-6">
                {job.qualifications?.length > 0 ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>Qualifications</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {job.qualifications.map((q: string, i: number) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 text-sm leading-relaxed"
                        >
                          <AlertCircle className="h-5 w-5 text-red-600 mt-1 shrink-0" />
                          <span className="flex-1">{q}</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>Qualifications</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p>No qualifications specified.</p>
                    </CardContent>
                  </Card>
                )}

                {job.requirements?.length > 0 ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>Technical Skills</CardTitle>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-2">
                      {job.requirements.map((s: string, i: number) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 text-sm leading-relaxed"
                        >
                          <CheckCircle className="h-5 w-5 text-green-600 shrink-0" />

                          <span className="flex-1">{s}</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>Technical Skills</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p>No technical skills specified.</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Company */}
              <TabsContent value="company" className="space-y-6">
                {job.companyInfo && (
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex gap-4 mb-6">
                        <img
                          src={job.companyInfo.logo || "/placeholder.svg"}
                          alt={job.companyInfo.name}
                          className="w-20 h-20 rounded object-cover"
                        />
                        <div>
                          <h3 className="text-xl font-semibold">
                            {job.companyInfo.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {job.companyInfo.industry}
                          </p>
                          <Link
                            href={job.companyInfo.website}
                            className="text-blue-600 text-sm hover:underline"
                          >
                            {job.companyInfo.website}
                          </Link>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 mb-3">
                        {job.companyInfo.description}
                      </p>
                      {job.companyInfo.culture?.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="font-medium">Company Culture</h4>
                          <div className="grid sm:grid-cols-2 gap-2">
                            {job.companyInfo.culture.map(
                              (c: string, i: number) => (
                                <div
                                  key={i}
                                  className="flex items-center gap-2 text-sm"
                                >
                                  <CheckCircle className="h-4 w-4 text-blue-600" />
                                  {c}
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Process */}
              <TabsContent value="process" className="space-y-6">
                {job.applicationProcess?.steps?.length > 0 ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>Application Process</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {job.applicationProcess.steps.map(
                        (step: string, i: number) => (
                          <div
                            key={i}
                            className="flex gap-3 text-sm leading-relaxed"
                          >
                            <div className="w-6 h-6 bg-blue-600 text-white flex items-center shrink-0 justify-center rounded-full text-xs">
                              {i + 1}
                            </div>
                            <span className="flex-1">{step}</span>
                          </div>
                        )
                      )}
                    </CardContent>
                  </Card>
                ) : (
                  <p className="text-center my-2">
                    No application process details provided.
                  </p>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <p className="text-2xl font-bold text-green-600 mb-1">
                    {job.salary + " "} {job.currency}
                  </p>
                  {job.salary && job.salaryType && (
                    <p className="text-sm text-gray-500">
                   /{job.salaryType}
                    </p>
                  )}
                </div>
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 mb-3"
                  asChild
                >
                  <Link href={`${job.applicationUrl}`} target="_blank">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Apply on {job.platform}
                  </Link>
                </Button>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Type:</span>{" "}
                    <Badge variant="secondary">{job.type}</Badge>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Work Mode:</span>{" "}
                    <Badge variant="secondary">{job.workMode}</Badge>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Location:</span> <span>{job.location}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Platform:</span> <Badge>{job.platform}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      {shareData && (
        <ShareModal
          open={!!shareData}
          onClose={() => setShareData(null)}
          title={shareData.title}
          url={shareData.url}
          message={shareData.message}
          from="Job"
        />
      )}
    </div>
  );
}
