"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Users, BookOpen, Briefcase } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <Badge variant="secondary" className="mb-4">
            About FreeFoundry
          </Badge>

          <h1 className="text-4xl font-bold mb-6">Learning Without Barriers</h1>

          <p className="text-gray-600 text-lg leading-relaxed">
            FreeFoundry is built to make quality education and opportunities
            accessible to everyone — without paywalls, hidden fees, or
            unnecessary complexity.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>

              <p className="text-gray-600 mb-6 leading-relaxed">
                At <strong>FreeFoundry</strong>, we believe that access to
                quality education and opportunities should never come with a
                price tag. Whether you’re a student taking your first steps, a
                self-learner building new skills, or a professional looking to
                stay competitive, we help you learn smarter — without paying a
                dime.
              </p>

              <p className="text-gray-600 mb-6 leading-relaxed">
                We carefully curate high-quality, free resources from trusted
                sources across the web, bringing you the best courses, job
                opportunities, scholarships, and learning materials in one
                easy-to-navigate platform.
              </p>

              <p className="text-gray-600 leading-relaxed">
                Our content is updated regularly to ensure you always have
                access to relevant and current opportunities.
              </p>
            </div>

            {/* Values */}
            <div className="bg-gray-50 rounded-2xl p-8 space-y-5">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-blue-600 w-6 h-6 mt-1" />
                <p className="text-gray-700">
                  100% free learning resources — always
                </p>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="text-blue-600 w-6 h-6 mt-1" />
                <p className="text-gray-700">No paywalls, no hidden fees</p>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="text-blue-600 w-6 h-6 mt-1" />
                <p className="text-gray-700">
                  Carefully curated from trusted sources
                </p>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="text-blue-600 w-6 h-6 mt-1" />
                <p className="text-gray-700">
                  Built for learners of all skill levels
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who It’s For */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Who FreeFoundry Is For
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 text-center">
              <Users className="w-10 h-10 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Students</h3>
              <p className="text-gray-600 text-sm">
                Access free courses, study materials, and scholarships to
                support your academic journey.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center">
              <BookOpen className="w-10 h-10 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Self-Learners</h3>
              <p className="text-gray-600 text-sm">
                Build new skills and explore knowledge without financial
                barriers.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center">
              <Briefcase className="w-10 h-10 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Professionals</h3>
              <p className="text-gray-600 text-sm">
                Stay competitive with up-to-date courses, tools, and job
                opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-6">
            Learn Smarter. Grow Faster. Pay Nothing.
          </h2>

          <p className="text-gray-600 leading-relaxed">
            FreeFoundry removes barriers to growth with clear pathways to
            knowledge, skills, and opportunity — helping you move forward
            without cost or complexity.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
