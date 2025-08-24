"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BookOpen,
  Search,
  ExternalLink,
  FileText,
  PenTool,
  Globe,
  Download,
  ChevronDown,
  X,
  SlidersHorizontal,
  Star,
  Calendar,
  Tag,
} from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/layout/Header"

// Mock resources data
const resources = [
  {
    id: 1,
    title: "freeCodeCamp",
    description: "Learn to code for free with interactive coding lessons, projects, and certifications.",
    category: "Learning Platform",
    type: "Website",
    url: "https://freecodecamp.org",
    tags: ["Programming", "Web Development", "Certifications"],
    rating: 4.8,
    featured: true,
    dateAdded: "2024-01-15",
    image: "/placeholder.svg?height=200&width=300&text=freeCodeCamp",
  },
  {
    id: 2,
    title: "MDN Web Docs",
    description: "Comprehensive documentation for web technologies including HTML, CSS, and JavaScript.",
    category: "Documentation",
    type: "Website",
    url: "https://developer.mozilla.org",
    tags: ["HTML", "CSS", "JavaScript", "Web APIs"],
    rating: 4.9,
    featured: true,
    dateAdded: "2024-01-10",
    image: "/placeholder.svg?height=200&width=300&text=MDN+Web+Docs",
  },
  {
    id: 3,
    title: "GPA Calculator",
    description: "Calculate your GPA easily with support for different grading systems and credit hours.",
    category: "Academic Tool",
    type: "Tool",
    url: "#",
    tags: ["GPA", "Academic", "Calculator"],
    rating: 4.5,
    featured: false,
    dateAdded: "2024-01-20",
    image: "/placeholder.svg?height=200&width=300&text=GPA+Calculator",
  },
  {
    id: 4,
    title: "WAEC Past Questions",
    description: "Collection of past WAEC examination questions and answers for all subjects.",
    category: "Study Material",
    type: "PDF",
    url: "#",
    tags: ["WAEC", "Past Questions", "Exam Prep"],
    rating: 4.6,
    featured: false,
    dateAdded: "2024-01-18",
    image: "/placeholder.svg?height=200&width=300&text=WAEC+Past+Questions",
  },
  {
    id: 5,
    title: "CSS-Tricks",
    description: "Daily articles about CSS, HTML, JavaScript, and all things related to web design and development.",
    category: "Tech Blog",
    type: "Website",
    url: "https://css-tricks.com",
    tags: ["CSS", "Web Design", "Frontend"],
    rating: 4.7,
    featured: true,
    dateAdded: "2024-01-12",
    image: "/placeholder.svg?height=200&width=300&text=CSS+Tricks",
  },
  {
    id: 6,
    title: "Resume Builder",
    description: "Create professional resumes with customizable templates and export to PDF.",
    category: "Career Tool",
    type: "Tool",
    url: "#",
    tags: ["Resume", "Career", "Job Search"],
    rating: 4.4,
    featured: false,
    dateAdded: "2024-01-22",
    image: "/placeholder.svg?height=200&width=300&text=Resume+Builder",
  },
  {
    id: 7,
    title: "JAMB Past Questions",
    description: "Comprehensive collection of JAMB UTME past questions with detailed solutions.",
    category: "Study Material",
    type: "PDF",
    url: "#",
    tags: ["JAMB", "UTME", "University Entrance"],
    rating: 4.5,
    featured: false,
    dateAdded: "2024-01-16",
    image: "/placeholder.svg?height=200&width=300&text=JAMB+Past+Questions",
  },
  {
    id: 8,
    title: "Dev.to",
    description: "Community of software developers sharing knowledge through articles and discussions.",
    category: "Tech Blog",
    type: "Website",
    url: "https://dev.to",
    tags: ["Programming", "Community", "Articles"],
    rating: 4.6,
    featured: true,
    dateAdded: "2024-01-14",
    image: "/placeholder.svg?height=200&width=300&text=Dev.to",
  },
  {
    id: 9,
    title: "Khan Academy",
    description: "Free online courses, lessons and practice in math, science, and more.",
    category: "Learning Platform",
    type: "Website",
    url: "https://khanacademy.org",
    tags: ["Math", "Science", "Education"],
    rating: 4.8,
    featured: true,
    dateAdded: "2024-01-11",
    image: "/placeholder.svg?height=200&width=300&text=Khan+Academy",
  },
  {
    id: 10,
    title: "GitHub Student Pack",
    description: "Free developer tools and resources for students including hosting, domains, and more.",
    category: "Developer Resource",
    type: "Website",
    url: "https://education.github.com/pack",
    tags: ["GitHub", "Student", "Developer Tools"],
    rating: 4.9,
    featured: true,
    dateAdded: "2024-01-13",
    image: "/placeholder.svg?height=200&width=300&text=GitHub+Student+Pack",
  },
  {
    id: 11,
    title: "Codecademy",
    description: "Interactive coding lessons and projects to learn programming languages.",
    category: "Learning Platform",
    type: "Website",
    url: "https://codecademy.com",
    tags: ["Programming", "Interactive", "Coding"],
    rating: 4.5,
    featured: false,
    dateAdded: "2024-01-17",
    image: "/placeholder.svg?height=200&width=300&text=Codecademy",
  },
  {
    id: 12,
    title: "Figma",
    description: "Collaborative interface design tool with free tier for students and small teams.",
    category: "Design Tool",
    type: "Tool",
    url: "https://figma.com",
    tags: ["Design", "UI/UX", "Collaboration"],
    rating: 4.8,
    featured: true,
    dateAdded: "2024-01-19",
    image: "/placeholder.svg?height=200&width=300&text=Figma",
  },
  {
    id: 13,
    title: "Stack Overflow",
    description: "Q&A platform for programmers to ask questions and share knowledge.",
    category: "Community",
    type: "Website",
    url: "https://stackoverflow.com",
    tags: ["Programming", "Q&A", "Community"],
    rating: 4.7,
    featured: false,
    dateAdded: "2024-01-21",
    image: "/placeholder.svg?height=200&width=300&text=Stack+Overflow",
  },
  {
    id: 14,
    title: "Canva",
    description: "Free graphic design platform with templates for presentations, social media, and more.",
    category: "Design Tool",
    type: "Tool",
    url: "https://canva.com",
    tags: ["Graphic Design", "Templates", "Social Media"],
    rating: 4.6,
    featured: false,
    dateAdded: "2024-01-23",
    image: "/placeholder.svg?height=200&width=300&text=Canva",
  },
  {
    id: 15,
    title: "Coursera",
    description: "Online courses from top universities and companies with free audit options.",
    category: "Learning Platform",
    type: "Website",
    url: "https://coursera.org",
    tags: ["University Courses", "Certificates", "MOOCs"],
    rating: 4.7,
    featured: true,
    dateAdded: "2024-01-24",
    image: "/placeholder.svg?height=200&width=300&text=Coursera",
  },
]

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("featured")
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [resourcesPerPage] = useState(12)

  // Reset pagination when filters change
  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedCategories, selectedTypes, sortBy])

  // Get unique values for filters
  const categories = [...new Set(resources.map((resource) => resource.category))]
  const types = [...new Set(resources.map((resource) => resource.type))]

  // Filter resources based on selected filters
  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(resource.category)
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(resource.type)

    return matchesSearch && matchesCategory && matchesType
  })

  // Sort resources
  const sortedResources = [...filteredResources].sort((a, b) => {
    switch (sortBy) {
      case "featured":
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.rating - a.rating
      case "rating":
        return b.rating - a.rating
      case "newest":
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
      case "alphabetical":
        return a.title.localeCompare(b.title)
      default:
        return 0
    }
  })

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category])
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    }
  }

  const handleTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setSelectedTypes([...selectedTypes, type])
    } else {
      setSelectedTypes(selectedTypes.filter((t) => t !== type))
    }
  }

  const clearAllFilters = () => {
    setSelectedCategories([])
    setSelectedTypes([])
    setSearchTerm("")
  }

  const activeFiltersCount = selectedCategories.length + selectedTypes.length

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "Website":
        return <Globe className="h-4 w-4" />
      case "Tool":
        return <PenTool className="h-4 w-4" />
      case "PDF":
        return <FileText className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header showSearch />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Learning Resources</h1>
          <p className="text-gray-600">
            Discover {resources.length} curated learning resources including
            tools, documentation, study materials, and more
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
                      Search Resources
                    </Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="search"
                        placeholder="Search by title, description, or tags..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
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

                  {/* Type Filter */}
                  <div className="mb-6">
                    <Label className="text-sm font-medium mb-3 block">
                      Type
                    </Label>
                    <div className="space-y-2">
                      {types.map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox
                            id={`type-${type}`}
                            checked={selectedTypes.includes(type)}
                            onCheckedChange={(checked) =>
                              handleTypeChange(type, checked as boolean)
                            }
                          />
                          <Label
                            htmlFor={`type-${type}`}
                            className="text-sm flex items-center"
                          >
                            {getResourceIcon(type)}
                            <span className="ml-2">{type}</span>
                          </Label>
                        </div>
                      ))}
                    </div>
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
                  Showing {sortedResources.length} of {resources.length}{" "}
                  resources
                </p>
                {activeFiltersCount > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
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
                    {selectedTypes.map((type) => (
                      <Badge key={type} variant="secondary" className="text-xs">
                        {type}
                        <button
                          onClick={() => handleTypeChange(type, false)}
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
                  <SelectItem value="featured">Featured First</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="alphabetical">Alphabetical</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Resources Grid */}
            {sortedResources.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No resources found
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
                  {sortedResources
                    .slice(
                      (currentPage - 1) * resourcesPerPage,
                      currentPage * resourcesPerPage
                    )
                    .map((resource) => (
                      <Card
                        key={resource.id}
                        className="overflow-hidden hover:shadow-lg transition-shadow"
                      >
                        <div className="relative">
                          <img
                            src={resource.image || "/placeholder.svg"}
                            alt={resource.title}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute top-3 left-3 flex gap-2">
                            {resource.featured && (
                              <Badge className="bg-blue-600">Featured</Badge>
                            )}
                            <Badge
                              variant="secondary"
                              className="bg-white text-gray-700"
                            >
                              {getResourceIcon(resource.type)}
                              <span className="ml-1">{resource.type}</span>
                            </Badge>
                          </div>
                          <div className="absolute top-3 right-3 bg-white rounded-full p-2">
                            <div className="flex items-center">
                              <Star className="h-3 w-3 text-yellow-400 fill-current" />
                              <span className="text-xs font-medium ml-1">
                                {resource.rating}
                              </span>
                            </div>
                          </div>
                        </div>

                        <CardContent className="p-5">
                          <div className="mb-3">
                            <h3 className="font-semibold text-lg mb-1 line-clamp-1">
                              {resource.title}
                            </h3>
                            <p className="text-sm text-blue-600">
                              {resource.category}
                            </p>
                          </div>

                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {resource.description}
                          </p>

                          <div className="flex flex-wrap gap-1 mb-4">
                            {resource.tags.slice(0, 3).map((tag) => (
                              <Badge
                                key={tag}
                                variant="outline"
                                className="text-xs"
                              >
                                <Tag className="h-2 w-2 mr-1" />
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-xs text-gray-500">
                              <Calendar className="h-3 w-3 mr-1" />
                              {new Date(
                                resource.dateAdded
                              ).toLocaleDateString()}
                            </div>
                            <Button size="sm" className="flex items-center">
                              {resource.type === "PDF" ? (
                                <>
                                  <Download className="h-3 w-3 mr-1" />
                                  Download
                                </>
                              ) : (
                                <>
                                  <Link
                                    href={`/resources/${resource.id}`}
                                    passHref
                                    className="flex items-center"
                                  >
                                    <ExternalLink className="h-3 w-3 mr-1" />
                                    Visit
                                  </Link>
                                </>
                              )}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>

                {/* Pagination */}
                {Math.ceil(sortedResources.length / resourcesPerPage) > 1 && (
                  <div className="mt-12">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        Showing {(currentPage - 1) * resourcesPerPage + 1} to{" "}
                        {Math.min(
                          currentPage * resourcesPerPage,
                          sortedResources.length
                        )}{" "}
                        of {sortedResources.length} resources
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(1)}
                          disabled={currentPage === 1}
                        >
                          First
                        </Button>

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

                        <div className="flex items-center space-x-1">
                          {(() => {
                            const totalPages = Math.ceil(
                              sortedResources.length / resourcesPerPage
                            );
                            const pages = [];

                            if (totalPages <= 7) {
                              for (let i = 1; i <= totalPages; i++) {
                                pages.push(i);
                              }
                            } else {
                              pages.push(1);
                              if (currentPage > 3) pages.push("...");

                              const start = Math.max(2, currentPage - 1);
                              const end = Math.min(
                                totalPages - 1,
                                currentPage + 1
                              );

                              for (let i = start; i <= end; i++) {
                                if (i !== 1 && i !== totalPages) pages.push(i);
                              }

                              if (currentPage < totalPages - 2)
                                pages.push("...");
                              if (totalPages > 1) pages.push(totalPages);
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
                                      currentPage === page
                                        ? "default"
                                        : "outline"
                                    }
                                    size="sm"
                                    onClick={() =>
                                      setCurrentPage(page as number)
                                    }
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

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setCurrentPage(
                              Math.min(
                                Math.ceil(
                                  sortedResources.length / resourcesPerPage
                                ),
                                currentPage + 1
                              )
                            )
                          }
                          disabled={
                            currentPage ===
                            Math.ceil(sortedResources.length / resourcesPerPage)
                          }
                        >
                          Next
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setCurrentPage(
                              Math.ceil(
                                sortedResources.length / resourcesPerPage
                              )
                            )
                          }
                          disabled={
                            currentPage ===
                            Math.ceil(sortedResources.length / resourcesPerPage)
                          }
                        >
                          Last
                        </Button>
                      </div>
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
