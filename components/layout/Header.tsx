"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Search, Menu, X } from "lucide-react";

type Props = {
  showSearch?: boolean;
};

export function Header({ showSearch = false }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // helper: check if current path starts with the route
  const isActive = (route: string) =>
    pathname === route || pathname.startsWith(`${route}/`);

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
        </nav>

        {/* Right side */}
        <div className="flex items-center">
          {showSearch && (
            <div className="relative hidden md:block mr-4">
              <input
                type="search"
                placeholder="Search resources..."
                className="pl-3 pr-10 py-1.5 w-64 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-blue-500">
                <Search className="h-4 w-4" />
              </button>
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
            <Button variant="outline" size="sm" className="w-full">
              Sign In
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
