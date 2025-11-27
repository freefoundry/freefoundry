import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Course } from "@/lib/types";

const platformColors: Record<string, string> = {
  Udemy: "text-purple-600",
  Coursera: "text-blue-600",
  edX: "text-red-600",
  Pluralsight: "text-orange-600",
  Skillshare: "text-green-600",
  "LinkedIn Learning": "text-sky-600",
  Codecademy: "text-indigo-600",
  freeCodeCamp: "text-emerald-600",
  "Khan Academy": "text-teal-600",
  YouTube: "text-rose-600",
  Other: "text-gray-600",
};

export function CourseCard({ course }: { course: any }) {
  const isExpired =
    course.expiryDate && new Date(course.expiryDate) < new Date();

  return (
    <Card
      key={course.id}
      className="overflow-hidden hover:shadow-lg transition-shadow"
    >
      {/* Cover Image */}
      <div className="relative">
        <img
          src={course.image || "/placeholder.svg"}
          alt={course.title}
          className="w-full h-48 object-cover"
        />

        {/* Status Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {(course.isPopular === 1 || course.isPopular === true) && (
            <Badge className="bg-blue-600">Popular</Badge>
          )}
          {(course.isNew === 1 || course.isNew === true) && (
            <Badge className="bg-green-600">New</Badge>
          )}
          {(course.isTrending === 1 || course.isTrending === true) && (
            <Badge className="bg-purple-600">Trending</Badge>
          )}
        </div>

        {/* Platform Badge */}
        {course.platform && (
          <div className="absolute top-3 right-3 bg-white rounded px-2 py-1">
            <span
              className={`text-xs font-medium ${
                platformColors[course.platform] || platformColors.Other
              }`}
            >
              {course.platform}
            </span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <CardContent className="p-5">
        {/* Title & Instructor */}
        <h3 className="font-semibold text-lg mb-1 line-clamp-2">
          {course.title}
        </h3>
        {course.instructor && (
          <p className="text-sm text-gray-600 mb-2">
            by {course.instructor?.name || course.instructor}
          </p>
        )}

        {/* Description */}
        {course.description && (
          <p
            className="text-gray-600 text-sm mb-4 line-clamp-2"
            dangerouslySetInnerHTML={{ __html: course.description }}
          />
        )}

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
          {course.rating && (
            <div className="flex items-center">
              <Star className="h-3 w-3 text-yellow-400 mr-1 fill-current" />
              {course.rating}
            </div>
          )}
          {course.students && (
            <div className="flex items-center">
              <Users className="h-3 w-3 mr-1" />
              {course.students.toLocaleString()}
            </div>
          )}
          {course.duration && (
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {course.duration}
            </div>
          )}
        </div>

        {/* Tags */}
        {course.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {course.tags.slice(0, 3).map((tag: string) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Price + Button */}
        <div className="flex items-center justify-between">
          <div>
            <span className="font-semibold text-green-600">
              {course.price === "0.00" || course.price === "Free"
                ? "Free"
                : "$" +  course.price}
            </span>
            {course.originalPrice && (
              <span className="text-xs text-gray-500 line-through ml-2">
                {"$" + course.originalPrice}
              </span>
            )}
            {course.expiryDate && (
              <p
                className={`text-xs mt-1 ${
                  isExpired ? "text-red-600 font-semibold" : "text-orange-600"
                }`}
              >
                {isExpired
                  ? "Expired"
                  : `Until ${new Date(course.expiryDate).toLocaleDateString()}`}
              </p>
            )}
          </div>

          <Link href={`/courses/${course.id}`}>
            <Button size="sm">View Course</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
