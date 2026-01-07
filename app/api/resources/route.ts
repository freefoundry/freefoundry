import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/db/mongodb";
import { getResourceModel } from "@/models/Resource";
import cloudinary from "@/lib/cloudinary";
import mongoose from "mongoose";

// ==========================
// GET all resources (auto publish by date)
// ==========================
export async function GET() {
  try {
    const conn = await connectMongo("resources");

    console.log("EXPECTED DB:", conn.name);
    console.log("DEFAULT DB:", mongoose.connection.name);
    console.log("DEFAULT READY:", mongoose.connection.readyState);

    const Resource = getResourceModel(conn);

    //  Auto-publish draft resources when publishDate is reached
    await Resource.updateMany(
      { status: "draft", publishDate: { $lte: new Date() } },
      { $set: { status: "published" } }
    );

    const resources = await Resource.find().sort({ createdAt: -1 });
    return NextResponse.json(resources);
  } catch (err: any) {
    console.error(" Resource fetch error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to fetch resources." },
      { status: 500 }
    );
  }
}

// ==========================
// CREATE a new resource
// ==========================
export async function POST(req: Request) {
  try {
    const conn = await connectMongo("resources");
    const Resource = getResourceModel(conn);
    const data = await req.json();

    //  Validate title
    if (!data.title) {
      return NextResponse.json(
        { error: "Title is required." },
        { status: 400 }
      );
    }

    //  Auto-generate slug
    const slug =
      data.slug ||
      data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

    //  Prevent duplicate slug
    const existing = await Resource.findOne({ slug });
    if (existing) {
      return NextResponse.json(
        { error: "A resource with this slug already exists." },
        { status: 409 }
      );
    }

    //  Handle Cloudinary image upload (if Base64)
    let imageUrl = data.featuredImage || null;
    if (data.featuredImage && data.featuredImage.startsWith("data:")) {
      try {
        const uploadRes = await cloudinary.uploader.upload(data.featuredImage, {
          folder: "resources",
          resource_type: "image",
        });
        imageUrl = uploadRes.secure_url;
      } catch (uploadErr: any) {
        console.error(" Cloudinary upload failed:", uploadErr);
        return NextResponse.json(
          { error: "Image upload failed. Please try again." },
          { status: 500 }
        );
      }
    }

    //  Create resource document
    const resource = await Resource.create({
      ...data,
      slug,
      featuredImage: imageUrl,
      status: data.status || "draft",
      visibility: data.visibility || "public",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json(resource, { status: 201 });
  } catch (err: any) {
    console.error(" Error creating resource:", err);

    let message = "Unknown error occurred.";
    let status = 500;

    if (err.name === "ValidationError") {
      message = Object.values(err.errors)
        .map((e: any) => e.message)
        .join(", ");
      status = 400;
    } else if (err.code === 11000) {
      message = "Duplicate key error. Slug must be unique.";
      status = 409;
    } else if (err instanceof SyntaxError) {
      message = "Invalid JSON payload.";
      status = 400;
    } else if (err.message) {
      message = err.message;
    }

    return NextResponse.json({ error: message }, { status });
  }
}
