import type { Metadata } from "next";
import Link from "next/link";
import { SITE, STOCK_IMAGES } from "@/lib/constants";
import { Heart, Shield, ArrowRight, Lock, Globe, RefreshCcw } from "lucide-react";

export const metadata: Metadata = {
  title: "Give / Donate",
  description: "Support CES programmes in Sierra Leone. Make a secure donation to help transform communities through training, empowerment and sustainable development.",
};

export default function DonatePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-20 md:py-28" aria-labelledby="donate-hero">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${STOCK_IMAGES.harvest}')` }} role="img" aria-label="Farmer harvesting crops – sustainable agriculture in action" />
        <div className="absolute inset-0 bg-deep-brown/70" />
        <div className="relative z-10 container-wide mx-auto px-4 md:px-8">
          <div className="max-w-2xl">
            <span className="inline-block text-sm font-semibold text-peach uppercase tracking-wider mb-3">Give</span>
            <h1 id="donate-hero" className="text-4xl md:text-5xl font-serif font-bold text-warm-white mb-6">Support Our Work</h1>
            <p className="text-lg text-warm-white/90 leading-relaxed">
              Your generosity helps transform communities across Sierra Leone through training, empowerment and sustainable development.
            </p>
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="section-padding" aria-labelledby="donate-form-heading">
        <div className="container-wide mx-auto">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <h2 id="donate-form-heading" className="font-serif text-3xl font-bold text-deep-brown mb-6">Make a Donation</h2>

              <div className="bg-white rounded-2xl shadow-sm border border-peach-100 p-6 md:p-8">
                {/* Amount Selection */}
                <fieldset className="mb-8">
                  <legend className="font-serif text-lg font-bold text-deep-brown mb-4">Select Amount</legend>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {[25, 50, 100, 250, 500, 1000].map((amount) => (
                      <button key={amount} className="p-3 border-2 border-peach-200 rounded-xl text-deep-brown font-bold hover:border-peach hover:bg-peach-100 transition-colors text-center">
                        ${amount}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-deep-brown font-bold">$</span>
                    <input type="number" placeholder="Other amount" className="flex-1 px-4 py-3 border border-peach-200 rounded-lg text-charcoal focus:ring-2 focus:ring-peach focus:border-peach" aria-label="Custom donation amount" />
                  </div>
                </fieldset>

                {/* Frequency */}
                <fieldset className="mb-8">
                  <legend className="font-serif text-lg font-bold text-deep-brown mb-4">Donation Type</legend>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {["One-off", "Monthly", "Quarterly", "Annual"].map((type) => (
                      <button key={type} className="p-3 border-2 border-peach-200 rounded-xl text-sm font-medium text-charcoal hover:border-peach hover:bg-peach-100 transition-colors">
                        {type}
                      </button>
                    ))}
                  </div>
                </fieldset>

                {/* Currency */}
                <fieldset className="mb-8">
                  <legend className="font-serif text-lg font-bold text-deep-brown mb-4">Currency</legend>
                  <div className="grid grid-cols-4 gap-3">
                    {["USD", "GBP", "EUR", "SLE"].map((curr) => (
                      <button key={curr} className="p-3 border-2 border-peach-200 rounded-xl text-sm font-medium text-charcoal hover:border-peach hover:bg-peach-100 transition-colors">
                        {curr}
                      </button>
                    ))}
                  </div>
                </fieldset>

                {/* Donor Details */}
                <fieldset className="mb-8">
                  <legend className="font-serif text-lg font-bold text-deep-brown mb-4">Your Details</legend>
                  <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="donor-name" className="block text-sm font-medium text-charcoal mb-1">Full Name</label>
                        <input id="donor-name" type="text" className="w-full px-4 py-3 border border-peach-200 rounded-lg text-charcoal focus:ring-2 focus:ring-peach focus:border-peach" />
                      </div>
                      <div>
                        <label htmlFor="donor-email" className="block text-sm font-medium text-charcoal mb-1">Email</label>
                        <input id="donor-email" type="email" className="w-full px-4 py-3 border border-peach-200 rounded-lg text-charcoal focus:ring-2 focus:ring-peach focus:border-peach" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="donor-country" className="block text-sm font-medium text-charcoal mb-1">Country</label>
                      <input id="donor-country" type="text" className="w-full px-4 py-3 border border-peach-200 rounded-lg text-charcoal focus:ring-2 focus:ring-peach focus:border-peach" />
                    </div>
                    <div>
                      <label htmlFor="donor-message" className="block text-sm font-medium text-charcoal mb-1">Message (optional)</label>
                      <textarea id="donor-message" rows={3} className="w-full px-4 py-3 border border-peach-200 rounded-lg text-charcoal focus:ring-2 focus:ring-peach focus:border-peach" />
                    </div>
                  </div>
                </fieldset>

                {/* Consent */}
                <div className="space-y-3 mb-8">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" className="mt-1 w-4 h-4 text-muted-green border-peach-200 rounded focus:ring-peach" />
                    <span className="text-sm text-charcoal/80">I consent to CES contacting me about my donation and organisational updates. I can unsubscribe at any time.</span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" required className="mt-1 w-4 h-4 text-muted-green border-peach-200 rounded focus:ring-peach" />
                    <span className="text-sm text-charcoal/80">
                      I have read and agree to the <Link href="/privacy" className="text-muted-green underline">Privacy Policy</Link> and <Link href="/donation-policy" className="text-muted-green underline">Donation Policy</Link>.
                    </span>
                  </label>
                </div>

                {/* Payment notice */}
                <div className="bg-peach-100 rounded-xl p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Lock className="w-5 h-5 text-deep-brown shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-deep-brown mb-1">Secure Payment</p>
                      <p className="text-xs text-charcoal/70">
                        Payment processing is not yet active. CES is completing payment-provider onboarding and verification. Please contact us via WhatsApp or email to arrange your donation.
                      </p>
                    </div>
                  </div>
                </div>

                <a
                  href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent("Hello CES, I would like to support your programmes and need donation information.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full text-center text-base py-4 mb-3"
                >
                  Contact CES to Donate
                </a>
                <p className="text-center text-xs text-charcoal/50">
                  Online payment will be available once CES completes provider setup.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-2">
              <div className="bg-cream rounded-2xl p-6 md:p-8 border border-peach-100 mb-8">
                <h3 className="font-serif text-xl font-bold text-deep-brown mb-6">Why Give to CES?</h3>
                <div className="space-y-6">
                  {[
                    { icon: Heart, title: "Community Impact", desc: "Your gift directly supports programmes that transform communities in Sierra Leone." },
                    { icon: Shield, title: "Transparency", desc: "CES is committed to accountability, responsible stewardship and reporting to donors." },
                    { icon: Globe, title: "Sustainable Change", desc: "We build lasting capacity so communities can sustain their own development." },
                    { icon: RefreshCcw, title: "Recurring Support", desc: "Monthly giving provides stable funding that enables long-term programme planning." },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-peach-100 flex items-center justify-center shrink-0">
                        <item.icon className="w-5 h-5 text-deep-brown" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-deep-brown text-sm mb-1">{item.title}</h4>
                        <p className="text-charcoal/70 text-xs leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-deep-brown rounded-2xl p-6 md:p-8 text-warm-white">
                <h3 className="font-serif text-xl font-bold text-warm-white mb-4">Other Ways to Give</h3>
                <ul className="space-y-3 text-sm text-warm-white/80">
                  <li>• Contact CES directly via email or WhatsApp</li>
                  <li>• Partner as a church, foundation or institution</li>
                  <li>• Support a specific programme or campaign</li>
                  <li>• Volunteer your time and skills</li>
                </ul>
                <div className="mt-6 space-y-3">
                  <Link href="/partner-with-ces" className="btn-secondary border-warm-white text-warm-white hover:bg-warm-white hover:text-deep-brown w-full text-center text-sm">
                    Partnership Enquiry
                  </Link>
                  <Link href="/contact" className="btn-secondary border-warm-white/60 text-warm-white/80 hover:bg-warm-white hover:text-deep-brown w-full text-center text-sm">
                    Contact Us
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
