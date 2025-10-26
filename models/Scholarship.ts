import { Schema, Connection, Model, Document } from "mongoose";

/**
 * Scholarship document interface
 */
export interface IScholarship extends Document {
  title: string;
  slug: string;
  provider: string;
  description: string;
  amount: string;
  currency: string;
  type: string;
  level: string;
  field: string;
  location: string;
  country: string;
  applicationUrl: string;
  applicationDeadline: Date;
  numberOfAwards: number;
  gpaRequirement?: string;
  ageLimit?: string;
  featured: boolean;
  renewable: boolean;
  tags: string[];
  eligibility: string[];
  requirements: string[];
  benefits: string[];
  status: "draft" | "published" | "archived";
  visibility: "public" | "private";
  featuredImage?: string;
  publishDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Schema definition
 */
const ScholarshipSchema = new Schema<IScholarship>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    provider: { type: String, required: true },
    description: { type: String, required: true },
    amount: { type: String, required: true },
    currency: { type: String, default: "USD" },
    type: String,
    level: String,
    field: String,
    location: String,
    country: String,
    applicationUrl: { type: String, required: true },
    applicationDeadline: { type: Date, required: true },
    numberOfAwards: { type: Number, default: 0 },
    gpaRequirement: String,
    ageLimit: String,
    featured: { type: Boolean, default: false },
    renewable: { type: Boolean, default: false },
    tags: [String],
    eligibility: [String],
    requirements: [String],
    benefits: [String],
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },
    featuredImage: { type: String },
    publishDate: { type: Date },
  },
  { timestamps: true }
);

/**
 * Utility: Safely get the Scholarship model for a given Mongoose connection.
 * This ensures we can use multiple databases (e.g. "resources", "scholarships")
 * without model re-registration errors.
 */
export function getScholarshipModel(conn: Connection): Model<IScholarship> {
  return (
    conn.models.Scholarship ||
    conn.model<IScholarship>("Scholarship", ScholarshipSchema)
  );
}
