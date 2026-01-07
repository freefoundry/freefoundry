"use client";

import React, { useState, useEffect } from "react";
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
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination } from "@/components/pagination/Pagination";
import { currencySymbols } from "@/lib/currency";

type Course = {
  id: number;
  title: string;
  platform: string;
  instructor: {
    name: string;
    profileUrl?: string;
    avatarUrl?: string;
  };
  rating: number;
  students: number;
  duration: string;
  level: string;
  category: string;
  tags: string[];
  price: string;
  originalPrice: string;
  expiryDate?: string | null;
  image: string;
  description: string;
  isPopular?: boolean;
  isNew?: boolean;
  isTrending?: boolean;
};

export default function CoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [totalCourses, setTotalCourses] = useState(0);
  const [loading, setLoading] = useState(false);

  // UI state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedDuration, setSelectedDuration] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage, setCoursesPerPage] = useState(9);
  // Define all filter options statically (full list you want in UI)
  const allPlatforms = ["Udemy", "Coursera", "edX", "Pluralsight"];
  const allCategories = [
    "Programming",
    "Web Development",
    "Data Science",
    "Machine Learning",
    "Design",
    "Backend Development",
    "Cloud Computing",
    "Mobile Development",
    "Cybersecurity",
    "Database",
    "Blockchain",
    "Marketing",
    "Game Development",
    "Analytics",
    "Operating Systems",
    "Artificial Intelligence",
    "Version Control",
  ];
  const allLevels = ["Beginner", "Intermediate", "Advanced"];
  const platformNames: Record<string, string> = {
    udemy: "Udemy",
    coursera: "Coursera",
    edx: "edX",
    pluralsight: "Pluralsight",
    skillshare: "Skillshare",
    linkedin: "LinkedIn Learning",
    codecademy: "Codecademy",
    freecodecamp: "freeCodeCamp",
    "khan-academy": "Khan Academy",
    youtube: "YouTube",
    default: "Other",
  };

  // Fetch courses
  const fetchCourses = async () => {
    setLoading(true);

    try {
      const body = {
        page: currentPage,
        limit: coursesPerPage,
        search: searchTerm || undefined,
        platforms: selectedPlatforms,
        categories: selectedCategories,
        levels: selectedLevels,
        sort: sortBy,
        duration: selectedDuration || undefined,
      };

      const res = await fetch("/api/courses/public", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      const normalized = (data.data || []).map((c: any) => ({
        ...c,
        // Ensure tags is always an array
        tags: typeof c.tags === "string" ? JSON.parse(c.tags) : c.tags || [],
        requirements:
          typeof c.requirements === "string"
            ? JSON.parse(c.requirements)
            : c.requirements || [],
        outcomes:
          typeof c.outcomes === "string"
            ? JSON.parse(c.outcomes)
            : c.outcomes || [],
        instructor:
          typeof c.instructor === "string"
            ? JSON.parse(c.instructor)
            : c.instructor || {},

        platform:
          platformNames[c.platform?.toLowerCase()] || platformNames.default,
      }));
      setCourses(normalized);
      setTotalCourses(data.pagination?.total || 0);
    } catch (err) {
      console.error("❌ Failed to fetch courses:", err);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchCourses();
  }, [
    searchTerm,
    selectedPlatforms,
    selectedCategories,
    selectedLevels,
    selectedDuration,
    sortBy,
    currentPage,
    coursesPerPage,
  ]);

  // Build filter options dynamically
  const platforms = [...new Set(courses.map((c) => c.platform))];
  const categories = [...new Set(courses.map((c) => c.category))];
  const levels = [...new Set(courses.map((c) => c.level))];

  const handlePlatformChange = (platform: string, checked: boolean) => {
    setSelectedPlatforms((prev) =>
      checked ? [...prev, platform] : prev.filter((p) => p !== platform)
    );
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    setSelectedCategories((prev) =>
      checked ? [...prev, category] : prev.filter((c) => c !== category)
    );
  };

  const handleLevelChange = (level: string, checked: boolean) => {
    setSelectedLevels((prev) =>
      checked ? [...prev, level] : prev.filter((l) => l !== level)
    );
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
  const platformColors: Record<string, string> = {
    Udemy: "text-purple-600",
    Coursera: "text-blue-600",
    edX: "text-red-600",
    Pluralsight: "text-orange-600",
    Skillshare: "text-green-600",
    "LinkedIn Learning": "text-sky-600",
    Codecademy: "text-indigo-600",
    freeCodeCamp: "text-emerald-600",
    "Khan Academy": "text-teal-600",
    YouTube: "text-rose-600",
    Other: "text-gray-600", // fallback if platform not in list
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showSearch type="courses" />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Free Courses</h1>
          <p className="text-gray-600">
            Discover {totalCourses} curated free courses from top platforms like
            Udemy and Coursera
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
                      {allPlatforms.map((platform) => (
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
                      {allCategories.map((category) => (
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
                      {allLevels.map((level) => (
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
                  Showing {courses.length} of {totalCourses} courses
                </p>
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

            {/* Course Grid */}
            {loading ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(coursesPerPage)].map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <Skeleton className="w-full h-48" />
                    <CardContent className="p-5 space-y-3">
                      <Skeleton className="h-6 w-3/4" /> {/* Title */}
                      <Skeleton className="h-4 w-1/2" /> {/* Instructor */}
                      <Skeleton className="h-4 w-full" /> {/* Description */}
                      <div className="flex gap-3">
                        <Skeleton className="h-4 w-12" />
                        <Skeleton className="h-4 w-12" />
                        <Skeleton className="h-4 w-12" />
                      </div>
                      <Skeleton className="h-6 w-24" /> {/* Button */}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : courses.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No courses found
                </h3>
                <Button onClick={clearAllFilters} variant="outline">
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {courses.map((course) => {
                    const isExpired =
                      course.expiryDate &&
                      new Date(course.expiryDate) < new Date();

                    return (
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

                          {/* Status Badges */}
                          <div className="absolute top-3 left-3 flex gap-2">
                            {course.isPopular === 1 && (
                              <Badge className="bg-blue-600">Popular</Badge>
                            )}
                            {course.isNew === 1 && (
                              <Badge className="bg-green-600">New</Badge>
                            )}
                            {course.isTrending === 1 && (
                              <Badge className="bg-purple-600">Trending</Badge>
                            )}
                          </div>

                          {/* Platform */}
                          {course.platform && (
                            <div className="absolute top-3 right-3 bg-white rounded px-2 py-1">
                              <span
                                className={`text-xs font-medium ${
                                  platformColors[course.platform] ||
                                  platformColors.default
                                }`}
                              >
                                {course.platform}
                              </span>
                            </div>
                          )}
                        </div>

                        <CardContent className="p-5">
                          <h3 className="font-semibold text-lg mb-1 line-clamp-2">
                            {course.title}
                          </h3>

                          <p className="text-sm text-gray-600 mb-2">
                            by {course.instructor?.name}
                          </p>

                          <p
                            className="text-gray-600 text-sm mb-4 line-clamp-2"
                            dangerouslySetInnerHTML={{
                              __html: course.description,
                            }}
                          ></p>

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
                            {course.tags.slice(0, 3).map((tag: string) => (
                              <Badge
                                key={tag}
                                variant="outline"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          {/* PRICE + EXPIRY */}
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="font-semibold text-green-600">
                                {Number(course.price) === 0 ? (
                                  "Free"
                                ) : (
                                  <>
                                    {currencySymbols[course.currency] ||
                                      course.currency}{" "}
                                    {Number(course.price).toLocaleString()}
                                  </>
                                )}
                              </span>

                              {Number(course.originalPrice) > 0 &&
                                Number(course.price) > 0 && (
                                  <span className="text-xs text-gray-500 line-through ml-2">
                                    {currencySymbols[course.currency] ||
                                      course.currency}{" "}
                                    {Number(
                                      course.originalPrice
                                    ).toLocaleString()}
                                  </span>
                                )}

                              {course.expiryDate && (
                                <p
                                  className={`text-xs mt-1 ${
                                    isExpired
                                      ? "text-red-600 font-semibold"
                                      : "text-orange-600"
                                  }`}
                                >
                                  {isExpired
                                    ? "Expired"
                                    : `Until ${new Date(
                                        course.expiryDate
                                      ).toLocaleDateString()}`}
                                </p>
                              )}
                            </div>

                            <Link href={`/courses/${course.id}`}>
                              <Button size="sm">View Course</Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {totalCourses > coursesPerPage && (
                  <Pagination
                    total={totalCourses}
                    perPage={coursesPerPage}
                    page={currentPage}
                    onPageChange={(p) => setCurrentPage(p)}
                    showSizer
                    onPerPageChange={(n) => setCoursesPerPage(n)}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
