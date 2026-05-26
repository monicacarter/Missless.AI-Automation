import { useRef, useState } from "react";
import {
  AudioLines,
  Zap,
  ShieldCheck,
  Play,
  CheckCircle2,
  Phone,
  MessageSquare,
  Calendar,
  Home,
  Landmark,
  Heart,
  Building2,
  ShoppingBag,
  GraduationCap,
  Headphones,
} from 'lucide-react';
import Button from '../../components/Button/index.js';
import { hearItIndustries, hearItTrustRow, hearItStats, siteMeta } from '../../data/siteData.js';
import { cn } from '../../utils/helpers.js';
import styles from './HearItInAction.module.css';

const iconMap = {
  AudioLines,
  Zap,
  ShieldCheck,
  Phone,
  MessageSquare,
  Calendar,
  Home,
  Landmark,
  Heart,
  Building2,
  ShoppingBag,
  GraduationCap,
};

/**
 * HearItInAction — Section 2.
 *
 * Left: text content with the section's signature blue "Missless" word,
 * hand-drawn underline accent, CTAs, and three trust items.
 *
 * Right: industry-picker player card. Pills control which industry is active.
 * Below that card, a dark navy stats bar visually overlaps the bottom-right.
 */
export default function HearItInAction() {
  const [activeIndustry, setActiveIndustry] = useState(hearItIndustries[0].id);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
const [currentTime, setCurrentTime] = useState(0);
const [duration, setDuration] = useState(0);

const audioFiles = {
"home-services": "/Missless.AI-Automation/audio/home-services.mp3",
"financial-services": "/Missless.AI-Automation/audio/financial-services.mp3",
  healthcare: "/Missless.AI-Automation/audio/healthcare.mp3",
  "real-estate": "/Missless.AI-Automation/audio/real-estate.mp3",
  retail: "/Missless.AI-Automation/audio/retail.mp3",
  education: "/Missless.AI-Automation/audio/education.mp3",
};


  const handleIndustryChange = (industryId) => {
    setActiveIndustry(industryId);
    setIsPlaying(false);
setCurrentTime(0);
setDuration(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.load();
    }
  };

  const toggleAudio = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      await audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };
  const formatTime = (time) => {
  if (!time || Number.isNaN(time)) return "00:00";

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

const progress = duration ? currentTime / duration : 0;
  return (
    <section
      id="hear-it-in-action"
      className={styles.section}
      aria-labelledby="hear-it-heading"
    >
      <div className={styles.bgGlow} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.grid}>
          {/* LEFT: text */}
          <div className={styles.content}>
            <span className={styles.badge}>
              <AudioLines size={16} strokeWidth={2.25} aria-hidden="true" />
              Hear it in action
            </span>

            <h2 id="hear-it-heading" className={styles.headline}>
              Listen to a real{' '}
              <span className={styles.brandWord}>Missless</span>
              <br />
              conversation
              <svg
                className={styles.underline}
                viewBox="0 0 220 14"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M 4 8 Q 60 -2, 110 6 T 216 8"
                  stroke="var(--color-primary-blue)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </h2>

            <p className={styles.subcopy}>
              Pick an industry and hear how Missless handles a live customer call.
            </p>

            <div className={styles.ctas}>
              <Button
                href={siteMeta.bookDemoHref}
                variant="primary"
                size="md"
                iconLeft={<Calendar size={16} strokeWidth={2.25} />}
                showArrow
              >
                Book a demo
              </Button>
              <Button
                href="#hear-it-in-action"
                variant="secondary"
                size="md"
                iconLeft={
                  <span className={styles.playPill} aria-hidden="true">
                    <Play size={10} strokeWidth={2.5} fill="currentColor" />
                  </span>
                }
              >
                See Missless in action
              </Button>
            </div>

            <ul className={styles.trustRow}>
              {hearItTrustRow.map((item) => {
                const Icon = iconMap[item.icon];
                return (
                  <li key={item.title} className={styles.trustItem}>
                    <span
                      className={cn(
                        styles.trustIcon,
                        styles[`tint--${item.tint}`]
                      )}
                      aria-hidden="true"
                    >
                      {Icon && <Icon size={18} strokeWidth={2} />}
                    </span>
                    <div>
                      <div className={styles.trustTitle}>{item.title}</div>
                      <div className={styles.trustDesc}>{item.description}</div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* RIGHT: player + stats bar */}
          <div className={styles.playerArea}>
            <div className={styles.playerCard}>
              <h3 className={styles.playerHeading}>Choose an industry</h3>

              {/* Industry pills */}
              <div
                className={styles.pills}
                role="tablist"
                aria-label="Choose an industry"
              >
                {hearItIndustries.map((ind) => {
                  const Icon = iconMap[ind.icon];
                  const isActive = activeIndustry === ind.id;
                  return (
                    <button
                      key={ind.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() =>  handleIndustryChange(ind.id)}
                      className={cn(styles.pill, isActive && styles.pillActive)}
                    >
                      {Icon && <Icon size={14} strokeWidth={2.25} />}
                      <span>{ind.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Player panel */}
              <div className={styles.player}>
                <div className={styles.playerHeader}>
                  <div className={styles.playerLabel}>
                    {
                      hearItIndustries.find((i) => i.id === activeIndustry)?.label
                    }{' '}
                    · <span>30 seconds</span>
                  </div>
                  <span className={styles.livePreviewPill}>
                    <span className={styles.livePreviewDot} aria-hidden="true" />
                    Live preview
                  </span>
                </div>

                <div className={styles.playerBody}>
  <button
  type="button"
  className={cn(styles.playButton, isPlaying && styles.playButtonActive)}
  aria-label={isPlaying ? "Pause sample conversation" : "Play sample conversation"}
  onClick={toggleAudio}
>
  {isPlaying ? (
    <span className={styles.pauseIcon}>
      <span />
      <span />
    </span>
  ) : (
    <Play size={22} strokeWidth={2.5} fill="currentColor" />
  )}
</button>

<audio
  ref={audioRef}
  src={audioFiles[activeIndustry]}
  preload="metadata"
  onLoadedMetadata={() => {
    setDuration(audioRef.current?.duration || 0);
  }}
  onTimeUpdate={() => {
    setCurrentTime(audioRef.current?.currentTime || 0);
  }}
  onEnded={() => {
    setIsPlaying(false);
    setCurrentTime(0);
  }}
/>


             <div className={styles.playerWave} aria-hidden="true">
  {Array.from({ length: 36 }).map((_, i) => {
    const heights = [10, 18, 28, 14, 24, 32, 16, 26, 12, 30, 20];
    const barProgress = (i + 1) / 36;
    const isActiveBar = barProgress <= progress;

    return (
      <span
        key={i}
        className={cn(
          styles.playerWaveBar,
          isActiveBar && styles.playerWaveBarActive,
          isPlaying && styles.playerWaveBarPlaying
        )}
        style={{
          height: `${heights[i % heights.length]}px`,
          animationDelay: `${i * 0.04}s`,
        }}
      />
    );
  })}
</div>

                  <ul className={styles.checklist}>
                    {[
                      'Greets naturally',
                      'Qualifies the caller',
                      'Books the appointment',
                    ].map((c) => (
                      <li key={c} className={styles.checkItem}>
                        <CheckCircle2
                          size={16}
                          strokeWidth={2.25}
                          className={styles.checkIcon}
                          aria-hidden="true"
                        />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.playerFooter}>
                  <span>
                  {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>
              </div>

              <div className={styles.footerStrip}>
                <Headphones
                  size={16}
                  strokeWidth={2.25}
                  className={styles.headphonesIcon}
                  aria-hidden="true"
                />
                <span>Hear a real conversation powered by Missless AI.</span>
                <span className={styles.miniWave} aria-hidden="true">
                  {Array.from({ length: 16 }).map((_, i) => {
                    const h = [4, 8, 12, 6, 10, 14, 8][i % 7];
                    return (
                      <span
                        key={i}
                        className={styles.miniWaveBar}
                        style={{ height: `${h}px` }}
                      />
                    );
                  })}
                </span>
              </div>
            </div>

            {/* Dark stats bar overlapping the card */}
            <div className={styles.statsBar}>
              {hearItStats.map((stat) => {
                const Icon = iconMap[stat.icon];
                return (
                  <div key={stat.label} className={styles.statsItem}>
                    <span
                      className={cn(
                        styles.statsIcon,
                        styles[`statsTint--${stat.tint}`]
                      )}
                      aria-hidden="true"
                    >
                      {Icon && <Icon size={20} strokeWidth={2} />}
                    </span>
                    <div>
                      <div className={styles.statsValue}>{stat.value}</div>
                      <div className={styles.statsLabel}>{stat.label}</div>
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
