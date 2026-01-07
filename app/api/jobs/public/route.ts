// app/api/jobs/query/route.ts
import { connectMySQL } from "@/lib/db/mysql";
import { NextResponse } from "next/server";

const db = connectMySQL("jobs");

// --- Utility to build dynamic query ---
function buildQuery({
  page = 1,
  limit = 10,
  search,
  types,
  workModes,
  experienceLevels,
  locations,
  sort = "newest",
}: any) {
  const conditions: string[] = ["visibility = 'public'"];
  const values: any[] = [];

  //  Search by title, company, or tags
  if (search) {
    conditions.push("(title LIKE ? OR company LIKE ? OR tags LIKE ?)");
    values.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }

  //  Filter by job type (Full-time, Contract, etc.)
  if (types?.length) {
    conditions.push(`type IN (${types.map(() => "?").join(",")})`);
    values.push(...types);
  }

  //  Filter by work mode (Remote, Hybrid, Onsite)
  if (workModes?.length) {
    conditions.push(`workMode IN (${workModes.map(() => "?").join(",")})`);
    values.push(...workModes);
  }

  //  Filter by experience level (Junior, Mid, Senior)
  if (experienceLevels?.length) {
    conditions.push(
      `experience IN (${experienceLevels.map(() => "?").join(",")})`
    );
    values.push(...experienceLevels);
  }

  //  Filter by location
  if (locations?.length) {
    conditions.push(`location IN (${locations.map(() => "?").join(",")})`);
    values.push(...locations);
  }

  //  Sorting options
  let orderBy = "createdAt DESC"; // newest by default
  if (sort === "popular") orderBy = "views DESC";
  if (sort === "applications") orderBy = "applications DESC";
  if (sort === "salary-high") orderBy = "CAST(salary AS UNSIGNED) DESC";
  if (sort === "salary-low") orderBy = "CAST(salary AS UNSIGNED) ASC";

  const offset = (page - 1) * limit;

  const sql = `
    SELECT SQL_CALC_FOUND_ROWS *
    FROM jobs
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
      limit: parseInt(searchParams.get("limit") || "10"),
      search: searchParams.get("search") || undefined,
      types: searchParams.getAll("type"),
      workModes: searchParams.getAll("workMode"),
      experienceLevels: searchParams.getAll("experience"),
      locations: searchParams.getAll("location"),
      sort: searchParams.get("sort") || "newest",
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
        limit: body.limit || 10,
        totalPages: Math.ceil(total / (body.limit || 10)),
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
