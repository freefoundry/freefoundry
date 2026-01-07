import { NextResponse } from "next/server";
import admins from "@/data/admins.json";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Find admin in JSON
  const admin = admins.find(
    (a) => a.email === email && a.password === password
  );

  if (!admin) {
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  }

  const res = NextResponse.json({
    success: true,
    admin: {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    },
  });

  // ✅ Set auth cookie
  res.cookies.set("admin-auth", "true", {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });

  // Optional: store role separately
  res.cookies.set("admin-role", admin.role, {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return res;
}
