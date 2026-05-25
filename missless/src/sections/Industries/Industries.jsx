import {
  Grid3x3,
  Home,
  Landmark,
  HeartPulse,
  Building2,
  ShoppingCart,
  GraduationCap,
  ArrowUpRight,
} from 'lucide-react';
import { industries } from '../../data/siteData.js';
import { cn } from '../../utils/helpers.js';
import styles from './Industries.module.css';

const iconMap = {
  Home,
  Landmark,
  HeartPulse,
  Building2,
  ShoppingCart,
  GraduationCap,
};

/**
 * Industries — Section 7.
 *
 * Left-aligned header with the section's gradient accent on "customer-facing".
 * 3-column grid of 6 industry cards. Each card has an accent color (one of
 * six in the brand palette + extended accents) used on the icon background
 * and the circular arrow button at the bottom-right.
 *
 * Each card is wrapped in an anchor for accessibility — the whole card is the
 * navigation target.
 */
export default function Industries() {
  return (
    <section
      id="industries" className={styles.section} aria-labelledby="industries-heading">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>
            <Grid3x3 size={14} strokeWidth={2.25} aria-hidden="true" />
            Industries
          </span>
          <h2 id="industries-heading" className={styles.headline}>
            Built for every{' '}
            <em className="text-gradient">customer-facing</em> business
          </h2>
          <p className={styles.subcopy}>
            Missless adapts to how your industry actually sells, schedules, and
            serves customers. The conversation flows, qualifying questions, and
            booking rules are all tailored to your workflow.
          </p>
        </div>

        <div className={styles.grid}>
          {industries.map((ind) => {
            const Icon = iconMap[ind.icon];
            return (
              <a
                key={ind.id}
                href={ind.href}
                className={cn(styles.card, styles[`accent--${ind.accent}`])}
              >
                <div className={styles.cardHead}>
                  <span className={styles.cardIcon} aria-hidden="true">
                    {Icon && <Icon size={22} strokeWidth={2} />}
                  </span>
                  <h3 className={styles.cardTitle}>{ind.title}</h3>
                </div>
                <p className={styles.cardDesc}>{ind.description}</p>
                <span className={styles.cardArrow} aria-hidden="true">
                  <ArrowUpRight size={18} strokeWidth={2.25} />
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
