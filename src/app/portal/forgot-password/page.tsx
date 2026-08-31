"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSent(true);
      } else {
        const data = await res.json();
        setError(data.error || "Something went wrong");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[80vh] flex items-center justify-center section-padding bg-cream">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl border border-peach-100 p-8 md:p-10">
          <Link
            href="/portal/login"
            className="inline-flex items-center gap-2 text-muted-green text-sm hover:text-green-700 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Login
          </Link>

          {sent ? (
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="font-serif text-2xl font-bold text-deep-brown mb-4">
                Check Your Email
              </h1>
              <p className="text-charcoal/70 mb-6">
                If an account exists with <strong>{email}</strong>, we&apos;ve sent a
                password reset link. Please check your inbox and spam folder.
              </p>
              <p className="text-charcoal/50 text-sm">
                The link expires in 1 hour.
              </p>
            </div>
          ) : (
            <>
              <h1 className="font-serif text-2xl font-bold text-deep-brown mb-2">
                Forgot Password
              </h1>
              <p className="text-charcoal/60 text-sm mb-8">
                Enter your email address and we&apos;ll send you a link to reset
                your password.
              </p>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="forgot-email"
                    className="block text-sm font-medium text-charcoal mb-2"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
                    <input
                      id="forgot-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-12 pr-4 py-3 border border-peach-200 rounded-xl text-charcoal focus:ring-2 focus:ring-peach focus:border-peach"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary py-4 text-base disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
