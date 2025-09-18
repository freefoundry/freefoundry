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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Save,
  Eye,
  Upload,
  X,
  Plus,
  Calendar,
  BookOpen,
  Settings,
  Tag,
  ImageIcon,
} from "lucide-react";
import Link from "next/link";
import { RichTextEditor } from "@/components/rich-text-editor";

export default function NewCoursePage() {
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

  // Course-specific fields
  const [platform, setPlatform] = useState("");
  const [instructor, setInstructor] = useState("");
  const [duration, setDuration] = useState("");
  const [level, setLevel] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [courseUrl, setCourseUrl] = useState("");
  const [rating, setRating] = useState("");
  const [students, setStudents] = useState("");
  const [isPopular, setIsPopular] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [isTrending, setIsTrending] = useState(false);
  const [requirements, setRequirements] = useState<string[]>([]);
  const [newRequirement, setNewRequirement] = useState("");
  const [whatYouWillLearn, setWhatYouWillLearn] = useState<string[]>([]);
  const [newLearning, setNewLearning] = useState("");
  const [isEditingSlug, setIsEditingSlug] = useState(false);

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

  const addLearning = () => {
    if (newLearning.trim() && !whatYouWillLearn.includes(newLearning.trim())) {
      setWhatYouWillLearn([...whatYouWillLearn, newLearning.trim()]);
      setNewLearning("");
    }
  };

  const removeLearning = (learningToRemove: string) => {
    setWhatYouWillLearn(
      whatYouWillLearn.filter((learning) => learning !== learningToRemove)
    );
  };

  const handleSave = (saveType: "draft" | "publish" | "preview") => {
    const courseData = {
      id: Date.now(), // temporary ID until backend assigns a real one
      slug,
      title,
      description: excerpt || content, // short description
      fullDescription: content, // full description / rich text
      excerpt,
      platform,
      instructor: {
        name: instructor,
        title: "", // you can expand later
        bio: "",
        rating: Number.parseFloat(rating) || 0,
        students: Number.parseInt(students) || 0,
        courses: 0,
        avatar: "",
      },
      rating: Number.parseFloat(rating) || 0,
      students: Number.parseInt(students) || 0,
      duration,
      level,
      category,
      tags,
      price: price || "Free",
      originalPrice,
      expiryDate: expiryDate || null,
      image: featuredImage,
      isPopular,
      isNew,
      isTrending,
      whatYouWillLearn,
      requirements,
      curriculum: [], // future: add curriculum builder
      reviews: [], // future: add review system
      relatedCourses: [], // future: add related courses
      status:
        saveType === "publish"
          ? "published"
          : saveType === "preview"
          ? "preview"
          : "draft",
      visibility,
      publishDate,
    };

    console.log(`Saving course as ${saveType}:`, courseData);

    // Example API call
    // await fetch("/api/courses", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(courseData),
    // });
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
                href="/admin/courses"
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 text-sm sm:text-base"
              >
                <BookOpen className="h-5 w-5" />
                <span>← Back to Courses</span>
              </Link>
              <div className="hidden sm:block h-6 w-px bg-gray-300" />
              <h1 className="text-lg sm:text-xl font-semibold">
                Add New Course
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
                      placeholder="Enter course title here"
                      value={title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      className="text-2xl font-semibold border-none p-0 focus-visible:ring-0 placeholder:text-gray-400"
                    />
                  </div>
                  <div className="text-sm text-gray-500">
                    Permalink:{" "}
                    {isEditingSlug ? (
                      <Input
                        value={slug}
                        onChange={(e) => setSlug(generateSlug(e.target.value))}
                      />
                    ) : (
                      <span>freefoundry.com/courses/{slug}</span>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-2 h-auto p-0 text-blue-600"
                      onClick={() => setIsEditingSlug(!isEditingSlug)}
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
                  <BookOpen className="h-5 w-5 mr-2" />
                  Course Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="visual" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="visual">Visual</TabsTrigger>
                    <TabsTrigger value="text">Text</TabsTrigger>
                  </TabsList>
                  <TabsContent value="visual" className="mt-4">
                    <RichTextEditor
                      value={content}
                      onChange={setContent}
                      placeholder="Write your comprehensive course description here. Include what students will learn, course structure, and any important details..."
                    />
                  </TabsContent>
                  <TabsContent value="text" className="mt-4">
                    <Textarea
                      placeholder="Enter HTML content..."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="min-h-[300px] font-mono text-sm"
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Course Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Course Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="platform">Platform</Label>
                    <Select value={platform} onValueChange={setPlatform}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="udemy">Udemy</SelectItem>
                        <SelectItem value="coursera">Coursera</SelectItem>
                        <SelectItem value="edx">edX</SelectItem>
                        <SelectItem value="khan-academy">
                          Khan Academy
                        </SelectItem>
                        <SelectItem value="freecodecamp">
                          freeCodeCamp
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="instructor">Instructor</Label>
                    <Input
                      id="instructor"
                      value={instructor}
                      onChange={(e) => setInstructor(e.target.value)}
                      placeholder="Instructor name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="programming">Programming</SelectItem>
                        <SelectItem value="web-development">
                          Web Development
                        </SelectItem>
                        <SelectItem value="data-science">
                          Data Science
                        </SelectItem>
                        <SelectItem value="machine-learning">
                          Machine Learning
                        </SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="level">Level</Label>
                    <Select value={level} onValueChange={setLevel}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
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
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      placeholder="e.g., 10 hours"
                    />
                  </div>
                  <div>
                    <Label htmlFor="courseUrl">Course URL</Label>
                    <Input
                      id="courseUrl"
                      value={courseUrl}
                      onChange={(e) => setCourseUrl(e.target.value)}
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="price">Current Price</Label>
                    <Input
                      id="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="Free or $99"
                    />
                  </div>
                  <div>
                    <Label htmlFor="originalPrice">Original Price</Label>
                    <Input
                      id="originalPrice"
                      value={originalPrice}
                      onChange={(e) => setOriginalPrice(e.target.value)}
                      placeholder="$199"
                    />
                  </div>
                  <div>
                    <Label htmlFor="expiryDate">Expiry Date (if free)</Label>
                    <Input
                      id="expiryDate"
                      type="date"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="rating">Rating</Label>
                    <Input
                      id="rating"
                      type="number"
                      min="0"
                      max="5"
                      step="0.1"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      placeholder="4.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="students">Number of Students</Label>
                    <Input
                      id="students"
                      type="number"
                      value={students}
                      onChange={(e) => setStudents(e.target.value)}
                      placeholder="1000"
                    />
                  </div>
                </div>

                {/* Course Flags */}
                <div>
                  <Label className="text-base font-medium">Course Flags</Label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="popular"
                        checked={isPopular}
                        onCheckedChange={(checked) =>
                          setIsPopular(checked === true)
                        }
                      />
                      <Label htmlFor="popular">Popular Course</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="new"
                        checked={isNew}
                        onCheckedChange={(checked) =>
                          setIsNew(checked === true)
                        }
                      />
                      <Label htmlFor="new">New Course</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="trending"
                        checked={isTrending}
                        onCheckedChange={(checked) =>
                          setIsTrending(checked === true)
                        }
                      />
                      <Label htmlFor="trending">Trending Course</Label>
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

            {/* What You'll Learn */}
            <Card>
              <CardHeader>
                <CardTitle>What You'll Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <Input
                      value={newLearning}
                      onChange={(e) => setNewLearning(e.target.value)}
                      placeholder="Add a learning outcome..."
                      onKeyPress={(e) => e.key === "Enter" && addLearning()}
                    />
                    <Button onClick={addLearning}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {whatYouWillLearn.map((learning, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded"
                      >
                        <span className="text-sm">{learning}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeLearning(learning)}
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
