import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { db } from "@/db";
import { donationRecords } from "@/db/schema";
import { eq, desc, and } from "drizzle-orm";
import { ArrowLeft, RefreshCcw, Heart, AlertCircle, Calendar, CreditCard } from "lucide-react";

export const metadata = { title: "Recurring Donations" };

export default async function RecurringDonationsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/portal/login");

  // Fetch recurring donations
  const recurring = await db
    .select()
    .from(donationRecords)
    .where(
      and(
        eq(donationRecords.donorEmail, session.user.email),
        eq(donationRecords.type, "recurring")
      )
    )
    .orderBy(desc(donationRecords.createdAt));

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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-serif text-3xl font-bold text-deep-brown mb-2">
              Recurring Donations
            </h1>
            <p className="text-charcoal/60">
              Manage your ongoing monthly, quarterly, or annual gifts.
            </p>
          </div>
          <Link
            href="/donate"
            className="btn-primary inline-flex items-center gap-2 text-sm shrink-0"
          >
            <Heart className="w-4 h-4" /> Set Up New Recurring Gift
          </Link>
        </div>

        {/* Info Notice */}
        <div className="bg-peach-100 border border-peach-200 rounded-2xl p-6 mb-8 flex items-start gap-4">
          <AlertCircle className="w-5 h-5 text-deep-brown shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-deep-brown text-sm mb-1">
              About Recurring Donations
            </h3>
            <p className="text-charcoal/70 text-sm">
              Recurring donations are processed automatically through your selected
              payment provider. You can cancel or modify your recurring donations at
              any time. Changes may take up to 24 hours to take effect. If you need
              immediate assistance, contact CES via WhatsApp at +232 78 703694.
            </p>
          </div>
        </div>

        {recurring.length === 0 ? (
          <div className="bg-white rounded-2xl border border-peach-100 p-12 text-center">
            <RefreshCcw className="w-14 h-14 text-peach/30 mx-auto mb-4" />
            <h2 className="font-serif text-xl font-bold text-deep-brown mb-2">
              No Recurring Donations
            </h2>
            <p className="text-charcoal/60 mb-6 max-w-md mx-auto">
              Set up a recurring donation to provide consistent support for CES
              programmes. Monthly giving helps us plan ahead and create lasting
              impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/donate"
                className="btn-primary inline-flex items-center gap-2"
              >
                <Heart className="w-4 h-4" /> Start Monthly Giving
              </Link>
            </div>

            {/* Benefits */}
            <div className="grid sm:grid-cols-3 gap-6 mt-12 text-left max-w-2xl mx-auto">
              {[
                {
                  icon: RefreshCcw,
                  title: "Consistent Support",
                  desc: "Regular giving provides stable funding for long-term programmes.",
                },
                {
                  icon: Calendar,
                  title: "Flexible Schedule",
                  desc: "Choose monthly, quarterly, or annual giving to suit your budget.",
                },
                {
                  icon: CreditCard,
                  title: "Easy Management",
                  desc: "Cancel or modify your recurring donation at any time.",
                },
              ].map((benefit) => (
                <div key={benefit.title} className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-xl bg-peach-100 flex items-center justify-center mb-3">
                    <benefit.icon className="w-5 h-5 text-deep-brown" />
                  </div>
                  <h3 className="font-semibold text-deep-brown text-sm mb-1">
                    {benefit.title}
                  </h3>
                  <p className="text-charcoal/60 text-xs leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid gap-6">
            {recurring.map((donation) => (
              <div
                key={donation.id}
                className="bg-white rounded-2xl border border-peach-100 p-6 md:p-8"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                      <RefreshCcw className="w-6 h-6 text-muted-green" />
                    </div>
                    <div>
                      <span className="block font-serif text-lg font-bold text-deep-brown">
                        {donation.currency || "USD"}{" "}
                        {((donation.amount || 0) / 100).toFixed(2)} / month
                      </span>
                      <span className="text-sm text-charcoal/60">
                        Started{" "}
                        {donation.createdAt
                          ? new Date(donation.createdAt).toLocaleDateString(
                              "en-GB",
                              { month: "long", year: "numeric" }
                            )
                          : "Unknown"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium ${
                        donation.paymentStatus === "completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {donation.paymentStatus === "completed" ? "Active" : "Pending"}
                    </span>
                    <button className="text-sm text-charcoal/50 hover:text-red-600 transition-colors">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
