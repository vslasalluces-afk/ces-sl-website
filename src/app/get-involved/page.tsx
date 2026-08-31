import type { Metadata } from "next";
import Link from "next/link";
import { STOCK_IMAGES } from "@/lib/constants";
import { Heart, Users, HandHeart, Mail, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Get Involved",
  description: "Discover ways to get involved with CES – volunteer, partner, donate or stay connected to support community development in Sierra Leone.",
};

export default function GetInvolvedPage() {
  return (
    <>
      <section className="relative py-20 md:py-28" aria-labelledby="involved-hero">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${STOCK_IMAGES.community}')` }} role="img" aria-label="Community engagement activities" />
        <div className="absolute inset-0 bg-deep-brown/70" />
        <div className="relative z-10 container-wide mx-auto px-4 md:px-8">
          <div className="max-w-2xl">
            <span className="inline-block text-sm font-semibold text-peach uppercase tracking-wider mb-3">Join Us</span>
            <h1 id="involved-hero" className="text-4xl md:text-5xl font-serif font-bold text-warm-white mb-6">Get Involved</h1>
            <p className="text-lg text-warm-white/90 leading-relaxed">
              There are many ways to support the communities we serve. Every contribution makes a difference.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: Heart, title: "Donate", desc: "Support our programmes with a one-off or recurring financial gift. Your generosity directly funds community transformation.", href: "/donate", cta: "Make a Donation", color: "bg-peach-100" },
              { icon: Users, title: "Volunteer", desc: "Share your skills, experience and time. We welcome volunteers who want to make a meaningful contribution.", href: "/volunteer", cta: "Explore Volunteering", color: "bg-green-100" },
              { icon: HandHeart, title: "Partner With CES", desc: "Collaborate as a church, NGO, foundation, research institution, corporate supporter or public body.", href: "/partner-with-ces", cta: "Discuss Partnership", color: "bg-peach-100" },
              { icon: Mail, title: "Stay Connected", desc: "Subscribe to our newsletter and follow us on social media for updates on our work and community stories.", href: "/contact#newsletter", cta: "Subscribe", color: "bg-green-100" },
            ].map((item) => (
              <div key={item.title} className="card p-8 md:p-10">
                <div className={`w-14 h-14 rounded-full ${item.color} flex items-center justify-center mb-6`}>
                  <item.icon className="w-7 h-7 text-deep-brown" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-deep-brown mb-3">{item.title}</h2>
                <p className="text-charcoal/70 leading-relaxed mb-6">{item.desc}</p>
                <Link href={item.href} className="btn-primary inline-flex items-center gap-2 text-sm">
                  {item.cta} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
