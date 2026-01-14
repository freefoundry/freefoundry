// app/api/courses/route.ts
import cloudinary from "@/lib/cloudinary";
import { connectMySQL } from "@/lib/db/mysql";
import { NextResponse } from "next/server";

const db = connectMySQL("courses");

// GET all courses
// GET all courses
export async function GET() {
  try {
    // auto-publish: flip draft → published when publishDate is reached
    await db.query(`
      UPDATE courses
      SET status = 'published'
      WHERE status = 'draft'
      AND publishDate IS NOT NULL
      AND publishDate <= NOW()
    `);

    const [rows] = await db.query(
      "SELECT * FROM courses ORDER BY createdAt DESC"
    );

    return NextResponse.json(rows);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// CREATE a new course
export async function POST(req: Request) {
  try {
    const body = await req.json();

    let imageUrl = body.image || null;

    //  Upload image to Cloudinary if it's base64
    if (body.image && body.image.startsWith("data:")) {
      const uploadRes = await cloudinary.uploader.upload(body.image, {
        folder: "courses",
        resource_type: "image",
      });
      imageUrl = uploadRes.secure_url;
    }   const formatLocalDateTime = (date = new Date()) => {
      const pad = (n: number) => String(n).padStart(2, "0");

      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
        date.getDate()
      )} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
        date.getSeconds()
      )}`;
    };

    const [result] = await db.query(
      `INSERT INTO courses 
        (slug, title, instructor, description, content, excerpt, platform, category, difficulty, duration, courseUrl, certificate, language, currency, price, originalPrice, rating, students, image, isPopular, isNew, isTrending, tags, requirements, outcomes, expiryDate, status, visibility, publishDate) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        body.slug,
        body.title,
        typeof body.instructor === "object"
          ? JSON.stringify(body.instructor)
          : body.instructor || null,
        body.description || null,
        body.fullDescription || body.content || "",
        body.excerpt || null,
        body.platform || null,
        body.category || null,
        body.level || body.difficulty || null,
        body.duration || null,
        body.courseUrl || null,
        !!body.certificate, //  Save as boolean
        body.language || "English", //  Save language
        body.currency || "NGN",
        parseFloat(body.price) || 0,
        parseFloat(body.originalPrice) || 0,
        parseFloat(body.rating) || 0,
        parseInt(body.students) || 0,
        imageUrl,
        !!body.isPopular,
        !!body.isNew,
        !!body.isTrending,
        JSON.stringify(body.tags || []),
        JSON.stringify(body.requirements || []),
        JSON.stringify(body.whatYouWillLearn || body.outcomes || []),
        body.expiryDate ? body.expiryDate.replace("T", " ") : null,
        body.status || "draft",
        body.visibility || "public",
        body.publishDate
          ? body.publishDate.replace("T", " ")
          : formatLocalDateTime(),
      ]
    );

    return NextResponse.json({
      id: (result as any).insertId,
      ...body,
      image: imageUrl,
    });
  } catch (err: any) {
    console.error("  Course insert error:", err);

    let message = "Unknown error";
    let status = 500;

    if (err.code === "ER_DUP_ENTRY") {
      message = "A course with this slug already exists.";
      status = 409;
    } else if (err.code === "ER_BAD_NULL_ERROR") {
      message = `Missing required field: ${err.sqlMessage}`;
      status = 400;
    } else if (err.code === "ER_PARSE_ERROR") {
      message = "SQL syntax error. Please check your table schema and payload.";
    } else if (err.code === "ER_DATA_TOO_LONG") {
      message = "One of the fields is too long for its column.";
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
