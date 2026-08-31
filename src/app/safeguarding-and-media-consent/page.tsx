import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Safeguarding & Media Consent",
  description: "CES safeguarding policy and media consent guidance.",
};

export default function SafeguardingPage() {
  return (
    <section className="section-padding">
      <div className="container-narrow mx-auto">
        <h1 className="text-4xl font-serif font-bold text-deep-brown mb-8">Safeguarding & Media Consent</h1>
        <div className="prose prose-lg max-w-none text-charcoal/80 space-y-6">
          <p>Christian Extension Services (CES) is committed to the safeguarding of all people we work with, including children, young people and vulnerable adults.</p>

          <h2 className="font-serif text-2xl font-bold text-deep-brown">Safeguarding Principles</h2>
          <ul>
            <li>CES upholds the dignity, rights and safety of all individuals.</li>
            <li>We do not tolerate any form of abuse, exploitation or harassment.</li>
            <li>All staff, volunteers and partners are expected to uphold CES safeguarding standards.</li>
            <li>Safeguarding concerns can be reported through CES&apos;s internal processes.</li>
          </ul>

          <h2 className="font-serif text-2xl font-bold text-deep-brown">Media and Image Consent</h2>
          <ul>
            <li>CES obtains appropriate consent before using images or stories of individuals in public communications.</li>
            <li>We do not use exploitative imagery or content that could harm an individual&apos;s dignity.</li>
            <li>Identifiable photographs of children or vulnerable people are only published with documented consent and safeguarding approval.</li>
            <li>Media is used respectfully and in context, with accurate captions and attributions.</li>
          </ul>

          <h2 className="font-serif text-2xl font-bold text-deep-brown">AI and Data</h2>
          <p>The CES Impact Assistant is an AI tool that uses only CES-approved content. It does not collect or store sensitive beneficiary information. Users are informed when they are interacting with an AI assistant.</p>

          <h2 className="font-serif text-2xl font-bold text-deep-brown">Contact</h2>
          <p>For safeguarding concerns or media consent enquiries, contact <a href={`mailto:${SITE.email}`} className="text-muted-green underline">{SITE.email}</a>.</p>

          <p className="text-sm text-charcoal/50 italic">Last reviewed: 2026.</p>
        </div>
      </div>
    </section>
  );
}
