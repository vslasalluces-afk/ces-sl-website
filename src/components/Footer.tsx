import Link from "next/link";
import { SITE } from "@/lib/constants";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-deep-brown text-warm-white" role="contentinfo">
      <div className="container-wide mx-auto section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-peach to-gold flex items-center justify-center text-deep-brown font-bold text-sm font-serif">
                CES
              </div>
              <span className="font-serif font-bold text-lg">CES SL</span>
            </div>
            <p className="text-warm-white/80 text-sm leading-relaxed mb-4">
              {SITE.tagline}
            </p>
            <p className="text-warm-white/60 text-xs leading-relaxed">
              The development arm of the Christian Reformed Church in Sierra
              Leone.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif font-bold text-lg mb-4 text-peach">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { label: "About CES", href: "/about" },
                { label: "Our Programmes", href: "/programmes" },
                { label: "Stories of Transformation", href: "/impact-stories" },
                { label: "Give / Donate", href: "/donate" },
                { label: "Get Involved", href: "/get-involved" },
                { label: "Resources", href: "/resources" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-warm-white/80 hover:text-peach text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif font-bold text-lg mb-4 text-peach">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-warm-white/80">
                <MapPin className="w-4 h-4 mt-0.5 text-peach shrink-0" />
                <span>{SITE.address}</span>
              </li>
              <li>
                <a
                  href={`tel:${SITE.phone}`}
                  className="flex items-center gap-3 text-sm text-warm-white/80 hover:text-peach transition-colors"
                >
                  <Phone className="w-4 h-4 text-peach shrink-0" />
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-3 text-sm text-warm-white/80 hover:text-peach transition-colors break-all"
                >
                  <Mail className="w-4 h-4 text-peach shrink-0" />
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={SITE.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-warm-white/80 hover:text-peach transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-peach shrink-0" />
                  CES on Facebook
                </a>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="font-serif font-bold text-lg mb-4 text-peach">
              Policies
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Use", href: "/terms" },
                { label: "Donation Policy", href: "/donation-policy" },
                { label: "Safeguarding & Media Consent", href: "/safeguarding-and-media-consent" },
                { label: "Accessibility", href: "/accessibility" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-warm-white/80 hover:text-peach text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-warm-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-warm-white/50 text-xs">
            © {new Date().getFullYear()} Christian Extension Services (CES). All
            rights reserved.
          </p>
          <p className="text-warm-white/40 text-xs">
            Development arm of the Christian Reformed Church in Sierra Leone
          </p>
        </div>
      </div>
    </footer>
  );
}
