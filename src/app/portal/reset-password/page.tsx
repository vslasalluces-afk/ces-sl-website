"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Lock, CheckCircle, AlertCircle } from "lucide-react";

function ResetForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  if (!token) {
    return (
      <div className="text-center">
        <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <h1 className="font-serif text-2xl font-bold text-deep-brown mb-4">
          Invalid Reset Link
        </h1>
        <p className="text-charcoal/70 mb-6">
          This password reset link is invalid or has expired.
        </p>
        <Link href="/portal/forgot-password" className="btn-primary inline-flex">
          Request New Link
        </Link>
      </div>
    );
  }

  if (success) {
    return (
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="font-serif text-2xl font-bold text-deep-brown mb-4">
          Password Reset Successfully
        </h1>
        <p className="text-charcoal/70 mb-6">
          Your password has been changed. You can now sign in with your new
          password.
        </p>
        <Link href="/portal/login" className="btn-primary inline-flex">
          Sign In
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
      } else {
        setError(data.error || "Failed to reset password");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="font-serif text-2xl font-bold text-deep-brown mb-2">
        Set New Password
      </h1>
      <p className="text-charcoal/60 text-sm mb-8">
        Enter a new password for your CES donor account.
      </p>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="new-pw" className="block text-sm font-medium text-charcoal mb-2">
            New Password
          </label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
            <input
              id="new-pw"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          <label htmlFor="confirm-pw" className="block text-sm font-medium text-charcoal mb-2">
            Confirm New Password
          </label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
            <input
              id="confirm-pw"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-3 border border-peach-200 rounded-xl text-charcoal focus:ring-2 focus:ring-peach focus:border-peach"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary py-4 text-base disabled:opacity-50"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center section-padding bg-cream">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl border border-peach-100 p-8 md:p-10">
          <Suspense fallback={<div className="animate-spin w-8 h-8 border-4 border-peach border-t-transparent rounded-full mx-auto" />}>
            <ResetForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
