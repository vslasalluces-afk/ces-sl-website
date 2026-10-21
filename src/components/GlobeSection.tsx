"use client";

import { ArrowUpRight, Globe2, MapPin } from "lucide-react";

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=9.584629,-11.558921";

const GOOGLE_MAPS_EMBED =
  "https://www.google.com/maps?q=9.584629,-11.558921&z=6&output=embed";

export default function GlobeSection() {
  return (
    <section className="relative overflow-hidden bg-warm-white py-20 md:py-24">
      <style jsx>{`
        @keyframes ces-orbit {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes ces-pulse {
          0%,
          100% {
            transform: scale(0.9);
            opacity: 0.32;
          }
          50% {
            transform: scale(1.35);
            opacity: 0.08;
          }
        }

        .ces-orbit {
          animation: ces-orbit 42s linear infinite;
        }
        .ces-pulse {
          transform-origin: center;
          animation: ces-pulse 2.8s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .ces-orbit,
          .ces-pulse {
            animation: none;
          }
        }
      `}</style>

      <div className="container-narrow mx-auto px-4 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(280px,0.82fr)_minmax(420px,1.18fr)] lg:gap-16">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-peach/15 px-4 py-2 text-sm font-semibold text-deep-brown">
              <Globe2 className="h-4 w-4" />
              Find Us
            </div>

            <h2 className="font-serif text-3xl font-bold text-deep-brown md:text-4xl">
              Visit Christian Extension Services
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-charcoal/70">
              Our work is rooted in communities across Sierra Leone. Explore our
              location or open the exact CES position in Google Maps.
            </p>

            <div className="mt-8 flex items-start gap-4">
              <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-deep-brown text-peach">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-deep-brown">CES Office</p>
                <p className="mt-1 text-sm leading-6 text-charcoal/65">
                  Kabala, Koinadugu District
                  <br />
                  Northern Province, Sierra Leone
                </p>
              </div>
            </div>

            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-deep-brown px-6 py-3.5 font-semibold text-warm-white transition-transform hover:-translate-y-0.5 hover:bg-charcoal focus:outline-none focus:ring-2 focus:ring-deep-brown focus:ring-offset-2"
            >
              Open in Google Maps
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <div className="relative mx-auto w-full max-w-[650px]">
            <div className="pointer-events-none absolute inset-[-14px]">
              <div className="ces-orbit absolute inset-0 rounded-full border border-deep-brown/10 border-dashed" />
              <div className="absolute inset-[8%] rounded-full border border-peach/20" />
            </div>

            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open the CES location in Google Maps"
              className="group relative block aspect-square overflow-hidden rounded-full border-[10px] border-deep-brown bg-[#e7eee8] shadow-2xl focus:outline-none focus:ring-2 focus:ring-deep-brown focus:ring-offset-4"
            >
              <iframe
                title="CES location map"
                src={GOOGLE_MAPS_EMBED}
                className="pointer-events-none absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                aria-label="Map showing the CES location in Sierra Leone"
              />

              <span
                aria-hidden="true"
                className="absolute inset-0 z-10 cursor-pointer"
              />

              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_38%_30%,transparent_35%,rgba(24,49,40,0.08)_72%,rgba(24,49,40,0.25)_100%)]" />

              <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="ces-pulse absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-peach" />
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full border-4 border-warm-white bg-deep-brown text-peach shadow-lg">
                  <MapPin className="h-5 w-5 fill-current" />
                </div>
              </div>

              <div className="pointer-events-none absolute left-1/2 top-5 -translate-x-1/2 whitespace-nowrap rounded-full border border-warm-white/20 bg-deep-brown/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-warm-white backdrop-blur-md">
                Sierra Leone · West Africa
              </div>

              <div className="pointer-events-none absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-full border border-warm-white/20 bg-deep-brown/85 px-4 py-2.5 text-xs font-medium text-warm-white backdrop-blur-md">
                <span>9.584629, −11.558921</span>
                <span className="inline-flex items-center gap-1 text-peach transition-transform group-hover:translate-x-0.5">
                  Open location
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </a>

            <p className="mt-5 text-center text-xs text-charcoal/55">
              Click the map to open the exact CES location in Google Maps.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
