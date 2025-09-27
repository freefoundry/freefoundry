"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Copy,
  BookOpen,
  Users,
  Star,
} from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export default function CoursesAdminPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Fetch real courses
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/courses");
      let data = await res.json();

      const normalized = (data || []).map((course: any) => ({
        ...course,
        instructor: course.instructor ? JSON.parse(course.instructor) : {},
        tags: course.tags ? JSON.parse(course.tags) : [],
        requirements: course.requirements
          ? JSON.parse(course.requirements)
          : [],
        outcomes: course.outcomes ? JSON.parse(course.outcomes) : [],
      }));

      setCourses(normalized);
    } catch (error) {
      console.error("❌ Failed to fetch courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this course?")) return;

    try {
      const res = await fetch(`/api/courses/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete course");

      // Update state without refetching everything
      setCourses((prev) => prev.filter((course) => course.id !== id));
    } catch (err: any) {
      console.error("❌ Delete failed:", err);
      alert("Error deleting course: " + err.message);
    }
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || course.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" || course.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Published
          </Badge>
        );
      case "draft":
        return <Badge variant="secondary">Draft</Badge>;
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Pending
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold flex items-center">
                <BookOpen className="h-6 w-6 mr-2" />
                Courses
              </h1>
              <div className="text-gray-600 mt-1">
                Manage your course content
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* 🔄 Sync Button */}
              <Button
                variant="outline"
                onClick={() => fetchCourses()}
                disabled={loading}
              >
                {loading ? "Syncing..." : "Sync"}
              </Button>

              {/* ➕ Add New Course */}
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link href="/admin/courses/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Course
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-600">
                    Total Courses
                  </div>
                  <div className="text-2xl font-bold">
                    {loading ? (
                      <Skeleton className="h-6 w-12" />
                    ) : (
                      courses.length
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Eye className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-600">
                    Published
                  </div>
                  <div className="text-2xl font-bold">
                    {loading ? (
                      <Skeleton className="h-6 w-12" />
                    ) : (
                      courses.filter((c) => c.status === "published").length
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Edit className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-600">
                    Drafts
                  </div>
                  <div className="text-2xl font-bold">
                    {loading ? (
                      <Skeleton className="h-6 w-12" />
                    ) : (
                      courses.filter((c) => c.status === "draft").length
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-600">
                    Total Students
                  </div>
                  <div className="text-2xl font-bold">
                    {loading ? (
                      <Skeleton className="h-6 w-16" />
                    ) : (
                      courses
                        .reduce(
                          (sum, course) => sum + (course.students || 0),
                          0
                        )
                        .toLocaleString()
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="programming">Programming</SelectItem>
                  <SelectItem value="web-development">
                    Web Development
                  </SelectItem>
                  <SelectItem value="data-science">Data Science</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Courses Table */}
        <Card>
          <CardHeader>
            <CardTitle>
              All Courses ({loading ? 0 : filteredCourses.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              {loading ? (
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Platform</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Students</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCourses.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{course.title}</div>
                            <div className="text-sm text-gray-500">
                              by {course.instructor?.name || "Unknown"}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(course.status)}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{course.platform}</Badge>
                        </TableCell>
                        <TableCell>{course.category}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 mr-1 fill-current" />
                            {course.rating}
                          </div>
                        </TableCell>
                        <TableCell>
                          {(course.students || 0).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium text-green-600">
                              {course.price}
                            </div>
                            <div className="text-xs text-gray-500 line-through">
                              {course.originalPrice}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>
                              {new Date(course.createdAt).toLocaleDateString()}
                            </div>
                            <div className="text-gray-500">
                              Modified:{" "}
                              {new Date(course.updatedAt).toLocaleDateString()}
                            </div>
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
                              <DropdownMenuItem asChild>
                                <Link href={`/admin/courses/${course.id}/edit`}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/courses/${course.id}`}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View
                                </Link>
                              </DropdownMenuItem>
                              {/* <DropdownMenuItem>
                                <Copy className="h-4 w-4 mr-2" />
                                Duplicate
                              </DropdownMenuItem> */}
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => handleDelete(course.id)}
                              >
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
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
