import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Star } from "lucide-react";
import { Course } from "@/lib/types";
import { Button } from "@/components/ui/button";

export function CourseCard({ course }: { course: Course }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={course.image || "/placeholder.svg"}
          alt={course.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {course.isPopular && <Badge className="bg-blue-600">Popular</Badge>}
          {course.isNew && <Badge className="bg-green-600">New</Badge>}
          {course.isTrending && (
            <Badge className="bg-purple-600">Trending</Badge>
          )}
        </div>
        <div className="absolute top-3 right-3 bg-white rounded px-2 py-1">
          <span
            className={`text-xs font-medium ${
              course.platform === "Udemy" ? "text-purple-600" : "text-blue-600"
            }`}
          >
            {course.platform}
          </span>
        </div>
      </div>

      <CardContent className="p-5">
        <div className="mb-3">
          <h3 className="font-semibold text-lg mb-1 line-clamp-2">
            {course.title}
          </h3>
          <p className="text-sm text-gray-600">by {course?.instructor}</p>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>

        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
          <div className="flex items-center">
            <Star className="h-3 w-3 text-yellow-400 mr-1 fill-current" />
            {course.rating}
          </div>
          <div className="flex items-center">
            <Users className="h-3 w-3 mr-1" />
            {course.students.toLocaleString()}
          </div>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {course.duration}
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {course.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="font-semibold text-green-600">{course.price}</span>
            {course.originalPrice && (
              <span className="text-xs text-gray-500 line-through ml-2">
                {course.originalPrice}
              </span>
            )}
            {course.expiryDate && (
              <p className="text-xs text-orange-600 mt-1">
                Until {new Date(course.expiryDate).toLocaleDateString()}
              </p>
            )}
          </div>
          <Button size="sm">View Course</Button>
        </div>
      </CardContent>
    </Card>
  );
}
