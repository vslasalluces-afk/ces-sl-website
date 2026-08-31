export const SITE = {
  name: "Christian Extension Services",
  shortName: "CES SL",
  tagline: "Transforming Communities. Empowering Lives.",
  description:
    "Christian Extension Services works with vulnerable communities in Sierra Leone through training, empowerment and sustainable development initiatives.",
  mission:
    "To build the capacity of vulnerable communities in Sierra Leone through training and working with communities for sustainable development.",
  vision:
    "Empowered communities in Sierra Leone, through initiating, implementing, and managing programmes for transformation.",
  address:
    "3 Mile, Kabala–Makeni Highway, Koinadugu District, Northern Province, Sierra Leone",
  phone: "+232 78 703694",
  email: "Christianextensionservices@gmail.com",
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
    label: "Resources",
    href: "/resources",
    children: [
      { label: "Resources", href: "/resources" },
      { label: "Updates", href: "/updates" },
    ],
  },
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

export const STOCK_IMAGES = {
  hero: "https://images.pexels.com/photos/30491746/pexels-photo-30491746.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1600",
  farming:
    "https://images.pexels.com/photos/38668660/pexels-photo-38668660.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  community:
    "https://images.pexels.com/photos/30616651/pexels-photo-30616651.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  women:
    "https://images.pexels.com/photos/36780246/pexels-photo-36780246.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  landscape:
    "https://images.pexels.com/photos/31487836/pexels-photo-31487836.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  village:
    "https://images.pexels.com/photos/26974534/pexels-photo-26974534.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  training:
    "https://images.pexels.com/photos/30616604/pexels-photo-30616604.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  harvest:
    "https://images.pexels.com/photos/38668661/pexels-photo-38668661.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
} as const;
