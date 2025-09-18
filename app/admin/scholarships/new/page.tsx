"use client";

import { useState } from "react";
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

export default function NewScholarshipPage() {
  const [title, setTitle] = useState("");
  const [provider, setProvider] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [type, setType] = useState("");
  const [level, setLevel] = useState("");
  const [field, setField] = useState("");
  const [location, setLocation] = useState("");
  const [country, setCountry] = useState("");
  const [applicationUrl, setApplicationUrl] = useState("");
  const [applicationDeadline, setApplicationDeadline] = useState("");
  const [numberOfAwards, setNumberOfAwards] = useState("");
  const [gpaRequirement, setGpaRequirement] = useState("");
  const [ageLimit, setAgeLimit] = useState("");
  const [featured, setFeatured] = useState(false);
  const [renewable, setRenewable] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [eligibility, setEligibility] = useState<string[]>([""]);
  const [requirements, setRequirements] = useState<string[]>([""]);
  const [benefits, setBenefits] = useState<string[]>([""]);
  const [status, setStatus] = useState("draft");

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const addEligibilityItem = () => {
    setEligibility([...eligibility, ""]);
  };

  const updateEligibilityItem = (index: number, value: string) => {
    const updated = [...eligibility];
    updated[index] = value;
    setEligibility(updated);
  };

  const removeEligibilityItem = (index: number) => {
    setEligibility(eligibility.filter((_, i) => i !== index));
  };

  const addRequirementItem = () => {
    setRequirements([...requirements, ""]);
  };

  const updateRequirementItem = (index: number, value: string) => {
    const updated = [...requirements];
    updated[index] = value;
    setRequirements(updated);
  };

  const removeRequirementItem = (index: number) => {
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  const addBenefitItem = () => {
    setBenefits([...benefits, ""]);
  };

  const updateBenefitItem = (index: number, value: string) => {
    const updated = [...benefits];
    updated[index] = value;
    setBenefits(updated);
  };

  const removeBenefitItem = (index: number) => {
    setBenefits(benefits.filter((_, i) => i !== index));
  };

  const handleSave = (saveStatus: string) => {
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
      eligibility: eligibility.filter((item) => item.trim()),
      requirements: requirements.filter((item) => item.trim()),
      benefits: benefits.filter((item) => item.trim()),
      status: saveStatus,
    };

    console.log("Saving scholarship:", scholarshipData);
    // Here you would typically send the data to your API
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/admin/scholarships">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Scholarships
          </Link>
        </Button>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Scholarship Title *</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter scholarship title"
                    className="mt-1"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="provider">Provider *</Label>
                    <Input
                      id="provider"
                      value={provider}
                      onChange={(e) => setProvider(e.target.value)}
                      placeholder="Organization or institution"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="applicationUrl">Application URL *</Label>
                    <Input
                      id="applicationUrl"
                      value={applicationUrl}
                      onChange={(e) => setApplicationUrl(e.target.value)}
                      placeholder="https://..."
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <RichTextEditor
                    value={description}
                    onChange={setDescription}
                    placeholder="Write a detailed description of the scholarship..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Funding Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Funding Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="amount">Funding Amount *</Label>
                    <Input
                      id="amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="e.g., $25,000 or Full funding"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="currency">Currency</Label>
                    <Select value={currency} onValueChange={setCurrency}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                        <SelectItem value="CAD">CAD (C$)</SelectItem>
                        <SelectItem value="AUD">AUD (A$)</SelectItem>
                        <SelectItem value="NGN">NGN (₦)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="type">Funding Type *</Label>
                    <Select value={type} onValueChange={setType}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full">Full Funding</SelectItem>
                        <SelectItem value="Partial">Partial Funding</SelectItem>
                        <SelectItem value="Merit-based">Merit-based</SelectItem>
                        <SelectItem value="Need-based">Need-based</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="numberOfAwards">Number of Awards</Label>
                    <Input
                      id="numberOfAwards"
                      type="number"
                      value={numberOfAwards}
                      onChange={(e) => setNumberOfAwards(e.target.value)}
                      placeholder="e.g., 100"
                      className="mt-1"
                    />
                  </div>
                  <div className="flex items-center space-x-2 mt-6">
                    <Checkbox
                      id="renewable"
                      checked={renewable}
                      onCheckedChange={(checked) =>
                        setRenewable(checked === true)
                      }
                    />
                    <Label htmlFor="renewable">Renewable scholarship</Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Academic Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Academic Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="level">Education Level *</Label>
                    <Select value={level} onValueChange={setLevel}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="High School">High School</SelectItem>
                        <SelectItem value="Undergraduate">
                          Undergraduate
                        </SelectItem>
                        <SelectItem value="Graduate">Graduate</SelectItem>
                        <SelectItem value="PhD">PhD</SelectItem>
                        <SelectItem value="Postdoctoral">
                          Postdoctoral
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="field">Field of Study *</Label>
                    <Input
                      id="field"
                      value={field}
                      onChange={(e) => setField(e.target.value)}
                      placeholder="e.g., Engineering, Any Field"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="gpaRequirement">GPA Requirement</Label>
                    <Input
                      id="gpaRequirement"
                      value={gpaRequirement}
                      onChange={(e) => setGpaRequirement(e.target.value)}
                      placeholder="e.g., 3.5/4.0, First Class"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ageLimit">Age Limit</Label>
                    <Input
                      id="ageLimit"
                      value={ageLimit}
                      onChange={(e) => setAgeLimit(e.target.value)}
                      placeholder="e.g., Under 35"
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Location Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Study Location *</Label>
                    <Input
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g., United Kingdom, Multiple Countries"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="country">Country Code</Label>
                    <Input
                      id="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="e.g., UK, USA, EU"
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Eligibility Criteria */}
            <Card>
              <CardHeader>
                <CardTitle>Eligibility Criteria</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {eligibility.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={item}
                      onChange={(e) =>
                        updateEligibilityItem(index, e.target.value)
                      }
                      placeholder="Enter eligibility requirement"
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeEligibilityItem(index)}
                      disabled={eligibility.length === 1}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" onClick={addEligibilityItem}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Eligibility Requirement
                </Button>
              </CardContent>
            </Card>

            {/* Application Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Application Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {requirements.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={item}
                      onChange={(e) =>
                        updateRequirementItem(index, e.target.value)
                      }
                      placeholder="Enter application requirement"
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeRequirementItem(index)}
                      disabled={requirements.length === 1}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" onClick={addRequirementItem}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Application Requirement
                </Button>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle>Benefits & Coverage</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {benefits.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={item}
                      onChange={(e) => updateBenefitItem(index, e.target.value)}
                      placeholder="Enter benefit or coverage"
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeBenefitItem(index)}
                      disabled={benefits.length === 1}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" onClick={addBenefitItem}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Benefit
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish */}
            <Card>
              <CardHeader>
                <CardTitle>Publish</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="applicationDeadline">
                    Application Deadline *
                  </Label>
                  <Input
                    id="applicationDeadline"
                    type="date"
                    value={applicationDeadline}
                    onChange={(e) => setApplicationDeadline(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="featured"
                    checked={featured}
                    onCheckedChange={(checked) => setFeatured(checked === true)}
                  />
                  <Label htmlFor="featured">Featured scholarship</Label>
                </div>

                <Separator />

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
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
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">
                    Upload scholarship image
                  </p>
                  <Button variant="outline" size="sm">
                    Choose File
                  </Button>
                </div>
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
