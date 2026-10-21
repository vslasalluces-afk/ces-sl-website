"use client";

import { useState } from "react";
import { STOCK_IMAGES, GALLERY_CATEGORIES } from "@/lib/constants";
import ImageLightbox from "@/components/ImageLightbox";
import { Camera } from "lucide-react";

const GALLERY_ITEMS = [
  {
    src: "/images/programmes/community-dev.jpg",
    alt: "Community members participating in a development meeting",
    category: "Community Engagement",
    location: "Koinadugu District, Sierra Leone",
    caption: "Community members gathering to discuss local development",
  },
  {
    src: "/images/programmes/education-and-training.jpg",
    alt: "Participants taking part in a community training activity",
    category: "Training Activities",
    location: "Sierra Leone",
    caption: "Community capacity building and training",
  },
  {
    src: "/images/programmes/agriculture-and-food-security.jpeg",
    alt: "Women working together in a rice nursery",
    category: "Field Work",
    location: "Sierra Leone",
    caption: "Women contributing to rice production and food security",
  },
  {
    src: "/images/programmes/women-empowerment.jpeg",
    alt: "Women participating in a community empowerment activity",
    category: "Community Engagement",
    location: "Sierra Leone",
    caption: "Promoting women's empowerment and participation",
  },
  {
    src: "/images/programmes/Farmer-field-schools.jpg",
    alt: "Farmers participating in a practical field learning session",
    category: "Field Work",
    location: "Sierra Leone",
    caption: "Farmer Field School activities",
  },
  {
    src: "/images/programmes/sustainable-livelihoods.jpg",
    alt: "Community members participating in livelihood activities",
    category: "Partner Activities",
    location: "Sierra Leone",
    caption: "Supporting sustainable livelihoods",
  },
  {
    src: "/images/programmes/vsla.jpeg",
    alt: "Members of a community savings group",
    category: "Community Engagement",
    location: "Sierra Leone",
    caption: "Village Savings and Loan Association activities",
  },
  {
    src: "/images/programmes/vulnerable-community-support.jpg",
    alt: "Community members participating in a support activity",
    category: "Partner Activities",
    location: "Sierra Leone",
    caption: "Community support and inclusion",
  },
  {
    src: "/images/programmes/gbv.jpeg",
    alt: "Women participating in a gender equality awareness activity",
    category: "Community Engagement",
    location: "Koinadugu District, Sierra Leone",
    caption: "Promoting women's rights and gender equality",
  },
  {
    src: "/images/programmes/adult-literacy.jpg",
    alt: "Participants engaging in a community learning activity",
    category: "Training Activities",
    location: "Sierra Leone",
    caption: "Adult literacy and lifelong learning",
  },
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredItems = selectedCategory
    ? GALLERY_ITEMS.filter((item) => item.category === selectedCategory)
    : GALLERY_ITEMS;

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <section
        className="bg-gradient-to-b from-cream to-warm-white section-padding"
        aria-labelledby="gallery-hero"
      >
        <div className="container-wide mx-auto">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-muted-green text-sm font-semibold uppercase tracking-wider mb-4">
              <Camera className="w-4 h-4" />
              Media
            </span>
            <h1
              id="gallery-hero"
              className="text-4xl md:text-5xl font-serif font-bold text-deep-brown mb-6"
            >
              Gallery
            </h1>
            <p className="text-lg text-charcoal/80 leading-relaxed">
              Images from our programmes, community activities and field work
              across Sierra Leone. All images are used with permission.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding pt-8">
        <div className="container-wide mx-auto">
          {/* Category filters */}
          <div
            className="flex flex-wrap gap-3 mb-10"
            role="tablist"
            aria-label="Gallery categories"
          >
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                !selectedCategory
                  ? "bg-deep-brown text-warm-white shadow-lg"
                  : "bg-peach-100 text-deep-brown hover:bg-peach-200"
              }`}
              role="tab"
              aria-selected={!selectedCategory}
            >
              All Photos
            </button>
            {GALLERY_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-deep-brown text-warm-white shadow-lg"
                    : "bg-peach-100 text-deep-brown hover:bg-peach-200"
                }`}
                role="tab"
                aria-selected={selectedCategory === cat}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry-style grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {filteredItems.map((item, i) => (
              <button
                key={i}
                onClick={() => openLightbox(i)}
                className="group relative w-full break-inside-avoid overflow-hidden rounded-2xl cursor-pointer focus:outline-none focus:ring-4 focus:ring-peach"
                aria-label={`View ${item.alt}`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-brown/80 via-deep-brown/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <span className="text-peach text-xs font-semibold uppercase tracking-wider mb-1">
                    {item.category}
                  </span>
                  <span className="text-warm-white font-medium text-sm line-clamp-2">
                    {item.caption}
                  </span>
                  <span className="text-warm-white/60 text-xs mt-1">
                    {item.location}
                  </span>
                </div>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-warm-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                  <Camera className="w-5 h-5 text-deep-brown" />
                </div>
              </button>
            ))}
          </div>

          <p className="text-center text-sm text-charcoal/50 mt-12">
            More images will be added as CES provides approved media through the
            content management system. All images are used with permission and
            in accordance with safeguarding guidelines.
          </p>
        </div>
      </section>

      <ImageLightbox
        images={filteredItems}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}
