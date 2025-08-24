import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Start Learning Without Limits?
        </h2>
        <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
          Join thousands of learners accessing free quality resources and
          advancing their careers
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            Explore Resources
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-white border-white hover:bg-blue-700 bg-transparent"
          >
            Join Community
          </Button>
        </div>
      </div>
    </section>
  );
}
