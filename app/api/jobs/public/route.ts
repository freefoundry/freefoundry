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

  if (search) {
    conditions.push("(title LIKE ? OR company LIKE ? OR tags LIKE ?)");
    values.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }

  if (types?.length) {
    conditions.push(`type IN (${types.map(() => "?").join(",")})`);
    values.push(...types);
  }

  if (workModes?.length) {
    conditions.push(`workMode IN (${workModes.map(() => "?").join(",")})`);
    values.push(...workModes);
  }

  if (experienceLevels?.length) {
    conditions.push(
      `experience IN (${experienceLevels.map(() => "?").join(",")})`
    );
    values.push(...experienceLevels);
  }

  if (locations?.length) {
    conditions.push(`location IN (${locations.map(() => "?").join(",")})`);
    values.push(...locations);
  }

  let orderBy = "createdAt DESC";
  if (sort === "popular") orderBy = "views DESC";
  if (sort === "applications") orderBy = "applications DESC";
  if (sort === "salary-high") orderBy = "CAST(salary AS UNSIGNED) DESC";
  if (sort === "salary-low") orderBy = "CAST(salary AS UNSIGNED) ASC";

  const offset = (page - 1) * limit;

  return {
    where: `WHERE ${conditions.join(" AND ")}`,
    values,
    orderBy,
    limit,
    offset,
  };
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

    const { where, values, orderBy, limit, offset } = buildQuery(query);

    const dataSql = `
      SELECT *
      FROM jobs
      ${where}
      ORDER BY ${orderBy}
      LIMIT ? OFFSET ?
    `;

    const countSql = `
      SELECT COUNT(*) as total
      FROM jobs
      ${where}
    `;

    const [dataResult, countResult]: any = await Promise.all([
      db.query(dataSql, [...values, limit, offset]),
      db.query(countSql, values),
    ]);

    const data = dataResult[0];
    const total = countResult[0][0].total;

    return NextResponse.json({
      data,
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

    const { where, values, orderBy, limit, offset } = buildQuery(body);

    const dataSql = `
      SELECT *
      FROM jobs
      ${where}
      ORDER BY ${orderBy}
      LIMIT ? OFFSET ?
    `;

    const countSql = `
      SELECT COUNT(*) as total
      FROM jobs
      ${where}
    `;

    const [dataResult, countResult]: any = await Promise.all([
      db.query(dataSql, [...values, limit, offset]),
      db.query(countSql, values),
    ]);

    const data = dataResult[0];
    const total = countResult[0][0].total;

    return NextResponse.json({
      data,
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
