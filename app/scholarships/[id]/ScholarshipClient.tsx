"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  ExternalLink,
  MapPin,
  DollarSign,
  GraduationCap,
  Users,
  Clock,
  CheckCircle,
  ClipboardList,
  Bookmark,
  BookmarkCheck,
  Share2,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import type { Scholarship } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { buildShareMessage } from "@/lib/shareMessage";
import { ShareModal } from "@/components/share/ShareModal";

export default function ScholarshipDetailPage() {
  const params = useParams();
  const [scholarship, setScholarship] = useState<Scholarship | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [timeUntilDeadline, setTimeUntilDeadline] = useState("");
  const [loading, setLoading] = useState(true);
  const [shareData, setShareData] = useState<{
    title: string;
    url: string;
    message: string;
  } | null>(null);

const handleShare = () => {
  if (!scholarship) return;

  const url = `${baseUrl}/scholarships/${scholarship.slug}`;

  setShareData({
    title: scholarship.title,
    url,
    message: buildShareMessage({
      title: scholarship.title,
      country: scholarship.country,
      level: scholarship.level,
      deadline: scholarship.applicationDeadline
        ? new Date(scholarship.applicationDeadline).toLocaleDateString()
        : undefined,
      benefits: scholarship.benefits,
      url,
      source: "Free Foundry",
    }),
  });
};

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  //  Fetch real data from API
  useEffect(() => {
    const fetchScholarship = async () => {
      try {
        setLoading(true);
        const id = params.id as string;

       const res = await fetch(`/api/scholarships/${id}`, {
         cache: "no-store",
       });


        if (!res.ok) throw new Error("Failed to fetch scholarship");

        const data = await res.json();
        setScholarship(data);
      } catch (error) {
        console.error("  Error fetching scholarship:", error);
        setScholarship(null);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchScholarship();
    }
  }, [params.id, baseUrl]);

  //  Update time remaining until deadline
  useEffect(() => {
    if (scholarship?.applicationDeadline) {
      const updateTimeUntilDeadline = () => {
        const deadline = new Date(scholarship!.applicationDeadline);
        const now = new Date();
        const diff = deadline.getTime() - now.getTime();

        if (diff <= 0) {
          setTimeUntilDeadline("Application deadline has passed");
          return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        if (days > 0)
          setTimeUntilDeadline(`${days} days, ${hours} hours remaining`);
        else if (hours > 0)
          setTimeUntilDeadline(`${hours} hours, ${minutes} minutes remaining`);
        else setTimeUntilDeadline(`${minutes} minutes remaining`);
      };

      updateTimeUntilDeadline();
      const interval = setInterval(updateTimeUntilDeadline, 60000);
      return () => clearInterval(interval);
    }
  }, [scholarship]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-9 w-9 rounded" />
              <Skeleton className="h-6 w-32" />
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-24" />
            </nav>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <Skeleton className="h-10 w-40 mb-6" />

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header Card */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Skeleton className="h-6 w-20" />
                        <Skeleton className="h-6 w-24" />
                      </div>
                      <Skeleton className="h-8 w-3/4 mb-2" />
                      <Skeleton className="h-6 w-1/2" />
                    </div>
                    <div className="flex gap-2">
                      <Skeleton className="h-8 w-8" />
                      <Skeleton className="h-8 w-8" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Skeleton className="h-5 w-5" />
                        <div>
                          <Skeleton className="h-4 w-16 mb-1" />
                          <Skeleton className="h-3 w-12" />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Skeleton key={i} className="h-6 w-16" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <Skeleton className="h-8 w-8 mx-auto mb-3" />
                    <Skeleton className="h-5 w-32 mx-auto mb-2" />
                    <Skeleton className="h-6 w-40 mx-auto mb-1" />
                    <Skeleton className="h-4 w-28 mx-auto" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <Skeleton className="h-12 w-full mb-4" />
                  <Skeleton className="h-3 w-48 mx-auto" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-24" />
                </CardHeader>
                <CardContent className="space-y-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i}>
                      <div className="flex justify-between">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                      {i < 3 && <div className="border-t mt-4" />}
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-36" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-5 w-32 mb-2" />
                  <div className="space-y-1">
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-3/4" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!scholarship) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Scholarship Not Found</h1>
          <p className="text-gray-600 mb-4">
            The scholarship you’re looking for doesn’t exist or has been
            removed.
          </p>
          <Button asChild>
            <Link href="/scholarships">Back to Scholarships</Link>
          </Button>
        </div>
      </div>
    );
  }

  //  Determine deadline status color
  const getDeadlineStatus = () => {
    // If there's no scholarship or no deadline, return a neutral status to avoid accessing null
    if (!scholarship?.applicationDeadline) {
      return {
        color: "text-gray-600",
        bg: "bg-gray-100",
        label: "No deadline",
      };
    }

    const deadline = new Date(scholarship.applicationDeadline);
    const now = new Date();
    const daysLeft = Math.ceil(
      (deadline.getTime() - now.getTime()) / (1000 * 3600 * 24)
    );

    if (daysLeft < 0)
      return { color: "text-red-600", bg: "bg-red-50", label: "Expired" };
    if (daysLeft <= 7)
      return { color: "text-orange-600", bg: "bg-orange-50", label: "Urgent" };
    if (daysLeft <= 30)
      return { color: "text-yellow-600", bg: "bg-yellow-50", label: "Soon" };
    return { color: "text-green-600", bg: "bg-green-50", label: "Open" };
  };

  const deadlineStatus = getDeadlineStatus();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <img src="/freelogo.svg" alt="FreeFoundry" className="h-8" />
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/courses" className="text-gray-600 hover:text-blue-600">
              Courses
            </Link>
            <Link
              href="/resources"
              className="text-gray-600 hover:text-blue-600"
            >
              Resources
            </Link>
            <Link href="/jobs" className="text-gray-600 hover:text-blue-600">
              Jobs
            </Link>
            <Link href="/scholarships" className="text-blue-600 font-semibold">
              Scholarships
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/scholarships">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Scholarships
          </Link>
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {scholarship?.featured && (
                        <Badge className="bg-blue-600">Featured</Badge>
                      )}
                      <Badge variant="outline">{scholarship?.type}</Badge>
                    </div>
                    <h1 className="text-md sm:text-3xl font-bold mb-1">
                      {scholarship?.title}
                    </h1>
                    <p className="text-gray-600">by {scholarship?.provider}</p>
                  </div>

                  <div className="flex gap-2">
                    {/* <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsBookmarked(!isBookmarked)}
                    >
                      {isBookmarked ? (
                        <BookmarkCheck className="h-4 w-4" />
                      ) : (
                        <Bookmark className="h-4 w-4" />
                      )}
                    </Button> */}
                    <Button variant="outline" size="sm" onClick={handleShare}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-semibold text-green-600">
                        {scholarship?.amount}
                      </p>
                      <p className="text-xs text-gray-500">Funding Amount</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-semibold">{scholarship?.level}</p>
                      <p className="text-xs text-gray-500">Education Level</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-semibold">
                        {scholarship?.country || scholarship?.location || "—"}
                      </p>
                      <p className="text-xs text-gray-500">Country</p>
                    </div>
                  </div>

                  {/* <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="font-semibold">
                        {scholarship?.numberOfAwards || 0}
                      </p>
                      <p className="text-xs text-gray-500">Awards Available</p>
                    </div>
                  </div> */}
                </div>

                {(scholarship?.tags?.length ?? 0) > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {(scholarship?.tags ?? []).map((tag, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About This Scholarship</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: scholarship?.description ?? "",
                  }}
                />
              </CardContent>
            </Card>

            {/* Benefits */}
            {(scholarship?.benefits?.length ?? 0) > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Benefits & Coverage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {(scholarship?.benefits ?? []).map((b, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 text-sm leading-relaxed"
                      >
                        <CheckCircle className="h-5 w-5 text-green-600 shrink-0" />
                        <span className="flex-1">{b}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Eligibility */}
            {(scholarship?.eligibility?.length ?? 0) > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Eligibility Criteria</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {(scholarship?.eligibility ?? []).map((e, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm leading-relaxed"
                      >
                        <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
                        <span className="flex-1">{e}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Requirements */}
            {(scholarship?.requirements?.length ?? 0) > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Application Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {scholarship?.requirements?.map((r, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm leading-relaxed"
                      >
                        <ClipboardList className="h-5 w-5 text-orange-600 mt-0.5 shrink-0" />
                        <span className="flex-1">{r}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className={deadlineStatus.bg}>
              <CardContent className="p-6 text-center">
                <Clock
                  className={`h-8 w-8 mx-auto mb-3 ${deadlineStatus.color}`}
                />
                <h3 className="font-semibold mb-2">Application Deadline</h3>
                <p className="text-lg font-bold mb-1">
                  {scholarship?.applicationDeadline
                    ? new Date(
                        scholarship.applicationDeadline
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : null}
                </p>
                <p className={`text-sm ${deadlineStatus.color}`}>
                  {timeUntilDeadline}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Button asChild className="w-full mb-4" size="lg">
                  <a
                    href={scholarship?.applicationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Apply Now <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                </Button>
                <p className="text-xs text-gray-500 text-center">
                  You will be redirected to the official application portal.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {shareData && (
        <ShareModal
          open
          onClose={() => setShareData(null)}
          title={shareData.title}
          url={shareData.url}
          message={shareData.message}
          from="Scholarship"
        />
      )}
    </div>
  );
}
