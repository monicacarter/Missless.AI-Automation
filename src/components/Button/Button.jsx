import { ArrowRight } from 'lucide-react';
import { cn } from '../../utils/helpers.js';
import styles from './Button.module.css';

/**
 * Button — the site's CTA component, used everywhere.
 *
 * Renders as an <a> when `href` is given, or a <button> otherwise.
 *
 * Variants:
 *   - "primary"   — solid blue, white text. Default light-surface CTA.
 *   - "secondary" — white background, bordered, dark text. Pairs with primary.
 *   - "inverse-primary"   — white background, dark text. For dark surfaces.
 *   - "inverse-secondary" — transparent w/ white border. Pairs with inverse-primary.
 *   - "white-glow"        — white with a soft blue glow halo. Final CTA hero button.
 *
 * Sizes: "md" (default), "lg" (Final CTA), "sm" (compact).
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  iconLeft,
  iconRight,
  showArrow = false,
  fullWidth = false,
  className,
  type = 'button',
  ariaLabel,
}) {
  const classes = cn(
    styles.button,
    styles[`variant--${variant}`],
    styles[`size--${size}`],
    fullWidth && styles.fullWidth,
    className
  );

  const content = (
    <>
      {iconLeft && <span className={styles.iconLeft}>{iconLeft}</span>}
      <span className={styles.label}>{children}</span>
      {iconRight && <span className={styles.iconRight}>{iconRight}</span>}
      {showArrow && !iconRight && (
        <span className={styles.iconRight} aria-hidden="true">
          <ArrowRight size={18} strokeWidth={2.25} />
        </span>
      )}
    </>
  );

  if (href) {
    const isExternal = href.startsWith('http');
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}
