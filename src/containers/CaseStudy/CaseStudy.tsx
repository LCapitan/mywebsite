import type { MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";

import { ArrowButton, CircleArrow } from "../../components/ArrowButton";
import { ContactSection } from "../../components/ContactSection";
import { HeroSky } from "../../components/HeroSky";
import { Orbit } from "../../components/Orbit";
import { Punctuated } from "../../components/Punctuated";
import { Reveal } from "../../components/Reveal";
import { SectionLabel } from "../../components/SectionLabel";
import type { CaseStudy as CaseStudyData, WorkItem } from "../../data/work";
import {
  closeCaseStudy,
  HERO_TRANSITION_NAME,
  transitionState,
} from "../../lib/pageTransition";

import styles from "./CaseStudy.module.scss";

interface CaseStudyProps {
  item: WorkItem & { caseStudy: CaseStudyData };
}

export default function CaseStudy({ item }: CaseStudyProps) {
  const study = item.caseStudy;
  const details = [
    ["Role", study.role],
    ["Agency", study.agency],
    ["Platform", study.platform],
    ["Year", study.year],
  ];

  const backToWork = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    closeCaseStudy(study.slug);
  };

  return (
    // Marks the page as rendered, for the transition from the work page.
    <div data-case-study={study.slug}>
      <section className={styles.hero}>
        <HeroSky anchor="top" />
        <div className={styles.heroInner}>
          <div className={styles.heroText}>
            <Link href="/work" className={styles.back} onClick={backToWork}>
              <CircleArrow direction="left" className={styles.backArrow} />
              All work
            </Link>
            <SectionLabel number="01">Case study</SectionLabel>
            <Reveal as="h1" className={styles.title} delay={150}>
              {item.title}
            </Reveal>
            <Reveal as="p" className={styles.tagline} delay={250}>
              {`${item.content}.`}
            </Reveal>
            <Reveal as="dl" className={styles.details} delay={350}>
              {details.map(([term, value]) => (
                <div key={term}>
                  <dt>{term}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </Reveal>
            <Reveal className={styles.visit} delay={450}>
              <ArrowButton href={item.cardLink} label="Visit website" external />
            </Reveal>
          </div>

          {/* No reveal: in the morph, this is where the clicked card lands,
              so it has to be in place from the start. */}
          <div
            className={styles.heroImage}
            style={{
              viewTransitionName:
                transitionState.style === "morph"
                  ? HERO_TRANSITION_NAME
                  : undefined,
            }}
          >
            <Image
              src={study.images.hero.src}
              alt={study.images.hero.alt}
              width={study.images.hero.width}
              height={study.images.hero.height}
              sizes="(max-width: 1099px) 92vw, 720px"
              preload
            />
          </div>
        </div>
      </section>

      <section className={styles.overview}>
        <SectionLabel number="02">Overview</SectionLabel>
        <div className={styles.overviewBody}>
          <Reveal as="h2" className={styles.heading}>
            <Punctuated>{study.overview.heading}</Punctuated>
          </Reveal>
          <Reveal as="p" className={styles.text} delay={120}>
            {study.overview.text}
          </Reveal>
        </div>
        <Reveal as="ul" className={styles.tags} delay={200}>
          {study.overview.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </Reveal>
      </section>

      <section className={styles.experience}>
        <SectionLabel number="03">The experience</SectionLabel>
        <div className={styles.devices}>
          <Reveal variant="clip" className={styles.browser}>
            <div
              className={styles.browserFrame}
              style={{
                aspectRatio: `${study.images.desktop.width} / ${study.images.desktop.height}`,
              }}
            >
              <Image
                src={study.images.desktop.src}
                alt={study.images.desktop.alt}
                fill
                sizes="(max-width: 1099px) 90vw, 1000px"
                className={styles.cover}
              />
            </div>
          </Reveal>
          <Reveal variant="clip" className={styles.phone} delay={200}>
            <div className={styles.phoneFrame}>
              <div
                className={styles.phoneScreen}
                style={{
                  aspectRatio: `${study.images.phone.width} / ${study.images.phone.height}`,
                }}
              >
                <Image
                  src={study.images.phone.src}
                  alt={study.images.phone.alt}
                  fill
                  sizes="260px"
                  className={styles.cover}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className={styles.development}>
        <Orbit
          className={styles.developmentOrbit}
          line="dashed"
          moons={[{ angle: -140, size: 18 }]}
          duration={150}
        />
        <SectionLabel number="04">Development</SectionLabel>
        <Reveal as="h2" className={styles.subheading}>
          <Punctuated>{study.development.heading}</Punctuated>
        </Reveal>
        <div className={styles.columns}>
          {study.development.paragraphs.map((paragraph, i) => (
            <Reveal key={i} as="p" className={styles.text} delay={120 + i * 100}>
              {paragraph}
            </Reveal>
          ))}
        </div>
      </section>

      <ContactSection number="05" />
    </div>
  );
}
