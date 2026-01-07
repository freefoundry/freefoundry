"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  Briefcase,
  FileText,
  GraduationCap,
  Users,
  Plus,
  BarChart3,
  Settings,
  Bell,
  Download,
  Eye,
  ArrowRight,
  Activity,
  Target,
} from "lucide-react";

interface DashboardStats {
  courses: {
    total: number;
    published: number;
    draft: number;
    trending: number;
  };
  jobs: {
    total: number;
    active: number;
    expired: number;
    applications: number;
  };
  resources: {
    total: number;
    published: number;
    pending: number;
    downloads: number;
  };
  scholarships: {
    total: number;
    active: number;
    expired: number;
    applications: number;
  };
  users: { total: number; active: number; newThisMonth: number };
}

interface RecentActivity {
  id: string;
  type: "course" | "job" | "resource" | "scholarship";
  action: "created" | "updated" | "published" | "deleted";
  title: string;
  timestamp: string;
  user: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    courses: { total: 1247, published: 1156, draft: 91, trending: 23 },
    jobs: { total: 892, active: 743, expired: 149, applications: 3421 },
    resources: { total: 2156, published: 1987, pending: 169, downloads: 45231 },
    scholarships: { total: 456, active: 389, expired: 67, applications: 1876 },
    users: { total: 12543, active: 8932, newThisMonth: 234 },
  });

  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([
    {
      id: "1",
      type: "course",
      action: "published",
      title: "Advanced React Patterns",
      timestamp: "2 hours ago",
      user: "John Doe",
    },
    {
      id: "2",
      type: "scholarship",
      action: "created",
      title: "Google Developer Scholarship 2024",
      timestamp: "4 hours ago",
      user: "Sarah Wilson",
    },
    {
      id: "3",
      type: "job",
      action: "updated",
      title: "Senior Frontend Developer at TechCorp",
      timestamp: "6 hours ago",
      user: "Mike Johnson",
    },
    {
      id: "4",
      type: "resource",
      action: "published",
      title: "Complete Guide to TypeScript",
      timestamp: "8 hours ago",
      user: "Emily Chen",
    },
    {
      id: "5",
      type: "course",
      action: "created",
      title: "Machine Learning Fundamentals",
      timestamp: "1 day ago",
      user: "David Brown",
    },
  ]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "course":
        return <BookOpen className="h-4 w-4" />;
      case "job":
        return <Briefcase className="h-4 w-4" />;
      case "resource":
        return <FileText className="h-4 w-4" />;
      case "scholarship":
        return <GraduationCap className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getActivityColor = (action: string) => {
    switch (action) {
      case "created":
        return "bg-green-100 text-green-800";
      case "updated":
        return "bg-blue-100 text-blue-800";
      case "published":
        return "bg-purple-100 text-purple-800";
      case "deleted":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const [admin, setAdmin] = useState<{ name: string; role: string } | null>(
    null
  );

  useEffect(() => {
    const stored = localStorage.getItem("admin-user");
    if (stored) {
      setAdmin(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage your platform content and monitor performance
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Admin Info */}
              {admin && (
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {admin.name}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {admin.role.replace("-", " ")}
                  </p>
                </div>
              )}

              <Separator orientation="vertical" className="h-8" />

              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>

              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.users.total.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                +{stats.users.newThisMonth} new this month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Content
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(
                  stats.courses.total +
                  stats.jobs.total +
                  stats.resources.total +
                  stats.scholarships.total
                ).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                Across all categories
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Applications
              </CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(
                  stats.jobs.applications + stats.scholarships.applications
                ).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                Jobs & scholarships combined
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Downloads</CardTitle>
              <Download className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.resources.downloads.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                Resource downloads
              </p>
            </CardContent>
          </Card>
        </div> */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Navigation Cards */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Content Management
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Courses Card */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="h-6 w-6 text-blue-600" />
                      <CardTitle>Courses</CardTitle>
                    </div>
                    <Badge variant="secondary">{stats.courses.total}</Badge>
                  </div>
                  <CardDescription>
                    Manage learning courses and educational content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {/* <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Published</span>
                      <span className="font-medium">
                        {stats.courses.published}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Draft</span>
                      <span className="font-medium">{stats.courses.draft}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Trending</span>
                      <span className="font-medium text-green-600">
                        {stats.courses.trending}
                      </span>
                    </div> */}
                    <Separator />
                    <div className="flex space-x-2">
                      <Button asChild size="sm" className="flex-1">
                        <Link href="/admin/courses">
                          <Eye className="h-4 w-4 mr-2" />
                          View All
                        </Link>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent"
                      >
                        <Link href="/admin/courses/new">
                          <Plus className="h-4 w-4 mr-2" />
                          Add New
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Jobs Card */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Briefcase className="h-6 w-6 text-green-600" />
                      <CardTitle>Jobs</CardTitle>
                    </div>
                    <Badge variant="secondary">{stats.jobs.total}</Badge>
                  </div>
                  <CardDescription>
                    Manage job postings and career opportunities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {/* <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Active</span>
                      <span className="font-medium">{stats.jobs.active}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Expired</span>
                      <span className="font-medium">{stats.jobs.expired}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Applications</span>
                      <span className="font-medium text-blue-600">
                        {stats.jobs.applications}
                      </span>
                    </div> */}
                    <Separator />
                    <div className="flex space-x-2">
                      <Button asChild size="sm" className="flex-1">
                        <Link href="/admin/jobs">
                          <Eye className="h-4 w-4 mr-2" />
                          View All
                        </Link>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent"
                      >
                        <Link href="/admin/jobs/new">
                          <Plus className="h-4 w-4 mr-2" />
                          Add New
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Resources Card */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-6 w-6 text-purple-600" />
                      <CardTitle>Resources</CardTitle>
                    </div>
                    <Badge variant="secondary">{stats.resources.total}</Badge>
                  </div>
                  <CardDescription>
                    Manage learning resources and materials
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {/* <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Published</span>
                      <span className="font-medium">
                        {stats.resources.published}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Pending</span>
                      <span className="font-medium">
                        {stats.resources.pending}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Downloads</span>
                      <span className="font-medium text-purple-600">
                        {stats.resources.downloads.toLocaleString()}
                      </span>
                    </div> */}
                    <Separator />
                    <div className="flex space-x-2">
                      <Button asChild size="sm" className="flex-1">
                        <Link href="/admin/resources">
                          <Eye className="h-4 w-4 mr-2" />
                          View All
                        </Link>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent"
                      >
                        <Link href="/admin/resources/new">
                          <Plus className="h-4 w-4 mr-2" />
                          Add New
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Scholarships Card */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <GraduationCap className="h-6 w-6 text-orange-600" />
                      <CardTitle>Scholarships</CardTitle>
                    </div>
                    <Badge variant="secondary">
                      {stats.scholarships.total}
                    </Badge>
                  </div>
                  <CardDescription>
                    Manage scholarship opportunities and funding
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {/* <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Active</span>
                      <span className="font-medium">
                        {stats.scholarships.active}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Expired</span>
                      <span className="font-medium">
                        {stats.scholarships.expired}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Applications</span>
                      <span className="font-medium text-orange-600">
                        {stats.scholarships.applications}
                      </span>
                    </div> */}
                    <Separator />
                    <div className="flex space-x-2">
                      <Button asChild size="sm" className="flex-1">
                        <Link href="/admin/scholarships">
                          <Eye className="h-4 w-4 mr-2" />
                          View All
                        </Link>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent"
                      >
                        <Link href="/admin/scholarships/new">
                          <Plus className="h-4 w-4 mr-2" />
                          Add New
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Recent Activity */}
          {/* <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Recent Activity
            </h2>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Latest Updates</CardTitle>
                <CardDescription>
                  Recent changes across all content types
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start space-x-3"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          {getActivityIcon(activity.type)}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <Badge
                            variant="secondary"
                            className={`text-xs ${getActivityColor(
                              activity.action
                            )}`}
                          >
                            {activity.action}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {activity.type}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {activity.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          by {activity.user} • {activity.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Separator className="my-4" />
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent"
                >
                  View All Activity
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start bg-transparent"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Content
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start bg-transparent"
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Analytics
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start bg-transparent"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start bg-transparent"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Manage Users
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start bg-transparent"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Platform Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div> */}
        </div>
      </div>
    </div>
  );
}
