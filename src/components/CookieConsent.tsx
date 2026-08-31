"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("ces-cookie-consent");
    if (!consent) {
      // Delay showing to avoid layout shift
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("ces-cookie-consent", "accepted");
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("ces-cookie-consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-in slide-in-from-bottom-4 duration-500"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="container-wide mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl border border-peach-100 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-12 h-12 rounded-full bg-peach-100 flex items-center justify-center shrink-0">
            <Cookie className="w-6 h-6 text-deep-brown" />
          </div>
          <div className="flex-1">
            <h2 className="font-serif font-bold text-deep-brown text-lg mb-2">
              We value your privacy
            </h2>
            <p className="text-charcoal/70 text-sm leading-relaxed">
              We use essential cookies to ensure our website works properly. We'd also like to use
              analytics cookies to understand how you use our site and improve your experience.
              Read our{" "}
              <Link href="/privacy" className="text-muted-green underline">
                Privacy Policy
              </Link>{" "}
              for more details.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={handleDecline}
              className="flex-1 md:flex-none px-6 py-3 border-2 border-peach-200 text-charcoal rounded-xl font-medium text-sm hover:bg-peach-100 transition-colors"
            >
              Essential Only
            </button>
            <button
              onClick={handleAccept}
              className="flex-1 md:flex-none px-6 py-3 bg-deep-brown text-warm-white rounded-xl font-medium text-sm hover:bg-charcoal transition-colors"
            >
              Accept All
            </button>
          </div>
          <button
            onClick={handleDecline}
            className="absolute top-4 right-4 md:static text-charcoal/40 hover:text-charcoal"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
