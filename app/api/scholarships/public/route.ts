import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/db/mongodb";
import Scholarship from "@/models/Scholarship";

// --- Utility: Build MongoDB query dynamically ---
function buildMongoQuery({ search, type, level, field, country }: any) {
  const query: any = { visibility: "public" };

  // ✅ Search by title, provider, field, or tags
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { provider: { $regex: search, $options: "i" } },
      { field: { $regex: search, $options: "i" } },
      { tags: { $elemMatch: { $regex: search, $options: "i" } } },
    ];
  }

  // ✅ Filter by type (Full, Partial, etc.)
  if (type && type !== "all") {
    query.type = type;
  }

  // ✅ Filter by level (Graduate, PhD, etc.)
  if (level && level !== "all") {
    query.level = level;
  }

  // ✅ Filter by field of study
  if (field && field !== "all") {
    query.field = field;
  }

  // ✅ Filter by country
  if (country && country !== "all") {
    query.country = country;
  }

  return query;
}

// --- Utility: Handle sorting ---
import type { SortOrder } from "mongoose";

function getSortOption(sort: string): Record<string, SortOrder> {
  switch (sort) {
    case "popular":
      return { views: -1 as SortOrder };
    case "deadline":
      return { applicationDeadline: 1 as SortOrder };
    case "oldest":
      return { createdAt: 1 as SortOrder };
    default:
      return { createdAt: -1 as SortOrder }; // newest first
  }
}

// --- Shared handler ---
async function handleQuery(params: any) {
  await connectMongo("scholarships");

  const {
    page = 1,
    limit = 10,
    search,
    type,
    level,
    field,
    country,
    sort = "newest",
  } = params;

  const query = buildMongoQuery({ search, type, level, field, country });
  const sortOption = getSortOption(sort);

  const skip = (Number(page) - 1) * Number(limit);

  const [data, total] = await Promise.all([
    Scholarship.find(query).sort(sortOption).skip(skip).limit(Number(limit)),
    Scholarship.countDocuments(query),
  ]);

  return {
    data,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
    },
  };
}

// ==========================
// GET (via query params)
// ==========================
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const params = {
      page: searchParams.get("page") || "1",
      limit: searchParams.get("limit") || "10",
      search: searchParams.get("search") || undefined,
      type: searchParams.get("type") || "all",
      level: searchParams.get("level") || "all",
      field: searchParams.get("field") || "all",
      country: searchParams.get("country") || "all",
      sort: searchParams.get("sort") || "newest",
    };

    const result = await handleQuery(params);
    return NextResponse.json(result);
  } catch (err: any) {
    console.error("❌ Error querying scholarships (GET):", err);
    return NextResponse.json(
      { error: err.message || "Failed to query scholarships." },
      { status: 500 }
    );
  }
}

// ==========================
// POST (via JSON body)
// ==========================
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await handleQuery(body);
    return NextResponse.json(result);
  } catch (err: any) {
    console.error("❌ Error querying scholarships (POST):", err);

    let message = "Unknown error";
    let status = 500;

    if (err instanceof SyntaxError) {
      message = "Invalid JSON payload.";
      status = 400;
    } else if (err.message) {
      message = err.message;
    }

    return NextResponse.json({ error: message }, { status });
  }
}
