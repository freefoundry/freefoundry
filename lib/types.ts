// lib/types.ts
export interface Instructor {
  name: string;
  title?: string;
  bio?: string;
  rating?: number;
  students?: number;
  courses?: number;
  avatar?: string;
}

export interface Lecture {
  title: string;
  duration: string;
  type: "video" | "article" | "quiz";
  preview?: boolean;
}

export interface CurriculumSection {
  section: string;
  lectures: Lecture[];
}

export interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

export interface Course {
  id: number;
  title: string;
  slug: string;
  description: string;
  fullDescription: string;
  excerpt?: string;
  platform: string;
  instructor: Instructor;
  rating: number;
  students: number;
  duration: string;
  level: string;
  category: string;
  tags: string[];
  price: string;
  originalPrice?: string;
  expiryDate?: string | null;
  image?: string;
  isPopular: number;
  isNew: number;
  isTrending: number;
  whatYouWillLearn: string[];
  requirements: string[];
  curriculum?: CurriculumSection[];
  reviews?: Review[];
  relatedCourses?: Course[];
}

export type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  workMode: string;
  experience: string;
  salary: string;
  salaryType: "monthly" | "yearly" | string;
  description: string;
  requirements: string[];
  benefits: string[];
  postedDate: string;
  platform: string;
  companyLogo?: string;
  featured?: boolean;
  urgent?: boolean;
  applicationUrl?: string;
  currency: string;
};

export type Resource = {
  _id?: string; // MongoDB ID
  slug: string;
  title: string;
  content?: string;
  excerpt?: string;

  status: "draft" | "published" | "preview";
  visibility: "public" | "private" | "password";

  publishDate?: string;
  featuredImage?: string;

  tags: string[];
  type: string;
  category: string;
  author?: string;

  downloadUrl?: string;
  fileSize?: string;
  fileFormat?: string;
  difficulty?: string;
  estimatedTime?: string;
  price?: string;
  originalPrice?: string;

  isFeatured: boolean;
  isPopular: boolean;

  requirements: string[];
  features: string[];
  whatYouWillGet?: string[];

  createdAt: string;
  updatedAt: string;
};

export interface Scholarship {
  _id: number;
  title: string;
  provider: string;
  amount: string;
  currency: string;
  type: string; // 'Full', 'Partial', 'Merit-based', 'Need-based'
  level: string; // 'Undergraduate', 'Graduate', 'PhD', 'High School'
  field: string;
  location: string;
  country: string;
  eligibility: string[];
  requirements: string[];
  benefits: string[];
  applicationDeadline: string;
  description: string;
  applicationUrl: string;
  tags: string[];
  featured: boolean;
  renewable: boolean;
  numberOfAwards: number;
  gpaRequirement?: string;
  ageLimit?: string;
  image: string;
  dateAdded: string;
  status: "draft" | "published" | "archived";
  featuredImage?: string;
}
