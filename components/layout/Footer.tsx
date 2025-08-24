import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img
                src="/placeholder.svg?height=36&width=36"
                alt="FreeFoundry Logo"
                className="h-8 w-8"
              />
              <span className="text-xl font-bold text-white">FreeFoundry</span>
            </div>
            <p className="text-gray-400 mb-4">
              Empowering learners with free, curated resources to build skills
              without financial barriers.
            </p>
          </div>

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
                  Study Materials
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

          <div>
            <h4 className="text-white font-medium mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Subscribe</h4>
            <p className="text-gray-400 mb-4">
              Get notified about new resources and opportunities.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-3 py-2 w-full rounded-l-md focus:outline-none"
              />
              <Button className="rounded-l-none">Subscribe</Button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 mt-6 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} FreeFoundry. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
