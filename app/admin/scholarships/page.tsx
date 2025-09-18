"use client";

import { useState } from "react";
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

export default function AdminScholarshipsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedScholarships, setSelectedScholarships] = useState<number[]>(
    []
  );

  // Mock data for scholarships
  const scholarships: Scholarship[] = [
    {
      id: 1,
      title: "Chevening Scholarships",
      provider: "UK Government",
      amount: "Full funding",
      currency: "GBP",
      type: "Full",
      level: "Graduate",
      field: "Any Field",
      location: "United Kingdom",
      country: "UK",
      eligibility: [
        "Bachelor's degree",
        "2+ years work experience",
        "English proficiency",
      ],
      requirements: [
        "IELTS 6.5",
        "Leadership potential",
        "UK return commitment",
      ],
      benefits: [
        "Full tuition",
        "Living allowance",
        "Travel costs",
        "Visa fees",
      ],
      applicationDeadline: "2024-11-05",
      description:
        "Chevening Scholarships are the UK government's global scholarship programme.",
      applicationUrl: "https://chevening.org",
      tags: ["Government", "Leadership", "International"],
      featured: true,
      renewable: false,
      numberOfAwards: 1500,
      gpaRequirement: "Upper Second Class",
      image: "/placeholder.svg?height=200&width=300&text=Chevening+Scholarship",
      dateAdded: "2024-01-15",
    },
    {
      id: 2,
      title: "Fulbright Foreign Student Program",
      provider: "US Government",
      amount: "$25,000 - $45,000",
      currency: "USD",
      type: "Full",
      level: "Graduate",
      field: "Any Field",
      location: "United States",
      country: "USA",
      eligibility: [
        "Bachelor's degree",
        "English proficiency",
        "Leadership experience",
      ],
      requirements: ["TOEFL/IELTS", "GRE/GMAT", "Research proposal"],
      benefits: [
        "Tuition",
        "Living stipend",
        "Health insurance",
        "Travel allowance",
      ],
      applicationDeadline: "2024-10-15",
      description:
        "The Fulbright Program is the flagship international educational exchange program.",
      applicationUrl: "https://fulbright.org",
      tags: ["Government", "Research", "Exchange"],
      featured: true,
      renewable: false,
      numberOfAwards: 4000,
      gpaRequirement: "3.0/4.0",
      image: "/placeholder.svg?height=200&width=300&text=Fulbright+Scholarship",
      dateAdded: "2024-01-20",
    },
    {
      id: 3,
      title: "DAAD Scholarships",
      provider: "German Academic Exchange Service",
      amount: "€850 - €1,200",
      currency: "EUR",
      type: "Partial",
      level: "Graduate",
      field: "Engineering & Technology",
      location: "Germany",
      country: "Germany",
      eligibility: [
        "Bachelor's degree",
        "German or English proficiency",
        "Academic excellence",
      ],
      requirements: [
        "Language certificate",
        "Motivation letter",
        "Academic transcripts",
      ],
      benefits: ["Monthly stipend", "Health insurance", "Travel allowance"],
      applicationDeadline: "2024-12-01",
      description:
        "DAAD scholarships support international students and researchers in Germany.",
      applicationUrl: "https://daad.de",
      tags: ["Academic", "Research", "Europe"],
      featured: false,
      renewable: true,
      numberOfAwards: 100000,
      gpaRequirement: "Good",
      image: "/placeholder.svg?height=200&width=300&text=DAAD+Scholarship",
      dateAdded: "2024-01-25",
    },
  ];

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

  const filteredScholarships = scholarships.filter((scholarship) => {
    const matchesSearch =
      scholarship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scholarship.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      selectedType === "all" || scholarship.type === selectedType;
    const deadlineStatus = getDeadlineStatus(
      scholarship.applicationDeadline
    ).status;
    const matchesStatus =
      selectedStatus === "all" || deadlineStatus === selectedStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedScholarships(filteredScholarships.map((s) => s.id));
    } else {
      setSelectedScholarships([]);
    }
  };

  const handleSelectScholarship = (scholarshipId: number, checked: boolean) => {
    if (checked) {
      setSelectedScholarships((prev) => [...prev, scholarshipId]);
    } else {
      setSelectedScholarships((prev) =>
        prev.filter((id) => id !== scholarshipId)
      );
    }
  };

  const handleBulkAction = (action: string) => {
    console.log(`Performing ${action} on scholarships:`, selectedScholarships);
    // Implement bulk actions here
    setSelectedScholarships([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Scholarships Management</h1>
            <p className="text-gray-600">
              Manage scholarship opportunities and applications
            </p>
          </div>
          <Button asChild>
            <Link href="/admin/scholarships/new">
              <Plus className="h-4 w-4 mr-2" />
              Add Scholarship
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Scholarships
              </CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{scholarships.length}</div>
              <p className="text-xs text-muted-foreground">
                +2 from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
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
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Featured</CardTitle>
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
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
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

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search scholarships..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
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

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
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
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Bulk Actions */}
        {selectedScholarships.length > 0 && (
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
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
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleBulkAction("delete")}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Scholarships Table */}
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
                  <TableHead>Status</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredScholarships.map((scholarship) => {
                  const deadlineInfo = getDeadlineStatus(
                    scholarship.applicationDeadline
                  );
                  const isSelected = selectedScholarships.includes(
                    scholarship.id
                  );

                  return (
                    <TableRow key={scholarship.id}>
                      <TableCell>
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={(checked) =>
                            handleSelectScholarship(
                              scholarship.id,
                              checked as boolean
                            )
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img
                            src={scholarship.image || "/placeholder.svg"}
                            alt={scholarship.title}
                            className="w-10 h-10 rounded object-cover"
                          />
                          <div>
                            <div className="font-medium">
                              {scholarship.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              {scholarship.field}
                            </div>
                            <div className="flex gap-1 mt-1">
                              {scholarship.featured && (
                                <Badge className="bg-blue-600 text-xs">
                                  Featured
                                </Badge>
                              )}
                              <Badge variant="outline" className="text-xs">
                                {scholarship.type}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">
                          {scholarship.provider}
                        </div>
                        <div className="text-sm text-gray-500">
                          {scholarship.country}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-green-600">
                          {scholarship.amount}
                        </div>
                        <div className="text-sm text-gray-500">
                          {scholarship.currency}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{scholarship.level}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-gray-400" />
                          <span className="text-sm">
                            {scholarship.location}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {new Date(
                            scholarship.applicationDeadline
                          ).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={deadlineInfo.color}>
                          {deadlineInfo.text}
                        </Badge>
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
                              <Link href={`/scholarships/${scholarship.id}`}>
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
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

        {filteredScholarships.length === 0 && (
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
                <Plus className="h-4 w-4 mr-2" />
                Add First Scholarship
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
