import { cn } from '../../utils/helpers.js';
import styles from './Card.module.css';

/**
 * Card — generic white surface card with rounded corners and a soft shadow.
 *
 * variant:
 *   - "default" — white, soft shadow
 *   - "outlined" — white with light border, no shadow
 *   - "tinted" — soft light-tint background
 *   - "dark" — dark-navy surface (used in Section 9 Onboarding)
 *
 * padding:
 *   - "md" (default), "lg", "sm", "none"
 */
export default function Card({
  children,
  variant = 'default',
  padding = 'md',
  as: Tag = 'div',
  className,
  ...rest
}) {
  return (
    <Tag
      className={cn(
        styles.card,
        styles[`variant--${variant}`],
        styles[`padding--${padding}`],
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
