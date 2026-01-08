import { NextResponse } from "next/server";
import type { SortOrder } from "mongoose";
import { connectMongo } from "@/lib/db/mongodb";
import { getResourceModel } from "@/models/Resource";

// ===== Build Mongo Query =====
function buildMongoQuery({ search, type, category }: any) {
  const query: any = { visibility: "public" };

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
      { tags: { $elemMatch: { $regex: search, $options: "i" } } },
    ];
  }

  if (type && type !== "all") query.type = type;
  if (category && category !== "all") query.category = category;

  return query;
}

// ===== Sort Option =====
function getSortOption(sort: string): Record<string, SortOrder> {
  switch (sort) {
    case "featured":
      return { isFeatured: -1 };
    case "rating":
      return { rating: -1 };
    case "oldest":
      return { createdAt: 1 };
    default:
      return { createdAt: -1 }; // newest first
  }
}

// ===== Shared Query Logic =====
async function handleQuery(params: any) {
  const conn = await connectMongo("resources");
  const Resource = getResourceModel(conn);

  const {
    page = 1,
    limit = 12,
    search,
    type,
    category,
    sort = "newest",
  } = params;

  const query = buildMongoQuery({ search, type, category });
  const sortOption = getSortOption(sort);
  const skip = (Number(page) - 1) * Number(limit);

  const [data, total] = await Promise.all([
    Resource.find(query).sort(sortOption).skip(skip).limit(Number(limit)),
    Resource.countDocuments(query),
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

// ===== GET /api/resources =====
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const params = {
      page: searchParams.get("page") || "1",
      limit: searchParams.get("limit") || "12",
      search: searchParams.get("search") || undefined,
      type: searchParams.get("type") || "all",
      category: searchParams.get("category") || "all",
      sort: searchParams.get("sort") || "newest",
    };

    const result = await handleQuery(params);
    return NextResponse.json(result);
  } catch (err: any) {
    console.error("  Error querying resources (GET):", err);
    return NextResponse.json(
      { error: err.message || "Failed to query resources." },
      { status: 500 }
    );
  }
}

// ===== POST /api/resources =====
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await handleQuery(body);
    return NextResponse.json(result);
  } catch (err: any) {
    console.error("  Error querying resources (POST):", err);
    return NextResponse.json(
      { error: err.message || "Failed to query resources." },
      { status: 500 }
    );
  }
}
