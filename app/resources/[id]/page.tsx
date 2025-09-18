"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ExternalLink,
  Star,
  Download,
  Share2,
  Bookmark,
  BookmarkCheck,
  Globe,
  ChevronRight,
  CheckCircle,
  FileText,
  PenTool,
  Tag,
  Eye,
  ThumbsUp,
  MessageSquare,
  Clock,
} from "lucide-react"
import Link from "next/link"
import React, { useState, useEffect } from "react"
import type { Resource } from "@/lib/types"
import { Header } from "@/components/layout/Header"
import { formatDate } from "@/lib/utils"

// Extended Resource type for detail page
type ResourceDetail = Resource & {
  fullDescription: string
  features: string[]
  requirements: string[]
  screenshots: string[]
  author: {
    name: string
    title: string
    bio: string
    avatar: string
    resources: number
    followers: number
  }
  reviews: {
    id: number
    user: string
    rating: number
    comment: string
    date: string
    helpful: number
  }[]
  relatedResources: Resource[]
  views: number
  downloads: number
  lastUpdated: string
}

// Mock resource data - in a real app, this would come from an API
const getResourceById = (id: string): ResourceDetail => {
  return {
    id: 1,
    title: "freeCodeCamp - Learn to Code for Free",
    description: "Learn to code for free with interactive coding lessons, projects, and certifications.",
    category: "Learning Platform",
    type: "Website",
    url: "https://freecodecamp.org",
    tags: ["Programming", "Web Development", "Certifications", "JavaScript", "Python", "Data Science"],
    rating: 4.8,
    featured: true,
    dateAdded: "2024-01-15",
    image: "/placeholder.svg?height=400&width=600&text=freeCodeCamp+Hero",
    fullDescription: `freeCodeCamp is a non-profit organization that consists of an interactive learning web platform, an online community forum, chat rooms, online publications and local organizations that intend to make learning web development accessible to anyone.

The platform offers a full stack web development curriculum that is completely free and self-paced. Students can earn verified certifications in:

• Responsive Web Design
• JavaScript Algorithms and Data Structures
• Front End Development Libraries
• Data Visualization
• Back End Development and APIs
• Quality Assurance
• Scientific Computing with Python
• Data Analysis with Python
• Information Security
• Machine Learning with Python

What makes freeCodeCamp special is its hands-on approach to learning. Instead of just watching videos or reading tutorials, you'll build real projects that you can add to your portfolio. The curriculum includes over 3,000 hours of coursework and you'll build 30+ projects along the way.

The platform also has an active community of millions of developers who help each other learn and grow. You can join study groups, participate in coding challenges, and contribute to open source projects.`,
    features: [
      "3,000+ hours of free coursework",
      "30+ real-world projects to build your portfolio",
      "10 verified certifications available",
      "Interactive coding challenges and exercises",
      "Active community forum with millions of developers",
      "Mobile-responsive learning platform",
      "No ads or paywalls - completely free forever",
      "Open source curriculum that's constantly updated",
      "Career guidance and interview preparation",
      "Nonprofit organization focused on education accessibility",
    ],
    requirements: [
      "A computer with internet connection",
      "Modern web browser (Chrome, Firefox, Safari, or Edge)",
      "No prior programming experience required",
      "Dedication to complete the coursework (estimated 300+ hours per certification)",
      "Basic English reading comprehension",
    ],
    screenshots: [
      "/placeholder.svg?height=300&width=500&text=freeCodeCamp+Dashboard",
      "/placeholder.svg?height=300&width=500&text=Coding+Challenge",
      "/placeholder.svg?height=300&width=500&text=Project+Portfolio",
      "/placeholder.svg?height=300&width=500&text=Community+Forum",
    ],
    author: {
      name: "Quincy Larson",
      title: "Founder of freeCodeCamp",
      bio: "Quincy Larson is a teacher who founded freeCodeCamp.org - a community of millions of people learning to code together. He's passionate about making coding education accessible to everyone, regardless of their background or financial situation.",
      avatar: "/placeholder.svg?height=100&width=100&text=QL",
      resources: 25,
      followers: 500000,
    },
    reviews: [
      {
        id: 1,
        user: "Sarah Chen",
        rating: 5,
        comment:
          "Absolutely amazing platform! I went from zero coding knowledge to landing my first developer job in 8 months. The projects are challenging but rewarding, and the community is incredibly supportive.",
        date: "2024-01-20",
        helpful: 45,
      },
      {
        id: 2,
        user: "Michael Rodriguez",
        rating: 5,
        comment:
          "Best free resource for learning web development. The curriculum is well-structured and the hands-on approach really helps you understand the concepts. Highly recommend!",
        date: "2024-01-18",
        helpful: 32,
      },
      {
        id: 3,
        user: "Emily Johnson",
        rating: 4,
        comment:
          "Great platform with excellent content. Some sections can be challenging for complete beginners, but the community forum is very helpful when you get stuck.",
        date: "2024-01-15",
        helpful: 28,
      },
      {
        id: 4,
        user: "David Kim",
        rating: 5,
        comment:
          "I've tried many coding bootcamps and online courses, but freeCodeCamp stands out for its practical approach. Building real projects makes all the difference.",
        date: "2024-01-12",
        helpful: 19,
      },
    ],
    relatedResources: [
      {
        id: 2,
        title: "MDN Web Docs",
        description: "Comprehensive documentation for web technologies including HTML, CSS, and JavaScript.",
        category: "Documentation",
        type: "Website",
        url: "https://developer.mozilla.org",
        tags: ["HTML", "CSS", "JavaScript"],
        rating: 4.9,
        featured: true,
        dateAdded: "2024-01-10",
        image: "/placeholder.svg?height=200&width=300&text=MDN+Web+Docs",
      },
      {
        id: 3,
        title: "Codecademy",
        description: "Interactive coding lessons and projects to learn programming languages.",
        category: "Learning Platform",
        type: "Website",
        url: "https://codecademy.com",
        tags: ["Programming", "Interactive"],
        rating: 4.5,
        featured: false,
        dateAdded: "2024-01-17",
        image: "/placeholder.svg?height=200&width=300&text=Codecademy",
      },
      {
        id: 4,
        title: "The Odin Project",
        description: "Free full stack curriculum supported by an open source community.",
        category: "Learning Platform",
        type: "Website",
        url: "https://theodinproject.com",
        tags: ["Full Stack", "Open Source"],
        rating: 4.7,
        featured: true,
        dateAdded: "2024-01-14",
        image: "/placeholder.svg?height=200&width=300&text=Odin+Project",
      },
    ],
    views: 125000,
    downloads: 0, // Not applicable for websites
    lastUpdated: "2024-01-25",
  }
}

export default function ResourceDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const resource = getResourceById(id);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "Website":
        return <Globe className="h-5 w-5" />;
      case "Tool":
        return <PenTool className="h-5 w-5" />;
      case "PDF":
        return <FileText className="h-5 w-5" />;
      default:
        return <Globe className="h-5 w-5" />;
    }
  };

  const getResourceAction = (type: string) => {
    switch (type) {
      case "PDF":
        return {
          icon: <Download className="h-4 w-4 mr-2" />,
          text: "Download PDF",
        };
      case "Tool":
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

  const action = getResourceAction(resource.type);

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
            <Link href="/resources" className="hover:text-blue-600">
              Resources
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900">{resource.title}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Resource Header */}
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                {resource.featured && (
                  <Badge className="bg-blue-600">Featured</Badge>
                )}
                <Badge variant="secondary" className="flex items-center">
                  {getResourceIcon(resource.type)}
                  <span className="ml-1">{resource.type}</span>
                </Badge>
                <Badge variant="outline">{resource.category}</Badge>
              </div>

              <h1 className="text-3xl font-bold mb-4">{resource.title}</h1>
              <p className="text-lg text-gray-600 mb-6">
                {resource.description}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1 fill-current" />
                  <span className="font-medium">{resource.rating}</span>
                  <span className="ml-1">rating</span>
                </div>
                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  <span>{resource.views.toLocaleString()} views</span>
                </div>
                {resource.downloads > 0 && (
                  <div className="flex items-center">
                    <Download className="h-4 w-4 mr-1" />
                    <span>{resource.downloads.toLocaleString()} downloads</span>
                  </div>
                )}
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Updated {formatDate(resource.lastUpdated)}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {resource.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    <Tag className="h-3 w-3 mr-1" />
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

            {/* Resource Content Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="author">Author</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Resource Description */}
                <Card>
                  <CardHeader>
                    <CardTitle>About this Resource</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      <p className="whitespace-pre-line text-gray-700">
                        {resource.fullDescription}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Screenshots/Preview */}
                {resource.screenshots && resource.screenshots.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Screenshots</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        {resource.screenshots.map((screenshot, index) => (
                          <img
                            key={index}
                            src={screenshot || "/placeholder.svg"}
                            alt={`${resource.title} screenshot ${index + 1}`}
                            className="w-full h-48 object-cover rounded-lg border"
                          />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Requirements */}
                {resource.requirements && resource.requirements.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Requirements</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {resource.requirements.map((req, index) => (
                          <li
                            key={index}
                            className="flex items-start space-x-2"
                          >
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="features" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Key Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-3">
                      {resource.features.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="author" className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={resource.author.avatar || "/placeholder.svg"}
                        alt={resource.author.name}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-1">
                          {resource.author.name}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {resource.author.title}
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="text-center">
                            <p className="font-medium">
                              {resource.author.resources}
                            </p>
                            <p className="text-xs text-gray-600">Resources</p>
                          </div>
                          <div className="text-center">
                            <p className="font-medium">
                              {resource.author.followers.toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-600">Followers</p>
                          </div>
                        </div>

                        <p className="text-gray-700 text-sm leading-relaxed">
                          {resource.author.bio}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">User Reviews</h3>
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="font-medium">{resource.rating}</span>
                    <span className="text-gray-600">
                      ({resource.reviews.length} reviews)
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {resource.reviews.map((review) => (
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
                          <button className="hover:text-blue-600 flex items-center">
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            Helpful ({review.helpful})
                          </button>
                          <button className="hover:text-blue-600 flex items-center">
                            <MessageSquare className="h-3 w-3 mr-1" />
                            Reply
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
            {/* Resource Preview Card */}
            <Card className="">
              <div className="relative">
                <img
                  src={resource.image || "/placeholder.svg"}
                  alt={resource.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-3 right-3 bg-white rounded-full p-2">
                  <div className="flex items-center">
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    <span className="text-xs font-medium ml-1">
                      {resource.rating}
                    </span>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <Badge className="bg-green-600 text-white px-4 py-2 text-lg">
                      FREE
                    </Badge>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    size="lg"
                    asChild
                  >
                    <Link href={resource.url} target="_blank">
                      {action.icon}
                      {action.text}
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    size="lg"
                  >
                    <Bookmark className="h-4 w-4 mr-2" />
                    Add to Collection
                  </Button>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Type:</span>
                    <Badge variant="secondary" className="flex items-center">
                      {getResourceIcon(resource.type)}
                      <span className="ml-1">{resource.type}</span>
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Category:</span>
                    <span>{resource.category}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Rating:</span>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 text-yellow-400 mr-1 fill-current" />
                      <span>{resource.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Views:</span>
                    <span>{resource.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Added:</span>
                    <span>{formatDate(resource.dateAdded)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Updated:</span>
                    <span>{formatDate(resource.lastUpdated)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Related Resources */}
            <Card>
              <CardHeader>
                <CardTitle>Related Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {resource.relatedResources.map((relatedResource) => (
                  <Link
                    key={relatedResource.id}
                    href={`/resources/${relatedResource.id}`}
                    className="block hover:bg-gray-50 rounded-lg p-3 -m-3 transition-colors"
                  >
                    <div className="flex space-x-3">
                      <img
                        src={relatedResource.image || "/placeholder.svg"}
                        alt={relatedResource.title}
                        className="w-16 h-12 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm line-clamp-2 mb-1">
                          {relatedResource.title}
                        </h4>
                        <p className="text-xs text-gray-600 mb-1">
                          {relatedResource.category}
                        </p>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            <Star className="h-3 w-3 text-yellow-400 mr-1 fill-current" />
                            <span className="text-xs">
                              {relatedResource.rating}
                            </span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {relatedResource.type}
                          </Badge>
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
