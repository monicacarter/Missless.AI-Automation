import {
  Sparkles,
  Phone,
  Globe,
  MessageSquare,
  Store,
  CalendarCheck,
  UserCheck,
  Database,
  Send,
  Check,
  ChevronRight,
} from 'lucide-react';
import markLogo from '../../assets/images/missless-mark.png';
import { howItWorksInputs, howItWorksOutputs, ANCHORS } from '../../data/siteData.js';
import { cn } from '../../utils/helpers.js';
import styles from './HowItWorks.module.css';

const iconMap = {
  Phone, Globe, MessageSquare, Store,
  CalendarCheck, UserCheck, Database, Send,
};

/**
 * HowItWorks — Section 5.
 *
 * Header: 2-line headline, "under two minutes" in solid primary blue.
 *
 * Flow diagram — fully navigational:
 *   - 4 input cards (left): each card is an anchor link to #platform.
 *     Each card has a chevron on its right edge as the visual affordance.
 *   - Hub: the Missless M mark in a glowing circle. The hub is itself
 *     a link to #solution. Below it sits the "AI Processing" pill.
 *   - 4 output cards (right): each is an anchor link to #why-missless.
 *   - Two flow-arrows between joining-points and hub: anchor links
 *     to #hear-it-in-action (see the demo of the full flow).
 *
 * Connector lines: solid 1.5px paths in a soft purple/lavender gradient,
 * gathered into a single point on each side of the hub.
 *
 * Background: very subtle radial dot pattern across the section, plus
 * a soft purple-pink glow centered on the hub.
 */
export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className={styles.section}
      aria-labelledby="how-it-works-heading"
    >
      <div className={styles.bgDots} aria-hidden="true" />
      <div className={styles.bgGlow} aria-hidden="true" />

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.badge}>
            <Sparkles size={14} strokeWidth={2.25} aria-hidden="true" />
            How it works
          </span>
          <h2 id="how-it-works-heading" className={styles.headline}>
            From first hello to booked appointment in{' '}
            <span className={styles.headlineAccent}>under two minutes</span>
          </h2>
          <p className={styles.subcopy}>
            Missless answers, qualifies, books, and follows up automatically
            across every customer touchpoint.
          </p>
        </div>

        {/* Flow diagram */}
        <div className={styles.flow}>
          {/* Connector lines — single SVG spanning the entire flow area.
              Lines gather from cards to a joining-point near the hub on each side. */}
          <svg
            className={styles.connectors}
            viewBox="0 0 1000 600"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="hiwLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="rgba(37, 99, 235, 0.35)" />
                <stop offset="50%" stopColor="rgba(142, 88, 252, 0.35)" />
                <stop offset="100%" stopColor="rgba(251, 57, 148, 0.35)" />
              </linearGradient>
            </defs>

            {/* LEFT side — 4 input lines gather at joining-point (380, 300) */}
            <path d="M 220 100 L 320 100 Q 380 100, 380 300" stroke="url(#hiwLine)" strokeWidth="1.5" fill="none" />
            <path d="M 220 233 L 320 233 Q 380 233, 380 300" stroke="url(#hiwLine)" strokeWidth="1.5" fill="none" />
            <path d="M 220 367 L 320 367 Q 380 367, 380 300" stroke="url(#hiwLine)" strokeWidth="1.5" fill="none" />
            <path d="M 220 500 L 320 500 Q 380 500, 380 300" stroke="url(#hiwLine)" strokeWidth="1.5" fill="none" />

            {/* RIGHT side — 4 output lines fan from joining-point (620, 300) */}
            <path d="M 620 300 Q 620 100, 680 100 L 780 100" stroke="url(#hiwLine)" strokeWidth="1.5" fill="none" />
            <path d="M 620 300 Q 620 233, 680 233 L 780 233" stroke="url(#hiwLine)" strokeWidth="1.5" fill="none" />
            <path d="M 620 300 Q 620 367, 680 367 L 780 367" stroke="url(#hiwLine)" strokeWidth="1.5" fill="none" />
            <path d="M 620 300 Q 620 500, 680 500 L 780 500" stroke="url(#hiwLine)" strokeWidth="1.5" fill="none" />

            {/* Small floating particles around the hub */}
            <circle cx="460" cy="200" r="2" fill="rgba(37, 99, 235, 0.4)" />
            <circle cx="540" cy="180" r="2" fill="rgba(142, 88, 252, 0.4)" />
            <circle cx="500" cy="430" r="2" fill="rgba(251, 57, 148, 0.4)" />
            <circle cx="470" cy="400" r="1.5" fill="rgba(142, 88, 252, 0.3)" />
            <circle cx="540" cy="410" r="1.5" fill="rgba(37, 99, 235, 0.3)" />
          </svg>

          {/* Inputs column */}
          <ul className={styles.col}>
            {howItWorksInputs.map((item) => {
              const Icon = iconMap[item.icon];
              return (
                <li key={item.label}>
                  <a href={item.href} className={styles.inputCard}>
                    <span
                      className={cn(styles.cardIcon, styles[`tint--${item.tint}`])}
                      aria-hidden="true"
                    >
                      {Icon && <Icon size={20} strokeWidth={2} />}
                    </span>
                    <span className={styles.cardLabel}>{item.label}</span>
                    <span className={styles.cardChevron} aria-hidden="true">
                      <ChevronRight size={16} strokeWidth={2.25} />
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Hub column */}
          <div className={styles.hubCol}>
            {/* Left arrow — between input joining-point and hub */}
            <a
              href={ANCHORS.hearItInAction}
              className={cn(styles.flowArrow, styles.flowArrowLeft)}
              aria-label="See Missless processing in action"
            >
              <ChevronRight size={18} strokeWidth={2.5} />
            </a>

            {/* The hub itself — link to the Solution section */}
            <a
              href={ANCHORS.solution}
              className={styles.hub}
              aria-label="Meet Missless"
            >
              <span className={styles.hubCircle}>
                <img src={markLogo} alt="" className={styles.hubImg} />
              </span>
              <span className={styles.hubPill}>
                <span className={styles.hubPillDot} aria-hidden="true" />
                AI Processing
              </span>
            </a>

            {/* Right arrow — between hub and output joining-point */}
            <a
              href={ANCHORS.hearItInAction}
              className={cn(styles.flowArrow, styles.flowArrowRight)}
              aria-label="See what Missless produces"
            >
              <ChevronRight size={18} strokeWidth={2.5} />
            </a>
          </div>

          {/* Outputs column */}
          <ul className={styles.col}>
            {howItWorksOutputs.map((item) => {
              const Icon = iconMap[item.icon];
              return (
                <li key={item.title}>
                  <a href={item.href} className={styles.outputCard}>
                    <span
                      className={cn(styles.cardIcon, styles[`tint--${item.tint}`])}
                      aria-hidden="true"
                    >
                      {Icon && <Icon size={20} strokeWidth={2} />}
                    </span>
                    <div className={styles.cardBody}>
                      <div className={styles.cardTitle}>{item.title}</div>
                      <div className={styles.cardDesc}>{item.description}</div>
                    </div>
                    <span className={styles.cardChevron} aria-hidden="true">
                      <ChevronRight size={16} strokeWidth={2.25} />
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Closing line */}
        <div className={styles.closing}>
          <span className={styles.closingCheck} aria-hidden="true">
            <Check size={14} strokeWidth={2.5} />
          </span>
          <span>No missed calls. No cold leads. No manual follow-up.</span>
        </div>
      </div>
    </section>
  );
}
