import Link from "next/link";

import { SITE, STOCK_IMAGES } from "@/lib/constants";

import { TEAM_MEMBERS } from "@/lib/team-data";

import AnimatedCounter from "@/components/AnimatedCounter";

import ScrollReveal from "@/components/ScrollReveal";

import GlobeSection from "@/components/GlobeSection";

import { FAQJsonLd } from "@/components/JsonLd";

import {
  Heart,
  Users,
  BookOpen,
  Sprout,
  HandHeart,
  ArrowRight,
  MapPin,
  Mail,
  Phone,
  GraduationCap,
  Shield,
  Globe,
  Quote,
  CheckCircle,
  Play,
  Star,
  TrendingUp,
  Award,
} from "lucide-react";

const FAQS = [
  {
    question: "What does CES do?",

    answer:
      "CES is a Christian-based community development organisation working in Sierra Leone through training, capacity building, sustainable agriculture, women's empowerment and community-led development.",
  },

  {
    question: "Where does CES operate?",

    answer:
      "CES operates in Koinadugu, Falaba and Tonkolili Districts in the Northern Province of Sierra Leone.",
  },

  {
    question: "How can I donate to CES?",

    answer:
      "Visit our donate page or contact us via WhatsApp at +232 78 703694. Online payment processing is being set up.",
  },

  {
    question: "How can I volunteer with CES?",

    answer:
      "Visit our volunteer page to submit an enquiry. CES welcomes volunteers with relevant skills who can support community development work.",
  },
];

export default function HomePage() {
  const featuredTeam = TEAM_MEMBERS;

  return (
    <>
      <FAQJsonLd faqs={FAQS} />

      {/* ─── Hero Section ──────────────────────────────────────────────── */}

      <section
        className="relative min-h-[90vh] flex items-center overflow-hidden"
        aria-label="Hero"
      >
        {/* Background with parallax effect */}

        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-fixed scale-105"
            style={{ backgroundImage: "url('/images/herosection.jpg')" }}
            role="img"
            aria-label="Community gathering in Sierra Leone"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-deep-brown/90 via-deep-brown/70 to-deep-brown/40" />

          <div className="absolute inset-0 bg-gradient-to-t from-deep-brown/50 via-transparent to-transparent" />
        </div>

        {/* Decorative elements */}

        <div className="absolute top-20 right-20 w-64 h-64 bg-peach/10 rounded-full blur-3xl" />

        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />

        <div className="relative z-10 container-wide mx-auto px-4 md:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <ScrollReveal>
                <span className="inline-flex items-center gap-2 text-peach text-sm font-semibold uppercase tracking-wider mb-6">
                  <span className="w-8 h-px bg-peach" />
                  Christian Extension Services
                </span>
              </ScrollReveal>

              <ScrollReveal delay={100}>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-warm-white leading-[1.1] mb-8">
                  Transforming
                  <span className="block text-peach">Communities.</span>
                  Empowering Lives.
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <p className="text-xl md:text-2xl text-warm-white/90 leading-relaxed mb-10 max-w-xl font-light">
                  Working alongside vulnerable communities in Sierra Leone
                  through training, empowerment and sustainable development for
                  over{" "}
                  <strong className="text-peach font-semibold">46 years</strong>
                  .
                </p>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/donate"
                    className="group inline-flex items-center gap-3 bg-peach text-deep-brown font-bold px-8 py-4 rounded-full hover:bg-peach-soft transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <Heart className="w-5 h-5" />
                    Donate Now
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href="/programmes"
                    className="group inline-flex items-center gap-3 border-2 border-warm-white/80 text-warm-white font-semibold px-8 py-4 rounded-full hover:bg-warm-white hover:text-deep-brown transition-all duration-300"
                  >
                    Discover Our Work
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </ScrollReveal>

              {/* Trust badges */}

              <ScrollReveal delay={400}>
                <div className="flex flex-wrap items-center gap-6 mt-12 pt-8 border-t border-warm-white/10">
                  <div className="flex items-center gap-2 text-warm-white/70 text-sm">
                    <Shield className="w-5 h-5 text-peach" />

                    <span>Faith-Based</span>
                  </div>

                  <div className="flex items-center gap-2 text-warm-white/70 text-sm">
                    <CheckCircle className="w-5 h-5 text-peach" />

                    <span>Community-Led</span>
                  </div>

                  <div className="flex items-center gap-2 text-warm-white/70 text-sm">
                    <Award className="w-5 h-5 text-peach" />

                    <span>46+ Years</span>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Hero Stats Card */}

            <ScrollReveal delay={300} className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                <h2 className="font-serif text-2xl font-bold text-warm-white mb-6">
                  Our Impact
                </h2>

                <div className="grid grid-cols-2 gap-6">
                  {[
                    { value: 46, suffix: "+", label: "Years of Service" },

                    { value: 3, label: "Districts Served" },

                    { value: 11, label: "Programme Areas" },

                    { value: 8, label: "Team Members" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <span className="block text-4xl font-serif font-bold text-peach">
                        <AnimatedCounter
                          end={stat.value}
                          suffix={stat.suffix}
                        />
                      </span>

                      <span className="text-warm-white/70 text-sm">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-warm-white/60 text-xs text-center">
                    Help us reach more communities. Get involved
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Scroll indicator */}

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-warm-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-warm-white/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* ─── Mission & Vision ─────────────────────────────────────────── */}

      <section
        className="section-padding bg-cream relative overflow-hidden"
        aria-labelledby="mission-heading"
      >
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-peach/10 to-transparent" />

        <div className="container-wide mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            <ScrollReveal>
              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-peach-100 h-full hover:shadow-2xl transition-shadow duration-500 group">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-peach to-gold flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-8 h-8 text-deep-brown" />
                </div>

                <h2
                  id="mission-heading"
                  className="font-serif text-3xl md:text-4xl font-bold text-deep-brown mb-6"
                >
                  Our Mission
                </h2>

                <blockquote className="text-charcoal/80 leading-relaxed text-lg md:text-xl">
                  <Quote className="w-8 h-8 text-peach/30 mb-4" />“
                  {SITE.mission}”
                </blockquote>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-peach-100 h-full hover:shadow-2xl transition-shadow duration-500 group">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-muted-green to-green-700 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="w-8 h-8 text-white" />
                </div>

                <h2 className="font-serif text-3xl md:text-4xl font-bold text-deep-brown mb-6">
                  Our Vision
                </h2>

                <blockquote className="text-charcoal/80 leading-relaxed text-lg md:text-xl">
                  <Quote className="w-8 h-8 text-muted-green/30 mb-4" />“
                  {SITE.vision}”
                </blockquote>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── About CES Introduction ──────────────────────────────────── */}

      <section
        className="section-padding relative"
        aria-labelledby="about-heading"
      >
        <div className="container-wide mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div>
                <span className="inline-flex items-center gap-2 text-muted-green text-sm font-semibold uppercase tracking-wider mb-4">
                  <span className="w-8 h-px bg-muted-green" />
                  About CES
                </span>

                <h2
                  id="about-heading"
                  className="font-serif text-4xl md:text-5xl font-bold text-deep-brown mb-8 leading-tight"
                >
                  More Than {SITE.experienceYears} Years of{" "}
                  <span className="text-muted-green">Community Service</span>
                </h2>

                <p className="text-charcoal/80 text-lg leading-relaxed mb-6">
                  Christian Extension Services (CES) is a Christian-based
                  community development organisation and the development arm of
                  the Christian Reformed Church in Sierra Leone.
                </p>

                <p className="text-charcoal/80 text-lg leading-relaxed mb-8">
                  Our work focuses on training, capacity building, sustainable
                  development, agriculture, food security, gender equality,
                  women's empowerment and support for vulnerable communities
                  across Koinadugu, Falaba and Tonkolili Districts.
                </p>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  {[
                    {
                      icon: MapPin,

                      label: "Northern Province",

                      sub: "Sierra Leone",
                    },

                    { icon: Users, label: "Community-Led", sub: "Development" },

                    { icon: TrendingUp, label: "Sustainable", sub: "Impact" },

                    { icon: Shield, label: "Faith-Based", sub: "Values" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-peach-100 flex items-center justify-center shrink-0">
                        <item.icon className="w-6 h-6 text-deep-brown" />
                      </div>

                      <div>
                        <span className="block font-semibold text-deep-brown text-sm">
                          {item.label}
                        </span>

                        <span className="text-charcoal/60 text-xs">
                          {item.sub}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2 text-muted-green font-bold hover:text-green-700 transition-colors"
                >
                  Learn More About CES
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-peach/20 to-gold/20 rounded-3xl blur-2xl" />

                <div className="relative">
                  <img
                    src="/images/community-service.jpg"
                    alt="Community members participating in a CES community development activity in Sierra Leone"
                    className="rounded-3xl shadow-2xl w-full object-cover aspect-[16/9]"
                    loading="lazy"
                  />

                  <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl px-8 py-6 shadow-xl border border-peach-100">
                    <span className="block text-5xl font-bold text-deep-brown font-serif">
                      <AnimatedCounter end={46} suffix="+" />
                    </span>

                    <span className="text-sm text-charcoal/70 font-medium">
                      Years of Service
                    </span>
                  </div>

                  <div className="absolute -top-4 -right-4 bg-muted-green text-white rounded-2xl px-6 py-4 shadow-xl">
                    <span className="block text-2xl font-bold font-serif">
                      3
                    </span>

                    <span className="text-xs text-white/80">Districts</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── Featured Programmes ──────────────────────────────────────── */}

      <section
        className="section-padding bg-gradient-to-b from-cream to-warm-white"
        aria-labelledby="programmes-heading"
      >
        <div className="container-wide mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 text-muted-green text-sm font-semibold uppercase tracking-wider mb-4 justify-center">
                <span className="w-8 h-px bg-muted-green" />
                What We Do
                <span className="w-8 h-px bg-muted-green" />
              </span>

              <h2
                id="programmes-heading"
                className="font-serif text-4xl md:text-5xl font-bold text-deep-brown mb-6"
              >
                Our Programmes
              </h2>

              <p className="text-charcoal/70 max-w-2xl mx-auto text-lg">
                Integrated programmes that build capacity, strengthen
                livelihoods and create lasting community transformation.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Sprout,

                title: "Agriculture & Food Security",
                href: "/programmes/agriculture-food-security",

                desc: "Farmer Field Schools, sustainable practices, Trust Rice Project and food security initiatives.",

                image: STOCK_IMAGES.farming,

                color: "from-muted-green to-green-700",
              },

              {
                icon: Users,

                title: "Women's Empowerment",
                href: "/programmes/womens-empowerment",

                desc: "Village Savings and Loan Associations, enterprise development and economic empowerment.",

                image: STOCK_IMAGES.women,

                color: "from-peach to-gold",
              },

              {
                icon: BookOpen,

                title: "Education & Training",
                href: "/programmes/education-and-training",

                desc: "Adult literacy, capacity building, vocational training and community learning.",

                image: STOCK_IMAGES.training,

                color: "from-deep-brown to-charcoal",
              },

              {
                icon: HandHeart,

                title: "Community Development",
                href: "/programmes/community-development",

                desc: "Community Initiative Projects, participatory development and local empowerment.",

                image: STOCK_IMAGES.village,

                color: "from-gold to-peach",
              },

              {
                icon: Shield,

                title: "Sustainable Livelihoods",
                href: "/programmes/sustainable-livelihoods",

                desc: "Skills training, enterprise development, market access and climate adaptation.",

                image: STOCK_IMAGES.harvest,

                color: "from-green-700 to-muted-green",
              },

              {
                icon: GraduationCap,

                title: "Capacity Building",
                href: "/programmes/education-and-training",

                desc: "Strengthening community organisations, governance and partner institutions.",

                image: STOCK_IMAGES.landscape,

                color: "from-charcoal to-deep-brown",
              },
            ].map((prog, i) => (
              <ScrollReveal key={prog.title} delay={i * 100}>
                <div className="group relative bg-white rounded-3xl shadow-lg border border-peach-100 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={prog.image}
                      alt={prog.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-deep-brown/60 via-transparent to-transparent" />

                    <div
                      className={`absolute top-4 left-4 w-14 h-14 rounded-2xl bg-gradient-to-br ${prog.color} flex items-center justify-center shadow-lg`}
                    >
                      <prog.icon className="w-7 h-7 text-white" />
                    </div>
                  </div>

                  <div className="p-8">
                    <h3 className="font-serif text-xl font-bold text-deep-brown mb-3 group-hover:text-muted-green transition-colors">
                      {prog.title}
                    </h3>

                    <p className="text-charcoal/70 text-sm leading-relaxed mb-4">
                      {prog.desc}
                    </p>

                    <Link
                      href={prog.href}
                      className="inline-flex items-center gap-2 text-muted-green font-semibold text-sm group-hover:gap-3 transition-all"
                    >
                      Learn More <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={400}>
            <div className="text-center mt-12">
              <Link
                href="/programmes"
                className="inline-flex items-center gap-3 bg-deep-brown text-warm-white font-bold px-8 py-4 rounded-full hover:bg-charcoal transition-all duration-300 hover:scale-105 shadow-lg"
              >
                View All Programmes
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Impact Stats Banner ─────────────────────────────────────── */}

      <section
        className="relative py-20 overflow-hidden"
        aria-labelledby="impact-heading"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url('${STOCK_IMAGES.landscape}')` }}
        />

        <div className="absolute inset-0 bg-deep-brown/85" />

        <div className="relative z-10 container-wide mx-auto px-4 md:px-8">
          <h2 id="impact-heading" className="sr-only">
            Our Impact
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              {
                value: 46,

                suffix: "+",

                label: "Years of Service",

                sub: "Since establishment",
              },

              { value: 11, label: "Programme Areas", sub: "Active categories" },

              {
                value: 3,

                label: "Districts Served",

                sub: "Koinadugu, Falaba, Tonkolili",
              },

              {
                value: TEAM_MEMBERS.length,

                label: "Team Members",

                sub: "Dedicated professionals",
              },
            ].map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 100}>
                <div className="p-6">
                  <span className="block text-5xl md:text-6xl font-serif font-bold text-peach mb-2">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </span>

                  <span className="block text-warm-white font-semibold text-lg mb-1">
                    {stat.label}
                  </span>

                  <span className="block text-warm-white/50 text-sm">
                    {stat.sub}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <p className="text-center text-warm-white/40 text-xs mt-8">
            Help us reach more communities. Get involved
          </p>
        </div>
      </section>

      {/* ─── Our Partners ─────────────────────────────────────────────── */}

      <section
        className="section-padding bg-white"
        aria-labelledby="partners-heading"
      >
        <div className="container-wide mx-auto px-4 md:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-flex items-center gap-2 text-muted-green text-sm font-semibold uppercase tracking-wider mb-4 justify-center">
                <span className="w-8 h-px bg-muted-green" />
                Working Together
                <span className="w-8 h-px bg-muted-green" />
              </span>

              <h2
                id="partners-heading"
                className="font-serif text-4xl md:text-5xl font-bold text-deep-brown mb-6"
              >
                Our Partners
              </h2>

              <p className="text-charcoal/70 text-lg leading-relaxed">
                We value our partnerships with organisations that share our
                commitment to sustainable development, human dignity and
                stronger livelihoods in Sierra Leone.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7 items-stretch">
            {[
              {
                name: "Farming Out of Poverty (foop)",

                src: "/images/partners/farming-out-of-poverty.png",
              },

              {
                name: "Caritas Sierra Leone – Makeni",

                src: "/images/partners/caritas-sierra-leone-makeni.jpg",
              },

              {
                name: "Christian Reformed Church in Sierra Leone – National Prayer Altar",

                src: "/images/partners/christian-reformed-church-sierra-leone.jpg",
              },

              {
                name: "Cotton Tree Foundation SL",

                src: "/images/partners/cotton-tree-foundation-sl.png",
              },

              {
                name: "JULA Consultancy",

                src: "/images/partners/jula-consultancy.png",
              },

              {
                name: "Solidaridad",

                src: "/images/partners/solidaridad.png",
              },

              {
                name: "Woord en Daad",

                src: "/images/partners/woord-en-daad.png",
              },
            ].map((partner) => (
              <div
                key={partner.name}
                className="flex items-center justify-center min-h-36 md:min-h-40 p-5 md:p-7 bg-white border border-peach-100 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <img
                  src={partner.src}
                  alt={partner.name}
                  className="max-w-full w-full h-20 md:h-24 object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          <ScrollReveal delay={150}>
            <div className="text-center mt-10">
              <p className="text-charcoal/70 mb-5">
                Interested in working with CES to support community-led
                development?
              </p>

              <Link
                href="/partner-with-ces"
                className="inline-flex items-center gap-3 bg-deep-brown text-warm-white font-bold px-8 py-4 rounded-full hover:bg-charcoal transition-all duration-300"
              >
                Partner with CES
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Ways to Support ──────────────────────────────────────────── */}

      <section className="section-padding" aria-labelledby="support-heading">
        <div className="container-wide mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 text-muted-green text-sm font-semibold uppercase tracking-wider mb-4 justify-center">
                <span className="w-8 h-px bg-muted-green" />
                Make a Difference
                <span className="w-8 h-px bg-muted-green" />
              </span>

              <h2
                id="support-heading"
                className="font-serif text-4xl md:text-5xl font-bold text-deep-brown mb-6"
              >
                Ways to Support CES
              </h2>

              <p className="text-charcoal/70 max-w-2xl mx-auto text-lg">
                Every contribution helps us expand our reach and deepen our
                impact in vulnerable communities across Sierra Leone.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Heart,

                title: "Donate",

                desc: "Support our programmes with a one-off or recurring gift. Every contribution matters.",

                href: "/donate",

                cta: "Give Now",

                featured: true,
              },

              {
                icon: Users,

                title: "Volunteer",

                desc: "Share your skills and expertise to strengthen communities.",

                href: "/volunteer",

                cta: "Learn More",
              },

              {
                icon: HandHeart,

                title: "Partner",

                desc: "Collaborate as a church, NGO, foundation or institution.",

                href: "/partner-with-ces",

                cta: "Explore",
              },

              {
                icon: Mail,

                title: "Stay Connected",

                desc: "Subscribe for updates on our work and community stories.",

                href: "/contact#newsletter",

                cta: "Subscribe",
              },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 100}>
                <div
                  className={`relative rounded-3xl p-8 h-full transition-all duration-300 hover:-translate-y-2 ${
                    item.featured
                      ? "bg-gradient-to-br from-deep-brown to-charcoal text-warm-white shadow-xl"
                      : "bg-cream border border-peach-100 hover:shadow-xl"
                  }`}
                >
                  {item.featured && (
                    <div className="absolute -top-3 -right-3 bg-peach text-deep-brown text-xs font-bold px-3 py-1 rounded-full">
                      Most Impact
                    </div>
                  )}

                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                      item.featured ? "bg-peach/20" : "bg-peach-100"
                    }`}
                  >
                    <item.icon
                      className={`w-8 h-8 ${item.featured ? "text-peach" : "text-deep-brown"}`}
                    />
                  </div>

                  <h3
                    className={`font-serif text-2xl font-bold mb-3 ${item.featured ? "text-warm-white" : "text-deep-brown"}`}
                  >
                    {item.title}
                  </h3>

                  <p
                    className={`text-sm leading-relaxed mb-6 ${item.featured ? "text-warm-white/80" : "text-charcoal/70"}`}
                  >
                    {item.desc}
                  </p>

                  <Link
                    href={item.href}
                    className={`inline-flex items-center gap-2 font-semibold text-sm ${
                      item.featured
                        ? "text-peach hover:text-peach-soft"
                        : "text-muted-green hover:text-green-700"
                    } transition-colors`}
                  >
                    {item.cta} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Team Preview ─────────────────────────────────────────────── */}

      <section
        className="section-padding bg-cream"
        aria-labelledby="team-heading"
      >
        <div className="container-wide mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 text-muted-green text-sm font-semibold uppercase tracking-wider mb-4 justify-center">
                <span className="w-8 h-px bg-muted-green" />
                Our People
                <span className="w-8 h-px bg-muted-green" />
              </span>

              <h2
                id="team-heading"
                className="font-serif text-4xl md:text-5xl font-bold text-deep-brown mb-6"
              >
                Meet Our Team
              </h2>

              <p className="text-charcoal/70 max-w-2xl mx-auto text-lg">
                Dedicated professionals committed to sustainable community
                development.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredTeam.map((member, i) => (
              <ScrollReveal key={member.slug} delay={i * 100}>
                <Link href={`/team#${member.slug}`} className="group block">
                  <div className="bg-white rounded-3xl p-8 shadow-lg border border-peach-100 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                    <div className="w-28 h-28 rounded-full overflow-hidden bg-cream mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      {member.profileImage ? (
                        <img
                          src={member.profileImage}
                          alt={`${member.fullName} - ${member.jobTitle}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-deep-brown font-serif font-bold text-3xl">
                            {member.fullName

                              .split(" ")

                              .map((n) => n[0])

                              .join("")}
                          </span>
                        </div>
                      )}
                    </div>

                    <h3 className="font-serif text-xl font-bold text-deep-brown mb-1 group-hover:text-muted-green transition-colors">
                      {member.fullName}
                    </h3>

                    <p className="text-muted-green text-sm font-semibold mb-4">
                      {member.jobTitle}
                    </p>

                    <p className="text-charcoal/60 text-sm leading-relaxed line-clamp-3">
                      {member.shortBio}
                    </p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={400}>
            <div className="text-center mt-12">
              <Link
                href="/team"
                className="inline-flex items-center gap-3 border-2 border-deep-brown text-deep-brown font-bold px-8 py-4 rounded-full hover:bg-deep-brown hover:text-warm-white transition-all duration-300"
              >
                View Full Team
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Testimonial / Quote ──────────────────────────────────────── */}

      <section className="section-padding bg-deep-brown relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-peach rounded-full blur-3xl" />

          <div className="absolute bottom-10 right-10 w-96 h-96 bg-gold rounded-full blur-3xl" />
        </div>

        <div className="container-narrow mx-auto text-center relative">
          <ScrollReveal>
            <Quote className="w-16 h-16 text-peach/30 mx-auto mb-8" />

            <blockquote className="font-serif text-3xl md:text-4xl text-warm-white leading-relaxed mb-8">
              “If you go alone, you go fast, but if you want to go far, go
              together.”
            </blockquote>

            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-peach to-gold flex items-center justify-center text-deep-brown font-serif font-bold text-xl">
                SK
              </div>

              <div className="text-left">
                <span className="block text-warm-white font-semibold">
                  Sarah Kanu
                </span>

                <span className="text-warm-white/60 text-sm">
                  Executive Director, CES
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Globe & Contact ─────────────────────────────────────────── */}

      <GlobeSection />

      {/* ─── Newsletter ───────────────────────────────────────────────── */}

      <section
        className="py-20 bg-gradient-to-br from-deep-brown via-charcoal to-deep-brown"
        id="newsletter"
      >
        <div className="container-narrow mx-auto px-4 md:px-8 text-center">
          <ScrollReveal>
            <Mail className="w-12 h-12 text-peach mx-auto mb-6" />

            <h2 className="font-serif text-3xl md:text-4xl font-bold text-warm-white mb-4">
              Stay Connected with CES
            </h2>

            <p className="text-warm-white/70 mb-8 max-w-lg mx-auto">
              Receive updates on our programmes, community stories and ways to
              get involved. We respect your privacy and never share your
              information.
            </p>

            <form
              action="/api/newsletter"
              method="POST"
              className="max-w-md mx-auto flex flex-col sm:flex-row gap-3"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>

              <input
                id="newsletter-email"
                name="email"
                type="email"
                required
                placeholder="Your email address"
                className="flex-1 px-6 py-4 rounded-full border-2 border-warm-white/20 bg-warm-white/10 text-warm-white placeholder:text-warm-white/40 focus:ring-2 focus:ring-peach focus:border-peach text-sm backdrop-blur-sm"
              />

              <button
                type="submit"
                className="bg-peach text-deep-brown font-bold px-8 py-4 rounded-full hover:bg-peach-soft transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>

            <p className="text-xs text-warm-white/40 mt-4">
              By subscribing, you consent to receive email updates from CES.
              Unsubscribe anytime.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
