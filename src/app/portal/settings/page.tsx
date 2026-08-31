import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { ArrowLeft, User, Lock, Bell, Shield } from "lucide-react";
import ProfileForm from "./ProfileForm";
import PasswordForm from "./PasswordForm";
import DeleteAccount from "./DeleteAccount";

export const metadata = { title: "Account Settings" };

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/portal/login");

  const [userData] = await db
    .select({
      name: users.name,
      email: users.email,
      country: users.country,
      phone: users.phone,
      communicationConsent: users.communicationConsent,
      emailVerified: users.emailVerified,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(eq(users.id, parseInt(session.user.id)))
    .limit(1);

  if (!userData) redirect("/portal/login");

  return (
    <section className="section-padding bg-cream min-h-screen">
      <div className="container-narrow mx-auto">
        <Link
          href="/portal/dashboard"
          className="inline-flex items-center gap-2 text-muted-green text-sm hover:text-green-700 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" /> Dashboard
        </Link>
        <h1 className="font-serif text-3xl font-bold text-deep-brown mb-8">
          Account Settings
        </h1>

        {/* Profile Section */}
        <div className="bg-white rounded-2xl border border-peach-100 p-6 md:p-8 mb-8">
          <h2 className="font-serif text-xl font-bold text-deep-brown mb-6 flex items-center gap-2">
            <User className="w-5 h-5 text-muted-green" /> Personal Information
          </h2>

          {/* Email verification status */}
          <div className={`rounded-xl p-4 mb-6 flex items-start gap-3 ${userData.emailVerified ? "bg-green-50 border border-green-200" : "bg-yellow-50 border border-yellow-200"}`}>
            <Bell className={`w-5 h-5 shrink-0 mt-0.5 ${userData.emailVerified ? "text-green-600" : "text-yellow-600"}`} />
            <p className={`text-sm ${userData.emailVerified ? "text-green-700" : "text-yellow-700"}`}>
              {userData.emailVerified
                ? "Your email address has been verified."
                : "Your email address has not been verified. Please check your inbox for the verification link."}
            </p>
          </div>

          <ProfileForm
            initialName={userData.name}
            email={userData.email}
            initialCountry={userData.country || ""}
            initialPhone={userData.phone || ""}
            initialConsent={userData.communicationConsent ?? false}
          />
        </div>

        {/* Password Section */}
        <div className="bg-white rounded-2xl border border-peach-100 p-6 md:p-8 mb-8">
          <h2 className="font-serif text-xl font-bold text-deep-brown mb-6 flex items-center gap-2">
            <Lock className="w-5 h-5 text-muted-green" /> Change Password
          </h2>
          <PasswordForm />
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-2xl border border-red-200 p-6 md:p-8">
          <h2 className="font-serif text-xl font-bold text-red-700 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5" /> Account Deletion
          </h2>
          <p className="text-charcoal/70 text-sm mb-6">
            Permanently delete your donor account and all associated data. This
            action cannot be undone. Donation records will be anonymised for CES
            accounting purposes.
          </p>
          <DeleteAccount />
        </div>
      </div>
    </section>
  );
}
