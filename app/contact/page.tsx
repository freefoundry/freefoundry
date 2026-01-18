"use client";

import { useRef, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setSuccess("Your message has been sent successfully!");
      form.reset(); // ✅ SAFE
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
          <p className="text-gray-600 mb-8">
            Have a question, feedback, or suggestion? We’d love to hear from
            you.
          </p>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <Input name="name" placeholder="Your name" required />

            <Input
              name="email"
              type="email"
              placeholder="Your email"
              required
            />

            <Textarea
              name="message"
              placeholder="Your message"
              rows={5}
              required
            />

            {success && <p className="text-green-600 text-sm">{success}</p>}

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
