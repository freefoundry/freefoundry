import { connectMongo } from "@/lib/db/mongodb";
import { Schema, Model } from "mongoose";

export interface INewsletter {
  email: string;
  createdAt: Date;
}

let NewsletterModel: Model<INewsletter>;

export async function getNewsletterModel() {
  const conn = await connectMongo("users");

  if (!NewsletterModel) {
    const NewsletterSchema = new Schema<INewsletter>({
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    });

    NewsletterModel =
      conn.models.Newsletter ||
      conn.model<INewsletter>("Newsletter", NewsletterSchema);
  }

  return NewsletterModel;
}
