import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Home,
  Search,
  BookOpen,
  Briefcase,
  FileText,
  GraduationCap,
  ArrowLeft,
  Compass,
  HelpCircle,
} from "lucide-react";

export default function NotFound() {
  const popularLinks = [
    {
      href: "/courses",
      icon: BookOpen,
      title: "Browse Courses",
      description: "Discover free learning courses",
    },
    {
      href: "/jobs",
      icon: Briefcase,
      title: "Find Jobs",
      description: "Explore career opportunities",
    },
    {
      href: "/resources",
      icon: FileText,
      title: "Learning Resources",
      description: "Access study materials",
    },
    {
      href: "/scholarships",
      icon: GraduationCap,
      title: "Scholarships",
      description: "Find funding opportunities",
    },
  ];

  const quickActions = [
    {
      href: "/",
      icon: Home,
      label: "Go Home",
    },
    {
      href: "/courses",
      icon: Search,
      label: "Search Courses",
    },
    {
      href: "/help",
      icon: HelpCircle,
      label: "Get Help",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-2">
              <img
                src="/freelogo.svg"
                alt="FreeFoundry Logo"
                className="w-full"
              />
            </Link>
            <Button asChild variant="outline">
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main 404 Content */}
        <div className="text-center mb-16">
          {/* Large 404 Number */}
          <div className="relative mb-8">
            <div className="text-[200px] sm:text-[300px] font-bold text-gray-100 leading-none select-none">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200">
                <Compass className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  Page Not Found
                </h1>
                <p className="text-gray-600 max-w-md">
                  Oops! The page you're looking for seems to have wandered off.
                  Let's get you back on track to your learning journey.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {quickActions.map((action) => (
              <Button key={action.href} asChild variant="outline" size="lg">
                <Link href={action.href}>
                  <action.icon className="h-5 w-5 mr-2" />
                  {action.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>

        {/* Popular Destinations */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Popular Destinations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularLinks.map((link) => (
              <Card
                key={link.href}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                    <link.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {link.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {link.description}
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="w-full bg-transparent"
                  >
                    <Link href={link.href}>Explore</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Search Suggestion */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-8 text-center">
            <Search className="h-12 w-12 mx-auto mb-4 opacity-90" />
            <h3 className="text-xl font-semibold mb-2">
              Looking for something specific?
            </h3>
            <p className="mb-6 opacity-90">
              Try searching for courses, jobs, resources, or scholarships that
              match your interests.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Button asChild variant="secondary" size="lg" className="flex-1">
                <Link href="/courses">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Browse Courses
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Link href="/jobs">
                  <Briefcase className="h-5 w-5 mr-2" />
                  Find Jobs
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Help Section */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-4">
            Still can't find what you're looking for?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline">
              <Link href="/contact">
                <HelpCircle className="h-4 w-4 mr-2" />
                Contact Support
              </Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/sitemap">View Sitemap</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <img
                  src="/freefoundry-logo-white.png"
                  alt="FreeFoundry"
                  className="h-8 w-auto"
                />
              </Link>
              <p className="text-gray-400 mb-4 max-w-md">
                Your gateway to free learning resources, courses, and
                opportunities. No paywalls, no barriers - just pure knowledge at
                your fingertips.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    href="/courses"
                    className="hover:text-white transition-colors"
                  >
                    Courses
                  </Link>
                </li>
                <li>
                  <Link
                    href="/jobs"
                    className="hover:text-white transition-colors"
                  >
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/resources"
                    className="hover:text-white transition-colors"
                  >
                    Resources
                  </Link>
                </li>
                <li>
                  <Link
                    href="/scholarships"
                    className="hover:text-white transition-colors"
                  >
                    Scholarships
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    href="/help"
                    className="hover:text-white transition-colors"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-white transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} FreeFoundry. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
