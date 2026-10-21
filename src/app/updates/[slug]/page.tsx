import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const ARTICLES = {
  "community-development": {
    title: "Community Development and Local Participation",
    category: "Community Development",
    image: "/images/programmes/community-dev.jpg",
    introduction:
      "Strong communities are built through participation, cooperation and locally driven solutions. Community development encourages people to identify their priorities, contribute to decisions and work together towards sustainable improvements in their lives.",
    paragraphs: [
      "Christian Extension Services works with communities to support development initiatives that respond to local needs. Community participation helps ensure that activities reflect the experiences, priorities and aspirations of the people they are intended to serve.",
      "Sustainable community development also depends on collaboration among community members, local leadership, development organisations and other stakeholders. Through this cooperation, communities can strengthen their capacity to identify challenges and pursue practical solutions.",
      "CES continues to support approaches that recognise local knowledge, encourage collective responsibility and promote inclusive participation in community development.",
    ],
  },

  "agriculture-food-security": {
    title: "Agriculture and Food Security",
    category: "Agriculture and Food Security",
    image: "/images/programmes/agriculture-and-food-security.jpeg",
    introduction:
      "Agriculture remains essential to rural livelihoods and household food security in Sierra Leone. Supporting farmers with practical knowledge, appropriate agricultural practices and opportunities for cooperation can contribute to more sustainable food production.",
    paragraphs: [
      "Food security involves more than producing food. Communities also need reliable access to sufficient, safe and nutritious food throughout the year. Strengthening agricultural livelihoods can help households respond to seasonal challenges and changing economic conditions.",
      "Community-based agricultural initiatives can encourage farmers to share experiences, improve production practices and explore ways of reducing post-harvest losses.",
      "CES's work in this area focuses on supporting sustainable livelihoods and strengthening the capacity of rural communities to improve their food security.",
    ],
  },

  "women-empowerment": {
    title: "Women's Empowerment and Community Participation",
    category: "Women Empowerment",
    image: "/images/programmes/women-empowerment.jpeg",
    introduction:
      "Women's participation is important to inclusive community development. When women have opportunities to contribute to decisions, develop skills and participate in livelihood activities, households and communities can benefit from a broader range of experiences and ideas.",
    paragraphs: [
      "Women's empowerment involves creating opportunities for women to strengthen their economic participation, build confidence and take part in decisions that affect their lives.",
      "Community initiatives can support these goals through skills development, collective action, access to livelihood opportunities and greater awareness of women's rights and responsibilities.",
      "CES recognises the importance of inclusive development approaches that value women's contributions and encourage meaningful participation in community life.",
    ],
  },

  "farmer-field-schools": {
    title: "Farmer Field Schools and Practical Agricultural Learning",
    category: "Agriculture and Training",
    image: "/images/programmes/Farmer-field-schools.jpg",
    introduction:
      "Farmer Field Schools provide a practical approach to agricultural learning. Farmers can observe, discuss and apply agricultural techniques while sharing knowledge and experiences with other members of their communities.",
    paragraphs: [
      "Practical learning can help farmers understand crop management, soil health, pest control and other aspects of agricultural production. Learning through observation and discussion also encourages farmers to make informed decisions in their own fields.",
      "Farmer Field Schools can strengthen cooperation by bringing farmers together to examine challenges and explore possible solutions suited to their local conditions.",
      "CES supports sustainable agricultural development as part of its broader commitment to improving rural livelihoods and community resilience.",
    ],
  },

  "village-savings-loan-associations": {
    title: "Village Savings and Loan Associations",
    category: "Livelihoods and Financial Inclusion",
    image: "/images/programmes/vsla.jpeg",
    introduction:
      "Village Savings and Loan Associations can help community members build a regular savings habit and access small loans through a group-based system. These arrangements can provide a practical financial resource for people with limited access to formal banking services.",
    paragraphs: [
      "Members typically contribute savings to a common fund and may borrow from that fund according to agreed group rules. Transparent record-keeping, shared responsibilities and mutual accountability are important to the effective operation of these associations.",
      "Savings groups can help members plan for household needs, manage some unexpected expenses and explore small livelihood activities. Their effectiveness depends on sound management, trust and clear procedures.",
      "CES recognises savings and livelihood initiatives as important areas of community-based development. Specific results and achievements should be added to this article when verified programme information is available.",
    ],
  },

  "supporting-vulnerable-communities": {
    title: "Supporting Vulnerable Communities",
    category: "Community Support",
    image: "/images/programmes/vulnerable-community-support.jpg",
    introduction:
      "Inclusive community development recognises that some individuals and households face additional barriers to accessing opportunities and essential services. Identifying these barriers is an important step towards planning appropriate and responsive support.",
    paragraphs: [
      "Community-based support is most effective when it recognises people's circumstances, respects their dignity and encourages participation in decisions that affect them.",
      "Collaboration with community leaders, local organisations and other relevant stakeholders can help identify priorities and coordinate support for people who may otherwise be overlooked.",
      "CES remains committed to community development approaches that promote inclusion, participation and improved opportunities for vulnerable groups.",
    ],
  },
} as const;

type ArticleSlug = keyof typeof ARTICLES;

function isArticleSlug(slug: string): slug is ArticleSlug {
  return Object.prototype.hasOwnProperty.call(ARTICLES, slug);
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  if (!isArticleSlug(slug)) {
    return {
      title: "Update Not Found",
    };
  }

  const article = ARTICLES[slug];

  return {
    title: article.title,
    description: article.introduction,
  };
}

export default async function UpdateDetailPage({ params }: PageProps) {
  const { slug } = await params;

  if (!isArticleSlug(slug)) {
    notFound();
  }

  const article = ARTICLES[slug];

  return (
    <main>
      <section className="section-padding">
        <div className="container-narrow mx-auto">
          <Link
            href="/updates"
            className="inline-flex items-center gap-2 text-muted-green text-sm mb-8 hover:text-green-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All Updates
          </Link>

          <p className="text-sm font-semibold uppercase tracking-wider text-muted-green mb-3">
            {article.category}
          </p>

          <h1 className="text-3xl md:text-5xl font-serif font-bold text-deep-brown leading-tight mb-8">
            {article.title}
          </h1>

          <div className="mb-10 overflow-hidden rounded-xl">
            <img
              src={article.image}
              alt={article.title}
              className="w-full max-h-[520px] object-cover"
            />
          </div>

          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-charcoal/80 leading-relaxed mb-8">
              {article.introduction}
            </p>

            <div className="space-y-6 text-charcoal/75 leading-8">
              {article.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="mt-14 pt-8 border-t border-charcoal/10 flex justify-between items-center gap-4">
            <Link
              href="/updates"
              className="inline-flex items-center gap-2 text-muted-green hover:text-green-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Updates
            </Link>

            <Link
              href="/programmes"
              className="inline-flex items-center gap-2 text-muted-green hover:text-green-700 transition-colors"
            >
              Explore Our Programmes
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
