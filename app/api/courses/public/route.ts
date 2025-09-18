import { connectMySQL } from "@/lib/db/mysql";
import { NextResponse } from "next/server";

const db = connectMySQL("courses");

// --- Utility to build dynamic query ---
function buildQuery({
  page = 1,
  limit = 10,
  search,
  platforms,
  categories,
  levels,
  sort = "popular",
}: any) {
  const conditions: string[] = ["visibility = 'public'"];
  const values: any[] = [];

  if (search) {
    conditions.push("(title LIKE ? OR instructor LIKE ? OR tags LIKE ?)");
    values.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }

  if (platforms?.length) {
    conditions.push(`platform IN (${platforms.map(() => "?").join(",")})`);
    values.push(...platforms);
  }

  if (categories?.length) {
    conditions.push(`category IN (${categories.map(() => "?").join(",")})`);
    values.push(...categories);
  }

  if (levels?.length) {
    conditions.push(`difficulty IN (${levels.map(() => "?").join(",")})`);
    values.push(...levels);
  }

  let orderBy = "students DESC";
  if (sort === "rating") orderBy = "rating DESC";
  if (sort === "newest") orderBy = "createdAt DESC";
  if (sort === "duration-short") orderBy = "duration ASC";
  if (sort === "duration-long") orderBy = "duration DESC";

  const offset = (page - 1) * limit;

  const sql = `
    SELECT SQL_CALC_FOUND_ROWS *
    FROM courses
    WHERE ${conditions.join(" AND ")}
    ORDER BY ${orderBy}
    LIMIT ? OFFSET ?
  `;

  return { sql, values: [...values, limit, offset] };
}

// --- GET (query params) ---
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const query = {
      page: parseInt(searchParams.get("page") || "1"),
      limit: parseInt(searchParams.get("limit") || "9"),
      search: searchParams.get("search") || undefined,
      platforms: searchParams.getAll("platform"),
      categories: searchParams.getAll("category"),
      levels: searchParams.getAll("level"),
      sort: searchParams.get("sort") || "popular",
    };

    const { sql, values } = buildQuery(query);
    const [rows] = await db.query(sql, values);
    const [[{ total }]]: any = await db.query("SELECT FOUND_ROWS() as total");

    return NextResponse.json({
      data: rows,
      pagination: {
        total,
        page: query.page,
        limit: query.limit,
        totalPages: Math.ceil(total / query.limit),
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// --- POST (JSON body) ---
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { sql, values } = buildQuery(body);
    const [rows] = await db.query(sql, values);
    const [[{ total }]]: any = await db.query("SELECT FOUND_ROWS() as total");

    return NextResponse.json({
      data: rows,
      pagination: {
        total,
        page: body.page || 1,
        limit: body.limit || 9,
        totalPages: Math.ceil(total / (body.limit || 9)),
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
