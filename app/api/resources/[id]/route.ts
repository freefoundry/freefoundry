import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectMongo } from "@/lib/db/mongodb";
import { getResourceModel } from "@/models/Resource";
import cloudinary from "@/lib/cloudinary";

// ==========================
// GET a single resource (by ID or slug)
// ==========================
export async function GET(
  _req: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await props.params;
    const conn = await connectMongo("resources");
    const Resource = getResourceModel(conn);

    const query = mongoose.Types.ObjectId.isValid(id)
      ? { _id: id }
      : { slug: id };

    const resource = await Resource.findOne(query);

    if (!resource) {
      return NextResponse.json(
        { error: "Resource not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(resource);
  } catch (err: any) {
    console.error("❌ Error fetching resource:", err);
    return NextResponse.json(
      { error: err.message || "Failed to fetch resource." },
      { status: 500 }
    );
  }
}

// ==========================
// UPDATE a resource (PUT)
// ==========================
export async function PUT(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await props.params;
    const data = await req.json();

    const conn = await connectMongo("resources");
    const Resource = getResourceModel(conn);

    const query = mongoose.Types.ObjectId.isValid(id)
      ? { _id: id }
      : { slug: id };

    const existing = await Resource.findOne(query);
    if (!existing) {
      return NextResponse.json(
        { error: "Resource not found." },
        { status: 404 }
      );
    }

    // ✅ Handle Cloudinary upload if Base64 image provided
    let imageUrl = data.featuredImage || existing.featuredImage;
    if (data.featuredImage && data.featuredImage.startsWith("data:")) {
      try {
        const uploadRes = await cloudinary.uploader.upload(data.featuredImage, {
          folder: "resources",
          resource_type: "image",
        });
        imageUrl = uploadRes.secure_url;
      } catch (err: any) {
        console.error("❌ Cloudinary upload failed:", err);
        return NextResponse.json(
          { error: "Image upload failed. Please try again." },
          { status: 500 }
        );
      }
    }

    // ✅ Auto-update timestamps and merge updates
    const updatedResource = await Resource.findOneAndUpdate(
      query,
      {
        ...data,
        featuredImage: imageUrl,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    );

    return NextResponse.json(updatedResource);
  } catch (err: any) {
    console.error("❌ Error updating resource:", err);
    return NextResponse.json(
      { error: err.message || "Failed to update resource." },
      { status: 500 }
    );
  }
}

// ==========================
// DELETE a resource
// ==========================
export async function DELETE(
  _req: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await props.params;

    const conn = await connectMongo("resources");
    const Resource = getResourceModel(conn);

    const query = mongoose.Types.ObjectId.isValid(id)
      ? { _id: id }
      : { slug: id };

    const deleted = await Resource.findOneAndDelete(query);

    if (!deleted) {
      return NextResponse.json(
        { error: "Resource not found." },
        { status: 404 }
      );
    }

    // ✅ Optional: delete image from Cloudinary
    if (
      deleted.featuredImage &&
      deleted.featuredImage.includes("cloudinary.com")
    ) {
      const publicId = deleted.featuredImage
        .split("/")
        .slice(-2)
        .join("/")
        .split(".")[0]; // extract folder/name
      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (err) {
        console.warn("⚠️ Failed to delete image from Cloudinary:", err);
      }
    }

    return NextResponse.json({ message: "Resource deleted successfully." });
  } catch (err: any) {
    console.error("❌ Error deleting resource:", err);
    return NextResponse.json(
      { error: err.message || "Failed to delete resource." },
      { status: 500 }
    );
  }
}
