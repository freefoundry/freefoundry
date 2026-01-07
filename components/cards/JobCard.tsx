"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Building,
  MapPin,
  DollarSign,
  Calendar,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
} from "lucide-react";
import type { Job } from "@/lib/types";
import { useState, useMemo } from "react";
import Link from "next/link";
import { formatSalary } from "@/lib/currency";

type Variant = "list" | "teaser";

export function JobCard({
  job,
  initiallyBookmarked = false,
  variant = "list",
}: {
  job: any;
  initiallyBookmarked?: boolean;
  variant?: Variant;
}) {
  const [bookmarked, setBookmarked] = useState(initiallyBookmarked);
const parseMySQLDate = (value: string) => {
  return new Date(value.replace(" ", "T"));
};

 const daysAgo = useMemo(() => {
   if (!job.postedDate) return "";

   const d = parseMySQLDate(job.postedDate);
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
 }, [job.postedDate]);


  if (variant === "teaser") {
    // Compact tile for Home grid
    return (
      <Card className="bg-white rounded-lg p-0 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                <img
                  src={job.companyLogo || "/placeholder.svg?height=32&width=32"}
                  alt={`${job.company} logo`}
                  className="h-8 w-8 rounded object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold">{job.title}</h3>
                <p className="text-sm text-gray-500">{job.company}</p>
                <p className="text-xs text-gray-400">{job.location}</p>
              </div>
            </div>
            <div className="bg-blue-50 px-2 py-1 rounded">
              <span className="text-xs font-medium text-blue-600">
                {job.platform}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {job.workMode && <Badge variant="secondary">{job.workMode}</Badge>}
            {job.type && <Badge variant="secondary">{job.type}</Badge>}
            {job.requirements?.slice(0, 2).map((s: string) => (
              <Badge key={s} variant="secondary">
                {s}
              </Badge>
            ))}
          </div>
          <div className="text-sm text-gray-600 mb-4">
            <p className="text-sm">
              {formatSalary(job.salary, job.currency, job.salaryType)}
            </p>

            <p className="text-xs text-gray-500 mt-1">Posted {daysAgo}</p>
          </div>
          <Button className="w-full flex items-center justify-center" asChild>
            <Link href="/jobs">
              View on {job.platform} <ExternalLink className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Default: detailed list card (your current layout)
  return (
    <Card className="hover:shadow-lg transition-shadow">
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
                  <h3 className="text-xl font-semibold mb-1">{job.title}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <Building className="h-4 w-4 mr-1" />
                    <span className="font-medium">{job.company}</span>
                    <span className="mx-2">•</span>
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{job.location}</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setBookmarked(!bookmarked)}
                  className="text-gray-400 hover:text-blue-600"
                  aria-label={bookmarked ? "Remove bookmark" : "Bookmark job"}
                >
                  {bookmarked ? (
                    <BookmarkCheck className="h-5 w-5 text-blue-600" />
                  ) : (
                    <Bookmark className="h-5 w-5" />
                  )}
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {job.featured === 1 && (
                  <Badge className="bg-blue-600">Featured</Badge>
                )}
                {job.urgent === 1 && (
                  <Badge className="bg-red-600">Urgent</Badge>
                )}
                {job.type && <Badge variant="outline">{job.type}</Badge>}
                {job.workMode && <Badge variant="outline">{job.workMode}</Badge>}
                {job.experience && <Badge variant="outline">{job.experience}</Badge>} 
                <Badge
                  variant="secondary"
                  className="bg-green-50 text-green-700 border-green-200 flex items-center"
                >
                  <span className="mr-1 font-semibold">
                    {formatSalary(job.salary, job.currency)}
                  </span>
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
                  {job.requirements.slice(0, 5).map((req: string) => (
                    <Badge key={req} variant="outline" className="text-xs">
                      {req}
                    </Badge>
                  ))}
                  {job.requirements.length > 5 && (
                    <Badge variant="outline" className="text-xs">
                      +{job.requirements.length - 5} more
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{daysAgo}</span>
                  <span className="mx-2">•</span>
                  <span className="text-blue-600">{job.platform}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button size="sm" className="flex items-center">
                    <ExternalLink className="h-3 w-3 mr-1" /> Apply on{" "}
                    {job.platform}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
