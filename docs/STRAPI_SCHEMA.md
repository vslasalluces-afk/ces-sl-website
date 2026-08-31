# CES Strapi CMS Schema Documentation

This document defines the complete Strapi content model for the CES website. When setting up Strapi, create these collection types and single types as specified.

## Collection Types (20+)

### 1. Staff
```javascript
{
  slug: { type: 'uid', targetField: 'fullName' },
  fullName: { type: 'string', required: true },
  jobTitle: { type: 'string', required: true },
  department: { type: 'relation', relation: 'manyToOne', target: 'api::department.department' },
  location: { type: 'string' },
  shortBio: { type: 'text' },
  fullBio: { type: 'richtext' },
  education: { type: 'json' }, // Array of education entries
  experience: { type: 'json' }, // Array of { role, org, period }
  expertise: { type: 'json' }, // Array of strings
  quote: { type: 'text' },
  profileImage: { type: 'media', allowedTypes: ['images'] },
  gallery: { type: 'media', allowedTypes: ['images'], multiple: true },
  email: { type: 'email' },
  phone: { type: 'string' },
  publicContactApproved: { type: 'boolean', default: false },
  socialLinks: { type: 'json' }, // { facebook, twitter, linkedin }
  relatedProgrammes: { type: 'relation', relation: 'manyToMany', target: 'api::programme.programme' },
  relatedProjects: { type: 'relation', relation: 'manyToMany', target: 'api::project.project' },
  relatedArticles: { type: 'relation', relation: 'oneToMany', target: 'api::article.article' },
  displayOrder: { type: 'integer', default: 0 },
  featured: { type: 'boolean', default: false },
  active: { type: 'boolean', default: true },
  seoTitle: { type: 'string' },
  seoDescription: { type: 'text' }
}
```

### 2. Departments
```javascript
{
  name: { type: 'string', required: true },
  slug: { type: 'uid', targetField: 'name' },
  description: { type: 'text' },
  head: { type: 'relation', relation: 'oneToOne', target: 'api::staff.staff' },
  staff: { type: 'relation', relation: 'oneToMany', target: 'api::staff.staff' }
}
```

### 3. Programme Categories
```javascript
{
  name: { type: 'string', required: true },
  slug: { type: 'uid', targetField: 'name' },
  description: { type: 'text' },
  icon: { type: 'string' }, // Icon name from icon library
  color: { type: 'string' }, // Hex color code
  programmes: { type: 'relation', relation: 'oneToMany', target: 'api::programme.programme' },
  displayOrder: { type: 'integer', default: 0 }
}
```

### 4. Programmes
```javascript
{
  title: { type: 'string', required: true },
  slug: { type: 'uid', targetField: 'title' },
  category: { type: 'relation', relation: 'manyToOne', target: 'api::programme-category.programme-category' },
  shortDescription: { type: 'text' },
  fullDescription: { type: 'richtext' },
  status: { type: 'enumeration', enum: ['current', 'completed', 'planned', 'archived'], default: 'current' },
  objectives: { type: 'json' }, // Array of strings
  activities: { type: 'json' }, // Array of strings
  beneficiaryGroups: { type: 'json' }, // Array of strings
  areasOfOperation: { type: 'json' }, // Array of district names
  timeline: { type: 'text' },
  partners: { type: 'relation', relation: 'manyToMany', target: 'api::partner.partner' },
  staff: { type: 'relation', relation: 'manyToMany', target: 'api::staff.staff' },
  projects: { type: 'relation', relation: 'oneToMany', target: 'api::project.project' },
  stories: { type: 'relation', relation: 'oneToMany', target: 'api::impact-story.impact-story' },
  featuredImage: { type: 'media', allowedTypes: ['images'] },
  gallery: { type: 'media', allowedTypes: ['images'], multiple: true },
  documents: { type: 'media', allowedTypes: ['files'], multiple: true },
  donationEnabled: { type: 'boolean', default: false },
  featured: { type: 'boolean', default: false },
  seoTitle: { type: 'string' },
  seoDescription: { type: 'text' }
}
```

### 5. Projects
```javascript
{
  title: { type: 'string', required: true },
  slug: { type: 'uid', targetField: 'title' },
  summary: { type: 'text' },
  description: { type: 'richtext' },
  programme: { type: 'relation', relation: 'manyToOne', target: 'api::programme.programme' },
  status: { type: 'enumeration', enum: ['active', 'completed', 'planned'], default: 'active' },
  location: { type: 'string' },
  startDate: { type: 'date' },
  endDate: { type: 'date' },
  objectives: { type: 'json' },
  activities: { type: 'json' },
  partners: { type: 'relation', relation: 'manyToMany', target: 'api::partner.partner' },
  staff: { type: 'relation', relation: 'manyToMany', target: 'api::staff.staff' },
  stories: { type: 'relation', relation: 'oneToMany', target: 'api::impact-story.impact-story' },
  reports: { type: 'relation', relation: 'manyToMany', target: 'api::resource.resource' },
  featuredImage: { type: 'media', allowedTypes: ['images'] },
  gallery: { type: 'media', allowedTypes: ['images'], multiple: true },
  impactEvidence: { type: 'richtext' },
  donationEnabled: { type: 'boolean', default: false }
}
```

### 6. Impact Stories
```javascript
{
  title: { type: 'string', required: true },
  slug: { type: 'uid', targetField: 'title' },
  summary: { type: 'text' },
  communityContext: { type: 'richtext' },
  cesResponse: { type: 'richtext' },
  whatChanged: { type: 'richtext' },
  quote: { type: 'text' },
  quoteAttribution: { type: 'string' },
  programme: { type: 'relation', relation: 'manyToOne', target: 'api::programme.programme' },
  project: { type: 'relation', relation: 'manyToOne', target: 'api::project.project' },
  location: { type: 'string' },
  featuredImage: { type: 'media', allowedTypes: ['images'] },
  gallery: { type: 'media', allowedTypes: ['images'], multiple: true },
  videoUrl: { type: 'string' },
  consentObtained: { type: 'boolean', default: false },
  consentNotes: { type: 'text', private: true },
  published: { type: 'boolean', default: false },
  publishedAt: { type: 'datetime' },
  featured: { type: 'boolean', default: false },
  seoTitle: { type: 'string' },
  seoDescription: { type: 'text' }
}
```

### 7. News Articles
```javascript
{
  title: { type: 'string', required: true },
  slug: { type: 'uid', targetField: 'title' },
  summary: { type: 'text' },
  content: { type: 'richtext' },
  category: { type: 'enumeration', enum: ['programme-update', 'announcement', 'community-story', 'partnership', 'event', 'insight'] },
  author: { type: 'relation', relation: 'manyToOne', target: 'api::staff.staff' },
  featuredImage: { type: 'media', allowedTypes: ['images'] },
  tags: { type: 'json' }, // Array of tag strings
  relatedProgrammes: { type: 'relation', relation: 'manyToMany', target: 'api::programme.programme' },
  published: { type: 'boolean', default: false },
  publishedAt: { type: 'datetime' },
  scheduledPublishAt: { type: 'datetime' },
  seoTitle: { type: 'string' },
  seoDescription: { type: 'text' }
}
```

### 8. Publications / Resources
```javascript
{
  title: { type: 'string', required: true },
  slug: { type: 'uid', targetField: 'title' },
  documentType: { type: 'enumeration', enum: ['annual-report', 'strategic-plan', 'policy', 'programme-report', 'financial-report', 'research', 'guide', 'other'] },
  summary: { type: 'text' },
  file: { type: 'media', allowedTypes: ['files'] },
  fileSize: { type: 'string' },
  language: { type: 'enumeration', enum: ['en', 'fr', 'es', 'de', 'zh'], default: 'en' },
  publishedDate: { type: 'date' },
  author: { type: 'relation', relation: 'manyToOne', target: 'api::staff.staff' },
  relatedProgrammes: { type: 'relation', relation: 'manyToMany', target: 'api::programme.programme' },
  tags: { type: 'json' },
  downloadCount: { type: 'integer', default: 0 },
  published: { type: 'boolean', default: true }
}
```

### 9. Partners
```javascript
{
  name: { type: 'string', required: true },
  slug: { type: 'uid', targetField: 'name' },
  type: { type: 'enumeration', enum: ['church', 'ngo', 'foundation', 'government', 'corporate', 'academic', 'other'] },
  description: { type: 'text' },
  logo: { type: 'media', allowedTypes: ['images'] },
  website: { type: 'string' },
  programmes: { type: 'relation', relation: 'manyToMany', target: 'api::programme.programme' },
  projects: { type: 'relation', relation: 'manyToMany', target: 'api::project.project' },
  featured: { type: 'boolean', default: false },
  displayOrder: { type: 'integer', default: 0 },
  publiclyVisible: { type: 'boolean', default: true }
}
```

### 10. Events
```javascript
{
  title: { type: 'string', required: true },
  slug: { type: 'uid', targetField: 'title' },
  description: { type: 'richtext' },
  eventDate: { type: 'date', required: true },
  endDate: { type: 'date' },
  time: { type: 'string' },
  venue: { type: 'string' },
  isOnline: { type: 'boolean', default: false },
  onlineUrl: { type: 'string' },
  featuredImage: { type: 'media', allowedTypes: ['images'] },
  programme: { type: 'relation', relation: 'manyToOne', target: 'api::programme.programme' },
  registrationRequired: { type: 'boolean', default: false },
  registrationUrl: { type: 'string' },
  maxAttendees: { type: 'integer' },
  status: { type: 'enumeration', enum: ['upcoming', 'ongoing', 'completed', 'cancelled'], default: 'upcoming' },
  published: { type: 'boolean', default: true }
}
```

### 11. Campaigns
```javascript
{
  title: { type: 'string', required: true },
  slug: { type: 'uid', targetField: 'title' },
  narrative: { type: 'richtext' },
  targetAmount: { type: 'integer' }, // In cents
  raisedAmount: { type: 'integer', default: 0 },
  currency: { type: 'enumeration', enum: ['USD', 'GBP', 'EUR', 'SLE'], default: 'USD' },
  deadline: { type: 'date' },
  status: { type: 'enumeration', enum: ['draft', 'published', 'paused', 'completed'], default: 'draft' },
  featuredImage: { type: 'media', allowedTypes: ['images'] },
  gallery: { type: 'media', allowedTypes: ['images'], multiple: true },
  programme: { type: 'relation', relation: 'manyToOne', target: 'api::programme.programme' },
  updates: { type: 'component', repeatable: true, component: 'campaign.update' },
  published: { type: 'boolean', default: false }
}
```

### 12. Gallery Albums
```javascript
{
  title: { type: 'string', required: true },
  slug: { type: 'uid', targetField: 'title' },
  description: { type: 'text' },
  coverImage: { type: 'media', allowedTypes: ['images'] },
  category: { type: 'enumeration', enum: ['community-engagement', 'training-activities', 'field-work', 'staff-activities', 'partner-activities'] },
  programme: { type: 'relation', relation: 'manyToOne', target: 'api::programme.programme' },
  images: { type: 'relation', relation: 'oneToMany', target: 'api::gallery-image.gallery-image' },
  published: { type: 'boolean', default: true }
}
```

### 13. Gallery Images
```javascript
{
  image: { type: 'media', allowedTypes: ['images'], required: true },
  caption: { type: 'text' },
  altText: { type: 'string' },
  category: { type: 'enumeration', enum: ['community-engagement', 'training-activities', 'field-work', 'staff-activities', 'partner-activities'] },
  programme: { type: 'relation', relation: 'manyToOne', target: 'api::programme.programme' },
  location: { type: 'string' },
  dateTaken: { type: 'date' },
  credit: { type: 'string' },
  sourceUrl: { type: 'string' },
  consentStatus: { type: 'enumeration', enum: ['pending', 'approved', 'restricted'], default: 'pending' },
  consentNotes: { type: 'text', private: true },
  displayOrder: { type: 'integer', default: 0 },
  published: { type: 'boolean', default: true }
}
```

### 14. Videos
```javascript
{
  title: { type: 'string', required: true },
  description: { type: 'text' },
  videoUrl: { type: 'string', required: true }, // YouTube/Vimeo URL
  thumbnail: { type: 'media', allowedTypes: ['images'] },
  duration: { type: 'string' },
  category: { type: 'enumeration', enum: ['programme', 'story', 'event', 'promotional'] },
  programme: { type: 'relation', relation: 'manyToOne', target: 'api::programme.programme' },
  transcript: { type: 'richtext' },
  hasSubtitles: { type: 'boolean', default: false },
  subtitleLanguages: { type: 'json' },
  published: { type: 'boolean', default: true }
}
```

### 15. Testimonials
```javascript
{
  quote: { type: 'text', required: true },
  attribution: { type: 'string', required: true },
  role: { type: 'string' },
  location: { type: 'string' },
  photo: { type: 'media', allowedTypes: ['images'] },
  programme: { type: 'relation', relation: 'manyToOne', target: 'api::programme.programme' },
  consentObtained: { type: 'boolean', default: false },
  featured: { type: 'boolean', default: false },
  displayOrder: { type: 'integer', default: 0 },
  published: { type: 'boolean', default: true }
}
```

### 16-20. Form Submissions (Contact, Volunteer, Partnership, Newsletter, Donations)
These are stored in the Next.js PostgreSQL database, not Strapi, for security and performance.

## Single Types

### Homepage Content
```javascript
{
  heroTitle: { type: 'string' },
  heroSubtitle: { type: 'text' },
  heroImage: { type: 'media', allowedTypes: ['images'] },
  heroVideo: { type: 'media', allowedTypes: ['videos'] },
  featuredProgrammes: { type: 'relation', relation: 'oneToMany', target: 'api::programme.programme' },
  featuredStories: { type: 'relation', relation: 'oneToMany', target: 'api::impact-story.impact-story' },
  featuredCampaign: { type: 'relation', relation: 'oneToOne', target: 'api::campaign.campaign' },
  showImpactCounters: { type: 'boolean', default: false },
  impactCounters: { type: 'component', repeatable: true, component: 'homepage.counter' }
}
```

### Site Settings
```javascript
{
  siteName: { type: 'string', default: 'CES SL' },
  tagline: { type: 'string' },
  logo: { type: 'media', allowedTypes: ['images'] },
  favicon: { type: 'media', allowedTypes: ['images'] },
  contactEmail: { type: 'email' },
  contactPhone: { type: 'string' },
  contactWhatsApp: { type: 'string' },
  address: { type: 'text' },
  socialLinks: { type: 'json' },
  googleAnalyticsId: { type: 'string' },
  maintenanceMode: { type: 'boolean', default: false },
  maintenanceMessage: { type: 'text' }
}
```

### AI Knowledge Sources
```javascript
{
  sources: { type: 'component', repeatable: true, component: 'ai.knowledge-source' },
  systemPrompt: { type: 'text' },
  safetyGuidelines: { type: 'text' },
  lastUpdated: { type: 'datetime' }
}
```

## Components

### campaign.update
```javascript
{
  date: { type: 'date' },
  title: { type: 'string' },
  content: { type: 'richtext' },
  image: { type: 'media', allowedTypes: ['images'] }
}
```

### homepage.counter
```javascript
{
  label: { type: 'string' },
  value: { type: 'integer' },
  suffix: { type: 'string' },
  verified: { type: 'boolean', default: false },
  source: { type: 'string' }
}
```

### ai.knowledge-source
```javascript
{
  title: { type: 'string' },
  content: { type: 'richtext' },
  category: { type: 'string' },
  priority: { type: 'integer', default: 1 },
  active: { type: 'boolean', default: true }
}
```

## User Roles

### 1. Super Administrator
- Full access to all content and settings
- User management
- Plugin configuration

### 2. Content Editor
- Create, edit, publish articles, stories, events
- Manage gallery images
- Cannot delete published content

### 3. Programme Editor
- Manage programme and project content
- Edit related stories and resources
- Cannot modify site settings

### 4. Fundraising Administrator
- Manage campaigns
- View donation records
- Access fundraising reports

### 5. Volunteer & Partnership Reviewer
- View and process enquiries
- Update enquiry status
- Cannot access financial data

### 6. Translator & Reviewer
- Edit translations
- Cannot publish without review
- Access translation workflow

## Webhooks & Integration

Configure webhooks to sync with Next.js:
- `entry.create` → Rebuild affected pages
- `entry.update` → Rebuild affected pages
- `entry.delete` → Purge cache
- `media.create` → Process and optimize images

## Audit Logging

Enable audit logs for:
- Content publishing
- User role changes
- Media uploads
- Settings modifications
- Translation approvals
