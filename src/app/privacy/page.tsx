import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "CES privacy policy – how we collect, use and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <section className="section-padding">
      <div className="container-narrow mx-auto">
        <h1 className="text-4xl font-serif font-bold text-deep-brown mb-8">Privacy Policy</h1>
        <div className="prose prose-lg max-w-none text-charcoal/80 space-y-6">
          <p>Christian Extension Services (CES) is committed to protecting your privacy and handling your personal information responsibly.</p>

          <h2 className="font-serif text-2xl font-bold text-deep-brown">Information We Collect</h2>
          <p>We may collect personal information when you contact us, subscribe to our newsletter, make a donation, submit a volunteer or partnership enquiry or use our website. This may include your name, email address, phone number, country and any information you provide in forms or messages.</p>

          <h2 className="font-serif text-2xl font-bold text-deep-brown">How We Use Your Information</h2>
          <p>We use your information to respond to enquiries, process donations, manage volunteer and partnership enquiries, send communications you have consented to, improve our services and comply with legal obligations.</p>

          <h2 className="font-serif text-2xl font-bold text-deep-brown">Data Protection</h2>
          <p>We take reasonable measures to protect your personal information. We do not sell or share your data with third parties for marketing purposes. Payment information is processed by secure third-party payment providers and is not stored on our systems.</p>

          <h2 className="font-serif text-2xl font-bold text-deep-brown">Your Rights</h2>
          <p>You have the right to access, correct or request deletion of your personal information. You can unsubscribe from marketing communications at any time. To exercise your rights, contact us at <a href={`mailto:${SITE.email}`} className="text-muted-green underline">{SITE.email}</a>.</p>

          <h2 className="font-serif text-2xl font-bold text-deep-brown">Cookies</h2>
          <p>Our website may use essential cookies to ensure proper functionality. We will obtain your consent before using any non-essential cookies or analytics tools.</p>

          <h2 className="font-serif text-2xl font-bold text-deep-brown">Contact</h2>
          <p>For privacy-related enquiries, please contact us at <a href={`mailto:${SITE.email}`} className="text-muted-green underline">{SITE.email}</a>.</p>

          <p className="text-sm text-charcoal/50 italic">This policy is subject to update. Last reviewed: 2026.</p>
        </div>
      </div>
    </section>
  );
}
