// app/api/courses/[id]/route.ts
import cloudinary from "@/lib/cloudinary";
import { connectMySQL } from "@/lib/db/mysql";
import { NextResponse } from "next/server";

const db = connectMySQL("courses");

// helper
function isNumeric(str: string) {
  return !isNaN(Number(str));
}

// GET course by id or slug
export async function GET(
  _: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ✅ await params

    let query = "";
    let values: any[] = [];

    if (isNumeric(id)) {
      query = "SELECT * FROM courses WHERE id = ?";
      values = [id];
    } else {
      query = "SELECT * FROM courses WHERE slug = ?";
      values = [id];
    }

    const [rows] = await db.query(query, values);

    if ((rows as any).length === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json((rows as any)[0]);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// UPDATE course
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await req.json();

    // ✅ Handle image upload if provided
    let imageUrl = body.image;
    if (body.image && body.image.startsWith("data:")) {
      const uploadRes = await cloudinary.uploader.upload(body.image, {
        folder: "courses",
        resource_type: "image",
      });
      imageUrl = uploadRes.secure_url;
    }

    // 🔒 Normalize body (arrays/objects → JSON, skip undefined)
    const normalized: Record<string, any> = {};
    for (const [key, value] of Object.entries(body)) {
      if (value === undefined) continue;
      if (key === "image") {
        if (imageUrl) normalized.image = imageUrl; // only update if new image given
      } else if (Array.isArray(value) || typeof value === "object") {
        normalized[key] = JSON.stringify(value);
      } else {
        normalized[key] = value;
      }
    }

    const keys = Object.keys(normalized);
    if (keys.length === 0) {
      return NextResponse.json(
        { error: "No valid fields provided" },
        { status: 400 }
      );
    }

    const values = Object.values(normalized);
    const setClause = keys.map((key) => `\`${key}\` = ?`).join(", ");

    await db.query(`UPDATE courses SET ${setClause} WHERE id = ?`, [
      ...values,
      id,
    ]);

    return NextResponse.json({
      message: "Updated successfully",
      id,
      ...normalized,
    });
  } catch (err: any) {
    console.error("❌ Course update error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}



// DELETE course
export async function DELETE(
  _: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ✅ await params
    await db.query("DELETE FROM courses WHERE id = ?", [id]);
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
