import { connectMySQL } from "@/lib/db/mysql";
import { NextResponse } from "next/server";

const db = connectMySQL("courses");

export async function DELETE() {

  try {

    await db.query(`DELETE FROM raw_opportunities`);

    return NextResponse.json({ success: true });

  } catch (err: any) {

    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );

  }

}