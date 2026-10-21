import type { Metadata } from "next";
import Link from "next/link";
import { STOCK_IMAGES } from "@/lib/constants";
import {
  ArrowRight,
  Sprout,
  Users,
  BookOpen,
  HandHeart,
  Shield,
  GraduationCap,
  Heart,
  Scale,
  Landmark,
  Leaf,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Our Programmes",
  description:
    "Explore CES programmes in gender justice, education, agriculture, food security, community development and sustainable livelihoods in Sierra Leone.",
};

const PROGRAMME_DATA = [
  // THEME 1: GENDER JUSTICE
  {
    slug: "gender-equality-gbv-prevention",
    title: "Gender Equality and GBV Prevention",
    category: "Gender Justice",
    theme: "Gender Justice",
    icon: Scale,
    image: STOCK_IMAGES.gbv,
    alt: "Women participating in a gender equality awareness activity",
    desc: "Promoting gender equality, preventing and responding to gender-based violence, and creating safe, inclusive communities for women, men and children.",
    status: "Current",
  },
  {
    slug: "womens-empowerment",
    title: "Women's Empowerment",
    category: "Gender Justice",
    theme: "Gender Justice",
    icon: Heart,
    image: STOCK_IMAGES.women,
    alt: "Women participating in a community empowerment activity",
    desc: "Promoting women's empowerment, leadership and participation while supporting initiatives that advance equality and strengthen women's capacity to contribute to community development.",
    status: "Current",
  },
  {
    slug: "vulnerable-community-support",
    title: "Vulnerable Community Support",
    category: "Gender Justice",
    theme: "Gender Justice",
    icon: HandHeart,
    image: STOCK_IMAGES.vulnerableSupport,
    alt: "Community members participating in a support activity",
    desc: "Supporting vulnerable community members, including orphans, older people, people with disabilities and those affected by crises, with an emphasis on protection, dignity and inclusion.",
    status: "Current",
  },

  // THEME 2: EDUCATION
  {
    slug: "education-and-training",
    title: "Education and Training",
    category: "Education",
    theme: "Education",
    icon: BookOpen,
    image: STOCK_IMAGES.training,
    alt: "Participants taking part in a community education and training activity",
    desc: "Building knowledge and skills through adult literacy, vocational training, community education and learning opportunities that enable individuals and groups to improve their lives.",
    status: "Current",
  },
  {
    slug: "adult-literacy",
    title: "Adult Literacy",
    category: "Education",
    theme: "Education",
    icon: BookOpen,
    image: STOCK_IMAGES.adultLiteracy,
    alt: "Participants engaging in a community learning activity",
    desc: "Providing literacy and numeracy learning opportunities for adults to strengthen knowledge, expand opportunities and support meaningful participation in community life.",
    status: "Current",
  },
  {
    slug: "farmer-field-schools",
    title: "Farmer Field Schools",
    category: "Education",
    theme: "Education",
    icon: GraduationCap,
    image: STOCK_IMAGES.farmerFieldSchools,
    alt: "Farmers participating in a practical field learning session",
    desc: "Providing practical, field-based learning through which farmers develop knowledge and skills in sustainable agriculture, pest management and improved production.",
    status: "Current",
  },

  // THEME 3: LIVELIHOOD
  {
    slug: "community-development",
    title: "Community Development",
    category: "Livelihood",
    theme: "Livelihood",
    icon: Users,
    image: STOCK_IMAGES.community,
    alt: "Community members participating in a CES community meeting",
    desc: "Using participatory development approaches to help communities identify their needs, plan solutions and lead community initiatives through collective action.",
    status: "Current",
  },
  {
    slug: "sustainable-livelihoods",
    title: "Sustainable Livelihoods",
    category: "Livelihood",
    theme: "Livelihood",
    icon: Shield,
    image: STOCK_IMAGES.sustainableLivelihoods,
    alt: "Community members participating in agricultural livelihood activities",
    desc: "Supporting resilient livelihoods through skills development, enterprise initiatives, market access and climate-adaptive practices for farming households.",
    status: "Current",
  },
  {
    slug: "agriculture-food-security",
    title: "Agriculture and Food Security",
    category: "Livelihood",
    theme: "Livelihood",
    icon: Sprout,
    image: STOCK_IMAGES.agriculture,
    alt: "Women working together in a rice nursery in Sierra Leone",
    desc: "Supporting food security and sustainable agricultural production through Farmer Field Schools, improved farming practices, seed distribution and the Trust Rice Project.",
    status: "Current",
  },
  {
    slug: "village-savings-loan-associations",
    title: "Village Savings and Loan Associations",
    category: "Livelihood",
    theme: "Livelihood",
    icon: Landmark,
    image: STOCK_IMAGES.village,
    alt: "Members of a community savings group managing their savings",
    desc: "Supporting community-based savings groups that expand access to financial services, strengthen economic resilience and help members invest in their livelihoods.",
    status: "Current",
  },
  {
    slug: "climate-resilience",
    title: "Climate Resilience",
    category: "Livelihood",
    theme: "Livelihood",
    icon: Leaf,
    image: STOCK_IMAGES.landscape,
    alt: "Rice cultivation and agricultural activity in a rural landscape",
    desc: "Supporting communities to adapt to climate change through sustainable practices, environmental conservation and resilient agricultural systems.",
    status: "Current",
  },
];

const THEMATIC_AREAS = [
  {
    id: "gender-justice",
    number: "01",
    title: "Gender Justice",
    eyebrow: "Equality & Protection",
    icon: Scale,
    description: [
      "The Gender Justice Programme seeks to reduce inequalities between women and men through preventive approaches, including training, advocacy, awareness-raising and empowerment.",
      "Gender justice and child protection are closely interconnected. Rigid gender norms and inequality increase the risks of violence, exploitation and abuse, particularly for girls. Over the next three years, CES will participate in movements that promote the protection of children, women and men.",
    ],
    theme: "Gender Justice",
  },
  {
    id: "education",
    number: "02",
    title: "Education",
    eyebrow: "Learning & Skills Development",
    icon: BookOpen,
    description: [
      "The Education Programme supports vulnerable pupils through sponsorship, promotes safe learning environments through school construction, and includes administrative supervision of schools operated by CES.",
      "Radio can serve as an important educational tool, particularly in communities with limited learning resources. The Education Programme also encompasses literacy and technical and vocational education.",
    ],
    theme: "Education",
  },
  {
    id: "livelihood",
    number: "03",
    title: "Livelihood",
    eyebrow: "Resilience & Economic Empowerment",
    icon: Sprout,
    description: [
      "The Livelihood Programme focuses on helping beneficiaries meet essential needs, including food and water, while promoting economic empowerment.",
      "Through its agricultural, savings and livelihood initiatives, CES seeks to support communities in strengthening their economic resilience and improving their living conditions.",
    ],
    theme: "Livelihood",
  },
];

export default function ProgrammesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-20 md:py-28" aria-labelledby="prog-hero">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${STOCK_IMAGES.programmeBanner}')`,
          }}
          role="img"
          aria-label="Christian Extension Services community and programme activities"
        />

        <div className="absolute inset-0 bg-deep-brown/70" />

        <div className="relative z-10 container-wide mx-auto px-4 md:px-8">
          <div className="max-w-2xl">
            <span className="inline-block text-sm font-semibold text-peach uppercase tracking-wider mb-3">
              What We Do
            </span>

            <h1
              id="prog-hero"
              className="text-4xl md:text-5xl font-serif font-bold text-warm-white mb-6"
            >
              Our Programmes
            </h1>

            <p className="text-lg text-warm-white/90 leading-relaxed">
              Integrated programmes that build capacity, strengthen livelihoods
              and create lasting community transformation.
            </p>
          </div>
        </div>
      </section>

      {/* Thematic Areas */}
      <section
        className="bg-[#FCF9F5] py-14 md:py-20"
        aria-labelledby="thematic-areas-heading"
      >
        <div className="container-wide mx-auto px-4 md:px-8">
          {/* Page Introduction */}
          <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
            <span className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-muted-green mb-5">
              <span className="w-8 h-px bg-muted-green" />
              Our Work
              <span className="w-8 h-px bg-muted-green" />
            </span>

            <h2
              id="thematic-areas-heading"
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-deep-brown mb-6"
            >
              Creating Change,
              <br className="hidden sm:block" />{" "}
              <span className="italic font-normal">
                Strengthening Communities
              </span>
            </h2>

            <p className="max-w-2xl mx-auto text-base md:text-lg text-charcoal/75 leading-8">
              CES works with communities to advance gender justice, expand
              educational opportunities and strengthen sustainable livelihoods.
              These three interconnected thematic areas guide our commitment to
              inclusive and lasting community development.
            </p>
          </div>

          {/* Thematic Navigation Cards */}
          <nav
            aria-label="Explore our thematic areas"
            className="grid md:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16"
          >
            {THEMATIC_AREAS.map((theme) => (
              <a
                key={theme.number}
                href={`#${theme.id}`}
                className="group flex flex-col min-h-[175px] p-6 md:p-7 bg-white border border-[#E9E1D8] rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-muted-green/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-green focus-visible:ring-offset-2"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm font-semibold tracking-widest text-muted-green/70">
                    {theme.number}
                  </span>

                  <div className="w-11 h-11 rounded-full bg-[#EEF2E9] flex items-center justify-center transition-colors duration-300 group-hover:bg-muted-green">
                    <theme.icon className="w-5 h-5 text-muted-green transition-colors duration-300 group-hover:text-white" />
                  </div>
                </div>

                <h3 className="font-serif text-2xl font-bold text-deep-brown mb-2">
                  {theme.title}
                </h3>

                <div className="flex items-center justify-between gap-3 mt-auto">
                  <p className="text-sm text-charcoal/65">
                    {theme.id === "gender-justice"
                      ? "Equality, dignity and protection"
                      : theme.id === "education"
                        ? "Learning, literacy and skills"
                        : "Food security and empowerment"}
                  </p>

                  <ArrowRight className="w-4 h-4 shrink-0 text-muted-green transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </a>
            ))}
          </nav>

          {/* Individual Thematic Areas */}
          {THEMATIC_AREAS.map((theme, index) => {
            const ThemeIcon = theme.icon;
            const programmes = PROGRAMME_DATA.filter(
              (programme) => programme.theme === theme.theme,
            );

            return (
              <section
                key={theme.id}
                id={theme.id}
                className={`scroll-mt-28 ${
                  index < THEMATIC_AREAS.length - 1 ? "mb-16 md:mb-20" : ""
                }`}
                aria-labelledby={`${theme.id}-heading`}
              >
                {/* Theme Heading and Introduction */}
                <div
                  className={`grid lg:grid-cols-[0.85fr_1.15fr] gap-6 lg:gap-12 items-start mb-8 md:mb-10 ${
                    index % 2 === 1
                      ? "relative before:absolute before:inset-x-[-16px] md:before:inset-x-[-32px] before:inset-y-[-24px] md:before:inset-y-[-32px] before:bg-[#F3EEE7] before:rounded-3xl before:-z-10"
                      : ""
                  }`}
                >
                  <div>
                    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-muted-green mb-4">
                      <span className="w-7 h-px bg-muted-green" />
                      Theme {theme.number}
                    </span>

                    <div className="flex items-start gap-4">
                      <div className="hidden sm:flex w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-2xl bg-white border border-[#E9E1D8] items-center justify-center shadow-sm">
                        <ThemeIcon className="w-6 h-6 text-muted-green" />
                      </div>

                      <div className="min-w-0">
                        <h3
                          id={`${theme.id}-heading`}
                          className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-deep-brown leading-tight mb-3"
                        >
                          {theme.title}
                        </h3>

                        <p className="text-sm md:text-base font-medium text-muted-green">
                          {theme.eyebrow}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="lg:pt-7 space-y-4">
                    {theme.description.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-charcoal/75 text-base leading-7"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Programme Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 items-stretch">
                  {programmes.map((programme) => {
                    const ProgrammeIcon = programme.icon;

                    return (
                      <article
                        key={programme.slug}
                        className="group flex flex-col h-full min-w-0 bg-white rounded-2xl overflow-hidden border border-[#EAE2D9] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                      >
                        {/* Image */}
                        <div className="relative overflow-hidden">
                          <img
                            src={programme.image}
                            alt={programme.alt}
                            className="w-full h-52 md:h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />

                          <div className="absolute top-4 left-4">
                            <span className="inline-flex items-center gap-2 rounded-full bg-white/95 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold text-deep-brown shadow-sm">
                              <ProgrammeIcon className="w-3.5 h-3.5 text-muted-green" />
                              {programme.status}
                            </span>
                          </div>
                        </div>

                        {/* Card Content */}
                        <div className="flex flex-col flex-1 p-6 md:p-7">
                          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-green mb-3">
                            {programme.category}
                          </span>

                          <h4 className="font-serif text-xl font-bold text-deep-brown leading-snug mb-3 min-h-[3.5rem]">
                            {programme.title}
                          </h4>

                          <p className="text-sm text-charcoal/70 leading-7 mb-6">
                            {programme.desc}
                          </p>

                          <div className="mt-auto pt-4 border-t border-[#EEE8E1]">
                            <Link
                              href={`/programmes/${programme.slug}`}
                              className="inline-flex items-center gap-2 text-sm font-semibold text-muted-green transition-colors duration-200 hover:text-deep-brown focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-green focus-visible:ring-offset-2 rounded-sm"
                            >
                              Explore Programme
                              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                            </Link>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-cream" aria-labelledby="prog-cta">
        <div className="container-narrow mx-auto text-center">
          <h2
            id="prog-cta"
            className="font-serif text-3xl font-bold text-deep-brown mb-4"
          >
            Support Our Programmes
          </h2>

          <p className="text-charcoal/70 mb-8 max-w-lg mx-auto">
            Your support helps us expand these programmes to reach more
            communities across Sierra Leone.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/donate"
              className="btn-primary inline-flex items-center gap-2"
            >
              Donate Now
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/partner-with-ces"
              className="btn-secondary inline-flex items-center gap-2"
            >
              Partner With CES
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
