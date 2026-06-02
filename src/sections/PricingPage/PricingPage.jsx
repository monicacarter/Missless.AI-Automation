import { useState } from 'react';
import {
  Tag,
  Sparkles,
  Puzzle,
  TrendingUp,
  AudioLines,
  Database,
  MessageCircle,
  FileText,
  Rocket,
  Shield,
  Clock,
  Headphones,
  Building2,
  Plus,
  Minus,
  Zap,
} from 'lucide-react';
import Button from '../../components/Button/index.js';
import { siteMeta } from '../../data/siteData.js';
import { cn } from '../../utils/helpers.js';
import styles from './PricingPage.module.css';

/* ---------- Investment factors ---------- */
const factors = [
  {
    id: 'volume',
    icon: AudioLines,
    tint: 'blue',
    title: 'Call & message volume',
    description:
      'How many inbound calls, web chats, SMS conversations, and emails your front office handles each month — and how that volume flexes across seasons.',
  },
  {
    id: 'workflow',
    icon: Puzzle,
    tint: 'purple',
    title: 'Workflow complexity',
    description:
      'How many handoffs, qualification rules, booking flows, and edge cases the system has to run — from a single intake form to multi-step routing across teams.',
  },
  {
    id: 'integrations',
    icon: Database,
    tint: 'pink',
    title: 'Integrations required',
    description:
      'Which CRM, calendar, helpdesk, payment, and back-office tools Missless plugs into — and how deep the two-way sync needs to go.',
  },
  {
    id: 'training',
    icon: Sparkles,
    tint: 'yellow',
    title: 'Custom AI training',
    description:
      'How much brand voice, industry vocabulary, objection handling, and scripted scenarios your AI needs to learn before it goes live.',
  },
];

/* ---------- Process steps ---------- */
const processSteps = [
  {
    id: 'discover',
    icon: MessageCircle,
    title: 'Discover',
    description:
      "A 15-minute call. You walk us through how your front office runs today, and we map what's automatable and what isn't.",
  },
  {
    id: 'scope',
    icon: FileText,
    title: 'Scope',
    description:
      'Within 48 hours: a tailored proposal with scope, timeline, integrations, and a clear investment number. No surprise line items.',
  },
  {
    id: 'launch',
    icon: Rocket,
    title: 'Launch',
    description:
      'Live in 5 to 7 business days. Hands-on onboarding, weekly transcript reviews, and ongoing tuning as your business grows.',
  },
];

/* ---------- Included in every engagement ---------- */
const includedEverywhere = [
  { icon: Shield, label: 'Encrypted in transit and at rest' },
  { icon: Clock, label: 'Live in 5 to 7 business days' },
  { icon: Headphones, label: 'Real human support — no chatbots' },
  { icon: Zap, label: 'Instant call + lead response' },
  { icon: Building2, label: 'Keep your existing phone number' },
  { icon: Sparkles, label: 'Ongoing transcript review + tuning' },
];

/* ---------- Pricing-specific FAQs (no numbers, no plans) ---------- */
const pricingFaqs = [
  {
    id: 'how-priced',
    question: 'How is Missless priced?',
    answer:
      'On call and message volume, workflow complexity, integrations, and custom AI training — not per seat and not per user. You only pay for what your front office actually needs. Add a teammate, add ten, the cost does not change.',
  },
  {
    id: 'no-fixed-plans',
    question: "Why don't you publish fixed plans?",
    answer:
      'Because no two front offices look the same. A six-person home-services operation needs something fundamentally different from a multi-location dental group. Fixed plans would mean overcharging the small or under-delivering for the large. Custom scoping keeps both fair.',
  },
  {
    id: 'no-hidden-fees',
    question: 'Are there setup fees or hidden costs?',
    answer:
      'No. Every line item is in the proposal. If something needs to change after launch — bigger volume, new integration, new workflow — we re-scope openly. No surprise bills, no "while we have you" upcharges.',
  },
  {
    id: 'outgrow',
    question: 'What happens when I outgrow my setup?',
    answer:
      'Missless scales with you. We re-scope and adjust as your call volume, channels, or integrations grow — no platform rebuild, no contract renegotiated under pressure.',
  },
  {
    id: 'pilot',
    question: 'Can I try Missless before committing?',
    answer:
      'Yes. Most teams start with a guided pilot on real call traffic. If the numbers do not move, you do not move forward. No pressure.',
  },
  {
    id: 'cancel',
    question: 'Can I cancel anytime?',
    answer:
      'Yes. We do not lock customers in with long-term contracts. If Missless is not pulling its weight, you should not be paying for it.',
  },
];

/* =========================================================================
   PricingPage
   ========================================================================= */
export default function PricingPage() {
  const [openId, setOpenId] = useState(pricingFaqs[0].id);

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className={styles.hero} aria-labelledby="pricing-hero-heading">
        <div className={styles.heroBg} aria-hidden="true" />
        <div className={styles.container}>
          <div className={styles.heroInner}>
            <span className={styles.eyebrow}>
              <span className={styles.eyebrowTile} aria-hidden="true">
                <Tag size={14} strokeWidth={2.25} />
              </span>
              Pricing
            </span>

            <h1 id="pricing-hero-heading" className={styles.heroHeadline}>
              Custom pricing built around{' '}
              <em className={`text-gradient ${styles.italic}`}>
                your front office.
              </em>
            </h1>

            <p className={styles.heroSubcopy}>
              Missless delivers a fully customized AI automation system designed
              around how you sell, schedule, and serve your customers.
            </p>

            <div className={styles.heroCtaRow}>
              <Button
                href={siteMeta.bookDemoHref}
                variant="primary"
                size="lg"
                showArrow
              >
                Book a Demo
              </Button>
            </div>

            <div className={styles.heroTrust}>
              <span className={styles.trustItem}>
                <span
                  className={cn(styles.trustIcon, styles['tint--blue'])}
                  aria-hidden="true"
                >
                  <Sparkles size={14} strokeWidth={2.5} />
                </span>
                Simple
              </span>
              <span className={styles.trustItem}>
                <span
                  className={cn(styles.trustIcon, styles['tint--purple'])}
                  aria-hidden="true"
                >
                  <Puzzle size={14} strokeWidth={2.5} />
                </span>
                Flexible
              </span>
              <span className={styles.trustItem}>
                <span
                  className={cn(styles.trustIcon, styles['tint--pink'])}
                  aria-hidden="true"
                >
                  <TrendingUp size={14} strokeWidth={2.5} />
                </span>
                Scalable
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- INVESTMENT FACTORS ---------- */}
      <section
        className={styles.factorsSection}
        aria-labelledby="pricing-factors-heading"
      >
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <span className={styles.badge}>What shapes your investment</span>
            <h2
              id="pricing-factors-heading"
              className={styles.sectionHeadline}
            >
              Your investment depends on{' '}
              <em className={`text-gradient ${styles.italic}`}>
                four things.
              </em>
            </h2>
            <p className={styles.sectionSubcopy}>
              Every Missless engagement is scoped to your front office. Here is
              what we look at when we put together your proposal.
            </p>
          </header>

          <div className={styles.factorGrid}>
            {factors.map(({ id, icon: Icon, tint, title, description }) => (
              <article key={id} className={styles.factorCard}>
                <span
                  className={cn(styles.factorIcon, styles[`tint--${tint}`])}
                  aria-hidden="true"
                >
                  <Icon size={22} strokeWidth={2.25} />
                </span>
                <h3 className={styles.factorTitle}>{title}</h3>
                <p className={styles.factorDesc}>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- PROCESS ---------- */}
      <section
        className={styles.processSection}
        aria-labelledby="pricing-process-heading"
      >
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <span className={styles.badge}>How we build your quote</span>
            <h2
              id="pricing-process-heading"
              className={styles.sectionHeadline}
            >
              From first call to live{' '}
              <em className={`text-gradient ${styles.italic}`}>
                in days, not quarters.
              </em>
            </h2>
          </header>

          <ol className={styles.processGrid}>
            {processSteps.map(({ id, icon: Icon, title, description }, i) => (
              <li key={id} className={styles.processStep}>
                <div className={styles.processStepHead}>
                  <span className={styles.processNumber}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className={styles.processIcon} aria-hidden="true">
                    <Icon size={20} strokeWidth={2.25} />
                  </span>
                </div>
                <h3 className={styles.processTitle}>{title}</h3>
                <p className={styles.processDesc}>{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- INCLUDED IN EVERY ENGAGEMENT ---------- */}
      <section
        className={styles.includedSection}
        aria-labelledby="pricing-included-heading"
      >
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <span className={styles.badge}>Included in every engagement</span>
            <h2
              id="pricing-included-heading"
              className={styles.sectionHeadline}
            >
              The basics aren't optional.{' '}
              <em className={`text-gradient ${styles.italic}`}>
                They're included.
              </em>
            </h2>
            <p className={styles.sectionSubcopy}>
              Whatever the shape of your engagement, every Missless deployment
              ships with the foundations you'd expect from a real platform.
            </p>
          </header>

          <ul className={styles.includedGrid}>
            {includedEverywhere.map(({ icon: Icon, label }) => (
              <li key={label} className={styles.includedItem}>
                <span className={styles.includedIcon} aria-hidden="true">
                  <Icon size={18} strokeWidth={2.25} />
                </span>
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- PRICING FAQ ---------- */}
      <section
        className={styles.faqSection}
        aria-labelledby="pricing-faq-heading"
      >
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <span className={styles.badge}>Pricing FAQ</span>
            <h2 id="pricing-faq-heading" className={styles.sectionHeadline}>
              Questions about pricing,{' '}
              <em className={`text-gradient ${styles.italic}`}>
                answered honestly.
              </em>
            </h2>
          </header>

          <div className={styles.faqList}>
            {pricingFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <article
                  key={faq.id}
                  className={cn(styles.faqItem, isOpen && styles.faqItemOpen)}
                >
                  <button
                    type="button"
                    className={styles.faqQuestion}
                    aria-expanded={isOpen}
                    aria-controls={`pricing-faq-${faq.id}`}
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                  >
                    <span>{faq.question}</span>
                    <span className={styles.faqToggle} aria-hidden="true">
                      {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                    </span>
                  </button>
                  {isOpen && (
                    <div
                      id={`pricing-faq-${faq.id}`}
                      className={styles.faqAnswer}
                    >
                      {faq.answer}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- FINAL CTA ---------- */}
      <section
        className={styles.ctaSection}
        aria-labelledby="pricing-cta-heading"
      >
        <div className={styles.container}>
          <div className={styles.ctaCard}>
            <span className={styles.ctaBadge}>
              <Rocket size={12} strokeWidth={2.5} /> Ready when you are
            </span>
            <h2 id="pricing-cta-heading" className={styles.ctaHeadline}>
              Let's scope what Missless looks like{' '}
              <em className="text-gradient-purple-pink">for your business.</em>
            </h2>
            <p className={styles.ctaCopy}>
              Book a 15-minute walkthrough. We'll learn how your front office
              runs and put together a tailored proposal — scope, timeline, and
              investment — within 48 hours.
            </p>
            <div className={styles.ctaButtons}>
              <Button
                href={siteMeta.bookDemoHref}
                variant="inverse-primary"
                size="lg"
                showArrow
              >
                Book a Demo
              </Button>
              <Button
                href={siteMeta.contactHref}
                variant="inverse-secondary"
                size="lg"
              >
                Talk to sales
              </Button>
            </div>
            <p className={styles.ctaFootnote}>
              <Sparkles size={12} strokeWidth={2.5} /> Simple. Flexible.
              Scalable.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
