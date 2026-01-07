"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
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
} from "lucide-react";
import { Header } from "@/components/layout/Header";
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
import type { Resource } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination } from "@/components/pagination/Pagination";

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [totalResources, setTotalResources] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [resourcesPerPage] = useState(9);

  // Fetch resources
  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);

      try {
        const body = {
          page: currentPage,
          limit: resourcesPerPage,
          search: searchTerm || undefined,
          categories: selectedCategories,
          types: selectedTypes,
          sort: sortBy,
        };

        const res = await fetch("/api/resources/public", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        if (!res.ok) throw new Error("Failed to load resources");
        const data = await res.json();

        //  Normalize resource fields if backend returns stringified arrays
        const normalized = (data.data || []).map((r: any) => ({
          ...r,
          tags: typeof r.tags === "string" ? JSON.parse(r.tags) : r.tags || [],
          category:
            typeof r.category === "string"
              ? r.category
              : r.category || "General",
          type: typeof r.type === "string" ? r.type : "Website",
        }));

        setResources(normalized);
        setTotalResources(data.pagination?.total || 0);
      } catch (err: any) {
        console.error("❌ Failed to fetch resources:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [
    searchTerm,
    selectedCategories,
    selectedTypes,
    sortBy,
    currentPage,
    resourcesPerPage,
  ]);

  const handleCategoryChange = (category: string, checked: boolean) => {
    setSelectedCategories((prev) =>
      checked ? [...prev, category] : prev.filter((c) => c !== category)
    );
  };

  const handleTypeChange = (type: string, checked: boolean) => {
    setSelectedTypes((prev) =>
      checked ? [...prev, type] : prev.filter((t) => t !== type)
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedTypes([]);
    setSearchTerm("");
  };

  const activeFiltersCount = selectedCategories.length + selectedTypes.length;

  const getResourceIcon = (type: string) => {
    switch (type?.toLowerCase()) {
      case "website":
        return <Globe className="h-4 w-4" />;
      case "tool":
        return <PenTool className="h-4 w-4" />;
      case "pdf":
        return <FileText className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  // Extract unique categories/types from loaded data
  // Static filter options (random but relevant)
  const categories = [
    "Learning Platform",
    "Documentation",
    "Study Material",
    "Design Tool",
    "Career Tool",
    "Developer Resource",
    "Community",
    "Tech Blog",
    "Academic Tool",
    "Programming Guide",
    "Template",
    "AI Tool",
    "Database",
  ];

  const types = [
    "Website",
    "Tool",
    "PDF",
    "Template",
    "Guide",
    "Course",
    "Video",
    "App",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showSearch type="resources" />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Learning Resources</h1>
        <p className="text-gray-600 mb-8">
          Discover {resources.length} curated learning resources
        </p>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters */}
          <div className="lg:w-80">
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

            <div
              className={`space-y-6 ${
                showFilters ? "block" : "hidden lg:block"
              }`}
            >
              <Card>
                <CardContent className="p-6">
                  {/* Search */}
                  <div className="mb-6">
                    <Label htmlFor="search">Search Resources</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="search"
                        placeholder="Search by title or tag..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Category */}
                  <div className="mb-6">
                    <Label>Category</Label>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div
                          key={category}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={(checked) =>
                              handleCategoryChange(category, checked as boolean)
                            }
                          />
                          <Label>{category}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Type */}
                  <div className="mb-6">
                    <Label>Type</Label>
                    <div className="space-y-2">
                      {types.map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox
                            checked={selectedTypes.includes(type)}
                            onCheckedChange={(checked) =>
                              handleTypeChange(type, checked as boolean)
                            }
                          />
                          <Label className="flex items-center">
                            {getResourceIcon(type)}
                            <span className="ml-2">{type}</span>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

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

          {/* Main grid */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
              <p className="text-gray-600">
                Showing {totalResources} resources
              </p>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="featured">Featured</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {loading ? (
              <ResourcesSkeletonGrid count={resourcesPerPage} />
            ) : resources.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No resources found</p>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {resources.map((r) => (
                    <Card
                      key={r._id}
                      className="overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      {/* Resource content here */}
                      <div className="relative">
                        <img
                          src={r.featuredImage || "/placeholder.svg"}
                          alt={r.title}
                          className="w-full h-48 object-cover"
                        />
                        {r.isFeatured && (
                          <Badge className="absolute top-3 left-3 bg-blue-600">
                            Featured
                          </Badge>
                        )}
                      </div>

                      <CardContent className="p-5">
                        <h3 className="font-semibold text-lg mb-1 line-clamp-1">
                          {r.title}
                        </h3>
                        <p className="text-sm text-blue-600 mb-2">
                          {r.category}
                        </p>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {r.excerpt || r.content}
                        </p>

                        <div className="flex flex-wrap gap-1 mb-4">
                          {r.tags?.slice(0, 3).map((tag) => (
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
                            {new Date(r.createdAt || "").toLocaleDateString()}
                          </div>
                          <Button size="sm" asChild>
                            <Link href={`/resources/${r.slug || r._id}`}>
                              <ExternalLink className="h-3 w-3 mr-1" /> View
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Pagination */}
                {totalResources > resourcesPerPage && (
                  <div className="mt-6">
                    <Pagination
                      total={totalResources}
                      perPage={resourcesPerPage}
                      page={currentPage}
                      onPageChange={(page) => setCurrentPage(page)}
                    />
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

function ResourcesSkeletonGrid({ count }: { count: number }) {
  return (
    <div className="space-y-4 gap-6 grid md:grid-cols-2 xl:grid-cols-3">
      {[...Array(count)].map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <CardContent className="p-6 space-y-3">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-8 w-32" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
