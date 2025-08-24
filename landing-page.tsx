// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import {
//   BookOpen,
//   Users,
//   Search,
//   Filter,
//   GraduationCap,
//   Code,
//   TrendingUp,
//   Shield,
//   Clock,
//   Star,
//   ArrowRight,
//   CheckCircle,
//   Globe,
//   Zap,
//   Heart,
// } from "lucide-react"
// import Link from "next/link"

// export default function FreeFoundryLanding() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
//       {/* Header */}
//       <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
//         <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//           <div className="flex items-center space-x-2">
//             <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
//               <BookOpen className="w-5 h-5 text-white" />
//             </div>
//             <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//               FreeFoundry
//             </span>
//           </div>
//           <nav className="hidden md:flex items-center space-x-6">
//             <Link href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
//               Features
//             </Link>
//             <Link href="#audience" className="text-gray-600 hover:text-gray-900 transition-colors">
//               For You
//             </Link>
//             <Link href="#roadmap" className="text-gray-600 hover:text-gray-900 transition-colors">
//               Roadmap
//             </Link>
//             <Button variant="outline" size="sm">
//               Sign In
//             </Button>
//           </nav>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="py-20 px-4">
//         <div className="container mx-auto text-center max-w-4xl">
//           <Badge variant="secondary" className="mb-4">
//             🚀 Now in Beta - Join Early Access
//           </Badge>
//           <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
//             Free Learning Resources,
//             <br />
//             All in One Place
//           </h1>
//           <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
//             Stop wasting time searching for quality free content. FreeFoundry curates verified learning resources, Udemy
//             courses, tech blogs, and developer tools—all without paywalls.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//             <Button
//               size="lg"
//               className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
//             >
//               Explore Resources
//               <ArrowRight className="ml-2 w-4 h-4" />
//             </Button>
//             <Button variant="outline" size="lg">
//               <Heart className="mr-2 w-4 h-4" />
//               Join Waitlist
//             </Button>
//           </div>
//           <div className="mt-12 flex items-center justify-center space-x-8 text-sm text-gray-500">
//             <div className="flex items-center">
//               <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
//               100% Free
//             </div>
//             <div className="flex items-center">
//               <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
//               Curated Content
//             </div>
//             <div className="flex items-center">
//               <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
//               No Sign-up Required
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Problem Statement */}
//       <section className="py-16 px-4 bg-white">
//         <div className="container mx-auto max-w-4xl">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold mb-4">The Learning Resource Problem</h2>
//             <p className="text-gray-600 text-lg">Quality learning shouldn't be a treasure hunt</p>
//           </div>
//           <div className="grid md:grid-cols-3 gap-8">
//             <Card className="border-red-200 bg-red-50">
//               <CardHeader>
//                 <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
//                   <Search className="w-6 h-6 text-red-600" />
//                 </div>
//                 <CardTitle className="text-red-800">Scattered Resources</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-red-700">
//                   Learning materials are spread across countless platforms, making discovery time-consuming and
//                   frustrating.
//                 </p>
//               </CardContent>
//             </Card>
//             <Card className="border-orange-200 bg-orange-50">
//               <CardHeader>
//                 <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
//                   <Shield className="w-6 h-6 text-orange-600" />
//                 </div>
//                 <CardTitle className="text-orange-800">Hidden Paywalls</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-orange-700">
//                   Most quality content is locked behind expensive subscriptions, limiting access for students and career
//                   switchers.
//                 </p>
//               </CardContent>
//             </Card>
//             <Card className="border-yellow-200 bg-yellow-50">
//               <CardHeader>
//                 <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
//                   <Clock className="w-6 h-6 text-yellow-600" />
//                 </div>
//                 <CardTitle className="text-yellow-800">Information Overload</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-yellow-700">
//                   Learners get overwhelmed by inconsistent quality and give up before finding valuable resources.
//                 </p>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </section>

//       {/* Core Features */}
//       <section id="features" className="py-16 px-4">
//         <div className="container mx-auto max-w-6xl">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold mb-4">Everything You Need to Learn</h2>
//             <p className="text-gray-600 text-lg">Curated, verified, and completely free resources at your fingertips</p>
//           </div>
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             <Card className="hover:shadow-lg transition-shadow">
//               <CardHeader>
//                 <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
//                   <BookOpen className="w-6 h-6 text-blue-600" />
//                 </div>
//                 <CardTitle>Free Udemy Courses</CardTitle>
//                 <CardDescription>
//                   Curated free courses with expiry detection to ensure you never miss out
//                 </CardDescription>
//               </CardHeader>
//             </Card>
//             <Card className="hover:shadow-lg transition-shadow">
//               <CardHeader>
//                 <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
//                   <Code className="w-6 h-6 text-purple-600" />
//                 </div>
//                 <CardTitle>Tech Blog Hub</CardTitle>
//                 <CardDescription>
//                   Quality articles, tutorials, and insights from the developer community
//                 </CardDescription>
//               </CardHeader>
//             </Card>
//             <Card className="hover:shadow-lg transition-shadow">
//               <CardHeader>
//                 <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
//                   <Filter className="w-6 h-6 text-green-600" />
//                 </div>
//                 <CardTitle>Smart Filtering</CardTitle>
//                 <CardDescription>Find exactly what you need with advanced search and category filters</CardDescription>
//               </CardHeader>
//             </Card>
//             <Card className="hover:shadow-lg transition-shadow">
//               <CardHeader>
//                 <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
//                   <GraduationCap className="w-6 h-6 text-indigo-600" />
//                 </div>
//                 <CardTitle>Study Materials</CardTitle>
//                 <CardDescription>WAEC, JAMB, and tertiary education resources for Nigerian students</CardDescription>
//               </CardHeader>
//             </Card>
//             <Card className="hover:shadow-lg transition-shadow">
//               <CardHeader>
//                 <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
//                   <Zap className="w-6 h-6 text-pink-600" />
//                 </div>
//                 <CardTitle>Developer Tools</CardTitle>
//                 <CardDescription>GPA calculators, resume builders, and other productivity tools</CardDescription>
//               </CardHeader>
//             </Card>
//             <Card className="hover:shadow-lg transition-shadow">
//               <CardHeader>
//                 <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
//                   <Globe className="w-6 h-6 text-teal-600" />
//                 </div>
//                 <CardTitle>Community Driven</CardTitle>
//                 <CardDescription>Submit resources, rate content, and help build the knowledge base</CardDescription>
//               </CardHeader>
//             </Card>
//           </div>
//         </div>
//       </section>

//       {/* Target Audience */}
//       <section id="audience" className="py-16 px-4 bg-white">
//         <div className="container mx-auto max-w-4xl">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold mb-4">Built for Every Learner</h2>
//             <p className="text-gray-600 text-lg">Whether you're starting out or leveling up, we've got you covered</p>
//           </div>
//           <div className="grid md:grid-cols-2 gap-8">
//             <Card className="p-6">
//               <div className="flex items-start space-x-4">
//                 <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
//                   <GraduationCap className="w-6 h-6 text-blue-600" />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-lg mb-2">Students</h3>
//                   <p className="text-gray-600 mb-4">
//                     Secondary and tertiary students looking for free study materials, exam prep, and skill development
//                     resources.
//                   </p>
//                   <ul className="text-sm text-gray-500 space-y-1">
//                     <li>• WAEC & JAMB preparation</li>
//                     <li>• University course supplements</li>
//                     <li>• Career guidance resources</li>
//                   </ul>
//                 </div>
//               </div>
//             </Card>
//             <Card className="p-6">
//               <div className="flex items-start space-x-4">
//                 <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
//                   <Code className="w-6 h-6 text-purple-600" />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-lg mb-2">Self-Taught Developers</h3>
//                   <p className="text-gray-600 mb-4">
//                     Aspiring and current developers seeking quality programming tutorials and tech insights.
//                   </p>
//                   <ul className="text-sm text-gray-500 space-y-1">
//                     <li>• Programming courses & tutorials</li>
//                     <li>• Tech blogs & industry news</li>
//                     <li>• Developer tools & resources</li>
//                   </ul>
//                 </div>
//               </div>
//             </Card>
//             <Card className="p-6">
//               <div className="flex items-start space-x-4">
//                 <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
//                   <TrendingUp className="w-6 h-6 text-green-600" />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-lg mb-2">Career Switchers</h3>
//                   <p className="text-gray-600 mb-4">
//                     Professionals transitioning to new fields who need accessible, quality learning materials.
//                   </p>
//                   <ul className="text-sm text-gray-500 space-y-1">
//                     <li>• Industry transition guides</li>
//                     <li>• Skill assessment tools</li>
//                     <li>• Resume & portfolio builders</li>
//                   </ul>
//                 </div>
//               </div>
//             </Card>
//             <Card className="p-6">
//               <div className="flex items-start space-x-4">
//                 <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
//                   <Users className="w-6 h-6 text-orange-600" />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-lg mb-2">Lifelong Learners</h3>
//                   <p className="text-gray-600 mb-4">
//                     Anyone passionate about continuous learning and personal development.
//                   </p>
//                   <ul className="text-sm text-gray-500 space-y-1">
//                     <li>• Diverse topic coverage</li>
//                     <li>• Community discussions</li>
//                     <li>• Learning path recommendations</li>
//                   </ul>
//                 </div>
//               </div>
//             </Card>
//           </div>
//         </div>
//       </section>

//       {/* Roadmap */}
//       <section id="roadmap" className="py-16 px-4">
//         <div className="container mx-auto max-w-4xl">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold mb-4">What's Coming Next</h2>
//             <p className="text-gray-600 text-lg">We're just getting started. Here's what's on the horizon</p>
//           </div>
//           <div className="space-y-8">
//             <div className="flex items-start space-x-4">
//               <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
//                 <CheckCircle className="w-5 h-5 text-white" />
//               </div>
//               <div>
//                 <h3 className="font-semibold text-lg mb-2">MVP Features (Available Now)</h3>
//                 <p className="text-gray-600 mb-2">
//                   Core platform with curated Udemy courses, tech blog, and admin dashboard
//                 </p>
//                 <div className="flex flex-wrap gap-2">
//                   <Badge variant="secondary">Free Courses</Badge>
//                   <Badge variant="secondary">Tech Blog</Badge>
//                   <Badge variant="secondary">Search & Filter</Badge>
//                   <Badge variant="secondary">Admin Dashboard</Badge>
//                 </div>
//               </div>
//             </div>
//             <div className="flex items-start space-x-4">
//               <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
//                 <Star className="w-5 h-5 text-white" />
//               </div>
//               <div>
//                 <h3 className="font-semibold text-lg mb-2">Phase 2 (Coming Soon)</h3>
//                 <p className="text-gray-600 mb-2">Enhanced user experience with notifications and bot integrations</p>
//                 <div className="flex flex-wrap gap-2">
//                   <Badge variant="outline">Newsletter Alerts</Badge>
//                   <Badge variant="outline">Telegram Bot</Badge>
//                   <Badge variant="outline">Discord Integration</Badge>
//                   <Badge variant="outline">Course Expiry Alerts</Badge>
//                 </div>
//               </div>
//             </div>
//             <div className="flex items-start space-x-4">
//               <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
//                 <Zap className="w-5 h-5 text-white" />
//               </div>
//               <div>
//                 <h3 className="font-semibold text-lg mb-2">Phase 3 (Future)</h3>
//                 <p className="text-gray-600 mb-2">Full-featured learning platform with community features and tools</p>
//                 <div className="flex flex-wrap gap-2">
//                   <Badge variant="outline">Community Submissions</Badge>
//                   <Badge variant="outline">Content Ratings</Badge>
//                   <Badge variant="outline">Learning Tools</Badge>
//                   <Badge variant="outline">Media Content</Badge>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
//         <div className="container mx-auto text-center max-w-3xl">
//           <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Learning Journey?</h2>
//           <p className="text-xl mb-8 text-blue-100">
//             Join thousands of learners who've discovered the power of curated, free education resources.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//             <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
//               Start Learning Now
//               <ArrowRight className="ml-2 w-4 h-4" />
//             </Button>
//             <Button
//               size="lg"
//               variant="outline"
//               className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
//             >
//               Join Our Community
//             </Button>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="py-12 px-4 bg-gray-900 text-gray-300">
//         <div className="container mx-auto max-w-4xl">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <div className="flex items-center space-x-2 mb-4 md:mb-0">
//               <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
//                 <BookOpen className="w-5 h-5 text-white" />
//               </div>
//               <span className="text-xl font-bold text-white">FreeFoundry</span>
//             </div>
//             <div className="flex space-x-6 text-sm">
//               <Link href="#" className="hover:text-white transition-colors">
//                 Privacy
//               </Link>
//               <Link href="#" className="hover:text-white transition-colors">
//                 Terms
//               </Link>
//               <Link href="#" className="hover:text-white transition-colors">
//                 Contact
//               </Link>
//               <Link href="#" className="hover:text-white transition-colors">
//                 About
//               </Link>
//             </div>
//           </div>
//           <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
//             <p>&copy; 2024 FreeFoundry. Empowering learners worldwide with free, quality education resources.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   )
// }
