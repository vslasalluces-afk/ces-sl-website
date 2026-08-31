import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { MapPin, Phone, Mail, MessageCircle, Clock, ExternalLink } from "lucide-react";
import GlobeSection from "@/components/GlobeSection";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Christian Extension Services (CES) in Sierra Leone. Get in touch about our programmes, partnerships, donations or volunteering opportunities.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-cream section-padding" aria-labelledby="contact-hero">
        <div className="container-wide mx-auto">
          <div className="max-w-2xl">
            <span className="inline-block text-sm font-semibold text-muted-green uppercase tracking-wider mb-3">Contact</span>
            <h1 id="contact-hero" className="text-4xl md:text-5xl font-serif font-bold text-deep-brown mb-6">Get in Touch</h1>
            <p className="text-lg text-charcoal/80 leading-relaxed">
              We would love to hear from you. Whether you have a question about our programmes, want to explore a partnership, or would like to support our work, please reach out.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide mx-auto">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <h2 className="font-serif text-2xl font-bold text-deep-brown mb-6">Send Us a Message</h2>
              <form action="/api/contact" method="POST" className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-charcoal mb-1">Full Name *</label>
                    <input id="contact-name" name="name" type="text" required className="w-full px-4 py-3 border border-peach-200 rounded-lg text-charcoal focus:ring-2 focus:ring-peach focus:border-peach" />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-charcoal mb-1">Email Address *</label>
                    <input id="contact-email" name="email" type="email" required className="w-full px-4 py-3 border border-peach-200 rounded-lg text-charcoal focus:ring-2 focus:ring-peach focus:border-peach" />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-sm font-medium text-charcoal mb-1">Subject</label>
                  <select id="contact-subject" name="subject" className="w-full px-4 py-3 border border-peach-200 rounded-lg text-charcoal focus:ring-2 focus:ring-peach focus:border-peach bg-white">
                    <option value="">Select a subject</option>
                    <option value="general">General Enquiry</option>
                    <option value="programmes">Programme Information</option>
                    <option value="donation">Donation Enquiry</option>
                    <option value="partnership">Partnership Enquiry</option>
                    <option value="volunteer">Volunteering</option>
                    <option value="media">Media Enquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-charcoal mb-1">Message *</label>
                  <textarea id="contact-message" name="message" rows={6} required className="w-full px-4 py-3 border border-peach-200 rounded-lg text-charcoal focus:ring-2 focus:ring-peach focus:border-peach" />
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" required className="mt-1 w-4 h-4 text-muted-green border-peach-200 rounded focus:ring-peach" />
                  <span className="text-sm text-charcoal/80">
                    I consent to CES processing my personal information to respond to this enquiry, in accordance with the Privacy Policy.
                  </span>
                </label>

                <button type="submit" className="btn-primary text-base px-8 py-3">
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Sidebar */}
            <aside className="lg:col-span-2 space-y-8">
              <div className="bg-cream rounded-2xl p-6 md:p-8 border border-peach-100">
                <h3 className="font-serif text-xl font-bold text-deep-brown mb-6">Contact Details</h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-peach-100 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-deep-brown" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-deep-brown text-sm mb-1">Address</h4>
                      <p className="text-charcoal/70 text-sm">{SITE.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-peach-100 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-deep-brown" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-deep-brown text-sm mb-1">Phone & WhatsApp</h4>
                      <a href={`tel:${SITE.phone}`} className="text-charcoal/70 text-sm hover:text-muted-green transition-colors block">{SITE.phone}</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-peach-100 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-deep-brown" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-deep-brown text-sm mb-1">Email</h4>
                      <a href={`mailto:${SITE.email}`} className="text-charcoal/70 text-sm hover:text-muted-green transition-colors break-all">{SITE.email}</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-peach-100 flex items-center justify-center shrink-0">
                      <ExternalLink className="w-5 h-5 text-deep-brown" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-deep-brown text-sm mb-1">Facebook</h4>
                      <a href={SITE.facebook} target="_blank" rel="noopener noreferrer" className="text-charcoal/70 text-sm hover:text-muted-green transition-colors">CES on Facebook</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-muted-green rounded-2xl p-6 md:p-8 text-white">
                <MessageCircle className="w-8 h-8 text-white/80 mb-4" />
                <h3 className="font-serif text-xl font-bold text-white mb-2">WhatsApp</h3>
                <p className="text-white/80 text-sm mb-4">
                  Quick question? Reach us on WhatsApp for a faster response.
                </p>
                <a
                  href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent("Hello CES, I would like more information about your work.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-muted-green font-semibold px-6 py-3 rounded-lg hover:bg-green-100 transition-colors text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat on WhatsApp
                </a>
              </div>

              <div className="bg-peach-100 rounded-2xl p-6 md:p-8 border border-peach-200">
                <Clock className="w-6 h-6 text-deep-brown mb-3" />
                <h3 className="font-serif text-lg font-bold text-deep-brown mb-2">Response Times</h3>
                <p className="text-charcoal/70 text-sm leading-relaxed">
                  We aim to respond to enquiries within 2–3 working days. Urgent matters can be directed to our WhatsApp number for a faster response.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Globe Section */}
      <GlobeSection />
    </>
  );
}
