"use client";

import React, { useState } from "react";
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
  BookOpen,
  Search,
  Clock,
  Users,
  Star,
  ChevronDown,
  X,
  SlidersHorizontal,
} from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";

// Mock course data - Expanded to show pagination
const courses = [
  {
    id: 1,
    title: "Complete Python Bootcamp",
    platform: "Udemy",
    instructor: "Jose Portilla",
    rating: 4.6,
    students: 45000,
    duration: "21 hours",
    level: "Beginner",
    category: "Programming",
    tags: ["Python", "Web Development", "Data Science"],
    price: "Free",
    originalPrice: "$199.99",
    expiryDate: "2024-01-30",
    image: "/placeholder.svg?height=180&width=320&text=Python+Course",
    description:
      "Master Python programming from beginner to advanced with hands-on projects.",
    isPopular: true,
  },
  {
    id: 2,
    title: "React.js Masterclass",
    platform: "Coursera",
    instructor: "Meta Team",
    rating: 4.8,
    students: 32000,
    duration: "18 hours",
    level: "Intermediate",
    category: "Web Development",
    tags: ["React", "JavaScript", "Frontend"],
    price: "Free Audit",
    originalPrice: "$49/month",
    expiryDate: null,
    image: "/placeholder.svg?height=180&width=320&text=React+Course",
    description:
      "Build modern web applications with React.js and essential developer tools.",
    isNew: true,
  },
  {
    id: 3,
    title: "Data Science Fundamentals",
    platform: "Udemy",
    instructor: "Kirill Eremenko",
    rating: 4.5,
    students: 28500,
    duration: "24 hours",
    level: "Beginner",
    category: "Data Science",
    tags: ["Python", "Machine Learning", "Statistics"],
    price: "Free",
    originalPrice: "$149.99",
    expiryDate: "2024-02-05",
    image: "/placeholder.svg?height=180&width=320&text=Data+Science+Course",
    description:
      "Learn data analysis, visualization, and machine learning fundamentals.",
    isTrending: true,
  },
  {
    id: 4,
    title: "JavaScript ES6+ Complete Guide",
    platform: "Udemy",
    instructor: "Maximilian Schwarzmüller",
    rating: 4.7,
    students: 67000,
    duration: "15 hours",
    level: "Intermediate",
    category: "Programming",
    tags: ["JavaScript", "ES6", "Web Development"],
    price: "Free",
    originalPrice: "$89.99",
    expiryDate: "2024-01-25",
    image: "/placeholder.svg?height=180&width=320&text=JavaScript+Course",
    description:
      "Master modern JavaScript with ES6+ features and advanced concepts.",
    isPopular: true,
  },
  {
    id: 5,
    title: "Machine Learning A-Z",
    platform: "Coursera",
    instructor: "Andrew Ng",
    rating: 4.9,
    students: 89000,
    duration: "32 hours",
    level: "Advanced",
    category: "Machine Learning",
    tags: ["Python", "TensorFlow", "AI"],
    price: "Free Audit",
    originalPrice: "$79/month",
    expiryDate: null,
    image: "/placeholder.svg?height=180&width=320&text=ML+Course",
    description:
      "Comprehensive machine learning course from Stanford University.",
    isPopular: true,
  },
  {
    id: 6,
    title: "UI/UX Design Bootcamp",
    platform: "Udemy",
    instructor: "Jonas Schmedtmann",
    rating: 4.4,
    students: 23000,
    duration: "20 hours",
    level: "Beginner",
    category: "Design",
    tags: ["Figma", "UI Design", "UX Research"],
    price: "Free",
    originalPrice: "$129.99",
    expiryDate: "2024-02-10",
    image: "/placeholder.svg?height=180&width=320&text=UI+UX+Course",
    description:
      "Learn UI/UX design principles and create stunning user interfaces.",
    isNew: true,
  },
  {
    id: 7,
    title: "Node.js Complete Course",
    platform: "Udemy",
    instructor: "Brad Traversy",
    rating: 4.6,
    students: 54000,
    duration: "28 hours",
    level: "Intermediate",
    category: "Backend Development",
    tags: ["Node.js", "Express", "MongoDB"],
    price: "Free",
    originalPrice: "$179.99",
    expiryDate: "2024-02-15",
    image: "/placeholder.svg?height=180&width=320&text=NodeJS+Course",
    description:
      "Build scalable backend applications with Node.js and Express.",
    isPopular: true,
  },
  {
    id: 8,
    title: "Angular Complete Guide",
    platform: "Coursera",
    instructor: "Google Team",
    rating: 4.5,
    students: 41000,
    duration: "22 hours",
    level: "Intermediate",
    category: "Web Development",
    tags: ["Angular", "TypeScript", "Frontend"],
    price: "Free Audit",
    originalPrice: "$59/month",
    expiryDate: null,
    image: "/placeholder.svg?height=180&width=320&text=Angular+Course",
    description:
      "Master Angular framework for building dynamic web applications.",
    isNew: true,
  },
  {
    id: 9,
    title: "Docker & Kubernetes",
    platform: "Udemy",
    instructor: "Stephen Grider",
    rating: 4.7,
    students: 38000,
    duration: "26 hours",
    level: "Advanced",
    category: "DevOps",
    tags: ["Docker", "Kubernetes", "DevOps"],
    price: "Free",
    originalPrice: "$199.99",
    expiryDate: "2024-01-28",
    image: "/placeholder.svg?height=180&width=320&text=Docker+Course",
    description:
      "Learn containerization and orchestration with Docker and Kubernetes.",
    isTrending: true,
  },
  {
    id: 10,
    title: "AWS Cloud Practitioner",
    platform: "Coursera",
    instructor: "AWS Team",
    rating: 4.8,
    students: 72000,
    duration: "16 hours",
    level: "Beginner",
    category: "Cloud Computing",
    tags: ["AWS", "Cloud", "Certification"],
    price: "Free Audit",
    originalPrice: "$49/month",
    expiryDate: null,
    image: "/placeholder.svg?height=180&width=320&text=AWS+Course",
    description:
      "Get started with Amazon Web Services and cloud computing fundamentals.",
    isPopular: true,
  },
  {
    id: 11,
    title: "Flutter Mobile Development",
    platform: "Udemy",
    instructor: "Angela Yu",
    rating: 4.6,
    students: 29000,
    duration: "31 hours",
    level: "Intermediate",
    category: "Mobile Development",
    tags: ["Flutter", "Dart", "Mobile"],
    price: "Free",
    originalPrice: "$149.99",
    expiryDate: "2024-02-20",
    image: "/placeholder.svg?height=180&width=320&text=Flutter+Course",
    description:
      "Build beautiful cross-platform mobile apps with Flutter and Dart.",
    isNew: true,
  },
  {
    id: 12,
    title: "Cybersecurity Fundamentals",
    platform: "Coursera",
    instructor: "IBM Team",
    rating: 4.4,
    students: 35000,
    duration: "19 hours",
    level: "Beginner",
    category: "Cybersecurity",
    tags: ["Security", "Networking", "Ethical Hacking"],
    price: "Free Audit",
    originalPrice: "$39/month",
    expiryDate: null,
    image: "/placeholder.svg?height=180&width=320&text=Cybersecurity+Course",
    description: "Learn cybersecurity principles and protect digital assets.",
    isTrending: true,
  },
  {
    id: 13,
    title: "SQL Database Design",
    platform: "Udemy",
    instructor: "Colt Steele",
    rating: 4.7,
    students: 48000,
    duration: "14 hours",
    level: "Beginner",
    category: "Database",
    tags: ["SQL", "MySQL", "Database Design"],
    price: "Free",
    originalPrice: "$94.99",
    expiryDate: "2024-02-08",
    image: "/placeholder.svg?height=180&width=320&text=SQL+Course",
    description:
      "Master SQL and database design from scratch to advanced level.",
    isPopular: true,
  },
  {
    id: 14,
    title: "Blockchain Development",
    platform: "Coursera",
    instructor: "University of Buffalo",
    rating: 4.3,
    students: 22000,
    duration: "25 hours",
    level: "Advanced",
    category: "Blockchain",
    tags: ["Blockchain", "Solidity", "Web3"],
    price: "Free Audit",
    originalPrice: "$79/month",
    expiryDate: null,
    image: "/placeholder.svg?height=180&width=320&text=Blockchain+Course",
    description: "Learn blockchain technology and smart contract development.",
    isNew: true,
  },
  {
    id: 15,
    title: "Digital Marketing Mastery",
    platform: "Udemy",
    instructor: "Phil Ebiner",
    rating: 4.5,
    students: 61000,
    duration: "23 hours",
    level: "Beginner",
    category: "Marketing",
    tags: ["SEO", "Social Media", "Analytics"],
    price: "Free",
    originalPrice: "$129.99",
    expiryDate: "2024-02-12",
    image: "/placeholder.svg?height=180&width=320&text=Marketing+Course",
    description:
      "Complete digital marketing course covering SEO, social media, and analytics.",
    isTrending: true,
  },
  {
    id: 16,
    title: "Game Development with Unity",
    platform: "Coursera",
    instructor: "Unity Technologies",
    rating: 4.6,
    students: 33000,
    duration: "27 hours",
    level: "Intermediate",
    category: "Game Development",
    tags: ["Unity", "C#", "Game Design"],
    price: "Free Audit",
    originalPrice: "$49/month",
    expiryDate: null,
    image: "/placeholder.svg?height=180&width=320&text=Unity+Course",
    description: "Create 2D and 3D games using Unity game engine and C#.",
    isPopular: true,
  },
  {
    id: 17,
    title: "Photoshop CC Masterclass",
    platform: "Udemy",
    instructor: "Martin Perhiniak",
    rating: 4.8,
    students: 44000,
    duration: "17 hours",
    level: "Beginner",
    category: "Design",
    tags: ["Photoshop", "Photo Editing", "Graphic Design"],
    price: "Free",
    originalPrice: "$109.99",
    expiryDate: "2024-01-31",
    image: "/placeholder.svg?height=180&width=320&text=Photoshop+Course",
    description: "Master Adobe Photoshop from beginner to professional level.",
    isNew: true,
  },
  {
    id: 18,
    title: "Excel Data Analysis",
    platform: "Coursera",
    instructor: "Microsoft Team",
    rating: 4.4,
    students: 56000,
    duration: "12 hours",
    level: "Intermediate",
    category: "Data Analysis",
    tags: ["Excel", "Data Visualization", "Pivot Tables"],
    price: "Free Audit",
    originalPrice: "$39/month",
    expiryDate: null,
    image: "/placeholder.svg?height=180&width=320&text=Excel+Course",
    description:
      "Advanced Excel techniques for data analysis and visualization.",
    isTrending: true,
  },
  {
    id: 19,
    title: "iOS App Development",
    platform: "Udemy",
    instructor: "Angela Yu",
    rating: 4.7,
    students: 39000,
    duration: "29 hours",
    level: "Intermediate",
    category: "Mobile Development",
    tags: ["iOS", "Swift", "Xcode"],
    price: "Free",
    originalPrice: "$199.99",
    expiryDate: "2024-02-18",
    image: "/placeholder.svg?height=180&width=320&text=iOS+Course",
    description: "Build iOS apps from scratch using Swift and Xcode.",
    isPopular: true,
  },
  {
    id: 20,
    title: "Artificial Intelligence Basics",
    platform: "Coursera",
    instructor: "Stanford University",
    rating: 4.9,
    students: 78000,
    duration: "21 hours",
    level: "Beginner",
    category: "Artificial Intelligence",
    tags: ["AI", "Neural Networks", "Deep Learning"],
    price: "Free Audit",
    originalPrice: "$79/month",
    expiryDate: null,
    image: "/placeholder.svg?height=180&width=320&text=AI+Course",
    description:
      "Introduction to artificial intelligence and machine learning concepts.",
    isNew: true,
  },
  {
    id: 21,
    title: "WordPress Development",
    platform: "Udemy",
    instructor: "Brad Schiff",
    rating: 4.5,
    students: 31000,
    duration: "18 hours",
    level: "Beginner",
    category: "Web Development",
    tags: ["WordPress", "PHP", "CMS"],
    price: "Free",
    originalPrice: "$119.99",
    expiryDate: "2024-02-25",
    image: "/placeholder.svg?height=180&width=320&text=WordPress+Course",
    description: "Create custom WordPress themes and plugins from scratch.",
    isTrending: true,
  },
  {
    id: 22,
    title: "Google Analytics 4",
    platform: "Coursera",
    instructor: "Google Team",
    rating: 4.6,
    students: 42000,
    duration: "8 hours",
    level: "Beginner",
    category: "Analytics",
    tags: ["Google Analytics", "Web Analytics", "Data Tracking"],
    price: "Free Audit",
    originalPrice: "$29/month",
    expiryDate: null,
    image: "/placeholder.svg?height=180&width=320&text=Analytics+Course",
    description: "Master Google Analytics 4 for comprehensive web analytics.",
    isPopular: true,
  },
  {
    id: 23,
    title: "Linux Command Line",
    platform: "Udemy",
    instructor: "Zach Star",
    rating: 4.4,
    students: 27000,
    duration: "11 hours",
    level: "Beginner",
    category: "Operating Systems",
    tags: ["Linux", "Command Line", "System Administration"],
    price: "Free",
    originalPrice: "$79.99",
    expiryDate: "2024-02-14",
    image: "/placeholder.svg?height=180&width=320&text=Linux+Course",
    description: "Master Linux command line and system administration basics.",
    isNew: true,
  },
  {
    id: 24,
    title: "Figma UI Design",
    platform: "Coursera",
    instructor: "Adobe Team",
    rating: 4.7,
    students: 36000,
    duration: "13 hours",
    level: "Beginner",
    category: "Design",
    tags: ["Figma", "UI Design", "Prototyping"],
    price: "Free Audit",
    originalPrice: "$39/month",
    expiryDate: null,
    image: "/placeholder.svg?height=180&width=320&text=Figma+Course",
    description: "Design beautiful user interfaces and prototypes with Figma.",
    isTrending: true,
  },
  {
    id: 25,
    title: "Git & GitHub Mastery",
    platform: "Udemy",
    instructor: "Colt Steele",
    rating: 4.8,
    students: 52000,
    duration: "9 hours",
    level: "Beginner",
    category: "Version Control",
    tags: ["Git", "GitHub", "Version Control"],
    price: "Free",
    originalPrice: "$64.99",
    expiryDate: "2024-02-22",
    image: "/placeholder.svg?height=180&width=320&text=Git+Course",
    description:
      "Master Git version control and GitHub collaboration workflows.",
    isPopular: true,
  },
];

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedDuration, setSelectedDuration] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage, setCoursesPerPage] = useState(9); // Make it changeable

  // Reset pagination when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [
    searchTerm,
    selectedPlatforms,
    selectedCategories,
    selectedLevels,
    selectedDuration,
    sortBy,
    coursesPerPage,
  ]);

  // Get unique values for filters
  const platforms = [...new Set(courses.map((course) => course.platform))];
  const categories = [...new Set(courses.map((course) => course.category))];
  const levels = [...new Set(courses.map((course) => course.level))];

  // Filter courses based on selected filters
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesPlatform =
      selectedPlatforms.length === 0 ||
      selectedPlatforms.includes(course.platform);
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(course.category);
    const matchesLevel =
      selectedLevels.length === 0 || selectedLevels.includes(course.level);

    const matchesDuration =
      selectedDuration === "" ||
      (selectedDuration === "short" &&
        Number.parseInt(course.duration) <= 10) ||
      (selectedDuration === "medium" &&
        Number.parseInt(course.duration) > 10 &&
        Number.parseInt(course.duration) <= 20) ||
      (selectedDuration === "long" && Number.parseInt(course.duration) > 20);

    return (
      matchesSearch &&
      matchesPlatform &&
      matchesCategory &&
      matchesLevel &&
      matchesDuration
    );
  });

  // Sort courses
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.students - a.students;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      case "duration-short":
        return Number.parseInt(a.duration) - Number.parseInt(b.duration);
      case "duration-long":
        return Number.parseInt(b.duration) - Number.parseInt(a.duration);
      default:
        return 0;
    }
  });

  const handlePlatformChange = (platform: string, checked: boolean) => {
    if (checked) {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    } else {
      setSelectedPlatforms(selectedPlatforms.filter((p) => p !== platform));
    }
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    }
  };

  const handleLevelChange = (level: string, checked: boolean) => {
    if (checked) {
      setSelectedLevels([...selectedLevels, level]);
    } else {
      setSelectedLevels(selectedLevels.filter((l) => l !== level));
    }
  };

  const clearAllFilters = () => {
    setSelectedPlatforms([]);
    setSelectedCategories([]);
    setSelectedLevels([]);
    setSelectedDuration("");
    setSearchTerm("");
  };

  const activeFiltersCount =
    selectedPlatforms.length +
    selectedCategories.length +
    selectedLevels.length +
    (selectedDuration ? 1 : 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
         <Header showSearch/>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Free Courses</h1>
          <p className="text-gray-600">
            Discover {courses.length} curated free courses from top platforms
            like Udemy and Coursera
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80">
            {/* Mobile Filter Toggle */}
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

            {/* Filters Panel */}
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
                      className="text-sm font-medium mb-2 block"
                    >
                      Search Courses
                    </Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="search"
                        placeholder="Search by title, instructor, or tags..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Platform Filter */}
                  <div className="mb-6">
                    <Label className="text-sm font-medium mb-3 block">
                      Platform
                    </Label>
                    <div className="space-y-2">
                      {platforms.map((platform) => (
                        <div
                          key={platform}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`platform-${platform}`}
                            checked={selectedPlatforms.includes(platform)}
                            onCheckedChange={(checked) =>
                              handlePlatformChange(platform, checked as boolean)
                            }
                          />
                          <Label
                            htmlFor={`platform-${platform}`}
                            className="text-sm"
                          >
                            {platform}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Category Filter */}
                  <div className="mb-6">
                    <Label className="text-sm font-medium mb-3 block">
                      Category
                    </Label>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div
                          key={category}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`category-${category}`}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={(checked) =>
                              handleCategoryChange(category, checked as boolean)
                            }
                          />
                          <Label
                            htmlFor={`category-${category}`}
                            className="text-sm"
                          >
                            {category}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Level Filter */}
                  <div className="mb-6">
                    <Label className="text-sm font-medium mb-3 block">
                      Skill Level
                    </Label>
                    <div className="space-y-2">
                      {levels.map((level) => (
                        <div
                          key={level}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`level-${level}`}
                            checked={selectedLevels.includes(level)}
                            onCheckedChange={(checked) =>
                              handleLevelChange(level, checked as boolean)
                            }
                          />
                          <Label htmlFor={`level-${level}`} className="text-sm">
                            {level}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Duration Filter */}
                  <div className="mb-6">
                    <Label className="text-sm font-medium mb-3 block">
                      Duration
                    </Label>
                    <Select
                      value={selectedDuration}
                      onValueChange={setSelectedDuration}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Any duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any duration</SelectItem>
                        <SelectItem value="short">
                          Short (0-10 hours)
                        </SelectItem>
                        <SelectItem value="medium">
                          Medium (10-20 hours)
                        </SelectItem>
                        <SelectItem value="long">Long (20+ hours)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Clear Filters */}
                  {activeFiltersCount > 0 && (
                    <Button
                      variant="outline"
                      onClick={clearAllFilters}
                      className="w-full bg-transparent"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Clear All Filters
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <p className="text-gray-600">
                  Showing {sortedCourses.length} of {courses.length} courses
                </p>
                {activeFiltersCount > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedPlatforms.map((platform) => (
                      <Badge
                        key={platform}
                        variant="secondary"
                        className="text-xs"
                      >
                        {platform}
                        <button
                          onClick={() => handlePlatformChange(platform, false)}
                          className="ml-1 hover:text-red-500"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                    {selectedCategories.map((category) => (
                      <Badge
                        key={category}
                        variant="secondary"
                        className="text-xs"
                      >
                        {category}
                        <button
                          onClick={() => handleCategoryChange(category, false)}
                          className="ml-1 hover:text-red-500"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                    {selectedLevels.map((level) => (
                      <Badge
                        key={level}
                        variant="secondary"
                        className="text-xs"
                      >
                        {level}
                        <button
                          onClick={() => handleLevelChange(level, false)}
                          className="ml-1 hover:text-red-500"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="duration-short">Shortest First</SelectItem>
                  <SelectItem value="duration-long">Longest First</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Course Grid with Pagination */}
            {sortedCourses.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No courses found
                </h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your filters or search terms
                </p>
                <Button onClick={clearAllFilters} variant="outline">
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {sortedCourses
                    .slice(
                      (currentPage - 1) * coursesPerPage,
                      currentPage * coursesPerPage
                    )
                    .map((course) => (
                      <Card
                        key={course.id}
                        className="overflow-hidden hover:shadow-lg transition-shadow"
                      >
                        <div className="relative">
                          <img
                            src={course.image || "/placeholder.svg"}
                            alt={course.title}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute top-3 left-3 flex gap-2">
                            {course.isPopular && (
                              <Badge className="bg-blue-600">Popular</Badge>
                            )}
                            {course.isNew && (
                              <Badge className="bg-green-600">New</Badge>
                            )}
                            {course.isTrending && (
                              <Badge className="bg-purple-600">Trending</Badge>
                            )}
                          </div>
                          <div className="absolute top-3 right-3 bg-white rounded px-2 py-1">
                            <span
                              className={`text-xs font-medium ${
                                course.platform === "Udemy"
                                  ? "text-purple-600"
                                  : "text-blue-600"
                              }`}
                            >
                              {course.platform}
                            </span>
                          </div>
                        </div>

                        <CardContent className="p-5">
                          <div className="mb-3">
                            <h3 className="font-semibold text-lg mb-1 line-clamp-2">
                              {course.title}
                            </h3>
                            <p className="text-sm text-gray-600">
                              by {course.instructor}
                            </p>
                          </div>

                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {course.description}
                          </p>

                          <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                            <div className="flex items-center">
                              <Star className="h-3 w-3 text-yellow-400 mr-1 fill-current" />
                              {course.rating}
                            </div>
                            <div className="flex items-center">
                              <Users className="h-3 w-3 mr-1" />
                              {course.students.toLocaleString()}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {course.duration}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1 mb-4">
                            {course.tags.slice(0, 3).map((tag) => (
                              <Badge
                                key={tag}
                                variant="outline"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <span className="font-semibold text-green-600">
                                {course.price}
                              </span>
                              <span className="text-xs text-gray-500 line-through ml-2">
                                {course.originalPrice}
                              </span>
                              {course.expiryDate && (
                                <p className="text-xs text-orange-600 mt-1">
                                  Until{" "}
                                  {new Date(
                                    course.expiryDate
                                  ).toLocaleDateString()}
                                </p>
                              )}
                            </div>
                           <Link href={`/courses/${course.id}`} passHref>
  <Button size="sm">View Course</Button>
</Link>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>

                {/* Enhanced Pagination for Large Datasets */}
                {Math.ceil(sortedCourses.length / coursesPerPage) > 1 && (
                  <div className="mt-12 space-y-4">
                    {/* Page Size Selector */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Label className="text-sm">Show:</Label>
                          <Select
                            value={coursesPerPage.toString()}
                            onValueChange={(value) => {
                              setCoursesPerPage(Number(value));
                              setCurrentPage(1);
                            }}
                          >
                            <SelectTrigger className="w-20">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="9">9</SelectItem>
                              <SelectItem value="18">18</SelectItem>
                              <SelectItem value="36">36</SelectItem>
                              <SelectItem value="72">72</SelectItem>
                            </SelectContent>
                          </Select>
                          <span className="text-sm text-gray-600">
                            per page
                          </span>
                        </div>

                        {/* Jump to Page */}
                        <div className="flex items-center space-x-2">
                          <Label className="text-sm">Go to page:</Label>
                          <Input
                            type="number"
                            min="1"
                            max={Math.ceil(
                              sortedCourses.length / coursesPerPage
                            )}
                            value={currentPage}
                            onChange={(e) => {
                              const page = Number(e.target.value);
                              if (
                                page >= 1 &&
                                page <=
                                  Math.ceil(
                                    sortedCourses.length / coursesPerPage
                                  )
                              ) {
                                setCurrentPage(page);
                              }
                            }}
                            className="w-16 text-center"
                          />
                        </div>
                      </div>

                      <div className="text-sm text-gray-600">
                        Showing {(currentPage - 1) * coursesPerPage + 1} to{" "}
                        {Math.min(
                          currentPage * coursesPerPage,
                          sortedCourses.length
                        )}{" "}
                        of {sortedCourses.length} courses
                      </div>
                    </div>

                    {/* Smart Pagination Controls */}
                    <div className="flex items-center justify-center space-x-2">
                      {/* First Page */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(1)}
                        disabled={currentPage === 1}
                      >
                        First
                      </Button>

                      {/* Previous */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setCurrentPage(Math.max(1, currentPage - 1))
                        }
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Button>

                      {/* Smart Page Numbers - Simplified */}
                      <div className="flex items-center space-x-1">
                        {(() => {
                          const totalPages = Math.ceil(
                            sortedCourses.length / coursesPerPage
                          );
                          const pages = [];

                          if (totalPages <= 7) {
                            // Show all pages if 7 or fewer: [1] [2] [3] [4] [5] [6] [7]
                            for (let i = 1; i <= totalPages; i++) {
                              pages.push(i);
                            }
                          } else {
                            // Always show first page
                            pages.push(1);

                            // Add ellipsis if current page is far from start
                            if (currentPage > 3) {
                              pages.push("...");
                            }

                            // Show current page and neighbors
                            const start = Math.max(2, currentPage - 1);
                            const end = Math.min(
                              totalPages - 1,
                              currentPage + 1
                            );

                            for (let i = start; i <= end; i++) {
                              if (i !== 1 && i !== totalPages) {
                                pages.push(i);
                              }
                            }

                            // Add ellipsis if current page is far from end
                            if (currentPage < totalPages - 2) {
                              pages.push("...");
                            }

                            // Always show last page (if more than 1 page total)
                            if (totalPages > 1) {
                              pages.push(totalPages);
                            }
                          }

                          return pages.map((page, index) => (
                            <div key={index}>
                              {page === "..." ? (
                                <span className="px-3 py-2 text-gray-400">
                                  ...
                                </span>
                              ) : (
                                <Button
                                  variant={
                                    currentPage === page ? "default" : "outline"
                                  }
                                  size="sm"
                                  onClick={() => setCurrentPage(page as number)}
                                  className={`w-10 h-10 ${
                                    currentPage === page
                                      ? "bg-blue-600 text-white"
                                      : ""
                                  }`}
                                >
                                  {page}
                                </Button>
                              )}
                            </div>
                          ));
                        })()}
                      </div>

                      {/* Next */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setCurrentPage(
                            Math.min(
                              Math.ceil(sortedCourses.length / coursesPerPage),
                              currentPage + 1
                            )
                          )
                        }
                        disabled={
                          currentPage ===
                          Math.ceil(sortedCourses.length / coursesPerPage)
                        }
                      >
                        Next
                      </Button>

                      {/* Last Page */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setCurrentPage(
                            Math.ceil(sortedCourses.length / coursesPerPage)
                          )
                        }
                        disabled={
                          currentPage ===
                          Math.ceil(sortedCourses.length / coursesPerPage)
                        }
                      >
                        Last
                      </Button>
                    </div>
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
