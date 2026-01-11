"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Clock,
  Star,
  Play,
  Download,
  Share2,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  Calendar,
  Award,
  Globe,
  ChevronRight,
  CheckCircle,
  PlayCircle,
  FileText,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import type { Course } from "@/lib/types";
import { Header } from "@/components/layout/Header";
import { formatDate } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation";
import { buildCourseShareMessage } from "@/lib/shareMessage";
import { ShareModal } from "@/components/share/ShareModal";

export default function CourseDetailPage() {
    const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const [shareData, setShareData] = useState<{
  title: string;
  url: string;
  message: any;
} | null>(null);

const handleShare = () => {
  if (!course) return;

  const url = `${window.location.origin}/courses/${course.slug}`;

  setShareData({
    title: course.title,
    url,
    message: buildCourseShareMessage({
      title: course.title,
      platform: course.platform,
      category: course.category,
      difficulty: course.difficulty,
      duration: course.duration,
      rating: course.rating,
      students: course.students,
      price: course.price,
      url,
      source: "Free Foundry",
    }),
  });
};


  // fetch course from API
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/courses/${id}`);
        const data = await res.json();

        // normalize JSON fields
        const normalized = {
          ...data,
          tags:
            typeof data.tags === "string"
              ? JSON.parse(data.tags)
              : data.tags || [],
          requirements:
            typeof data.requirements === "string"
              ? JSON.parse(data.requirements)
              : data.requirements || [],
          outcomes:
            typeof data.outcomes === "string"
              ? JSON.parse(data.outcomes)
              : data.outcomes || [],
          instructor:
            typeof data.instructor === "string"
              ? JSON.parse(data.instructor)
              : data.instructor || {},
        };

        setCourse(normalized);
      } catch (err) {
        console.error("  Failed to fetch course:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header showSearch />
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-1/3 mb-6" />
          <Skeleton className="h-48 w-full mb-6" />
          <Skeleton className="h-6 w-1/2 mb-4" />
          <Skeleton className="h-6 w-1/3 mb-4" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    );
  }

  if (!course || (!course.id && !loading)) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header showSearch type="courses" />
        <div className="flex flex-1 items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="flex justify-center mb-4">
              <div className="p-4 rounded-full bg-red-100 text-red-600">
                <BookOpen className="h-8 w-8" />
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Course Not Found
            </h2>
            <p className="text-gray-600 mb-6">
              Sorry, the course you are looking for doesn’t exist or may have
              been removed.
            </p>
            <Link
              href="/courses"
              className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Browse Courses
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const getDaysUntilExpiry = () => {
    if (!course.expiryDate) return null;
    const expiry = new Date(course.expiryDate);
    const now = new Date();
    const diffTime = expiry.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const daysLeft = getDaysUntilExpiry();

  const getLectureIcon = (type: "video" | "article" | "quiz") => {
    switch (type) {
      case "video":
        return <PlayCircle className="h-4 w-4 text-blue-600" />;
      case "article":
        return <FileText className="h-4 w-4 text-green-600" />;
      case "quiz":
        return <CheckCircle className="h-4 w-4 text-purple-600" />;
    }
  };
  const totalLectures = course.curriculum?.reduce(
    (acc: number, section: { lectures: any[] }) =>
      acc + section.lectures.length,
    0
  );

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
            <Link href="/courses" className="hover:text-blue-600">
              Courses
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 truncate max-w-[140px] sm:max-w-none">
              {course.title}
            </span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Header */}
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                {course.isPopular === 1 && (
                  <Badge className="bg-blue-600">Popular</Badge>
                )}
                {course.isNew === 1 && (
                  <Badge className="bg-green-600">New</Badge>
                )}
                {course.isTrending === 1 && (
                  <Badge className="bg-purple-600">Trending</Badge>
                )}
                {course.difficulty && (
                  <Badge variant="outline">{course.difficulty}</Badge>
                )}
                {course.category && (
                  <Badge variant="outline">{course.category}</Badge>
                )}
              </div>

              <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
              <div
                className="prose text-lg text-gray-600 mb-6"
                dangerouslySetInnerHTML={{ __html: course.excerpt }}
              />
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1 fill-current" />
                  <span className="font-medium">{course.rating}</span>
                  <span className="ml-1">
                    ({course.students?.toLocaleString()} students)
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{course.duration} total</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-1" />
                  <span>{totalLectures} lectures</span>
                </div>
                <div className="flex items-center">
                  <Globe className="h-4 w-4 mr-1" />
                  <span>English</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {course.tags?.map((tag: string) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

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
                  onClick={handleShare}
                  className="text-gray-600 hover:text-blue-600"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Course Content Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                {/* <TabsTrigger value="curriculum">Curriculum</TabsTrigger> */}
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
                {/* <TabsTrigger value="reviews">Reviews</TabsTrigger> */}
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* What You'll Learn */}
                <Card>
                  <CardHeader>
                    <CardTitle>What you'll learn</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-3">
                      {course.outcomes?.map((item: string, index: number) => (
                        <div key={index} className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Course Description */}
                <Card>
                  <CardHeader>
                    <CardTitle>Course Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      <div
                        className="whitespace-pre-line text-gray-700"
                        dangerouslySetInnerHTML={{ __html: course.description }}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Requirements */}
                <Card>
                  <CardHeader>
                    <CardTitle>Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {course.requirements?.map(
                        (req: string, index: number) => (
                          <li
                            key={index}
                            className="flex items-start space-x-2"
                          >
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{req}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="curriculum" className="space-y-4">
                <div className="mb-4">
                  <p className="text-sm text-gray-600">
                    {course.curriculum?.length} sections • {totalLectures}{" "}
                    lectures • {course.duration} total length
                  </p>
                </div>

                {course.curriculum?.map(
                  (section: any, sectionIndex: number) => (
                    <Card key={sectionIndex}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">
                          {section.section}
                        </CardTitle>
                        <p className="text-sm text-gray-600">
                          {section.lectures.length} lectures
                        </p>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-2">
                          {section.lectures?.map(
                            (lecture: any, lectureIndex: number) => (
                              <div
                                key={lectureIndex}
                                className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50"
                              >
                                <div className="flex items-center space-x-3">
                                  {getLectureIcon(lecture.type)}
                                  <span className="text-sm">
                                    {lecture.title}
                                  </span>
                                  {lecture.preview && (
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      Preview
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center space-x-2">
                                  <span className="text-xs text-gray-500">
                                    {lecture.duration}
                                  </span>
                                  {lecture.preview && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-6 w-6 p-0"
                                    >
                                      <Play className="h-3 w-3" />
                                    </Button>
                                  )}
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )
                )}
              </TabsContent>

              <TabsContent value="instructor" className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={course.instructor.avatar || "/placeholder.svg"}
                        alt={course.instructor.name}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-1">
                          {course.instructor.name}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {course.instructor.title}
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="text-center">
                            <div className="flex items-center justify-center mb-1">
                              <Star className="h-4 w-4 text-yellow-400 mr-1 fill-current" />
                              <span className="font-medium">
                                {course.instructor.rating}
                              </span>
                            </div>
                            <p className="text-xs text-gray-600">
                              Instructor Rating
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="font-medium">
                              {course.instructor.students?.toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-600">Students</p>
                          </div>
                          {/* <div className="text-center">
                            <p className="font-medium">
                              {course.instructor.courses}
                            </p>
                            <p className="text-xs text-gray-600">Courses</p>
                          </div> */}
                          <div className="text-center">
                            <Award className="h-5 w-5 mx-auto mb-1 text-blue-600" />
                            <p className="text-xs text-gray-600">Certified</p>
                          </div>
                        </div>

                        <p className="text-gray-700 text-sm leading-relaxed">
                          {course.instructor.bio}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Student Reviews</h3>
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="font-medium">{course.rating}</span>
                    <span className="text-gray-600">
                      ({course.students?.toLocaleString()} reviews)
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {course.reviews?.map(
                    (review: {
                      id: string | number;
                      user: string;
                      rating: number;
                      date: string;
                      comment: string;
                      helpful: number;
                    }) => (
                      <Card key={review.id}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-medium">{review.user}</h4>
                              <div className="flex items-center space-x-2 mt-1">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < review.rating
                                          ? "text-yellow-400 fill-current"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-600">
                                  {formatDate(review.date)}
                                </span>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-700 mb-3">{review.comment}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <button className="hover:text-blue-600">
                              Helpful ({review.helpful})
                            </button>
                            <button className="hover:text-blue-600">
                              Report
                            </button>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Preview Card */}
            {/* <Card className="sm:sticky top-[70px]"> */}
            <Card className="">
              <div className="relative">
                <img
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                {/* <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-t-lg">
                  <Button
                    size="lg"
                    className="bg-white text-black hover:bg-gray-100"
                  >
                    <Play className="h-5 w-5 mr-2" />
                    Preview Course
                  </Button>
                </div> */}
              </div>

              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <span className="text-3xl font-bold text-green-600">
                      {course.price === "0.00" ? "Free" : "#" + course.price}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      {"#" + course.originalPrice}
                    </span>
                  </div>
                  {course.expiryDate && daysLeft && daysLeft > 0 ? (
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4">
                      <div className="flex items-center justify-center space-x-2 text-orange-700">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm font-medium">
                          {daysLeft} day{daysLeft > 1 ? "s" : ""} left at this
                          price!
                        </span>
                      </div>
                    </div>
                  ) : course.expiryDate && daysLeft && daysLeft <= 0 ? (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                      <div className="flex items-center justify-center space-x-2 text-red-700">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm font-medium">
                          This offer has expired.
                        </span>
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="space-y-3 mb-6">
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    size="lg"
                    asChild
                  >
                    <Link
                      href={`https://${course.platform?.toLowerCase()}.com`}
                      target="_blank"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Enroll on {course.platform}
                    </Link>
                  </Button>
                  {/* <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    size="lg"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Add to Wishlist
                  </Button> */}
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Platform:</span>
                    <Badge variant="secondary">{course.platform}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Level:</span>
                    <span>{course.difficulty}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Students:</span>
                    <span>{course.students?.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Language:</span>
                    <span>{course.language || "English"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Certificate:</span>
                    <span>{course.certificate === 1 ? "Yes" : "No"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Related Courses */}
            <Card>
              <CardHeader>
                <CardTitle>Related Courses</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {course.relatedCourses?.map((relatedCourse: any) => (
                  <Link
                    key={relatedCourse.id}
                    href={`/courses/${relatedCourse.id}`}
                    className="block hover:bg-gray-50 rounded-lg p-3 -m-3 transition-colors"
                  >
                    <div className="flex space-x-3">
                      <img
                        src={relatedCourse.image || "/placeholder.svg"}
                        alt={relatedCourse.title}
                        className="w-16 h-12 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm line-clamp-2 mb-1">
                          {relatedCourse.title}
                        </h4>
                        <p className="text-xs text-gray-600 mb-1">
                          by {relatedCourse.instructor.name}
                        </p>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            <Star className="h-3 w-3 text-yellow-400 mr-1 fill-current" />
                            <span className="text-xs">
                              {relatedCourse.rating}
                            </span>
                          </div>
                          <span className="text-xs font-medium text-green-600">
                            {relatedCourse.price}
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
      {shareData && (
        <ShareModal
          open={!!shareData}
          onClose={() => setShareData(null)}
          title={shareData.title}
          url={shareData.url}
          message={shareData.message}
          from="Course"
        />
      )}
    </div>
  );
}
