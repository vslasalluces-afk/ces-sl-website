"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";
import SearchDialog from "./SearchDialog";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-warm-white/95 backdrop-blur-md border-b border-peach-100">
      {/* Skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-deep-brown focus:text-white focus:px-4 focus:py-2 focus:rounded"
      >
        Skip to main content
      </a>

      {/* =========================
          DESKTOP HEADER
          ========================= */}
      <div className="hidden lg:block">
        <div className="container-wide mx-auto px-4 md:px-8">
          {/* Top row */}
          <div className="flex items-center justify-between min-h-[78px]">
            {/* Logo + organisation identity */}
            <Link
              href="/"
              className="flex items-center gap-4 group"
              aria-label="Christian Extension Services home"
            >
              <Image
                src="/images/ces-logo.png"
                alt="Christian Extension Services"
                width={100}
                height={100}
                priority
                className="h-16 w-auto object-contain"
              />

              <div className="hidden xl:block border-l border-peach-200 pl-4">
                <span className="block font-serif text-lg font-bold text-deep-brown leading-tight">
                  Christian Extension Services
                </span>
                <span className="block text-xs text-muted-green mt-1 tracking-wide">
                  Transforming Communities. Empowering Lives.
                </span>
              </div>
            </Link>

            {/* Search */}
            <div className="flex items-center">
              <SearchDialog />
            </div>
          </div>

          {/* Navigation row */}
          <div className="border-t border-peach-100">
            <div className="flex items-center justify-between min-h-[54px]">
              <nav
                className="flex items-center gap-1"
                aria-label="Primary navigation"
              >
                {NAV_ITEMS.map((item) => {
                  const hasChildren =
                    "children" in item &&
                    Boolean(item.children && item.children.length > 0);

                  return (
                    <div
                      key={item.href}
                      className="relative"
                      onMouseEnter={() =>
                        hasChildren && setOpenDropdown(item.href)
                      }
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <Link
                        href={item.href}
                        className="relative px-3.5 py-3 text-sm font-medium text-charcoal inline-flex items-center gap-1.5 transition-colors hover:text-muted-green group"
                      >
                        {item.label}

                        {hasChildren && (
                          <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" />
                        )}

                        <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-peach scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                      </Link>

                      {/* Dropdown */}
                      {hasChildren && openDropdown === item.href && (
                        <div className="absolute top-full left-0 pt-1 z-50">
                          <div className="bg-white rounded-xl shadow-xl border border-peach-100 py-2 min-w-[220px] overflow-hidden">
                            {item.children?.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className="block px-5 py-3 text-sm text-charcoal hover:bg-cream hover:text-muted-green transition-colors"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>

              {/* Donate CTA */}
              <Link
                href="/donate"
                className="inline-flex items-center justify-center bg-peach text-deep-brown font-bold text-sm px-6 py-2.5 rounded-full hover:bg-peach-soft hover:shadow-md transition-all duration-300"
              >
                Donate Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* =========================
          MOBILE / TABLET HEADER
          ========================= */}
      <div className="lg:hidden">
        <div className="container-wide mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center"
              aria-label="Christian Extension Services home"
            >
              <Image
                src="/images/ces-logo.png"
                alt="Christian Extension Services"
                width={90}
                height={90}
                priority
                className="h-12 w-auto object-contain"
              />
            </Link>

            {/* Mobile controls */}
            <div className="flex items-center gap-2">
              <SearchDialog />

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2.5 text-charcoal hover:text-deep-brown rounded-lg hover:bg-peach-100 transition-colors"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =========================
          MOBILE NAVIGATION
          ========================= */}
      {mobileOpen && (
        <nav
          className="lg:hidden bg-warm-white border-t border-peach-100 shadow-lg"
          aria-label="Mobile navigation"
        >
          <div className="container-wide mx-auto px-4 py-4">
            <div className="space-y-1">
              {NAV_ITEMS.map((item) => {
                const hasChildren =
                  "children" in item &&
                  Boolean(item.children && item.children.length > 0);

                return (
                  <div key={item.href}>
                    <div className="flex items-center">
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex-1 px-4 py-3 text-charcoal font-medium hover:text-muted-green hover:bg-cream rounded-lg transition-colors"
                      >
                        {item.label}
                      </Link>

                      {hasChildren && (
                        <button
                          type="button"
                          onClick={() =>
                            setOpenDropdown(
                              openDropdown === item.href ? null : item.href,
                            )
                          }
                          className="p-3 text-charcoal/60 hover:text-muted-green"
                          aria-label={`Expand ${item.label}`}
                          aria-expanded={openDropdown === item.href}
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform ${
                              openDropdown === item.href ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      )}
                    </div>

                    {hasChildren && openDropdown === item.href && (
                      <div className="ml-4 mb-2 border-l-2 border-peach-100">
                        {item.children?.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className="block px-5 py-2.5 text-sm text-charcoal/70 hover:text-muted-green transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mobile Donate */}
            <div className="pt-4 mt-4 border-t border-peach-100">
              <Link
                href="/donate"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center w-full bg-peach text-deep-brown font-bold py-3.5 rounded-full hover:bg-peach-soft transition-colors"
              >
                Donate Now
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
