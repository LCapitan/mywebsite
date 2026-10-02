import { useEffect, useState } from "react";
import Link from "next/link";
import cx from "classnames";

import { Logo } from "../../components/Icons/Logo";
import { navLinks } from "./navigation";

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
      <Link href="/" className={styles.logo} aria-label="Home">
        <Logo />
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

      <button
        type="button"
        className={styles.menuButton}
        aria-label="Open menu"
        aria-controls="mobile-menu"
        aria-expanded={menuOpen}
        onClick={onOpenMenu}
      >
        <span className={styles.moon} />
      </button>
    </header>
  );
}
