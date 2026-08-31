import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { db } from "@/db";
import { users, donationRecords } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { Heart, History, RefreshCcw, Settings, Download, Bell, CreditCard, ArrowRight, LogOut } from "lucide-react";

export default async function DonorDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/portal/login");
  }

  // Fetch user data
  const [userData] = await db
    .select()
    .from(users)
    .where(eq(users.id, parseInt(session.user.id)))
    .limit(1);

  // Fetch donation history
  const donationHistory = await db
    .select()
    .from(donationRecords)
    .where(eq(donationRecords.donorEmail, session.user.email))
    .orderBy(desc(donationRecords.createdAt))
    .limit(5);

  // Calculate totals
  const totalDonated = donationHistory
    .filter((d) => d.paymentStatus === "completed")
    .reduce((sum, d) => sum + (d.amount || 0), 0);

  const completedDonations = donationHistory.filter(
    (d) => d.paymentStatus === "completed"
  ).length;

  return (
    <section className="section-padding bg-cream min-h-screen">
      <div className="container-wide mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-deep-brown mb-2">
              Welcome back, {session.user?.name || "Donor"}
            </h1>
            <p className="text-charcoal/60">
              Manage your donations and view your giving history.
            </p>
          </div>
          <Link
            href="/api/auth/signout"
            className="inline-flex items-center gap-2 text-charcoal/60 hover:text-deep-brown transition-colors text-sm"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { icon: Heart, label: "Make a Donation", href: "/donate", color: "bg-peach-100", accent: "text-peach" },
            { icon: History, label: "Donation History", href: "/portal/history", color: "bg-green-100", accent: "text-muted-green" },
            { icon: RefreshCcw, label: "Recurring Donations", href: "/portal/recurring", color: "bg-peach-100", accent: "text-peach" },
            { icon: Settings, label: "Account Settings", href: "/portal/settings", color: "bg-green-100", accent: "text-muted-green" },
          ].map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="bg-white rounded-2xl p-6 border border-peach-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <action.icon className={`w-6 h-6 ${action.accent}`} />
              </div>
              <span className="font-semibold text-deep-brown">{action.label}</span>
            </Link>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Donation Summary */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Donations */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-peach-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-xl font-bold text-deep-brown">Recent Donations</h2>
                <Link href="/portal/history" className="text-muted-green text-sm font-medium hover:underline">
                  View All
                </Link>
              </div>

              {donationHistory.length === 0 ? (
                <div className="text-center py-12">
                  <Heart className="w-12 h-12 text-peach/40 mx-auto mb-4" />
                  <p className="text-charcoal/60 mb-4">You haven&apos;t made any donations yet.</p>
                  <Link href="/donate" className="btn-primary inline-flex items-center gap-2 text-sm">
                    Make Your First Donation <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {donationHistory.map((donation) => (
                    <div
                      key={donation.id}
                      className="flex items-center justify-between p-4 bg-cream rounded-xl"
                    >
                      <div>
                        <span className="block font-medium text-deep-brown">
                          {donation.currency} {((donation.amount || 0) / 100).toFixed(2)}
                        </span>
                        <span className="text-sm text-charcoal/60">
                          {donation.createdAt
                            ? new Date(donation.createdAt).toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })
                            : "Date unknown"}
                        </span>
                      </div>
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-medium ${
                          donation.paymentStatus === "completed"
                            ? "bg-green-100 text-green-700"
                            : donation.paymentStatus === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {donation.paymentStatus}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Account Info */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-peach-100">
              <h2 className="font-serif text-xl font-bold text-deep-brown mb-6">Account Information</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <span className="text-xs text-charcoal/50 uppercase tracking-wider">Name</span>
                  <p className="text-charcoal font-medium">{userData?.name || session.user.name}</p>
                </div>
                <div>
                  <span className="text-xs text-charcoal/50 uppercase tracking-wider">Email</span>
                  <p className="text-charcoal font-medium">{userData?.email || session.user.email}</p>
                </div>
                <div>
                  <span className="text-xs text-charcoal/50 uppercase tracking-wider">Country</span>
                  <p className="text-charcoal font-medium">{userData?.country || "Not specified"}</p>
                </div>
                <div>
                  <span className="text-xs text-charcoal/50 uppercase tracking-wider">Member Since</span>
                  <p className="text-charcoal font-medium">
                    {userData?.createdAt
                      ? new Date(userData.createdAt).toLocaleDateString("en-GB", {
                          month: "long",
                          year: "numeric",
                        })
                      : "Unknown"}
                  </p>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-peach-100">
                <Link href="/portal/settings" className="text-muted-green text-sm font-medium hover:underline">
                  Edit Account Settings →
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Impact Summary */}
            <div className="bg-gradient-to-br from-deep-brown to-charcoal rounded-2xl p-6 text-warm-white">
              <h3 className="font-serif text-lg font-bold text-warm-white mb-4">Your Impact</h3>
              <div className="space-y-4">
                <div>
                  <span className="block text-3xl font-serif font-bold text-peach">
                    ${(totalDonated / 100).toFixed(2)}
                  </span>
                  <span className="text-warm-white/60 text-sm">Total Contributed</span>
                </div>
                <div>
                  <span className="block text-2xl font-serif font-bold text-peach">
                    {completedDonations}
                  </span>
                  <span className="text-warm-white/60 text-sm">Completed Donations</span>
                </div>
              </div>
              <p className="text-warm-white/50 text-xs mt-6">
                Thank you for supporting CES and transforming communities in Sierra Leone.
              </p>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-2xl p-6 border border-peach-100">
              <h3 className="font-serif text-lg font-bold text-deep-brown mb-4">Quick Links</h3>
              <div className="space-y-2">
                {[
                  { icon: Download, label: "Download Receipts", href: "/portal/receipts" },
                  { icon: Bell, label: "Communication Preferences", href: "/portal/settings#communications" },
                  { icon: CreditCard, label: "Payment Methods", href: "/portal/settings#payment" },
                ].map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-cream transition-colors text-sm text-charcoal/80 hover:text-deep-brown"
                  >
                    <link.icon className="w-4 h-4 text-muted-green" />
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-peach-100 rounded-2xl p-6 border border-peach-200 text-center">
              <Heart className="w-10 h-10 text-peach mx-auto mb-4" />
              <h3 className="font-serif text-lg font-bold text-deep-brown mb-2">
                Make Another Gift
              </h3>
              <p className="text-charcoal/70 text-sm mb-4">
                Your continued support transforms communities.
              </p>
              <Link href="/donate" className="btn-primary w-full text-center text-sm">
                Donate Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
