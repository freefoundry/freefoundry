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
  AlertCircle,
  Bookmark,
  BookmarkCheck,
  Share2,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import type { Scholarship } from "@/lib/types";

export default function ScholarshipDetailPage() {
  const params = useParams();
  const [scholarship, setScholarship] = useState<Scholarship | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [timeUntilDeadline, setTimeUntilDeadline] = useState("");

  // Mock data - in real app, this would come from API
  const scholarships: Scholarship[] = [
    {
      id: 1,
      title: "Chevening Scholarships",
      provider: "UK Government",
      amount: "Full funding",
      currency: "GBP",
      type: "Full",
      level: "Graduate",
      field: "Any Field",
      location: "United Kingdom",
      country: "UK",
      eligibility: [
        "Bachelor's degree",
        "2+ years work experience",
        "English proficiency",
      ],
      requirements: [
        "IELTS 6.5",
        "Leadership potential",
        "UK return commitment",
      ],
      benefits: [
        "Full tuition",
        "Living allowance",
        "Travel costs",
        "Visa fees",
      ],
      applicationDeadline: "2024-11-05",
      description:
        "Chevening Scholarships are the UK government's global scholarship programme, funded by the Foreign and Commonwealth Office and partner organisations. The scholarships are awarded to outstanding emerging leaders to pursue a one-year master's degree in the UK. There are approximately 1,500 awards available globally for the 2024/2025 academic year, demonstrating the UK's ongoing commitment to developing global leaders.",
      applicationUrl: "https://chevening.org",
      tags: ["Government", "Leadership", "International"],
      featured: true,
      renewable: false,
      numberOfAwards: 1500,
      gpaRequirement: "Upper Second Class",
      image: "/placeholder.svg?height=400&width=600&text=Chevening+Scholarship",
      dateAdded: "2024-01-15",
    },
  ];

  useEffect(() => {
    const scholarshipId = Number.parseInt(params.id as string);
    const foundScholarship = scholarships.find((s) => s.id === scholarshipId);
    setScholarship(foundScholarship || null);
  }, [params.id]);

  useEffect(() => {
    if (scholarship) {
      const updateTimeUntilDeadline = () => {
        const deadline = new Date(scholarship.applicationDeadline);
        const now = new Date();
        const timeDiff = deadline.getTime() - now.getTime();

        if (timeDiff <= 0) {
          setTimeUntilDeadline("Application deadline has passed");
          return;
        }

        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

        if (days > 0) {
          setTimeUntilDeadline(`${days} days, ${hours} hours remaining`);
        } else if (hours > 0) {
          setTimeUntilDeadline(`${hours} hours, ${minutes} minutes remaining`);
        } else {
          setTimeUntilDeadline(`${minutes} minutes remaining`);
        }
      };

      updateTimeUntilDeadline();
      const interval = setInterval(updateTimeUntilDeadline, 60000); // Update every minute

      return () => clearInterval(interval);
    }
  }, [scholarship]);

  if (!scholarship) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Scholarship Not Found</h1>
          <p className="text-gray-600 mb-4">
            The scholarship you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link href="/scholarships">Back to Scholarships</Link>
          </Button>
        </div>
      </div>
    );
  }

  const getDeadlineStatus = () => {
    const deadline = new Date(scholarship.applicationDeadline);
    const now = new Date();
    const daysUntilDeadline = Math.ceil(
      (deadline.getTime() - now.getTime()) / (1000 * 3600 * 24)
    );

    if (daysUntilDeadline < 0)
      return { status: "expired", color: "text-red-600", bgColor: "bg-red-50" };
    if (daysUntilDeadline <= 7)
      return {
        status: "urgent",
        color: "text-orange-600",
        bgColor: "bg-orange-50",
      };
    if (daysUntilDeadline <= 30)
      return {
        status: "soon",
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
      };
    return {
      status: "normal",
      color: "text-green-600",
      bgColor: "bg-green-50",
    };
  };

  const deadlineStatus = getDeadlineStatus();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img
              src="/freelogo.svg"
              alt="FreeFoundry Logo"
              className="w-full"
            />
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/courses"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Courses
            </Link>
            <Link
              href="/resources"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Resources
            </Link>
            <Link
              href="/jobs"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Jobs
            </Link>
            <Link href="/scholarships" className="text-blue-600 font-medium">
              Scholarships
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/scholarships">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Scholarships
          </Link>
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {scholarship.featured && (
                        <Badge className="bg-blue-600">Featured</Badge>
                      )}
                      <Badge variant="outline">
                        {scholarship.type} Funding
                      </Badge>
                    </div>
                    <h1 className="text-3xl font-bold mb-2">
                      {scholarship.title}
                    </h1>
                    <p className="text-lg text-gray-600">
                      by {scholarship.provider}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsBookmarked(!isBookmarked)}
                    >
                      {isBookmarked ? (
                        <BookmarkCheck className="h-4 w-4" />
                      ) : (
                        <Bookmark className="h-4 w-4" />
                      )}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-semibold text-green-600">
                        {scholarship.amount}
                      </p>
                      <p className="text-xs text-gray-500">Funding Amount</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-semibold">{scholarship.level}</p>
                      <p className="text-xs text-gray-500">Education Level</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-semibold">{scholarship.location}</p>
                      <p className="text-xs text-gray-500">Study Location</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="font-semibold">
                        {scholarship.numberOfAwards}
                      </p>
                      <p className="text-xs text-gray-500">Awards Available</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {scholarship.tags.map((tag: string) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About This Scholarship</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  {scholarship.description}
                </p>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle>Benefits & Coverage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {scholarship.benefits.map(
                    (benefit: string, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Eligibility */}
            <Card>
              <CardHeader>
                <CardTitle>Eligibility Criteria</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {scholarship.eligibility.map(
                    (criterion: string, index: number) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>{criterion}</span>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Application Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {scholarship.requirements.map(
                    (requirement: string, index: number) => (
                      <div key={index} className="flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                        <span>{requirement}</span>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Application Deadline */}
            <Card className={deadlineStatus.bgColor}>
              <CardContent className="p-6">
                <div className="text-center">
                  <Clock
                    className={`h-8 w-8 mx-auto mb-3 ${deadlineStatus.color}`}
                  />
                  <h3 className="font-semibold mb-2">Application Deadline</h3>
                  <p className="text-lg font-bold mb-1">
                    {new Date(
                      scholarship.applicationDeadline
                    ).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className={`text-sm ${deadlineStatus.color}`}>
                    {timeUntilDeadline}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Apply Now */}
            <Card>
              <CardContent className="p-6">
                <Button asChild className="w-full mb-4" size="lg">
                  <a
                    href={scholarship.applicationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Apply Now
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                </Button>
                <p className="text-xs text-gray-500 text-center">
                  You will be redirected to the official application portal
                </p>
              </CardContent>
            </Card>

            {/* Quick Facts */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Facts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Field of Study:</span>
                  <span className="font-medium">{scholarship.field}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-gray-600">Renewable:</span>
                  <span className="font-medium">
                    {scholarship.renewable ? "Yes" : "No"}
                  </span>
                </div>
                <Separator />
                {scholarship.gpaRequirement && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600">GPA Requirement:</span>
                      <span className="font-medium">
                        {scholarship.gpaRequirement}
                      </span>
                    </div>
                    <Separator />
                  </>
                )}
                {scholarship.ageLimit && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Age Limit:</span>
                      <span className="font-medium">
                        {scholarship.ageLimit}
                      </span>
                    </div>
                    <Separator />
                  </>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Awards Available:</span>
                  <span className="font-medium">
                    {scholarship.numberOfAwards.toLocaleString()}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Provider Info */}
            <Card>
              <CardHeader>
                <CardTitle>About the Provider</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium mb-2">{scholarship.provider}</p>
                <p className="text-sm text-gray-600">
                  Learn more about this scholarship provider and their other
                  funding opportunities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
