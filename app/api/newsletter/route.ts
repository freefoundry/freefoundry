import { NextResponse } from "next/server";
import { sendSubscriptionEmail } from "@/lib/mail";
import { getNewsletterModel } from "@/models/Newsletter";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const Newsletter = await getNewsletterModel();

    // Save email
    await Newsletter.create({ email });

    // Send confirmation email
    await sendSubscriptionEmail(email);

    return NextResponse.json(
      { message: "Subscribed successfully. Check your email!" },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json(
        { message: "Email already subscribed" },
        { status: 409 }
      );
    }

    console.error(error);

    return NextResponse.json(
      { message: "Subscription failed" },
      { status: 500 }
    );
  }
}
