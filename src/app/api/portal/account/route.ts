import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/db";
import { users, donationRecords } from "@/db/schema";
import { eq } from "drizzle-orm";

// DELETE - Delete user account
export async function DELETE() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const userId = parseInt(session.user.id);

    // Anonymise donation records instead of deleting them
    // (CES needs these for accounting)
    await db
      .update(donationRecords)
      .set({
        donorName: "Anonymised Donor",
        donorEmail: `deleted-${userId}@anonymised.local`,
        message: null,
      })
      .where(eq(donationRecords.donorEmail, session.user.email));

    // Delete user account
    await db.delete(users).where(eq(users.id, userId));

    return NextResponse.json({
      success: true,
      message: "Account deleted. Donation records have been anonymised.",
    });
  } catch (error) {
    console.error("Account deletion error:", error);
    return NextResponse.json(
      { error: "Failed to delete account" },
      { status: 500 }
    );
  }
}
