import { SITE } from "@/lib/constants";

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: "Christian Extension Services",
    alternateName: "CES SL",
    description: SITE.description,
    url: "https://cessl.org",
    logo: "https://cessl.org/logo.png",
    foundingDate: "1978",
    address: {
      "@type": "PostalAddress",
      streetAddress: "3 Mile, Kabala–Makeni Highway",
      addressLocality: "Kabala",
      addressRegion: "Koinadugu District",
      addressCountry: "SL",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE.phone,
      email: SITE.email,
      contactType: "customer service",
      availableLanguage: ["English"],
    },
    sameAs: [SITE.facebook],
    areaServed: {
      "@type": "Country",
      name: "Sierra Leone",
    },
    knowsAbout: [
      "Community Development",
      "Sustainable Agriculture",
      "Women's Empowerment",
      "Village Savings and Loan Associations",
      "Gender Equality",
      "Food Security",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function FAQJsonLd({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ArticleJsonLd({
  title,
  description,
  url,
  image,
  datePublished,
  author,
}: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  author?: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    image: image || "https://cessl.org/og-image.jpg",
    datePublished,
    author: {
      "@type": "Organization",
      name: author || "Christian Extension Services",
    },
    publisher: {
      "@type": "Organization",
      name: "Christian Extension Services",
      logo: {
        "@type": "ImageObject",
        url: "https://cessl.org/logo.png",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function EventJsonLd({
  name,
  description,
  startDate,
  endDate,
  location,
  url,
}: {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: string;
  url: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Event",
    name,
    description,
    startDate,
    endDate: endDate || startDate,
    location: {
      "@type": "Place",
      name: location,
      address: {
        "@type": "PostalAddress",
        addressCountry: "SL",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "Christian Extension Services",
      url: "https://cessl.org",
    },
    url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
