import type { Metadata } from "next";
import Link from "next/link";
import { STOCK_IMAGES, PROGRAMME_CATEGORIES } from "@/lib/constants";
import { ArrowRight, Sprout, Users, BookOpen, HandHeart, Shield, GraduationCap, Heart, Scale, Landmark, Leaf, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Programmes",
  description:
    "Explore CES programmes in agriculture, food security, women's empowerment, community development, education, training and sustainable livelihoods in Sierra Leone.",
};

const PROGRAMME_DATA = [
  {
    slug: "community-development",
    title: "Community Development",
    category: "Community Development",
    icon: Users,
    image: STOCK_IMAGES.community,
    desc: "Participatory development approaches that empower communities to identify needs, plan solutions and lead their own transformation through Community Initiative Projects and collective action.",
    status: "Current",
  },
  {
    slug: "education-and-training",
    title: "Education and Training",
    category: "Education and Training",
    icon: BookOpen,
    image: STOCK_IMAGES.training,
    desc: "Capacity building through adult literacy, vocational training, community education and skills development that enables individuals and groups to improve their lives.",
    status: "Current",
  },
  {
    slug: "sustainable-livelihoods",
    title: "Sustainable Livelihoods",
    category: "Sustainable Livelihoods",
    icon: Shield,
    image: STOCK_IMAGES.harvest,
    desc: "Building resilient livelihoods through skills training, enterprise development, market access and climate-adaptive practices for farming households.",
    status: "Current",
  },
  {
    slug: "agriculture-food-security",
    title: "Agriculture and Food Security",
    category: "Agriculture and Food Security",
    icon: Sprout,
    image: STOCK_IMAGES.farming,
    desc: "Supporting sustainable food production through Farmer Field Schools, improved agricultural practices, seed distribution and the Trust Rice Project.",
    status: "Current",
  },
  {
    slug: "gender-equality-gbv-prevention",
    title: "Gender Equality and GBV Prevention",
    category: "Gender Equality and GBV Prevention",
    icon: Scale,
    image: STOCK_IMAGES.women,
    desc: "Promoting gender equality, preventing and responding to gender-based violence, and creating safe, inclusive communities for women and girls.",
    status: "Current",
  },
  {
    slug: "womens-empowerment",
    title: "Women's Empowerment",
    category: "Women's Empowerment",
    icon: Heart,
    image: STOCK_IMAGES.women,
    desc: "Village Savings and Loan Associations, women-led enterprise, leadership development and economic empowerment programmes for women.",
    status: "Current",
  },
  {
    slug: "village-savings-loan-associations",
    title: "Village Savings and Loan Associations",
    category: "Village Savings and Loan Associations",
    icon: Landmark,
    image: STOCK_IMAGES.village,
    desc: "Community-based savings groups that provide access to financial services, build economic resilience and empower members to invest in livelihoods.",
    status: "Current",
  },
  {
    slug: "farmer-field-schools",
    title: "Farmer Field Schools",
    category: "Farmer Field Schools",
    icon: GraduationCap,
    image: STOCK_IMAGES.farming,
    desc: "Practical, field-based learning where farmers develop knowledge and skills in sustainable agriculture, pest management and improved production.",
    status: "Current",
  },
  {
    slug: "adult-literacy",
    title: "Adult Literacy",
    category: "Adult Literacy",
    icon: BookOpen,
    image: STOCK_IMAGES.training,
    desc: "Literacy and numeracy programmes that unlock opportunity, improve livelihoods and strengthen community participation for adults.",
    status: "Current",
  },
  {
    slug: "climate-resilience",
    title: "Climate Resilience",
    category: "Climate Resilience",
    icon: Leaf,
    image: STOCK_IMAGES.landscape,
    desc: "Helping communities adapt to climate change through sustainable practices, environmental conservation and resilient agricultural systems.",
    status: "Current",
  },
  {
    slug: "vulnerable-community-support",
    title: "Vulnerable Community Support",
    category: "Vulnerable Community Support",
    icon: HandHeart,
    image: STOCK_IMAGES.community,
    desc: "Targeted support for the most vulnerable community members, including orphans, elderly, people with disabilities and those affected by crisis.",
    status: "Current",
  },
];

export default function ProgrammesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-20 md:py-28" aria-labelledby="prog-hero">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${STOCK_IMAGES.farming}')` }} role="img" aria-label="Farmer harvesting crops in a sunlit field" />
        <div className="absolute inset-0 bg-deep-brown/70" />
        <div className="relative z-10 container-wide mx-auto px-4 md:px-8">
          <div className="max-w-2xl">
            <span className="inline-block text-sm font-semibold text-peach uppercase tracking-wider mb-3">What We Do</span>
            <h1 id="prog-hero" className="text-4xl md:text-5xl font-serif font-bold text-warm-white mb-6">Our Programmes</h1>
            <p className="text-lg text-warm-white/90 leading-relaxed">
              Integrated programmes that build capacity, strengthen livelihoods and create lasting community transformation.
            </p>
          </div>
        </div>
      </section>

      {/* Programme Grid */}
      <section className="section-padding" aria-labelledby="all-programmes">
        <div className="container-wide mx-auto">
          <h2 id="all-programmes" className="sr-only">All Programmes</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROGRAMME_DATA.map((prog) => (
              <article key={prog.slug} className="card group">
                <div className="relative overflow-hidden">
                  <img
                    src={prog.image}
                    alt={`${prog.title} programme – CES Sierra Leone`}
                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-warm-white/90 flex items-center justify-center">
                      <prog.icon className="w-4 h-4 text-deep-brown" />
                    </div>
                    <span className="text-xs bg-muted-green text-white px-2 py-1 rounded-full font-medium">{prog.status}</span>
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-xs text-muted-green font-semibold uppercase tracking-wider">{prog.category}</span>
                  <h3 className="font-serif text-xl font-bold text-deep-brown mt-1 mb-3">{prog.title}</h3>
                  <p className="text-charcoal/70 text-sm leading-relaxed mb-4">{prog.desc}</p>
                  <Link href={`/programmes/${prog.slug}`} className="text-muted-green font-semibold text-sm hover:text-green-700 inline-flex items-center gap-1">
                    Learn More <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-cream" aria-labelledby="prog-cta">
        <div className="container-narrow mx-auto text-center">
          <h2 id="prog-cta" className="font-serif text-3xl font-bold text-deep-brown mb-4">Support Our Programmes</h2>
          <p className="text-charcoal/70 mb-8 max-w-lg mx-auto">
            Your support helps us expand these programmes to reach more communities across Sierra Leone.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/donate" className="btn-primary inline-flex items-center gap-2">
              Donate Now <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/partner-with-ces" className="btn-secondary inline-flex items-center gap-2">
              Partner With CES <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
