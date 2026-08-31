import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { partnershipEnquiries } from "@/db/schema";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const organisation = formData.get("organisation") as string;
    const contact = formData.get("contact") as string;
    const email = formData.get("email") as string;
    const type = formData.get("type") as string;
    const interest = formData.get("interest") as string;
    const message = formData.get("message") as string;

    if (!organisation || !contact || !email) {
      return NextResponse.json(
        { error: "Organisation, contact person and email are required." },
        { status: 400 }
      );
    }

    await db.insert(partnershipEnquiries).values({
      organisationName: organisation,
      contactPerson: contact,
      email,
      organisationType: type || null,
      interestArea: interest || null,
      message: message || null,
      privacyConsent: true,
    });

    return NextResponse.redirect(
      new URL("/partner-with-ces?success=true", request.url)
    );
  } catch {
    return NextResponse.json(
      { error: "An error occurred. Please try again." },
      { status: 500 }
    );
  }
}
