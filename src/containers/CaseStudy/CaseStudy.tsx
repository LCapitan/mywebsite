import type { MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import cx from "classnames";

import {
  ArrowButton,
  CircleArrow,
  CircleArrowLink,
} from "../../components/ArrowButton";
import { ContactSection } from "../../components/ContactSection";
import { HeroSky } from "../../components/HeroSky";
import { Orbit } from "../../components/Orbit";
import { Punctuated } from "../../components/Punctuated";
import { Reveal } from "../../components/Reveal";
import { SectionLabel } from "../../components/SectionLabel";
import {
  caseStudyItems,
  type CaseStudy as CaseStudyData,
  type WorkItem,
} from "../../data/work";
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

  // The next case study in the work list, looping back to the first.
  const index = caseStudyItems.findIndex(
    (other) => other.caseStudy.slug === study.slug,
  );
  const next = caseStudyItems[(index + 1) % caseStudyItems.length];

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
          {/* The tags sit under the text, sharing its left edge. */}
          <div>
            <Reveal as="p" className={styles.text} delay={120}>
              {study.overview.text}
            </Reveal>
            <Reveal as="ul" className={styles.tags} delay={200}>
              {study.overview.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </Reveal>
          </div>
        </div>
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
          ellipse
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
          {study.development.paragraphs.map(({ heading, text }, i) => (
            <Reveal
              key={i}
              className={cx(styles.block, heading && styles.headed)}
              delay={120 + (i % 2) * 100}
            >
              {heading && <h3 className={styles.blockHeading}>{heading}</h3>}
              <p className={styles.text}>{text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {caseStudyItems.length > 1 && (
        <nav className={styles.pager} aria-label="Case studies">
          <Link href="/work" className={styles.allProjects} onClick={backToWork}>
            <CircleArrow direction="left" />
            View all projects
          </Link>
          <CircleArrowLink
            href={`/work/${next.caseStudy.slug}`}
            label={`View ${next.title} case study`}
            // Going on to another case study, "All work" should open the
            // work page rather than step back to this one.
            onClick={() => (transitionState.workScroll = null)}
          />
        </nav>
      )}

      <ContactSection number="05" />
    </div>
  );
}
