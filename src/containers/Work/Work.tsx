import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import Image from "next/image";
import Link from "next/link";
import cx from "classnames";

import { CircleArrow } from "../../components/ArrowButton";
import { CarouselControls } from "../../components/CarouselControls";
import { ContactSection } from "../../components/ContactSection";
import { FeaturedCard } from "../../components/FeaturedCard";
import { HeroSky } from "../../components/HeroSky";
import { SectionLabel } from "../../components/SectionLabel";
import { workItems, type WorkItem } from "../../data/work";
import { useCarousel, type Carousel } from "../../hooks/useCarousel";
import {
  caseStudyLinkProps,
  transitionState,
  type TransitionStyle,
} from "../../lib/pageTransition";

import styles from "./Work.module.scss";

const projects = workItems.filter((item) => !item.hidden);

// Degrees between neighbouring cards on the wheel.
const STEP_ANGLE = 31;

// Scroll position (in projects) -> wheel position. The wheel slows as each
// project nears the active spot, like a watch's date wheel settling, without
// ever stopping dead.
function settle(progress: number) {
  return progress - (Math.sin(2 * Math.PI * progress) / (2 * Math.PI)) * 0.3;
}

// How much of the remaining distance the wheel covers each frame: enough to
// smooth out choppy mouse wheels while still following the scroll closely.
const EASE = 0.35;

function Details({ item }: { item: WorkItem }) {
  return (
    <div className={styles.details}>
      <h1 className={styles.title}>{item.title}</h1>
      {item.content && <p className={styles.description}>{item.content}</p>}
      <ul className={styles.tags}>
        {item.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </div>
  );
}

function ProjectCard({
  item,
  active,
  onFocus,
}: {
  item: WorkItem;
  active: boolean;
  onFocus?: () => void;
}) {
  const content = (
    <>
      <Image
        src={item.imgSrc}
        alt={item.imgAlt}
        fill
        sizes="(max-width: 1099px) 80vw, 460px"
        className={styles.image}
      />
      <span className={styles.cardLink}>
        {item.caseStudy ? "View case study" : "View website"}
        <CircleArrow />
      </span>
    </>
  );
  const className = cx(styles.card, active && styles.active);

  // Projects with a case study open it; the rest link to the live site.
  return item.caseStudy ? (
    <Link
      {...caseStudyLinkProps(item.caseStudy.slug)}
      className={className}
      onFocus={onFocus}
    >
      {content}
    </Link>
  ) : (
    <a
      href={item.cardLink}
      target="_blank"
      rel="noreferrer"
      className={className}
      onFocus={onFocus}
    >
      {content}
    </a>
  );
}

export default function Work() {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const spokeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [rowRef, carousel] = useCarousel<HTMLUListElement>();

  // Experimental: ?transition=slide (or morph) picks how case studies open.
  useEffect(() => {
    const style = new URLSearchParams(window.location.search).get("transition");
    if (style === "morph" || style === "slide") {
      transitionState.style = style as TransitionStyle;
    }
  }, []);

  // Back from a case study: return to where the page was, with the row on
  // that project, before the transition takes its picture of the page.
  useLayoutEffect(() => {
    if (transitionState.workScroll !== null) {
      window.scrollTo(0, transitionState.workScroll);
      transitionState.workScroll = null;
    }
    const row = rowRef.current;
    const index = projects.findIndex(
      (project) => project.caseStudy?.slug === transitionState.slug,
    );
    if (row && index >= 0) {
      const item = row.children[index] as HTMLElement;
      row.scrollLeft = item.offsetLeft - row.offsetLeft - row.clientLeft;
    }
  }, [rowRef]);

  // Wheel layout: page scroll turns the wheel. A layout effect, so the wheel
  // is in place before the first paint (and before a transition's picture).
  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    // The wheel glides toward the scroll position instead of jumping to it.
    let position = 0;
    let target = 0;

    const measure = () => {
      const scrollable = track.offsetHeight - window.innerHeight;
      const step = scrollable / Math.max(projects.length - 1, 1);
      const progress = Math.min(
        Math.max(-track.getBoundingClientRect().top / step, 0),
        projects.length - 1,
      );
      return settle(progress);
    };

    const update = () => {
      frame = 0;
      // Hidden (phones and tablets): the row layout is shown instead.
      if (!track.offsetParent) return;
      target = measure();
      position += (target - position) * EASE;
      if (Math.abs(target - position) < 0.001) position = target;

      spokeRefs.current.forEach((spoke, i) => {
        if (!spoke) return;
        const distance = i - position;
        spoke.style.transform = `rotate(${-distance * STEP_ANGLE}deg)`;
        spoke.style.opacity = String(
          Math.max(0, 1 - Math.abs(distance) * 0.45),
        );
        // The card nearest the active spot draws on top.
        spoke.style.zIndex = String(100 - Math.round(Math.abs(distance) * 10));
      });
      setActive(Math.round(position));
      // Keep gliding until the wheel catches up.
      if (position !== target) frame = requestAnimationFrame(update);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    // Start where the page already is (after a reload mid-page, or back
    // from a case study).
    position = measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Tabbing to a card, or the wheel's controls, turns the wheel to it. The
  // page jumps straight there and the wheel glides after it.
  const scrollToProject = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const scrollable = track.offsetHeight - window.innerHeight;
    const step = scrollable / Math.max(projects.length - 1, 1);
    const top = track.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + index * step });
  };

  // Steps from the project the page is scrolled to rather than the one the
  // wheel shows, which can lag a moment behind quick presses.
  const stepProject = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const scrollable = track.offsetHeight - window.innerHeight;
    const step = scrollable / Math.max(projects.length - 1, 1);
    const current = Math.round(-track.getBoundingClientRect().top / step);
    const target = current + direction;
    if (target < 0 || target >= projects.length) return;
    scrollToProject(target);
  };

  const wheelCarousel: Carousel = {
    index: active,
    count: projects.length,
    atStart: active === 0,
    atEnd: active === projects.length - 1,
    prev: () => stepProject(-1),
    next: () => stepProject(1),
  };

  const item = projects[active];

  return (
    <>
      {/* data-work-page marks the page as rendered, for the transition
          back from a case study. */}
      <div
        ref={trackRef}
        data-work-page
        className={styles.track}
        style={{ "--projects": projects.length } as CSSProperties}
      >
        <div className={styles.stage}>
          <HeroSky anchor="center" planet />
          <div className={styles.stageInner}>
            <div className={styles.info}>
              <SectionLabel number="01">Work</SectionLabel>
              {/* Keyed by project so each change animates in. */}
              <Details key={item.title} item={item} />
              <CarouselControls
                carousel={wheelCarousel}
                controls="work-wheel"
                itemLabel="project"
                className={styles.wheelControls}
              />
            </div>
            <div id="work-wheel" className={styles.wheel}>
              {projects.map((project, i) => (
                <div
                  key={project.title}
                  ref={(el) => {
                    spokeRefs.current[i] = el;
                  }}
                  className={styles.spoke}
                >
                  <div className={styles.slot}>
                    <ProjectCard
                      item={project}
                      active={i === active}
                      onFocus={() => scrollToProject(i)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Each card carries its own details, so nothing above the row has to
          change as it scrolls. */}
      <div className={styles.rowLayout}>
        <SectionLabel number="01" as="h1">
          Work
        </SectionLabel>
        <ul ref={rowRef} id="work-cards" className={styles.row}>
          {projects.map((project, i) => (
            <li key={project.title}>
              <FeaturedCard
                item={project}
                index={i + 1}
                allTags
                titleAs="h2"
                className={styles.rowCard}
                openCaseStudy
              />
            </li>
          ))}
        </ul>
        <CarouselControls
          carousel={carousel}
          controls="work-cards"
          itemLabel="project"
        />
      </div>

      <ContactSection number="02" />
    </>
  );
}
