import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for the CES website.",
};

export default function TermsPage() {
  return (
    <section className="section-padding">
      <div className="container-narrow mx-auto">
        <h1 className="text-4xl font-serif font-bold text-deep-brown mb-8">Terms of Use</h1>
        <div className="prose prose-lg max-w-none text-charcoal/80 space-y-6">
          <p>By using the Christian Extension Services (CES) website, you agree to these terms of use.</p>

          <h2 className="font-serif text-2xl font-bold text-deep-brown">Use of Content</h2>
          <p>All content on this website, including text, images, documents and media, is the property of CES or used with permission. You may not reproduce, distribute or use this content without written permission from CES.</p>

          <h2 className="font-serif text-2xl font-bold text-deep-brown">Accuracy</h2>
          <p>CES strives to ensure that information on this website is accurate and up to date. However, we do not guarantee the completeness or accuracy of all content and reserve the right to update information without notice.</p>

          <h2 className="font-serif text-2xl font-bold text-deep-brown">External Links</h2>
          <p>This website may contain links to external websites. CES is not responsible for the content, privacy practices or availability of external sites.</p>

          <h2 className="font-serif text-2xl font-bold text-deep-brown">Donations</h2>
          <p>Donation terms, refund policies and recurring donation conditions are outlined in our <a href="/donation-policy" className="text-muted-green underline">Donation Policy</a>.</p>

          <h2 className="font-serif text-2xl font-bold text-deep-brown">Contact</h2>
          <p>For questions about these terms, contact <a href={`mailto:${SITE.email}`} className="text-muted-green underline">{SITE.email}</a>.</p>

          <p className="text-sm text-charcoal/50 italic">Last reviewed: 2026.</p>
        </div>
      </div>
    </section>
  );
}
