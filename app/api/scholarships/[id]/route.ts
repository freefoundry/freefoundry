import { NextResponse } from "next/server";
import Scholarship from "@/models/Scholarship";
import { connectMongo } from "@/lib/db/mongodb";
import mongoose from "mongoose";

// ==========================
// GET a single scholarship
// ==========================
export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    await connectMongo("scholarships");

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { error: "Invalid scholarship ID." },
        { status: 400 }
      );
    }

    const scholarship = await Scholarship.findById(params.id);
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
// UPDATE a scholarship
// ==========================
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongo("scholarships");

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { error: "Invalid scholarship ID." },
        { status: 400 }
      );
    }

    const data = await req.json();

    const updated = await Scholarship.findByIdAndUpdate(
      params.id,
      { ...data, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return NextResponse.json(
        { error: "Scholarship not found." },
        { status: 404 }
      );
    }

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
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongo("scholarships");

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { error: "Invalid scholarship ID." },
        { status: 400 }
      );
    }

    const deleted = await Scholarship.findByIdAndDelete(params.id);
    if (!deleted) {
      return NextResponse.json(
        { error: "Scholarship not found." },
        { status: 404 }
      );
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
