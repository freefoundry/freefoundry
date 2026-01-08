// app/api/jobs/route.ts
import cloudinary from "@/lib/cloudinary";
import { connectMySQL } from "@/lib/db/mysql";
import { NextResponse } from "next/server";

const db = connectMySQL("jobs");

// ==========================
// GET all jobs
// ==========================
export async function GET() {
  try {
    // Auto-publish: flip draft → published when publishDate is reached
    await db.query(`
      UPDATE jobs
      SET status = 'published'
      WHERE status = 'draft'
      AND publishDate IS NOT NULL
      AND publishDate <= NOW()
    `);

    const [rows] = await db.query("SELECT * FROM jobs ORDER BY createdAt DESC");

    return NextResponse.json(rows);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// ==========================
// CREATE a new job
// ==========================
export async function POST(req: Request) {
  try {
    const body = await req.json();

    let logoUrl = body.companyLogo || null;

    //  Upload company logo to Cloudinary if base64
    if (body.companyLogo && body.companyLogo.startsWith("data:")) {
      const uploadRes = await cloudinary.uploader.upload(body.companyLogo, {
        folder: "jobs",
        resource_type: "image",
      });
      logoUrl = uploadRes.secure_url;
    }
    const formatLocalDateTime = (date = new Date()) => {
      const pad = (n: number) => String(n).padStart(2, "0");

      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
        date.getDate()
      )} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
        date.getSeconds()
      )}`;
    };

    const [result] = await db.query(
      `INSERT INTO jobs 
        (slug, title, company, location, type, workMode, experience, salary, currency, salaryType, description, fullDescription, excerpt, requirements, benefits, responsibilities, postedDate, platform, companyLogo, applicationUrl, featured, urgent, tags, status, visibility, publishDate, qualifications, niceToHave, companyInfo, applicationProcess, similarJobs, views, applications, lastUpdated) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        body.slug,
        body.title,
        body.company || null,
        body.location || null,
        body.type || null,
        body.workMode || null,
        body.experience || null,
        body.salary || null,
        body.currency || "NGN",
        body.salaryType || null,
        body.description || null,
        body.fullDescription || "",
        body.excerpt || null,
        JSON.stringify(body.requirements || []),
        JSON.stringify(body.benefits || []),
        JSON.stringify(body.responsibilities || []),
        body.postedDate || formatLocalDateTime(),
        body.platform || null,
        logoUrl,
        body.applicationUrl || null,
        !!body.featured,
        !!body.urgent,
        JSON.stringify(body.tags || []),
        body.status || "draft",
        body.visibility || "public",
        body.publishDate ? body.publishDate.replace("T", " ") : null,
        JSON.stringify(body.qualifications || []),
        JSON.stringify(body.niceToHave || []),
        JSON.stringify(body.companyInfo || {}),
        JSON.stringify(body.applicationProcess || {}),
        JSON.stringify(body.similarJobs || []),
        parseInt(body.views) || 0,
        parseInt(body.applications) || 0,
        body.lastUpdated || formatLocalDateTime(),
      ]
    );

    return NextResponse.json({
      id: (result as any).insertId,
      ...body,
      companyLogo: logoUrl,
    });
  } catch (err: any) {
    console.error("  Job insert error:", err);

    let message = "Unknown error";
    let status = 500;

    if (err.code === "ER_DUP_ENTRY") {
      message = "A job with this slug already exists.";
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
