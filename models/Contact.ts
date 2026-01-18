import { connectMongo } from "@/lib/db/mongodb";
import { Schema, Model } from "mongoose";

export interface IContact {
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

let ContactModel: Model<IContact>;

export async function getContactModel() {
  const conn = await connectMongo("users");

  if (!ContactModel) {
    const ContactSchema = new Schema<IContact>({
      name: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
      },
      message: {
        type: String,
        required: true,
        trim: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    });

    ContactModel =
      conn.models.Contact || conn.model<IContact>("Contact", ContactSchema);
  }

  return ContactModel;
}
