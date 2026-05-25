import logoFull from '../../assets/images/missless-logo.png';
import { footerColumns, footerLegalLinks, siteMeta } from '../../data/siteData.js';
import styles from './Footer.module.css';

/**
 * Footer — navy background, white logo (via CSS filter) and text.
 *
 * Top: 5-column grid (Brand + 4 link columns)
 * Middle: thin divider
 * Bottom: copyright (left) + legal links (right)
 */
export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.container}>
        {/* Top row — 5 columns */}
        <div className={styles.grid}>
          {/* Brand column */}
          <div className={styles.brand}>
            <a href="#hero" className={styles.logoLink} aria-label="Missless — back to top">
              <img
                src={logoFull}
                alt="Missless"
                className={styles.logoImage}
              />
            </a>
            <p className={styles.tagline}>{siteMeta.tagline}</p>
          </div>

          {/* Link columns */}
          {footerColumns.map((column) => (
            <nav
              key={column.heading}
              className={styles.column}
              aria-label={column.heading}
            >
              <h3 className={styles.columnHeading}>{column.heading}</h3>
              <ul className={styles.columnList}>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className={styles.columnLink}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Divider */}
        <div className={styles.divider} aria-hidden="true" />

        {/* Bottom row */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {siteMeta.copyrightYear} {siteMeta.name}. All rights reserved.
          </p>
          <nav className={styles.legal} aria-label="Legal">
            <ul className={styles.legalList}>
              {footerLegalLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={styles.legalLink}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
