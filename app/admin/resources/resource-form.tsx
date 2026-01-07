"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import {
  Save,
  Eye,
  Upload,
  X,
  Plus,
  Calendar,
  FileText,
  Settings,
  Tag,
  ImageIcon,
  Download,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { RichTextEditor } from "@/components/rich-text-editor";

export default function ResourceForm({
  mode = "create",
  resource,
}: {
  mode?: "create" | "edit";
  resource?: any;
}) {
  const router = useRouter();

  const [title, setTitle] = useState(resource?.title || "");
  const [content, setContent] = useState(resource?.content || "");
  const [excerpt, setExcerpt] = useState(resource?.excerpt || "");
  const [slug, setSlug] = useState(resource?.slug || "");
  const [status, setStatus] = useState(resource?.status || "draft");
  const [visibility, setVisibility] = useState(
    resource?.visibility || "public"
  );
  const [publishDate, setPublishDate] = useState(resource?.publishDate || "");
  const [featuredImage, setFeaturedImage] = useState(
    resource?.featuredImage || ""
  );
  const [tags, setTags] = useState<string[]>(resource?.tags || []);
  const [newTag, setNewTag] = useState("");

  const [type, setType] = useState(resource?.type || "");
  const [category, setCategory] = useState(resource?.category || "");
  const [author, setAuthor] = useState(resource?.author || "");
  const [downloadUrl, setDownloadUrl] = useState(resource?.downloadUrl || "");
  const [fileSize, setFileSize] = useState(resource?.fileSize || "");
  const [fileFormat, setFileFormat] = useState(resource?.fileFormat || "");
  const [difficulty, setDifficulty] = useState(resource?.difficulty || "");
  const [estimatedTime, setEstimatedTime] = useState(
    resource?.estimatedTime || ""
  );
  const [price, setPrice] = useState(resource?.price || "");
  const [originalPrice, setOriginalPrice] = useState(
    resource?.originalPrice || ""
  );
  const [isFeatured, setIsFeatured] = useState(!!resource?.isFeatured);
  const [isPopular, setIsPopular] = useState(!!resource?.isPopular);

  const [requirements, setRequirements] = useState<string[]>(
    resource?.requirements || []
  );
  const [newRequirement, setNewRequirement] = useState("");
  const [features, setFeatures] = useState<string[]>(resource?.features || []);
  const [newFeature, setNewFeature] = useState("");
  const [whatYouWillGet, setWhatYouWillGet] = useState<string[]>(
    resource?.whatYouWillGet || []
  );
  const [newWhatYouWillGet, setNewWhatYouWillGet] = useState("");

  // Slug generator
  const generateSlug = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();

  const handleTitleChange = (val: string) => {
    setTitle(val);
    setSlug(generateSlug(val));
  };

  // List manipulation helpers
  const addItem = (
    item: string,
    list: string[],
    setter: any,
    newValSetter: any
  ) => {
    if (item.trim() && !list.includes(item.trim())) {
      setter([...list, item.trim()]);
      newValSetter("");
    }
  };
  const removeItem = (target: string, list: string[], setter: any) =>
    setter(list.filter((x) => x !== target));

  // Save Handler
  const handleSave = async (saveType: "draft" | "publish" | "preview") => {
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }
    if (!content.trim()) {
      toast.error("Content is required");
      return;
    }
    const resourceData = {
      title,
      content,
      excerpt,
      slug,
      status: saveType === "publish" ? "published" : saveType,
      visibility,
      publishDate,
      featuredImage,
      tags,
      type,
      category,
      author,
      downloadUrl,
      fileSize,
      fileFormat,
      difficulty,
      estimatedTime,
      price,
      originalPrice,
      isFeatured,
      isPopular,
      requirements,
      features,
      whatYouWillGet,
    };

    if (saveType === "preview") {
      console.log("Preview:", resourceData);
      toast.info("Preview mode not yet implemented.");
      return;
    }

    try {
      const res = await fetch(
        mode === "edit" ? `/api/resources/${resource._id}` : "/api/resources",
        {
          method: mode === "edit" ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(resourceData),
        }
      );

      if (!res.ok) throw new Error("Failed to save resource");

      toast.success(
        mode === "edit"
          ? "Resource updated successfully"
          : saveType === "draft"
          ? "Resource saved as draft"
          : "Resource published successfully"
      );
      router.push("/admin/resources");
    } catch (error: any) {
      toast.error("Error saving resource: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link
                href="/admin/resources"
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 text-sm sm:text-base"
              >
                <FileText className="h-5 w-5" />
                <span>← Back to Resources</span>
              </Link>
              <div className="hidden sm:block h-6 w-px bg-gray-300" />
              <h1 className="text-lg sm:text-xl font-semibold">
                {mode === "edit" ? "Edit Resource" : "Add New Resource"}
              </h1>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSave("preview")}
                className="flex-1 sm:flex-none"
              >
                <Eye className="h-4 w-4 mr-1" />
                Preview
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSave("draft")}
                className="flex-1 sm:flex-none"
              >
                <Save className="h-4 w-4 mr-1" />
                Save Draft
              </Button>
              <Button
                size="sm"
                onClick={() => handleSave("publish")}
                className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700"
              >
                Publish
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row">
        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Title */}
            <Card>
              <CardContent className="p-6">
                <Input
                  placeholder="Enter resource title..."
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="text-2xl font-semibold border-none p-0 focus-visible:ring-0"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Permalink:{" "}
                  <span className="text-blue-600">
                    freefoundry.com/resources/{slug}
                  </span>
                </p>
              </CardContent>
            </Card>

            {/* Content */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Resource Content
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RichTextEditor
                  value={content}
                  onChange={setContent}
                  placeholder="Write your resource content here..."
                
                />
              </CardContent>
            </Card>

            {/* Resource Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Resource Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Type</Label>
                    <Select value={type} onValueChange={setType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ebook">eBook</SelectItem>
                        <SelectItem value="template">Template</SelectItem>
                        <SelectItem value="guide">Guide</SelectItem>
                        <SelectItem value="course">Course</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Category</Label>
                    <Input
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder="e.g., Web Development"
                    />
                  </div>
                  <div>
                    <Label>Author</Label>
                    <Input
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="Author name"
                    />
                  </div>
                  <div>
                    <Label>Difficulty</Label>
                    <Select value={difficulty} onValueChange={setDifficulty}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">
                          Intermediate
                        </SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Estimated Time</Label>
                    <Input
                      value={estimatedTime}
                      onChange={(e) => setEstimatedTime(e.target.value)}
                      placeholder="e.g., 2 hours"
                    />
                  </div>
                  <div>
                    <Label>Download URL</Label>
                    <Input
                      value={downloadUrl}
                      onChange={(e) => setDownloadUrl(e.target.value)}
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <Label>File Size</Label>
                    <Input
                      value={fileSize}
                      onChange={(e) => setFileSize(e.target.value)}
                      placeholder="2.5 MB"
                    />
                  </div>
                  <div>
                    <Label>File Format</Label>
                    <Input
                      value={fileFormat}
                      onChange={(e) => setFileFormat(e.target.value)}
                      placeholder="PDF, ZIP..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <Input
                    placeholder="Original Price"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                  />
                </div>

                <div>
                  <Label>Flags</Label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="featured"
                        checked={isFeatured}
                        onCheckedChange={(checked) =>
                          setIsFeatured(checked === true)
                        }
                      />
                      <Label htmlFor="featured">Featured</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="popular"
                        checked={isPopular}
                        onCheckedChange={(checked) =>
                          setIsPopular(checked === true)
                        }
                      />
                      <Label htmlFor="popular">Popular</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Requirements / Features / What You’ll Get */}
            {[
              {
                label: "Requirements",
                list: requirements,
                newVal: newRequirement,
                setter: setRequirements,
                newSetter: setNewRequirement,
              },
              {
                label: "Features",
                list: features,
                newVal: newFeature,
                setter: setFeatures,
                newSetter: setNewFeature,
              },
              {
                label: "What You’ll Get",
                list: whatYouWillGet,
                newVal: newWhatYouWillGet,
                setter: setWhatYouWillGet,
                newSetter: setNewWhatYouWillGet,
              },
            ].map(({ label, list, newVal, setter, newSetter }) => (
              <Card key={label}>
                <CardHeader>
                  <CardTitle>{label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex space-x-2">
                      <Input
                        value={newVal}
                        onChange={(e) => newSetter(e.target.value)}
                        placeholder={`Add ${label.toLowerCase()}...`}
                        onKeyDown={(e) =>
                          e.key === "Enter" &&
                          addItem(newVal, list, setter, newSetter)
                        }
                      />
                      <Button
                        onClick={() => addItem(newVal, list, setter, newSetter)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {list.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between bg-gray-50 rounded p-2"
                        >
                          <span className="text-sm">{item}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item, list, setter)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-80 bg-white border-l p-6 space-y-6">
          {/* Publish */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-sm">
                <Calendar className="h-4 w-4 mr-2" /> Publish
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="pending">Pending Review</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Visibility</Label>
                <Select value={visibility} onValueChange={setVisibility}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                    <SelectItem value="password">Password Protected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Publish Date</Label>
                <Input
                  type="datetime-local"
                  value={publishDate}
                  onChange={(e) => setPublishDate(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Featured Image */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-sm">
                <ImageIcon className="h-4 w-4 mr-2" /> Featured Image
              </CardTitle>
            </CardHeader>
            <CardContent>
              {featuredImage ? (
                <div className="space-y-2">
                  <img
                    src={featuredImage}
                    alt="Featured"
                    className="w-full h-32 object-cover rounded"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFeaturedImage("")}
                  >
                    Remove Image
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() =>
                    document.getElementById("featuredImageInput")?.click()
                  }
                >
                  <Upload className="h-4 w-4 mr-2" /> Upload Image
                </Button>
              )}
              <input
                id="featuredImageInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onloadend = () =>
                    setFeaturedImage(reader.result as string);
                  reader.readAsDataURL(file);
                }}
              />
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-sm">
                <Tag className="h-4 w-4 mr-2" /> Tags
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add tag..."
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    addItem(newTag, tags, setTags, setNewTag)
                  }
                />
                <Button
                  size="sm"
                  onClick={() => addItem(newTag, tags, setTags, setNewTag)}
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-1">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                    <button
                      onClick={() => removeItem(tag, tags, setTags)}
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Excerpt */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Excerpt</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Write a short summary..."
                rows={3}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
