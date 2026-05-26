/**
 * SITE DATA — Missless
 *
 * All content for the site lives here. Updating copy, links, or list items
 * happens in one place; components stay generic and just render what they
 * receive.
 *
 * Single-page site: all hrefs are anchor links to section IDs on the
 * homepage. When real product / industry / pricing pages exist, swap
 * the hrefs here for real paths — components do not change.
 */

// -------- ANCHOR IDS — used as href targets across the site --------
export const ANCHORS = {
  hero: '#hero',
  hearItInAction: '#hear-it-in-action',
  hiddenTax: '#hidden-tax',
  solution: '#solution',
  howItWorks: '#how-it-works',
  platform: '#platform',
  industries: '#industries',
  whyMissless: '#why-missless',
  pricing: '#pricing-onboarding',
  faq: '#faq',
  finalCta: '#final-cta',
};

// -------- NAVBAR — top-level nav items --------
export const navLinks = [
  { label: 'Products', type: 'mega', menuKey: 'products' },
  { label: 'Industries', type: 'mega', menuKey: 'industries' },
  { label: 'Pricing', type: 'link', href: ANCHORS.pricing },
  { label: 'About', type: 'link', href: '#' },
];

// -------- PRODUCTS MEGA MENU --------
export const productsMenu = [
  {
    id: 'receptionist',
    name: 'AI Receptionist',
    description: 'Answers every inbound call 24/7 with natural conversation.',
    href: ANCHORS.platform,
    icon: 'Phone',
  },
  {
    id: 'sales-agent',
    name: 'AI Sales Agent',
    description: 'Calls new leads in under 60 seconds and books consultations.',
    href: ANCHORS.platform,
    icon: 'Zap',
  },
  {
    id: 'messaging',
    name: 'AI Messaging',
    description: 'SMS, web chat, WhatsApp, and email in one intelligent system.',
    href: ANCHORS.platform,
    icon: 'MessageSquare',
  },
];

// -------- INDUSTRIES MEGA MENU --------
export const industriesMenu = [
  {
    id: 'home-services',
    name: 'Home Services',
    description: 'Win the job before a competitor calls back.',
    href: ANCHORS.industries,
    icon: 'Home',
  },
  {
    id: 'financial-services',
    name: 'Financial Services',
    description: 'Respond to qualified prospects the moment they raise their hand.',
    href: ANCHORS.industries,
    icon: 'Landmark',
  },
  {
    id: 'healthcare-dental',
    name: 'Healthcare & Dental',
    description: 'Handle patient inquiries without pulling staff from care.',
    href: ANCHORS.industries,
    icon: 'HeartPulse',
  },
  {
    id: 'real-estate',
    name: 'Real Estate',
    description: 'Buyer inquiries, tenant questions, and viewings around the clock.',
    href: ANCHORS.industries,
    icon: 'Building2',
  },
  {
    id: 'retail-ecommerce',
    name: 'Retail & E-commerce',
    description: 'Instant support and product help that recovers abandoned conversations.',
    href: ANCHORS.industries,
    icon: 'ShoppingCart',
  },
  {
    id: 'education-training',
    name: 'Education & Training',
    description: 'Enrollment questions, info requests, and consultation booking.',
    href: ANCHORS.industries,
    icon: 'GraduationCap',
  },
];

// -------- HERO --------
export const heroTrustRow = [
  { icon: 'Phone', label: 'Live in 5 to 7 days' },
  { icon: 'ShieldCheck', label: 'No long-term contracts' },
  { icon: 'Smartphone', label: 'Works with your current phone number' },
];

export const heroFloatingStats = [
  { id: 'avg-call', icon: 'Clock', value: '1m 47s', label: 'Average call to booking', tint: 'pink' },
  { id: 'inquiries', icon: 'Smile', value: '98%', label: 'Inquiries answered instantly', tint: 'purple' },
  { id: 'always-on', icon: 'Calendar', value: '24/7', label: 'Never sleeps. Never on hold.', tint: 'blue' },
];

export const heroTrustedBy = [
  { icon: 'Home', label: 'Home Services' },
  { icon: 'Heart', label: 'Healthcare' },
  { icon: 'Building2', label: 'Real Estate' },
  { icon: 'ShoppingBag', label: 'Retail' },
  { icon: 'Landmark', label: 'Financial Services' },
  { icon: 'GraduationCap', label: 'Education' },
];

// -------- HEAR IT IN ACTION --------
export const hearItIndustries = [
  { id: 'home-services', label: 'Home services', icon: 'Home' },
  { id: 'financial-services', label: 'Financial services', icon: 'Landmark' },
  { id: 'healthcare', label: 'Healthcare', icon: 'Heart' },
  { id: 'real-estate', label: 'Real estate', icon: 'Building2' },
  { id: 'retail', label: 'Retail', icon: 'ShoppingBag' },
  { id: 'education', label: 'Education', icon: 'GraduationCap' },
];

export const hearItTrustRow = [
  { icon: 'AudioLines', title: 'Real AI voice', description: 'Natural & human-like', tint: 'blue' },
  { icon: 'Zap', title: 'Under 2 minutes', description: 'From call to booking', tint: 'purple' },
  { icon: 'ShieldCheck', title: 'No setup required', description: 'Just press play', tint: 'pink' },
];

export const hearItStats = [
  { icon: 'Phone', value: '1m 47s', label: 'Average call to booking', tint: 'blue' },
  { icon: 'MessageSquare', value: '98%', label: 'Inquiries answered instantly', tint: 'purple' },
  { icon: 'Calendar', value: '24/7', label: 'Never sleeps. Never on hold.', tint: 'pink' },
];

// -------- HIDDEN TAX --------
export const hiddenTaxReasons = [
  {
    icon: 'Phone',
    title: 'Most businesses lose 20 to 40% of inbound leads',
    description: 'before a real conversation ever happens.',
  },
  {
    icon: 'FileText',
    title: 'Calls go to voicemail, job sites, meetings, or simply offline.',
    description:
      'Forms sit unread. Quote requests cool off. By the time someone follows up, the customer has already booked with whoever picked up first.',
  },
  {
    icon: 'Users',
    title: 'Hiring more staff is slow and expensive.',
    description:
      'Voicemail loses you the lead. Generic chatbots frustrate the people you actually want to win.',
  },
];

export const hiddenTaxDonutReasons = [
  { icon: 'Phone', title: 'Voicemail', description: 'No one to answer.', tint: 'blue' },
  { icon: 'Briefcase', title: 'On a job site', description: "Can't always answer.", tint: 'purple' },
  { icon: 'Users', title: 'In a meeting', description: 'Focused elsewhere.', tint: 'purple' },
  { icon: 'WifiOff', title: 'Offline', description: 'Out of coverage.', tint: 'pink' },
];

export const hiddenTaxOutcomes = [
  { icon: 'Zap', title: 'Faster response', description: 'Answer instantly, day or night.', tint: 'blue' },
  { icon: 'Target', title: 'More conversations', description: 'Capture every lead that calls.', tint: 'purple' },
  { icon: 'TrendingUp', title: 'More revenue', description: 'Turn more conversations into customers.', tint: 'pink' },
];

// -------- SOLUTION --------
export const solutionPillars = [
  { icon: 'Phone', label: 'No missed calls' },
  { icon: 'Target', label: 'No missed opportunities' },
  { icon: 'Send', label: 'No missed follow ups' },
];

// -------- HOW IT WORKS --------
// Section 5 inputs and outputs — each card is a navigational link.
// Inputs explain *how* Missless receives info → link to Platform (the products).
// Outputs explain *what* Missless produces → link to Why Missless (the outcomes).
export const howItWorksInputs = [
  { icon: 'Phone', label: 'Incoming Call', tint: 'blue', href: ANCHORS.platform },
  { icon: 'Globe', label: 'Website / Web Form', tint: 'blue', href: ANCHORS.platform },
  { icon: 'MessageSquare', label: 'SMS / Text Inquiry', tint: 'purple', href: ANCHORS.platform },
  { icon: 'Store', label: 'Google Listing', tint: 'pink', href: ANCHORS.platform },
];

export const howItWorksOutputs = [
  { icon: 'CalendarCheck', title: 'Booked Appointment', description: 'Synced to Calendar', tint: 'pink', href: ANCHORS.whyMissless },
  { icon: 'UserCheck', title: 'Qualified Lead', description: 'Captured & Organized', tint: 'purple', href: ANCHORS.whyMissless },
  { icon: 'Database', title: 'CRM Updated', description: 'All Info, Instantly', tint: 'blue', href: ANCHORS.whyMissless },
  { icon: 'Send', title: 'Follow Up Sent', description: 'SMS / Email / Reminders', tint: 'purple', href: ANCHORS.whyMissless },
];

// -------- PLATFORM (3 product cards) --------
export const platformProducts = [
  {
    id: 'receptionist',
    icon: 'Phone',
    title: 'AI Receptionist',
    description:
      'Answers inbound calls 24/7 with natural conversation, smart transfers, and zero hold time. Built to sound like the best person on your team.',
    linkText: 'Explore AI Receptionist',
    href: '#',
    accent: 'blue',
  },
  {
    id: 'sales-agent',
    icon: 'Zap',
    title: 'AI Sales Agent',
    description:
      'Calls and messages new leads in under 60 seconds. Qualifies, handles objections, and books consultations while interest is still hot.',
    linkText: 'Explore AI Sales Agent',
    href: '#',
    accent: 'purple',
  },
  {
    id: 'messaging',
    icon: 'MessageSquare',
    title: 'AI Messaging',
    description:
      'SMS, web chat, WhatsApp, and email handled by one intelligent system that keeps every conversation moving forward.',
    linkText: 'Explore AI Messaging',
    href: '#',
    accent: 'pink',
  },
];

// -------- INDUSTRIES --------
export const industries = [
  {
    id: 'home-services',
    icon: 'Home',
    title: 'Home services',
    description:
      'HVAC, plumbing, electrical, roofing, cleaning, and landscaping teams that need to win the job before a competitor calls back.',
    href: '#',
    accent: 'blue',
  },
  {
    id: 'financial-services',
    icon: 'Landmark',
    title: 'Financial services',
    description:
      'Advisors, brokers, insurance agents, and wealth managers who respond to qualified prospects the moment they raise their hand.',
    href: '#',
    accent: 'purple',
  },
  {
    id: 'healthcare-dental',
    icon: 'HeartPulse',
    title: 'Healthcare and dental',
    description:
      'Practices handling patient inquiries, scheduling, and reminders without pulling staff away from patient care.',
    href: '#',
    accent: 'orange',
  },
  {
    id: 'real-estate',
    icon: 'Building2',
    title: 'Real estate',
    description:
      'Agents and property managers handling buyer inquiries, tenant questions, and viewings around the clock.',
    href: '#',
    accent: 'green',
  },
  {
    id: 'retail-ecommerce',
    icon: 'ShoppingCart',
    title: 'Retail and e-commerce',
    description:
      'Brands offering instant support, order help, and product guidance to recover abandoned conversations.',
    href: '#',
    accent: 'pink',
  },
  {
    id: 'education-training',
    icon: 'GraduationCap',
    title: 'Education and training',
    description:
      'Schools and programs handling enrollment questions, info requests, and consultation booking.',
    href: '#',
    accent: 'purple',
  },
];

// -------- WHY MISSLESS --------
export const whyMisslessBenefits = [
  {
    id: 'real-conversations',
    icon: 'MessageCircle',
    title: 'Real conversations, not scripts',
    description:
      'Missless adapts to how your customers actually talk, including accents, interruptions, and follow-up questions a typical chatbot would fumble.',
    accent: 'blue',
  },
  {
    id: 'trained-business',
    icon: 'GraduationCap',
    title: 'Trained on your business',
    description:
      'Your services, your pricing, your booking rules, your tone. Missless sounds like part of your team because it learns like one.',
    accent: 'purple',
  },
  {
    id: 'works-stack',
    icon: 'Puzzle',
    title: 'Works with your stack',
    description:
      'CRMs, calendars, phone systems, and marketing tools. If you already use it, Missless almost certainly already connects to it.',
    accent: 'pink',
  },
  {
    id: 'in-control',
    icon: 'ShieldCheck',
    title: 'You stay in control',
    description:
      'Approve every script, set business hours, define escalation rules, and review every conversation. Nothing happens without your sign-off.',
    accent: 'green',
  },
  {
    id: 'built-to-convert',
    icon: 'Users',
    title: 'Built to convert, not just respond',
    description:
      'Missless qualifies leads, handles objections, and books appointments while your team focuses on closing real opportunities.',
    accent: 'orange',
  },
  {
    id: 'better-results',
    icon: 'TrendingUp',
    title: 'Better conversations. Better results.',
    description:
      'More qualified leads, more booked appointments, and more revenue — without adding headcount.',
    accent: 'purple',
  },
];

// -------- ONBOARDING --------
export const onboardingSteps = [
  { number: 1, title: 'Connect', description: 'Securely link your phone, calendar, CRM, and messaging tools.', color: 'blue' },
  { number: 2, title: 'Configure', description: 'We build your conversation flows, scripts, and routing rules with you.', color: 'purple' },
  { number: 3, title: 'Launch', description: 'Go live, monitor performance, and refine continuously in real time.', color: 'pink' },
];

// -------- FAQ --------
export const faqs = [
  { id: 'sound-like-robot', question: 'Does Missless sound like a robot?', answer: 'No. The voices are natural, context-aware, and trained on real conversations. Most callers cannot tell they are speaking with AI, and the ones who can usually do not mind because they are getting answers immediately.' },
  { id: 'transfer-to-person', question: 'Can Missless transfer calls to a real person?', answer: 'Yes. You define exactly when and how. Missless can hand off a call mid-conversation with a full summary, so your team picks up exactly where the AI left off.' },
  { id: 'after-hours', question: 'What happens after hours, on weekends, or on holidays?', answer: 'Missless answers, qualifies, books, and follows up around the clock. You can set different behaviors for evenings, weekends, and holidays.' },
  { id: 'existing-number', question: 'Will Missless work with my existing phone number?', answer: 'Yes. You can keep your current number and route calls through Missless, or use a new dedicated line.' },
  { id: 'setup-time', question: 'How long does setup take?', answer: 'Most businesses go live in 5 to 7 business days. Larger multi-location setups may take a bit longer.' },
  { id: 'data-secure', question: 'Is my customer data secure?', answer: 'Yes. Calls, transcripts, and customer data are encrypted in transit and at rest. Missless follows industry-standard practices for storage, access control, and retention.' },
  { id: 'cancel-anytime', question: 'Can I cancel anytime?', answer: 'Yes. There are no long-term contracts. If Missless is not working for you, you are not locked in.' },
  { id: 'replace-team', question: 'Does Missless replace my team?', answer: 'No. Missless handles the first response, qualification, and booking. Your team focuses on the conversations and work that actually close revenue.' },
];

// -------- FINAL CTA --------
export const finalCtaTrust = [
  { icon: 'Check', label: 'No setup fees' },
  { icon: 'Zap', label: 'Live in 5 to 7 days' },
  { icon: 'X', label: 'Cancel anytime' },
  { icon: 'Shield', label: 'Your data stays yours' },
];

// -------- FOOTER --------
export const footerColumns = [
  {
    heading: 'Product',
    links: [
      { label: 'AI Receptionist', href: ANCHORS.platform },
      { label: 'AI Sales Agent', href: ANCHORS.platform },
      { label: 'AI Messaging', href: ANCHORS.platform },
    ],
  },
  {
    heading: 'Solutions',
    links: [
      { label: 'Home Services', href: ANCHORS.industries },
      { label: 'Financial Services', href: ANCHORS.industries },
      { label: 'Healthcare and Dental', href: ANCHORS.industries },
      { label: 'Real Estate', href: ANCHORS.industries },
      { label: 'Retail and E-commerce', href: ANCHORS.industries },
      { label: 'Education and Training', href: ANCHORS.industries },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Pricing', href: ANCHORS.pricing },
      { label: 'Security', href: '#' },
      { label: 'Help Center', href: '#' },
      { label: 'Blog', href: '#' },
    ],
  },
];

export const footerLegalLinks = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Cookie Policy', href: '#' },
  { label: 'DPA', href: '#' },
];

export const siteMeta = {
  name: 'Missless',
  tagline: 'The AI front office that never misses a lead.',
  url: 'https://missless.com',
  copyrightYear: new Date().getFullYear(),
  bookDemoHref: "/book-a-demo",
  contactHref: '#',
};
