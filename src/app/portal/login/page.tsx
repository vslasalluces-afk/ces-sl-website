"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Mail, Lock, ArrowRight, AlertCircle, CheckCircle } from "lucide-react";

function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/portal/dashboard";
  const error = searchParams.get("error");
  const registered = searchParams.get("registered");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    error === "CredentialsSignin" ? "Invalid email or password" : ""
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    if (result?.error) {
      setErrorMessage("Invalid email or password");
      setLoading(false);
    } else if (result?.url) {
      window.location.href = result.url;
    }
  };

  return (
    <section className="min-h-[80vh] flex items-center justify-center section-padding bg-cream">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl border border-peach-100 p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-peach to-gold flex items-center justify-center mx-auto mb-4 text-deep-brown font-serif font-bold text-xl">
              CES
            </div>
            <h1 className="font-serif text-2xl font-bold text-deep-brown mb-2">
              Donor Portal
            </h1>
            <p className="text-charcoal/60 text-sm">
              Sign in to manage your donations and view your giving history.
            </p>
          </div>

          {registered && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              <p className="text-green-700 text-sm">
                Account created successfully! Please sign in with your credentials.
              </p>
            </div>
          )}

          {errorMessage && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm">{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 border border-peach-200 rounded-xl text-charcoal focus:ring-2 focus:ring-peach focus:border-peach"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-charcoal mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 border border-peach-200 rounded-xl text-charcoal focus:ring-2 focus:ring-peach focus:border-peach"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="animate-spin w-5 h-5 border-2 border-warm-white border-t-transparent rounded-full" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-4 text-center">
            <Link
              href="/portal/forgot-password"
              className="text-sm text-charcoal/50 hover:text-muted-green transition-colors"
            >
              Forgot your password?
            </Link>
          </div>

          <div className="mt-6 pt-6 border-t border-peach-100 text-center space-y-4">
            <p className="text-sm text-charcoal/60">
              Don&apos;t have an account?{" "}
              <Link
                href="/portal/register"
                className="text-muted-green font-semibold hover:text-green-700 transition-colors"
              >
                Create Account →
              </Link>
            </p>
            <Link
              href="/donate"
              className="text-charcoal/50 text-xs hover:text-charcoal transition-colors block"
            >
              or make a donation without an account
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function DonorLoginPage() {
  return (
    <Suspense fallback={
      <section className="min-h-[80vh] flex items-center justify-center section-padding bg-cream">
        <div className="animate-spin w-8 h-8 border-4 border-peach border-t-transparent rounded-full" />
      </section>
    }>
      <LoginForm />
    </Suspense>
  );
}
