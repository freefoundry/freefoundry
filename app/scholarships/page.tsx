"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  Search,
  Filter,
  MapPin,
  Calendar,
  DollarSign,
  GraduationCap,
  ExternalLink,
  Bookmark,
  BookmarkCheck,
} from "lucide-react";
import Link from "next/link";
import type { Scholarship } from "@/lib/types";
import { Header } from "@/components/layout/Header";

export default function ScholarshipsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedField, setSelectedField] = useState("all");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [bookmarkedScholarships, setBookmarkedScholarships] = useState<
    number[]
  >([]);
  const itemsPerPage = 12;

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
        "Chevening Scholarships are the UK government's global scholarship programme, funded by the Foreign and Commonwealth Office and partner organisations.",
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
        "The Fulbright Program is the flagship international educational exchange program sponsored by the U.S. government.",
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
        "DAAD scholarships support international students and researchers in Germany across various fields of study.",
      applicationUrl: "https://daad.de",
      tags: ["Academic", "Research", "Europe"],
      featured: false,
      renewable: true,
      numberOfAwards: 100000,
      gpaRequirement: "Good",
      image: "/placeholder.svg?height=200&width=300&text=DAAD+Scholarship",
      dateAdded: "2024-01-25",
    },
    {
      id: 4,
      title: "Commonwealth Scholarships",
      provider: "Commonwealth Scholarship Commission",
      amount: "Full funding",
      currency: "GBP",
      type: "Full",
      level: "PhD",
      field: "Development Studies",
      location: "United Kingdom",
      country: "UK",
      eligibility: [
        "Master's degree",
        "Commonwealth citizen",
        "Development focus",
      ],
      requirements: ["Research proposal", "English proficiency", "References"],
      benefits: [
        "Full tuition",
        "Living allowance",
        "Research support",
        "Travel costs",
      ],
      applicationDeadline: "2024-12-15",
      description:
        "Commonwealth Scholarships are for students from Commonwealth countries to study in the UK.",
      applicationUrl: "https://cscuk.fcdo.gov.uk",
      tags: ["Commonwealth", "Development", "Research"],
      featured: false,
      renewable: false,
      numberOfAwards: 800,
      gpaRequirement: "First Class",
      image:
        "/placeholder.svg?height=200&width=300&text=Commonwealth+Scholarship",
      dateAdded: "2024-02-01",
    },
    {
      id: 5,
      title: "Erasmus Mundus Joint Master Degrees",
      provider: "European Commission",
      amount: "€1,400/month",
      currency: "EUR",
      type: "Full",
      level: "Graduate",
      field: "Various Fields",
      location: "Europe (Multiple Countries)",
      country: "EU",
      eligibility: [
        "Bachelor's degree",
        "English proficiency",
        "Academic excellence",
      ],
      requirements: [
        "Online application",
        "Academic transcripts",
        "Motivation letter",
      ],
      benefits: [
        "Monthly allowance",
        "Travel costs",
        "Insurance",
        "Installation costs",
      ],
      applicationDeadline: "2024-01-15",
      description:
        "Erasmus Mundus offers fully-funded scholarships for joint master's degrees taught in multiple European countries.",
      applicationUrl: "https://erasmus-plus.ec.europa.eu",
      tags: ["European", "Joint Degree", "Mobility"],
      featured: true,
      renewable: false,
      numberOfAwards: 4500,
      gpaRequirement: "Good",
      image: "/placeholder.svg?height=200&width=300&text=Erasmus+Mundus",
      dateAdded: "2024-02-05",
    },
    {
      id: 6,
      title: "Australia Awards Scholarships",
      provider: "Australian Government",
      amount: "Full funding",
      currency: "AUD",
      type: "Full",
      level: "Graduate",
      field: "Any Field",
      location: "Australia",
      country: "Australia",
      eligibility: [
        "Bachelor's degree",
        "Development country citizen",
        "Leadership potential",
      ],
      requirements: ["IELTS 6.5", "Work experience", "Development commitment"],
      benefits: [
        "Full tuition",
        "Living allowance",
        "Health cover",
        "Travel expenses",
      ],
      applicationDeadline: "2024-04-30",
      description:
        "Australia Awards Scholarships provide opportunities for people from developing countries to study in Australia.",
      applicationUrl: "https://australiaawards.gov.au",
      tags: ["Government", "Development", "Leadership"],
      featured: false,
      renewable: false,
      numberOfAwards: 1000,
      gpaRequirement: "Distinction",
      image: "/placeholder.svg?height=200&width=300&text=Australia+Awards",
      dateAdded: "2024-02-10",
    },
  ];

  // Get unique values for filters
  const types = [...new Set(scholarships.map((s) => s.type))];
  const levels = [...new Set(scholarships.map((s) => s.level))];
  const fields = [...new Set(scholarships.map((s) => s.field))];
  const countries = [...new Set(scholarships.map((s) => s.country))];

  // Filter scholarships based on search and filters
  const filteredScholarships = useMemo(() => {
    return scholarships.filter((scholarship) => {
      const matchesSearch =
        scholarship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scholarship.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scholarship.field.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scholarship.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesType =
        selectedType === "all" || scholarship.type === selectedType;
      const matchesLevel =
        selectedLevel === "all" || scholarship.level === selectedLevel;
      const matchesField =
        selectedField === "all" || scholarship.field === selectedField;
      const matchesCountry =
        selectedCountry === "all" || scholarship.country === selectedCountry;

      return (
        matchesSearch &&
        matchesType &&
        matchesLevel &&
        matchesField &&
        matchesCountry
      );
    });
  }, [
    searchTerm,
    selectedType,
    selectedLevel,
    selectedField,
    selectedCountry,
    scholarships,
  ]);

  // Pagination
  const totalPages = Math.ceil(filteredScholarships.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedScholarships = filteredScholarships.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const toggleBookmark = (scholarshipId: number) => {
    setBookmarkedScholarships((prev) =>
      prev.includes(scholarshipId)
        ? prev.filter((id) => id !== scholarshipId)
        : [...prev, scholarshipId]
    );
  };

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
        text: `${daysUntilDeadline} days left`,
        color: "bg-orange-100 text-orange-800",
      };
    if (daysUntilDeadline <= 30)
      return {
        status: "soon",
        text: `${daysUntilDeadline} days left`,
        color: "bg-yellow-100 text-yellow-800",
      };
    return {
      status: "normal",
      text: `${daysUntilDeadline} days left`,
      color: "bg-green-100 text-green-800",
    };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
        <Header showSearch />
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Scholarships</h1>
          <p className="text-gray-600">
            Discover funding opportunities for your education journey
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            <div className="lg:col-span-2">
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
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {types.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                {levels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedField} onValueChange={setSelectedField}>
              <SelectTrigger>
                <SelectValue placeholder="Field" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Fields</SelectItem>
                {fields.map((field) => (
                  <SelectItem key={field} value={field}>
                    {field}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger>
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Showing {paginatedScholarships.length} of{" "}
            {filteredScholarships.length} scholarships
          </p>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              {filteredScholarships.filter((s) => s.featured).length} featured
            </span>
          </div>
        </div>

        {/* Scholarships Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {paginatedScholarships.map((scholarship) => {
            const deadlineInfo = getDeadlineStatus(
              scholarship.applicationDeadline
            );
            const isBookmarked = bookmarkedScholarships.includes(
              scholarship.id
            );

            return (
              <Card
                key={scholarship.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative">
                  <img
                    src={scholarship.image || "/placeholder.svg"}
                    alt={scholarship.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    {scholarship.featured && (
                      <Badge className="bg-blue-600">Featured</Badge>
                    )}
                    <Badge className={`${deadlineInfo.color}`}>
                      {deadlineInfo.text}
                    </Badge>
                  </div>
                  <button
                    onClick={() => toggleBookmark(scholarship.id)}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                  >
                    {isBookmarked ? (
                      <BookmarkCheck className="h-4 w-4 text-blue-600" />
                    ) : (
                      <Bookmark className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>

                <CardContent className="p-5">
                  <div className="mb-3">
                    <h3 className="font-semibold text-lg mb-1 line-clamp-2">
                      {scholarship.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      by {scholarship.provider}
                    </p>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {scholarship.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span className="font-medium text-green-600">
                        {scholarship.amount}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {scholarship.type}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <GraduationCap className="h-4 w-4" />
                      <span>{scholarship.level}</span>
                      <span>•</span>
                      <span>{scholarship.field}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{scholarship.location}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>
                        Deadline:{" "}
                        {new Date(
                          scholarship.applicationDeadline
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {scholarship.tags.slice(0, 3).map((tag: string) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button asChild size="sm" className="flex-1">
                      <Link href={`/scholarships/${scholarship.id}`}>
                        View Details
                      </Link>
                    </Button>
                    <Button asChild size="sm" variant="outline">
                      <a
                        href={scholarship.applicationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                onClick={() => setCurrentPage(page)}
                className="w-10"
              >
                {page}
              </Button>
            ))}

            <Button
              variant="outline"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
