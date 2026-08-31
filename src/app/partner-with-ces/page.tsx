import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Partner With CES",
  description: "Explore partnership opportunities with CES. Collaborate as a church, NGO, foundation, research institution or corporate supporter.",
};

export default function PartnerWithCESPage() {
  return (
    <>
      <section className="bg-cream section-padding" aria-labelledby="partner-hero">
        <div className="container-wide mx-auto">
          <div className="max-w-2xl">
            <span className="inline-block text-sm font-semibold text-muted-green uppercase tracking-wider mb-3">Collaborate</span>
            <h1 id="partner-hero" className="text-4xl md:text-5xl font-serif font-bold text-deep-brown mb-6">Partner With CES</h1>
            <p className="text-lg text-charcoal/80 leading-relaxed">
              We welcome partnerships with churches, NGOs, foundations, public institutions, corporate supporters and research organisations committed to sustainable community development.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide mx-auto">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <h2 className="font-serif text-2xl font-bold text-deep-brown mb-6">Partnership Enquiry</h2>
              <form action="/api/partnership" method="POST" className="space-y-6">
                <div>
                  <label htmlFor="p-org" className="block text-sm font-medium text-charcoal mb-1">Organisation Name *</label>
                  <input id="p-org" name="organisation" type="text" required className="w-full px-4 py-3 border border-peach-200 rounded-lg text-charcoal focus:ring-2 focus:ring-peach focus:border-peach" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="p-contact" className="block text-sm font-medium text-charcoal mb-1">Contact Person *</label>
                    <input id="p-contact" name="contact" type="text" required className="w-full px-4 py-3 border border-peach-200 rounded-lg text-charcoal focus:ring-2 focus:ring-peach focus:border-peach" />
                  </div>
                  <div>
                    <label htmlFor="p-email" className="block text-sm font-medium text-charcoal mb-1">Email *</label>
                    <input id="p-email" name="email" type="email" required className="w-full px-4 py-3 border border-peach-200 rounded-lg text-charcoal focus:ring-2 focus:ring-peach focus:border-peach" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="p-type" className="block text-sm font-medium text-charcoal mb-1">Organisation Type</label>
                    <select id="p-type" name="type" className="w-full px-4 py-3 border border-peach-200 rounded-lg text-charcoal focus:ring-2 focus:ring-peach focus:border-peach bg-white">
                      <option value="">Select type</option>
                      <option value="church">Church</option>
                      <option value="ngo">NGO / Civil Society</option>
                      <option value="foundation">Foundation</option>
                      <option value="government">Government / Public Institution</option>
                      <option value="corporate">Corporate</option>
                      <option value="research">Research / Academic</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="p-interest" className="block text-sm font-medium text-charcoal mb-1">Area of Interest</label>
                    <select id="p-interest" name="interest" className="w-full px-4 py-3 border border-peach-200 rounded-lg text-charcoal focus:ring-2 focus:ring-peach focus:border-peach bg-white">
                      <option value="">Select area</option>
                      <option value="agriculture">Agriculture & Food Security</option>
                      <option value="education">Education & Training</option>
                      <option value="gender">Gender Equality & Women&apos;s Empowerment</option>
                      <option value="livelihoods">Sustainable Livelihoods</option>
                      <option value="community">Community Development</option>
                      <option value="funding">Funding & Grants</option>
                      <option value="research">Research & Learning</option>
                      <option value="general">General Partnership</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="p-message" className="block text-sm font-medium text-charcoal mb-1">Message</label>
                  <textarea id="p-message" name="message" rows={5} className="w-full px-4 py-3 border border-peach-200 rounded-lg text-charcoal focus:ring-2 focus:ring-peach focus:border-peach" placeholder="Tell us about your organisation and how you would like to partner with CES." />
                </div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" required name="privacy" className="mt-1 w-4 h-4 text-muted-green border-peach-200 rounded focus:ring-peach" />
                  <span className="text-sm text-charcoal/80">
                    I consent to CES processing this information to respond to this partnership enquiry. See our <Link href="/privacy" className="text-muted-green underline">Privacy Policy</Link>.
                  </span>
                </label>
                <button type="submit" className="btn-primary text-base px-8 py-3">Submit Partnership Enquiry</button>
              </form>
            </div>

            <aside className="lg:col-span-2">
              <div className="bg-cream rounded-2xl p-6 md:p-8 border border-peach-100 sticky top-24">
                <h3 className="font-serif text-xl font-bold text-deep-brown mb-4">Partnership With CES</h3>
                <div className="space-y-4 text-sm text-charcoal/80">
                  <p>CES has worked with a range of partners including churches, international NGOs, government bodies and community organisations.</p>
                  <p>We seek partnerships that align with our mission, strengthen community capacity and contribute to sustainable development outcomes.</p>
                  <p>Partnership opportunities include joint programme implementation, technical support, funding, research collaboration and capacity building.</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
