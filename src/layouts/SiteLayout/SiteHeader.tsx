import { useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";
import cx from "classnames";

import { Logo } from "../../components/Icons/Logo";
import { navLinks, socialLinks } from "./navigation";

import styles from "./SiteHeader.module.scss";

interface SiteHeaderProps {
  menuOpen: boolean;
  onOpenMenu: () => void;
}

export function SiteHeader({ menuOpen, onOpenMenu }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  // Slides away while scrolling down and comes back on any scroll up.
  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 24);
      if (Math.abs(y - lastY) > 4) {
        setHidden(y > 160 && y > lastY);
        lastY = y;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header
      className={cx(
        styles.header,
        scrolled && styles.scrolled,
        hidden && !menuOpen && styles.hidden,
      )}
    >
      <Link href="/" className={styles.logo} aria-label="Austin Melendez, home">
        <Logo />
        <span className={styles.name} aria-hidden="true">
          Austin
          <br />
          Melendez
        </span>
      </Link>

      <nav aria-label="Main" className={styles.nav}>
        <ul>
          {navLinks.map(({ label, href }) => (
            <li key={label}>
              {href.startsWith("/") ? (
                <Link href={href}>{label}</Link>
              ) : (
                <a href={href}>{label}</a>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Desktop only (the mobile menu has its own). */}
      <ul className={styles.social}>
        {socialLinks.map(({ label, href, Icon, size }) => (
          <li
            key={label}
            style={
              { "--icon-size": `${Math.round(size * 0.72)}px` } as CSSProperties
            }
          >
            <a href={href} target="_blank" rel="noreferrer" aria-label={label}>
              <Icon />
            </a>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className={styles.menuButton}
        aria-label="Open menu"
        aria-controls="mobile-menu"
        aria-expanded={menuOpen}
        onClick={onOpenMenu}
      >
        <svg viewBox="0 0 32 33" className={styles.menuIcon} aria-hidden="true">
          <circle className={styles.menuRing} cx="16" cy="17" r="15.5" />
          <circle className={styles.menuPlanet} cx="16" cy="17" r="7.5" />
          <g className={styles.menuMoon}>
            <circle cx="25.5" cy="4.5" r="4" />
          </g>
        </svg>
      </button>
    </header>
  );
}
