"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Copy,
  Trash2,
  Star,
  Download,
  Upload,
  FileText,
  Calendar,
  Users,
  TrendingUp,
  Globe,
} from "lucide-react";
import Link from "next/link";

// Mock data for resources
const mockResources = [
  {
    id: 1,
    title: "Complete React Developer Guide 2024",
    type: "Guide",
    category: "Web Development",
    author: "John Smith",
    downloads: 1250,
    rating: 4.8,
    status: "published",
    featured: true,
    createdAt: "2024-01-15",
    tags: ["React", "JavaScript", "Frontend"],
  },
  {
    id: 2,
    title: "Python Data Science Cheat Sheet",
    type: "Cheat Sheet",
    category: "Data Science",
    author: "Sarah Johnson",
    downloads: 890,
    rating: 4.6,
    status: "published",
    featured: false,
    createdAt: "2024-01-12",
    tags: ["Python", "Data Science", "ML"],
  },
  {
    id: 3,
    title: "UI/UX Design Principles Template",
    type: "Template",
    category: "Design",
    author: "Mike Chen",
    downloads: 567,
    rating: 4.9,
    status: "draft",
    featured: true,
    createdAt: "2024-01-10",
    tags: ["Design", "UI", "UX"],
  },
  {
    id: 4,
    title: "JavaScript Interview Questions",
    type: "eBook",
    category: "Programming",
    author: "Lisa Wang",
    downloads: 2100,
    rating: 4.7,
    status: "published",
    featured: false,
    createdAt: "2024-01-08",
    tags: ["JavaScript", "Interview", "Career"],
  },
  {
    id: 5,
    title: "Docker Deployment Checklist",
    type: "Checklist",
    category: "DevOps",
    author: "Alex Rodriguez",
    downloads: 445,
    rating: 4.5,
    status: "published",
    featured: false,
    createdAt: "2024-01-05",
    tags: ["Docker", "DevOps", "Deployment"],
  },
];

export default function ResourcesAdminPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedResources, setSelectedResources] = useState<number[]>([]);

  // Filter and sort resources
  const filteredResources = mockResources
    .filter((resource) => {
      const matchesSearch =
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType =
        selectedType === "all" || resource.type.toLowerCase() === selectedType;
      const matchesCategory =
        selectedCategory === "all" ||
        resource.category.toLowerCase().replace(/\s+/g, "-") ===
          selectedCategory;
      const matchesStatus =
        selectedStatus === "all" || resource.status === selectedStatus;

      return matchesSearch && matchesType && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "oldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case "title":
          return a.title.localeCompare(b.title);
        case "downloads":
          return b.downloads - a.downloads;
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedResources(filteredResources.map((resource) => resource.id));
    } else {
      setSelectedResources([]);
    }
  };

  const handleSelectResource = (resourceId: number, checked: boolean) => {
    if (checked) {
      setSelectedResources([...selectedResources, resourceId]);
    } else {
      setSelectedResources(selectedResources.filter((id) => id !== resourceId));
    }
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action} on resources:`, selectedResources);
    // Here you would implement the actual bulk actions
    setSelectedResources([]);
  };

  // Calculate statistics
  const totalResources = mockResources.length;
  const publishedResources = mockResources.filter(
    (r) => r.status === "published"
  ).length;
  const featuredResources = mockResources.filter((r) => r.featured).length;
  const totalDownloads = mockResources.reduce((sum, r) => sum + r.downloads, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl sm:text-2xl font-bold">Resources</h1>
              <Badge variant="secondary" className="hidden sm:inline-flex">
                {totalResources} total
              </Badge>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Link href="/admin/resources/new">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Resource
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Resources
                    </p>
                    <p className="text-2xl font-bold">{totalResources}</p>
                  </div>
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Published
                    </p>
                    <p className="text-2xl font-bold">{publishedResources}</p>
                  </div>
                  <Globe className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Featured
                    </p>
                    <p className="text-2xl font-bold">{featuredResources}</p>
                  </div>
                  <Star className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Downloads
                    </p>
                    <p className="text-2xl font-bold">
                      {totalDownloads.toLocaleString()}
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search resources, authors, categories..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="guide">Guide</SelectItem>
                      <SelectItem value="ebook">eBook</SelectItem>
                      <SelectItem value="template">Template</SelectItem>
                      <SelectItem value="cheat sheet">Cheat Sheet</SelectItem>
                      <SelectItem value="checklist">Checklist</SelectItem>
                      <SelectItem value="tool">Tool</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="web-development">
                        Web Development
                      </SelectItem>
                      <SelectItem value="data-science">Data Science</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="programming">Programming</SelectItem>
                      <SelectItem value="devops">DevOps</SelectItem>
                      <SelectItem value="mobile">Mobile</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={selectedStatus}
                    onValueChange={setSelectedStatus}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="oldest">Oldest</SelectItem>
                      <SelectItem value="title">Title A-Z</SelectItem>
                      <SelectItem value="downloads">Downloads</SelectItem>
                      <SelectItem value="rating">Rating</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bulk Actions */}
          {selectedResources.length > 0 && (
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {selectedResources.length} resource
                    {selectedResources.length !== 1 ? "s" : ""} selected
                  </span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleBulkAction("feature")}
                    >
                      <Star className="h-4 w-4 mr-1" />
                      Feature
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleBulkAction("publish")}
                    >
                      <Globe className="h-4 w-4 mr-1" />
                      Publish
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleBulkAction("delete")}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Resources Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={
                          selectedResources.length ===
                            filteredResources.length &&
                          filteredResources.length > 0
                        }
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead>Resource</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Downloads</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredResources.map((resource) => (
                    <TableRow key={resource.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedResources.includes(resource.id)}
                          onCheckedChange={(checked) =>
                            handleSelectResource(
                              resource.id,
                              checked as boolean
                            )
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium">{resource.title}</h3>
                            {resource.featured && (
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            )}
                          </div>
                          <div className="flex items-center space-x-1">
                            <Badge variant="outline" className="text-xs">
                              {resource.category}
                            </Badge>
                            {resource.tags.slice(0, 2).map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                            {resource.tags.length > 2 && (
                              <span className="text-xs text-gray-500">
                                +{resource.tags.length - 2} more
                              </span>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{resource.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                            <Users className="h-3 w-3 text-gray-600" />
                          </div>
                          <span className="text-sm">{resource.author}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Download className="h-4 w-4 text-gray-400" />
                          <span>{resource.downloads.toLocaleString()}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span>{resource.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            resource.status === "published"
                              ? "default"
                              : resource.status === "draft"
                              ? "secondary"
                              : "outline"
                          }
                          className={
                            resource.status === "published"
                              ? "bg-green-100 text-green-800"
                              : ""
                          }
                        >
                          {resource.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {new Date(resource.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="h-4 w-4 mr-2" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Star className="h-4 w-4 mr-2" />
                              {resource.featured ? "Unfeature" : "Feature"}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {filteredResources.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No resources found
                </h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm ||
                  selectedType !== "all" ||
                  selectedCategory !== "all" ||
                  selectedStatus !== "all"
                    ? "Try adjusting your search or filters"
                    : "Get started by creating your first resource"}
                </p>
                <Link href="/admin/resources/new">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Resource
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
