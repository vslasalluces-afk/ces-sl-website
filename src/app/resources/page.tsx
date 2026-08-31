import type { Metadata } from "next";
import { FileText, Download, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Resources",
  description: "Access CES publications, annual reports, policies, programme reports and accountability documents.",
};

export default function ResourcesPage() {
  return (
    <>
      <section className="bg-cream section-padding" aria-labelledby="resources-hero">
        <div className="container-wide mx-auto">
          <div className="max-w-2xl">
            <span className="inline-block text-sm font-semibold text-muted-green uppercase tracking-wider mb-3">Accountability</span>
            <h1 id="resources-hero" className="text-4xl md:text-5xl font-serif font-bold text-deep-brown mb-6">Resources & Reports</h1>
            <p className="text-lg text-charcoal/80 leading-relaxed">
              Access our publications, annual reports, policies and programme documentation. Transparency and accountability are central to our work.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { type: "Annual Reports", desc: "Yearly reports on CES programmes, finances and impact.", icon: FileText },
              { type: "Strategic Plans", desc: "Long-term strategic planning and organisational direction.", icon: FileText },
              { type: "Programme Reports", desc: "Detailed reports from individual programme areas.", icon: FileText },
              { type: "Policies", desc: "Organisational policies on safeguarding, governance and operations.", icon: FileText },
              { type: "Financial Accountability", desc: "Financial reports and accountability information approved for public release.", icon: FileText },
              { type: "Media & Safeguarding Guidance", desc: "Guidelines on ethical media use and community safeguarding.", icon: FileText },
            ].map((item) => (
              <div key={item.type} className="card p-6">
                <div className="w-10 h-10 rounded-full bg-peach-100 flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-deep-brown" />
                </div>
                <h2 className="font-serif text-lg font-bold text-deep-brown mb-2">{item.type}</h2>
                <p className="text-charcoal/70 text-sm mb-4">{item.desc}</p>
                <p className="text-xs text-charcoal/40 italic">Documents will be available once CES uploads approved content.</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-charcoal/50 mt-12">
            CES will publish approved resources through the content management system. Check back for updates.
          </p>
        </div>
      </section>
    </>
  );
}
