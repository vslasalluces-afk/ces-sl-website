import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Accessibility",
  description: "Accessibility statement for the CES website.",
};

export default function AccessibilityPage() {
  return (
    <section className="section-padding">
      <div className="container-narrow mx-auto">
        <h1 className="text-4xl font-serif font-bold text-deep-brown mb-8">Accessibility Statement</h1>
        <div className="prose prose-lg max-w-none text-charcoal/80 space-y-6">
          <p>Christian Extension Services (CES) is committed to making this website accessible to all visitors, including people with disabilities.</p>

          <h2 className="font-serif text-2xl font-bold text-deep-brown">Our Commitment</h2>
          <p>We target WCAG 2.2 Level AA compliance. Our website includes:</p>
          <ul>
            <li>Semantic HTML and ARIA landmarks</li>
            <li>Skip-to-content navigation</li>
            <li>Keyboard-accessible navigation and interactive elements</li>
            <li>Visible focus indicators</li>
            <li>Sufficient colour contrast</li>
            <li>Alternative text on images</li>
            <li>Responsive design for all screen sizes</li>
            <li>Reduced-motion support</li>
            <li>Accessible forms with labels and error messages</li>
          </ul>

          <h2 className="font-serif text-2xl font-bold text-deep-brown">Known Limitations</h2>
          <p>Some third-party content, legacy documents or embedded media may not fully meet accessibility standards. We are working to address these limitations.</p>

          <h2 className="font-serif text-2xl font-bold text-deep-brown">Feedback</h2>
          <p>If you experience any accessibility barriers on this website, please contact us at <a href={`mailto:${SITE.email}`} className="text-muted-green underline">{SITE.email}</a>. We welcome your feedback and will work to resolve issues promptly.</p>

          <p className="text-sm text-charcoal/50 italic">Last reviewed: 2026.</p>
        </div>
      </div>
    </section>
  );
}
