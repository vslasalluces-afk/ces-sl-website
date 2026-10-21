export const SITE = {
  name: "Christian Extension Services",
  shortName: "CES SL",
  tagline: "Transforming Communities. Empowering Lives.",
  description:
    "Christian Extension Services works with vulnerable communities in Sierra Leone through training, empowerment and sustainable development initiatives.",
  mission:
    "Build the capacity of vulnerable communities in Sierra Leone through training and working with communities for sustainable development as the developmental arm of the Christian Reforned Church in Sierra Leone.",
  vision:
    "Empowered communities in Sierra Leone, through initiating, implementing, and managing programmes for transformation.",
  address:
    "1 Mile, Kabala–Makeni Highway, Koinadugu District, Northern Province, Sierra Leone",
  phone: "+232 78 703694",
  email: "ces@christianextentionservices.org",
  facebook: "https://www.facebook.com/share/196wy5KvNF/",
  whatsapp: "+23278703694",
  experienceYears: "46+",
} as const;

export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  {
    label: "About CES",
    href: "/about",
    children: [
      { label: "Who We Are", href: "/about" },
      { label: "Mission & Vision", href: "/about#mission" },
      { label: "Our History", href: "/about#history" },
    ],
  },
  {
    label: "Programmes",
    href: "/programmes",
    children: [
      { label: "All Programmes", href: "/programmes" },
      { label: "Projects", href: "/programmes#projects" },
    ],
  },
  { label: "Our Team", href: "/team" },
  {
    label: "Impact",
    href: "/impact-stories",
    children: [{ label: "Stories of Transformation", href: "/impact-stories" }],
  },
  {
    label: "News & Updates",
    href: "/updates",
    children: [
      { label: "News & Updates", href: "/updates" },
      { label: "Resources", href: "/resources" },
    ],
  },
  { label: "Gallery", href: "/gallery" },
  {
    label: "Get Involved",
    href: "/get-involved",
    children: [
      { label: "Volunteer", href: "/volunteer" },
      { label: "Partner With CES", href: "/partner-with-ces" },
    ],
  },
  { label: "Contact", href: "/contact" },
] as const;

export const WHATSAPP_MESSAGES = {
  general: "Hello CES, I would like more information about your work.",
  donation:
    "Hello CES, I would like to support your programmes and need donation information.",
  partnership:
    "Hello CES, I am interested in discussing a partnership with your organisation.",
  volunteer:
    "Hello CES, I would like to learn about volunteering opportunities.",
} as const;

export const PROGRAMME_CATEGORIES = [
  "Community Development",
  "Education and Training",
  "Sustainable Livelihoods",
  "Vulnerable Community Support",
  "Agriculture and Food Security",
  "Gender Equality and GBV Prevention",
  "Women's Empowerment",
  "Village Savings and Loan Associations",
  "Farmer Field Schools",
  "Adult Literacy",
  "Climate Resilience",
] as const;

export const GALLERY_CATEGORIES = [
  "Community Engagement",
  "Training Activities",
  "Field Work",
  "Staff Activities",
  "Partner Activities",
] as const;

/**
 * CES SL programme photographs.
 *
 * Image files should be stored in:
 * public/images/programmes/
 *
 * Files inside Next.js public/ are served from the website root.
 */
export const STOCK_IMAGES = {
  // General website imagery
  hero: "/images/programmes/programme-banner.jpg",
  programmeBanner: "/images/programmes/programme-banner.jpg",

  // Community development
  community: "/images/programmes/community-dev.jpg",

  // Education and training
  training: "/images/programmes/education-and-training.jpg",
  adultLiteracy: "/images/programmes/adult-literacy.jpg",

  // Agriculture and sustainable livelihoods
  farming: "/images/programmes/agriculture-and-food-security.jpeg",
  agriculture: "/images/programmes/agriculture-and-food-security.jpeg",
  harvest: "/images/programmes/sustainable-livelihoods.jpg",
  sustainableLivelihoods: "/images/programmes/sustainable-livelihoods.jpg",
  farmerFieldSchools: "/images/programmes/Farmer-field-schools.jpg",

  // Climate resilience
  landscape: "/images/programmes/agriculture-and-food-security.jpeg",

  // Women's empowerment and gender equality
  women: "/images/programmes/women-empowerment.jpeg",
  gbv: "/images/programmes/gbv.jpeg",

  // Village Savings and Loan Associations
  village: "/images/programmes/vsla.jpeg",

  // Vulnerable community support
  vulnerableSupport: "/images/programmes/vulnerable-community-support.jpg",
} as const;
