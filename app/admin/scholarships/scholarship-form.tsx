"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RichTextEditor } from "@/components/rich-text-editor";
import {
  ArrowLeft,
  Save,
  Eye,
  Upload,
  X,
  Plus,
  DollarSign,
  GraduationCap,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { toast } from "react-toastify";

export default function ScholarshipForm({
  mode,
  scholarship,
}: {
  mode: "new" | "edit";
  scholarship?: any;
}) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // === STATE SETUP ===
  const [title, setTitle] = useState(scholarship?.title || "");
  const [provider, setProvider] = useState(scholarship?.provider || "");
  const [description, setDescription] = useState(
    scholarship?.description || ""
  );
  const [amount, setAmount] = useState(scholarship?.amount || "");
  const [currency, setCurrency] = useState(scholarship?.currency || "USD");
  const [type, setType] = useState(scholarship?.type || "");
  const [level, setLevel] = useState(scholarship?.level || "");
  const [field, setField] = useState(scholarship?.field || "");
  const [location, setLocation] = useState(scholarship?.location || "");
  const [country, setCountry] = useState(scholarship?.country || "");
  const [applicationUrl, setApplicationUrl] = useState(
    scholarship?.applicationUrl || ""
  );
  const [applicationDeadline, setApplicationDeadline] = useState(
    scholarship?.applicationDeadline || ""
  );
  const [numberOfAwards, setNumberOfAwards] = useState(
    scholarship?.numberOfAwards?.toString() || ""
  );
  const [gpaRequirement, setGpaRequirement] = useState(
    scholarship?.gpaRequirement || ""
  );
  const [ageLimit, setAgeLimit] = useState(scholarship?.ageLimit || "");
  const [featured, setFeatured] = useState(scholarship?.featured || false);
  const [renewable, setRenewable] = useState(scholarship?.renewable || false);
  const [tags, setTags] = useState<string[]>(scholarship?.tags || []);
  const [newTag, setNewTag] = useState("");
  const [eligibility, setEligibility] = useState<string[]>(
    scholarship?.eligibility?.length ? scholarship.eligibility : [""]
  );
  const [requirements, setRequirements] = useState<string[]>(
    scholarship?.requirements?.length ? scholarship.requirements : [""]
  );
  const [benefits, setBenefits] = useState<string[]>(
    scholarship?.benefits?.length ? scholarship.benefits : [""]
  );
  const [status, setStatus] = useState(scholarship?.status || "draft");
  const [featuredImage, setFeaturedImage] = useState(
    scholarship?.featuredImage || ""
  );
  const [uploading, setUploading] = useState(false);

  // Auto-sync location and country if one is filled
  const handleLocationChange = (value: string) => {
    setLocation(value);
    if (!country) setCountry(value);
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

  const handleCountryChange = (value: string) => {
    setCountry(value);
    if (!location) setLocation(value);
  };

  // === TAG HANDLERS ===
  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };
  const removeTag = (tagToRemove: string) =>
    setTags(tags.filter((tag) => tag !== tagToRemove));

  // === FILE UPLOAD ===

  // === GENERIC ARRAY HANDLERS ===
  const handleArrayUpdate = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    index: number,
    value: string
  ) => {
    setter((prev) => prev.map((item, i) => (i === index ? value : item)));
  };
  const handleArrayAdd = (
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => setter((prev) => [...prev, ""]);
  const handleArrayRemove = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    index: number
  ) => setter((prev) => prev.filter((_, i) => i !== index));

  // === SAVE HANDLER ===
  const handleSave = async (saveStatus: string) => {
    const scholarshipData = {
      title,
      provider,
      description,
      amount,
      currency,
      type,
      level,
      field,
      location,
      country,
      applicationUrl,
      applicationDeadline,
      numberOfAwards: Number.parseInt(numberOfAwards) || 0,
      gpaRequirement,
      ageLimit,
      featured,
      renewable,
      tags,
      eligibility: eligibility.filter((i) => i.trim()),
      requirements: requirements.filter((i) => i.trim()),
      benefits: benefits.filter((i) => i.trim()),
      featuredImage,
      status: saveStatus,
    };

    try {
      const res = await fetch(
        `/api/scholarships${mode === "edit" ? `/${scholarship._id}` : ""}`,
        {
          method: mode === "edit" ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(scholarshipData),
        }
      );

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to save scholarship");
      }

      toast.success(
        saveStatus === "draft"
          ? "Scholarship saved as draft"
          : mode === "edit"
          ? "Scholarship updated successfully"
          : "Scholarship published successfully"
      );
      router.push("/admin/scholarships");
    } catch (err: any) {
      console.error("  Save failed:", err);
      toast.error(err.message || "Failed to save scholarship");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img
              src="/freelogo.svg"
              alt="FreeFoundry Logo"
              className="w-full"
            />
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => handleSave("draft")}>
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
            <Button onClick={() => handleSave("published")}>
              Publish Scholarship
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/admin/scholarships">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Scholarships
          </Link>
        </Button>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* MAIN FORM */}
          <div className="lg:col-span-3 space-y-6">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Label>Scholarship Title *</Label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter scholarship title"
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Provider *</Label>
                    <Input
                      value={provider}
                      onChange={(e) => setProvider(e.target.value)}
                      placeholder="Organization or institution"
                    />
                  </div>
                  <div>
                    <Label>Application URL *</Label>
                    <Input
                      value={applicationUrl}
                      onChange={(e) => setApplicationUrl(e.target.value)}
                      placeholder="https://..."
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Location *</Label>
                    <Input
                      value={location}
                      onChange={(e) => handleLocationChange(e.target.value)}
                      placeholder="e.g., New York"
                    />
                  </div>
                  <div>
                    <Label>Country *</Label>
                    <Input
                      value={country}
                      onChange={(e) => handleCountryChange(e.target.value)}
                      placeholder="e.g., United States"
                    />
                  </div>
                </div>

                <Label>Description *</Label>
                <RichTextEditor
                  value={description}
                  onChange={setDescription}
                  placeholder="Write scholarship details..."
                />
              </CardContent>
            </Card>

            {/* Funding Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" /> Funding Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label>Funding Amount *</Label>
                    <Input
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="e.g., $25,000 or Full funding"
                    />
                  </div>
                  <div>
                    <Label>Currency</Label>
                    <Select value={currency} onValueChange={setCurrency}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Funding Type *</Label>
                    <Select value={type} onValueChange={setType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select funding type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Fully-funded">
                          Fully Funded
                        </SelectItem>
                        <SelectItem value="Partially-funded">
                          Partially Funded
                        </SelectItem>
                        <SelectItem value="Grant">Grant</SelectItem>
                        <SelectItem value="Seed-funding">
                          Seed Funding
                        </SelectItem>
                        <SelectItem value="Merit-based">Merit-Based</SelectItem>
                        <SelectItem value="Need-based">Need-Based</SelectItem>
                        <SelectItem value="Training-funded">
                          Training + Funding
                        </SelectItem>
                        <SelectItem value="Fellowship">Fellowship</SelectItem>
                        <SelectItem value="Stipend">Stipend</SelectItem>
                        <SelectItem value="Scholarship">Scholarship</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Academic */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" /> Academic Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Level *</Label>
                    <Select value={level} onValueChange={setLevel}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Secondary">
                          Secondary / High School
                        </SelectItem>
                        <SelectItem value="Undergraduate">
                          Undergraduate
                        </SelectItem>
                        <SelectItem value="Postgraduate">
                          Postgraduate (Master’s)
                        </SelectItem>
                        <SelectItem value="PhD">PhD / Doctoral</SelectItem>
                        <SelectItem value="Postdoctoral">
                          Postdoctoral
                        </SelectItem>
                        <SelectItem value="Diploma">
                          Diploma / Certificate
                        </SelectItem>
                        <SelectItem value="Professional">
                          Professional / Executive
                        </SelectItem>
                        <SelectItem value="Non-degree">
                          Non-Degree / Entrepreneurship
                        </SelectItem>
                        <SelectItem value="All-levels">All Levels</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Field *</Label>
                    <Input
                      value={field}
                      onChange={(e) => setField(e.target.value)}
                      placeholder="e.g., Engineering, Arts"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Eligibility */}
            <Card>
              <CardHeader>
                <CardTitle>Eligibility Criteria</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* SMART PASTE BOX */}
                <div>
                  <Label>Paste Multiple Eligibility Criteria</Label>
                  <textarea
                    className="w-full min-h-[120px] rounded-md border p-2 text-sm"
                    placeholder={`Paste multiple lines here, e.g.
Must be a citizen of an African country
Must be at least 18 years old
Must have a business idea`}
                    onBlur={(e) =>
                      parseMultilineInput(e.target.value, setEligibility)
                    }
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Tip: Each line becomes a separate eligibility item
                  </p>
                </div>

                <Separator />

                {/* INDIVIDUAL EDITABLE ITEMS */}
                {eligibility.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={item}
                      onChange={(e) =>
                        handleArrayUpdate(setEligibility, index, e.target.value)
                      }
                      placeholder="Enter eligibility requirement"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleArrayRemove(setEligibility, index)}
                      disabled={eligibility.length === 1}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                <Button
                  variant="outline"
                  onClick={() => handleArrayAdd(setEligibility)}
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Eligibility
                </Button>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Application Requirements</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* SMART PASTE */}
                <div>
                  <Label>Paste Multiple Requirements</Label>
                  <textarea
                    className="w-full min-h-[120px] rounded-md border p-2 text-sm"
                    placeholder={`Paste multiple lines here, e.g.
Completed application form
Business proposal
Valid ID or passport`}
                    onBlur={(e) =>
                      parseMultilineInput(e.target.value, setRequirements)
                    }
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Each line will be converted into a separate requirement
                  </p>
                </div>

                <Separator />

                {/* EDITABLE LIST */}
                {requirements.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={item}
                      onChange={(e) =>
                        handleArrayUpdate(
                          setRequirements,
                          index,
                          e.target.value
                        )
                      }
                      placeholder="Enter application requirement"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleArrayRemove(setRequirements, index)}
                      disabled={requirements.length === 1}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                <Button
                  variant="outline"
                  onClick={() => handleArrayAdd(setRequirements)}
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Requirement
                </Button>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
  <CardHeader>
    <CardTitle>Benefits & Coverage</CardTitle>
  </CardHeader>

  <CardContent className="space-y-4">
    {/* SMART PASTE */}
    <div>
      <Label>Paste Multiple Benefits</Label>
      <textarea
        className="w-full min-h-[120px] rounded-md border p-2 text-sm"
        placeholder={`Paste multiple lines here, e.g.
$5,000 seed funding
12 weeks business training
Access to mentorship network`}
        onBlur={(e) =>
          parseMultilineInput(e.target.value, setBenefits)
        }
      />
      <p className="text-xs text-muted-foreground mt-1">
        Each line will become a separate benefit item
      </p>
    </div>

    <Separator />

    {/* EDITABLE LIST */}
    {benefits.map((item, index) => (
      <div key={index} className="flex gap-2">
        <Input
          value={item}
          onChange={(e) =>
            handleArrayUpdate(setBenefits, index, e.target.value)
          }
          placeholder="Enter benefit"
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleArrayRemove(setBenefits, index)}
          disabled={benefits.length === 1}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    ))}

    <Button
      variant="outline"
      onClick={() => handleArrayAdd(setBenefits)}
    >
      <Plus className="h-4 w-4 mr-2" /> Add Benefit
    </Button>
  </CardContent>
</Card>

          </div>

          {/* SIDEBAR */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Publish</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* <Label>Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select> */}

                <Label>Application Deadline *</Label>
                <Input
                  type="date"
                  value={applicationDeadline}
                  onChange={(e) => setApplicationDeadline(e.target.value)}
                />

                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={featured}
                    onCheckedChange={(checked) => setFeatured(checked === true)}
                  />
                  <Label>Featured Scholarship</Label>
                </div>

                <Separator />

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Eye className="h-4 w-4 mr-2" /> Preview
                  </Button>
                  <Button
                    onClick={() => handleSave("published")}
                    className="flex-1"
                  >
                    Publish
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Featured Image */}
            <Card>
              <CardHeader>
                <CardTitle>Featured Image</CardTitle>
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
                      <X className="h-4 w-4 mr-1" /> Remove Image
                    </Button>
                  </div>
                ) : (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      id="featuredImageInput"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;

                        if (file.size > 5 * 1024 * 1024) {
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
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add tag"
                    onKeyPress={(e) => e.key === "Enter" && addTag()}
                  />
                  <Button onClick={addTag} size="sm">
                    Add
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {tag}
                      <button onClick={() => removeTag(tag)} className="ml-1">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
