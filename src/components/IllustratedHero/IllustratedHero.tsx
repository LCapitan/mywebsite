import cx from "classnames";
import type { ReactNode } from "react";

import { HeroSky } from "../HeroSky";
import { Reveal } from "../Reveal";
import { SectionLabel } from "../SectionLabel";

import styles from "./IllustratedHero.module.scss";

interface IllustratedHeroProps {
  number: string;
  label: string;
  title: ReactNode;
  // hero: the big homepage-size title. heading: the section heading size.
  titleSize?: "hero" | "heading";
  text?: ReactNode;
  action: ReactNode;
  // The illustration; the page positions it with artClassName.
  art: ReactNode;
  className?: string;
  titleClassName?: string;
  artClassName?: string;
}

// Text on the left, an illustration on the right, and the hero orbits
// (without the planet) behind them. Used by the Contact and 404 pages.
export function IllustratedHero({
  number,
  label,
  title,
  titleSize = "hero",
  text,
  action,
  art,
  className,
  titleClassName,
  artClassName,
}: IllustratedHeroProps) {
  return (
    <section className={cx(styles.hero, className)}>
      <HeroSky anchor="top" />
      <div className={styles.content}>
        <SectionLabel number={number}>{label}</SectionLabel>
        <Reveal
          as="h1"
          className={cx(
            titleSize === "hero" ? styles.heroTitle : styles.heading,
            titleClassName,
          )}
          delay={150}
        >
          {title}
        </Reveal>
        {text && (
          <Reveal as="p" className={styles.text} delay={300}>
            {text}
          </Reveal>
        )}
        <Reveal className={styles.action} delay={450}>
          {action}
        </Reveal>
      </div>
      <Reveal
        variant="fade"
        className={cx(styles.art, artClassName)}
        delay={300}
      >
        {art}
      </Reveal>
    </section>
  );
}
