// Single source of truth for all 8 services
// Drives: home services grid (uses `category` + `homeSlogan`),
//         /services hub grid (uses `no` + `name` + `slogan`),
//         /services/:slug pages (uses everything).
export const services = [
  {
    slug: 'website-and-tech',
    no: '01',
    category: '01 / WEBSITE & TECH',
    name: 'Website & Tech',
    homeSlogan: 'Be credible.',
    slogan: 'A site built to convert, not just exist.',
    homeBlurb: 'A site that loads fast, works everywhere and does one job well.',
    description:
      'Custom website design and development, landing pages built for a single goal, and the technical foundations — speed, tracking, hosting — that everything else depends on.',
    checklist: [
      'Custom website design and development',
      'High-conversion landing page builds',
      'Site speed and Core Web Vitals optimization',
      'Analytics, tracking and event setup',
      'Ongoing technical maintenance',
    ],
  },
  {
    slug: 'seo-and-local-presence',
    no: '02',
    category: '02 / SEO & LOCAL',
    name: 'SEO & Local Presence',
    homeSlogan: 'Be found.',
    slogan: 'Be the business people actually find.',
    homeBlurb: 'Show up when the right people are searching.',
    description:
      'On-page SEO, technical audits and local presence work so the business shows up when the right people are searching — not just eventually, but consistently.',
    checklist: [
      'On-page SEO optimization',
      'Technical SEO audit and fixes',
      'Google Business Profile management',
      'Local listings and citation building',
      'Keyword and content gap mapping',
    ],
  },
  {
    slug: 'paid-ads',
    no: '03',
    category: '03 / PAID ADS',
    name: 'Paid Ads',
    homeSlogan: 'Be chosen.',
    slogan: 'Spend that’s accountable to a number.',
    homeBlurb: 'Every rupee spent has a reason attached to it.',
    description:
      'Meta and Google campaigns built around one weekly decision metric, not vanity impressions — so every rupee spent has a reason attached to it.',
    checklist: [
      'Meta (Facebook & Instagram) ads management',
      'Google Search Ads management',
      'Audience and creative testing',
      'Landing page to ad-message match',
      'Weekly performance reviews',
    ],
  },
  {
    slug: 'social-and-content',
    no: '04',
    category: '04 / SOCIAL & CONTENT',
    name: 'Social & Content',
    homeSlogan: 'Stay connected.',
    slogan: 'Consistent presence, not sporadic posting.',
    homeBlurb: 'Content the audience actually keeps around for.',
    description:
      'A content system that keeps the brand visible and credible across the channels the audience actually uses, without needing a full internal content team.',
    checklist: [
      'Monthly content calendar and planning',
      'Short-form video and static creative',
      'Caption writing and posting cadence',
      'Platform-specific formatting',
      'Performance-informed iteration',
    ],
  },
  {
    slug: 'reviews-and-reputation',
    no: '05',
    category: '05 / REVIEWS',
    name: 'Reviews & Reputation',
    homeSlogan: 'Stay visible.',
    slogan: 'Let happy customers do the selling.',
    homeBlurb: 'Turn the customers you already have into a channel.',
    description:
      'Systems that make it easy for good customers to leave reviews and hard for a handful of bad experiences to define the brand’s reputation online.',
    checklist: [
      'Review generation workflows',
      'Google & third-party review monitoring',
      'Response templates and escalation paths',
      'Reputation recovery for flagged accounts',
      'Social proof capture for marketing use',
    ],
  },
  {
    slug: 'branding',
    no: '06',
    category: '06 / BRANDING',
    name: 'Branding',
    homeSlogan: 'Be trusted.',
    slogan: 'Look like the business you’re becoming.',
    homeBlurb: 'Visual identity and messaging that holds up.',
    description:
      'Visual identity and messaging that holds up as the business grows — so the brand stays recognisable, credible and consistent from the first ad to the tenth touchpoint.',
    checklist: [
      'Logo and visual identity systems',
      'Brand voice and messaging guidelines',
      'Marketing asset templates',
      'Social media visual identity',
      'Brand consistency audits',
    ],
  },
  {
    slug: 'conversion',
    no: '07',
    category: '07 / CONVERSION',
    name: 'Conversion',
    homeSlogan: 'Be recognized.',
    slogan: 'Turn traffic into decisions.',
    homeBlurb: 'Find where interested people drop off. Fix it.',
    description:
      'The unglamorous work of finding where interested people drop off, and fixing it — forms, funnels, offers and follow-up sequences included.',
    checklist: [
      'Conversion rate audits',
      'Funnel and form optimization',
      'Offer and pricing page structuring',
      'A/B testing on key decision pages',
      'Retention and loyalty touchpoints',
    ],
  },
  {
    slug: 'leads-crm-and-sales',
    no: '08',
    category: '08 / LEADS & CRM',
    name: 'Leads, CRM & Sales',
    homeSlogan: 'Be efficient.',
    slogan: 'Nothing falls through the cracks.',
    homeBlurb: 'Every inquiry gets timely, consistent follow-up.',
    description:
      'Lead management and CRM automation that make sure every inquiry gets a timely, consistent follow-up — plus WhatsApp flows and reporting that keep the whole system visible.',
    checklist: [
      'Lead management system setup',
      'CRM automation workflows',
      'WhatsApp follow-up sequences',
      'Sales pipeline structuring',
      'Monthly performance dashboards',
    ],
  },
];

export function getService(slug) {
  return services.find((s) => s.slug === slug);
}

export function getServiceNeighbors(slug) {
  const i = services.findIndex((s) => s.slug === slug);
  if (i === -1) return { prev: null, next: null };
  const prev = services[(i - 1 + services.length) % services.length];
  const next = services[(i + 1) % services.length];
  return { prev, next };
}
