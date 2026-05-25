import {
  Tag,
  Rocket,
  Phone,
  MessageSquare,
  Calendar,
  DollarSign,
  Zap,
} from 'lucide-react';
import Button from '../../components/Button/index.js';
import { onboardingSteps, siteMeta, ANCHORS } from '../../data/siteData.js';
import { cn } from '../../utils/helpers.js';
import styles from './PricingOnboarding.module.css';

/**
 * PricingOnboarding — Section 9.
 *
 * Two side-by-side cards on a white section background.
 *
 *   LEFT — Pricing (light card):
 *     - Inline badge group: tag-icon + "PRICING" uppercase blue
 *     - Three-line headline (line 1 navy, lines 2–3 primary blue)
 *     - Sub-copy + 2 CTAs
 *     - Decorative dashed curve with 3 floating circle icons
 *     - Bottom callout strip
 *
 *   RIGHT — Onboarding (dark navy card):
 *     - Inline badge group: rocket-icon + "ONBOARDING" purple
 *     - 2-line headline with purple→pink gradient on "days" and "quarters"
 *     - 3-step vertical timeline with colored circles
 *     - Bottom dark callout with yellow lightning + yellow accent on "5 to 7"
 */
export default function PricingOnboarding() {
  return (
    <section
      id="pricing-onboarding"
      className={styles.section}
      aria-labelledby="pricing-onboarding-heading"
    >
      <h2 id="pricing-onboarding-heading" className="sr-only">
        Pricing and onboarding
      </h2>

      <div className={styles.container}>
        <div className={styles.grid}>
          {/* ---------- Pricing card (left, light) ---------- */}
          <div className={styles.pricingCard}>
            <div className={styles.cardBadge}>
              <span
                className={cn(styles.cardBadgeTile, styles.cardBadgeTileBlue)}
                aria-hidden="true"
              >
                <Tag size={14} strokeWidth={2.25} />
              </span>
              <span className={styles.cardBadgeText}>Pricing</span>
            </div>

            <h3 className={styles.pricingHeadline}>
              <span className={styles.pricingLine1}>One platform.</span>
              <span className={styles.pricingLine2}>Pricing built around</span>
              <span className={styles.pricingLine3}>your business.</span>
            </h3>

            <p className={styles.cardCopy}>
              Missless is priced on call volume, channels, and integrations. Not
              per seat. Not with hidden fees. Most teams launch on a plan that
              pays for itself inside the first month.
            </p>

            <div className={styles.pricingCtas}>
              <Button href={ANCHORS.pricing} variant="primary" size="md" showArrow>
                See pricing
              </Button>
              <Button href={siteMeta.contactHref} variant="secondary" size="md">
                Get a custom quote
              </Button>
            </div>

            {/* Decorative curve + floating icons */}
            <div className={styles.pricingDecoration} aria-hidden="true">
              <svg
                className={styles.decoCurve}
                viewBox="0 0 400 120"
                fill="none"
              >
                <path
                  d="M 20 90 Q 100 30, 200 60 T 380 40"
                  stroke="rgba(37, 99, 235, 0.25)"
                  strokeWidth="1.5"
                  strokeDasharray="3 5"
                  fill="none"
                />
              </svg>
              <span className={cn(styles.floatIcon, styles.floatIconBlue)}>
                <Phone size={16} strokeWidth={2.25} />
              </span>
              <span className={cn(styles.floatIcon, styles.floatIconBlue2)}>
                <MessageSquare size={16} strokeWidth={2.25} />
              </span>
              <span className={cn(styles.floatIcon, styles.floatIconPink)}>
                <Calendar size={16} strokeWidth={2.25} />
              </span>
            </div>

            <div className={styles.pricingCallout}>
              <span className={styles.pricingCalloutIcon} aria-hidden="true">
                <DollarSign size={14} strokeWidth={2.5} />
              </span>
              <span>
                Simple, transparent, and built to grow with you.
              </span>
            </div>
          </div>

          {/* ---------- Onboarding card (right, dark) ---------- */}
          <div className={styles.onboardingCard}>
            <div className={styles.cardBadge}>
              <span
                className={cn(
                  styles.cardBadgeTile,
                  styles.cardBadgeTileDark
                )}
                aria-hidden="true"
              >
                <Rocket size={14} strokeWidth={2.25} />
              </span>
              <span className={styles.cardBadgeTextPurple}>Onboarding</span>
            </div>

            <h3 className={styles.onboardingHeadline}>
              Live in{' '}
              <em className="text-gradient-purple-pink">days</em>, not{' '}
              <em className="text-gradient-purple-pink">quarters</em>.
            </h3>

            <ol className={styles.timeline}>
              {onboardingSteps.map((step, idx) => {
                const isLast = idx === onboardingSteps.length - 1;
                return (
                  <li key={step.number} className={styles.step}>
                    <div className={styles.stepLeft}>
                      <span
                        className={cn(
                          styles.stepNumber,
                          styles[`stepNumber--${step.color}`]
                        )}
                      >
                        {step.number}
                      </span>
                      {!isLast && (
                        <span
                          className={styles.stepConnector}
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    <div className={styles.stepBody}>
                      <h4 className={styles.stepTitle}>{step.title}</h4>
                      <p className={styles.stepDesc}>{step.description}</p>
                    </div>
                  </li>
                );
              })}
            </ol>

            <div className={styles.onboardingCallout}>
              <span className={styles.onboardingCalloutIcon} aria-hidden="true">
                <Zap size={14} strokeWidth={2.5} fill="currentColor" />
              </span>
              <span>
                Most businesses are answering live calls within{' '}
                <strong className={styles.onboardingHighlight}>
                  5 to 7 business days
                </strong>
                .
              </span>
            </div>

            {/* Dot pattern decoration */}
            <div className={styles.dotPattern} aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
