"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
  Building,
  Settings,
  Tag,
  ImageIcon,
} from "lucide-react";
import { RichTextEditor } from "@/components/rich-text-editor";
import Link from "next/link";
import { toast } from "react-toastify";

export default function JobForm({
  mode,
  job,
}: {
  mode: "new" | "edit";
  job?: any;
}) {
  const router = useRouter();

  // States with defaults from `job` if editing
  // General post fields
  const [title, setTitle] = useState(job?.title || "");
  const [content, setContent] = useState(job?.fullDescription || "");
  const [excerpt, setExcerpt] = useState(job?.excerpt || "");
  const [slug, setSlug] = useState(job?.slug || "");
  const [status, setStatus] = useState(job?.status || "draft");
  const [visibility, setVisibility] = useState(job?.visibility || "public");
  const [publishDate, setPublishDate] = useState(job?.publishDate || "");
  const [featuredImage, setFeaturedImage] = useState(job?.featuredImage || "");
  const [tags, setTags] = useState<string[]>(job?.tags || []);
  const [newTag, setNewTag] = useState("");

  // Job-specific fields
  const [company, setCompany] = useState(job?.company || "");
  const [location, setLocation] = useState(job?.location || "");
  const [type, setType] = useState(job?.type || "");
  const [workMode, setWorkMode] = useState(job?.workMode || "");
  const [experience, setExperience] = useState(job?.experience || "");
  const [salary, setSalary] = useState(job?.salary || "");
  const [salaryType, setSalaryType] = useState(job?.salaryType || "yearly");
  const [platform, setPlatform] = useState(job?.platform || "");
  const [companyLogo, setCompanyLogo] = useState(job?.companyLogo || "");
  const [applicationUrl, setApplicationUrl] = useState(
    job?.applicationUrl || ""
  );
  const [featured, setFeatured] = useState(job?.featured || false);
  const [urgent, setUrgent] = useState(job?.urgent || false);

  // Arrays
  const [requirements, setRequirements] = useState<string[]>(
    job?.requirements || []
  );
  const [newRequirement, setNewRequirement] = useState("");
  const [benefits, setBenefits] = useState<string[]>(job?.benefits || []);
  const [newBenefit, setNewBenefit] = useState("");
  const [responsibilities, setResponsibilities] = useState<string[]>(
    job?.responsibilities || []
  );
  const [newResponsibility, setNewResponsibility] = useState("");

  // Qualifications
  const [qualifications, setQualifications] = useState<string[]>(
    job?.qualifications || []
  );
  const [newQualification, setNewQualification] = useState("");

  // Nice To Have
  const [niceToHave, setNiceToHave] = useState<string[]>(job?.niceToHave || []);
  const [newNiceToHave, setNewNiceToHave] = useState("");

  // Company Info
  const [companyDescription, setCompanyDescription] = useState(
    job?.companyDescription || ""
  );
  const [industry, setIndustry] = useState(job?.industry || "");
  const [companySize, setCompanySize] = useState(job?.companySize || "");
  const [founded, setFounded] = useState(job?.founded || "");
  const [website, setWebsite] = useState(job?.website || "");
  const [culture, setCulture] = useState<string[]>(job?.culture || []);
  const [newCulture, setNewCulture] = useState("");

  // Application Process
  const [applicationSteps, setApplicationSteps] = useState<string[]>(
    job?.applicationSteps || []
  );
  const [newStep, setNewStep] = useState("");
  const [timeline, setTimeline] = useState(job?.timeline || "");
  const [contactEmail, setContactEmail] = useState(job?.contactEmail || "");
  const [contactPhone, setContactPhone] = useState(job?.contactPhone || "");
  const [contactRecruiter, setContactRecruiter] = useState(
    job?.contactRecruiter || ""
  );
  const [currency, setCurrency] = useState(job?.currency || "NGN");

  // Slug editing
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

  const addBenefit = () => {
    if (newBenefit.trim() && !benefits.includes(newBenefit.trim())) {
      setBenefits([...benefits, newBenefit.trim()]);
      setNewBenefit("");
    }
  };

  const removeBenefit = (benefitToRemove: string) => {
    setBenefits(benefits.filter((benefit) => benefit !== benefitToRemove));
  };

  const addResponsibility = () => {
    if (
      newResponsibility.trim() &&
      !responsibilities.includes(newResponsibility.trim())
    ) {
      setResponsibilities([...responsibilities, newResponsibility.trim()]);
      setNewResponsibility("");
    }
  };

  const removeResponsibility = (respToRemove: string) => {
    setResponsibilities(
      responsibilities.filter((resp) => resp !== respToRemove)
    );
  };
  useEffect(() => {
    const stored = localStorage.getItem("previewJob");
    if (stored) {
      const jobData = JSON.parse(stored);

      // Restore only if form is empty (avoid overwriting while editing)
      if (!title && jobData.title) setTitle(jobData.title);
      if (!slug && jobData.slug) setSlug(jobData.slug);
      if (!content && jobData.fullDescription)
        setContent(jobData.fullDescription);
      if (!excerpt && jobData.excerpt) setExcerpt(jobData.excerpt);

      if (!company && jobData.company) setCompany(jobData.company);
      if (!location && jobData.location) setLocation(jobData.location);
      if (!type && jobData.type) setType(jobData.type);
      if (!workMode && jobData.workMode) setWorkMode(jobData.workMode);
      if (!experience && jobData.experience) setExperience(jobData.experience);
      if (!salary && jobData.salary) setSalary(jobData.salary);
      if (!platform && jobData.platform) setPlatform(jobData.platform);

      setTags(jobData.tags || []);
      setRequirements(jobData.requirements || []);
      setBenefits(jobData.benefits || []);
      setResponsibilities(jobData.responsibilities || []);
      setQualifications(jobData.qualifications || []);
      setNiceToHave(jobData.niceToHave || []);
      setCulture(jobData.companyInfo?.culture || []);
      setApplicationSteps(jobData.applicationProcess?.steps || []);
      setTimeline(jobData.applicationProcess?.timeline || "");
      setContactEmail(jobData.applicationProcess?.contact?.email || "");
      setContactPhone(jobData.applicationProcess?.contact?.phone || "");
      setContactRecruiter(jobData.applicationProcess?.contact?.recruiter || "");
    }
  }, []);
  const handleSave = async (saveType: "draft" | "publish" | "preview") => {
    const todayDate = () => {
      const d = new Date();

      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      const hh = String(d.getHours()).padStart(2, "0");
      const mi = String(d.getMinutes()).padStart(2, "0");
      const ss = String(d.getSeconds()).padStart(2, "0");

      return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
    };
    const normalizeDateForClient = (date: any) => {
      if (!date) return null;
      return new Date(date).toISOString().split("T")[0];
    };

    const jobData = {
      slug,
      title,
      company,
      location,
      type,
      workMode,
      experience,
      salary,
      currency,
      salaryType,
      description: excerpt,
      fullDescription: content,
      excerpt,
      requirements,
      benefits,
      responsibilities,
      postedDate: job?.postedDate || todayDate(),
      platform,
      companyLogo, // can be URL or base64
      applicationUrl,
      featured,
      urgent,
      tags,
      status:
        saveType === "publish"
          ? "published"
          : saveType === "preview"
          ? "preview"
          : "draft",
      visibility,
      publishDate: publishDate || null,
      qualifications,
      niceToHave,
      companyInfo: {
        name: company,
        description: companyDescription,
        industry,
        size: companySize,
        founded,
        website,
        logo: companyLogo,
        culture,
      },
      applicationProcess: {
        steps: applicationSteps,
        timeline,
        contact: {
          email: contactEmail,
          phone: contactPhone,
          recruiter: contactRecruiter,
        },
      },
      similarJobs: [],
      views: 0,
      applications: 0,
      lastUpdated: todayDate(),
    };

    if (saveType === "preview") {
      localStorage.setItem("previewJob", JSON.stringify(jobData));
      router.push("/admin/jobs/preview");
      return;
    }

    try {
      const res = await fetch(
        `/api/jobs${mode === "edit" ? `/${job.id}` : ""}`,
        {
          method: mode === "edit" ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(jobData),
        }
      );
      if (!res.ok) throw new Error("Failed to save job");
      toast.success(
        saveType === "draft"
          ? "Job saved as draft"
          : mode === "edit"
          ? "Job updated successfully"
          : "Job published successfully"
      );
      router.push("/admin/jobs");
    } catch (e) {
      console.error("  Save failed:", e);
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
                href="/admin/jobs"
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 text-sm sm:text-base"
              >
                <Building className="h-5 w-5" />
                <span>← Back to Jobs</span>
              </Link>
              <div className="hidden sm:block h-6 w-px bg-gray-300" />
              <h1 className="text-lg sm:text-xl font-semibold">Add New Job</h1>
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
                      placeholder="Enter job title here"
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
                      <span className="text-blue-600">
                        freefoundry.com/jobs/{slug}
                      </span>
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
                  <Building className="h-5 w-5 mr-2" />
                  Job Description
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

            {/* Job Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Job Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Company name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g., San Francisco, CA"
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Job Type</Label>
                    <Select value={type} onValueChange={setType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="freelance">Freelance</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="workMode">Work Mode</Label>
                    <Select value={workMode} onValueChange={setWorkMode}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select work mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="remote">Remote</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                        <SelectItem value="on-site">On-site</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="experience">Experience Level</Label>
                    <Select value={experience} onValueChange={setExperience}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="entry-level">Entry Level</SelectItem>
                        <SelectItem value="1-2 years">0-2 years</SelectItem>
                        <SelectItem value="3-5 years">3-5 years</SelectItem>
                        <SelectItem value="5+ years">6-8 years</SelectItem>
                        <SelectItem value="10+ years">8+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="platform">Platform</Label>
                    <Select value={platform} onValueChange={setPlatform}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                        <SelectItem value="indeed">Indeed</SelectItem>
                        <SelectItem value="glassdoor">Glassdoor</SelectItem>
                        <SelectItem value="monster">Monster</SelectItem>
                        <SelectItem value="ziprecruiter">
                          ZipRecruiter
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="salary">Salary Range</Label>

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
                        id="salary"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                        placeholder="80,000 - 120,000"
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="salaryType">Salary Type</Label>
                    <Select value={salaryType} onValueChange={setSalaryType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yearly">Yearly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="hourly">Hourly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="companyLogo">Company Logo URL</Label>
                    <Input
                      id="companyLogo"
                      value={companyLogo}
                      onChange={(e) => setCompanyLogo(e.target.value)}
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="applicationUrl">Application URL</Label>
                    <Input
                      id="applicationUrl"
                      value={applicationUrl}
                      onChange={(e) => setApplicationUrl(e.target.value)}
                      placeholder="https://..."
                    />
                  </div>
                </div>

                {/* Job Flags */}
                <div>
                  <Label className="text-base font-medium">Job Flags</Label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="featured"
                        checked={featured}
                        onCheckedChange={(checked) =>
                          setFeatured(checked === true)
                        }
                      />
                      <Label htmlFor="featured">Featured Job</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="urgent"
                        checked={urgent}
                        onCheckedChange={(checked) =>
                          setUrgent(checked === true)
                        }
                      />
                      <Label htmlFor="urgent">Urgent Hiring</Label>
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

            {/* Responsibilities */}
            <Card>
              <CardHeader>
                <CardTitle>Responsibilities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <Input
                      value={newResponsibility}
                      onChange={(e) => setNewResponsibility(e.target.value)}
                      placeholder="Add a responsibility..."
                      onKeyPress={(e) =>
                        e.key === "Enter" && addResponsibility()
                      }
                    />
                    <Button onClick={addResponsibility}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {responsibilities.map((resp, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded"
                      >
                        <span className="text-sm">{resp}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeResponsibility(resp)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle>Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <Input
                      value={newBenefit}
                      onChange={(e) => setNewBenefit(e.target.value)}
                      placeholder="Add a benefit..."
                      onKeyPress={(e) => e.key === "Enter" && addBenefit()}
                    />
                    <Button onClick={addBenefit}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {benefits.map((benefit, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded"
                      >
                        <span className="text-sm">{benefit}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeBenefit(benefit)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Qualification */}
            {/* <Card>
              <CardHeader>
                <CardTitle>Qualifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2 mb-4">
                  <Input
                    value={newQualification}
                    onChange={(e) => setNewQualification(e.target.value)}
                    placeholder="Add a qualification..."
                    onKeyPress={(e) =>
                      e.key === "Enter" &&
                      setQualifications([...qualifications, newQualification])
                    }
                  />
                  <Button
                    onClick={() => {
                      if (newQualification.trim()) {
                        setQualifications([
                          ...qualifications,
                          newQualification,
                        ]);
                        setNewQualification("");
                      }
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {qualifications.map((q, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded"
                    >
                      <span className="text-sm">{q}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setQualifications(
                            qualifications.filter((item) => item !== q)
                          )
                        }
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card> */}

            {/* Nice To Have */}
            <Card>
              <CardHeader>
                <CardTitle>Nice To Have</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2 mb-4">
                  <Input
                    value={newNiceToHave}
                    onChange={(e) => setNewNiceToHave(e.target.value)}
                    placeholder="Add a nice-to-have skill..."
                    onKeyPress={(e) =>
                      e.key === "Enter" &&
                      setNiceToHave([...niceToHave, newNiceToHave])
                    }
                  />
                  <Button
                    onClick={() => {
                      if (newNiceToHave.trim()) {
                        setNiceToHave([...niceToHave, newNiceToHave]);
                        setNewNiceToHave("");
                      }
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {niceToHave.map((n, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded"
                    >
                      <span className="text-sm">{n}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setNiceToHave(niceToHave.filter((item) => item !== n))
                        }
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Company Info */}
            <Card>
              <CardHeader>
                <CardTitle>Company Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Industry"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                />
                <Input
                  placeholder="Company Size"
                  value={companySize}
                  onChange={(e) => setCompanySize(e.target.value)}
                />
                <Input
                  placeholder="Founded"
                  value={founded}
                  onChange={(e) => setFounded(e.target.value)}
                />
                <Input
                  placeholder="Website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
                <Textarea
                  placeholder="Company Description"
                  value={companyDescription}
                  onChange={(e) => setCompanyDescription(e.target.value)}
                />

                {/* Culture list */}
                <div>
                  <div className="flex space-x-2 mb-2">
                    <Input
                      value={newCulture}
                      onChange={(e) => setNewCulture(e.target.value)}
                      placeholder="Add culture value..."
                      onKeyPress={(e) =>
                        e.key === "Enter" &&
                        setCulture([...culture, newCulture])
                      }
                    />
                    <Button
                      onClick={() => {
                        if (newCulture.trim()) {
                          setCulture([...culture, newCulture]);
                          setNewCulture("");
                        }
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {culture.map((c, i) => (
                      <Badge key={i} variant="secondary">
                        {c}
                        <button
                          onClick={() =>
                            setCulture(culture.filter((item) => item !== c))
                          }
                        >
                          <X className="h-3 w-3 ml-1" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Application Process */}
            <Card>
              <CardHeader>
                <CardTitle>Application Process</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Timeline</Label>
                  <Input
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    placeholder="e.g., 2-3 weeks"
                  />
                </div>
                <div className="flex space-x-2 mb-2">
                  <Input
                    value={newStep}
                    onChange={(e) => setNewStep(e.target.value)}
                    placeholder="Add process step..."
                    onKeyPress={(e) =>
                      e.key === "Enter" &&
                      setApplicationSteps([...applicationSteps, newStep])
                    }
                  />
                  <Button
                    onClick={() => {
                      if (newStep.trim()) {
                        setApplicationSteps([...applicationSteps, newStep]);
                        setNewStep("");
                      }
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {applicationSteps.map((s, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded"
                    >
                      <span className="text-sm">{s}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setApplicationSteps(
                            applicationSteps.filter((item) => item !== s)
                          )
                        }
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <Input
                    placeholder="Contact Email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                  />
                  <Input
                    placeholder="Contact Phone"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                  />
                  <Input
                    placeholder="Recruiter Name"
                    value={contactRecruiter}
                    onChange={(e) => setContactRecruiter(e.target.value)}
                  />
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
                Company Logo
              </CardTitle>
            </CardHeader>
            <CardContent>
              {companyLogo ? (
                <div className="space-y-2">
                  <img
                    src={companyLogo || "/placeholder.svg"}
                    alt="Company Logo"
                    className="w-full h-32 object-cover rounded border"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCompanyLogo("")}
                    className="w-full"
                  >
                    Remove Logo
                  </Button>
                </div>
              ) : (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    id="companyLogoInput"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;

                      if (file.size > 5 * 1024 * 1024) {
                        alert("Image must be less than 5MB");
                        return;
                      }

                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setCompanyLogo(reader.result as string); // base64 string
                      };
                      reader.readAsDataURL(file);
                    }}
                  />
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() =>
                      document.getElementById("companyLogoInput")?.click()
                    }
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Company Logo
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
                placeholder="Write a short job summary..."
                className="text-sm"
                rows={3}
              />
              <p className="text-xs text-gray-500 mt-2">
                Excerpts are optional hand-crafted summaries of your job
                listing.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
