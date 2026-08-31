import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { db } from "@/db";
import { donationRecords } from "@/db/schema";
import { eq, desc, sql } from "drizzle-orm";
import { ArrowLeft, Heart, Download, Filter, Calendar, DollarSign } from "lucide-react";

export const metadata = { title: "Donation History" };

export default async function DonationHistoryPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/portal/login");

  // Fetch all donations for this user
  const donations = await db
    .select()
    .from(donationRecords)
    .where(eq(donationRecords.donorEmail, session.user.email))
    .orderBy(desc(donationRecords.createdAt));

  // Calculate stats
  const completed = donations.filter((d) => d.paymentStatus === "completed");
  const totalAmount = completed.reduce((sum, d) => sum + (d.amount || 0), 0);
  const currencies = [...new Set(completed.map((d) => d.currency))];

  return (
    <section className="section-padding bg-cream min-h-screen">
      <div className="container-wide mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <Link
              href="/portal/dashboard"
              className="inline-flex items-center gap-2 text-muted-green text-sm hover:text-green-700 transition-colors mb-2"
            >
              <ArrowLeft className="w-4 h-4" /> Dashboard
            </Link>
            <h1 className="font-serif text-3xl font-bold text-deep-brown">
              Donation History
            </h1>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl p-6 border border-peach-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-peach-100 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-deep-brown" />
              </div>
              <span className="text-sm text-charcoal/60">Total Given</span>
            </div>
            <span className="block text-3xl font-serif font-bold text-deep-brown">
              ${(totalAmount / 100).toFixed(2)}
            </span>
            {currencies.length > 0 && (
              <span className="text-xs text-charcoal/40">
                {currencies.join(", ")}
              </span>
            )}
          </div>

          <div className="bg-white rounded-2xl p-6 border border-peach-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                <Heart className="w-5 h-5 text-muted-green" />
              </div>
              <span className="text-sm text-charcoal/60">Donations Made</span>
            </div>
            <span className="block text-3xl font-serif font-bold text-deep-brown">
              {completed.length}
            </span>
            <span className="text-xs text-charcoal/40">Completed</span>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-peach-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-peach-100 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-deep-brown" />
              </div>
              <span className="text-sm text-charcoal/60">Last Donation</span>
            </div>
            <span className="block text-xl font-serif font-bold text-deep-brown">
              {completed.length > 0 && completed[0].createdAt
                ? new Date(completed[0].createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : "—"}
            </span>
          </div>
        </div>

        {/* Donation Table */}
        <div className="bg-white rounded-2xl border border-peach-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-peach-100 flex items-center justify-between">
            <h2 className="font-serif text-lg font-bold text-deep-brown">All Donations</h2>
            <span className="text-sm text-charcoal/50">{donations.length} records</span>
          </div>

          {donations.length === 0 ? (
            <div className="text-center py-16 px-6">
              <Heart className="w-14 h-14 text-peach/30 mx-auto mb-4" />
              <h3 className="font-serif text-xl font-bold text-deep-brown mb-2">
                No Donations Yet
              </h3>
              <p className="text-charcoal/60 mb-6 max-w-md mx-auto">
                Your donation history will appear here once you make your first
                contribution to CES.
              </p>
              <Link href="/donate" className="btn-primary inline-flex items-center gap-2">
                Make a Donation <Heart className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-peach-100">
              {/* Header row */}
              <div className="hidden md:grid md:grid-cols-6 gap-4 px-6 py-3 bg-cream/50 text-xs font-semibold text-charcoal/50 uppercase tracking-wider">
                <span>Date</span>
                <span>Amount</span>
                <span>Currency</span>
                <span>Type</span>
                <span>Status</span>
                <span className="text-right">Receipt</span>
              </div>

              {donations.map((donation) => (
                <div
                  key={donation.id}
                  className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-4 px-6 py-4 hover:bg-cream/30 transition-colors items-center"
                >
                  <span className="text-sm text-charcoal/80">
                    {donation.createdAt
                      ? new Date(donation.createdAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : "—"}
                  </span>
                  <span className="text-sm font-semibold text-deep-brown">
                    {((donation.amount || 0) / 100).toFixed(2)}
                  </span>
                  <span className="text-sm text-charcoal/60">
                    {donation.currency || "USD"}
                  </span>
                  <span className="text-sm text-charcoal/60 capitalize">
                    {donation.type || "one-off"}
                  </span>
                  <span>
                    <span
                      className={`inline-flex text-xs px-2.5 py-1 rounded-full font-medium ${
                        donation.paymentStatus === "completed"
                          ? "bg-green-100 text-green-700"
                          : donation.paymentStatus === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : donation.paymentStatus === "failed"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {donation.paymentStatus || "unknown"}
                    </span>
                  </span>
                  <span className="text-right">
                    {donation.paymentStatus === "completed" ? (
                      <Link
                        href={`/api/portal/receipt/${donation.id}`}
                        className="inline-flex items-center gap-1 text-muted-green text-xs font-medium hover:text-green-700 transition-colors"
                      >
                        <Download className="w-3 h-3" /> PDF
                      </Link>
                    ) : (
                      <span className="text-xs text-charcoal/30">—</span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
