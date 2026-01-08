"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Search, Menu, X } from "lucide-react";

type Props = {
  showSearch?: boolean;
  type?: string;
};

export function Header({ showSearch = false, type = "" }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const [globalResults, setGlobalResults] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  async function handleSearch(value: string) {
    setQuery(value);

    if (!value.trim()) {
      setShowDropdown(false);
      setGlobalResults([]);
      return;
    }

    setIsSearching(true);
    setShowDropdown(true);

    const data = await searchAllContent(value);

    setGlobalResults(data);
    setIsSearching(false);
  }

  // helper: check if current path starts with the route
  const isActive = (route: string) =>
    pathname === route || pathname.startsWith(`${route}/`);
  async function searchAllContent(searchTerm: string) {
    if (!searchTerm.trim()) return [];

    const q = searchTerm.toLowerCase();
    const body = JSON.stringify({ search: searchTerm });

    try {
      let responses = [];

      // ⭐ TYPE-BASED SEARCH
      if (type === "courses") {
        responses = [
          fetch("/api/courses/public", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body,
          }),
        ];
      } else if (type === "jobs") {
        responses = [
          fetch("/api/jobs/public", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body,
          }),
        ];
      } else if (type === "resources") {
        responses = [
          fetch("/api/resources/public", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body,
          }),
        ];
      } else if (type === "scholarships") {
        responses = [
          fetch("/api/scholarships/public", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body,
          }),
        ];
      } else {
        // ⭐ Global Search (all)
        responses = [
          fetch("/api/courses/public", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body,
          }),
          fetch("/api/jobs/public", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body,
          }),
          fetch("/api/resources/public", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body,
          }),
          fetch("/api/scholarships/public", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body,
          }),
        ];
      }

      // Wait for all to finish
      const jsonResponses = await Promise.all(
        responses.map((r) => r.then((res) => res.json()))
      );

      // Attach type based on which request we made
      let combined: any[] = [];

      if (type === "courses") {
        combined = (jsonResponses[0].data || []).map((c: any) => ({
          ...c,
          _type: "course",
        }));
      } else if (type === "jobs") {
        combined = (jsonResponses[0].data || []).map((j: any) => ({
          ...j,
          _type: "job",
        }));
      } else if (type === "resources") {
        combined = (jsonResponses[0].data || []).map((r: any) => ({
          ...r,
          _type: "resource",
        }));
      } else if (type === "scholarships") {
        combined = (jsonResponses[0].data || []).map((s: any) => ({
          ...s,
          _type: "scholarship",
        }));
      } else {
        // Global merge
        const [courses, jobs, resources, scholarships] = jsonResponses;

        combined = [
          ...(courses?.data || []).map((c: any) => ({ ...c, _type: "course" })),
          ...(jobs?.data || []).map((j: any) => ({ ...j, _type: "job" })),
          ...(resources?.data || []).map((r: any) => ({
            ...r,
            _type: "resource",
          })),
          ...(scholarships?.data || []).map((s: any) => ({
            ...s,
            _type: "scholarship",
          })),
        ];
      }

      // ⭐ Relevance ranking
      const scored = combined.map((item) => {
        let score = 0;

        const title = (item.title || "").toLowerCase();
        const desc = (
          item.description ||
          item.excerpt ||
          item.content ||
          ""
        ).toLowerCase();
        const provider = (
          item.provider ||
          item.company ||
          item.platform ||
          ""
        ).toLowerCase();

        let tagsString = "";
        if (Array.isArray(item.tags)) tagsString = item.tags.join(" ");
        else if (typeof item.tags === "string") tagsString = item.tags;

        tagsString = tagsString.toLowerCase();

        if (title.startsWith(q)) score += 50;
        if (title.includes(q)) score += 30;
        if (desc.includes(q)) score += 10;
        if (provider.includes(q)) score += 5;
        if (tagsString.includes(q)) score += 5;
        if (item.featured || item.isPopular || item.isTrending) score += 3;

        return { ...item, _score: score };
      });

      // Sort by relevance
      scored.sort((a, b) => b._score - a._score);

      return scored;
    } catch (err) {
      console.error("  Search failed:", err);
      return [];
    }
  }

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <img src="/freelogo.svg" alt="FreeFoundry Logo" className="w-full" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/courses"
            className={
              isActive("/courses")
                ? "text-blue-600 font-medium"
                : "text-gray-600 hover:text-blue-600"
            }
          >
            Courses
          </Link>
          <Link
            href="/resources"
            className={
              isActive("/resources")
                ? "text-blue-600 font-medium"
                : "text-gray-600 hover:text-blue-600"
            }
          >
            Resources
          </Link>
          <Link
            href="/jobs"
            className={
              isActive("/jobs")
                ? "text-blue-600 font-medium"
                : "text-gray-600 hover:text-blue-600"
            }
          >
            Jobs
          </Link>

          <Link
            href="/scholarships"
            className={
              isActive("/scholarships")
                ? "text-blue-600 font-medium"
                : "text-gray-600 hover:text-blue-600"
            }
          >
            Scholarships
          </Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center">
          {showSearch && (
            <div className="relative hidden md:block mr-4">
              <input
                type="search"
                placeholder={"Search" + (type ? ` ${type}` : "") + "..."}
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-3 pr-10 py-1.5 w-64 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-blue-500">
                <Search className="h-4 w-4" />
              </button>

              {/* SEARCH DROPDOWN */}
              {showDropdown && (
                <div className="absolute top-11 left-0 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-80 overflow-y-auto z-50">
                  {/* Loading Skeleton */}
                  {isSearching && (
                    <div className="p-4 space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="animate-pulse">
                          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                          <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* No results */}
                  {!isSearching && globalResults.length === 0 && (
                    <div className="p-4 text-gray-500 text-sm">
                      No results found
                    </div>
                  )}

                  {/* Results */}
                  {!isSearching &&
                    globalResults.map((item, i) => (
                      <Link
                        href={
                          item._type === "course"
                            ? `/courses/${item.id}`
                            : item._type === "job"
                            ? `/jobs/${item.id}`
                            : item._type === "resource"
                            ? `/resources/${item.slug || item._id}`
                            : `/scholarships/${item._id}`
                        }
                        key={i}
                        className="block px-4 py-3 hover:bg-gray-100 border-b last:border-none"
                        onClick={() => setShowDropdown(false)}
                      >
                        <div className="font-medium text-gray-800">
                          {item.title?.slice(0, 80)}
                        </div>
                        <div className="text-xs text-gray-500 capitalize">
                          {item._type}
                        </div>
                      </Link>
                    ))}
                </div>
              )}
            </div>
          )}
          {/* <Button
            variant="outline"
            size="sm"
            className="hidden md:flex bg-transparent"
          >
            Sign In
          </Button> */}
          <button
            className="ml-2 md:hidden p-2 text-gray-600 hover:text-blue-600"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-white">
          <nav className="flex flex-col px-4 py-3 space-y-3">
            <Link
              href="/courses"
              className={
                isActive("/courses")
                  ? "text-blue-600 font-medium"
                  : "text-gray-600 hover:text-blue-600"
              }
              onClick={() => setMobileOpen(false)}
            >
              Courses
            </Link>
            <Link
              href="/resources"
              className={
                isActive("/resources")
                  ? "text-blue-600 font-medium"
                  : "text-gray-600 hover:text-blue-600"
              }
              onClick={() => setMobileOpen(false)}
            >
              Resources
            </Link>
            <Link
              href="/jobs"
              className={
                isActive("/jobs")
                  ? "text-blue-600 font-medium"
                  : "text-gray-600 hover:text-blue-600"
              }
              onClick={() => setMobileOpen(false)}
            >
              Jobs
            </Link>
            <Link
              href="/scholarships"
              className={
                isActive("/scholarships")
                  ? "text-blue-600 font-medium"
                  : "text-gray-600 hover:text-blue-600"
              }
            >
              Scholarships
            </Link>
            <Button variant="outline" size="sm" className="w-full">
              Sign In
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
