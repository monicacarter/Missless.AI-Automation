import { useState, useEffect, useRef } from 'react';
import {
  ChevronDown,
  Menu,
  X,
  Phone,
  Zap,
  MessageSquare,
  Home,
  Landmark,
  HeartPulse,
  Building2,
  ShoppingCart,
  GraduationCap,
  ArrowRight,
} from 'lucide-react';
import Button from '../Button/index.js';
import logoFull from '../../assets/images/missless-logo.png';
import { navLinks, productsMenu, industriesMenu, siteMeta } from '../../data/siteData.js';
import { cn } from '../../utils/helpers.js';
import styles from './Navbar.module.css';

// Icon registry for mega menu items — keeps the data file free of JSX.
const iconMap = {
  Phone, Zap, MessageSquare, Home, Landmark, HeartPulse, Building2, ShoppingCart, GraduationCap,
};

function MegaMenuPanel({ items, onItemClick }) {
  const isProducts = items === productsMenu;
  return (
    <div
      className={cn(styles.megaMenu, isProducts && styles.megaMenuProducts)}
      role="menu"
    >
      <div className={styles.megaMenuGrid}>
        {items.map((item) => {
          const Icon = iconMap[item.icon];
          return (
            <a
              key={item.id}
              href={item.href}
              className={styles.megaMenuItem}
              onClick={onItemClick}
              role="menuitem"
            >
              <span className={styles.megaMenuIcon} aria-hidden="true">
                {Icon && <Icon size={20} strokeWidth={2} />}
              </span>
              <span className={styles.megaMenuText}>
                <span className={styles.megaMenuName}>{item.name}</span>
                <span className={styles.megaMenuDesc}>{item.description}</span>
              </span>
              <span className={styles.megaMenuArrow} aria-hidden="true">
                <ArrowRight size={16} strokeWidth={2} />
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Navbar — site navigation.
 *
 * Sticky to the top, three zones: logo (left), nav links (center), CTA (right).
 * Mega menus open on hover (mouse) + click (keyboard). Escape closes them.
 * Mobile drawer with body-scroll lock.
 */
export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(null);
  const closeMenuTimer = useRef(null);

const openMegaMenu = (menuKey) => {
  if (closeMenuTimer.current) {
    clearTimeout(closeMenuTimer.current);
  }

  setOpenMenu(menuKey);
};

const closeMegaMenu = () => {
  closeMenuTimer.current = setTimeout(() => {
    setOpenMenu(null);
  }, 180);
};
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);

  // Click outside closes the open mega menu
  useEffect(() => {
    function onClickOutside(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  // Escape closes menus
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  // Lock body scroll while mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleMenuToggle = (key) => {
    setOpenMenu((current) => (current === key ? null : key));
  };

  const closeMenus = () => {
    setOpenMenu(null);
    setMobileOpen(false);
  };

  return (
    <header className={styles.header}>
      <nav ref={navRef} className={styles.nav} aria-label="Primary">
        <div className={styles.inner}>
          {/* Logo (left) */}
          <div className={styles.logoZone}>
            <a href="#hero" className={styles.logoLink} aria-label="Missless — Home">
              <img
                src={logoFull}
                alt="Missless"
                className={styles.logoImage}
              />
            </a>
          </div>

          {/* Center nav links (desktop) */}
          <ul className={styles.links} role="menubar">
            {navLinks.map((link) => {
              if (link.type === 'mega') {
                const isOpen = openMenu === link.menuKey;
                const items = link.menuKey === 'products' ? productsMenu : industriesMenu;
                return (
                  <li
                    key={link.label}
                    className={styles.linkItem}
                   onMouseEnter={() => openMegaMenu(link.menuKey)}
onMouseLeave={closeMegaMenu}
                  >
                    <button
                      type="button"
                      className={cn(styles.link, isOpen && styles.linkActive)}
                      aria-haspopup="true"
                      aria-expanded={isOpen}
                      onClick={() => handleMenuToggle(link.menuKey)}
                    >
                      {link.label}
                      <ChevronDown
                        size={16}
                        strokeWidth={2.25}
                        className={cn(styles.chevron, isOpen && styles.chevronOpen)}
                        aria-hidden="true"
                      />
                    </button>
                    {isOpen && <MegaMenuPanel items={items} onItemClick={closeMenus} />}
                  </li>
                );
              }
              return (
                <li key={link.label} className={styles.linkItem}>
                  <a href={link.href} className={styles.link}>
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* CTA (right) */}
          <div className={styles.ctaZone}>
            <Button href={siteMeta.bookDemoHref} variant="primary" size="md">
              Book a demo
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className={styles.hamburger}
            onClick={() => setMobileOpen((s) => !s)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div id="mobile-nav" className={styles.mobileDrawer}>
            <ul className={styles.mobileList}>
              {navLinks.map((link) => {
                if (link.type === 'mega') {
                  const items = link.menuKey === 'products' ? productsMenu : industriesMenu;
                  return (
                    <li key={link.label} className={styles.mobileGroup}>
                      <span className={styles.mobileGroupLabel}>{link.label}</span>
                      <ul className={styles.mobileSubList}>
                        {items.map((item) => (
                          <li key={item.id}>
                            <a
                              href={item.href}
                              className={styles.mobileSubLink}
                              onClick={closeMenus}
                            >
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>
                  );
                }
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className={styles.mobileLink}
                      onClick={closeMenus}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
            <div className={styles.mobileCta}>
              <Button href={siteMeta.bookDemoHref} variant="primary" size="lg" fullWidth>
                Book a demo
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
