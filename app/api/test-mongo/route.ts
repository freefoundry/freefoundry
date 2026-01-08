import { connectMongo } from "@/lib/db/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const resourcesDb = await connectMongo("resources");
    const scholarshipsDb = await connectMongo("scholarships");

    return NextResponse.json({
      message: " MongoDB connected successfully",
      resourcesDb: resourcesDb.name,
      scholarshipsDb: scholarshipsDb.name,
    });
  } catch (err: any) {
    return NextResponse.json(
      { message: "  MongoDB connection failed", error: err.message },
      { status: 500 }
    );
  }
}
