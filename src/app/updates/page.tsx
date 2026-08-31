import type { Metadata } from "next";
import Link from "next/link";
import { STOCK_IMAGES } from "@/lib/constants";
import { ArrowRight, Calendar, Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "Updates",
  description: "Latest news, updates and announcements from Christian Extension Services in Sierra Leone.",
};

const UPDATES = [
  {
    slug: "ces-expands-farmer-field-schools",
    title: "CES Expands Farmer Field Schools in 2026",
    summary: "New Farmer Field Schools are being established to reach more farming households with sustainable agricultural training and support.",
    date: "2026",
    category: "Programme Update",
    image: STOCK_IMAGES.farming,
  },
  {
    slug: "trust-rice-project-progress",
    title: "Trust Rice Project: Supporting Food Security",
    summary: "The Trust Rice Project continues to support sustainable food production and stronger livelihoods within local communities.",
    date: "2026",
    category: "Programme Update",
    image: STOCK_IMAGES.harvest,
  },
  {
    slug: "new-team-members-join-ces",
    title: "New Team Members Strengthen CES",
    summary: "CES welcomes new staff members who bring expertise in programme management, agriculture, monitoring and evaluation.",
    date: "2026",
    category: "Announcement",
    image: STOCK_IMAGES.training,
  },
];

export default function UpdatesPage() {
  return (
    <>
      <section className="bg-cream section-padding" aria-labelledby="updates-hero">
        <div className="container-wide mx-auto">
          <div className="max-w-2xl">
            <span className="inline-block text-sm font-semibold text-muted-green uppercase tracking-wider mb-3">News</span>
            <h1 id="updates-hero" className="text-4xl md:text-5xl font-serif font-bold text-deep-brown mb-6">CES Updates</h1>
            <p className="text-lg text-charcoal/80 leading-relaxed">
              Programme updates, community stories, announcements and development insights from CES.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {UPDATES.map((update) => (
              <article key={update.slug} className="card group">
                <div className="relative overflow-hidden">
                  <img src={update.image} alt={update.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                  <span className="absolute top-4 left-4 text-xs bg-peach text-deep-brown px-2 py-1 rounded-full font-medium">{update.category}</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-charcoal/50 mb-2">
                    <Calendar className="w-3 h-3" /> {update.date}
                  </div>
                  <h2 className="font-serif text-lg font-bold text-deep-brown mb-2">{update.title}</h2>
                  <p className="text-charcoal/70 text-sm leading-relaxed mb-4">{update.summary}</p>
                  <Link href={`/updates/${update.slug}`} className="text-muted-green font-semibold text-sm hover:text-green-700 inline-flex items-center gap-1">
                    Read More <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <p className="text-center text-sm text-charcoal/50 mt-12">
            More updates will be published as CES provides approved content through the CMS.
          </p>
        </div>
      </section>
    </>
  );
}
