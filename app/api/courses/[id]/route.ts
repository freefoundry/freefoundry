// app/api/courses/[id]/route.ts
import { connectMySQL } from "@/lib/db/mysql";
import { NextResponse } from "next/server";

const db = connectMySQL("courses");

// GET one course
export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const [rows] = await db.query("SELECT * FROM courses WHERE id = ?", [
      params.id,
    ]);
    if ((rows as any).length === 0)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json((rows as any)[0]);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// UPDATE course
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    await db.query("UPDATE courses SET ? WHERE id = ?", [body, params.id]);
    return NextResponse.json({ message: "Updated successfully" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE course
export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    await db.query("DELETE FROM courses WHERE id = ?", [params.id]);
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
