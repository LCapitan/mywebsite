import { CONTACT_EMAIL } from "../../config";
import { ArrowButton } from "../ArrowButton";
import { MotionToggle } from "../MotionToggle";
import { Orbit } from "../Orbit";
import { Punctuated } from "../Punctuated";
import { Reveal } from "../Reveal";
import { SectionLabel } from "../SectionLabel";
import cx from "classnames";
import type { CSSProperties } from "react";

import { socialLinks } from "../../layouts/SiteLayout/navigation";

import styles from "./ContactSection.module.scss";

// "Have a project in mind?" — the dark band that closes out each page.
interface ContactSectionProps {
  number: string;
  // Sits directly under the section above, with no gap.
  flush?: boolean;
}

export function ContactSection({ number, flush }: ContactSectionProps) {
  return (
    <section className={cx(styles.contact, flush && styles.flush)}>
      <div className={styles.inner}>
        <Orbit
          className={styles.orbit}
          tone="night"
          line="dotted"
          moons={[{ angle: -135, size: 17 }]}
          duration={130}
        />
        <div>
          <SectionLabel number={number}>Let&#39;s work together</SectionLabel>
          <Reveal as="h2" className={styles.heading}>
            <Punctuated>Have a project in mind?</Punctuated>
          </Reveal>
          <Reveal as="p" className={styles.text} delay={120}>
            I&#39;m always open to new opportunities, interesting projects, or
            just some good conversation.
          </Reveal>
        </div>
        <Reveal className={styles.action} delay={240}>
          <ArrowButton
            href={`mailto:${CONTACT_EMAIL}`}
            label="Get in touch"
            tone="light"
          />
        </Reveal>
        {/* The pause control (WCAG 2.2.2) and profile links. */}
        <div className={styles.footer}>
          <MotionToggle />
          <ul className={styles.social}>
            {socialLinks.map(({ label, href, Icon, size }) => (
              <li
                key={label}
                style={
                  {
                    // GitHub (the largest) is 22px on phones, 32px on
                    // desktop; the others keep their size relative to it.
                    "--icon-size": `${Math.round(size * 0.72)}px`,
                    "--icon-size-lg": `${Math.round((size * 32) / 30)}px`,
                  } as CSSProperties
                }
              >
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
      </div>
    </section>
  );
}
