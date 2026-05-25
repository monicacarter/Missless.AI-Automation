import {
  Phone,
  ShieldCheck,
  Smartphone,
  Clock,
  Smile,
  Calendar,
  Home,
  Heart,
  Building2,
  ShoppingBag,
  Landmark,
  GraduationCap,
  Play,
  CheckCircle2,
} from 'lucide-react';
import Button from '../../components/Button/index.js';
import { siteMeta } from '../../data/siteData.js';
import {
  heroTrustRow,
  heroFloatingStats,
  heroTrustedBy,
} from '../../data/siteData.js';
import styles from './Hero.module.css';

const iconMap = {
  Phone,
  ShieldCheck,
  Smartphone,
  Clock,
  Smile,
  Calendar,
  Home,
  Heart,
  Building2,
  ShoppingBag,
  Landmark,
  GraduationCap,
};

/**
 * Hero — Section 1.
 *
 * Layout: text left, call demo card right, floating proof cards overlapping
 * the call card, trusted-by strip across the bottom of the section. Soft
 * tri-color gradient background with a decorative orbital arc behind the card.
 *
 * SEO: contains the page's single <h1> ("Never miss another lead again.").
 */
export default function Hero() {
  return (
    <section
      id="hero" className={styles.section} aria-labelledby="hero-heading">
      {/* Decorative background layers */}
      <div className={styles.bgGradient} aria-hidden="true" />
      <svg
        className={styles.bgArc}
        viewBox="0 0 1200 800"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M 200 700 Q 700 200, 1200 600"
          stroke="rgba(142, 88, 252, 0.15)"
          strokeWidth="1.5"
          strokeDasharray="2 8"
        />
        <circle cx="450" cy="450" r="3" fill="rgba(37, 99, 235, 0.4)" />
        <circle cx="800" cy="320" r="3" fill="rgba(142, 88, 252, 0.4)" />
        <circle cx="1050" cy="540" r="3" fill="rgba(251, 57, 148, 0.4)" />
      </svg>

      <div className={styles.container}>
        {/* Top: 2-column layout */}
        <div className={styles.grid}>
          {/* LEFT: text content */}
          <div className={styles.content}>
            <span className={styles.liveBadge}>
              <span className={styles.liveDot} aria-hidden="true" />
              <strong>Live now</strong>
              <span className={styles.liveBadgeDivider}>·</span>
              <span>Answering calls right now</span>
            </span>

            <h1 id="hero-heading" className={styles.headline}>
              Never miss{' '}
              <em className={`text-gradient ${styles.headlineAccent}`}>
                another lead
              </em>{' '}
              again.
            </h1>

            <p className={styles.subcopy}>
              Missless is the AI front office that answers calls, replies to
              messages, and books appointments 24/7.
            </p>

            <div className={styles.ctas}>
              <Button href={siteMeta.bookDemoHref} variant="primary" size="lg" showArrow>
                Book a demo
              </Button>
              <Button
                href="#hear-it-in-action"
                variant="secondary"
                size="lg"
                iconLeft={
                  <span className={styles.playIcon} aria-hidden="true">
                    <Play size={12} strokeWidth={2.5} fill="currentColor" />
                  </span>
                }
              >
                See Missless in action
              </Button>
            </div>

            <ul className={styles.trustRow}>
              {heroTrustRow.map((item, idx) => {
                const Icon = iconMap[item.icon];
                const tint = ['blue', 'purple', 'pink'][idx];
                return (
                  <li key={item.label} className={styles.trustItem}>
                    <span
                      className={`${styles.trustIcon} ${styles[`tint--${tint}`]}`}
                      aria-hidden="true"
                    >
                      {Icon && <Icon size={16} strokeWidth={2.25} />}
                    </span>
                    <span className={styles.trustLabel}>{item.label}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* RIGHT: call demo card + floating stats */}
          <div className={styles.demoArea}>
            {/* Floating proof cards */}
            {heroFloatingStats.map((stat, idx) => {
              const Icon = iconMap[stat.icon];
              return (
                <div
                  key={stat.id}
                  className={`${styles.floatingStat} ${styles[`floating--${idx}`]}`}
                >
                  <span
                    className={`${styles.statIcon} ${styles[`tint--${stat.tint}`]}`}
                    aria-hidden="true"
                  >
                    {Icon && <Icon size={20} strokeWidth={2} />}
                  </span>
                  <div>
                    <div className={styles.statValue}>{stat.value}</div>
                    <div className={styles.statLabel}>{stat.label}</div>
                  </div>
                </div>
              );
            })}

            {/* Main demo card */}
            <div className={styles.demoCard} aria-label="Example Missless call">
              {/* Card header */}
              <div className={styles.demoHeader}>
                <span className={styles.demoLogoTile} aria-hidden="true">
                  M
                </span>
                <div className={styles.demoHeaderText}>
                  <div className={styles.demoTitle}>Incoming call</div>
                  <div className={styles.demoNumber}>+1 (415) 555-0188</div>
                </div>
                <span className={styles.aiLivePill}>
                  <span className={styles.aiLiveDot} aria-hidden="true" />
                  AI live
                </span>
              </div>

              {/* Waveform */}
              <div className={styles.waveform} aria-hidden="true">
                {Array.from({ length: 48 }).map((_, i) => {
                  const heights = [8, 14, 22, 30, 18, 26, 12, 34, 20, 28, 16, 22];
                  const h = heights[i % heights.length];
                  return (
                    <span
                      key={i}
                      className={styles.waveBar}
                      style={{ height: `${h}px` }}
                    />
                  );
                })}
              </div>

              {/* Chat bubbles */}
              <div className={styles.chat}>
                <div className={styles.bubbleGroup}>
                  <div className={styles.bubbleLabel}>Caller</div>
                  <div className={`${styles.bubble} ${styles.bubbleLeft}`}>
                    Hi, my AC stopped working. Can someone come out today?
                  </div>
                </div>

                <div className={`${styles.bubbleGroup} ${styles.bubbleGroupRight}`}>
                  <div className={styles.bubbleLabel}>Missless AI</div>
                  <div className={`${styles.bubble} ${styles.bubbleRight}`}>
                    Absolutely. I have a technician available at 2:00 PM. Should
                    I lock that in?
                  </div>
                </div>

                <div className={styles.bubbleGroup}>
                  <div className={styles.bubbleLabel}>Caller</div>
                  <div className={`${styles.bubble} ${styles.bubbleLeft}`}>
                    Yes please.
                  </div>
                </div>
              </div>

              {/* Confirmation bar */}
              <div className={styles.confirmation}>
                <CheckCircle2
                  size={20}
                  strokeWidth={2.25}
                  className={styles.confirmCheck}
                  aria-hidden="true"
                />
                <div>
                  <div className={styles.confirmTitle}>Appointment booked</div>
                  <div className={styles.confirmSub}>
                    Today at 2:00 PM · Synced to calendar
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trusted-by strip */}
        <div className={styles.trustedBy}>
          <div className={styles.trustedByLabel}>
            Trusted by businesses
            <br />
            across industries
          </div>
          <ul className={styles.trustedByList}>
            {heroTrustedBy.map((item) => {
              const Icon = iconMap[item.icon];
              return (
                <li key={item.label} className={styles.trustedByItem}>
                  <span className={styles.trustedByIcon} aria-hidden="true">
                    {Icon && <Icon size={20} strokeWidth={1.75} />}
                  </span>
                  <span>{item.label}</span>
                </li>
              );
            })}
            <li className={styles.trustedByMore}>… and more</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
