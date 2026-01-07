"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Filter,
  Download,
  Calendar,
  DollarSign,
  GraduationCap,
  MapPin,
  Users,
} from "lucide-react";
import Link from "next/link";
import type { Scholarship } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminScholarshipsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedScholarships, setSelectedScholarships] = useState<number[]>(
    []
  );
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  //  Fetch scholarships from API
  const fetchScholarships = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/scholarships");
      if (!res.ok) throw new Error("Failed to fetch scholarships");
      const data = await res.json();
      setScholarships(data || []);
    } catch (err: any) {
      console.error("❌ Failed to fetch scholarships:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScholarships();
  }, []);

  const getDeadlineStatus = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const daysUntilDeadline = Math.ceil(
      (deadlineDate.getTime() - today.getTime()) / (1000 * 3600 * 24)
    );

    if (daysUntilDeadline < 0)
      return {
        status: "expired",
        text: "Expired",
        color: "bg-red-100 text-red-800",
      };
    if (daysUntilDeadline <= 7)
      return {
        status: "urgent",
        text: "Urgent",
        color: "bg-orange-100 text-orange-800",
      };
    if (daysUntilDeadline <= 30)
      return {
        status: "soon",
        text: "Soon",
        color: "bg-yellow-100 text-yellow-800",
      };
    return {
      status: "normal",
      text: "Active",
      color: "bg-green-100 text-green-800",
    };
  };

  const filteredScholarships = scholarships.filter((s) => {
    const matchesSearch =
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || s.type === selectedType;
    const status = getDeadlineStatus(s.applicationDeadline).status;
    const matchesStatus = selectedStatus === "all" || status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleSelectAll = (checked: boolean) => {
    setSelectedScholarships(
      checked ? filteredScholarships.map((s) => s._id) : []
    );
  };

  const handleSelectScholarship = (id: number, checked: boolean) => {
    setSelectedScholarships((prev) =>
      checked ? [...prev, id] : prev.filter((x) => x !== id)
    );
  };

  const handleBulkAction = (action: string) => {
    console.log(`Performing ${action} on scholarships:`, selectedScholarships);
    setSelectedScholarships([]);
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-600 mb-3">Error: {error}</p>
        <Button onClick={fetchScholarships}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className=" px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Scholarships Management</h1>
            <p className="text-gray-600">
              Manage scholarship opportunities and applications
            </p>
          </div>
          <Button asChild>
            <Link href="/admin/scholarships/new">
              <Plus className="h-4 w-4 mr-2" /> Add Scholarship
            </Link>
          </Button>
        </div>

        {/* LOADING STATE */}
        {loading ? (
          <div className="space-y-6">
            {/* Skeleton for cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <Card key={`skeleton-card-${i}`}>
                  <CardContent className="p-6 space-y-3">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-16" />
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Skeleton for table */}
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {[...Array(8)].map((_, i) => (
                        <TableHead key={`skeleton-th-${i}`}>
                          <Skeleton className="h-4 w-full" />
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[...Array(5)].map((_, i) => (
                      <TableRow key={`skeleton-row-${i}`}>
                        {[...Array(8)].map((_, j) => (
                          <TableCell key={`skeleton-cell-${i}-${j}`}>
                            <Skeleton className="h-6 w-full" />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex justify-between items-center pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Scholarships
                  </CardTitle>
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {scholarships.length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +2 from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex justify-between items-center pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Applications
                  </CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {
                      scholarships.filter(
                        (s) =>
                          getDeadlineStatus(s.applicationDeadline).status !==
                          "expired"
                      ).length
                    }
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Accepting applications
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex justify-between items-center pb-2">
                  <CardTitle className="text-sm font-medium">
                    Featured
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {scholarships.filter((s) => s.featured).length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Featured scholarships
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex justify-between items-center pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Awards
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {scholarships
                      .reduce((sum, s) => sum + s.numberOfAwards, 0)
                      .toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Available positions
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Filters */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search scholarships..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Full">Full Funding</SelectItem>
                      <SelectItem value="Partial">Partial Funding</SelectItem>
                      <SelectItem value="Merit-based">Merit-based</SelectItem>
                      <SelectItem value="Need-based">Need-based</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={selectedStatus}
                    onValueChange={setSelectedStatus}
                  >
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="normal">Active</SelectItem>
                      <SelectItem value="soon">Deadline Soon</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" /> More Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Bulk Actions */}
            {selectedScholarships.length > 0 && (
              <Card className="mb-6">
                <CardContent className="p-4 flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    {selectedScholarships.length} scholarship(s) selected
                  </span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleBulkAction("feature")}
                    >
                      Feature
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleBulkAction("unfeature")}
                    >
                      Unfeature
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleBulkAction("export")}
                    >
                      <Download className="h-4 w-4 mr-1" /> Export
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleBulkAction("delete")}
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Table */}
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={
                            selectedScholarships.length ===
                              filteredScholarships.length &&
                            filteredScholarships.length > 0
                          }
                          onCheckedChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead>Scholarship</TableHead>
                      <TableHead>Provider</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Level</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Deadline</TableHead>
                      <TableHead>Deadline Status</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredScholarships.map((s) => {
                      const deadlineInfo = getDeadlineStatus(
                        s.applicationDeadline
                      );
                      const isSelected = selectedScholarships.includes(s._id);

                      return (
                        <TableRow key={s._id}>
                          <TableCell>
                            <Checkbox
                              checked={isSelected}
                              onCheckedChange={(checked) =>
                                handleSelectScholarship(
                                  s._id,
                                  checked as boolean
                                )
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <img
                                src={s.image || "/placeholder.svg"}
                                alt={s.title}
                                className="w-10 h-10 rounded object-cover"
                              />
                              <div>
                                <div className="font-medium">{s.title}</div>
                                <div className="text-sm text-gray-500">
                                  {s.field}
                                </div>
                                <div className="flex gap-1 mt-1">
                                  {s.featured && (
                                    <Badge className="bg-blue-600 text-xs">
                                      Featured
                                    </Badge>
                                  )}
                                  <Badge variant="outline" className="text-xs">
                                    {s.type}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">{s.provider}</div>
                            <div className="text-sm text-gray-500">
                              {s.country}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium text-green-600">
                              {s.amount}
                            </div>
                            <div className="text-sm text-gray-500">
                              {s.currency}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{s.level}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3 text-gray-400" />
                              <span className="text-sm">{s.location}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              {new Date(
                                s.applicationDeadline
                              ).toLocaleDateString()}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={deadlineInfo.color}>
                              {deadlineInfo.text}
                            </Badge>
                          </TableCell>
                          <TableCell>{s.status}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                  <Link href={`/scholarships/${s._id}`}>
                                    <Eye className="h-4 w-4 mr-2" /> View
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link
                                    href={`/admin/scholarships/${s._id}/edit`}
                                  >
                                    <Edit className="h-4 w-4 mr-2" /> Edit
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="h-4 w-4 mr-2" /> Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {filteredScholarships.length === 0 && !loading && (
              <div className="text-center py-12">
                <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No scholarships found
                </h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <Button asChild>
                  <Link href="/admin/scholarships/new">
                    <Plus className="h-4 w-4 mr-2" /> Add First Scholarship
                  </Link>
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
