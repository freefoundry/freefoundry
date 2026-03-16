import { connectMySQL } from "@/lib/db/mysql";
import { NextResponse } from "next/server";
import { generateCourseFromOpportunity } from "@/lib/generator/generateCourseFromOpportunity";

const db = connectMySQL("courses");

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {

  try {

    const [rows]: any = await db.query(
      "SELECT * FROM raw_opportunities WHERE id = ?",
      [params.id]
    );

    const opportunity = rows[0];

    if (!opportunity) {
      return NextResponse.json(
        { error: "Opportunity not found" },
        { status: 404 }
      );
    }

    const post = generateCourseFromOpportunity(opportunity);

    await db.query(
      `
      INSERT INTO courses
      (slug, title, description, excerpt, platform, tags, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        post.slug,
        post.title,
        post.description,
        post.excerpt,
        post.platform,
        JSON.stringify(post.tags),
        "draft"
      ]
    );

    await db.query(
      `
      UPDATE raw_opportunities
      SET status = 'generated'
      WHERE id = ?
      `,
      [params.id]
    );

    return NextResponse.json({ success: true });

  } catch (err: any) {

    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );

  }
}