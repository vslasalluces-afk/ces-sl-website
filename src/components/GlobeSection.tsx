"use client";

import dynamic from "next/dynamic";
import { MapPin, Phone, Mail } from "lucide-react";
import { SITE } from "@/lib/constants";

const Globe = dynamic(() => import("@/components/Globe"), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-square max-w-lg mx-auto flex items-center justify-center">
      <div className="w-64 h-64 rounded-full bg-gradient-to-br from-deep-brown/50 to-charcoal/50 border border-peach/20 flex items-center justify-center">
        <div className="w-4 h-4 bg-peach rounded-full animate-pulse" />
      </div>
    </div>
  ),
});

export default function GlobeSection() {
  return (
    <section
      className="section-padding bg-deep-brown"
      aria-labelledby="globe-heading"
    >
      <div className="container-wide mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2
              id="globe-heading"
              className="font-serif text-3xl md:text-4xl font-bold text-warm-white mb-6"
            >
              Find Us on the Globe
            </h2>
            <p className="text-warm-white/80 text-lg leading-relaxed mb-6">
              CES is located in Kabala, Koinadugu District, in the Northern
              Province of Sierra Leone. The pulsing pin on the globe marks our
              office at 3 Mile, Kabala–Makeni Highway.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-warm-white/70">
                <MapPin className="w-5 h-5 text-peach shrink-0" />
                <span className="text-sm">{SITE.address}</span>
              </div>
              <div className="flex items-center gap-3 text-warm-white/70">
                <Phone className="w-5 h-5 text-peach shrink-0" />
                <a
                  href={`tel:${SITE.phone}`}
                  className="text-sm hover:text-peach transition-colors"
                >
                  {SITE.phone}
                </a>
              </div>
              <div className="flex items-center gap-3 text-warm-white/70">
                <Mail className="w-5 h-5 text-peach shrink-0" />
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-sm hover:text-peach transition-colors break-all"
                >
                  {SITE.email}
                </a>
              </div>
            </div>
            <p className="text-warm-white/40 text-xs mt-6">
              Drag the globe to rotate · Coordinates: 9.59°N, 11.56°W
            </p>
          </div>
          {/* <Globe /> */}
        </div>
      </div>
    </section>
  );
}
