import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Calendar, Tag, Globe, PenTool, FileText } from "lucide-react";
import { Resource } from "@/lib/types";

function typeIcon(t: string) {
  if (t === "Website") return <Globe className="h-4 w-4" />;
  if (t === "Tool") return <PenTool className="h-4 w-4" />;
  if (t === "PDF") return <FileText className="h-4 w-4" />;
  return <Globe className="h-4 w-4" />;
}

export function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={resource.image || "/placeholder.svg"}
          alt={resource.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {resource.featured && <Badge className="bg-blue-600">Featured</Badge>}
          <Badge variant="secondary" className="bg-white text-gray-700">
            {typeIcon(resource.type)}
            <span className="ml-1">{resource.type}</span>
          </Badge>
        </div>
        <div className="absolute top-3 right-3 bg-white rounded-full p-2">
          <div className="flex items-center">
            <Star className="h-3 w-3 text-yellow-400 fill-current" />
            <span className="text-xs font-medium ml-1">{resource.rating}</span>
          </div>
        </div>
      </div>

      <CardContent className="p-5">
        <div className="mb-3">
          <h3 className="font-semibold text-lg mb-1 line-clamp-1">
            {resource.title}
          </h3>
          <p className="text-sm text-blue-600">{resource.category}</p>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {resource.description}
        </p>

        <div className="flex flex-wrap gap-1 mb-4">
          {resource.tags.slice(0, 3).map((t) => (
            <Badge key={t} variant="outline" className="text-xs">
              <Tag className="h-2 w-2 mr-1" />
              {t}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs text-gray-500">
            <Calendar className="h-3 w-3 mr-1" />{" "}
            {new Date(resource.dateAdded).toLocaleDateString()}
          </div>
          <Button size="sm" asChild>
            <a href={resource.url} target="_blank" rel="noopener noreferrer">
              {resource.type === "PDF" ? "Download" : "Visit"}
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
