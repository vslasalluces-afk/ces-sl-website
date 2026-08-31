import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center section-padding">
      <div className="text-center max-w-lg">
        <div className="w-24 h-24 rounded-full bg-peach-100 flex items-center justify-center mx-auto mb-8">
          <Search className="w-10 h-10 text-deep-brown" />
        </div>
        <h1 className="font-serif text-5xl md:text-6xl font-bold text-deep-brown mb-4">
          404
        </h1>
        <h2 className="font-serif text-2xl font-bold text-deep-brown mb-4">
          Page Not Found
        </h2>
        <p className="text-charcoal/70 mb-8 leading-relaxed">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It may have been moved,
          deleted, or never existed.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-deep-brown text-warm-white font-semibold px-6 py-3 rounded-full hover:bg-charcoal transition-colors"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border-2 border-deep-brown text-deep-brown font-semibold px-6 py-3 rounded-full hover:bg-deep-brown hover:text-warm-white transition-colors"
          >
            Contact Us
          </Link>
        </div>
        <div className="mt-12 pt-8 border-t border-peach-100">
          <p className="text-sm text-charcoal/50 mb-4">Looking for something specific?</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: "About CES", href: "/about" },
              { label: "Programmes", href: "/programmes" },
              { label: "Donate", href: "/donate" },
              { label: "Contact", href: "/contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-green hover:text-green-700 text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
