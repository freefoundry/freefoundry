import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  FaTwitter,
  FaLinkedin,
  FaWhatsapp,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

export function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setLoading(false);
    setMessage(data.message);

    if (res.ok) setEmail("");
  }

  return (
    <footer className="bg-gray-800 text-gray-300 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img
                src="/bluelogo.svg"
                alt="FreeFoundry Logo"
                className="w-10 h-10"
              />
              <span className="text-xl font-bold text-white">FreeFoundry</span>
            </div>

            <p className="text-gray-400 mb-4">
              Empowering learners with free, curated resources to build skills
              without financial barriers.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-blue-400" />
                <a
                  href="mailto:info@freefoundryhub.com"
                  className="hover:text-white"
                >
                  info@freefoundryhub.com
                </a>
              </div>

              <div className="flex items-center gap-2">
                <FaPhoneAlt className="text-blue-400" />
                <a href="tel:+1234567890" className="hover:text-white">
                  +2348145197342
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 mt-4">
              {/* <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white text-lg"
              >
                <FaTwitter />
              </a> */}

              <a
                href="https://www.linkedin.com/company/freefoundry/about/?viewAsMember=true"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white text-lg"
              >
                <FaLinkedin />
              </a>

              <a
                href="https://wa.me/2348145197342"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-400 text-lg"
                aria-label="Chat on WhatsApp"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-medium mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="/courses" className="text-gray-400 hover:text-white">
                  Courses
                </a>
              </li>
              <li>
                <a href="/resources" className="text-gray-400 hover:text-white">
                  Tech Blog
                </a>
              </li>
              <li>
                <a href="/resources" className="text-gray-400 hover:text-white">
                  Career Tools
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-medium mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-gray-400 hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-medium mb-4">Subscribe</h4>
            <p className="text-gray-400 mb-4">
              Get notified about new resources and opportunities.
            </p>

            <form onSubmit={handleSubmit} className="flex">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="px-3 py-2 w-full rounded-l-md focus:outline-none"
              />
              <Button disabled={loading} className="rounded-l-none">
                {loading ? "..." : "Subscribe"}
              </Button>
            </form>

            {message && <p className="text-sm mt-2 text-gray-400">{message}</p>}
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 pt-6 mt-6 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} FreeFoundry. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
