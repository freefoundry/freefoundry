export type Course = {
  id: number;
  title: string;
  platform: string;
  instructor: {
    name: string;
    title: string;
    bio: string;
    rating: number;
    students: number;
    courses: number;
    avatar: string;
  };
  rating: number;
  students: number;
  duration: string;
  level: string;
  category: string;
  tags: string[];
  price: string;
  originalPrice: string;
  expiryDate: string | null;
  image: string;
  description: string;
  isPopular: boolean;
  isNew: boolean;
  isTrending: boolean;
};

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
};

export type Resource = {
  id: number;
  title: string;
  description: string;
  category: string;
  type: "Website" | "Tool" | "PDF" | string;
  url: string;
  tags: string[];
  rating: number;
  featured?: boolean;
  dateAdded: string;
  image?: string;
};
