import {
  Sparkles,
  MessageCircle,
  GraduationCap,
  Puzzle,
  ShieldCheck,
  Users,
  TrendingUp,
  DollarSign,
} from 'lucide-react';
import Button from '../../components/Button/index.js';
import { whyMisslessBenefits, siteMeta } from '../../data/siteData.js';
import { cn } from '../../utils/helpers.js';
import styles from './WhyMissless.module.css';

const iconMap = {
  MessageCircle,
  GraduationCap,
  Puzzle,
  ShieldCheck,
  Users,
  TrendingUp,
};

/**
 * WhyMissless — Section 8.
 *
 * Left-aligned header with "converting" gradient + SVG underline accent.
 * 3x2 grid of 6 benefit cards. Each card: icon + title on top row, description
 * below. No arrow buttons — informational, not navigational.
 *
 * Below the grid: a full-width gradient bar ("Designed to pay for itself")
 * with two CTAs and a dollar-icon callout.
 */
export default function WhyMissless() {
  return (
    <section
      id="why-missless" className={styles.section} aria-labelledby="why-missless-heading">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>
            <Sparkles size={14} strokeWidth={2.25} aria-hidden="true" />
            Why Missless
          </span>
          <h2 id="why-missless-heading" className={styles.headline}>
            The difference between answering and{' '}
            <span className={styles.accentWrap}>
              <em className="text-gradient">converting</em>
              <svg
                className={styles.underline}
                viewBox="0 0 160 12"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M 4 8 Q 40 0, 80 6 T 156 8"
                  stroke="url(#whyGrad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="whyGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#2563eb" />
                    <stop offset="100%" stopColor="#8e58fc" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h2>
          <p className={styles.subcopy}>
            Missless turns every conversation into a booked customer. No
            scripts. No missed opportunities.
          </p>
        </div>

        {/* 6 benefit cards */}
        <div className={styles.grid}>
          {whyMisslessBenefits.map((b) => {
            const Icon = iconMap[b.icon];
            return (
              <div
                key={b.id}
                className={cn(styles.card, styles[`accent--${b.accent}`])}
              >
                <div className={styles.cardHead}>
                  <span className={styles.cardIcon} aria-hidden="true">
                    {Icon && <Icon size={20} strokeWidth={2} />}
                  </span>
                  <h3 className={styles.cardTitle}>{b.title}</h3>
                </div>
                <p className={styles.cardDesc}>{b.description}</p>
              </div>
            );
          })}
        </div>

        {/* Pays-for-itself gradient bar */}
        <div className={styles.payBar}>
          <div className={styles.payContent}>
            <span className={styles.payIcon} aria-hidden="true">
              <DollarSign size={22} strokeWidth={2.5} />
            </span>
            <div className={styles.payText}>
              <strong>Designed to pay for itself: </strong>
              For most clients, two to three additional bookings per month
              cover the entire cost. Everything above that is profit you would
              have lost.
            </div>
          </div>
          <div className={styles.payCtas}>
            <Button href={siteMeta.bookDemoHref} variant="inverse-primary" size="md">
              Book a demo
            </Button>
            <Button href="#hear-it-in-action" variant="inverse-secondary" size="md">
              See Missless in action
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
