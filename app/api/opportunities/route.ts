import { connectMySQL } from "@/lib/db/mysql";
import { NextResponse } from "next/server";

const db = connectMySQL("courses");

export async function GET() {
  try {
    const [rows]: any = await db.query(`
      SELECT id, title, url, source_name, source_type, status, created_at
      FROM raw_opportunities
      ORDER BY created_at DESC
      LIMIT 100
    `);

    return NextResponse.json(rows);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}