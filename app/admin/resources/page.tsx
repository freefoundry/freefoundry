"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
  Trash2,
  Star,
  FileText,
  Calendar,
  Globe,
} from "lucide-react";

interface Resource {
  _id: string;
  slug: string;
  title: string;
  type: string;
  category: string;
  author: string;
  downloads?: number;
  rating?: number;
  status: string;
  isFeatured?: boolean;
  createdAt: string;
  tags?: string[];
}

export default function ResourcesAdminPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedResources, setSelectedResources] = useState<string[]>([]);

  //  Fetch resources from API
  useEffect(() => {
    fetchResources();
  }, []);

  async function fetchResources() {
    try {
      setLoading(true);
      const res = await fetch("/api/resources");
      if (!res.ok) throw new Error("Failed to load resources");
      const data = await res.json();
      setResources(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  //  Handle Delete
  async function handleDelete(id: string, title?: string) {
    const confirmed = confirm(
      `Are you sure you want to delete "${title || "this resource"}"?`
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/resources/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to delete resource");
      }

      //  Remove from state instantly
      setResources((prev) => prev.filter((r) => r._id !== id));
      alert(" Resource deleted successfully");
    } catch (err: any) {
      console.error("❌ Delete failed:", err);
      alert(`Failed to delete resource: ${err.message}`);
    }
  }

  //  Apply filters and sorting
  const filteredResources = resources
    .filter((resource) => {
      const matchesSearch =
        resource.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.category?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType =
        selectedType === "all" ||
        resource.type?.toLowerCase() === selectedType.toLowerCase();
      const matchesStatus =
        selectedStatus === "all" ||
        resource.status?.toLowerCase() === selectedStatus.toLowerCase();

      return matchesSearch && matchesType && matchesStatus;
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
        default:
          return 0;
      }
    });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedResources(filteredResources.map((r) => r._id));
    } else {
      setSelectedResources([]);
    }
  };

  const handleSelectResource = (id: string, checked: boolean) => {
    if (checked) setSelectedResources([...selectedResources, id]);
    else setSelectedResources(selectedResources.filter((r) => r !== id));
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading resources...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );

  const totalResources = resources.length;
  const publishedResources = resources.filter(
    (r) => r.status === "published"
  ).length;
  const featuredResources = resources.filter((r) => r.isFeatured).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-bold">Resources</h1>
          <Link href="/admin/resources/new">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Resource
            </Button>
          </Link>
        </div>
      </header>

      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold">{totalResources}</p>
              </div>
              <FileText className="h-6 w-6 text-blue-600" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Published</p>
                <p className="text-2xl font-bold">{publishedResources}</p>
              </div>
              <Globe className="h-6 w-6 text-green-600" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Featured</p>
                <p className="text-2xl font-bold">{featuredResources}</p>
              </div>
              <Star className="h-6 w-6 text-yellow-500" />
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4 flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by title, author, category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
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
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={
                        selectedResources.length === filteredResources.length &&
                        filteredResources.length > 0
                      }
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredResources.map((r) => (
                  <TableRow key={r._id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedResources.includes(r._id)}
                        onCheckedChange={(checked) =>
                          handleSelectResource(r._id, checked as boolean)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{r.title}</span>
                        {r.isFeatured && (
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{r.author || "—"}</TableCell>
                    <TableCell>{r.type || "—"}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          r.status === "published" ? "default" : "secondary"
                        }
                        className={
                          r.status === "published"
                            ? "bg-green-100 text-green-700"
                            : ""
                        }
                      >
                        {r.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(r.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <Link href={`/resources/${r.slug || r._id}`}>
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" /> View
                            </DropdownMenuItem>
                          </Link>
                          <Link href={`/admin/resources/${r._id}/edit`}>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" /> Edit
                            </DropdownMenuItem>
                          </Link>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDelete(r._id, r.title)}
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-2" /> Delete
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
            <CardContent className="p-8 text-center text-gray-500">
              <FileText className="h-10 w-10 mx-auto mb-2 text-gray-400" />
              No resources found
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
