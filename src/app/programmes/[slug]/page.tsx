import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { STOCK_IMAGES } from "@/lib/constants";
import { ArrowLeft, ArrowRight, MapPin, Calendar, Users, CheckCircle } from "lucide-react";

const PROGRAMMES: Record<string, {
  title: string;
  category: string;
  image: string;
  description: string;
  objectives: string[];
  activities: string[];
  beneficiaries: string[];
  areas: string[];
  status: string;
}> = {
  "community-development": {
    title: "Community Development",
    category: "Community Development",
    image: STOCK_IMAGES.community,
    description: "CES works alongside communities through participatory development approaches, empowering them to identify their own needs, plan solutions and lead their own transformation. Our Community Initiative Projects support collective action that strengthens local governance, builds social cohesion and improves community infrastructure.",
    objectives: ["Strengthen community-led planning and decision-making", "Support Community Initiative Projects", "Build local governance capacity", "Promote social cohesion and collective action"],
    activities: ["Community needs assessments", "Participatory planning workshops", "Community Initiative Project implementation", "Leadership and governance training"],
    beneficiaries: ["Rural communities", "Community leaders", "Local organisations", "Youth groups"],
    areas: ["Koinadugu District", "Falaba District", "Tonkolili District"],
    status: "Current",
  },
  "agriculture-food-security": {
    title: "Agriculture and Food Security",
    category: "Agriculture and Food Security",
    image: STOCK_IMAGES.farming,
    description: "Our agriculture and food security programmes support farming households through Farmer Field Schools, improved agricultural practices, seed distribution and the Trust Rice Project. We work to improve food production, build agricultural resilience and ensure communities have reliable access to nutritious food.",
    objectives: ["Increase sustainable food production", "Improve farming practices through Farmer Field Schools", "Support the Trust Rice Project", "Strengthen agricultural resilience to climate change"],
    activities: ["Farmer Field School facilitation", "Improved seed distribution", "Sustainable agriculture training", "Trust Rice Project implementation", "Post-harvest management training"],
    beneficiaries: ["Farming households", "Smallholder farmers", "Rural women farmers", "Youth in agriculture"],
    areas: ["Koinadugu District", "Falaba District", "Tonkolili District"],
    status: "Current",
  },
  "womens-empowerment": {
    title: "Women's Empowerment",
    category: "Women's Empowerment",
    image: STOCK_IMAGES.women,
    description: "CES is committed to the empowerment of women through Village Savings and Loan Associations, women-led enterprise development, leadership training and economic empowerment programmes. We work to create environments where women can fully participate in community development and decision-making.",
    objectives: ["Expand Village Savings and Loan Associations", "Support women-led enterprise development", "Build women's leadership capacity", "Improve women's economic independence"],
    activities: ["VSLA group formation and training", "Enterprise development support", "Women's leadership workshops", "Financial literacy training", "Market access support"],
    beneficiaries: ["Rural women", "Women's groups", "Female-headed households", "Young women"],
    areas: ["Koinadugu District", "Falaba District", "Tonkolili District"],
    status: "Current",
  },
};

// Fallback for slugs not in the dictionary
function getProgramme(slug: string) {
  if (PROGRAMMES[slug]) return PROGRAMMES[slug];
  // Generate a basic page for other programme slugs
  const title = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  return {
    title,
    category: title,
    image: STOCK_IMAGES.village,
    description: `CES implements ${title.toLowerCase()} programmes across its areas of operation in Sierra Leone. This programme page will be updated with detailed information as CES provides approved content through the content management system.`,
    objectives: ["Programme objectives will be added when CES provides approved content"],
    activities: ["Programme activities will be added when CES provides approved content"],
    beneficiaries: ["Target beneficiary groups will be confirmed by CES"],
    areas: ["Koinadugu District", "Falaba District", "Tonkolili District"],
    status: "Current",
  };
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const prog = getProgramme(slug);
  return {
    title: prog.title,
    description: prog.description.slice(0, 160),
  };
}

export default async function ProgrammeDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const prog = getProgramme(slug);

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${prog.image}')` }} role="img" aria-label={`${prog.title} programme`} />
        <div className="absolute inset-0 bg-deep-brown/70" />
        <div className="relative z-10 container-wide mx-auto px-4 md:px-8">
          <Link href="/programmes" className="inline-flex items-center gap-2 text-peach text-sm mb-4 hover:text-peach-soft transition-colors">
            <ArrowLeft className="w-4 h-4" /> All Programmes
          </Link>
          <span className="block text-sm font-semibold text-peach/80 uppercase tracking-wider mb-2">{prog.category}</span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-warm-white mb-4">{prog.title}</h1>
          <span className="inline-block text-xs bg-muted-green text-white px-3 py-1 rounded-full font-medium">{prog.status}</span>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-wide mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="font-serif text-2xl font-bold text-deep-brown mb-4">About This Programme</h2>
              <p className="text-charcoal/80 leading-relaxed mb-8">{prog.description}</p>

              <h3 className="font-serif text-xl font-bold text-deep-brown mb-4">Objectives</h3>
              <ul className="space-y-2 mb-8">
                {prog.objectives.map((obj) => (
                  <li key={obj} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-muted-green shrink-0 mt-0.5" />
                    <span className="text-charcoal/80 text-sm">{obj}</span>
                  </li>
                ))}
              </ul>

              <h3 className="font-serif text-xl font-bold text-deep-brown mb-4">Key Activities</h3>
              <ul className="space-y-2 mb-8">
                {prog.activities.map((act) => (
                  <li key={act} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-peach shrink-0 mt-2" />
                    <span className="text-charcoal/80 text-sm">{act}</span>
                  </li>
                ))}
              </ul>

              <h3 className="font-serif text-xl font-bold text-deep-brown mb-4">Beneficiary Groups</h3>
              <div className="flex flex-wrap gap-2 mb-8">
                {prog.beneficiaries.map((b) => (
                  <span key={b} className="text-xs bg-peach-100 text-deep-brown px-3 py-1.5 rounded-full font-medium">{b}</span>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="bg-cream rounded-xl p-6 border border-peach-100 sticky top-24">
                <h3 className="font-serif text-lg font-bold text-deep-brown mb-4">Programme Details</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-muted-green shrink-0" />
                    <div>
                      <span className="block text-xs font-semibold text-charcoal/60 uppercase">Areas of Operation</span>
                      {prog.areas.map((a) => (
                        <span key={a} className="block text-sm text-charcoal/80">{a}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-muted-green shrink-0" />
                    <div>
                      <span className="block text-xs font-semibold text-charcoal/60 uppercase">Status</span>
                      <span className="text-sm text-charcoal/80">{prog.status}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-muted-green shrink-0" />
                    <div>
                      <span className="block text-xs font-semibold text-charcoal/60 uppercase">Beneficiaries</span>
                      <span className="text-sm text-charcoal/80">{prog.beneficiaries.length} target groups</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-peach-200 mt-6 pt-6">
                  <Link href="/donate" className="btn-primary w-full text-center text-sm mb-3">
                    Support This Programme
                  </Link>
                  <Link href="/contact" className="btn-secondary w-full text-center text-sm">
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
