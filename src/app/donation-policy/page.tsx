import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Donation Policy",
  description: "CES donation policy – how donations are processed, used and managed.",
};

export default function DonationPolicyPage() {
  return (
    <section className="section-padding">
      <div className="container-narrow mx-auto">
        <h1 className="text-4xl font-serif font-bold text-deep-brown mb-8">Donation Policy</h1>
        <div className="prose prose-lg max-w-none text-charcoal/80 space-y-6">
          <p>Christian Extension Services (CES) is grateful for all donations and is committed to using funds responsibly and transparently.</p>

          <h2 className="font-serif text-2xl font-bold text-deep-brown">Use of Donations</h2>
          <p>Donations to CES support our programmes, operations and community development work in Sierra Leone. Where a donor designates a donation for a specific programme or campaign, CES will use reasonable efforts to honour that designation.</p>

          <h2 className="font-serif text-2xl font-bold text-deep-brown">Payment Processing</h2>
          <p>Online payments are processed by secure third-party payment providers. CES does not store bank card details. Payment processing will be activated once CES completes provider onboarding, legal review and account verification.</p>

          <h2 className="font-serif text-2xl font-bold text-deep-brown">Recurring Donations</h2>
          <p>Recurring donations may be set up on a monthly, quarterly or annual basis. Donors may cancel or modify recurring donations at any time by contacting CES.</p>

          <h2 className="font-serif text-2xl font-bold text-deep-brown">Receipts and Confirmation</h2>
          <p>Donors will receive a confirmation email and receipt for their donation. CES provides donation receipts for record-keeping purposes.</p>

          <h2 className="font-serif text-2xl font-bold text-deep-brown">Refunds</h2>
          <p>If a donation was made in error, please contact CES within 30 days. CES will review refund requests on a case-by-case basis.</p>

          <h2 className="font-serif text-2xl font-bold text-deep-brown">Contact</h2>
          <p>For donation enquiries, contact <a href={`mailto:${SITE.email}`} className="text-muted-green underline">{SITE.email}</a> or WhatsApp <a href={`tel:${SITE.phone}`} className="text-muted-green underline">{SITE.phone}</a>.</p>

          <p className="text-sm text-charcoal/50 italic">Last reviewed: 2026.</p>
        </div>
      </div>
    </section>
  );
}
