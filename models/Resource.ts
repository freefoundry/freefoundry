import mongoose, { Schema, Document, Connection } from "mongoose";

export interface IResource extends Document {
  title: string;
  content: string;
  excerpt?: string;
  slug: string;
  status: "draft" | "published" | "preview";
  visibility: "public" | "private" | "password";
  publishDate?: Date;
  featuredImage?: string;
  tags: string[];
  type?: string;
  category?: string;
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
  whatYouWillGet: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const ResourceSchema = new Schema<IResource>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    excerpt: String,
    slug: { type: String, required: true, unique: true, trim: true },
    status: {
      type: String,
      enum: ["draft", "published", "preview"],
      default: "draft",
    },
    visibility: {
      type: String,
      enum: ["public", "private", "password"],
      default: "public",
    },
    publishDate: Date,
    featuredImage: String,
    tags: { type: [String], default: [] },
    type: String,
    category: String,
    author: String,
    downloadUrl: String,
    fileSize: String,
    fileFormat: String,
    difficulty: String,
    estimatedTime: String,
    price: String,
    originalPrice: String,
    isFeatured: { type: Boolean, default: false },
    isPopular: { type: Boolean, default: false },
    requirements: { type: [String], default: [] },
    features: { type: [String], default: [] },
    whatYouWillGet: { type: [String], default: [] },
  },
  { timestamps: true }
);

//  Dynamic model getter (safe for Next.js hot reload)
export function getResourceModel(conn: Connection) {
  return (
    conn.models.Resource || conn.model<IResource>("Resource", ResourceSchema)
  );
}
