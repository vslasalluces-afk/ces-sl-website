import type { Metadata } from "next";
import Link from "next/link";
import { STOCK_IMAGES } from "@/lib/constants";
import { ArrowLeft, ArrowRight, MapPin, Tag } from "lucide-react";

const STORIES: Record<string, {
  title: string; summary: string; image: string; programme: string; location: string;
  context: string; response: string; changed: string; quote?: string; quoteBy?: string;
}> = {
  "empowering-women-through-vsla": {
    title: "Empowering Women Through Village Savings",
    summary: "Village Savings and Loan Associations have helped women in Koinadugu District build economic independence.",
    image: STOCK_IMAGES.women,
    programme: "Women's Empowerment",
    location: "Koinadugu District",
    context: "In many rural communities in Koinadugu District, women had limited access to formal financial services. This restricted their ability to invest in small businesses, manage household finances and participate fully in community economic life.",
    response: "CES worked with communities to establish Village Savings and Loan Associations (VSLAs), training women in group management, financial literacy, savings practices and enterprise development. The approach was community-led, with CES providing facilitation and training support.",
    changed: "Women in VSLA groups have developed greater economic independence, improved household food security and strengthened their participation in community decision-making. The groups continue to operate and grow with community ownership.",
    quote: "Empowering women, strengthening farmers and promoting equality are key to building resilient and thriving communities.",
    quoteBy: "Fatmata Kumarr, Gender Officer and Field Staff",
  },
  "farmer-field-schools-transforming-agriculture": {
    title: "Farmer Field Schools Transforming Agriculture",
    summary: "Practical field-based learning is helping farming households adopt sustainable practices.",
    image: STOCK_IMAGES.farming,
    programme: "Agriculture and Food Security",
    location: "Falaba District",
    context: "Farming households in Falaba District faced challenges from soil degradation, limited access to improved seeds and changing weather patterns that affected food production and household food security.",
    response: "CES established Farmer Field Schools where farmers could learn sustainable agricultural practices through hands-on experience. Training covered improved crop varieties, soil management, pest control and post-harvest handling.",
    changed: "Participating farmers have adopted improved agricultural practices, leading to more sustainable food production. The Farmer Field School approach has built local agricultural knowledge that continues to spread through farmer-to-farmer learning.",
  },
  "community-led-development-in-action": {
    title: "Community-Led Development in Action",
    summary: "Communities are taking ownership of their development through participatory planning.",
    image: STOCK_IMAGES.community,
    programme: "Community Development",
    location: "Tonkolili District",
    context: "Communities in Tonkolili District needed support to strengthen local governance, plan development priorities and mobilise resources for community projects.",
    response: "CES facilitated participatory planning processes, helping communities identify priorities, develop action plans and implement Community Initiative Projects. The approach emphasised local ownership and capacity building.",
    changed: "Communities have strengthened their ability to plan and manage development initiatives. Local governance structures have been reinforced, and communities have successfully implemented projects that address their priorities.",
  },
};

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = STORIES[slug];
  return {
    title: story?.title ?? "Story of Transformation",
    description: story?.summary ?? "Read stories of community transformation from CES Sierra Leone.",
  };
}

export default async function StoryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const story = STORIES[slug];
  if (!story) {
    return (
      <section className="section-padding">
        <div className="container-narrow mx-auto text-center">
          <h1 className="font-serif text-3xl font-bold text-deep-brown mb-4">Story Not Found</h1>
          <p className="text-charcoal/70 mb-6">This story has not been published yet or the link may be incorrect.</p>
          <Link href="/impact-stories" className="btn-primary">View All Stories</Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${story.image}')` }} role="img" aria-label={story.title} />
        <div className="absolute inset-0 bg-deep-brown/70" />
        <div className="relative z-10 container-wide mx-auto px-4 md:px-8">
          <Link href="/impact-stories" className="inline-flex items-center gap-2 text-peach text-sm mb-4 hover:text-peach-soft transition-colors">
            <ArrowLeft className="w-4 h-4" /> All Stories
          </Link>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-warm-white mb-4">{story.title}</h1>
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-1 text-xs bg-peach/20 text-peach px-3 py-1 rounded-full"><Tag className="w-3 h-3" /> {story.programme}</span>
            <span className="inline-flex items-center gap-1 text-xs bg-white/10 text-warm-white/80 px-3 py-1 rounded-full"><MapPin className="w-3 h-3" /> {story.location}</span>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-narrow mx-auto">
          <div className="prose prose-lg max-w-none">
            <h2 className="font-serif text-2xl font-bold text-deep-brown mb-4">The Community Context</h2>
            <p className="text-charcoal/80 leading-relaxed mb-8">{story.context}</p>

            <h2 className="font-serif text-2xl font-bold text-deep-brown mb-4">CES and Community Response</h2>
            <p className="text-charcoal/80 leading-relaxed mb-8">{story.response}</p>

            <h2 className="font-serif text-2xl font-bold text-deep-brown mb-4">What Changed</h2>
            <p className="text-charcoal/80 leading-relaxed mb-8">{story.changed}</p>

            {story.quote && (
              <blockquote className="border-l-4 border-peach pl-6 py-4 bg-peach-100 rounded-r-xl my-8">
                <p className="text-deep-brown text-lg italic font-serif">&ldquo;{story.quote}&rdquo;</p>
                {story.quoteBy && <footer className="text-charcoal/60 text-sm mt-2">— {story.quoteBy}</footer>}
              </blockquote>
            )}
          </div>

          <div className="border-t border-peach-100 mt-12 pt-8 flex flex-wrap gap-4">
            <Link href="/donate" className="btn-primary inline-flex items-center gap-2">
              Support This Work <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/impact-stories" className="btn-secondary inline-flex items-center gap-2">
              More Stories <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
