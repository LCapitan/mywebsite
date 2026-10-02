import { useEffect, useRef, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import cx from "classnames";

import { GitHub } from "../../components/Icons/GitHub";
import { LinkedIn } from "../../components/Icons/LinkedIn";
import { Pdf } from "../../components/Icons/Pdf";
import { RESUME_URL } from "../../config";
import { menuLinks } from "./navigation";

import styles from "./MobileMenu.module.scss";

const socialLinks = [
  { label: "GitHub", href: "https://github.com/LCapitan", Icon: GitHub },
  { label: "Resume (PDF)", href: RESUME_URL, Icon: Pdf },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/austinmelendez/",
    Icon: LinkedIn,
  },
];

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const { pathname } = useRouter();

  useEffect(() => {
    if (!open) return;

    const previousFocus = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.documentElement.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.documentElement.style.overflow = "";
      previousFocus?.focus();
    };
  }, [open, onClose]);

  return (
    <>
      <div
        className={cx(styles.backdrop, open && styles.backdropVisible)}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={cx(styles.menu, open && styles.open)}
        inert={!open}
      >
        <button
          ref={closeRef}
          type="button"
          className={styles.close}
          aria-label="Close menu"
          onClick={onClose}
        />

        <div className={styles.inner}>
          <nav aria-label="Menu">
            <ol className={styles.links}>
              {menuLinks.map(({ label, href }, i) => {
                const current = href === pathname;
                const content = (
                  <>
                    <span className={styles.number}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={styles.dot} aria-hidden="true" />
                    <span>{label}</span>
                  </>
                );

                return (
                  <li key={label} style={{ "--i": i } as CSSProperties}>
                    {href.startsWith("/") ? (
                      <Link
                        href={href}
                        onClick={onClose}
                        aria-current={current ? "page" : undefined}
                      >
                        {content}
                      </Link>
                    ) : (
                      <a href={href} onClick={onClose}>
                        {content}
                      </a>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>

          <span className={styles.divider} aria-hidden="true" />

          <div className={styles.profile}>
            <Image
              src="https://res.cloudinary.com/austinmel/image/upload/c_thumb,g_face,z_0.45,w_300,h_300/v1790868914/me_ytr3vn.jpg"
              alt=""
              width={80}
              height={80}
              className={styles.avatar}
            />
            <div>
              <p className={styles.name}>Austin Melendez</p>
              <p className={styles.location}>Miami, FL</p>
            </div>
          </div>
        </div>

        <ul className={styles.social}>
          {socialLinks.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
              >
                <Icon />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
