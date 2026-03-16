import { connectMySQL } from "@/lib/db/mysql";
import { extractOpportunity } from "@/lib/scraper/extractOpportunity";
import { NextResponse } from "next/server";

const db = connectMySQL("courses");

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json(
        { error: "URL required" },
        { status: 400 }
      );
    }

    const data = await extractOpportunity(url);

    await db.query(
      `
      INSERT INTO raw_opportunities
      (title, description, url, source_name, source_type, status)
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        data.title,
        data.description,
        data.url,
        new URL(url).hostname,
        "manual",
        "pending"
      ]
    );

    return NextResponse.json({
      success: true,
      data
    });

  } catch (err: any) {

    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );

  }
}