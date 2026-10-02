import { CONTACT_EMAIL } from "../../config";
import { ArrowButton } from "../ArrowButton";
import { Orbit } from "../Orbit";
import { Punctuated } from "../Punctuated";
import { Reveal } from "../Reveal";
import { SectionLabel } from "../SectionLabel";
import cx from "classnames";

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
          moons={[{ angle: -65, size: 17 }]}
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
      </div>
    </section>
  );
}
