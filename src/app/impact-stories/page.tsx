import type { Metadata } from "next";
import Link from "next/link";
import { STOCK_IMAGES } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Stories of Transformation",
  description:
    "Read stories of transformation from communities served by CES in Sierra Leone – real accounts of empowerment, sustainable development and community change.",
};

const STORIES = [
  {
    slug: "empowering-women-through-vsla",
    title: "Empowering Women Through Village Savings",
    summary: "Village Savings and Loan Associations have helped women in Koinadugu District build economic independence and strengthen their families.",
    image: STOCK_IMAGES.women,
    programme: "Women's Empowerment",
    location: "Koinadugu District",
  },
  {
    slug: "farmer-field-schools-transforming-agriculture",
    title: "Farmer Field Schools Transforming Agriculture",
    summary: "Practical, field-based learning is helping farming households adopt sustainable practices and improve food production.",
    image: STOCK_IMAGES.farming,
    programme: "Agriculture and Food Security",
    location: "Falaba District",
  },
  {
    slug: "community-led-development-in-action",
    title: "Community-Led Development in Action",
    summary: "Communities are taking ownership of their development through participatory planning and Community Initiative Projects.",
    image: STOCK_IMAGES.community,
    programme: "Community Development",
    location: "Tonkolili District",
  },
];

export default function ImpactStoriesPage() {
  return (
    <>
      <section className="relative py-20 md:py-28" aria-labelledby="stories-hero">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${STOCK_IMAGES.women}')` }} role="img" aria-label="Women celebrating at a community empowerment event" />
        <div className="absolute inset-0 bg-deep-brown/70" />
        <div className="relative z-10 container-wide mx-auto px-4 md:px-8">
          <div className="max-w-2xl">
            <span className="inline-block text-sm font-semibold text-peach uppercase tracking-wider mb-3">Impact</span>
            <h1 id="stories-hero" className="text-4xl md:text-5xl font-serif font-bold text-warm-white mb-6">Stories of Transformation</h1>
            <p className="text-lg text-warm-white/90 leading-relaxed">
              Real stories of change from the communities we serve. Every story reflects the dignity, resilience and agency of the people we work alongside.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {STORIES.map((story) => (
              <article key={story.slug} className="card group">
                <div className="relative overflow-hidden">
                  <img src={story.image} alt={story.title} className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    <span className="text-xs bg-peach text-deep-brown px-2 py-1 rounded-full font-medium">{story.programme}</span>
                    <span className="text-xs bg-white/90 text-charcoal px-2 py-1 rounded-full font-medium">{story.location}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-deep-brown mb-3">{story.title}</h3>
                  <p className="text-charcoal/70 text-sm leading-relaxed mb-4">{story.summary}</p>
                  <Link href={`/impact-stories/${story.slug}`} className="text-muted-green font-semibold text-sm hover:text-green-700 inline-flex items-center gap-1">
                    Read Full Story <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <p className="text-center text-sm text-charcoal/50 mt-12">
            More stories will be published as CES provides approved content. All stories are shared with the consent of those involved.
          </p>
        </div>
      </section>
    </>
  );
}
