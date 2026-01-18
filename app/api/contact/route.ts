import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/mail";
import { getContactModel } from "@/models/Contact";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const Contact = await getContactModel();

    // Save message
    await Contact.create({ name, email, message });

    // Send email notification
    await sendContactEmail({ name, email, message });

    return NextResponse.json(
      { message: "Message sent successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to send message" },
      { status: 500 }
    );
  }
}
