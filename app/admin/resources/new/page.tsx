"use client";

import { useState } from "react";
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
import Link from "next/link";

export default function NewResourcePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [slug, setSlug] = useState("");
  const [status, setStatus] = useState("draft");
  const [visibility, setVisibility] = useState("public");
  const [publishDate, setPublishDate] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  // Resource-specific fields
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [fileFormat, setFileFormat] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isPopular, setIsPopular] = useState(false);
  const [requirements, setRequirements] = useState<string[]>([]);
  const [newRequirement, setNewRequirement] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState("");
  const [whatYouWillGet, setWhatYouWillGet] = useState<string[]>([]);
  const [newWhatYouWillGet, setNewWhatYouWillGet] = useState("");

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!slug) {
      setSlug(generateSlug(value));
    }
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const addRequirement = () => {
    if (
      newRequirement.trim() &&
      !requirements.includes(newRequirement.trim())
    ) {
      setRequirements([...requirements, newRequirement.trim()]);
      setNewRequirement("");
    }
  };

  const removeRequirement = (reqToRemove: string) => {
    setRequirements(requirements.filter((req) => req !== reqToRemove));
  };

  const addFeature = () => {
    if (newFeature.trim() && !features.includes(newFeature.trim())) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature("");
    }
  };

  const removeFeature = (featureToRemove: string) => {
    setFeatures(features.filter((feature) => feature !== featureToRemove));
  };

  const addWhatYouWillGet = () => {
    if (
      newWhatYouWillGet.trim() &&
      !whatYouWillGet.includes(newWhatYouWillGet.trim())
    ) {
      setWhatYouWillGet([...whatYouWillGet, newWhatYouWillGet.trim()]);
      setNewWhatYouWillGet("");
    }
  };

  const removeWhatYouWillGet = (itemToRemove: string) => {
    setWhatYouWillGet(whatYouWillGet.filter((item) => item !== itemToRemove));
  };

  const handleSave = (saveType: "draft" | "publish" | "preview") => {
    const resourceData = {
      title,
      content,
      excerpt,
      slug,
      status:
        saveType === "publish"
          ? "published"
          : saveType === "preview"
          ? "preview"
          : "draft",
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

    console.log(`Saving resource as ${saveType}:`, resourceData);
    // Here you would typically send the data to your API
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            {/* Left side: back + title */}
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
                Add New Resource
              </h1>
            </div>

            {/* Right side: actions */}
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
                <div className="space-y-4">
                  <div>
                    <Input
                      placeholder="Enter resource title here"
                      value={title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      className="text-2xl font-semibold border-none p-0 focus-visible:ring-0 placeholder:text-gray-400"
                    />
                  </div>
                  <div className="text-sm text-gray-500">
                    Permalink:{" "}
                    <span className="text-blue-600">
                      freefoundry.com/resources/{slug || "resource-slug"}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-2 h-auto p-0 text-blue-600"
                    >
                      Edit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Content Editor */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Resource Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RichTextEditor
                  value={content}
                  onChange={setContent}
                  placeholder="Write your resource description here..."
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
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type">Resource Type</Label>
                    <Select value={type} onValueChange={setType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="guide">Guide</SelectItem>
                        <SelectItem value="ebook">eBook</SelectItem>
                        <SelectItem value="template">Template</SelectItem>
                        <SelectItem value="cheat-sheet">Cheat Sheet</SelectItem>
                        <SelectItem value="checklist">Checklist</SelectItem>
                        <SelectItem value="tool">Tool</SelectItem>
                        <SelectItem value="course">Course</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="web-development">
                          Web Development
                        </SelectItem>
                        <SelectItem value="data-science">
                          Data Science
                        </SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="programming">Programming</SelectItem>
                        <SelectItem value="devops">DevOps</SelectItem>
                        <SelectItem value="mobile">Mobile</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="Author name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="difficulty">Difficulty Level</Label>
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
                        <SelectItem value="all-levels">All Levels</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="estimatedTime">Estimated Time</Label>
                    <Input
                      id="estimatedTime"
                      value={estimatedTime}
                      onChange={(e) => setEstimatedTime(e.target.value)}
                      placeholder="e.g., 30 minutes"
                    />
                  </div>
                  <div>
                    <Label htmlFor="downloadUrl">Download URL</Label>
                    <Input
                      id="downloadUrl"
                      value={downloadUrl}
                      onChange={(e) => setDownloadUrl(e.target.value)}
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="fileSize">File Size</Label>
                    <Input
                      id="fileSize"
                      value={fileSize}
                      onChange={(e) => setFileSize(e.target.value)}
                      placeholder="e.g., 2.5 MB"
                    />
                  </div>
                  <div>
                    <Label htmlFor="fileFormat">File Format</Label>
                    <Select value={fileFormat} onValueChange={setFileFormat}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="docx">DOCX</SelectItem>
                        <SelectItem value="pptx">PPTX</SelectItem>
                        <SelectItem value="xlsx">XLSX</SelectItem>
                        <SelectItem value="zip">ZIP</SelectItem>
                        <SelectItem value="mp4">MP4</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="Free or $29"
                    />
                  </div>
                </div>

                {/* Resource Flags */}
                <div>
                  <Label className="text-base font-medium">
                    Resource Flags
                  </Label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="featured"
                        checked={isFeatured}
                        onCheckedChange={(checked) =>
                          setIsFeatured(checked === true)
                        }
                      />
                      <Label htmlFor="featured">Featured Resource</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="popular"
                        checked={isPopular}
                        onCheckedChange={(checked) =>
                          setIsPopular(checked === true)
                        }
                      />
                      <Label htmlFor="popular">Popular Resource</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <Input
                      value={newRequirement}
                      onChange={(e) => setNewRequirement(e.target.value)}
                      placeholder="Add a requirement..."
                      onKeyPress={(e) => e.key === "Enter" && addRequirement()}
                    />
                    <Button onClick={addRequirement}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {requirements.map((req, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded"
                      >
                        <span className="text-sm">{req}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeRequirement(req)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <Input
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      placeholder="Add a key feature..."
                      onKeyPress={(e) => e.key === "Enter" && addFeature()}
                    />
                    <Button onClick={addFeature}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded"
                      >
                        <span className="text-sm">{feature}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFeature(feature)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* What You'll Get */}
            <Card>
              <CardHeader>
                <CardTitle>What You'll Get</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <Input
                      value={newWhatYouWillGet}
                      onChange={(e) => setNewWhatYouWillGet(e.target.value)}
                      placeholder="Add what users will get..."
                      onKeyPress={(e) =>
                        e.key === "Enter" && addWhatYouWillGet()
                      }
                    />
                    <Button onClick={addWhatYouWillGet}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {whatYouWillGet.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded"
                      >
                        <span className="text-sm">{item}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeWhatYouWillGet(item)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-80 bg-white border-l p-6 space-y-6">
          {/* Publish */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-sm">
                <Calendar className="h-4 w-4 mr-2" />
                Publish
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="status" className="text-sm">
                  Status
                </Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="mt-1">
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
                <Label htmlFor="visibility" className="text-sm">
                  Visibility
                </Label>
                <Select value={visibility} onValueChange={setVisibility}>
                  <SelectTrigger className="mt-1">
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
                <Label htmlFor="publishDate" className="text-sm">
                  Publish Date
                </Label>
                <Input
                  id="publishDate"
                  type="datetime-local"
                  value={publishDate}
                  onChange={(e) => setPublishDate(e.target.value)}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Featured Image */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-sm">
                <ImageIcon className="h-4 w-4 mr-2" />
                Featured Image
              </CardTitle>
            </CardHeader>
            <CardContent>
              {featuredImage ? (
                <div className="space-y-2">
                  <img
                    src={featuredImage || "/placeholder.svg"}
                    alt="Featured"
                    className="w-full h-32 object-cover rounded border"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFeaturedImage("")}
                    className="w-full"
                  >
                    Remove Image
                  </Button>
                </div>
              ) : (
                <Button variant="outline" className="w-full bg-transparent">
                  <Upload className="h-4 w-4 mr-2" />
                  Set Featured Image
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Download File */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-sm">
                <Download className="h-4 w-4 mr-2" />
                Resource File
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full bg-transparent">
                <Upload className="h-4 w-4 mr-2" />
                Upload Resource File
              </Button>
              <p className="text-xs text-gray-500 mt-2">
                Upload the main resource file (PDF, ZIP, etc.)
              </p>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-sm">
                <Tag className="h-4 w-4 mr-2" />
                Tags
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add tag..."
                  onKeyPress={(e) => e.key === "Enter" && addTag()}
                  className="text-sm"
                />
                <Button size="sm" onClick={addTag}>
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-1">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
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
                placeholder="Write a short description..."
                className="text-sm"
                rows={3}
              />
              <p className="text-xs text-gray-500 mt-2">
                Excerpts are optional hand-crafted summaries of your content.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
