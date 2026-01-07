import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectMongo } from "@/lib/db/mongodb";
import { getScholarshipModel } from "@/models/Scholarship";
import cloudinary from "@/lib/cloudinary";

// ==========================
// GET a single scholarship (by ID or slug)
// ==========================
export async function GET(
  _req: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await props.params;
    const conn = await connectMongo("scholarships");
    const Scholarship = getScholarshipModel(conn);

    //  Determine if it's an ObjectId or slug
    const query = mongoose.Types.ObjectId.isValid(id)
      ? { _id: id }
      : { slug: id };

    const scholarship = await Scholarship.findOne(query);

    if (!scholarship) {
      return NextResponse.json(
        { error: "Scholarship not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(scholarship);
  } catch (err: any) {
    console.error("❌ Error fetching scholarship:", err);
    return NextResponse.json(
      { error: err.message || "Failed to fetch scholarship." },
      { status: 500 }
    );
  }
}

// ==========================
// UPDATE a scholarship (PUT)
// ==========================
export async function PUT(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await props.params;
    const data = await req.json();

    const conn = await connectMongo("scholarships");
    const Scholarship = getScholarshipModel(conn);

    //  Determine if ID or slug
    const query = mongoose.Types.ObjectId.isValid(id)
      ? { _id: id }
      : { slug: id };

    const existing = await Scholarship.findOne(query);
    if (!existing) {
      return NextResponse.json(
        { error: "Scholarship not found." },
        { status: 404 }
      );
    }

    //  Handle Cloudinary upload if Base64
    let imageUrl = data.featuredImage || existing.featuredImage;

    if (data.featuredImage && data.featuredImage.startsWith("data:")) {
      try {
        const uploadRes = await cloudinary.uploader.upload(data.featuredImage, {
          folder: "scholarships",
          resource_type: "image",
        });
        imageUrl = uploadRes.secure_url;
      } catch (uploadErr: any) {
        console.error("❌ Cloudinary upload failed:", uploadErr);
        return NextResponse.json(
          { error: "Image upload failed. Please try again." },
          { status: 500 }
        );
      }
    }

    //  Update the scholarship
    const updated = await Scholarship.findOneAndUpdate(
      query,
      {
        ...data,
        featuredImage: imageUrl,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    );

    return NextResponse.json(updated);
  } catch (err: any) {
    console.error("❌ Error updating scholarship:", err);
    let message = "Failed to update scholarship.";
    let status = 500;

    if (err.name === "ValidationError") {
      message = Object.values(err.errors)
        .map((e: any) => e.message)
        .join(", ");
      status = 400;
    } else if (err instanceof SyntaxError) {
      message = "Invalid JSON payload.";
      status = 400;
    } else if (err.message) {
      message = err.message;
    }

    return NextResponse.json({ error: message }, { status });
  }
}

// ==========================
// DELETE a scholarship
// ==========================
export async function DELETE(
  _req: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await props.params;
    const conn = await connectMongo("scholarships");
    const Scholarship = getScholarshipModel(conn);

    //  Determine if ID or slug
    const query = mongoose.Types.ObjectId.isValid(id)
      ? { _id: id }
      : { slug: id };

    const deleted = await Scholarship.findOneAndDelete(query);

    if (!deleted) {
      return NextResponse.json(
        { error: "Scholarship not found." },
        { status: 404 }
      );
    }

    //  Optionally delete image from Cloudinary
    if (
      deleted.featuredImage &&
      deleted.featuredImage.includes("cloudinary.com")
    ) {
      try {
        const publicId = deleted.featuredImage
          .split("/")
          .slice(-2)
          .join("/")
          .split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      } catch (cloudErr) {
        console.warn("⚠️ Failed to delete Cloudinary image:", cloudErr);
      }
    }

    return NextResponse.json({ message: "Scholarship deleted successfully." });
  } catch (err: any) {
    console.error("❌ Error deleting scholarship:", err);
    return NextResponse.json(
      { error: err.message || "Failed to delete scholarship." },
      { status: 500 }
    );
  }
}
