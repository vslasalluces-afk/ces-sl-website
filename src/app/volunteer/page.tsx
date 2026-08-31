import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Volunteer",
  description: "Learn about volunteering opportunities with CES in Sierra Leone. Share your skills and make a meaningful contribution to community development.",
};

export default function VolunteerPage() {
  return (
    <>
      <section className="bg-cream section-padding" aria-labelledby="vol-hero">
        <div className="container-wide mx-auto">
          <div className="max-w-2xl">
            <span className="inline-block text-sm font-semibold text-muted-green uppercase tracking-wider mb-3">Get Involved</span>
            <h1 id="vol-hero" className="text-4xl md:text-5xl font-serif font-bold text-deep-brown mb-6">Volunteer With CES</h1>
            <p className="text-lg text-charcoal/80 leading-relaxed">
              Share your skills, experience and time to support community development in Sierra Leone. Volunteering with CES is an opportunity to make a meaningful contribution.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide mx-auto">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <h2 className="font-serif text-2xl font-bold text-deep-brown mb-6">Volunteer Enquiry Form</h2>
              <p className="text-charcoal/70 text-sm mb-6">
                Please note that submitting this form does not guarantee a volunteer placement. CES will review your enquiry and contact you if a suitable opportunity exists.
              </p>
              <form action="/api/volunteer" method="POST" className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="vol-name" className="block text-sm font-medium text-charcoal mb-1">Full Name *</label>
                    <input id="vol-name" name="name" type="text" required className="w-full px-4 py-3 border border-peach-200 rounded-lg text-charcoal focus:ring-2 focus:ring-peach focus:border-peach" />
                  </div>
                  <div>
                    <label htmlFor="vol-email" className="block text-sm font-medium text-charcoal mb-1">Email *</label>
                    <input id="vol-email" name="email" type="email" required className="w-full px-4 py-3 border border-peach-200 rounded-lg text-charcoal focus:ring-2 focus:ring-peach focus:border-peach" />
                  </div>
                </div>
                <div>
                  <label htmlFor="vol-phone" className="block text-sm font-medium text-charcoal mb-1">Phone</label>
                  <input id="vol-phone" name="phone" type="tel" className="w-full px-4 py-3 border border-peach-200 rounded-lg text-charcoal focus:ring-2 focus:ring-peach focus:border-peach" />
                </div>
                <div>
                  <label htmlFor="vol-skills" className="block text-sm font-medium text-charcoal mb-1">Skills & Experience</label>
                  <textarea id="vol-skills" name="skills" rows={3} className="w-full px-4 py-3 border border-peach-200 rounded-lg text-charcoal focus:ring-2 focus:ring-peach focus:border-peach" placeholder="Describe your relevant skills, experience and areas of interest" />
                </div>
                <div>
                  <label htmlFor="vol-availability" className="block text-sm font-medium text-charcoal mb-1">Availability</label>
                  <input id="vol-availability" name="availability" type="text" className="w-full px-4 py-3 border border-peach-200 rounded-lg text-charcoal focus:ring-2 focus:ring-peach focus:border-peach" placeholder="e.g. Full-time, part-time, weekends, specific dates" />
                </div>
                <div>
                  <label htmlFor="vol-message" className="block text-sm font-medium text-charcoal mb-1">Additional Message</label>
                  <textarea id="vol-message" name="message" rows={4} className="w-full px-4 py-3 border border-peach-200 rounded-lg text-charcoal focus:ring-2 focus:ring-peach focus:border-peach" />
                </div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" required name="privacy" className="mt-1 w-4 h-4 text-muted-green border-peach-200 rounded focus:ring-peach" />
                  <span className="text-sm text-charcoal/80">
                    I consent to CES processing my personal information for this volunteer enquiry. I acknowledge the <Link href="/privacy" className="text-muted-green underline">Privacy Policy</Link> and <Link href="/safeguarding-and-media-consent" className="text-muted-green underline">Safeguarding Policy</Link>.
                  </span>
                </label>
                <button type="submit" className="btn-primary text-base px-8 py-3">Submit Enquiry</button>
              </form>
            </div>

            <aside className="lg:col-span-2">
              <div className="bg-cream rounded-2xl p-6 md:p-8 border border-peach-100 sticky top-24">
                <h3 className="font-serif text-xl font-bold text-deep-brown mb-4">About Volunteering</h3>
                <div className="space-y-4 text-sm text-charcoal/80">
                  <p>CES welcomes volunteers who bring skills and a genuine commitment to community development.</p>
                  <p>Opportunities may include programme support, training facilitation, research, communications, monitoring and evaluation and other areas.</p>
                  <p>All volunteers are expected to respect CES policies, community cultures and safeguarding standards.</p>
                  <p className="font-medium text-charcoal">Submitting an enquiry does not guarantee a placement.</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
