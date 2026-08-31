import type { Metadata } from "next";
import Link from "next/link";
import { SITE, STOCK_IMAGES } from "@/lib/constants";
import {
  Heart,
  Eye,
  BookOpen,
  Users,
  MapPin,
  ArrowRight,
  Shield,
  Star,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About CES",
  description:
    "Learn about Christian Extension Services, a Christian-based community development organisation and the development arm of the Christian Reformed Church in Sierra Leone.",
};

const CORE_VALUES = [
  {
    icon: Heart,
    title: "Compassion",
    desc: "We serve with love and genuine care for the most vulnerable members of our communities.",
  },
  {
    icon: Users,
    title: "Community Partnership",
    desc: "We work alongside communities as partners, not for them, ensuring local ownership and sustainability.",
  },
  {
    icon: Shield,
    title: "Integrity",
    desc: "We operate with transparency, accountability and the highest standards of stewardship.",
  },
  {
    icon: Star,
    title: "Empowerment",
    desc: "We build capacity so communities can initiate, manage and sustain their own development.",
  },
  {
    icon: BookOpen,
    title: "Learning",
    desc: "We continuously learn, adapt and improve our approaches through evidence and reflection.",
  },
  {
    icon: Eye,
    title: "Faith-Driven",
    desc: "Our work is grounded in Christian values of service, dignity, justice and transformation.",
  },
];

const MILESTONES = [
  {
    year: "1978",
    event:
      "CES was established as the development arm of the Christian Reformed Church in Sierra Leone.",
  },
  {
    year: "1980s",
    event:
      "Early programmes focused on community education, training and capacity building in Northern Province.",
  },
  {
    year: "1990s",
    event:
      "Expanded work in sustainable livelihoods and agricultural development across Koinadugu District.",
  },
  {
    year: "2000s",
    event:
      "Post-conflict rebuilding programmes strengthened communities affected by the civil war.",
  },
  {
    year: "2010s",
    event:
      "Launched Village Savings and Loan Associations, Farmer Field Schools and gender equality programming.",
  },
  {
    year: "2020s",
    event:
      "Strengthened climate resilience, women's empowerment and sustainable food security initiatives.",
  },
  {
    year: "Present",
    event:
      "Operating across Koinadugu, Falaba and Tonkolili Districts with an expanded team and programme portfolio.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ─── Hero ────────────────────────────────────────────── */}
      <section
        className="relative py-20 md:py-28"
        aria-labelledby="about-hero-heading"
      >
        <div
          className="absolute inset-0 bg-cover bg-[center_15%]"
          style={{ backgroundImage: "url('/images/about-ces.jpg')" }}
          role="img"
          aria-label="CES community development activities in Sierra Leone"
        />
        <div className="absolute inset-0 bg-deep-brown/70" />
        <div className="relative z-10 container-wide mx-auto px-4 md:px-8">
          <div className="max-w-2xl">
            <span className="inline-block text-sm font-semibold text-peach uppercase tracking-wider mb-3">
              About Us
            </span>
            <h1
              id="about-hero-heading"
              className="text-4xl md:text-5xl font-serif font-bold text-warm-white mb-6"
            >
              About Christian Extension Services
            </h1>
            <p className="text-lg text-warm-white/90 leading-relaxed">
              A Christian-based community development organisation with more
              than {SITE.experienceYears} years of service in Sierra Leone.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Who We Are ──────────────────────────────────────── */}
      <section className="section-padding" aria-labelledby="who-heading">
        <div className="container-wide mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2
                id="who-heading"
                className="font-serif text-3xl md:text-4xl font-bold text-deep-brown mb-6"
              >
                Who We Are
              </h2>
              <p className="text-charcoal/80 leading-relaxed mb-4">
                Christian Extension Services (CES) is a Christian-based
                community development organisation in Sierra Leone and the
                development arm of the Christian Reformed Church in Sierra
                Leone.
              </p>
              <p className="text-charcoal/80 leading-relaxed mb-4">
                Our work focuses on training, capacity building, sustainable
                development programmes, community engagement, sustainable
                livelihoods, agriculture, food security, gender equality,
                women&apos;s empowerment and support for vulnerable communities.
              </p>
              <p className="text-charcoal/80 leading-relaxed mb-6">
                For more than {SITE.experienceYears} years, we have worked
                alongside communities in Koinadugu, Falaba and Tonkolili
                Districts in the Northern Province of Sierra Leone, building
                capacity for sustainable, community-led transformation.
              </p>
              <div className="flex items-center gap-3 text-sm text-charcoal/60">
                <MapPin className="w-4 h-4 text-muted-green" />
                <span>
                  Koinadugu, Falaba and Tonkolili Districts, Sierra Leone
                </span>
              </div>
            </div>
            <div>
              <img
                src={STOCK_IMAGES.landscape}
                alt="Lush green landscape of rural Sierra Leone with rolling hills"
                className="rounded-2xl shadow-lg w-full object-cover aspect-[4/3]"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Mission & Vision ────────────────────────────────── */}
      <section
        className="section-padding bg-cream"
        aria-labelledby="mv-heading"
      >
        <div className="container-wide mx-auto">
          <h2 id="mv-heading" className="sr-only">
            Mission and Vision
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-peach-100">
              <div className="w-12 h-12 rounded-full bg-peach-100 flex items-center justify-center mb-6">
                <Heart className="w-6 h-6 text-deep-brown" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-deep-brown mb-4">
                Our Mission
              </h3>
              <blockquote className="text-charcoal/80 leading-relaxed text-lg italic border-l-4 border-peach pl-4">
                &ldquo;{SITE.mission}&rdquo;
              </blockquote>
            </div>
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-peach-100">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-6">
                <Eye className="w-6 h-6 text-muted-green" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-deep-brown mb-4">
                Our Vision
              </h3>
              <blockquote className="text-charcoal/80 leading-relaxed text-lg italic border-l-4 border-muted-green pl-4">
                &ldquo;{SITE.vision}&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Core Values ─────────────────────────────────────── */}
      <section className="section-padding" aria-labelledby="values-heading">
        <div className="container-wide mx-auto">
          <div className="text-center mb-12">
            <h2
              id="values-heading"
              className="font-serif text-3xl md:text-4xl font-bold text-deep-brown mb-4"
            >
              Our Core Values
            </h2>
            <p className="text-charcoal/70 max-w-2xl mx-auto">
              The principles that guide everything we do at CES.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {CORE_VALUES.map((v) => (
              <div
                key={v.title}
                className="p-6 rounded-xl bg-cream border border-peach-100"
              >
                <div className="w-10 h-10 rounded-full bg-peach-100 flex items-center justify-center mb-4">
                  <v.icon className="w-5 h-5 text-deep-brown" />
                </div>
                <h3 className="font-serif text-lg font-bold text-deep-brown mb-2">
                  {v.title}
                </h3>
                <p className="text-charcoal/70 text-sm leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Timeline ────────────────────────────────────────── */}
      <section
        className="section-padding bg-cream"
        aria-labelledby="timeline-heading"
      >
        <div className="container-narrow mx-auto">
          <div className="text-center mb-12">
            <h2
              id="timeline-heading"
              className="font-serif text-3xl md:text-4xl font-bold text-deep-brown mb-4"
            >
              Our Journey
            </h2>
            <p className="text-charcoal/70 max-w-2xl mx-auto">
              Key milestones in our history of community service.
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-peach-200 md:-translate-x-px" />
            <div className="space-y-8">
              {MILESTONES.map((m, i) => (
                <div
                  key={m.year}
                  className={`relative flex flex-col md:flex-row items-start gap-4 md:gap-8 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                >
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-peach border-2 border-deep-brown -translate-x-1.5 mt-2 z-10" />
                  <div
                    className={`ml-10 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:text-right md:pr-12" : "md:pl-12"}`}
                  >
                    <span className="inline-block text-sm font-bold text-muted-green mb-1">
                      {m.year}
                    </span>
                    <p className="text-charcoal/80 text-sm leading-relaxed">
                      {m.event}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-center text-xs text-charcoal/50 mt-8">
            Timeline is illustrative. Specific dates subject to CES confirmation
            before publication.
          </p>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────────────── */}
      <section
        className="section-padding bg-deep-brown text-warm-white"
        aria-labelledby="about-cta"
      >
        <div className="container-narrow mx-auto text-center">
          <h2
            id="about-cta"
            className="font-serif text-3xl md:text-4xl font-bold text-warm-white mb-4"
          >
            Join Us in Transforming Communities
          </h2>
          <p className="text-warm-white/80 mb-8 max-w-lg mx-auto">
            Partner with CES to empower vulnerable communities and create
            lasting change in Sierra Leone.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/donate"
              className="btn-primary bg-peach text-deep-brown hover:bg-peach-soft inline-flex items-center gap-2"
            >
              Donate <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/partner-with-ces"
              className="btn-secondary border-warm-white text-warm-white hover:bg-warm-white hover:text-deep-brown inline-flex items-center gap-2"
            >
              Partner With CES <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="btn-secondary border-warm-white/60 text-warm-white/80 hover:bg-warm-white hover:text-deep-brown inline-flex items-center gap-2"
            >
              Contact Us <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
