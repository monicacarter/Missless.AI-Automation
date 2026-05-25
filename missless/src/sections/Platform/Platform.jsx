import {
  Sparkles,
  Phone,
  Zap,
  MessageSquare,
  ArrowRight,
  Mic,
  PhoneOff,
  CheckCircle2,
  Flame,
} from 'lucide-react';
import markLogo from '../../assets/images/missless-mark.png';
import { platformProducts } from '../../data/siteData.js';
import { cn } from '../../utils/helpers.js';
import styles from './Platform.module.css';

const iconMap = { Phone, Zap, MessageSquare };

/**
 * ReceptionistPreview — mini preview widget for the AI Receptionist card.
 */
function ReceptionistPreview() {
  return (
    <div className={styles.previewReceptionist}>
      <div className={styles.previewHeaderRow}>
        <span className={styles.previewTag}>Incoming Call</span>
        <span className={styles.previewTime}>00:24</span>
      </div>
      <div className={styles.previewWave} aria-hidden="true">
        {Array.from({ length: 18 }).map((_, i) => {
          const h = [6, 10, 16, 8, 14, 20, 10, 16, 6][i % 9];
          return (
            <span
              key={i}
              className={styles.previewWaveBar}
              style={{ height: `${h}px` }}
            />
          );
        })}
      </div>
      <div className={styles.previewControls}>
        <span className={styles.previewMicBtn} aria-hidden="true">
          <Mic size={12} strokeWidth={2.25} />
        </span>
        <span className={styles.previewEndBtn} aria-hidden="true">
          <PhoneOff size={12} strokeWidth={2.25} />
        </span>
      </div>
    </div>
  );
}

/**
 * SalesAgentPreview — mini preview widget for the AI Sales Agent card.
 */
function SalesAgentPreview() {
  const items = [
    'Introduced',
    'Qualified',
    'Handled Objections',
    'Booked Consultation',
  ];
  return (
    <div className={styles.previewSales}>
      <div className={styles.previewHeaderRow}>
        <span className={styles.previewTag}>New Lead</span>
        <span className={styles.previewHotPill}>
          <Flame size={10} strokeWidth={2.5} aria-hidden="true" />
          Hot
        </span>
      </div>
      <ul className={styles.previewChecklist}>
        {items.map((item) => (
          <li key={item} className={styles.previewCheckItem}>
            <CheckCircle2
              size={12}
              strokeWidth={2.25}
              className={styles.previewCheckIcon}
              aria-hidden="true"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * MessagingPreview — mini preview widget for the AI Messaging card.
 */
function MessagingPreview() {
  const channels = [
    { name: 'SMS', dot: 'green' },
    { name: 'WhatsApp', dot: 'green' },
    { name: 'Web Chat', dot: 'blue' },
    { name: 'Email', dot: 'purple' },
  ];
  return (
    <div className={styles.previewMessaging}>
      <ul className={styles.previewChannels}>
        {channels.map((c) => (
          <li key={c.name} className={styles.previewChannel}>
            <span
              className={cn(styles.previewChannelDot, styles[`dot--${c.dot}`])}
              aria-hidden="true"
            />
            <span>{c.name}</span>
            <span className={styles.previewChannelStatus}>active</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const previewMap = {
  receptionist: <ReceptionistPreview />,
  'sales-agent': <SalesAgentPreview />,
  messaging: <MessagingPreview />,
};

/**
 * Platform — Section 6.
 *
 * Centered header with Missless mark hub + 2 curved connector lines.
 * 3 product cards in a row, middle card lifted via translateY(-20px).
 * Each card has a unique inline preview widget on the top-right.
 */
export default function Platform() {
  return (
    <section
      id="platform" className={styles.section} aria-labelledby="platform-heading">
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.badge}>
            <Sparkles size={14} strokeWidth={2.25} aria-hidden="true" />
            The platform
          </span>
          <h2 id="platform-heading" className={styles.headline}>
            Three products, one{' '}
            <em className="text-gradient">connected front office</em>
          </h2>
          <p className={styles.subcopy}>
            Each module works on its own. Together, they replace the patchwork
            of disconnected tools most teams are stuck with today.
          </p>

          {/* Mark hub + curved connector lines */}
          <div className={styles.hubArea}>
            <svg
              className={styles.hubLines}
              viewBox="0 0 600 80"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M 300 20 Q 200 60, 60 70"
                stroke="rgba(37, 99, 235, 0.3)"
                strokeWidth="1.5"
                strokeDasharray="3 5"
              />
              <path
                d="M 300 20 Q 400 60, 540 70"
                stroke="rgba(251, 57, 148, 0.3)"
                strokeWidth="1.5"
                strokeDasharray="3 5"
              />
              <circle cx="60" cy="70" r="3" fill="var(--color-primary-blue)" />
              <circle cx="540" cy="70" r="3" fill="var(--color-pink)" />
            </svg>
            <div className={styles.hubCircle}>
              <img src={markLogo} alt="Missless" className={styles.hubImg} />
            </div>
          </div>
        </div>

        {/* Product cards */}
        <div className={styles.cards}>
          {platformProducts.map((p, i) => {
            const Icon = iconMap[p.icon];
            const isMiddle = i === 1;
            return (
              <article
                key={p.id}
                className={cn(
                  styles.card,
                  styles[`accent--${p.accent}`],
                  isMiddle && styles.cardLifted
                )}
              >
                <div className={styles.cardTop}>
                  <span className={styles.cardIcon} aria-hidden="true">
                    {Icon && <Icon size={22} strokeWidth={2} />}
                  </span>
                  <div className={styles.previewWrap}>{previewMap[p.id]}</div>
                </div>
                <h3 className={styles.cardTitle}>{p.title}</h3>
                <p className={styles.cardDesc}>{p.description}</p>
                <a href={p.href} className={styles.cardLink}>
                  <span>{p.linkText}</span>
                  <ArrowRight size={16} strokeWidth={2.25} aria-hidden="true" />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
