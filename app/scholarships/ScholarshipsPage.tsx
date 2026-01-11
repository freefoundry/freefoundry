"use client";

import React, { useEffect, useState } from "react";
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
  GraduationCap,
  Search,
  MapPin,
  DollarSign,
  Share2,
  Calendar,
  Bookmark,
  BookmarkCheck,
  ChevronDown,
  SlidersHorizontal,
  X,
  Award,
} from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination } from "@/components/pagination/Pagination";
import { ShareModal } from "@/components/share/ShareModal";
import { buildShareMessage } from "@/lib/shareMessage";

type Scholarship = {
  _id: string;
  title: string;
  slug: string;
  provider: string;
  amount?: string;
  type?: string;
  level?: string;
  field?: string;
  country?: string;
  applicationDeadline?: string;
  description?: string;
  applicationUrl?: string;
  featured?: boolean;
  tags?: string[];
  image?: string;
  featuredImage?: string;
  visibility?: string;
  benefits?: string[];
};

export default function ScholarshipsPage() {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [totalScholarships, setTotalScholarships] = useState(0);
  const [loading, setLoading] = useState(false);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(9);
  const [bookmarked, setBookmarked] = useState<string[]>([]);
  const [shareData, setShareData] = useState<{
    title: string;
    url: string;
    message: any;
  } | null>(null);


  // Static filter options (these can later be dynamic)
  const types = ["Full", "Partial"];
  const levels = ["Undergraduate", "Graduate", "PhD", "Postdoc"];
  const fields = ["STEM", "Business", "Arts", "Law", "Medicine"];
  const countries = [
    "USA",
    "UK",
    "Canada",
    "Germany",
    "Australia",
    "France",
    "Japan",
  ];
  const handleShare = (s: Scholarship) => {
    const url = `${window.location.origin}/scholarships/${s.slug}`;

    setShareData({
      title: s.title,
      url,
      message: buildShareMessage({
        title: s.title,
        country: s.country,
        level: s.level,
        deadline: s.applicationDeadline
          ? new Date(s.applicationDeadline).toLocaleDateString()
          : undefined,
        benefits: s.benefits,
        url,
      }),
    });
  };


  const toggleBookmark = (id: string) => {
    setBookmarked((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleToggle = (
    value: string,
    selected: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedTypes([]);
    setSelectedLevels([]);
    setSelectedFields([]);
    setSelectedCountries([]);
  };

  const activeFiltersCount =
    selectedTypes.length +
    selectedLevels.length +
    selectedFields.length +
    selectedCountries.length;

  // Fetch scholarships
  const fetchScholarships = async () => {
    setLoading(true);
    try {
      const body = {
        page: currentPage,
        limit: perPage,
        search: searchTerm || undefined,
        type: selectedTypes.length ? selectedTypes[0] : "all",
        level: selectedLevels.length ? selectedLevels[0] : "all",
        field: selectedFields.length ? selectedFields[0] : "all",
        country: selectedCountries.length ? selectedCountries[0] : "all",
        sort: sortBy,
      };

      const res = await fetch("/api/scholarships/public", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      setScholarships(data.data || []);
      setTotalScholarships(data.pagination?.total || 0);
    } catch (err) {
      console.error("  Failed to fetch scholarships:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchScholarships();
  }, [
    searchTerm,
    selectedTypes,
    selectedLevels,
    selectedFields,
    selectedCountries,
    sortBy,
    currentPage,
  ]);

  const getDeadlineStatus = (date?: string) => {
    if (!date) return "No deadline";
    const diff =
      (new Date(date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24);
    if (diff < 0) return "Expired";
    if (diff <= 7) return "Closing soon";
    return `${Math.ceil(diff)} days left`;
  };



  return (
    <div className="min-h-screen bg-gray-50">
      <Header showSearch type="scholarships" />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Global Scholarships</h1>
          <p className="text-gray-600">
            Explore funding opportunities around the world.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80">
            {/* Mobile toggle */}
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

            {/* Filters */}
            <div
              className={`space-y-6 ${
                showFilters ? "block" : "hidden lg:block"
              }`}
            >
              <Card>
                <CardContent className="p-6">
                  {/* Search */}
                  <div className="mb-6">
                    <Label htmlFor="search">Search Scholarships</Label>
                    <div className="relative mt-2">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="search"
                        placeholder="Search by title, field, or provider"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <FilterGroup
                    label="Type"
                    options={types}
                    selected={selectedTypes}
                    onToggle={(v) =>
                      handleToggle(v, selectedTypes, setSelectedTypes)
                    }
                  />

                  <FilterGroup
                    label="Level"
                    options={levels}
                    selected={selectedLevels}
                    onToggle={(v) =>
                      handleToggle(v, selectedLevels, setSelectedLevels)
                    }
                  />

                  <FilterGroup
                    label="Field"
                    options={fields}
                    selected={selectedFields}
                    onToggle={(v) =>
                      handleToggle(v, selectedFields, setSelectedFields)
                    }
                  />

                  <FilterGroup
                    label="Country"
                    options={countries}
                    selected={selectedCountries}
                    onToggle={(v) =>
                      handleToggle(v, selectedCountries, setSelectedCountries)
                    }
                  />

                  {activeFiltersCount > 0 && (
                    <Button
                      variant="outline"
                      onClick={clearAllFilters}
                      className="w-full mt-4"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Clear All Filters
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Scholarships Section */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Showing {scholarships.length} of {totalScholarships}{" "}
                scholarships
              </p>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="popular">Most Viewed</SelectItem>
                  <SelectItem value="deadline">Deadline</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Cards */}
            {loading ? (
              <ScholarshipSkeletonGrid count={perPage} />
            ) : scholarships.length === 0 ? (
              <NoScholarships clearAll={clearAllFilters} />
            ) : (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {scholarships.map((s) => (
                    <ScholarshipCard
                      key={s._id}
                      scholarship={s}
                      toggleBookmark={toggleBookmark}
                      bookmarked={bookmarked.includes(s._id)}
                      getDeadlineStatus={getDeadlineStatus}
                      handleShare={handleShare}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalScholarships > perPage && (
                  <div className="mt-6">
                    <Pagination
                      total={totalScholarships}
                      perPage={perPage}
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

      {shareData && (
        <ShareModal
          open={!!shareData}
          onClose={() => setShareData(null)}
          title={shareData.title}
          url={shareData.url}
          message={shareData.message}
          from="Scholarship"
        />
      )}
    </div>
  );
}

/* --- Components --- */

function FilterGroup({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div className="mb-6">
      <Label className="text-sm font-medium mb-3 block">{label}</Label>
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option} className="flex items-center space-x-2">
            <Checkbox
              id={`${label}-${option}`}
              checked={selected.includes(option)}
              onCheckedChange={() => onToggle(option)}
            />
            <Label htmlFor={`${label}-${option}`} className="text-sm">
              {option}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScholarshipSkeletonGrid({ count }: { count: number }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(count)].map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <Skeleton className="h-48 w-full" />
          <CardContent className="p-5 space-y-3">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function NoScholarships({ clearAll }: { clearAll: () => void }) {
  return (
    <div className="text-center py-12">
      <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        No scholarships found
      </h3>
      <p className="text-gray-500 mb-4">
        Try adjusting your filters or search terms
      </p>
      <Button onClick={clearAll} variant="outline">
        Clear All Filters
      </Button>
    </div>
  );
}

function ScholarshipCard({
  scholarship,
  toggleBookmark,
  bookmarked,
  getDeadlineStatus,
  handleShare,
}: {
  scholarship: Scholarship;
  toggleBookmark: (id: string) => void;
  bookmarked: boolean;
  getDeadlineStatus: (date?: string) => string;
  handleShare: (scholarship: Scholarship) => void;
}) {
  const deadlineText = getDeadlineStatus(scholarship.applicationDeadline);

  return (
    <Card className="hover:shadow-lg transition-shadow overflow-hidden">
      <div className="relative">
        <img
          src={scholarship.featuredImage || "/placeholder.svg"}
          alt={scholarship.title}
          className="w-full h-48 object-cover lazyload"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {scholarship.featured && (
            <Badge className="bg-blue-600">Featured</Badge>
          )}
          <Badge variant="secondary">{deadlineText}</Badge>
        </div>
        {/* <Button
          variant="ghost"
          size="sm"
          className="absolute top-3 right-3"
          onClick={() => toggleBookmark(scholarship._id)}
        >
          {bookmarked ? (
            <BookmarkCheck className="h-5 w-5 text-blue-600" />
          ) : (
            <Bookmark className="h-5 w-5 text-gray-400" />
          )}
        </Button> */}
      </div>
      <CardContent className="p-5">
        <h3 className="text-lg font-semibold mb-1">{scholarship.title}</h3>
        <p className="text-gray-600 text-sm mb-2">{scholarship.provider}</p>
        <p className="text-gray-700 text-sm line-clamp-3 mb-4">
          {scholarship.description?.replace(/<[^>]+>/g, "") || "—"}
        </p>
        <div className="space-y-2 text-sm text-gray-600 mb-4">
          {scholarship.amount && (
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-green-600" />
              {scholarship.amount}
            </div>
          )}
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            {scholarship.level || "Any level"}
          </div>
         {scholarship?.country && <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {scholarship.country }
          </div>}
          {scholarship.applicationDeadline && (
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Deadline:{" "}
              {new Date(scholarship.applicationDeadline).toLocaleDateString()}
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Button asChild size="sm" className="flex-1">
            <Link href={`/scholarships/${scholarship.slug}`}>View Details</Link>
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() => handleShare(scholarship)}
            title="Share scholarship"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
