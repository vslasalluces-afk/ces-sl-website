import type { Metadata } from "next";
import Link from "next/link";
import { Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Campaigns",
  description: "Support CES fundraising campaigns to help transform communities in Sierra Leone.",
};

export default function CampaignsPage() {
  return (
    <>
      <section className="bg-cream section-padding" aria-labelledby="campaigns-hero">
        <div className="container-wide mx-auto">
          <div className="max-w-2xl">
            <span className="inline-block text-sm font-semibold text-muted-green uppercase tracking-wider mb-3">Fundraising</span>
            <h1 id="campaigns-hero" className="text-4xl md:text-5xl font-serif font-bold text-deep-brown mb-6">Campaigns</h1>
            <p className="text-lg text-charcoal/80 leading-relaxed">
              Support specific fundraising campaigns to help CES expand its reach and deepen its impact.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide mx-auto text-center py-16">
          <Heart className="w-12 h-12 text-peach mx-auto mb-4" />
          <h2 className="font-serif text-2xl font-bold text-deep-brown mb-4">Campaigns Coming Soon</h2>
          <p className="text-charcoal/70 max-w-md mx-auto mb-8">
            CES fundraising campaigns will be published here once payment processing has been set up and campaigns have been approved.
          </p>
          <Link href="/donate" className="btn-primary">Make a General Donation</Link>
        </div>
      </section>
    </>
  );
}
