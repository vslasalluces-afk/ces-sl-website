import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq, and, gt } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(
      new URL("/portal/login?error=invalid-token", request.url)
    );
  }

  try {
    const [user] = await db
      .select()
      .from(users)
      .where(
        and(
          eq(users.verificationToken, token),
          gt(users.verificationExpires, new Date())
        )
      )
      .limit(1);

    if (!user) {
      return NextResponse.redirect(
        new URL("/portal/login?error=expired-token", request.url)
      );
    }

    await db
      .update(users)
      .set({
        emailVerified: true,
        verificationToken: null,
        verificationExpires: null,
        updatedAt: new Date(),
      })
      .where(eq(users.id, user.id));

    return NextResponse.redirect(
      new URL("/portal/login?verified=true", request.url)
    );
  } catch (error) {
    console.error("Email verification error:", error);
    return NextResponse.redirect(
      new URL("/portal/login?error=verification-failed", request.url)
    );
  }
}
