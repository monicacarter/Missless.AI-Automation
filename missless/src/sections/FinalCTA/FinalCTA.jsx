import {
  Calendar,
  Play,
  Check,
  Zap,
  X,
  Shield,
} from 'lucide-react';
import Button from '../../components/Button/index.js';
import { finalCtaTrust, siteMeta } from '../../data/siteData.js';
import styles from './FinalCTA.module.css';

const iconMap = { Check, Zap, X, Shield };

/**
 * FinalCTA — Section 11.
 *
 * A single full-width dark gradient card on a pale lavender section
 * background. Centered headline with `text-gradient-dark` on "opportunity?",
 * a multi-color underline, sub-copy with "15-minute" highlighted, two large
 * CTAs (Book a demo with `white-glow` variant + See in action with
 * `inverse-secondary`), and a trust strip with 4 items.
 */
export default function FinalCTA() {
  return (
    <section
      id="final-cta" className={styles.section} aria-labelledby="final-cta-heading">
      <div className={styles.container}>
        <div className={styles.card}>
          {/* Decorative dot patterns */}
          <div className={`${styles.dotPattern} ${styles.dotsTopLeft}`} aria-hidden="true" />
          <div className={`${styles.dotPattern} ${styles.dotsBottomRight}`} aria-hidden="true" />

          {/* Concentric rings bottom-left */}
          <svg
            className={styles.rings}
            viewBox="0 0 200 200"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="100" cy="100" r="40" stroke="rgba(255,255,255,0.08)" />
            <circle cx="100" cy="100" r="60" stroke="rgba(255,255,255,0.06)" />
            <circle cx="100" cy="100" r="80" stroke="rgba(255,255,255,0.04)" />
          </svg>

          {/* Decorative sparkles */}
          <span className={`${styles.sparkle} ${styles.sparkle1}`} aria-hidden="true">✦</span>
          <span className={`${styles.sparkle} ${styles.sparkle2}`} aria-hidden="true">✦</span>

          {/* Content */}
          <div className={styles.content}>
            <h2 id="final-cta-heading" className={styles.headline}>
              Ready to never miss
              <br />
              another{' '}
              <span className={styles.accentWrap}>
                <em className="text-gradient-dark">opportunity?</em>
                <svg
                  className={styles.underline}
                  viewBox="0 0 240 14"
                  fill="none"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="finalUnderline" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#60a5fa" />
                      <stop offset="50%" stopColor="#a78bfa" />
                      <stop offset="100%" stopColor="#f0abfc" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 6 8 Q 60 -2, 120 6 T 234 8"
                    stroke="url(#finalUnderline)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>

            <p className={styles.subcopy}>
              See exactly how Missless would work for your business in{' '}
              <span className={styles.highlight}>a 15-minute</span> walkthrough.
            </p>

            <div className={styles.ctas}>
              <Button
                href={siteMeta.bookDemoHref}
                variant="white-glow"
                size="lg"
                iconLeft={
                  <span className={styles.calendarTile} aria-hidden="true">
                    <Calendar size={14} strokeWidth={2.25} />
                  </span>
                }
              >
                Book a demo
              </Button>
              <Button
                href="#hear-it-in-action"
                variant="inverse-secondary"
                size="lg"
                iconLeft={
                  <span className={styles.playTile} aria-hidden="true">
                    <Play size={10} strokeWidth={2.5} fill="currentColor" />
                  </span>
                }
              >
                See Missless in action
              </Button>
            </div>

            {/* Trust strip */}
            <ul className={styles.trust}>
              {finalCtaTrust.map((item, idx) => {
                const Icon = iconMap[item.icon];
                return (
                  <li key={item.label} className={styles.trustItem}>
                    <span className={styles.trustIcon} aria-hidden="true">
                      {Icon && <Icon size={14} strokeWidth={2.5} />}
                    </span>
                    <span>{item.label}</span>
                    {idx < finalCtaTrust.length - 1 && (
                      <span className={styles.trustDivider} aria-hidden="true" />
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
