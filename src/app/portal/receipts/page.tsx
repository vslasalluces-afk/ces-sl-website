import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { db } from "@/db";
import { donationRecords } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { ArrowLeft, Download, FileText, Heart } from "lucide-react";

export const metadata = { title: "Donation Receipts" };

export default async function ReceiptsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/portal/login");

  // Only completed donations have receipts
  const completedDonations = await db
    .select()
    .from(donationRecords)
    .where(eq(donationRecords.donorEmail, session.user.email))
    .orderBy(desc(donationRecords.createdAt));

  const receiptable = completedDonations.filter(
    (d) => d.paymentStatus === "completed"
  );

  return (
    <section className="section-padding bg-cream min-h-screen">
      <div className="container-wide mx-auto">
        {/* Header */}
        <Link
          href="/portal/dashboard"
          className="inline-flex items-center gap-2 text-muted-green text-sm hover:text-green-700 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" /> Dashboard
        </Link>
        <h1 className="font-serif text-3xl font-bold text-deep-brown mb-2">
          Donation Receipts
        </h1>
        <p className="text-charcoal/60 mb-8">
          Download receipts for your completed donations for personal records.
        </p>

        {receiptable.length === 0 ? (
          <div className="bg-white rounded-2xl border border-peach-100 p-12 text-center">
            <Heart className="w-14 h-14 text-peach/30 mx-auto mb-4" />
            <h2 className="font-serif text-xl font-bold text-deep-brown mb-2">
              No Receipts Available
            </h2>
            <p className="text-charcoal/60 mb-6 max-w-md mx-auto">
              Receipts are generated for completed donations. Make a donation to
              receive your first receipt.
            </p>
            <Link href="/donate" className="btn-primary inline-flex items-center gap-2">
              Make a Donation <Heart className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {receiptable.map((donation) => (
              <div
                key={donation.id}
                className="bg-white rounded-2xl border border-peach-100 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-peach-100 flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6 text-deep-brown" />
                  </div>
                  <div>
                    <span className="block font-medium text-deep-brown">
                      Donation Receipt #{donation.id}
                    </span>
                    <span className="text-sm text-charcoal/60">
                      {donation.createdAt
                        ? new Date(donation.createdAt).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })
                        : "Unknown date"}{" "}
                      &middot;{" "}
                      {donation.currency || "USD"}{" "}
                      {((donation.amount || 0) / 100).toFixed(2)}
                    </span>
                  </div>
                </div>
                <Link
                  href={`/api/portal/receipt/${donation.id}`}
                  className="btn-secondary inline-flex items-center gap-2 text-sm shrink-0"
                >
                  <Download className="w-4 h-4" /> Download Receipt
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
