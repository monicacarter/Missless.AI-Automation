import { Sparkles, Phone, Target, Send } from 'lucide-react';
import { solutionPillars } from '../../data/siteData.js';
import styles from './Solution.module.css';

const iconMap = { Phone, Target, Send };

/**
 * Solution — Section 4.
 *
 * Fully centered. Clean white surface. Three pillars in a row with thin
 * vertical dividers between them.
 */
export default function Solution() {
  return (
    <section
      id="solution" className={styles.section} aria-labelledby="solution-heading">
      <div className={styles.container}>
        <span className={styles.badge}>
          <Sparkles size={14} strokeWidth={2.25} aria-hidden="true" />
          The solution
        </span>

        <h2 id="solution-heading" className={styles.headline}>
          Meet <span className={styles.brand}>Missless</span>, your AI front office
        </h2>

        <p className={styles.subcopy}>
          Missless manages the conversations that keep your business moving
          forward — answering calls, qualifying leads, booking appointments,
          and following up automatically.
        </p>

        <div className={styles.pillars}>
          {solutionPillars.map((p, i) => {
            const Icon = iconMap[p.icon];
            return (
              <div key={p.label} className={styles.pillar}>
                <span className={styles.pillarIcon} aria-hidden="true">
                  {Icon && <Icon size={22} strokeWidth={2} />}
                </span>
                <span className={styles.pillarLabel}>{p.label}</span>
                {i < solutionPillars.length - 1 && (
                  <span className={styles.divider} aria-hidden="true" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
