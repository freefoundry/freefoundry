import { connectMySQL } from "@/lib/db/mysql";
import { NextResponse } from "next/server";

const db = connectMySQL("courses");

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await req.json();

    await db.query(
      `UPDATE raw_opportunities SET status = ? WHERE id = ?`,
      [status, params.id]
    );

    return NextResponse.json({ success: true });

  } catch (err: any) {

    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );

  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {

    await db.query(
      `DELETE FROM raw_opportunities WHERE id = ?`,
      [params.id]
    );

    return NextResponse.json({ success: true });

  } catch (err: any) {

    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );

  }
}