import {
  pgTable,
  serial,
  text,
  varchar,
  boolean,
  timestamp,
  integer,
  jsonb,
  date,
} from "drizzle-orm/pg-core";

// ─── Users (Donors) ──────────────────────────────────────────────
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  country: varchar("country", { length: 100 }),
  phone: varchar("phone", { length: 50 }),
  role: varchar("role", { length: 50 }).default("donor"),
  emailVerified: boolean("email_verified").default(false),
  verificationToken: varchar("verification_token", { length: 255 }),
  verificationExpires: timestamp("verification_expires"),
  resetToken: varchar("reset_token", { length: 255 }),
  resetExpires: timestamp("reset_expires"),
  communicationConsent: boolean("communication_consent").default(false),
  stripeCustomerId: varchar("stripe_customer_id", { length: 255 }),
  totalDonated: integer("total_donated").default(0),
  donationCount: integer("donation_count").default(0),
  lastDonationAt: timestamp("last_donation_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ─── Staff ───────────────────────────────────────────────────────
export const staff = pgTable("staff", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  jobTitle: varchar("job_title", { length: 255 }).notNull(),
  department: varchar("department", { length: 255 }),
  location: varchar("location", { length: 255 }),
  shortBio: text("short_bio"),
  fullBio: text("full_bio"),
  education: jsonb("education").$type<string[]>(),
  experience: jsonb("experience").$type<{ role: string; org: string; period: string }[]>(),
  expertise: jsonb("expertise").$type<string[]>(),
  quote: text("quote"),
  profileImage: text("profile_image"),
  email: varchar("email", { length: 255 }),
  phone: varchar("phone", { length: 50 }),
  publicContactApproved: boolean("public_contact_approved").default(false),
  socialLinks: jsonb("social_links").$type<Record<string, string>>(),
  displayOrder: integer("display_order").default(0),
  featured: boolean("featured").default(false),
  active: boolean("active").default(true),
  seoTitle: varchar("seo_title", { length: 255 }),
  seoDescription: text("seo_description"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ─── Programmes ──────────────────────────────────────────────────
export const programmes = pgTable("programmes", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  category: varchar("category", { length: 255 }),
  shortDescription: text("short_description"),
  fullDescription: text("full_description"),
  status: varchar("status", { length: 50 }).default("current"),
  objectives: jsonb("objectives").$type<string[]>(),
  activities: jsonb("activities").$type<string[]>(),
  beneficiaryGroups: jsonb("beneficiary_groups").$type<string[]>(),
  areasOfOperation: jsonb("areas_of_operation").$type<string[]>(),
  timeline: text("timeline"),
  partners: jsonb("partners").$type<string[]>(),
  featuredImage: text("featured_image"),
  gallery: jsonb("gallery").$type<string[]>(),
  donationEnabled: boolean("donation_enabled").default(false),
  featured: boolean("featured").default(false),
  seoTitle: varchar("seo_title", { length: 255 }),
  seoDescription: text("seo_description"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ─── Impact Stories ──────────────────────────────────────────────
export const impactStories = pgTable("impact_stories", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  summary: text("summary"),
  communityContext: text("community_context"),
  cesResponse: text("ces_response"),
  whatChanged: text("what_changed"),
  quote: text("quote"),
  quoteAttribution: text("quote_attribution"),
  programmeId: integer("programme_id"),
  location: varchar("location", { length: 255 }),
  featuredImage: text("featured_image"),
  gallery: jsonb("gallery").$type<string[]>(),
  videoUrl: text("video_url"),
  published: boolean("published").default(false),
  featured: boolean("featured").default(false),
  publishedAt: timestamp("published_at"),
  seoTitle: varchar("seo_title", { length: 255 }),
  seoDescription: text("seo_description"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ─── News / Updates ──────────────────────────────────────────────
export const newsArticles = pgTable("news_articles", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  summary: text("summary"),
  content: text("content"),
  category: varchar("category", { length: 100 }),
  author: varchar("author", { length: 255 }),
  featuredImage: text("featured_image"),
  tags: jsonb("tags").$type<string[]>(),
  published: boolean("published").default(false),
  publishedAt: timestamp("published_at"),
  seoTitle: varchar("seo_title", { length: 255 }),
  seoDescription: text("seo_description"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ─── Events ──────────────────────────────────────────────────────
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  eventDate: date("event_date"),
  endDate: date("end_date"),
  time: varchar("time", { length: 100 }),
  venue: varchar("venue", { length: 255 }),
  isOnline: boolean("is_online").default(false),
  onlineUrl: text("online_url"),
  featuredImage: text("featured_image"),
  programmeId: integer("programme_id"),
  status: varchar("status", { length: 50 }).default("upcoming"),
  registrationUrl: text("registration_url"),
  published: boolean("published").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ─── Campaigns ───────────────────────────────────────────────────
export const campaigns = pgTable("campaigns", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  narrative: text("narrative"),
  targetAmount: integer("target_amount"),
  raisedAmount: integer("raised_amount").default(0),
  currency: varchar("currency", { length: 10 }).default("USD"),
  deadline: date("deadline"),
  status: varchar("status", { length: 50 }).default("published"),
  featuredImage: text("featured_image"),
  gallery: jsonb("gallery").$type<string[]>(),
  published: boolean("published").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ─── CES Media Library ───────────────────────────────────────────
export const mediaLibrary = pgTable("media_library", {
  id: serial("id").primaryKey(),
  filename: varchar("filename", { length: 500 }).notNull(),
  originalFilename: varchar("original_filename", { length: 500 }),
  mimeType: varchar("mime_type", { length: 100 }),
  fileSize: integer("file_size"),
  width: integer("width"),
  height: integer("height"),
  url: text("url").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  // CES metadata
  caption: text("caption"),
  altText: text("alt_text"),
  category: varchar("category", { length: 100 }),
  programme: varchar("programme", { length: 255 }),
  location: varchar("location", { length: 255 }),
  dateTaken: date("date_taken"),
  credit: varchar("credit", { length: 255 }),
  copyright: text("copyright"),
  // Source tracking
  source: varchar("source", { length: 100 }).default("upload"),
  sourceUrl: text("source_url"),
  facebookPostId: varchar("facebook_post_id", { length: 255 }),
  // Consent & safeguarding
  consentStatus: varchar("consent_status", { length: 50 }).default("approved"),
  consentNotes: text("consent_notes"),
  containsChildren: boolean("contains_children").default(false),
  safeguardingApproved: boolean("safeguarding_approved").default(false),
  // Usage
  usedOn: jsonb("used_on").$type<string[]>(),
  tags: jsonb("tags").$type<string[]>(),
  displayOrder: integer("display_order").default(0),
  featured: boolean("featured").default(false),
  published: boolean("published").default(true),
  uploadedBy: varchar("uploaded_by", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ─── Resources / Publications ────────────────────────────────────
export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  documentType: varchar("document_type", { length: 100 }),
  summary: text("summary"),
  fileUrl: text("file_url"),
  fileSize: varchar("file_size", { length: 50 }),
  language: varchar("language", { length: 50 }).default("English"),
  tags: jsonb("tags").$type<string[]>(),
  publishedDate: date("published_date"),
  published: boolean("published").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// ─── Contact Submissions ─────────────────────────────────────────
export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  subject: varchar("subject", { length: 255 }),
  message: text("message").notNull(),
  type: varchar("type", { length: 50 }).default("general"),
  status: varchar("status", { length: 50 }).default("new"),
  createdAt: timestamp("created_at").defaultNow(),
});

// ─── Volunteer Enquiries ─────────────────────────────────────────
export const volunteerEnquiries = pgTable("volunteer_enquiries", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  skills: text("skills"),
  availability: text("availability"),
  message: text("message"),
  privacyConsent: boolean("privacy_consent").default(false),
  status: varchar("status", { length: 50 }).default("new"),
  createdAt: timestamp("created_at").defaultNow(),
});

// ─── Partnership Enquiries ───────────────────────────────────────
export const partnershipEnquiries = pgTable("partnership_enquiries", {
  id: serial("id").primaryKey(),
  organisationName: varchar("organisation_name", { length: 255 }).notNull(),
  contactPerson: varchar("contact_person", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  organisationType: varchar("organisation_type", { length: 100 }),
  interestArea: varchar("interest_area", { length: 255 }),
  message: text("message"),
  privacyConsent: boolean("privacy_consent").default(false),
  status: varchar("status", { length: 50 }).default("new"),
  createdAt: timestamp("created_at").defaultNow(),
});

// ─── Newsletter Subscribers ──────────────────────────────────────
export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  marketingConsent: boolean("marketing_consent").default(false),
  active: boolean("active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// ─── Donation Records ────────────────────────────────────────────
export const donationRecords = pgTable("donation_records", {
  id: serial("id").primaryKey(),
  donorName: varchar("donor_name", { length: 255 }),
  donorEmail: varchar("donor_email", { length: 255 }),
  amount: integer("amount").notNull(),
  currency: varchar("currency", { length: 10 }).default("USD"),
  type: varchar("type", { length: 50 }).default("one-off"),
  programmeId: integer("programme_id"),
  campaignId: integer("campaign_id"),
  paymentProvider: varchar("payment_provider", { length: 50 }),
  paymentStatus: varchar("payment_status", { length: 50 }).default("pending"),
  transactionId: varchar("transaction_id", { length: 255 }),
  message: text("message"),
  communicationConsent: boolean("communication_consent").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// ─── AI Knowledge Base ───────────────────────────────────────────
export const knowledgeBase = pgTable("knowledge_base", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  content: text("content").notNull(),
  sourcePage: varchar("source_page", { length: 255 }),
  sourceLabel: varchar("source_label", { length: 255 }),
  keywords: jsonb("keywords").$type<string[]>(),
  priority: integer("priority").default(5),
  active: boolean("active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ─── AI Conversation Memory ──────────────────────────────────────
export const conversationSummaries = pgTable("conversation_summaries", {
  id: serial("id").primaryKey(),
  sessionId: varchar("session_id", { length: 255 }).notNull(),
  summary: text("summary").notNull(),
  topicsDiscussed: jsonb("topics_discussed").$type<string[]>(),
  questionsAsked: jsonb("questions_asked").$type<string[]>(),
  messageCount: integer("message_count").default(0),
  lastActive: timestamp("last_active").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

// ─── Site Settings ───────────────────────────────────────────────
export const siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 255 }).notNull().unique(),
  value: text("value"),
  updatedAt: timestamp("updated_at").defaultNow(),
});
