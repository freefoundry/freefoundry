"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, MessageCircle, Mail, HelpCircle } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

interface FAQItem {
  id: number;
  category: string;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: 1,
    category: "General",
    question: "What is FreeFoundry?",
    answer:
      "FreeFoundry is a platform that connects students, self-learners, and professionals to high-quality free courses, jobs, scholarships, and learning resources. Our mission is to democratize education and career opportunities by providing access to premium content without any financial barriers.",
  },
  {
    id: 2,
    category: "General",
    question: "Is FreeFoundry free to use?",
    answer:
      "Yes — FreeFoundry is completely free. There are no paywalls or hidden fees. All courses, jobs, scholarships, and resources are accessible at no cost. We believe everyone deserves access to quality learning opportunities regardless of their financial situation.",
  },
  {
    id: 3,
    category: "General",
    question: "Who is FreeFoundry for?",
    answer:
      "FreeFoundry is built for anyone looking to learn new skills, grow professionally, or access opportunities — regardless of their experience level. This includes secondary and tertiary students, self-taught developers, tech learners, career switchers, and anyone seeking free educational resources.",
  },
  {
    id: 4,
    category: "General",
    question: "How often are resources updated?",
    answer:
      "We update our resources regularly to keep opportunities relevant and useful. Our team continuously curates new courses, job postings, scholarships, and learning materials. You can expect fresh content added multiple times per week across all categories.",
  },
  {
    id: 5,
    category: "Courses",
    question: "Where do the courses come from?",
    answer:
      "Our courses are primarily sourced from platforms like Udemy and Coursera. We curate free courses that are regularly offered by these platforms. We use automated expiry detection to ensure you never miss a free course offer before it expires.",
  },
  {
    id: 6,
    category: "Courses",
    question: "Are the courses legitimate?",
    answer:
      "Yes, all courses on FreeFoundry are from legitimate educational platforms. We only feature courses from well-established platforms like Udemy and Coursera, which are recognized globally for quality education.",
  },
  {
    id: 7,
    category: "Jobs",
    question: "Where can I apply for jobs posted on FreeFoundry?",
    answer:
      "Each job posting on FreeFoundry includes a direct link to the original job posting on platforms like LinkedIn or Indeed. Simply click the 'Apply' button on the job detail page to proceed with the application on the original platform.",
  },
  {
    id: 8,
    category: "Jobs",
    question: "Are job postings verified?",
    answer:
      "We source job postings from established job boards like LinkedIn and Indeed. However, we recommend verifying company information and following safe job application practices before sharing personal or financial information.",
  },
  {
    id: 9,
    category: "Scholarships",
    question: "How do I apply for scholarships?",
    answer:
      "Each scholarship listing includes complete information about eligibility criteria and application procedures. You can find the application link and deadline on the scholarship detail page. Follow the official application process through the scholarship provider's website.",
  },
  {
    id: 10,
    category: "Scholarships",
    question: "Are scholarships available for international students?",
    answer:
      "Yes, FreeFoundry features both domestic and international scholarships. We curate opportunities from around the world, including scholarships specifically for international students. Use our filters to find scholarships that match your location and eligibility.",
  },
  {
    id: 11,
    category: "Account",
    question: "Do I need to create an account to browse resources?",
    answer:
      "No account is required at the moment. You can browse all our resources freely. Account features such as bookmarking resources, saving job applications, setting scholarship alerts, and personalizing your experience are coming soon.",
  },
  {
    id: 12,
    category: "Account",
    question: "Is my personal information secure?",
    answer:
      "Since account creation is not available yet, we do not collect or store personal information at this time. When accounts are introduced, we will ensure your data is encrypted, stored securely, and never shared without your consent. A full Privacy Policy will be available then.",
  },

  {
    id: 13,
    category: "Support",
    question: "How can I report a broken link or outdated information?",
    answer:
      "We appreciate your help in keeping our platform up to date. If you find a broken link or outdated information, please email us directly at support@freefoundry.com with the details.",
  },
  {
    id: 14,
    category: "Support",
    question: "Can I suggest resources for FreeFoundry?",
    answer:
      "Yes! We welcome community suggestions. If you’d like to recommend a free and legitimate resource, please send the details to support@freefoundry.com. Our team will review it for relevance and quality.",
  },
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    ...Array.from(new Set(faqs.map((faq) => faq.category))),
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory =
      selectedCategory === "All" || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEF4FF] via-white to-[#EEF4FF]">
      {/* Header */}
    <Header showSearch />
    

      {/* Hero Section */}
      <section className="py-16 px-4 text-center">
        <div className="container mx-auto max-w-3xl">
          <div className="mb-6 inline-flex items-center justify-center w-14 h-14 bg-blue-100 rounded-full">
            <HelpCircle className="h-7 w-7 text-blue-600" />
          </div>
          <h1 className="text-2xl md:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text:lg md:text-xl text-gray-600 mb-8">
            Find answers to common questions about FreeFoundry, our services,
            and how to get the most out of our platform.
          </p>

          {/* Search Bar */}
          <div className="relative mb-2 md:mb-8">
            <Input
              type="search"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-4 mb-2 md:mb-8">
        <div className="container mx-auto w-full md:max-w-3xl">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-all text-sm ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white border border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Items */}
      <section className="py-12 px-4 mb-16">
        <div className="container mx-auto max-w-3xl">
          {filteredFaqs.length > 0 ? (
            <div className="space-y-4">
              {filteredFaqs.map((faq) => (
                <Card
                  key={faq.id}
                  className="border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <button
                    onClick={() =>
                      setExpandedId(expandedId === faq.id ? null : faq.id)
                    }
                    className="w-full px-6 py-5 flex items-start justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="text-left flex-1">
                      <div className="text-md md:text-xs font-medium text-blue-600 mb-1 uppercase tracking-wide">
                        {faq.category}
                      </div>
                      <h3 className="text-sm md:text-lg font-semibold text-gray-900 text-balance">
                        {faq.question}
                      </h3>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 text-gray-600 flex-shrink-0 ml-4 transition-transform ${
                        expandedId === faq.id ? "transform rotate-180" : ""
                      }`}
                    />
                  </button>

                  {expandedId === faq.id && (
                    <CardContent className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg mb-4">
                No FAQs found matching your search.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Still Have Questions Section */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Can't find the answer you're looking for? Get in touch with our
            support team.
          </p>

          <div className="grid gap-6">
            {/* <Card className="bg-white/10 border border-white/20 hover:bg-white/20 transition-colors cursor-pointer">
              <CardContent className="p-6 text-white">
                <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-4 mx-auto">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
                <p className="text-blue-100 mb-4">
                  Chat with our support team in real-time
                </p>
                <Link
                  href="#"
                  className="text-blue-100 hover:text-white font-medium"
                >
                  Start Chat →
                </Link>
              </CardContent>
            </Card> */}

            <Card className="bg-white/10 border border-white/20 hover:bg-white/20 transition-colors cursor-pointer">
              <CardContent className="p-6 text-white">
                <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-4 mx-auto">
                  <Mail className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Email Support</h3>
                <p className="text-blue-100 mb-4">
                  Send us an email and we'll get back to you shortly
                </p>
                <a
                  href="mailto:support@freefoundry.com"
                  className="text-blue-100 hover:text-white font-medium"
                >
                  support@freefoundry.com
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
