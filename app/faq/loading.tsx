import { Skeleton } from "@/components/ui/skeleton"

export default function FAQLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEF4FF] via-white to-[#EEF4FF]">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Skeleton className="h-9 w-32" />
          <div className="hidden md:flex items-center space-x-6">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-16" />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 text-center">
        <div className="container mx-auto max-w-3xl">
          <Skeleton className="h-12 w-full mb-6 mx-auto max-w-md" />
          <Skeleton className="h-20 w-full mb-8" />
          <Skeleton className="h-12 w-full max-w-2xl mx-auto mb-8" />
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-4 mb-8">
        <div className="container mx-auto max-w-3xl">
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-10 w-24" />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Items */}
      <section className="py-12 px-4 mb-16">
        <div className="container mx-auto max-w-3xl space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-6">
              <Skeleton className="h-6 w-32 mb-3" />
              <Skeleton className="h-7 w-full mb-4" />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
