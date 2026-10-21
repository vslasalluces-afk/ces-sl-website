import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Newspaper } from "lucide-react";

export const metadata: Metadata = {
  title: "News & Updates",
  description:
    "Read news, programme updates, community stories and announcements from Christian Extension Services in Sierra Leone.",
};

const NEWS_ITEMS = [
  {
    slug: "community-development",
    title: "Working with Communities for Sustainable Development",
    summary:
      "Discover how community participation, local leadership and collective action contribute to sustainable development in Sierra Leone.",
    date: "Community Story",
    category: "Community Development",
    image: "/images/programmes/community-dev.jpg",
    featured: true,
  },
  {
    slug: "agriculture-food-security",
    title: "Supporting Agriculture and Food Security",
    summary:
      "Explore agricultural activities that support farming communities and contribute to sustainable food production and improved livelihoods.",
    date: "Programme Feature",
    category: "Agriculture",
    image: "/images/programmes/agriculture-and-food-security.jpeg",
    featured: false,
  },
  {
    slug: "women-empowerment",
    title: "Promoting Women's Empowerment",
    summary:
      "Learn about the importance of women's participation, economic empowerment and community leadership in sustainable development.",
    date: "Programme Feature",
    category: "Women's Empowerment",
    image: "/images/programmes/women-empowerment.jpeg",
    featured: false,
  },
  {
    slug: "farmer-field-schools",
    title: "Learning and Sharing through Farmer Field Schools",
    summary:
      "Practical agricultural learning provides opportunities for farmers to exchange knowledge and strengthen their farming practices.",
    date: "Programme Feature",
    category: "Training",
    image: "/images/programmes/Farmer-field-schools.jpg",
    featured: false,
  },
  {
    slug: "village-savings-loan-associations",
    title: "Building Financial Resilience through Community Savings",
    summary:
      "Community savings groups can help members strengthen financial management, develop livelihoods and work towards their economic goals.",
    date: "Programme Feature",
    category: "Livelihoods",
    image: "/images/programmes/vsla.jpeg",
    featured: false,
  },
  {
    slug: "supporting-vulnerable-communities",
    title: "Strengthening Support for Vulnerable Community Members",
    summary:
      "Inclusive community development recognises the needs, dignity and participation of people who may face additional barriers.",
    date: "Community Story",
    category: "Community Support",
    image: "/images/programmes/vulnerable-community-support.jpg",
    featured: false,
  },
];

export default function UpdatesPage() {
  const featuredStory = NEWS_ITEMS.find((item) => item.featured);
  const otherStories = NEWS_ITEMS.filter((item) => !item.featured);

  return (
    <>
      {/* Page introduction */}
      <section className="bg-cream section-padding" aria-labelledby="news-hero">
        <div className="container-wide mx-auto">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-muted-green uppercase tracking-wider mb-3">
              <Newspaper className="w-4 h-4" />
              Newsroom
            </span>

            <h1
              id="news-hero"
              className="text-4xl md:text-5xl font-serif font-bold text-deep-brown mb-6"
            >
              News &amp; Updates
            </h1>

            <p className="text-lg text-charcoal/80 leading-relaxed">
              Read about CES programmes, community activities, stories of
              transformation and developments in our work with communities
              across Sierra Leone.
            </p>
          </div>
        </div>
      </section>

      {/* Featured story */}
      {featuredStory && (
        <section className="section-padding" aria-labelledby="featured-news">
          <div className="container-wide mx-auto">
            <h2
              id="featured-news"
              className="font-serif text-2xl md:text-3xl font-bold text-deep-brown mb-8"
            >
              Featured Story
            </h2>

            <article className="card overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="relative min-h-64 md:min-h-full">
                  <img
                    src={featuredStory.image}
                    alt={featuredStory.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>

                <div className="p-6 md:p-10 flex flex-col justify-center">
                  <span className="text-xs text-muted-green font-semibold uppercase tracking-wider mb-3">
                    {featuredStory.category}
                  </span>

                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-deep-brown mb-4">
                    {featuredStory.title}
                  </h3>

                  <p className="text-charcoal/70 leading-relaxed mb-6">
                    {featuredStory.summary}
                  </p>

                  <Link
                    href={`/updates/${featuredStory.slug}`}
                    className="text-muted-green font-semibold inline-flex items-center gap-2"
                  >
                    Read Story
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </section>
      )}

      {/* News and programme updates */}
      <section className="section-padding pt-0" aria-labelledby="latest-news">
        <div className="container-wide mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
            <div>
              <span className="text-sm text-muted-green font-semibold uppercase tracking-wider">
                From Our Work
              </span>

              <h2
                id="latest-news"
                className="font-serif text-2xl md:text-3xl font-bold text-deep-brown mt-2"
              >
                Stories &amp; Programme Features
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherStories.map((story) => (
              <article key={story.slug} className="card group overflow-hidden">
                <div className="relative overflow-hidden">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />

                  <span className="absolute top-4 left-4 text-xs bg-peach text-deep-brown px-3 py-1.5 rounded-full font-medium">
                    {story.category}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-charcoal/60 mb-3">
                    <Calendar className="w-3.5 h-3.5" />
                    {story.date}
                  </div>

                  <h3 className="font-serif text-xl font-bold text-deep-brown mb-3">
                    {story.title}
                  </h3>

                  <p className="text-charcoal/70 text-sm leading-relaxed mb-5">
                    {story.summary}
                  </p>

                  <Link
                    href={`/updates/${story.slug}`}
                    className="text-muted-green font-semibold text-sm hover:text-green-700 inline-flex items-center gap-2"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <p className="text-center text-sm text-charcoal/60 mt-12 max-w-2xl mx-auto leading-relaxed">
            These programme features provide an introduction to CES&apos;s work.
            Dated news reports, announcements and full community stories can be
            added as approved content becomes available.
          </p>
        </div>
      </section>
    </>
  );
}
