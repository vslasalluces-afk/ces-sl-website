"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, Globe, ArrowRight, AlertCircle, CheckCircle } from "lucide-react";

export default function DonorRegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    communicationConsent: false,
    privacyConsent: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Client-side validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (!formData.privacyConsent) {
      setError("You must agree to the Privacy Policy");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          country: formData.country,
          communicationConsent: formData.communicationConsent,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Registration failed");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/portal/login?registered=true");
      }, 2000);
    } catch {
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  if (success) {
    return (
      <section className="min-h-[80vh] flex items-center justify-center section-padding bg-cream">
        <div className="w-full max-w-md text-center">
          <div className="bg-white rounded-3xl shadow-xl border border-peach-100 p-8 md:p-10">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-deep-brown mb-4">
              Account Created!
            </h1>
            <p className="text-charcoal/70 mb-6">
              Your donor account has been created successfully. Redirecting you to login...
            </p>
            <div className="animate-spin w-6 h-6 border-2 border-peach border-t-transparent rounded-full mx-auto" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[80vh] flex items-center justify-center section-padding bg-cream">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl border border-peach-100 p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-peach to-gold flex items-center justify-center mx-auto mb-4 text-deep-brown font-serif font-bold text-xl">
              CES
            </div>
            <h1 className="font-serif text-2xl font-bold text-deep-brown mb-2">
              Create Donor Account
            </h1>
            <p className="text-charcoal/60 text-sm">
              Join our community of supporters and track your giving journey.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-2">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 border border-peach-200 rounded-xl text-charcoal focus:ring-2 focus:ring-peach focus:border-peach"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 border border-peach-200 rounded-xl text-charcoal focus:ring-2 focus:ring-peach focus:border-peach"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="country" className="block text-sm font-medium text-charcoal mb-2">
                Country
              </label>
              <div className="relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
                <input
                  id="country"
                  name="country"
                  type="text"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border border-peach-200 rounded-xl text-charcoal focus:ring-2 focus:ring-peach focus:border-peach"
                  placeholder="Sierra Leone"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-charcoal mb-2">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 border border-peach-200 rounded-xl text-charcoal focus:ring-2 focus:ring-peach focus:border-peach"
                  placeholder="••••••••"
                />
              </div>
              <p className="text-xs text-charcoal/50 mt-1">
                Min 8 characters, with uppercase, lowercase, and number
              </p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-charcoal mb-2">
                Confirm Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 border border-peach-200 rounded-xl text-charcoal focus:ring-2 focus:ring-peach focus:border-peach"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="communicationConsent"
                  checked={formData.communicationConsent}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 text-muted-green border-peach-200 rounded focus:ring-peach"
                />
                <span className="text-sm text-charcoal/70">
                  I would like to receive updates about CES programmes and impact stories.
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="privacyConsent"
                  checked={formData.privacyConsent}
                  onChange={handleChange}
                  required
                  className="mt-1 w-4 h-4 text-muted-green border-peach-200 rounded focus:ring-peach"
                />
                <span className="text-sm text-charcoal/70">
                  I agree to the{" "}
                  <Link href="/privacy" className="text-muted-green underline">
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link href="/terms" className="text-muted-green underline">
                    Terms of Use
                  </Link>
                  . *
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="animate-spin w-5 h-5 border-2 border-warm-white border-t-transparent rounded-full" />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-peach-100 text-center">
            <p className="text-sm text-charcoal/60">
              Already have an account?{" "}
              <Link
                href="/portal/login"
                className="text-muted-green font-semibold hover:text-green-700 transition-colors"
              >
                Sign In →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
