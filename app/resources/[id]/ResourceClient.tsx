"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ExternalLink,
  Download,
  Share2,
  Globe,
  ChevronRight,
  FileText,
  PenTool,
  Tag,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/Header";
import { formatDate } from "@/lib/utils";
import type { Resource } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation";
import { buildResourceShareMessage } from "@/lib/shareMessage";
import { ShareModal } from "@/components/share/ShareModal";

export default function ResourceClient() {
    const { id } = useParams<{ id: string }>();
  const [resource, setResource] = useState<Resource | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [shareData, setShareData] = useState<{
      title: string;
      url: string;
      message: string;
    } | null>(null);


  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const handleShare = () => {
      if (!resource) return;

      const url = `${baseUrl}/resources/${resource.slug}`;

      setShareData({
        title: resource.title,
        url,
        message: buildResourceShareMessage({
          title: resource.title,
          type: resource.type,
          category: resource.category,
          difficulty: resource.difficulty,
          estimatedTime: resource.estimatedTime,
          features: resource.whatYouWillGet || resource.features,
          url,
          source: "Free Foundry",
        }),
      });
    };
  //  Fetch resource from API
  useEffect(() => {
    async function fetchResource() {
      try {
        
        setLoading(true);
        const res = await fetch(`/api/resources/${id}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || "Failed to load resource");
        }

        const data = await res.json();
        setResource(data);
      } catch (err: any) {
        console.error("  Failed to load resource:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchResource();
  }, [id]);

  // ==========================
  // Utility functions
  // ==========================
  const getResourceIcon = (type: string) => {
    switch (type?.toLowerCase()) {
      case "website":
        return <Globe className="h-5 w-5" />;
      case "tool":
        return <PenTool className="h-5 w-5" />;
      case "pdf":
        return <FileText className="h-5 w-5" />;
      default:
        return <Globe className="h-5 w-5" />;
    }
  };

  const getResourceAction = (type: string) => {
    switch (type?.toLowerCase()) {
      case "pdf":
        return {
          icon: <Download className="h-4 w-4 mr-2" />,
          text: "Download PDF",
        };
      case "tool":
        return {
          icon: <ExternalLink className="h-4 w-4 mr-2" />,
          text: "Use Tool",
        };
      default:
        return {
          icon: <ExternalLink className="h-4 w-4 mr-2" />,
          text: "Visit Website",
        };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header Skeleton */}
        <header className="border-b bg-white sticky top-0 z-50">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-9 w-9 rounded" />
              <Skeleton className="h-6 w-32" />
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-12" />
            </div>
            <Skeleton className="h-8 w-20" />
          </div>
        </header>

        {/* Breadcrumb Skeleton */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content Skeleton */}
            <div className="lg:col-span-2 space-y-8">
              {/* Resource Header Skeleton */}
              <div>
                <div className="flex gap-2 mb-4">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-6 w-28" />
                </div>
                <Skeleton className="h-10 w-full mb-4" />
                <Skeleton className="h-6 w-3/4 mb-6" />
                <div className="flex gap-6 mb-6">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-28" />
                </div>
                <div className="flex gap-2 mb-6">
                  {[...Array(6)].map((_, i) => (
                    <Skeleton key={i} className="h-6 w-16" />
                  ))}
                </div>
              </div>

              {/* Tabs Skeleton */}
              <div>
                <div className="flex space-x-4 mb-6">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-10 w-24" />
                  ))}
                </div>
                <Card>
                  <CardHeader>
                    <Skeleton className="h-6 w-48" />
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[...Array(4)].map((_, i) => (
                      <Skeleton key={i} className="h-4 w-full" />
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !resource) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">
          {error || "Resource not found or failed to load."}
        </p>
      </div>
    );
  }

  const action = getResourceAction(resource.type);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showSearch type="resources" />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/resources" className="hover:text-blue-600">
              Resources
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900  truncate max-w-[140px] sm:max-w-none">
              {resource.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Main */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                {resource.isFeatured && (
                  <Badge className="bg-blue-600">Featured</Badge>
                )}
                <Badge variant="secondary" className="flex items-center">
                  {getResourceIcon(resource.type)}
                  <span className="ml-1">{resource.type}</span>
                </Badge>
                {resource.category && (
                  <Badge variant="outline">{resource.category}</Badge>
                )}
              </div>

              <h1 className="text-3xl font-bold mb-4">{resource.title}</h1>
              {resource.excerpt && (
                <p className="text-lg text-gray-600 mb-6 line-clamp-4">
                  {" "}
                  {resource.excerpt}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
                {/* <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1 fill-current" />
                  <span className="font-medium">
                    {resource.rating || "4.8"}
                  </span>
                  <span className="ml-1">rating</span>
                </div> */}
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Updated {formatDate(resource.updatedAt)}</span>
                </div>
              </div>

              {resource.tags && resource.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {resource.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="flex items-center space-x-4">
                {/* <Button
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
                </Button> */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-blue-600"
                  onClick={handleShare}
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Overview */}
            <Card>
              <CardHeader>
                <CardTitle>About this Resource</CardTitle>
              </CardHeader>
              <CardContent>
                <p
                  className="text-gray-700 whitespace-pre-line text-justify
             [&_a]:text-blue-600
             [&_a]:underline
             [&_a:hover]:text-blue-700"
                  dangerouslySetInnerHTML={{
                    __html: resource.content ?? "",
                  }}
                ></p>
              </CardContent>
            </Card>

            {/* Requirements */}
            {resource.requirements?.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {resource.requirements.map((req, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2" />
                        <span className="text-sm text-gray-700">{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right: Sidebar */}
          <div className="space-y-6">
            {/* Image Card */}
            <Card>
              <div className="relative">
                <img
                  src={resource.featuredImage || "/emptyblue.svg"}
                  alt={resource.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </div>

              <CardContent className="p-6">
                <div className="space-y-3 mb-6">
                  {resource.downloadUrl ? (
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      asChild
                    >
                      <Link href={resource.downloadUrl} target="_blank">
                        {action.icon}
                        {action.text}
                      </Link>
                    </Button>
                  ) : null}
                  {/* <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    size="lg"
                  >
                    <Bookmark className="h-4 w-4 mr-2" />
                    Add to Collection
                  </Button> */}
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Type:</span>
                    <Badge variant="secondary">{resource.type}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Category:</span>
                    <span>{resource.category || "—"}</span>
                  </div>
                  {/* <div className="flex items-center justify-between">
                    <span className="text-gray-600">Status:</span>
                    <Badge
                      variant={
                        resource.status === "published"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {resource.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Created:</span>
                    <span>{formatDate(resource.createdAt)}</span>
                  </div> */}
                </div>
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
          from="Resource"
        />
      )}
    </div>
  );
}
