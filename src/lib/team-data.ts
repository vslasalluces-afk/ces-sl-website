export interface TeamMember {
  slug: string;
  fullName: string;
  jobTitle: string;
  department?: string;
  shortBio: string;
  fullBio: string;
  education: string[];
  experience?: { role: string; org: string; period: string }[];
  quote?: string;
  profileImage?: string;
  displayOrder: number;
  featured: boolean;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    slug: "sarah-kanu",
    fullName: "Sarah Kanu",
    jobTitle: "Executive Director",
    department: "Leadership",
    shortBio:
      "Sarah Kanu is the Executive Director of CES, bringing extensive experience in leadership, financial management, organisational governance and strategic planning.",
    fullBio:
      "Sarah Kanu is the Executive Director of Christian Extension Services (CES). She holds a Master's degree and brings extensive experience in leadership, financial management, organisational governance and strategic planning. She provides overall leadership for CES and guides programmes that improve the livelihoods of vulnerable communities across Sierra Leone.",
    education: [
      "Diploma in British Environmental Studies",
      "BSc (Hons) Accounting and Finance",
      "MSc International Banking and Finance",
    ],
    quote:
      "If you go alone, you go fast, but if you want to go far, go together.",
    profileImage: "/images/staff/sarah-kanu.jpeg",
    displayOrder: 1,
    featured: true,
  },
  {
    slug: "alie-konteh-kamara",
    fullName: "Alie Konteh Kamara",
    jobTitle: "Programme Manager",
    department: "Programmes",
    shortBio:
      "Alie Konteh Kamara provides strategic leadership and oversight for agricultural and community development work at CES.",
    fullBio:
      "Alie Konteh Kamara joined CES on 4 May 2026 as Programme Manager. He provides strategic leadership and oversight for agricultural and community development work, including Farmer Field Schools, training modules, project planning, implementation and partnership coordination.\n\nBefore joining CES, Alie worked with CARE International from 2011 to 2023, initially as a Project Officer and later as District Programme Coordinator. His experience includes sustainable agriculture, farmer training, community engagement, rural livelihoods and programme leadership.",
    education: [
      "Teachers' Certificate, 2005–2008",
      "Higher Teachers' Certificate – Secondary, 2008–2011",
      "BSc Public Health, 2020–2024",
    ],
    experience: [
      {
        role: "Project Officer / District Programme Coordinator",
        org: "CARE International",
        period: "2011–2023",
      },
    ],
    profileImage: "/images/staff/alie-konteh-kamara.jpeg",
    displayOrder: 2,
    featured: true,
  },
  {
    slug: "edward-kanu",
    fullName: "Edward Kanu",
    jobTitle: "Monitoring, Evaluation and Learning Officer",
    department: "Monitoring & Evaluation",
    shortBio:
      "Edward Kanu leads monitoring, evaluation and learning at CES, bringing experience from CARE International Sierra Leone.",
    fullBio:
      "Edward Kanu is the Monitoring, Evaluation and Learning Officer at CES. He holds a BA in Mass Communication and is pursuing postgraduate studies. Before joining CES, he worked with CARE International Sierra Leone as an Accountability Monitor from 2016 to 2018 and Senior Monitoring and Evaluation Officer from 2019 to 2025.\n\nHe brings experience in monitoring and evaluation systems, accountability mechanisms, data analysis, programme learning and results-focused programme management. He is committed to quality work and serving vulnerable communities.",
    education: ["BA Mass Communication", "Postgraduate studies in progress"],
    experience: [
      {
        role: "Accountability Monitor",
        org: "CARE International Sierra Leone",
        period: "2016–2018",
      },
      {
        role: "Senior Monitoring and Evaluation Officer",
        org: "CARE International Sierra Leone",
        period: "2019–2025",
      },
    ],
    quote:
      "I find pleasure serving the disadvantaged and less privileged people.",
    profileImage: "/images/staff/edward-kanu.jpeg",
    displayOrder: 3,
    featured: true,
  },
  {
    slug: "lansana-daniel-koroma",
    fullName: "Lansana Daniel Koroma",
    jobTitle: "Finance Officer",
    department: "Finance",
    shortBio:
      "Lansana Daniel Koroma supports financial reporting, budgeting, compliance, accountability and the responsible stewardship of organisational resources.",
    fullBio:
      "Lansana Daniel Koroma serves as Finance Officer at Christian Extension Services. He supports financial reporting, budgeting, compliance, accountability and the responsible stewardship of organisational resources.",
    education: ["Higher Diploma in Accounting and Finance"],
    profileImage: "/images/staff/lansana-daniel-koroma.jpeg",
    displayOrder: 4,
    featured: false,
  },
  {
    slug: "fatmata-kumarr",
    fullName: "Fatmata Kumarr",
    jobTitle: "Gender Officer and Field Staff",
    department: "Gender & Field Operations",
    shortBio:
      "Fatmata Kumarr supports gender equality, GBV prevention, women's empowerment, VSLAs and Farmer Field Schools.",
    fullBio:
      "Fatmata Kumarr serves as Gender Officer and Field Staff at Christian Extension Services. Her work supports gender equality, prevention and response to gender-based violence, women's empowerment, Village Savings and Loan Associations and Farmer Field Schools. She is committed to inclusive, sustainable development that strengthens rural communities.",
    education: [
      "Bachelor's Degree in Procurement, Logistics and Supply Chain Management, Institute of Public Administration and Management, University of Sierra Leone",
      "Higher Diploma in Procurement and Supply, IPAM",
      "Professional training in gender-based violence",
      "Certificate in Farmer Field School Facilitation",
      "Training Certificate in Solar Installation",
    ],
    quote:
      "Empowering women, strengthening farmers and promoting equality are key to building resilient and thriving communities.",
    profileImage: "/images/staff/fatmata-kumarr.jpeg",
    displayOrder: 5,
    featured: true,
  },
  {
    slug: "sallu-marah",
    fullName: "Sallu Marah",
    jobTitle: "Field Officer",
    department: "Field Operations",
    shortBio:
      "Sallu Marah supervises VSLAs, sustainable agriculture, food security, adult literacy and community development projects.",
    fullBio:
      "Sallu Marah joined Christian Extension Services on 15 March 2022. He was born in Kabala Town, Koinadugu District, where he is based. His work includes supervision of Village Savings and Loan Associations, Sustainable Agriculture and Food Security programmes, adult literacy, gender-based violence programming, Community Initiative Projects and the Trust Rice Project.",
    education: [
      "Higher Teachers' Certificate – Secondary",
      "Bachelor of Arts in Community Development Studies, in progress",
    ],
    profileImage: "/images/staff/sallu-marah.jpeg",
    displayOrder: 6,
    featured: false,
  },
  {
    slug: "baio-bockarie-mansaray",
    fullName: "Baio Bockarie Mansaray",
    jobTitle: "Field Staff",
    department: "Field Operations",
    shortBio:
      "Baio Bockarie Mansaray has more than five years of experience working with rural communities on community-led development.",
    fullBio:
      "Baio Bockarie Mansaray joined Christian Extension Services on 1 June 2025. Originally from Kabala in Koinadugu District, he has more than five years of experience working with rural communities. He is passionate about community-led development and supporting farming households to improve their livelihoods.",
    education: [
      "BSc (Hons) Social Work, Njala University",
      "Earlier education at Roman Catholic Primary School and Kabala Secondary School",
    ],
    profileImage: "/images/staff/baio-bockarie-mansaray.jpeg",
    displayOrder: 7,
    featured: false,
  },
  {
    slug: "lansana-amos-janneh",
    fullName: "Lansana Amos Janneh",
    jobTitle: "Field Staff",
    department: "Field Operations",
    shortBio:
      "Lansana Amos Janneh contributes agricultural expertise to the Trust Rice Project, supporting sustainable food production.",
    fullBio:
      "Lansana Amos Janneh joined CES in January 2026 as a member of the Field Staff. He contributes agricultural expertise to the Trust Rice Project, supporting sustainable food production and stronger livelihoods within local communities.",
    education: [
      "National Diploma in Agriculture",
      "Higher Teachers' Certificate in Agriculture",
    ],
    profileImage: "/images/staff/lansana-amos-janneh.jpeg",
    displayOrder: 8,
    featured: false,
  },
];
