import mongoose, { Schema, Document } from "mongoose";

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
  type: string;
  category: string;
  author: string;
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
}

const ResourceSchema: Schema = new Schema<IResource>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    excerpt: String,
    slug: { type: String, unique: true, required: true },
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
    tags: [String],
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
    requirements: [String],
    features: [String],
    whatYouWillGet: [String],
  },
  { timestamps: true }
);

export default mongoose.models.Resource ||
  mongoose.model<IResource>("Resource", ResourceSchema);
