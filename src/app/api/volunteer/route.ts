import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { volunteerEnquiries } from "@/db/schema";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const skills = formData.get("skills") as string;
    const availability = formData.get("availability") as string;
    const message = formData.get("message") as string;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    await db.insert(volunteerEnquiries).values({
      name,
      email,
      phone: phone || null,
      skills: skills || null,
      availability: availability || null,
      message: message || null,
      privacyConsent: true,
    });

    return NextResponse.redirect(new URL("/volunteer?success=true", request.url));
  } catch {
    return NextResponse.json(
      { error: "An error occurred. Please try again." },
      { status: 500 }
    );
  }
}
