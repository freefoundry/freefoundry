import mongoose, { Schema, Document } from "mongoose";

export interface IScholarship extends Document {
  title: string;
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
}

const ScholarshipSchema: Schema = new Schema<IScholarship>(
  {
    title: { type: String, required: true },
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
  },
  { timestamps: true }
);

export default mongoose.models.Scholarship ||
  mongoose.model<IScholarship>("Scholarship", ScholarshipSchema);
