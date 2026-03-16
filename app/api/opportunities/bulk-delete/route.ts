import { connectMySQL } from "@/lib/db/mysql";
import { NextResponse } from "next/server";

const db = connectMySQL("courses");

export async function POST(req: Request) {

  try {

    const { ids } = await req.json();

    if (!ids || !ids.length) {
      return NextResponse.json({ error: "No ids provided" });
    }

    const placeholders = ids.map(() => "?").join(",");

    await db.query(
      `DELETE FROM raw_opportunities WHERE id IN (${placeholders})`,
      ids
    );

    return NextResponse.json({ success: true });

  } catch (err: any) {

    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );

  }

}