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
import React, { useState } from "react";
import type { Course } from "@/lib/types";
import { Header } from "@/components/layout/Header";
import { formatDate } from "@/lib/utils";

// Mock course data - in a real app, this would come from an API
const getCourseById = (
  id: string
): Course & {
  fullDescription: string;
  whatYouWillLearn: string[];
  requirements: string[];
  curriculum: {
    section: string;
    lectures: {
      title: string;
      duration: string;
      type: "video" | "article" | "quiz";
      preview?: boolean;
    }[];
  }[];
  instructor: {
    name: string;
    title: string;
    bio: string;
    rating: number;
    students: number;
    courses: number;
    avatar: string;
  };
  reviews: {
    id: number;
    user: string;
    rating: number;
    comment: string;
    date: string;
    helpful: number;
  }[];
  relatedCourses: Course[];
} => {
  // This would normally fetch from an API
  return {
    id: 1,
    slug: "complete-python-bootcamp-go-from-zero-to-hero-in-python-3",
    title: "Complete Python Bootcamp: Go from Zero to Hero in Python 3",
    platform: "Udemy",
    instructor: {
      name: "Jose Portilla",
      title: "Head of Data Science at Pierian Data Inc.",
      bio: "Jose Marcial Portilla has a BS and MS in Mechanical Engineering from Santa Clara University and years of experience as a professional instructor and trainer for Data Science and programming. He has publications and patents in various fields such as microfluidics, materials science, and data science technologies.",
      rating: 4.6,
      students: 1200000,
      courses: 65,
      avatar: "/placeholder.svg?height=100&width=100&text=JP",
    },
    rating: 4.6,
    students: 45000,
    duration: "21 hours",
    level: "Beginner",
    category: "Programming",
    tags: [
      "Python",
      "Web Development",
      "Data Science",
      "Programming",
      "Backend",
    ],
    price: "Free",
    originalPrice: "$199.99",
    expiryDate: "2024-03-15",
    image: "/placeholder.svg?height=300&width=500&text=Python+Course+Hero",
    description:
      "Master Python programming from beginner to advanced with hands-on projects.",
    isPopular: true,
    isNew: false,
    isTrending: false,
    fullDescription: `Learn Python like a Professional! Start from the basics and go all the way to creating your own applications and games!

This comprehensive course will teach you Python in a practical manner, with every lecture comes a full coding screencast and a corresponding code notebook! Learn in whatever manner is best for you!

We will start by helping you get Python installed on your computer, regardless of your operating system, whether its Linux, MacOS, or Windows, we've got you covered.

We cover a wide variety of topics, including:
• Command Line Basics
• Installing Python
• Running Python Code
• Strings
• Lists
• Dictionaries
• Tuples
• Sets
• Number Data Types
• Print Formatting
• Functions
• Scope
• args/kwargs
• Built-in Functions
• Debugging and Error Handling
• Modules
• External Modules
• Object Oriented Programming
• Inheritance
• Polymorphism
• File I/O
• Advanced Methods
• Unit Tests
• and much more!

You will get lifetime access to over 100 lectures plus corresponding Notebooks for the lectures!`,
    whatYouWillLearn: [
      "Learn to use Python professionally, learning both Python 2 and Python 3!",
      "Create games with Python, like Tic Tac Toe and Blackjack!",
      "Learn advanced Python features, like the collections module and how to work with timestamps!",
      "Learn to use Object Oriented Programming with classes!",
      "Understand complex topics, like decorators.",
      "Understand how to use both the Jupyter Notebook and create .py files",
      "Get an understanding of how to create GUIs in the Jupyter Notebook system!",
      "Build a complete understanding of Python from the ground up!",
    ],
    requirements: [
      "Access to a computer with an internet connection.",
      "No prior programming experience needed - I'll teach you everything you need to know!",
      "No paid software required - I'll teach you how to use Python 3 with the (free) Jupyter Notebook!",
    ],
    curriculum: [
      {
        section: "Course Introduction",
        lectures: [
          {
            title: "Introduction to the Course",
            duration: "3:24",
            type: "video",
            preview: true,
          },
          {
            title: "Course Curriculum Overview",
            duration: "5:17",
            type: "video",
            preview: true,
          },
          { title: "Course Resources", duration: "1:45", type: "article" },
        ],
      },
      {
        section: "Python Setup",
        lectures: [
          { title: "Command Line Basics", duration: "13:52", type: "video" },
          {
            title: "Installing Python (Step by Step)",
            duration: "6:17",
            type: "video",
          },
          { title: "Running Python Code", duration: "4:58", type: "video" },
          {
            title: "Getting Help with Python",
            duration: "2:19",
            type: "video",
          },
        ],
      },
      {
        section: "Python Object and Data Structure Basics",
        lectures: [
          {
            title: "Introduction to Python Data Types",
            duration: "1:42",
            type: "video",
          },
          { title: "Python Numbers", duration: "9:18", type: "video" },
          { title: "Variable Assignments", duration: "4:25", type: "video" },
          { title: "Introduction to Strings", duration: "7:19", type: "video" },
          {
            title: "Indexing and Slicing with Strings",
            duration: "8:35",
            type: "video",
          },
          {
            title: "String Properties and Methods",
            duration: "6:46",
            type: "video",
          },
          {
            title: "Print Formatting with Strings",
            duration: "11:41",
            type: "video",
          },
          { title: "Lists in Python", duration: "11:02", type: "video" },
          { title: "Dictionaries in Python", duration: "8:47", type: "video" },
          { title: "Tuples with Python", duration: "4:31", type: "video" },
          { title: "Sets in Python", duration: "3:47", type: "video" },
          { title: "Booleans in Python", duration: "2:08", type: "video" },
          {
            title: "I/O with Basic Files in Python",
            duration: "5:13",
            type: "video",
          },
          {
            title: "Python Objects and Data Structures Assessment Test",
            duration: "30 min",
            type: "quiz",
          },
        ],
      },
      {
        section: "Python Comparison Operators",
        lectures: [
          {
            title: "Comparison Operators in Python",
            duration: "4:07",
            type: "video",
          },
          {
            title: "Chaining Comparison Operators in Python",
            duration: "2:57",
            type: "video",
          },
        ],
      },
      {
        section: "Python Statements",
        lectures: [
          {
            title: "Introduction to Python Statements",
            duration: "1:16",
            type: "video",
          },
          {
            title: "If Elif and Else Statements in Python",
            duration: "5:14",
            type: "video",
          },
          { title: "For Loops in Python", duration: "9:03", type: "video" },
          { title: "While Loops in Python", duration: "3:21", type: "video" },
          {
            title: "Useful Operators in Python",
            duration: "4:21",
            type: "video",
          },
          {
            title: "List Comprehensions in Python",
            duration: "8:04",
            type: "video",
          },
          { title: "Python Statements Test", duration: "45 min", type: "quiz" },
        ],
      },
    ],
    reviews: [
      {
        id: 1,
        user: "Sarah Johnson",
        rating: 5,
        comment:
          "Excellent course! Jose explains everything clearly and the hands-on projects really help solidify the concepts. Highly recommended for beginners.",
        date: "2024-01-15",
        helpful: 24,
      },
      {
        id: 2,
        user: "Michael Chen",
        rating: 4,
        comment:
          "Great comprehensive course. Covers a lot of ground and the instructor is very knowledgeable. Some sections could be a bit more concise.",
        date: "2024-01-10",
        helpful: 18,
      },
      {
        id: 3,
        user: "Emily Rodriguez",
        rating: 5,
        comment:
          "Perfect for someone starting with Python. The progression is logical and the examples are practical. Worth every minute!",
        date: "2024-01-08",
        helpful: 31,
      },
      {
        id: 4,
        user: "David Kim",
        rating: 4,
        comment:
          "Solid course with good content. The jupyter notebooks are very helpful for following along. Could use more advanced topics.",
        date: "2024-01-05",
        helpful: 12,
      },
    ],
    relatedCourses: [
      {
        id: 2,
        title: "Advanced Python Programming",
        slug: "advanced-python-programming",
        platform: "Udemy",
        instructor: {
          name: "Angela Yu",
          title: "Lead Instructor at London App Brewery",
          bio: "Angela Yu is a developer and instructor with a passion for teaching advanced programming concepts.",
          rating: 4.7,
          students: 28000,
          courses: 12,
          avatar: "/placeholder.svg?height=100&width=100&text=AY",
        },
        rating: 4.7,
        students: 28000,
        duration: "18 hours",
        level: "Advanced",
        category: "Programming",
        tags: ["Python", "Advanced"],
        price: "Free",
        originalPrice: "$149.99",
        expiryDate: "2024-03-20",
        image: "/placeholder.svg?height=180&width=320&text=Advanced+Python",
        description:
          "Take your Python skills to the next level with advanced concepts and techniques.",
        fullDescription: "This course covers advanced Python programming concepts including decorators, generators, context managers, and more.",
        whatYouWillLearn: [
          "Master advanced Python concepts",
          "Work with decorators and generators",
          "Understand context managers",
        ],
        requirements: [
          "Basic Python knowledge",
          "Completion of a beginner Python course",
        ],
        isPopular: false,
        isNew: true,
        isTrending: false,
      },
      {
        id: 3,
        title: "Python for Data Science",
        slug: "python-for-data-science",
        platform: "Coursera",
        instructor: {
          name: "IBM Team",
          title: "Data Science Instructors",
          bio: "IBM Team provides industry-leading instruction in data science and Python programming.",
          rating: 4.5,
          students: 35000,
          courses: 8,
          avatar: "/placeholder.svg?height=100&width=100&text=IBM",
        },
        rating: 4.5,
        students: 35000,
        duration: "24 hours",
        level: "Intermediate",
        category: "Data Science",
        tags: ["Python", "Data Science"],
        price: "Free Audit",
        originalPrice: "$49/month",
        expiryDate: null,
        image: "/placeholder.svg?height=180&width=320&text=Python+Data+Science",
        description:
          "Learn how to use Python for data analysis and machine learning.",
        fullDescription: "This course teaches you how to use Python for data analysis, visualization, and machine learning.",
        whatYouWillLearn: [
          "Analyze data with Python",
          "Create data visualizations",
          "Apply machine learning techniques",
        ],
        requirements: [
          "Basic programming knowledge",
          "Interest in data science",
        ],
        isPopular: true,
        isNew: false,
        isTrending: true,
      },
    ],
  };
};

export default function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params); // ✅ unwrap promise
  const course = getCourseById(id);
  const [isBookmarked, setIsBookmarked] = useState(false);

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

  const totalLectures = course.curriculum.reduce(
    (acc, section) => acc + section.lectures.length,
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
            <span className="text-gray-900">{course.title}</span>
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
                {course.isPopular && (
                  <Badge className="bg-blue-600">Popular</Badge>
                )}
                {course.isNew && <Badge className="bg-green-600">New</Badge>}
                {course.isTrending && (
                  <Badge className="bg-purple-600">Trending</Badge>
                )}
                <Badge variant="outline">{course.level}</Badge>
                <Badge variant="outline">{course.category}</Badge>
              </div>

              <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
              <p className="text-lg text-gray-600 mb-6">{course.description}</p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1 fill-current" />
                  <span className="font-medium">{course.rating}</span>
                  <span className="ml-1">
                    ({course.students.toLocaleString()} students)
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
                {course.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

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

            {/* Course Content Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* What You'll Learn */}
                <Card>
                  <CardHeader>
                    <CardTitle>What you'll learn</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-3">
                      {course.whatYouWillLearn.map((item, index) => (
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
                      <p className="whitespace-pre-line text-gray-700">
                        {course.fullDescription}
                      </p>
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
                      {course.requirements.map((req, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="curriculum" className="space-y-4">
                <div className="mb-4">
                  <p className="text-sm text-gray-600">
                    {course.curriculum.length} sections • {totalLectures}{" "}
                    lectures • {course.duration} total length
                  </p>
                </div>

                {course.curriculum.map((section, sectionIndex) => (
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
                        {section.lectures.map((lecture, lectureIndex) => (
                          <div
                            key={lectureIndex}
                            className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50"
                          >
                            <div className="flex items-center space-x-3">
                              {getLectureIcon(lecture.type)}
                              <span className="text-sm">{lecture.title}</span>
                              {lecture.preview && (
                                <Badge variant="outline" className="text-xs">
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
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
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
                              {course.instructor.students.toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-600">Students</p>
                          </div>
                          <div className="text-center">
                            <p className="font-medium">
                              {course.instructor.courses}
                            </p>
                            <p className="text-xs text-gray-600">Courses</p>
                          </div>
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
                      ({course.students.toLocaleString()} reviews)
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {course.reviews.map((review) => (
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
                  ))}
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
                      {course.price}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      {course.originalPrice}
                    </span>
                  </div>
                  {daysLeft && daysLeft > 0 && (
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4">
                      <div className="flex items-center justify-center space-x-2 text-orange-700">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm font-medium">
                          {daysLeft} day{daysLeft > 1 ? "s" : ""} left at this
                          price!
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-3 mb-6">
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    size="lg"
                    asChild
                  >
                    <Link
                      href={`https://${course.platform.toLowerCase()}.com`}
                      target="_blank"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Enroll on {course.platform}
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    size="lg"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Add to Wishlist
                  </Button>
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
                    <span>{course.level}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Students:</span>
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Language:</span>
                    <span>English</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Certificate:</span>
                    <span>Yes</span>
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
                {course.relatedCourses.map((relatedCourse) => (
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
    </div>
  );
}
