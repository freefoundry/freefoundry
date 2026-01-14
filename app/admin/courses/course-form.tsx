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
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function CourseForm({
  mode = "create",
  course,
}: {
  mode?: "create" | "edit";
  course?: any;
}) {
  const [title, setTitle] = useState(course?.title || "");
  const [content, setContent] = useState(course?.description || "");
  const [excerpt, setExcerpt] = useState(course?.excerpt || "");
  const [slug, setSlug] = useState(course?.slug || "");
  const [status, setStatus] = useState(course?.status || "draft");
  const [visibility, setVisibility] = useState(course?.visibility || "public");
  const [publishDate, setPublishDate] = useState(course?.publishDate || "");
  const [featuredImage, setFeaturedImage] = useState(course?.image || "");
  const [tags, setTags] = useState<string[]>(course?.tags || []);
  const [newTag, setNewTag] = useState("");
const [currency, setCurrency] = useState(course?.currency || "NGN");

  // Instructor fields
  const [instructorName, setInstructorName] = useState(
    course?.instructor?.name || ""
  );
  const [instructorTitle, setInstructorTitle] = useState(
    course?.instructor?.title || ""
  );
  const [instructorBio, setInstructorBio] = useState(
    course?.instructor?.bio || ""
  );
  const [instructorAvatar, setInstructorAvatar] = useState(
    course?.instructor?.avatar || ""
  );
  const [platform, setPlatform] = useState(course?.platform || "");

  const [certificate, setCertificate] = useState(course?.certificate || false);
  const [language, setLanguage] = useState(course?.language || "English");
  const [duration, setDuration] = useState(course?.duration || "");
  const [level, setLevel] = useState(course?.level || "");
  const [category, setCategory] = useState(course?.category || "");
  const [price, setPrice] = useState(course?.price || "");
  const [originalPrice, setOriginalPrice] = useState(
    course?.originalPrice || ""
  );
  const [expiryDate, setExpiryDate] = useState(course?.expiryDate || "");
  const [courseUrl, setCourseUrl] = useState(course?.courseUrl || "");
  const [rating, setRating] = useState(course?.rating?.toString() || "");
  const [students, setStudents] = useState(course?.students?.toString() || "");

  const [isPopular, setIsPopular] = useState(!!course?.isPopular);
  const [isNew, setIsNew] = useState(!!course?.isNew);
  const [isTrending, setIsTrending] = useState(!!course?.isTrending);

  const [requirements, setRequirements] = useState<string[]>(
    course?.requirements || []
  );
  const [newRequirement, setNewRequirement] = useState("");
  const [whatYouWillLearn, setWhatYouWillLearn] = useState<string[]>(
    course?.whatYouWillLearn || []
  );
  const [newLearning, setNewLearning] = useState("");

  const [isEditingSlug, setIsEditingSlug] = useState(false);

  const router = useRouter();

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
    setSlug(generateSlug(value));
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
const parseMultilineInput = (
  text: string,
  setter: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const items = text
    .split(/\n+/) // split by empty lines
    .map((line) =>
      line
        .replace(/^[-•*]\s*/, "") // remove bullets like -, •, *
        .trim()
    )
    .filter(Boolean);

  if (items.length) {
    setter(items);
  }
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

  const handleSave = async (saveType: "draft" | "publish" | "preview") => {
    const courseData = {
      slug,
      title,
      description: content || "No description available",
      excerpt,
      platform: platform,
      instructor: {
        name: instructorName,
        title: instructorTitle || "",
        bio: instructorBio || "",
        rating: Number.parseFloat(rating) || 0,
        students: Number.parseInt(students) || 0,
        courses: 0,
        avatar: instructorAvatar || "",
      },
      rating: Number.parseFloat(rating) || 0,
      students: Number.parseInt(students) || 0,
      duration: duration || "N/A",
      certificate,
      language,
      difficulty: level || "all-levels",
      category: category || "other",
      tags,
      price: price || "0",
      originalPrice: originalPrice || "0",
      expiryDate: expiryDate || null,
      image: featuredImage || "",
      isPopular,
      isNew,
      isTrending,
      outcomes: whatYouWillLearn,
      requirements,
      //  curriculum: [],
      //  reviews: [],
      //  relatedCourses: [],
      status:
        saveType === "publish"
          ? "published"
          : saveType === "preview"
          ? "preview"
          : "draft",
      visibility,
      publishDate: publishDate || null,
    };
    if (saveType === "preview") {
      // Open preview in new tab
    } else {
      try {
        const res = await fetch(
          mode === "edit" ? `/api/courses/${course.id}` : "/api/courses",
          {
            method: mode === "edit" ? "PUT" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(courseData),
          }
        );
        if (!res.ok) throw new Error("Failed to save course");

        toast.success(
          saveType === "draft"
            ? "Course save as draft"
            : mode === "edit"
            ? "Course updated successfully"
            : "Course published successfully"
        );
        router.push("/admin/courses");
      } catch (error: any) {
        toast.error("Error saving course: " + error.message);
      }
    }
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
                      <span>freefoundryh.com/courses/{slug}</span>
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
                        <SelectItem value="Udemy">Udemy</SelectItem>
                        <SelectItem value="Coursera">Coursera</SelectItem>
                        <SelectItem value="edX">edX</SelectItem>
                        <SelectItem value="Khan Academy">
                          Khan Academy
                        </SelectItem>
                        <SelectItem value="freeCodeCamp">
                          freeCodeCamp
                        </SelectItem>
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

                  <div>
                    <Label htmlFor="certificate">Certificate</Label>
                    <Select
                      onValueChange={(val) => setCertificate(val === "yes")}
                      defaultValue="no"
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/*  New Language field */}
                  <div>
                    <Label htmlFor="language">Language</Label>
                    <Input
                      id="language"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      placeholder="e.g., English"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="instructorName">Instructor Name</Label>
                    <Input
                      id="instructorName"
                      value={instructorName}
                      onChange={(e) => setInstructorName(e.target.value)}
                      placeholder="Instructor name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="instructorTitle">Instructor Title</Label>
                    <Input
                      id="instructorTitle"
                      value={instructorTitle}
                      onChange={(e) => setInstructorTitle(e.target.value)}
                      placeholder="e.g., Senior Web Developer"
                    />
                  </div>
                  <div>
                    <Label htmlFor="instructorBio">Instructor Bio</Label>
                    <Textarea
                      id="instructorBio"
                      value={instructorBio}
                      onChange={(e) => setInstructorBio(e.target.value)}
                      placeholder="Short bio"
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label htmlFor="instructorAvatar">
                      Instructor Avatar (URL)
                    </Label>
                    <Input
                      id="instructorAvatar"
                      value={instructorAvatar}
                      onChange={(e) => setInstructorAvatar(e.target.value)}
                      placeholder="https://example.com/avatar.jpg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="price">Current Price</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Select value={currency} onValueChange={setCurrency}>
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="NGN">NGN</SelectItem>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="EUR">EUR</SelectItem>
                          <SelectItem value="GBP">GBP</SelectItem>
                          <SelectItem value="INR">INR</SelectItem>
                          <SelectItem value="AUD">AUD</SelectItem>
                          <SelectItem value="CAD">CAD</SelectItem>
                        </SelectContent>
                      </Select>

                      <Input
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="0 or 4999"
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="originalPrice">Original Price</Label>
                    <Input
                      id="originalPrice"
                      value={originalPrice}
                      onChange={(e) => setOriginalPrice(e.target.value)}
                      placeholder="199"
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
                      onChange={(e) => {
                        const value = e.target.value;
                        setNewRequirement(value);
                        parseMultilineInput(value, setRequirements);
                      }}
                      placeholder="Paste multiple requirements here"
                      onBlur={(e) =>
                        parseMultilineInput(e.target.value, setRequirements)
                      } // Handle blur
                    />
                    <Button onClick={addRequirement}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {requirements?.map((req, index) => (
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
                      onChange={(e) => {
                        const value = e.target.value;
                        setNewLearning(value);
                        parseMultilineInput(value, setWhatYouWillLearn);
                      }}
                      placeholder="Paste multiple learning outcomes here"
                      onBlur={(e) =>
                        parseMultilineInput(e.target.value, setWhatYouWillLearn)
                      } // Handle blur
                    />
                    <Button onClick={addLearning}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {whatYouWillLearn?.map((learning, index) => (
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
                <>
                  {/* hidden input */}
                  <input
                    type="file"
                    accept="image/*"
                    id="featuredImageInput"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;

                      if (file.size > 5 * 1024 * 1024) {
                        // 5 MB
                        toast.error("Image must be less than 5MB");
                        return;
                      }

                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setFeaturedImage(reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    }}
                  />
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() =>
                      document.getElementById("featuredImageInput")?.click()
                    }
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Set Featured Image
                  </Button>
                </>
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
                {tags?.map((tag) => (
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
