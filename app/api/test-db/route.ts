import { initTables } from "@/lib/db/mysql";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await initTables();
    return NextResponse.json({ message: " DB connected and tables created" });
  } catch (error: any) {
    return NextResponse.json(
      { message: "  DB connection failed", error: error.message },
      { status: 500 }
    );
  }
}
