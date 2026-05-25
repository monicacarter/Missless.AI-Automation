import {
  AlertTriangle,
  Phone,
  FileText,
  Users,
  Briefcase,
  WifiOff,
  Zap,
  Target,
  TrendingUp,
  Sparkles,
} from 'lucide-react';
import { hiddenTaxReasons, hiddenTaxDonutReasons, hiddenTaxOutcomes } from '../../data/siteData.js';
import { cn } from '../../utils/helpers.js';
import styles from './HiddenTax.module.css';

const iconMap = {
  Phone,
  FileText,
  Users,
  Briefcase,
  WifiOff,
  Zap,
  Target,
  TrendingUp,
};

/**
 * HiddenTax — Section 3.
 *
 * Two-column on desktop. Left: text content + 3 reason cards + purple-gradient
 * highlight callout. Right: stats card with a donut chart and 4 inline reasons,
 * with a separate outcome strip below.
 */
export default function HiddenTax() {
  return (
    <section
      id="hidden-tax" className={styles.section} aria-labelledby="hidden-tax-heading">
      <div className={styles.bgDots} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.grid}>
          {/* LEFT */}
          <div className={styles.left}>
            <span className={styles.badge}>
              <AlertTriangle size={14} strokeWidth={2.25} aria-hidden="true" />
              The hidden tax
            </span>

            <h2 id="hidden-tax-heading" className={styles.headline}>
              The cost of a
              <br />
              missed call is
              <br />
              <span className={styles.headlineBlue}>bigger</span>{' '}
              <span>than you</span>{' '}
              <span className={styles.headlinePurple}>think</span>
              <svg
                className={styles.underline}
                viewBox="0 0 90 12"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M 4 7 Q 22 0, 44 5 T 86 7"
                  stroke="var(--color-purple)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </h2>

            <ul className={styles.reasons}>
              {hiddenTaxReasons.map((r) => {
                const Icon = iconMap[r.icon];
                return (
                  <li key={r.title} className={styles.reason}>
                    <span className={styles.reasonIcon} aria-hidden="true">
                      {Icon && <Icon size={18} strokeWidth={2} />}
                    </span>
                    <div>
                      <p className={styles.reasonTitle}>{r.title}</p>
                      <p className={styles.reasonDesc}>{r.description}</p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className={styles.callout}>
              <Sparkles
                size={18}
                strokeWidth={2}
                className={styles.calloutIcon}
                aria-hidden="true"
              />
              <p>There is a better way to run the front of your business.</p>
            </div>
          </div>

          {/* RIGHT: stats card */}
          <div className={styles.right}>
            <div className={styles.statsCard}>
              <h3 className={styles.statsHeading}>
                Leads lost without real conversations
              </h3>

              <div className={styles.statsBody}>
                {/* Donut */}
                <div className={styles.donutWrap}>
                  <svg
                    className={styles.donut}
                    viewBox="0 0 200 200"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient
                        id="donutGradient"
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="1"
                      >
                        <stop offset="0%" stopColor="#60a5fa" />
                        <stop offset="100%" stopColor="#2563eb" />
                      </linearGradient>
                    </defs>
                    {/* Background ring */}
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="var(--color-soft-blue)"
                      strokeWidth="22"
                    />
                    {/* Filled ring (about 70% of circumference) */}
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="url(#donutGradient)"
                      strokeWidth="22"
                      strokeLinecap="round"
                      strokeDasharray="502"
                      strokeDashoffset="151"
                      transform="rotate(-90 100 100)"
                    />
                  </svg>
                  <div className={styles.donutLabel}>
                    <div className={styles.donutPct}>20%</div>
                    <div className={styles.donutTo}>to</div>
                    <div className={styles.donutPct}>40%</div>
                  </div>
                </div>

                {/* 4 reasons */}
                <ul className={styles.donutReasons}>
                  {hiddenTaxDonutReasons.map((r) => {
                    const Icon = iconMap[r.icon];
                    return (
                      <li key={r.title} className={styles.donutReason}>
                        <span
                          className={cn(
                            styles.smallIcon,
                            styles[`tint--${r.tint}`]
                          )}
                          aria-hidden="true"
                        >
                          {Icon && <Icon size={16} strokeWidth={2} />}
                        </span>
                        <div>
                          <div className={styles.donutReasonTitle}>
                            {r.title}
                          </div>
                          <div className={styles.donutReasonDesc}>
                            {r.description}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <p className={styles.statsFootnote}>
                of inbound leads are lost before you can respond.
              </p>
            </div>

            {/* Outcome strip */}
            <div className={styles.outcomes}>
              {hiddenTaxOutcomes.map((o) => {
                const Icon = iconMap[o.icon];
                return (
                  <div key={o.title} className={styles.outcome}>
                    <span
                      className={cn(styles.smallIcon, styles[`tint--${o.tint}`])}
                      aria-hidden="true"
                    >
                      {Icon && <Icon size={18} strokeWidth={2} />}
                    </span>
                    <div>
                      <div className={styles.outcomeTitle}>{o.title}</div>
                      <div className={styles.outcomeDesc}>{o.description}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
